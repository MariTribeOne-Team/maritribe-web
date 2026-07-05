import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";
import { PublicFooter } from "../components/public-footer";

export default function ContactPage() {
  return (
    <>
      <PublicHeader active="contact" mode="marketing" />
      <PageHero overline="Contact" title="Reach the maritribeOne team">
        <p className="marketing-hero-copy">
          A lightweight public route for now. This will later connect to the full user-side
          contact workflow after the remaining static pages are migrated.
        </p>
      </PageHero>

      <main className="page-shell marketing-shell">
        <div className="wrap">
          <section className="marketing-panel contact-panel">
            <div>
              <p className="marketing-kicker">General enquiries</p>
              <h2>Use this as the public contact entry point</h2>
              <p>
                Keep this route user-facing only. QA access should stay separate and should not be
                linked from the public navigation.
              </p>
            </div>

            <div className="contact-actions">
              <a className="home-cta home-cta-primary" href="mailto:hello@maritribeone.com">
                hello@maritribeone.com
              </a>
              <Link className="home-cta home-cta-secondary" href="/episodes">
                View episodes
              </Link>
            </div>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
