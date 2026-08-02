import { PublicNav, type PublicNavActive } from "../public-nav";
import { SiteBrand } from "./site-brand";

/**
 * The single public header. Every marketing page renders it identically to the
 * homepage — same brand mark, same nav, same full-bleed bar.
 */
export function PublicHeader({
  active,
  mode = "marketing",
}: {
  active: PublicNavActive;
  mode?: "marketing" | "editor";
}) {
  return (
    <header className="site-header site-header-full">
      <div className="wrap wrap-full">
        <SiteBrand variant="marketing-home" />
        <PublicNav active={active} mode={mode} />
      </div>
    </header>
  );
}
