import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const isSignup = mode === "signup";

  return (
    <main className="login-shell">
      <section className="login-brand">
        <div>
          <Link href="/" className="login-brand-top">
            <span className="brand-mark brand-mark-login">M</span>
            <span className="brand-name brand-name-login">maritribeOne</span>
          </Link>
        </div>

        <div>
          <h1>Charting new waters for maritime professionals.</h1>
          <p className="blurb">
            Sign in to make the podcast yours, keep the episodes you love, and save the moments
            that matter.
          </p>
          <ul className="login-feature-list">
            <li>
              <span className="login-feature-ic">⚓</span>
              Bookmark episodes to your own library
            </li>
            <li>
              <span className="login-feature-ic">✦</span>
              Highlight and save quotes as you listen
            </li>
            <li>
              <span className="login-feature-ic">✎</span>
              Editors publish new stories and episodes
            </li>
          </ul>
        </div>

        <p className="login-brand-note">© 2026 maritribeOne · Honest conversations from the maritime world.</p>
      </section>

      <section className="login-main">
        <div className="login-card">
          <Link href="/" className="login-logo">
            <span className="brand-mark brand-mark-login">M</span>
            <span className="brand-name brand-name-login">maritribeOne</span>
          </Link>

          <div className="seg" role="tablist" aria-label="Authentication mode">
            <Link href="/login" className={isSignup ? "" : "active"}>
              Sign in
            </Link>
            <Link href="/login?mode=signup" className={isSignup ? "active" : ""}>
              Create account
            </Link>
          </div>

          <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
          <p className="lead">
            {isSignup
              ? "Free for now. Save bookmarks, highlights, and follow future maritime releases."
              : "Sign in to reach your bookmarks and highlights."}
          </p>

          <form className="login-form-shell">
            <div className="lf-field">
              <label htmlFor="login-name">Name</label>
              <input id="login-name" name="name" placeholder="Your name" />
            </div>

            <div className="lf-field">
              <label htmlFor="login-pass">Password</label>
              <input id="login-pass" name="pass" type="password" placeholder="Your password" />
            </div>

            <p className="login-static-note">
              This route is now migrated into Next.js. Auth wiring can attach here without going
              back to static HTML.
            </p>

            <button type="button" className="home-cta home-cta-primary login-submit">
              {isSignup ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="login-foot">
            {isSignup ? (
              <>
                Already have an account? <Link href="/login">Sign in</Link>
              </>
            ) : (
              <>
                New here? <Link href="/login?mode=signup">Create a free account</Link>
              </>
            )}
          </p>
          <p className="login-foot">
            <Link href="/">← Back to maritribeOne</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
