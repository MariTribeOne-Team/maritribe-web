"use client";

import { useState } from "react";

// Mobile-only "Open in Maritribe" bar (shown via CSS < 768px). Dismissable.
export function StickyBar() {
  const [hidden, setHidden] = useState(false);
  return (
    <div className={hidden ? "sticky-app-bar hidden" : "sticky-app-bar"}>
      <div className="sticky-app-bar-left">
        <div className="sticky-app-bar-icon">MT</div>
        <span className="sticky-app-bar-text">Open in Maritribe</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <a className="sticky-app-bar-btn" href="/">Open</a>
        <button
          className="sticky-app-bar-close"
          aria-label="Close app bar"
          onClick={() => setHidden(true)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
