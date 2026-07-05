import { redirect } from "next/navigation";
import { episodeSummaries } from "@/lib/public-content";

const legacyMap: Record<string, string> = {
  ep1: episodeSummaries[0]?.slug ?? "",
  ep2: episodeSummaries[1]?.slug ?? "",
  ep3: episodeSummaries[2]?.slug ?? "",
  ep4: episodeSummaries[3]?.slug ?? "",
  ep5: episodeSummaries[4]?.slug ?? "",
};

export default async function LegacyPostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; slug?: string }>;
}) {
  const params = await searchParams;
  const fallback = episodeSummaries[0]?.slug ?? "";

  const slug =
    (params.slug && episodeSummaries.find((item) => item.slug === params.slug)?.slug) ||
    (params.id && legacyMap[params.id]) ||
    fallback;

  redirect(`/episodes/${slug}`);
}
