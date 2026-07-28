import type { Metadata } from "next";
import { InviteCard } from "../_components/share-ui";

export const metadata: Metadata = {
  title: "Join Maritribe",
  description: "You've been invited to Maritribe — the community platform built for seafarers, alumni, and the maritime industry.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Join Maritribe",
    description: "You've been invited to Maritribe — the maritime community platform.",
    type: "website",
    url: "https://maritribe.one/invite",
    images: ["/og-preview.png"],
  },
  twitter: { card: "summary", title: "Join Maritribe", images: ["/og-preview.png"] },
};

export default function AppInvitePage() {
  return <InviteCard />;
}
