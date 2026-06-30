import Link from "next/link";
import { PublicHeader } from "./components/public-header";
import { PageHero } from "./components/page-hero";

export default async function HomePage() {
  return (
    <>
      <PublicHeader active="home" />
      <PageHero overline="Maritime Learning" title="Study deck and reviewer workspace" />
      <main className="page-shell">
        <div className="wrap">
          <div className="kpis">
            <div className="kpi gold">
              <div className="label">Track</div>
              <div className="num">2</div>
            </div>
            <div className="kpi">
              <div className="label">QA Workflow</div>
              <div className="num">Live</div>
            </div>
            <div className="kpi">
              <div className="label">Deck</div>
              <div className="num">Ready</div>
            </div>
            <div className="kpi">
              <div className="label">Review</div>
              <div className="num">Live</div>
            </div>
          </div>
          <div className="panel">
            <h2>What this space is for</h2>
            <p>
              Learners can browse the deck and explore answers. Reviewers can sign in separately
              to check cards before they are trusted for broader use.
            </p>
            <p>
              The public experience stays focused on studying, while the review workspace stays
              focused on card quality and reviewer decisions.
            </p>
            <p>
              Use Deck to browse cards, Ask to explore responses, and QA only if you are
              reviewing content.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <Link href="/deck" className="btn btn-primary">Open deck</Link>
              <Link href="/ask" className="btn">Open ask</Link>
              <Link href="/qa/login" className="btn">Open QA</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
