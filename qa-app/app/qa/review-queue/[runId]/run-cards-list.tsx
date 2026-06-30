"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BackendCard } from "@/lib/qa-backend";

export function RunCardsList({
  cards,
  runId,
  currentPage,
}: {
  cards: BackendCard[];
  runId: string;
  currentPage: number;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("PENDING_REVIEW");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (status !== "ALL" && card.status !== status) {
        return false;
      }

      if (!q) {
        return true;
      }

      const haystack = [
        card.currentQuestion,
        card.currentAnswer,
        card.question,
        card.answer,
        card.evidenceUnit,
        card.sourceSnippet,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [cards, query, status]);

  const visibleCards = filteredCards.slice(0, visibleCount);

  const nextPending = cards.find((card) => card.status === "PENDING_REVIEW") ?? filteredCards[0];
  const pendingCount = cards.filter((card) => card.status === "PENDING_REVIEW").length;
  const acceptedCount = cards.filter((card) => card.status === "ACCEPTED" || card.status === "ACCEPTED_WITH_EDIT").length;
  const rejectedCount = cards.filter((card) => card.status === "REJECTED").length;
  const reviewedCount = acceptedCount + rejectedCount;
  const firstPending = visibleCards.find((card) => card.status === "PENDING_REVIEW") ?? visibleCards[0];

  return (
    <div className="panel">
      <div className="toolbar">
        <div className="toolbar-copy">
          <h2>Active review queue</h2>
          <p>Start with pending cards. Reviewed items stay available only when you explicitly switch the filter.</p>
        </div>
        {nextPending ? (
          <div className="toolbar-actions">
            <Link href={`/qa/cards/${nextPending.id}?runId=${runId}&page=${currentPage}`} className="btn btn-primary">
              Open next review
            </Link>
          </div>
        ) : null}
      </div>

      <div className="flashcard-meta" style={{ marginBottom: 16 }}>
        <span>{pendingCount} pending</span>
        <span>{acceptedCount} accepted</span>
        <span>{rejectedCount} rejected</span>
        <span>{reviewedCount} reviewed</span>
      </div>

      <div className="review-tools">
        <input
          className="search-input"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(80);
          }}
          placeholder="Search question, answer, evidence, or snippet"
        />
        <select
          className="qa-select status-filter"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setVisibleCount(80);
          }}
        >
          <option value="PENDING_REVIEW">Pending review</option>
          <option value="ALL">All statuses</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="ACCEPTED_WITH_EDIT">Accepted with edit</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <p className="results-copy">
        Showing {Math.min(visibleCards.length, filteredCards.length)} of {filteredCards.length}{" "}
        {status === "PENDING_REVIEW" ? "pending cards" : "filtered cards"} ({cards.length} total in run).
      </p>

      {firstPending ? (
        <div className="next-review-banner">
          <div className="next-review-copy">
            <div className="focus-card-label">Next review target</div>
            <h3>{firstPending.currentQuestion}</h3>
            <p>{firstPending.sourceSnippet || firstPending.currentAnswer}</p>
          </div>
          <Link href={`/qa/cards/${firstPending.id}?runId=${runId}&page=${currentPage}`} className="btn btn-primary">
            Open focused review
          </Link>
        </div>
      ) : null}

      {visibleCards.map((card) => (
        <div className={`list-row review-card-row ${card.status !== "PENDING_REVIEW" ? "is-reviewed" : ""}`} key={card.id}>
          <div className="review-card-copy">
            <div className="review-card-question">
              <Link href={`/qa/cards/${card.id}?runId=${runId}&page=${currentPage}`}>{card.currentQuestion}</Link>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              Page {card.pageNumber} · {card.status.replaceAll("_", " ")}
            </div>
            <div className="review-card-snippet">
              {card.sourceSnippet || card.currentAnswer}
            </div>
          </div>
          <div className="review-card-actions">
            <span className="status-pill">{card.status.replaceAll("_", " ")}</span>
            <Link href={`/qa/cards/${card.id}?runId=${runId}&page=${currentPage}`} className="btn btn-subtle">
              Review card
            </Link>
          </div>
        </div>
      ))}

      {visibleCount < filteredCards.length ? (
        <div className="load-more-wrap">
          <button className="btn btn-subtle" type="button" onClick={() => setVisibleCount((count) => count + 24)}>
            Load more cards
          </button>
        </div>
      ) : null}
    </div>
  );
}
