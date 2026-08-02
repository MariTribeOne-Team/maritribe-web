/**
 * Episode artwork. Uses the YouTube still when the episode has a video, and
 * falls back to the maritribeOne gradient plate when it does not — so an episode
 * published before its video is attached still looks deliberate.
 */
export function EpisodeThumb({
  youtubeId,
  number,
  size = "large",
}: {
  youtubeId?: string;
  number: string;
  size?: "large" | "small";
}) {
  return (
    <div className={size === "small" ? "ep-thumb ep-thumb-sm" : "ep-thumb"}>
      {youtubeId ? (
        // Plain <img>: the YouTube CDN already serves an optimised still, and this
        // avoids routing every thumbnail through the Workers image optimizer.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="ep-thumb-fallback" aria-hidden="true">
          maritribeOne
        </span>
      )}

      <span className="ep-thumb-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5z" />
        </svg>
      </span>

      <span className="ep-thumb-num">{number}</span>
    </div>
  );
}
