import { cookies } from "next/headers";

const QA_SESSION_COOKIE = "mt_qa_session";

export async function readQaSession() {
  const cookieStore = await cookies();
  return cookieStore.get(QA_SESSION_COOKIE)?.value ?? null;
}

export async function writeQaSession(value: string) {
  const cookieStore = await cookies();
  cookieStore.set(QA_SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearQaSession() {
  const cookieStore = await cookies();
  cookieStore.delete(QA_SESSION_COOKIE);
}
