import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

const sections = [
  {
    number: "01",
    title: "Using the public website",
    body: [
      "These terms describe the basic expectations around using the maritribeOne public website and its related media or learning surfaces.",
      "This page now exists as part of the migrated Next.js public app and should later be replaced with final approved legal text.",
    ],
  },
  {
    number: "02",
    title: "Content and availability",
    body: [
      "Public pages, podcast content, and learning previews may evolve over time. Features may be added, changed, or removed as the platform develops.",
    ],
  },
  {
    number: "03",
    title: "Internal-only workflows",
    body: [
      "Any internal QA or review workflow remains operational tooling and is not part of the public user-facing product experience, even if it exists in the same codebase.",
    ],
  },
  {
    number: "04",
    title: "No misuse of platform content",
    body: [
      "Users should not attempt to misuse, scrape, disrupt, or gain unauthorized access to private or internal parts of the system.",
    ],
  },
  {
    number: "05",
    title: "Updates",
    body: [
      "These terms may be revised as the product matures. The current page is an implementation-level migration placeholder pending final legal review.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PublicHeader active="none" />

      <section className="support-hero support-hero-anchor">
        <div className="wrap support-hero-inner">
          <p className="overline">Legal</p>
          <h1>Terms of Service</h1>
          <p className="support-hero-sub">
            A user-side legal route migrated into the Next.js public shell so it can be maintained
            alongside the rest of the site.
          </p>
        </div>
      </section>

      <main className="support-shell">
        <div className="wrap support-wrap">
          <section className="support-toc">
            <p className="support-toc-title">On this page</p>
            <div className="support-toc-grid">
              {sections.map((section) => (
                <a key={section.number} href={`#terms-${section.number}`} className="support-toc-item">
                  <span>{section.number}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </section>

          {sections.map((section) => (
            <section className="support-section" id={`terms-${section.number}`} key={section.number}>
              <header className="support-section-header">
                <div className="support-section-num">{section.number}</div>
                <h2>{section.title}</h2>
              </header>
              <div className="support-section-body">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
