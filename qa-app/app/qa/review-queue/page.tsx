import Link from "next/link";
import { redirect } from "next/navigation";
import { qaBackendRuns } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";
import { QaBackendError } from "../backend-error";
import { QaHeader } from "@/app/components/qa-header";
import { PageHero } from "@/app/components/page-hero";

export default async function ReviewQueuePage() {
  const accessToken = await readQaSession();
  if (!accessToken) {
    redirect("/qa/login");
  }

  let runs;
  try {
    runs = await qaBackendRuns(accessToken);
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
        <QaHeader active="queue" />
        <QaBackendError message="The QA frontend could not reach the review backend service. Start the backend, then refresh this page." />
      </>
    );
  }

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
      <PageHero overline="QA Dashboard" title="Review queue" />

      <main className="page-shell">
        <div className="wrap">
          <div className="kpis">
            <div className="kpi gold"><div className="label">Active runs</div><div className="num">{runs.length}</div></div>
            <div className="kpi"><div className="label">Pending cards</div><div className="num">{runs.reduce((sum, run) => sum + run.pending, 0)}</div></div>
            <div className="kpi"><div className="label">Accepted</div><div className="num">{runs.reduce((sum, run) => sum + run.accepted, 0)}</div></div>
            <div className="kpi"><div className="label">Edited</div><div className="num">{runs.reduce((sum, run) => sum + run.edited, 0)}</div></div>
          </div>

          <div className="panel">
            <h2>Runs ready for review</h2>
            {runs.map((run) => (
              <div className="review-run-card" key={run.id}>
                <div className="review-run-copy">
                  <div className="flashcard-top">
                    <span className="flashcard-type">Run</span>
                    <span className="status-pill">{run.status}</span>
                  </div>
                  <div className="review-run-title">
                    <Link href={`/qa/review-queue/${run.id}`}>{run.documentTitle}</Link>
                  </div>
                  <div className="review-run-meta">
                    <span>{run.totalCards} cards</span>
                    <span>{run.pending} pending</span>
                    <span>{run.accepted} accepted</span>
                    <span>{run.rejected} rejected</span>
                  </div>
                </div>
                <div className="review-run-actions">
                  <Link href={`/qa/review-queue/${run.id}`} className="btn btn-primary">
                    Open run
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="two-col">
            <div className="panel">
              <h2>How reviewers work</h2>
              <p>
                Open a run, review only the pending cards, and move each approved or rejected card
                out of the active review path.
              </p>
            </div>
            <div className="panel">
              <h2>Review trail</h2>
              <p>Use history to see completed decisions and notes after cards leave the active queue.</p>
              <p><Link href="/qa/reviews">Open review history</Link></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
