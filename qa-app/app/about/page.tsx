import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "../components/public-header";
import { PageHero } from "../components/page-hero";
import { PublicFooter } from "../components/public-footer";

const timeline = [
  {
    role: "Founder and operator",
    org: "maritribeOne",
    when: "Current",
  },
  {
    role: "Maritime professional at sea",
    org: "Operational shipping background",
    when: "Earlier chapter",
  },
  {
    role: "Builder of digital tools for maritime",
    org: "Shore-side transition",
    when: "Ongoing",
  },
];

/**
 * Route withheld. `/about` is not part of the current public site: it is unlinked
 * from the nav and footer, and returns 404 so it cannot be reached or indexed.
 * Flip this to `true` (and re-add the nav/footer links) to bring the page back.
 */
const ROUTE_ENABLED = false;

export default function AboutPage() {
  if (!ROUTE_ENABLED) notFound();

  return (
    <>
      <PublicHeader active="none" />
      <PageHero overline="About" title="The person and the curiosity behind maritribeOne">
        <p className="marketing-hero-copy">
          This route replaces the old standalone About page and keeps the public-side story inside
          the same Next.js application as the rest of the migrated site.
        </p>
      </PageHero>

      <main className="page-shell marketing-shell">
        <div className="wrap">
          <section className="about-hero-card">
            <div className="about-photo-placeholder">MT</div>
            <div className="about-hero-copy">
              <p className="overline">About</p>
              <h1>Founder profile</h1>
              <p className="about-role">Maritime · Product · Systems thinking</p>
              <div className="about-socials">
                <a href="#">LinkedIn ↗</a>
                <a href="mailto:hello@maritribeone.com">Email</a>
              </div>
            </div>
          </section>

          <article className="about-article">
            <p className="about-lead">
              A short founder quote or one-line introduction lives here. This route is now migrated
              and ready for the real narrative copy once it is finalized.
            </p>

            <p>
              Add the founder&apos;s background here: a paragraph or two introducing who they are,
              what they saw while sailing, and what pushed them to build a public storytelling and
              learning layer for maritime.
            </p>

            <h2>Where the idea came from</h2>
            <p>
              This section can hold the bridge between shipboard experience and the curiosity that
              followed onshore. The intent is to explain why maritribeOne is not just media, but a
              way to make the wider industry more legible to the people already inside it.
            </p>

            <section className="about-mission-card">
              <h2>Why maritribe</h2>
              <p>
                Mission statement placeholder: describe what maritribeOne is here to do and who it
                serves.
              </p>
              <p>
                Add the sharper final mission copy here once the brand narrative is signed off.
              </p>
            </section>

            <h2>The journey so far</h2>
            <ul className="about-timeline">
              {timeline.map((item) => (
                <li key={`${item.role}-${item.when}`}>
                  <div className="tl-role">{item.role}</div>
                  <div className="tl-org">{item.org}</div>
                  <div className="tl-when">{item.when}</div>
                </li>
              ))}
            </ul>

            <h2>What comes next</h2>
            <p>
              This final section can connect the podcast, the user-side public site, and the
              eventual learning surfaces into one visible direction for the product.
            </p>

            <p className="about-cta-wrap">
              <Link href="/episodes" className="home-cta home-cta-primary">
                Listen to the podcast
              </Link>
            </p>
          </article>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
