import Link from "next/link";

export type PublicNavActive =
  | "home"
  | "episodes"
  | "contact"
  | "account"
  | "create-post"
  | "dashboard"
  | "login"
  | "post"
  | "guidelines"
  | "child-safety";

/**
 * One public nav for every marketing page, so the header is identical on the
 * homepage and everywhere else. `/about`, `/deck` and `/ask` are intentionally
 * absent — those routes are currently withheld (see their page files).
 */
export function PublicNav({
  active,
  mode = "marketing",
}: {
  active: PublicNavActive;
  mode?: "marketing" | "editor";
}) {
  if (mode === "editor") {
    return (
      <nav className="nav nav-marketing">
        <Link href="/" className={active === "home" ? "active" : undefined}>
          Home
        </Link>
        <Link
          href="/episodes"
          className={active === "episodes" || active === "post" ? "active" : undefined}
        >
          Episodes
        </Link>
        <Link href="/create-post" className={active === "create-post" ? "active" : undefined}>
          Create post
        </Link>
        <Link href="/dashboard" className={active === "dashboard" ? "active" : undefined}>
          Dashboard
        </Link>
      </nav>
    );
  }

  return (
    <nav className="nav nav-marketing">
      <Link href="/" className={active === "home" ? "active" : undefined}>
        Home
      </Link>
      <Link href="/episodes" className={active === "episodes" ? "active" : undefined}>
        Episodes
      </Link>
      <Link href="/contact" className={active === "contact" ? "active" : undefined}>
        Contact
      </Link>
    </nav>
  );
}
