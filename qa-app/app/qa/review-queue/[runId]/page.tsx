import Link from "next/link";
import { notFound } from "next/navigation";
import { qaBackendRun, qaBackendRunCards } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { QaBackendError } from "../../backend-error";
import { RunCardsList } from "./run-cards-list";
import { QaHeader } from "@/app/components/qa-header";
import { PageHero } from "@/app/components/page-hero";

export default async function RunDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ runId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const accessToken = await readQaSession();
  if (!accessToken) {
    redirect("/qa/login");
  }

  const { runId } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(Number(page ?? "1") || 1, 1);
  let runData;
  let cardsData;
  try {
    [runData, cardsData] = await Promise.all([
      qaBackendRun(accessToken, runId),
      qaBackendRunCards(accessToken, runId, currentPage, 50),
    ]);
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
          <QaHeader active="queue" />
          <QaBackendError message="Run details could not be loaded because the QA backend is not reachable." />
        </>
      );
    }
    notFound();
  }

  if (!runData || !cardsData || !("run" in runData) || !("cards" in cardsData)) {
    return runData as any;
  }

  const { run } = runData;
  const { cards, pagination } = cardsData;

  return (
    <>
      <QaHeader
        active="queue"
        trailing={
          <form action="/api/qa-auth/logout" method="post">
            <button className="btn btn-ghost-light" type="submit">Logout</button>
          </form>
        }
      />
      <PageHero overline="Run Detail" title={run.documentTitle} />

      <main className="page-shell">
        <div className="wrap">
          <div className="two-col">
            <div className="panel">
              <h2>Run summary</h2>
              <p>Status: <span className="status-pill">{run.status}</span></p>
              <p>Total cards: {run.totalCards}</p>
              <p>Pending: {run.pending}</p>
              <p>Accepted: {run.accepted}</p>
              <p>Edited: {run.edited}</p>
              <p>Rejected: {run.rejected}</p>
            </div>

            <div className="panel">
              <h2>Review focus</h2>
              <p>Work through pending cards first, then use history only for traceability after a decision is made.</p>
            </div>
          </div>

          <RunCardsList cards={cards} runId={run.id} currentPage={pagination.page} />

          <div className="panel">
            <div className="toolbar">
              <div className="toolbar-copy">
                <h2>Card pages</h2>
                <p>
                  Showing page {pagination.page} of {pagination.totalPages} with {pagination.limit} cards per page.
                </p>
              </div>
              <div className="toolbar-actions">
                {pagination.hasPreviousPage ? (
                  <Link href={`/qa/review-queue/${run.id}?page=${pagination.page - 1}`} className="btn btn-subtle">
                    Previous page
                  </Link>
                ) : null}
                {pagination.hasNextPage ? (
                  <Link href={`/qa/review-queue/${run.id}?page=${pagination.page + 1}`} className="btn btn-primary">
                    Next page
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
