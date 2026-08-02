"use client";

import { useState } from "react";
import { listenLinks, type EpisodeChapter } from "@/lib/public-content";

function toSeconds(time: string): number {
  const parts = time.split(":").map((value) => Number(value));
  if (parts.some((value) => Number.isNaN(value))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] ?? 0;
}

/**
 * Player, write-up and chapter rail share one grid: the article is passed in as
 * `children` so it can stay a server component while sitting in the same column
 * as the video. Without that the rail would be a lone grid sibling of the
 * player and stretch the player card to its own height, leaving several hundred
 * pixels of empty card below the video.
 */
export function EpisodePlayer({
  youtubeId,
  title,
  chapters,
  children,
}: {
  youtubeId?: string;
  title: string;
  chapters: EpisodeChapter[];
  children?: React.ReactNode;
}) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [start, setStart] = useState<number | null>(null);

  const src = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${
        start !== null ? `&autoplay=1&start=${start}` : ""
      }`
    : null;

  const jumpTo = (index: number, time: string) => {
    setActiveChapter(index);
    setStart(toSeconds(time));
  };

  return (
    <section className="episode-layout">
      <div className="episode-column">
        <div className="episode-player-card">
          {src ? (
            <div className="episode-player-frame">
              <iframe
                // Remount on seek so the new start time takes effect.
                key={start ?? "initial"}
                src={src}
                title={title}
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
            <span>
              {activeChapter !== null && chapters[activeChapter]
                ? `Playing · ${chapters[activeChapter].label}`
                : "Playing on maritribeOne · tap a chapter to jump"}
            </span>
            <div className="listen-links">
              <a href={listenLinks.spotify} target="_blank" rel="noreferrer">
                Spotify
              </a>
              <a
                href={
                  youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : listenLinks.youtube
                }
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {children}
      </div>

      <aside className="episode-chapters">
        <p className="marketing-kicker">In this episode</p>
        <ul>
          {chapters.length ? (
            chapters.map((chapter, index) => (
              <li key={`${chapter.time}-${chapter.label}`}>
                <button
                  type="button"
                  className={`episode-chapter-btn${
                    activeChapter === index ? " active" : ""
                  }`}
                  onClick={() => jumpTo(index, chapter.time)}
                  disabled={!youtubeId}
                  aria-label={`Jump to ${chapter.time} — ${chapter.label}`}
                >
                  <span>{chapter.time}</span>
                  <p>{chapter.label}</p>
                </button>
              </li>
            ))
          ) : (
            <li>
              <div className="episode-chapter-btn" aria-disabled="true">
                <span>--:--</span>
                <p>Chapter markers will appear here when they are available for this episode.</p>
              </div>
            </li>
          )}
        </ul>
      </aside>
    </section>
  );
}
