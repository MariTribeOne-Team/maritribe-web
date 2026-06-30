import Link from "next/link";
import { SiteBrand } from "@/app/components/site-brand";

export default function QaLoginPage() {
  return (
    <div className="login-shell">
      <div className="login-brand">
        <div>
          <div style={{ marginBottom: 32 }}>
            <SiteBrand />
          </div>
          <h1>Review cards before they reach learners.</h1>
          <p className="blurb">
            Sign in to inspect generated flashcards, compare source context, and decide what is accepted, edited, or rejected.
          </p>
        </div>
        <div className="login-brand-footer">
          <div className="login-brand-note">Internal reviewer surface only.</div>
          <div className="login-brand-points">
            <span>Pending-first queue</span>
            <span>Card-focused review</span>
            <span>Decision history</span>
          </div>
        </div>
      </div>

      <div className="login-main">
        <div className="login-card">
          <h2>Reviewer sign in</h2>
          <p className="lead">Use your reviewer credentials to open the active queue.</p>

          <form action="/api/qa-auth/login" method="post">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Enter reviewer email" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" required />
            </div>
            <button className="btn btn-primary btn-block" type="submit">Sign in</button>
          </form>

          <div className="login-side-note">
            Reviewer access is separate from the public study deck and only opens the internal review workflow after authentication.
          </div>
          <p style={{ marginTop: 14, fontSize: 13 }}>
            <Link href="/">← Back to QA home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
