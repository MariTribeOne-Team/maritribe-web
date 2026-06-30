import { NextResponse } from "next/server";
import { qaBackendLogin } from "@/lib/qa-backend";
import { writeQaSession } from "@/lib/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    const result = await qaBackendLogin(email, password);
    await writeQaSession(result.accessToken);
    return NextResponse.redirect(new URL("/qa/review-queue", request.url), 302);
  } catch {
    return NextResponse.redirect(new URL("/qa/login?error=invalid", request.url), 302);
  }
}
