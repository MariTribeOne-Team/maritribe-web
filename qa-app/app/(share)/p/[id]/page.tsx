import type { Metadata } from "next";
import { getPublicPost, timeAgo, readingTime } from "../../_lib/app-backend";
import { CtaBanner, ErrorCard } from "../../_components/share-ui";

type Params = { params: Promise<{ id: string }> };

// Server-rendered OG/Twitter tags so shared post links unfurl correctly in
// WhatsApp / iMessage / Slack / X (the legacy client-JS meta tags were invisible to crawlers).
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const result = await getPublicPost(id);
  if (result.kind !== "ok") {
    return { title: "Maritribe", robots: { index: false, follow: false } };
  }
  const { post } = result;
  const title = `${post.title || "Post"} — Maritribe`;
  const description = (post.body || "").replace(/\s+/g, " ").trim().substring(0, 160);
  const hasMedia = !!(post.mediaUrls && post.mediaUrls.length > 0 && post.mediaUrls[0]);
  const images = hasMedia ? [post.mediaUrls![0]!] : ["/og-preview.png"];
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "article", url: `https://maritribe.one/p/${id}`, images },
    twitter: { card: hasMedia ? "summary_large_image" : "summary", title, description, images },
  };
}

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const result = await getPublicPost(id);

  if (result.kind === "private") {
    return (
      <ErrorCard
        variant="lock"
        title="Private Community"
        message="This post belongs to a private community and cannot be viewed on the web."
      />
    );
  }
  if (result.kind === "not-found") {
    return (
      <ErrorCard
        variant="bottle"
        title="Post Not Found"
        message="This post may have been deleted or is no longer available."
      />
    );
  }
  if (result.kind === "error") {
    return (
      <ErrorCard
        variant="fog"
        title="Something went wrong"
        message="Could not load this post. Please try again later."
      />
    );
  }

  const { post } = result;
  const authorName = post.author?.name || "A";
  const initial = authorName.charAt(0).toUpperCase();
  const media = post.mediaUrls && post.mediaUrls.length > 0 ? post.mediaUrls[0] : null;
  const read = readingTime(post.body);

  return (
    <>
      <div className="post-card">
        {media ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="post-media" src={media} alt="" />
        ) : null}
        <div className="post-header">
          <div className="post-avatar">
            {post.author?.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.author.profileImage} alt="" />
            ) : (
              initial
            )}
          </div>
          <div>
            <div className="post-meta-author">{post.author?.name}</div>
            <div>
              {post.community?.name ? (
                <span className="post-meta-community">{post.community.name}</span>
              ) : null}
              <span className="post-meta-time"> &middot; {timeAgo(post.createdAt)}</span>
              {read ? <span className="post-meta-reading"> &middot; {read}</span> : null}
            </div>
          </div>
        </div>
        <div className="post-body">
          {post.title ? <div className="post-title">{post.title}</div> : null}
          <div className="post-content">{post.body}</div>
        </div>
        <div className="post-stats">
          <div className="stat">
            <svg viewBox="0 0 24 24">
              <path d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H3.75" />
            </svg>
            {post.score || 0} claps
          </div>
          <div className="stat">
            <svg viewBox="0 0 24 24">
              <path d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            {post.commentsCount || 0} comments
          </div>
        </div>
      </div>
      <CtaBanner title="Continue in the app" desc="Open Maritribe to clap, comment, and join the discussion." />
    </>
  );
}
