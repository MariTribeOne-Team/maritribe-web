import { readDeckFromBackend } from "@/lib/qa-backend";
import { QaBackendError } from "../qa/backend-error";
import Link from "next/link";
import { readQaSession } from "@/lib/session";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";

export default async function DeckPage() {
  const qaSession = await readQaSession();
  const qaHref = qaSession ? "/qa/review-queue" : "/qa/login";
  let deck;
  try {
    deck = await readDeckFromBackend();
  } catch {
    return (
      <>
        <PublicHeader active="deck" />
        <QaBackendError title="Deck unavailable" message="The deck screen could not load cards from the QA backend." />
      </>
    );
  }

  const { cards, stats, run } = deck;

  return (
    <>
      <PublicHeader active="deck" />
      <PageHero overline="Deck" title="Maritime flashcards to study">
          <p style={{ color: "rgba(255,255,255,0.72)", maxWidth: 680, marginTop: 12 }}>
            Browse the current flashcard set, scan topics quickly, and open the reviewer workspace
            only when you need to check card quality.
          </p>
      </PageHero>

      <main className="page-shell">
        <div className="wrap">
          <div className="kpis">
            <div className="kpi gold">
              <div className="label">Cards</div>
              <div className="num">{stats.cards}</div>
            </div>
            <div className="kpi">
              <div className="label">Accepted</div>
              <div className="num">{stats.accepted}</div>
            </div>
            <div className="kpi">
              <div className="label">Pending review</div>
              <div className="num">{stats.pending}</div>
            </div>
            <div className="kpi">
              <div className="label">Topics</div>
              <div className="num">{stats.topics}</div>
            </div>
          </div>

          <div className="panel">
            <div className="toolbar">
              <div className="toolbar-copy">
                <h2>Flashcard gallery</h2>
                <p>
                  Showing cards from <strong>{run?.documentTitle ?? "the latest run"}</strong>.
                </p>
              </div>
              <div className="toolbar-actions">
                <span className="status-pill">Current deck</span>
                <span className="status-pill">Reviewable</span>
                <span className="status-pill">{run?.status ?? "no run"}</span>
                <Link href={qaHref} className="btn btn-primary">
                  Open QA review
                </Link>
              </div>
            </div>

            <div className="card-grid">
              {cards.map((card) => (
                <article className="flashcard-card" key={card.id}>
                  <div className="flashcard-top">
                    <span className="flashcard-type">{card.cardType.replaceAll("_", " ")}</span>
                    <span className={`quality-badge quality-${card.verdict.replaceAll(" ", "_")}`}>
                      {card.verdict.replaceAll("_", " ")}
                    </span>
                  </div>
                  <h3>{card.front}</h3>
                  <p>{card.back}</p>
                  <p style={{ color: "var(--muted)", fontSize: 14 }}>{card.sourceSnippet}</p>
                  <div className="flashcard-meta">
                    <span>{card.subject}</span>
                    <span>{card.topic}</span>
                    <span>Page {card.page}</span>
                    <span>{card.verdict}</span>
                  </div>
                  <div className="flashcard-actions">
                    <Link href={qaHref} className="btn btn-subtle">
                      Review in QA
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
