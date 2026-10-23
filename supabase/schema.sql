-- Run this once in the Supabase SQL editor (or via `supabase db push`) for this project.
-- After running, create the single admin account in Authentication -> Users,
-- and disable public sign-ups in Authentication -> Settings (there is no /admin/signup route;
-- every authenticated session is trusted as the admin by the RLS policies below).

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  date date not null,
  tags text[] not null default '{}',
  cover text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  views_count bigint not null default 0,
  likes_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table article_translations (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  locale text not null check (locale in ('en', 'fr')),
  title text not null,
  description text not null,
  content jsonb not null, -- Tiptap JSON document
  unique (article_id, locale)
);

create table article_view_events (
  id bigint generated always as identity primary key,
  article_id uuid not null references articles(id) on delete cascade,
  visitor_id text not null,
  viewed_on date not null default (now() at time zone 'utc')::date,
  unique (article_id, visitor_id, viewed_on)
);

create table article_likes (
  id bigint generated always as identity primary key,
  article_id uuid not null references articles(id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (article_id, visitor_id)
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table articles enable row level security;
alter table article_translations enable row level security;
alter table article_view_events enable row level security;
alter table article_likes enable row level security;
alter table subscribers enable row level security;

-- Public can read only published articles / their translations.
create policy "public read published articles"
  on articles for select
  to anon
  using (status = 'published');

create policy "public read translations of published articles"
  on article_translations for select
  to anon
  using (
    exists (
      select 1 from articles
      where articles.id = article_translations.article_id
        and articles.status = 'published'
    )
  );

-- Admin (any authenticated session -- single owner account) has full CRUD.
create policy "admin full access articles"
  on articles for all
  to authenticated
  using (true)
  with check (true);

create policy "admin full access translations"
  on article_translations for all
  to authenticated
  using (true)
  with check (true);

create policy "admin read view events"
  on article_view_events for select
  to authenticated
  using (true);

create policy "admin read likes"
  on article_likes for select
  to authenticated
  using (true);

-- Subscribers: anon can insert (subscribe) but never read the list back.
create policy "public can subscribe"
  on subscribers for insert
  to anon
  with check (true);

create policy "admin read subscribers"
  on subscribers for select
  to authenticated
  using (true);

-- No direct anon/authenticated write grants on article_view_events / article_likes --
-- both are mutated exclusively through the SECURITY DEFINER functions below.

create or replace function increment_article_view(p_slug text, p_visitor_id text)
returns bigint
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_article_id uuid;
  v_rows int;
begin
  select id into v_article_id from articles where slug = p_slug and status = 'published';
  if v_article_id is null then
    return 0;
  end if;

  insert into article_view_events (article_id, visitor_id)
    values (v_article_id, p_visitor_id)
    on conflict (article_id, visitor_id, viewed_on) do nothing;
  get diagnostics v_rows = row_count;

  if v_rows > 0 then
    update articles set views_count = views_count + 1 where id = v_article_id;
  end if;

  return (select views_count from articles where id = v_article_id);
end;
$function$;

create or replace function toggle_article_like(p_slug text, p_visitor_id text)
returns table (liked boolean, likes_count bigint)
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_article_id uuid;
  v_existing boolean;
begin
  select id into v_article_id from articles where slug = p_slug and status = 'published';
  if v_article_id is null then
    return;
  end if;

  select exists(
    select 1 from article_likes
    where article_id = v_article_id and visitor_id = p_visitor_id
  ) into v_existing;

  if v_existing then
    delete from article_likes where article_id = v_article_id and visitor_id = p_visitor_id;
    update articles set likes_count = greatest(articles.likes_count - 1, 0) where id = v_article_id;
  else
    insert into article_likes (article_id, visitor_id) values (v_article_id, p_visitor_id);
    update articles set likes_count = articles.likes_count + 1 where id = v_article_id;
  end if;

  -- Both output columns are qualified below: the function's own OUT
  -- parameters (`liked`, `likes_count`) share names with table columns,
  -- which Postgres can't disambiguate in a bare SELECT.
  return query
    select (not v_existing) as liked, articles.likes_count as likes_count
    from articles where id = v_article_id;
end;
$function$;

grant execute on function increment_article_view(text, text) to anon, authenticated;
grant execute on function toggle_article_like(text, text) to anon, authenticated;

-- Keep updated_at current on article edits.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

create trigger articles_set_updated_at
  before update on articles
  for each row
  execute function set_updated_at();

-- Public bucket for article cover images, uploaded from the admin.
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

create policy "public read article covers"
  on storage.objects for select
  to anon
  using (bucket_id = 'article-covers');

create policy "admin manage article covers"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'article-covers')
  with check (bucket_id = 'article-covers');
