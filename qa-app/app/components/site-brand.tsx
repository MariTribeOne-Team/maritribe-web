import Link from "next/link";

/**
 * The maritribeOne mark. `MT_final.png` is a self-contained circular badge
 * (plum ring, cream field, compass rose), so it needs no plate behind it.
 * Plain <img>: a fixed-size local PNG gains nothing from the image optimizer
 * and this keeps it off the Workers optimization path.
 */
export function SiteBrand({
  variant = "default",
}: {
  variant?: "default" | "marketing-home";
}) {
  const size = variant === "marketing-home" ? 34 : 46;

  return (
    <Link href="/" className="brand" aria-label="maritribeOne — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src="/mt-logo.png" alt="" width={size} height={size} />
      <span className={variant === "marketing-home" ? "brand-name brand-name-marketing" : "brand-name"}>
        maritribe<em className="brand-one">One</em>
      </span>
    </Link>
  );
}
