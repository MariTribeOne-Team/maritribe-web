export function resolveReviewerDisplay(input: {
  qaUserName?: string | null;
  qaUserEmail?: string | null;
  qaUserId: string;
}) {
  const rawName = input.qaUserName?.trim();
  const email = input.qaUserEmail?.trim().toLowerCase();

  if (rawName && !/^qa reviewer$/i.test(rawName) && !/^qa admin$/i.test(rawName)) {
    return rawName;
  }

  if (email) {
    return email.split("@")[0];
  }

  return input.qaUserId;
}
