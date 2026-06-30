import Link from "next/link";

export function QaNav({
  active,
}: {
  active: "queue" | "history" | "card";
}) {
  return (
    <nav className="nav">
      <Link href="/qa/review-queue" className={active === "queue" || active === "card" ? "active" : undefined}>
        Queue
      </Link>
      <Link href="/qa/reviews" className={active === "history" ? "active" : undefined}>
        History
      </Link>
    </nav>
  );
}
