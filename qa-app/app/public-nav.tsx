import Link from "next/link";
import { readQaSession } from "@/lib/session";

export async function PublicNav({
  active,
  mode = "study",
}: {
  active:
    | "deck"
    | "ask"
    | "qa"
    | "home"
    | "about"
    | "episodes"
    | "contact"
    | "account"
    | "create-post"
    | "dashboard"
    | "login"
    | "post"
    | "guidelines"
    | "child-safety";
  mode?: "study" | "marketing" | "marketing-home" | "editor";
}) {
  const qaSession = await readQaSession();
  const qaHref = qaSession ? "/qa/review-queue" : "/qa/login";

  if (mode === "marketing-home") {
    return (
      <nav className="nav nav-marketing">
        <Link href="/" className={active === "home" ? "active" : undefined}>Home</Link>
        <Link href="/episodes" className={active === "episodes" ? "active" : undefined}>Episodes</Link>
        <Link href="/contact" className={active === "contact" ? "active" : undefined}>Contact</Link>
      </nav>
    );
  }

  if (mode === "marketing") {
    return (
      <nav className="nav nav-marketing">
        <Link href="/" className={active === "home" ? "active" : undefined}>Home</Link>
        <Link href="/about" className={active === "about" ? "active" : undefined}>About</Link>
        <Link href="/episodes" className={active === "episodes" ? "active" : undefined}>Episodes</Link>
        <Link href="/contact" className={active === "contact" ? "active" : undefined}>Contact</Link>
      </nav>
    );
  }

  if (mode === "editor") {
    return (
      <nav className="nav nav-marketing">
        <Link href="/" className={active === "home" ? "active" : undefined}>Home</Link>
        <Link href="/episodes" className={active === "episodes" || active === "post" ? "active" : undefined}>
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
    <nav className="nav">
      <Link href="/deck" className={active === "deck" ? "active" : undefined}>Deck</Link>
      <Link href="/ask" className={active === "ask" ? "active" : undefined}>Ask</Link>
      <Link href={qaHref} className={active === "qa" ? "active" : undefined}>QA</Link>
    </nav>
  );
}
