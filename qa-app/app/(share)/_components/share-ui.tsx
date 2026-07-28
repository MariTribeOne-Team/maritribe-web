// Shared, static presentational pieces for the share/deep-link pages.
// Server components — no client JS (except the sticky bar, which is separate).

export function StoreButtons() {
  return (
    <div className="store-buttons">
      <a className="store-btn" href="/">
        <svg viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div>
          <span className="store-label">Download on the</span>
          <span className="store-name">App Store</span>
        </div>
      </a>
      <a className="store-btn" href="/">
        <svg viewBox="0 0 24 24">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33c.576.333.576 1.17 0 1.504L17.698 13.67l-2.504-2.504 2.504-2.658zM5.864 2.658L16.8 9.325l-2.302 2.302L5.864 2.658z" />
        </svg>
        <div>
          <span className="store-label">Get it on</span>
          <span className="store-name">Google Play</span>
        </div>
      </a>
    </div>
  );
}

export function CtaBanner({ title, desc }: { title?: string; desc?: string }) {
  return (
    <div className="cta-banner">
      <h2>{title || "Join the conversation"}</h2>
      <p>{desc || "Download Maritribe to interact, join communities, and connect with maritime professionals."}</p>
      <div className="cta-btn-wrapper">
        <a className="cta-btn" href="/">Get Maritribe</a>
      </div>
    </div>
  );
}

const errorIcons = {
  fog: (
    <svg viewBox="0 0 80 80">
      <line x1="10" y1="30" x2="70" y2="30" stroke="var(--text-tertiary)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <line x1="15" y1="40" x2="65" y2="40" stroke="var(--text-tertiary)" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
      <line x1="20" y1="50" x2="60" y2="50" stroke="var(--text-tertiary)" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
      <circle cx="40" cy="40" r="12" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" opacity="0.15" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="35" fill="none" stroke="var(--bottle-green)" strokeWidth="3" opacity="0.2" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="var(--bottle-green)" strokeWidth="2" opacity="0.1" />
      <rect x="28" y="36" width="24" height="18" rx="3" fill="var(--bottle-green)" opacity="0.8" />
      <path d="M33 36V30a7 7 0 0114 0v6" fill="none" stroke="var(--bottle-green)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="40" cy="45" r="2.5" fill="var(--ivory)" />
      <line x1="40" y1="47" x2="40" y2="50" stroke="var(--ivory)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  bottle: (
    <svg viewBox="0 0 80 80">
      <ellipse cx="40" cy="60" rx="18" ry="6" fill="var(--bottle-green)" opacity="0.08" />
      <rect x="34" y="12" width="12" height="8" rx="2" fill="var(--gold)" opacity="0.7" />
      <path d="M33 20h14l3 12v24c0 4-4 8-10 8s-10-4-10-8V32z" fill="none" stroke="var(--bottle-green)" strokeWidth="2" opacity="0.6" />
      <line x1="33" y1="32" x2="47" y2="32" stroke="var(--bottle-green)" strokeWidth="1.5" opacity="0.3" />
      <rect x="36" y="38" width="8" height="10" rx="1" fill="var(--gold)" opacity="0.3" />
    </svg>
  ),
} as const;

export function ErrorCard({
  variant = "fog",
  title,
  message,
}: {
  variant?: keyof typeof errorIcons;
  title: string;
  message: string;
}) {
  return (
    <div className="error-card">
      <div className="error-illustration">{errorIcons[variant]}</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export function CommunityCard({ name }: { name: string }) {
  return (
    <div className="community-card">
      <div className="community-header">
        <div className="community-wave">
          <svg viewBox="0 0 1200 20" preserveAspectRatio="none">
            <path d="M0,10 C150,0 350,20 600,10 C850,0 1050,20 1200,10 L1200,20 L0,20 Z" fill="rgba(255,255,255,0.06)" />
          </svg>
        </div>
        <div className="community-icon">{name.charAt(0)}</div>
        <h2>{name}</h2>
      </div>
      <div className="community-body">
        <span className="invite-tag">Community Invite</span>
        <div className="member-stack">
          <div className="member-dot">D</div>
          <div className="member-dot">E</div>
          <div className="member-dot">N</div>
          <div className="member-dot">+</div>
          <span className="member-count">Members already here</span>
        </div>
        <p className="desc">
          You&apos;ve been invited to join <strong>{name}</strong> on Maritribe. Download the app to see posts,
          join discussions, and connect with members.
        </p>
        <StoreButtons />
      </div>
    </div>
  );
}

export function InviteCard() {
  return (
    <div className="invite-card">
      <div className="invite-hero">
        <div className="invite-compass">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="40" y1="6" x2="40" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="68" x2="40" y2="74" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="40" x2="12" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="40" x2="74" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <polygon points="40,14 37,40 43,40" fill="var(--gold)" opacity="0.9" />
            <polygon points="40,66 37,40 43,40" fill="rgba(255,255,255,0.3)" />
            <polygon points="14,40 40,37 40,43" fill="rgba(255,255,255,0.3)" />
            <polygon points="66,40 40,37 40,43" fill="rgba(255,255,255,0.3)" />
            <circle cx="40" cy="40" r="4" fill="var(--gold)" />
            <circle cx="40" cy="40" r="2" fill="var(--deep-teal)" />
          </svg>
        </div>
        <h2>You&apos;re invited!</h2>
      </div>
      <div className="invite-body">
        <p>
          A fellow maritime professional invited you to <strong>Maritribe</strong> — the community platform built
          for seafarers, alumni, and the maritime industry.
        </p>
        <div className="invite-steps">
          <div className="invite-step"><span className="invite-step-num">1</span> Download</div>
          <span className="invite-step-arrow">&rarr;</span>
          <div className="invite-step"><span className="invite-step-num">2</span> Sign up</div>
          <span className="invite-step-arrow">&rarr;</span>
          <div className="invite-step"><span className="invite-step-num">3</span> Connect</div>
        </div>
        <StoreButtons />
      </div>
    </div>
  );
}
