export type Locale = "en" | "fr";

export interface LocalizedText {
  fr: string;
  en: string;
}

export type ProjectStatus = "shipped" | "in-progress";

export interface KeyDecision {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface ResultItem {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ProjectMedia {
  src: string;
  alt: LocalizedText;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: LocalizedText;
  status: ProjectStatus;
  year: string;
  role: LocalizedText;
  /** Paragraphs joined with \n\n */
  overview: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  architecture: LocalizedText;
  technologies: string[];
  keyDecisions: KeyDecision[];
  results: ResultItem[];
  lessonsLearned: LocalizedText[];
  media: ProjectMedia[];
  links: ProjectLink[];
  featured: boolean;
  /** True when the case study is placeholder content awaiting real detail from the user. */
  isPlaceholder?: boolean;
}

export interface ExperienceItem {
  period: LocalizedText;
  role: LocalizedText;
  company: string;
  location: LocalizedText;
  summary: LocalizedText;
  technologies: string[];
}

export interface NowItem {
  area: LocalizedText;
  detail: LocalizedText;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  views: number;
  likes: number;
}

export interface PostSummary extends PostMetadata {
  slug: string;
  locale: Locale;
  readingTime: string;
}

export type ArticleStatus = "draft" | "published";

export interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
}

export interface TiptapDoc {
  type: "doc";
  content: TiptapNode[];
}
