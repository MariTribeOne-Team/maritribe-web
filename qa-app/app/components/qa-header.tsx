import type { ReactNode } from "react";
import { SiteBrand } from "./site-brand";
import { QaNav } from "../qa/qa-nav";

export function QaHeader({
  active,
  trailing,
}: {
  active: "queue" | "history" | "card";
  trailing?: ReactNode;
}) {
  return (
    <header className="site-header">
      <div className="wrap">
        <SiteBrand />
        <QaNav active={active} />
        {trailing}
      </div>
    </header>
  );
}
