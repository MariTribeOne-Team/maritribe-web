import { NextResponse } from "next/server";
import { qaBackendReviewCard } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const { cardId } = await params;

  try {
    const result = await qaBackendReviewCard(session, cardId, payload);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit review";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
