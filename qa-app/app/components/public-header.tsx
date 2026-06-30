import { PublicNav } from "../public-nav";
import { SiteBrand } from "./site-brand";

export async function PublicHeader({
  active,
}: {
  active: "deck" | "ask" | "qa" | "home";
}) {
  return (
    <header className="site-header">
      <div className="wrap">
        <SiteBrand />
        <PublicNav active={active} />
      </div>
    </header>
  );
}
