import Link from "next/link";
import { redirect } from "next/navigation";
import { qaBackendRecentReviews } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";
import { QaBackendError } from "../backend-error";
import { resolveReviewerDisplay } from "@/lib/reviewer-display";
import { QaHeader } from "@/app/components/qa-header";
import { PageHero } from "@/app/components/page-hero";

export default async function QaReviewsPage() {
  const accessToken = await readQaSession();
  if (!accessToken) {
    redirect("/qa/login");
  }

  let reviews: Array<{
    id: string;
    flashcardId: string;
    flashcardQuestion?: string;
    runId?: string;
    qaUserId: string;
    qaUserName?: string;
    qaUserEmail?: string;
    action: string;
    rejectionReason: string | null;
    reviewerNote: string | null;
    originalQuestion: string;
    originalAnswer: string;
    finalQuestion: string | null;
    finalAnswer: string | null;
    reviewVersion: number;
    isCurrent: boolean;
    createdAt: string;
  }> = [];

  try {
    const result = await qaBackendRecentReviews(accessToken, 40);
    reviews = Array.isArray(result) ? result : [];
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
    return (
      <>
        <QaHeader active="history" />
        <QaBackendError message="Recent review history could not be loaded because the QA backend is not reachable." />
      </>
    );
  }

  return (
    <>
      <QaHeader
        active="history"
        trailing={
          <form action="/api/qa-auth/logout" method="post">
            <button className="btn btn-ghost-light" type="submit">Logout</button>
          </form>
        }
      />
      <PageHero overline="QA Review History" title="Current review decisions" />

      <main className="page-shell">
        <div className="wrap">
          <div className="panel">
            <h2>Latest card outcomes</h2>
            {reviews.length === 0 ? (
              <p>No review activity yet.</p>
            ) : (
              reviews.map((review) => (
                <article className="history-entry" key={review.id}>
                  <div className="history-entry-top">
                    <div className="history-version-block">
                      <span className="flashcard-type">v{review.reviewVersion}</span>
                      <p className="history-time">
                        {review.createdAt ? new Date(review.createdAt).toLocaleString() : "Unknown time"}
                      </p>
                    </div>
                    <span className="status-pill">{String(review.action ?? "UNKNOWN").replaceAll("_", " ")}</span>
                  </div>
                  <p className="history-card-title">
                    {review.flashcardId ? (
                      <Link href={`/qa/cards/${review.flashcardId}`}>{review.flashcardQuestion ?? review.flashcardId}</Link>
                    ) : null}
                  </p>
                  <div className="history-facts">
                    <span>Reviewer: {resolveReviewerDisplay(review)}</span>
                    {review.runId ? <span>Run linked</span> : null}
                  </div>
                  {review.reviewerNote ? (
                    <div className="history-callout">
                      <div className="focus-card-label">Reviewer note</div>
                      <p>{review.reviewerNote}</p>
                    </div>
                  ) : null}
                  {review.rejectionReason ? (
                    <div className="history-callout history-callout-reject">
                      <div className="focus-card-label">Rejection reason</div>
                      <p>{review.rejectionReason}</p>
                    </div>
                  ) : null}
                  {review.finalQuestion || review.finalAnswer ? (
                    <div className="history-edit-block">
                      <div className="focus-card-label">Edited output</div>
                      {review.finalQuestion ? <p><strong>Question:</strong> {review.finalQuestion}</p> : null}
                      {review.finalAnswer ? <p><strong>Answer:</strong> {review.finalAnswer}</p> : null}
                    </div>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
