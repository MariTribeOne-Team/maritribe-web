import type { Metadata } from "next";
import { InviteCard } from "../../_components/share-ui";

// /invite/<code> — the code is a referral token consumed by the app after install;
// the web landing shows the same invite card regardless.
export const metadata: Metadata = {
  title: "Join Maritribe",
  description: "You've been invited to Maritribe — the community platform built for seafarers, alumni, and the maritime industry.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Join Maritribe",
    description: "You've been invited to Maritribe — the maritime community platform.",
    type: "website",
    images: ["/og-preview.png"],
  },
  twitter: { card: "summary", title: "Join Maritribe", images: ["/og-preview.png"] },
};

export default function AppInviteCodePage() {
  return <InviteCard />;
}
