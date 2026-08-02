import type { Metadata } from "next";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";
import { faqDeleteCard, faqGroups, faqHero, faqIntro } from "@/lib/faq-content";

export const metadata: Metadata = {
  title: "FAQ — maritribeOne",
  description:
    "Answers on privacy, communities, direct messaging, posting, and moderation for the MaritribeOne alumni network.",
};

export default function FaqPage() {
  return (
    <>
      <PublicHeader active="none" />

      <section className="support-hero support-hero-anchor">
        <div className="wrap support-hero-inner">
          <p className="overline">Support</p>
          <h1>{faqHero.title}</h1>
          <p className="support-hero-sub">{faqHero.subtitle}</p>
        </div>
      </section>

      <main className="support-shell">
        <div className="wrap support-wrap">
          <section className="support-intro-card">
            <p>{faqIntro}</p>
          </section>

          {faqGroups.map((group) => (
            <section className="faq-group" key={group.title}>
              <header className="faq-group-header">
                <h2>{group.title}</h2>
                <p>{group.subtitle}</p>
              </header>

              <div className="faq-list">
                {group.items.map((item) => (
                  <details className="faq-item" key={item.q}>
                    <summary>{item.q}</summary>
                    {/* Answer markup is ported from this repo's own legacy page and
                        restricted to an inline-tag allowlist at extraction time. */}
                    <div
                      className="faq-answer"
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </details>
                ))}
              </div>
            </section>
          ))}

          {faqDeleteCard ? (
            <aside className="faq-delete-card">
              <div>
                <p className="faq-delete-title">{faqDeleteCard.title}</p>
                <p className="faq-delete-desc">{faqDeleteCard.desc}</p>
              </div>
              <a className="faq-delete-link" href={faqDeleteCard.href}>
                {faqDeleteCard.label}
              </a>
            </aside>
          ) : null}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
