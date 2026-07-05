import { PublicNav } from "../public-nav";
import { SiteBrand } from "./site-brand";

export async function PublicHeader({
  active,
  mode = "study",
  layout = "contained",
  brandVariant = "default",
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
  layout?: "contained" | "full";
  brandVariant?: "default" | "marketing-home";
}) {
  return (
    <header className={layout === "full" ? "site-header site-header-full" : "site-header"}>
      <div className={layout === "full" ? "wrap wrap-full" : "wrap"}>
        <SiteBrand variant={brandVariant} />
        <PublicNav active={active} mode={mode} />
      </div>
    </header>
  );
}
