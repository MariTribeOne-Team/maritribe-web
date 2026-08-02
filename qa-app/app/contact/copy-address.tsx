"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The address itself is the control: press it and it lands on the clipboard.
 * Falls back to selecting the text if the clipboard API is unavailable.
 */
export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="hail-address-row">
      <button
        type="button"
        className={copied ? "hail-address is-copied" : "hail-address"}
        onClick={copy}
      >
        <span className="hail-address-text">{address}</span>
        <span className="hail-address-icon" aria-hidden="true">
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 12.5 9.5 18 20 6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <rect x="9" y="9" width="11" height="11" rx="2.5" />
              <path d="M5.5 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v.5" />
            </svg>
          )}
        </span>
      </button>
      <span className="hail-address-hint" aria-live="polite">
        {copied ? "Copied to clipboard" : "Press to copy"}
      </span>
    </div>
  );
}
