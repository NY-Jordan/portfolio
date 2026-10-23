"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getVisitorId } from "@/lib/writing/visitor-id";
import { toggleArticleLike } from "@/lib/writing/actions";

const LIKED_SLUGS_KEY = "nyj_liked_slugs";

function readLikedSlugs(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_SLUGS_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function writeLikedSlugs(slugs: Set<string>) {
  localStorage.setItem(LIKED_SLUGS_KEY, JSON.stringify([...slugs]));
}

export function LikeButton({
  slug,
  initialCount,
  label,
  likedLabel,
}: {
  slug: string;
  initialCount: number;
  label: string;
  likedLabel: string;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    // One-time read of browser-only localStorage after mount, not state
    // derived from props/state — SSR has no liked-slugs data to seed with.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(readLikedSlugs().has(slug));
  }, [slug]);

  async function handleClick() {
    if (pending) return;
    setPending(true);

    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((count) => count + (nextLiked ? 1 : -1));

    const visitorId = getVisitorId();
    const result = await toggleArticleLike(slug, visitorId);

    if (!result) {
      setLiked(!nextLiked);
      setCount((count) => count + (nextLiked ? -1 : 1));
      setPending(false);
      return;
    }

    setLiked(result.liked);
    setCount(result.likesCount);

    const likedSlugs = readLikedSlugs();
    if (result.liked) likedSlugs.add(slug);
    else likedSlugs.delete(slug);
    writeLikedSlugs(likedSlugs);

    setPending(false);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={pending}
      aria-pressed={liked}
      aria-label={liked ? likedLabel : label}
    >
      <Heart className={cn("size-4", liked && "fill-accent text-accent")} />
      {count}
    </Button>
  );
}
