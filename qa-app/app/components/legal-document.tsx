import type { LegalBlock, LegalDocument as LegalDocumentData } from "@/lib/legal-content";

/**
 * Renders a ported legal document. The `html` strings come from
 * `lib/legal-content.ts`, which is generated from this repository's own legacy
 * pages and restricted at extraction time to an inline-tag allowlist — there is
 * no user input anywhere in this path.
 */
function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "p":
            return <p key={index} dangerouslySetInnerHTML={{ __html: block.html }} />;

          case "caps":
            return (
              <p
                key={index}
                className="legal-caps"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );

          case "list": {
            const items = block.items.map((item, itemIndex) => (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
            ));
            return block.ordered ? (
              <ol key={index} className="legal-list">
                {items}
              </ol>
            ) : (
              <ul key={index} className="legal-list">
                {items}
              </ul>
            );
          }

          case "sub":
            return (
              <div className="legal-sub" key={index}>
                <p className="legal-sub-label">{block.label}</p>
                <Blocks blocks={block.blocks} />
              </div>
            );

          case "grievance":
            return (
              <div className="legal-grievance" key={index}>
                <p className="legal-grievance-label">{block.label}</p>
                <p className="legal-grievance-name">{block.name}</p>
                <p
                  className="legal-grievance-contact"
                  dangerouslySetInnerHTML={{ __html: block.contactHtml }}
                />
                <ul className="legal-grievance-timings">
                  {block.timings.map((timing) => (
                    <li key={timing}>{timing}</li>
                  ))}
                </ul>
              </div>
            );
        }
      })}
    </>
  );
}

export function LegalDocument({
  doc,
  heroModifier,
}: {
  doc: LegalDocumentData;
  heroModifier: "support-hero-lock" | "support-hero-anchor";
}) {
  return (
    <>
      <section className={`support-hero ${heroModifier}`}>
        <div className="wrap support-hero-inner">
          <p className="overline">Legal</p>
          <h1>{doc.title}</h1>
          <p className="support-hero-sub">{doc.subtitle}</p>
        </div>
      </section>

      <main className="support-shell">
        <div className="wrap support-wrap">
          <nav className="support-toc" aria-label="On this page">
            <p className="support-toc-title">Contents</p>
            <div className="support-toc-grid">
              {doc.sections.map((section) => (
                <a className="support-toc-item" href={`#s${section.num}`} key={section.num}>
                  <span>{section.num}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </nav>

          {doc.sections.map((section) => (
            <section className="support-section" id={`s${section.num}`} key={section.num}>
              <header className="support-section-header">
                <div className="support-section-num">{section.num}</div>
                <h2>{section.title}</h2>
              </header>
              <div className="support-section-body">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
