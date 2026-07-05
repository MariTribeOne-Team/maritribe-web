import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "../../components/public-header";
import { PublicFooter } from "../../components/public-footer";
import { getEpisodeBySlug, episodeSummaries } from "@/lib/public-content";

export function generateStaticParams() {
  return episodeSummaries.map((episode) => ({ slug: episode.slug }));
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
          <section className="episode-media">
            <div className="episode-player-card">
              {episode.youtubeId ? (
                <div className="episode-player-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?rel=0&modestbranding=1`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="episode-player-placeholder">
                  <span>Episode preview</span>
                  <p>
                    Media for this episode will appear here once the listening links and video are
                    attached.
                  </p>
                </div>
              )}
              <div className="episode-player-foot">
                <span>Playing on maritribeOne</span>
                <div className="listen-links">
                  <a href="#">Spotify</a>
                  <a href="#">Apple</a>
                  {episode.youtubeId ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube
                    </a>
                  ) : (
                    <a href="#">YouTube</a>
                  )}
                </div>
              </div>
            </div>

            <aside className="episode-chapters">
              <p className="marketing-kicker">In this episode</p>
              <ul>
                {episode.chapters.length ? (
                  episode.chapters.map((chapter) => (
                    <li key={`${chapter.time}-${chapter.label}`}>
                      <span>{chapter.time}</span>
                      <p>{chapter.label}</p>
                    </li>
                  ))
                ) : (
                  <li>
                    <span>--:--</span>
                    <p>Chapter markers will appear here when they are available for this episode.</p>
                  </li>
                )}
              </ul>
            </aside>
          </section>

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
                    <li key={item}>{item}</li>
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
