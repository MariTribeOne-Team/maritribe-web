import Link from "next/link";
import { notFound } from "next/navigation";
import { qaBackendCard, qaBackendCardReviews, qaBackendRunCards } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ReviewForm } from "./review-form";
import { QaBackendError } from "../../backend-error";
import { QaHeader } from "@/app/components/qa-header";
import { PageHero } from "@/app/components/page-hero";

function formatAnswerBlocks(text: string) {
  return text
    .replace(/\s+Method:/g, "\n\nMethod:")
    .replace(/\s+(?=\d+\.)/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default async function CardReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ cardId: string }>;
  searchParams: Promise<{ runId?: string; page?: string }>;
}) {
  const accessToken = await readQaSession();
  if (!accessToken) {
    redirect("/qa/login");
  }

  const { cardId } = await params;
  const { runId, page } = await searchParams;
  const currentPage = Math.max(Number(page ?? "1") || 1, 1);
  let card;
  let reviews = [];
  let reviewContextCards: Array<{ id: string; status: string; currentQuestion: string }> = [];
  try {
    card = await qaBackendCard(accessToken, cardId);
    reviews = await qaBackendCardReviews(accessToken, cardId).catch(() => []);
    if (runId) {
      const runCards = await qaBackendRunCards(accessToken, runId, currentPage, 50).catch(() => null);
      reviewContextCards = runCards?.cards.map((item) => ({
        id: item.id,
        status: item.status,
        currentQuestion: item.currentQuestion,
      })) ?? [];
    }
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "request failed";
    if (
      message.includes("invalid qa token") ||
      message.includes("missing qa token") ||
      message.includes("qa user not found") ||
      message.includes("unauthorized")
    ) {
      redirect("/api/qa-auth/logout?redirect=/qa/login%3Ferror%3Dsession");
    }
    if (message.includes("fetch failed")) {
      return (
        <>
          <QaHeader active="card" />
          <QaBackendError message="Card review could not load because the QA backend is not reachable." />
        </>
      );
    }
    notFound();
  }

  if (!card || !("id" in card)) {
    return card as any;
  }

  const answerBlocks = formatAnswerBlocks(card.currentAnswer);
  const sourceText = card.sourceText?.trim() ?? "";
  const ocrText = card.ocrText?.trim() ?? "";
  const hasDistinctOcr = ocrText && ocrText !== sourceText;
  const currentIndex = reviewContextCards.findIndex((item) => item.id === card.id);
  const previousCard = currentIndex > 0 ? reviewContextCards[currentIndex - 1] : null;
  const nextCard = currentIndex >= 0 && currentIndex < reviewContextCards.length - 1 ? reviewContextCards[currentIndex + 1] : null;
  const nextPending = reviewContextCards.find((item, index) => index > currentIndex && item.status === "PENDING_REVIEW");
  const runBackHref = runId ? `/qa/review-queue/${runId}?page=${currentPage}` : "/qa/review-queue";
  const navHref = (targetId: string) => runId ? `/qa/cards/${targetId}?runId=${runId}&page=${currentPage}` : `/qa/cards/${targetId}`;

  return (
    <>
      <QaHeader
        active="card"
        trailing={
          <form action="/api/qa-auth/logout" method="post">
            <button className="btn btn-ghost-light" type="submit">Logout</button>
          </form>
        }
      />
      <PageHero overline="Card Review" title="Review one card at a time" />

      <main className="page-shell">
        <div className="wrap">
          <div className="review-path-bar">
            <Link href={runBackHref} className="btn btn-subtle">Back to run</Link>
            <div className="review-path-actions">
              {previousCard ? (
                <Link href={navHref(previousCard.id)} className="btn btn-subtle">
                  Previous card
                </Link>
              ) : null}
              {nextPending ? (
                <Link href={navHref(nextPending.id)} className="btn btn-primary">
                  Next pending
                </Link>
              ) : null}
              {nextCard ? (
                <Link href={navHref(nextCard.id)} className="btn btn-subtle">
                  Next card
                </Link>
              ) : null}
            </div>
          </div>

          <section className="card-focus-layout">
            <div className="card-focus-main">
              <div className="card-hero">
                <div className="card-hero-top">
                  <div>
                    <p className="overline" style={{ marginBottom: 8 }}>Flashcard</p>
                    <h2 className="card-hero-title">Review this card first</h2>
                    <div className="flashcard-meta" style={{ marginTop: 8, flexWrap: "wrap" }}>
                      {card.format || card.cardType ? (
                        <span className="status-pill">{(card.format || card.cardType || "").replaceAll("_", " ")}</span>
                      ) : null}
                      {card.subject ? <span>{card.subject}</span> : null}
                      {card.topic ? <span>· {card.topic}</span> : null}
                      {card.documentTitle ? (
                        <span>· {card.documentTitle}{card.pageNumber ? ` · p.${card.pageNumber}` : ""}</span>
                      ) : null}
                      {card.qualityVerdict ? (
                        <span>· {card.qualityVerdict.replaceAll("_", " ")}{card.qualityScore ? ` (${Math.round((card.qualityScore || 0) * 100)})` : ""}</span>
                      ) : null}
                    </div>
                  </div>
                  <span className="status-pill">{card.status.replaceAll("_", " ")}</span>
                </div>

                <div className="focus-card">
                  <div className="focus-card-block">
                    <div className="focus-card-label">Question</div>
                    <div className="focus-card-copy">{card.currentQuestion}</div>
                  </div>
                  <div className="focus-card-block">
                    <div className="focus-card-label">Answer</div>
                    <div className="focus-card-copy focus-card-answer">
                      {answerBlocks.map((block, index) => (
                        <p key={`${card.id}-answer-${index}`}>{block}</p>
                      ))}
                    </div>
                  </div>

                  {card.imageUrl ? (
                    <div className="focus-card-block">
                      <div className="focus-card-label">Diagram</div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.imageUrl}
                        alt="card diagram"
                        style={{ maxWidth: "100%", borderRadius: 10, border: "1px solid #d0d7e2", background: "#fff" }}
                      />
                      {card.occlusions && card.occlusions.length ? (
                        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
                          Hidden labels: {card.occlusions.map((o) => o.label).join(", ")}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {card.options && card.options.length ? (
                    <div className="focus-card-block">
                      <div className="focus-card-label">Options</div>
                      <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                        {card.options.map((opt, i) => (
                          <li
                            key={`opt-${i}`}
                            style={{ color: opt.isCorrect ? "#1a7f4b" : undefined, fontWeight: opt.isCorrect ? 600 : 400 }}
                          >
                            {opt.text}{opt.isCorrect ? "  ✓ correct" : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {card.explanation ? (
                    <div className="focus-card-block">
                      <div className="focus-card-label">Explanation</div>
                      <div className="focus-card-copy">{card.explanation}</div>
                    </div>
                  ) : null}
                </div>

                {(card.question !== card.currentQuestion || card.answer !== card.currentAnswer) ? (
                  <div className="comparison-note">
                    This card has already diverged from the original generated version.
                  </div>
                ) : null}
              </div>

              {(card.question !== card.currentQuestion || card.answer !== card.currentAnswer) ? (
                <div className="panel">
                  <h2>Original generated version</h2>
                  <p><strong>Question:</strong> {card.question}</p>
                  <p><strong>Answer:</strong> {card.answer}</p>
                </div>
              ) : null}

              <details className="review-details" open>
                <summary>Source context</summary>
                <div className="details-body">
                  <p><strong>PDF source excerpt:</strong> {card.sourceSnippet || "No excerpt stored"}</p>
                  {sourceText ? <p><strong>Stored source context:</strong> {sourceText}</p> : null}
                  {hasDistinctOcr ? <p><strong>Raw OCR extract:</strong> {ocrText}</p> : null}
                  <p><strong>Evidence unit key:</strong> {card.evidenceUnit || "Not available"}</p>
                  <p><strong>Source document:</strong> {card.documentTitle || "Unknown"}{card.pageNumber ? ` — page ${card.pageNumber}` : ""}</p>
                  {card.sourcePdfUrl ? (
                    <div style={{ marginTop: 10 }}>
                      <a
                        className="btn btn-subtle"
                        href={`${card.sourcePdfUrl}#page=${card.pageNumber || 1}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open {card.documentTitle || "source PDF"} (page {card.pageNumber || 1})
                      </a>
                      <iframe
                        title="source pdf"
                        src={`${card.sourcePdfUrl}#page=${card.pageNumber || 1}&view=FitH`}
                        style={{ width: "100%", height: 460, marginTop: 10, border: "1px solid #d0d7e2", borderRadius: 10, background: "#fff" }}
                      />
                    </div>
                  ) : (
                    <p><strong>Page:</strong> {card.pageNumber}</p>
                  )}
                </div>
              </details>

              <details className="review-details">
                <summary>Reviewer guidance</summary>
                <div className="details-body">
                  <p><strong>Accept:</strong> card is correct and can remain as generated.</p>
                  <p><strong>Accept with edit:</strong> card is useful but the wording must be corrected before it is trusted.</p>
                  <p><strong>Reject:</strong> card should not be used. Add a rejection reason and an optional reviewer note for audit.</p>
                </div>
              </details>
            </div>

            <div className="card-focus-side">
              <ReviewForm card={card} reviews={reviews} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
