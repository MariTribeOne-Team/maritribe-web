import Link from "next/link";

export function SiteBrand({
  variant = "default",
}: {
  variant?: "default" | "marketing-home";
}) {
  return (
    <Link href="/" className="brand" aria-label="maritribeOne — home">
      <span className={variant === "marketing-home" ? "brand-mark brand-mark-square" : "brand-mark"}>
        {variant === "marketing-home" ? "M" : "MT"}
      </span>
      <span className={variant === "marketing-home" ? "brand-name brand-name-marketing" : "brand-name"}>
        maritribeOne
      </span>
    </Link>
  );
}
