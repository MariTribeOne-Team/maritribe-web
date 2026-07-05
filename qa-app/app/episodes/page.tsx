import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";
import { PublicFooter } from "../components/public-footer";
import { episodeSummaries } from "@/lib/public-content";

export default function EpisodesPage() {
  return (
    <>
      <PublicHeader active="episodes" mode="marketing" />
      <PageHero overline="The Podcast" title="All Episodes">
        <p className="marketing-hero-copy">
          Honest conversations with maritime leaders, technologists, operators, and government
          voices from across the industry.
        </p>
      </PageHero>

      <main className="page-shell marketing-shell">
        <div className="wrap episodes-layout">
          <section className="episodes-list-panel">
            {episodeSummaries.map((episode) => (
              <Link
                className="episode-list-card"
                key={episode.slug}
                href={`/episodes/${episode.slug}`}
              >
                <div className="episode-list-thumb">
                  <span className="episode-play">▶</span>
                  <span className="episode-number">{episode.number}</span>
                </div>

                <div className="episode-list-copy">
                  <div className="episode-list-meta">
                    <span className="status-pill">{episode.category}</span>
                    <span className="episode-duration">{episode.duration}</span>
                  </div>
                  <h2>{episode.title}</h2>
                  <p>{episode.excerpt}</p>
                  <div className="episode-byline">
                    <span>{episode.author}</span>
                    <span className="dot">·</span>
                    <span>{episode.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          <aside className="episodes-sidebar">
            <section className="marketing-panel sidebar-block">
              <p className="marketing-kicker">Listen on</p>
              <div className="listen-links">
                <a href="#">Spotify</a>
                <a href="#">Apple Podcasts</a>
                <a href="#">YouTube</a>
              </div>
            </section>

            <section className="marketing-panel sidebar-block">
              <p className="marketing-kicker">Topics</p>
              <div className="topic-pills">
                <span className="status-pill">All</span>
                <span className="status-pill">Regulation</span>
                <span className="status-pill">Training</span>
                <span className="status-pill">Technology</span>
                <span className="status-pill">Welfare</span>
                <span className="status-pill">Green Shipping</span>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
