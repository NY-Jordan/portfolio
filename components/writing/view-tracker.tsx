"use client";

import { useEffect } from "react";
import { getVisitorId } from "@/lib/writing/visitor-id";
import { incrementArticleView } from "@/lib/writing/actions";

const DEBOUNCE_MS = 12 * 60 * 60 * 1000; // 12h

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const debounceKey = `nyj_viewed_${slug}`;
    const lastViewed = Number(localStorage.getItem(debounceKey) ?? 0);
    if (Date.now() - lastViewed < DEBOUNCE_MS) return;

    const visitorId = getVisitorId();
    incrementArticleView(slug, visitorId).then(() => {
      localStorage.setItem(debounceKey, String(Date.now()));
    });
  }, [slug]);

  return null;
}
