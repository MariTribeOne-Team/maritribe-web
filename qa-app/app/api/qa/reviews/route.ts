import { NextResponse } from "next/server";
import { qaBackendRecentReviews } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") ?? "30";

  try {
    return NextResponse.json({ reviews: await qaBackendRecentReviews(session, Number(limit)) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load recent reviews";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
