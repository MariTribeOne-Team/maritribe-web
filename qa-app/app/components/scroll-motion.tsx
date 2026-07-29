"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global, opt-in scroll motion. Server components stay untouched — they just add
 * class names / data attributes and this picks them up on mount and route change:
 *   - `.reveal`            → fades/rises in when scrolled into view (staggered by sibling order)
 *   - `.site-header`       → gains `.scrolled` past a small threshold (shrink/blur)
 *   - `[data-count]`       → counts up to the numeric target when it enters view
 * All effects are disabled under prefers-reduced-motion.
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Reveal on scroll -------------------------------------------------
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
    );

    if (reduce) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    const revealObserver =
      !reduce && revealEls.length
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                const parent = el.parentElement;
                // Stagger only inside explicit groups (e.g. card grids). Plain
                // stacked content (article paragraphs) reveals as it enters.
                if (parent && parent.hasAttribute("data-stagger")) {
                  const sibs = Array.from(
                    parent.querySelectorAll<HTMLElement>(":scope > .reveal"),
                  );
                  const idx = Math.max(0, sibs.indexOf(el));
                  el.style.transitionDelay = `${Math.min(idx, 6) * 80}ms`;
                }
                el.classList.add("is-visible");
                revealObserver?.unobserve(el);
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
          )
        : null;
    revealEls.forEach((el) => revealObserver?.observe(el));

    // --- Count-up numbers -------------------------------------------------
    const countEls = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const runCount = (el: HTMLElement) => {
      const target = Number(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-count-suffix") || "";
      if (reduce || !Number.isFinite(target)) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const countObserver = countEls.length
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              runCount(entry.target as HTMLElement);
              countObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.4 },
        )
      : null;
    countEls.forEach((el) => countObserver?.observe(el));

    // --- Header shrink on scroll -----------------------------------------
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver?.disconnect();
      countObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
