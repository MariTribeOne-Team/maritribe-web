import type { ReactNode } from "react";

export function PageHero({
  overline,
  title,
  children,
}: {
  overline: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="hero-band">
      <div className="wrap">
        <p className="overline">{overline}</p>
        <h1 className="page-hero-title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
