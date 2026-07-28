import "./share.css";
import { StickyBar } from "./_components/sticky-bar";

// Layout for the app share / deep-link pages (/p, /c, /invite). Deliberately does
// NOT use the marketing header/footer — this is the app-landing visual world.
export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="share-page">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="topbar">
        <a className="topbar-logo" href="/"><span>MT</span></a>
        <a className="topbar-title" href="/">Maritribe</a>
      </div>

      <div className="share-container">{children}</div>

      <StickyBar />
      <div className="site-footer">Built with care for maritime alumni</div>
    </div>
  );
}
