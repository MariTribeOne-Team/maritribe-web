import { NextResponse } from "next/server";
import { qaBackendRuns } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function GET() {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ runs: await qaBackendRuns(session) });
  } catch {
    return NextResponse.json({ error: "Unable to load runs" }, { status: 502 });
  }
}
