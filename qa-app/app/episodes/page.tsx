import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";
import { PublicFooter } from "../components/public-footer";
import { EpisodeThumb } from "../components/episode-thumb";
import { listenLinks, publishedEpisodes } from "@/lib/public-content";

const topics = Array.from(new Set(publishedEpisodes.map((episode) => episode.category)));

export default function EpisodesPage() {
  return (
    <>
      <PublicHeader active="episodes" />
      <PageHero overline="The Podcast" title="All Episodes">
        <p className="marketing-hero-copy">
          Honest conversations with maritime leaders, technologists, operators, and government
          voices from across the industry.
        </p>
      </PageHero>

      <main className="page-shell marketing-shell">
        <div className="wrap episodes-layout">
          <section className="episodes-list-panel" data-stagger>
            {publishedEpisodes.map((episode) => (
              <Link
                className="episode-list-card reveal"
                key={episode.slug}
                href={`/episodes/${episode.slug}`}
              >
                <EpisodeThumb youtubeId={episode.youtubeId} number={episode.number} />

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
            <section className="marketing-panel sidebar-block reveal">
              <p className="marketing-kicker">Listen on</p>
              <div className="listen-links">
                <a href={listenLinks.spotify} target="_blank" rel="noreferrer">
                  Spotify
                </a>
                <a href={listenLinks.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </div>
            </section>

            <section className="marketing-panel sidebar-block reveal">
              <p className="marketing-kicker">Topics</p>
              <div className="topic-pills">
                <span className="status-pill">All</span>
                {topics.map((topic) => (
                  <span className="status-pill" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
