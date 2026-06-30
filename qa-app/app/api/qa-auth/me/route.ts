import { NextResponse } from "next/server";
import { qaBackendMe } from "@/lib/qa-backend";
import { readQaSession } from "@/lib/session";

export async function GET() {
  const session = await readQaSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await qaBackendMe(session));
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
