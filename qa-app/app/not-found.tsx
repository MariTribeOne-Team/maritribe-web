import Link from "next/link";
import { PublicHeader } from "./components/public-header";
import { PublicFooter } from "./components/public-footer";

export default function NotFound() {
  return (
    <>
      <PublicHeader active="none" />

      <section className="notfound">
        <div className="wrap notfound-inner">
          <p className="notfound-code" aria-hidden="true">
            404
          </p>
          <p className="overline">Off the chart</p>
          <h1>This page isn&apos;t on the route.</h1>
          <p className="notfound-copy">
            The link may be old, or the page may not have sailed yet. The episodes are the best
            place to pick things back up.
          </p>
          <div className="notfound-actions">
            <Link href="/episodes" className="home-cta home-cta-primary">
              Browse episodes
            </Link>
            <Link href="/" className="home-cta home-cta-secondary">
              Back to home
            </Link>
            <Link href="/contact" className="home-cta home-cta-secondary">
              Report a broken link
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}
