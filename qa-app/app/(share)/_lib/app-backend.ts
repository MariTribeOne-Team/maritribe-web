import { cache } from "react";

// Base URL of the MAIN APP backend (Maritribe app on Render) — the source for
// public post previews behind share links. Overridable via env for staging.
export function appBackendBaseUrl() {
  return (process.env.APP_BACKEND_BASE_URL ?? "https://tribebackend.onrender.com").replace(/\/+$/, "");
}

export type PublicPost = {
  title?: string | null;
  body?: string | null;
  createdAt?: string | null;
  score?: number | null;
  commentsCount?: number | null;
  mediaUrls?: string[] | null;
  author?: { name?: string | null; profileImage?: string | null } | null;
  community?: { name?: string | null } | null;
};

export type PostResult =
  | { kind: "ok"; post: PublicPost }
  | { kind: "private" }
  | { kind: "not-found" }
  | { kind: "error" };

// Cached so generateMetadata() and the page component share one upstream fetch.
export const getPublicPost = cache(async (postId: string): Promise<PostResult> => {
  try {
    const res = await fetch(`${appBackendBaseUrl()}/public/posts/${encodeURIComponent(postId)}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 403) return { kind: "private" };
    if (!res.ok) return { kind: "not-found" };
    const post = (await res.json()) as PublicPost;
    return { kind: "ok", post };
  } catch {
    return { kind: "error" };
  }
});

export function timeAgo(iso?: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return "";
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(0, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function readingTime(text?: string | null): string {
  if (!text) return "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return "";
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

// Title-cases a community slug, e.g. "deck-officers" -> "Deck Officers".
export function slugToName(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
