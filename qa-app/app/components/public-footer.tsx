import Link from "next/link";
import { SiteBrand } from "./site-brand";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="wrap public-footer-inner">
        <div className="public-footer-brand">
          <SiteBrand />
          <p>Stories, systems, and learning layers for the maritime industry.</p>
        </div>

        <div className="public-footer-links">
          <div>
            <p className="public-footer-heading">Explore</p>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/episodes">Episodes</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <p className="public-footer-heading">Support</p>
            <Link href="/faq">FAQ</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
