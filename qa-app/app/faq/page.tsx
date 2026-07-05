import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

const faqGroups = [
  {
    title: "About maritribeOne",
    subtitle: "What the platform is trying to do",
    items: [
      {
        q: "What is maritribeOne?",
        a: "maritribeOne is a user-side maritime platform that brings podcast storytelling, public industry explainers, and learning-oriented product surfaces into one place.",
      },
      {
        q: "Who is it for?",
        a: "It is primarily for maritime professionals, seafarers, students, and people trying to understand how different parts of the shipping industry connect.",
      },
    ],
  },
  {
    title: "Content and access",
    subtitle: "How the public site differs from internal tools",
    items: [
      {
        q: "Is the QA workflow part of the public website?",
        a: "No. QA routes live inside the same application for implementation reasons, but they are separate internal review surfaces and are not part of the public navigation flow.",
      },
      {
        q: "Will episodes, articles, and learning content all live in the same app?",
        a: "Yes. The current migration is moving the old standalone HTML site into one Next.js application so public content and future product pages share one maintained frontend.",
      },
    ],
  },
  {
    title: "Next steps",
    subtitle: "What will expand later",
    items: [
      {
        q: "Is this the final public experience?",
        a: "Not yet. The current phase is a structured migration of the public website into the Next.js app. More pages, richer content, and backend-driven user features can be added on top of this shell.",
      },
      {
        q: "Can learners already use the study deck?",
        a: "A preview surface exists, but the long-term separation between public media pages and learning/product flows still needs to be finalized as the exam-prep backend is completed.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PublicHeader active="contact" mode="marketing" />

      <section className="support-hero support-hero-anchor">
        <div className="wrap support-hero-inner">
          <p className="overline">Support</p>
          <h1>Frequently Asked Questions</h1>
          <p className="support-hero-sub">
            A quick explanation of what the platform is, what is public, and what is still being
            built.
          </p>
        </div>
      </section>

      <main className="support-shell">
        <div className="wrap support-wrap">
          <section className="support-intro-card">
            <p>
              This page now lives inside the Next.js public shell. It replaces the old standalone
              FAQ page and gives the public site a proper support/documentation entry point.
            </p>
          </section>

          {faqGroups.map((group) => (
            <section className="faq-group" key={group.title}>
              <header className="faq-group-header">
                <h2>{group.title}</h2>
                <p>{group.subtitle}</p>
              </header>

              <div className="faq-list">
                {group.items.map((item, index) => (
                  <details className="faq-item" key={item.q} open={index === 0}>
                    <summary>{item.q}</summary>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
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
