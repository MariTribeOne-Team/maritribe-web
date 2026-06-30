"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BackendCard, BackendReview } from "@/lib/qa-backend";
import { resolveReviewerDisplay } from "@/lib/reviewer-display";

type Props = {
  card: BackendCard;
  reviews: BackendReview[];
};

type ReviewAction = "ACCEPTED" | "ACCEPTED_WITH_EDIT" | "REJECTED";

export function ReviewForm({ card, reviews }: Props) {
  const router = useRouter();
  const [action, setAction] = useState<ReviewAction>("ACCEPTED");
  const [reviewerNote, setReviewerNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [finalQuestion, setFinalQuestion] = useState(card.currentQuestion);
  const [finalAnswer, setFinalAnswer] = useState(card.currentAnswer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const payload: Record<string, string> = {
      action,
    };

    if (reviewerNote.trim()) payload.reviewerNote = reviewerNote.trim();
    if (action === "REJECTED" && rejectionReason.trim()) payload.rejectionReason = rejectionReason.trim();
    if (action === "ACCEPTED_WITH_EDIT") {
      payload.finalQuestion = finalQuestion.trim();
      payload.finalAnswer = finalAnswer.trim();
    }

    const response = await fetch(`/api/qa/cards/${card.id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(String(data.error ?? "Unable to submit review"));
      setIsSubmitting(false);
      return;
    }

    setSuccess("Review submitted to the QA backend.");
    setIsSubmitting(false);
    router.push(`/qa/review-queue/${card.runId}?reviewed=${card.id}`);
    router.refresh();
  }

  return (
    <div className="panel">
      <h2>Review decision</h2>
      <p>Choose one action, then add only the extra detail that action needs.</p>

      <div className="decision-strip">
        <button type="button" className={`decision-chip ${action === "ACCEPTED" ? "active" : ""}`} onClick={() => setAction("ACCEPTED")}>
          Accept
        </button>
        <button type="button" className={`decision-chip ${action === "ACCEPTED_WITH_EDIT" ? "active" : ""}`} onClick={() => setAction("ACCEPTED_WITH_EDIT")}>
          Accept with edit
        </button>
        <button type="button" className={`decision-chip ${action === "REJECTED" ? "active" : ""}`} onClick={() => setAction("REJECTED")}>
          Reject
        </button>
      </div>

      <form onSubmit={onSubmit} className="review-form">
        <div className="decision-helper">
          {action === "ACCEPTED" ? "Approve the current card as-is." : null}
          {action === "ACCEPTED_WITH_EDIT" ? "Approve the card with corrected wording below." : null}
          {action === "REJECTED" ? "Reject the card and explain why it should not be shown." : null}
        </div>

        {action === "ACCEPTED_WITH_EDIT" ? (
          <>
            <div className="field">
              <label htmlFor="final-question">Edited question</label>
              <textarea
                id="final-question"
                className="qa-textarea"
                value={finalQuestion}
                onChange={(event) => setFinalQuestion(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="final-answer">Edited answer</label>
              <textarea
                id="final-answer"
                className="qa-textarea"
                value={finalAnswer}
                onChange={(event) => setFinalAnswer(event.target.value)}
              />
            </div>
          </>
        ) : null}

        {action === "REJECTED" ? (
          <div className="field">
            <label htmlFor="rejection-reason">Rejection reason</label>
            <textarea
              id="rejection-reason"
              className="qa-textarea"
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              placeholder="Explain why this card should not be shown to users."
            />
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="reviewer-note">Reviewer note</label>
          <textarea
            id="reviewer-note"
            className="qa-textarea"
            value={reviewerNote}
            onChange={(event) => setReviewerNote(event.target.value)}
            placeholder="Add context for why you accepted, edited, or rejected this card."
          />
        </div>

        {error ? <div className="err">{error}</div> : null}
        {success ? <div className="ok">{success}</div> : null}

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit review"}
        </button>
      </form>

      <details className="review-details review-history-details">
        <summary>Review history</summary>
        <div className="details-body">
          {reviews.length === 0 ? (
            <p>No review decisions yet for this card.</p>
          ) : (
            reviews.map((review) => (
              <div className="history-entry" key={review.id}>
                <div className="flashcard-top">
                  <span className="flashcard-type">v{review.reviewVersion}</span>
                  <span className="status-pill">{review.action.replaceAll("_", " ")}</span>
                </div>
                <p><strong>Reviewer:</strong> {resolveReviewerDisplay(review)}</p>
                {review.reviewerNote ? <p><strong>Note:</strong> {review.reviewerNote}</p> : null}
                {review.rejectionReason ? <p><strong>Rejection:</strong> {review.rejectionReason}</p> : null}
                {review.finalQuestion ? <p><strong>Edited question:</strong> {review.finalQuestion}</p> : null}
                {review.finalAnswer ? <p><strong>Edited answer:</strong> {review.finalAnswer}</p> : null}
                <p className="history-time">{new Date(review.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </details>
    </div>
  );
}
