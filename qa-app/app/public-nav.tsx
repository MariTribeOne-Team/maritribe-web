import Link from "next/link";
import { readQaSession } from "@/lib/session";

export async function PublicNav({
  active,
}: {
  active: "deck" | "ask" | "qa" | "home";
}) {
  const qaSession = await readQaSession();
  const qaHref = qaSession ? "/qa/review-queue" : "/qa/login";

  return (
    <nav className="nav">
      <Link href="/deck" className={active === "deck" ? "active" : undefined}>Deck</Link>
      <Link href="/ask" className={active === "ask" ? "active" : undefined}>Ask</Link>
      <Link href={qaHref} className={active === "qa" ? "active" : undefined}>QA</Link>
    </nav>
  );
}
