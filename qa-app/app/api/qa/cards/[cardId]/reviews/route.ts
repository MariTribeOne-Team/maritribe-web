import { NextResponse } from "next/server";
import { qaBackendCardReviews } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId } = await params;
  try {
    return NextResponse.json({ reviews: await qaBackendCardReviews(session, cardId) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load reviews";
    const status = message.includes("not found") ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
