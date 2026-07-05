import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

const sections = [
  {
    number: "01",
    title: "What this page covers",
    body: [
      "This Privacy page explains, at a high level, how maritribeOne may collect, use, and store information as the public website and related product surfaces evolve.",
      "It is currently a migrated public support route inside the Next.js app and can be refined further when legal copy is finalized.",
    ],
  },
  {
    number: "02",
    title: "Information you may provide",
    body: [
      "If you contact the team, subscribe later, or interact with public forms, the platform may receive information such as your name, email address, and message content.",
      "If product features are introduced later, additional user data handling should be reflected here before release.",
    ],
  },
  {
    number: "03",
    title: "How information may be used",
    body: [
      "Information may be used to respond to enquiries, improve the website, operate public content surfaces, and support product functionality connected to maritime learning or media delivery.",
    ],
  },
  {
    number: "04",
    title: "Internal review systems",
    body: [
      "Internal QA routes exist separately from the public site. Those review workflows are not intended as public-facing features and should be treated as internal operational tooling.",
    ],
  },
  {
    number: "05",
    title: "Changes and final legal review",
    body: [
      "This migrated version should be treated as an implementation-ready public route, not final legal advice. Final approved privacy copy should replace this content before public launch.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader active="contact" mode="marketing" />

      <section className="support-hero support-hero-lock">
        <div className="wrap support-hero-inner">
          <p className="overline">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="support-hero-sub">
            A migrated public legal route that can now be maintained inside the same Next.js
            application as the rest of the user-facing site.
          </p>
        </div>
      </section>

      <main className="support-shell">
        <div className="wrap support-wrap">
          <section className="support-toc">
            <p className="support-toc-title">On this page</p>
            <div className="support-toc-grid">
              {sections.map((section) => (
                <a key={section.number} href={`#privacy-${section.number}`} className="support-toc-item">
                  <span>{section.number}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </section>

          {sections.map((section) => (
            <section className="support-section" id={`privacy-${section.number}`} key={section.number}>
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
