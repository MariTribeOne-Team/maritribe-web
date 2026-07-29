import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "../../components/public-header";
import { PublicFooter } from "../../components/public-footer";
import { EpisodePlayer } from "./episode-player";
import { getEpisodeBySlug, episodeSummaries } from "@/lib/public-content";

export function generateStaticParams() {
  return episodeSummaries.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Episode not found — maritribeOne" };
  }

  const description = episode.excerpt || episode.lead;
  const ogImage = episode.youtubeId
    ? `https://i.ytimg.com/vi/${episode.youtubeId}/maxresdefault.jpg`
    : "/og-preview.png";

  return {
    title: `${episode.title} — maritribeOne`,
    description,
    openGraph: {
      title: episode.title,
      description,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: episode.youtubeId ? "summary_large_image" : "summary",
      title: episode.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const related = episodeSummaries.filter((item) => item.slug !== episode.slug).slice(0, 4);

  return (
    <>
      <PublicHeader active="episodes" mode="marketing" />

      <section className="episode-hero">
        <div className="wrap episode-hero-inner">
          <Link href="/episodes" className="episode-back-link">
            ← All episodes
          </Link>
          <div className="episode-hero-meta">
            <span className="status-pill">{episode.category}</span>
            <span className="episode-duration">
              {episode.duration} · {episode.number}
            </span>
          </div>
          <h1>{episode.title}</h1>
          <p className="episode-guest">
            <span>{episode.author}</span> — {episode.guestRole}
          </p>
        </div>
      </section>

      <main className="episode-body-shell">
        <div className="wrap">
          <EpisodePlayer
            youtubeId={episode.youtubeId}
            title={episode.title}
            chapters={episode.chapters}
          />

          <article className="episode-article">
            <p className="episode-lead">{episode.lead}</p>

            {episode.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2>What you&apos;ll learn</h2>
            <ol className="episode-learn-list">
              {episode.learn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <h2>Key takeaways</h2>
            <div className="episode-takeaways">
              {episode.takeaways.length ? (
                episode.takeaways.map((item) => (
                  <div className="episode-takeaway" key={item.number}>
                    <span>{item.number}</span>
                    <p>
                      <strong>{item.title}</strong> {item.body}
                    </p>
                  </div>
                ))
              ) : (
                <p>Detailed takeaways will be attached for this episode next.</p>
              )}
            </div>

            {episode.references.length ? (
              <>
                <h2>Referenced</h2>
                <ul className="episode-chip-list">
                  {episode.references.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {episode.find.length ? (
              <>
                <h2>Where to find the guest</h2>
                <ul className="episode-chip-list">
                  {episode.find.map((item) => (
                    <li key={item.label}>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="episode-closing">{episode.closing}</p>
          </article>
        </div>
      </main>

      <section className="related-band">
        <div className="wrap">
          <div className="related-head">
            <p className="marketing-kicker">Keep listening</p>
            <h2>More from maritribeOne</h2>
            <p>Honest conversations with the people who actually run the maritime world.</p>
          </div>

          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/episodes/${item.slug}`} className="related-card" key={item.slug}>
                <div className="related-thumb">
                  <span>{item.number}</span>
                </div>
                <div className="related-body">
                  <span className="status-pill">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>
                    {item.author} <span className="dot">·</span> {item.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </>
  );
}
