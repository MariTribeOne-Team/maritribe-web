import { redirect } from "next/navigation";
import { publishedEpisodes } from "@/lib/public-content";

/**
 * Compatibility route for the legacy `/post?id=ep1` and `/post?slug=…` links.
 * Only published episodes are valid targets — anything else lands on the
 * episode index rather than a 404'd draft.
 */
export default async function LegacyPostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; slug?: string }>;
}) {
  const params = await searchParams;

  const bySlug = params.slug
    ? publishedEpisodes.find((item) => item.slug === params.slug)
    : undefined;

  const byLegacyId = params.id?.match(/^ep(\d+)$/)
    ? publishedEpisodes[Number(params.id.slice(2)) - 1]
    : undefined;

  const target = bySlug ?? byLegacyId;

  redirect(target ? `/episodes/${target.slug}` : "/episodes");
}
