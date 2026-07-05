import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";
import { episodeSummaries } from "@/lib/public-content";

const bookmarks = episodeSummaries.slice(0, 3);
const highlights = [
  {
    quote:
      "The stories welfare workers see and never share publicly often explain more about the system than any official report.",
    title: "The seafarer's mind",
    href: `/episodes/${episodeSummaries[3]?.slug ?? episodeSummaries[0].slug}`,
  },
  {
    quote:
      "The terminals that invested least in automation often outperformed the ones that invested most.",
    title: "Automation paradoxes at India's largest container terminal",
    href: `/episodes/${episodeSummaries[1]?.slug ?? episodeSummaries[0].slug}`,
  },
];

export default function AccountPage() {
  return (
    <>
      <PublicHeader active="account" mode="marketing" />

      <section className="hero-band">
        <div className="wrap">
          <p className="overline">My account</p>
          <h1 className="page-hero-title">Your library</h1>
          <p className="marketing-hero-copy">
            Saved episodes, highlights, and future listener tools can all live here inside the
            Next.js app.
          </p>
        </div>
      </section>

      <main className="page-shell marketing-shell">
        <div className="account-wrap">
          <div className="account-tabs">
            <span className="active">Bookmarks</span>
            <span>Highlights</span>
          </div>

          <section className="account-section">
            <h2>Bookmarked episodes</h2>
            <div className="account-card-grid">
              {bookmarks.map((item) => (
                <Link href={`/episodes/${item.slug}`} key={item.slug} className="account-save-card">
                  <div className="account-save-thumb">
                    <span>{item.number}</span>
                  </div>
                  <div className="account-save-body">
                    <p className="marketing-kicker">{item.category}</p>
                    <h3>{item.title}</h3>
                    <p>
                      {item.author} <span className="dot">·</span> {item.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="account-section">
            <h2>Saved highlights</h2>
            <div className="highlight-list">
              {highlights.map((item) => (
                <div className="highlight-item" key={item.quote}>
                  <p className="highlight-quote">“{item.quote}”</p>
                  <Link href={item.href}>{item.title} →</Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
