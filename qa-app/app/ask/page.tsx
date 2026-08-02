import { notFound } from "next/navigation";
import { retrievalPreviewAnswer } from "@/lib/retrieval-preview";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";

/**
 * Route withheld. `/ask` is an internal preview, not part of the current public
 * site: unlinked from every nav and returns 404 so it cannot be reached or
 * indexed. Flip this to `true` to bring the page back.
 */
const ROUTE_ENABLED = false;

export default async function AskPage() {
  if (!ROUTE_ENABLED) notFound();

  return (
    <>
      <PublicHeader active="home" />
      <PageHero overline="Ask Preview" title="Grounded answers from the maritime deck" />

      <main className="page-shell">
        <div className="wrap">
          <div className="panel">
            <h2>Question</h2>
            <div className="ask-box">
              <p>{retrievalPreviewAnswer.question}</p>
            </div>
          </div>

          <div className="panel">
            <h2>Grounded answer</h2>
            <div className="answer-box">
              <p>{retrievalPreviewAnswer.answer}</p>
            </div>
          </div>

          <div className="panel">
            <h2>Retrieved source cards</h2>
            <div className="source-list">
              {retrievalPreviewAnswer.sources.map((source) => (
                <article className="source-card" key={source.id}>
                  <div className="flashcard-top">
                    <span className="flashcard-type">source</span>
                    <span className="status-pill">score {source.score}</span>
                  </div>
                  {"imageUrl" in source && source.imageUrl ? (
                    <img src={source.imageUrl} alt={source.topic} className="flashcard-image" />
                  ) : null}
                  <h3>{source.front}</h3>
                  <p>{source.back}</p>
                  <div className="flashcard-meta">
                    <span>{source.topic}</span>
                    <span>Page {source.page}</span>
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
