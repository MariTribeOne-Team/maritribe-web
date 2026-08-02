/** Section divider used to hand off between the cream and bottle-green bands. */
export function WaveDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={flip ? "wave-divider flip" : "wave-divider"}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ background: from }}
    >
      <path
        d={
          flip
            ? "M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z"
            : "M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z"
        }
        fill={to}
      />
    </svg>
  );
}
