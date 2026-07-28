import type { Metadata } from "next";
import { slugToName } from "../../_lib/app-backend";
import { CommunityCard } from "../../_components/share-ui";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const name = slugToName(slug);
  const title = `Join ${name} — Maritribe`;
  const description = `You've been invited to join ${name} on Maritribe — the maritime community platform.`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website", url: `https://maritribe.one/c/${slug}`, images: ["/og-preview.png"] },
    twitter: { card: "summary", title, description, images: ["/og-preview.png"] },
  };
}

export default async function CommunityInvitePage({ params }: Params) {
  const { slug } = await params;
  return <CommunityCard name={slugToName(slug)} />;
}
