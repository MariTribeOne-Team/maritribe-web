import { NextResponse } from "next/server";
import { qaBackendRun } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ runId: string }> },
) {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { runId } = await params;
  try {
    return NextResponse.json(await qaBackendRun(session, runId));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load run";
    const status = message.includes("not found") ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
