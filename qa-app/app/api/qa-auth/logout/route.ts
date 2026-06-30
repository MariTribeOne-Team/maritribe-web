import { NextRequest, NextResponse } from "next/server";
import { clearQaSession } from "@/lib/session";

function getRedirectTarget(request: NextRequest) {
  const redirectTarget = request.nextUrl.searchParams.get("redirect");
  if (!redirectTarget || !redirectTarget.startsWith("/")) {
    return "/qa/login";
  }
  return redirectTarget;
}

async function handleLogout(request: NextRequest) {
  await clearQaSession();
  return NextResponse.redirect(new URL(getRedirectTarget(request), request.url), 302);
}

export async function GET(request: NextRequest) {
  return handleLogout(request);
}

export async function POST(request: NextRequest) {
  return handleLogout(request);
}
