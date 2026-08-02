"use client";

import { useState, type KeyboardEvent } from "react";

/**
 * The four interactive figures on the homepage story. Each one is a small,
 * self-contained widget: the copy beside it stays in the server component, and
 * only the illustration ships JavaScript.
 *
 * They all follow the same shape — a single boolean or index of state that a
 * class name reads, with the animation itself left to CSS in globals.css.
 */

/** Enter/Space on a div that behaves like a button. */
function onActivate(run: () => void) {
  return (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    run();
  };
}

/* -------------------------------------------------------------------------- */

/**
 * Four rings — professional, vessel, machinery, location — each spun to its own
 * angle. Tapping snaps them all to 0deg: the parts line up on one ship.
 */
export function SyncDial() {
  const [aligned, setAligned] = useState(false);
  const toggle = () => setAligned((value) => !value);

  return (
    <>
      {/* Displacement filter that gives the rings their hand-drawn wobble. */}
      <svg className="sync-filter" aria-hidden="true">
        <filter id="ocean-wave">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        className={aligned ? "sync-stage aligned" : "sync-stage"}
        role="button"
        tabIndex={0}
        aria-label="Align the shared maritime language"
        aria-pressed={aligned}
        onClick={toggle}
        onKeyDown={onActivate(toggle)}
      >
        <div className="laser-beam" />

        <div className="dial-container">
          <div className="ring-outer">
            <div className="node node-outer">
              <small>Location</small>
              <strong>Houston</strong>
            </div>
          </div>

          <div className="dial-ring ring-1">
            <div className="node node-1">
              <small>Machinery</small>
              <strong>Swiss-designed engine</strong>
            </div>
          </div>

          <div className="dial-ring ring-2">
            <div className="node node-2">
              <small>Vessel</small>
              <strong>Japanese-built VLCC</strong>
            </div>
          </div>

          <div className="dial-ring ring-3">
            <div className="node node-3">
              <small>Professional</small>
              <strong>Croatian chief engineer</strong>
            </div>
          </div>

          <div className="core">
            <div>
              <svg viewBox="0 0 64 42" fill="none" strokeWidth="1.5" aria-hidden="true">
                <path d="M7 28h48l-6 8H15l-8-8Z" />
                <path d="M18 28V17h23v11M25 17V9h10v8M8 36c5 4 10 4 15 0 5 4 10 4 15 0 5 4 10 4 15 0" />
              </svg>
              <strong>One ship</strong>
            </div>
          </div>
        </div>

        <div className="sync-instruction">Tap to synchronize</div>
        <div className="sync-caption">The dialect is aligned.</div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

const BLACK_BOX_CORNERS = [
  { label: "Maritime law", message: "How disputes unfold" },
  { label: "Shipbroking", message: "How a spot fixture is secured" },
  { label: "Marine insurance", message: "How risk is understood" },
  { label: "Port logistics", message: "How a port call comes together" },
] as const;

/** The rest of the industry, treated as a black box until you open it. */
export function BlackBox() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const toggle = () => setOpen((value) => !value);

  return (
    <div
      className={open ? "black-box open" : "black-box"}
      role="button"
      tabIndex={0}
      aria-label="Open the maritime black box"
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={onActivate(toggle)}
    >
      <div className="black-box-label">
        <div>
          <strong>Open the black box</strong>
          <span>Click or tap</span>
        </div>
      </div>

      <div className="black-box-inside">
        {BLACK_BOX_CORNERS.map((corner, index) => (
          <button
            key={corner.label}
            type="button"
            className={index === active ? "black-box-corner active" : "black-box-corner"}
            // Picking a corner should never also toggle the lid shut.
            onClick={(event) => {
              event.stopPropagation();
              setOpen(true);
              setActive(index);
            }}
          >
            {corner.label}
          </button>
        ))}
      </div>

      <div className="black-box-message" aria-live="polite">
        {BLACK_BOX_CORNERS[active].message}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const SIDES = [
  {
    kicker: "At sea",
    title: "Deep inside the operational machine.",
    body: "Years can be spent mastering a specific corner of shipping while the wider commercial and legal system remains out of sight.",
  },
  {
    kicker: "Ashore",
    title: "A massive wake-up call.",
    body: "Stepping into software and digital tools exposed how much of that wider machine had remained invisible.",
  },
] as const;

/** Sea and shore, one expanding as the other gives way. */
export function SidesSwitch() {
  const [active, setActive] = useState(0);

  return (
    <div className="sides" aria-label="A view from sea and shore">
      {SIDES.map((side, index) => (
        <button
          key={side.kicker}
          type="button"
          className={index === active ? "side active" : "side"}
          aria-pressed={index === active}
          onClick={() => setActive(index)}
        >
          <small>{side.kicker}</small>
          <h3>{side.title}</h3>
          <p>{side.body}</p>
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Two panels that part to reveal the quote behind them. */
export function WallStage() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((value) => !value);

  return (
    <div
      className={open ? "wall-stage open" : "wall-stage"}
      role="button"
      tabIndex={0}
      aria-label="Open the invisible wall"
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={onActivate(toggle)}
    >
      <div className="wall-panel left" />
      <div className="wall-panel right" />

      <div className="wall-instruction">
        <strong>There is an invisible wall between sea and shore.</strong>
        <span>Click or tap to cross it</span>
      </div>

      <div className="wall-reveal">
        <blockquote className="wall-quote">
          When you leave the sea tomorrow, you shouldn&apos;t have to{" "}
          <em>leave shipping.</em>
        </blockquote>
        <div className="wall-route" aria-hidden="true">
          <span>Operational deck</span>
          <i />
          <span>Commercial engine room</span>
        </div>
      </div>
    </div>
  );
}
