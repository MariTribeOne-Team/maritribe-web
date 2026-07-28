type BackendLoginResponse = {
  accessToken: string;
  profile: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

type BackendRun = {
  id: string;
  documentTitle: string;
  status: "completed" | "processing" | "failed";
  totalCards: number;
  pending: number;
  accepted: number;
  edited: number;
  rejected: number;
};

type BackendCard = {
  id: string;
  runId: string;
  status: "PENDING_REVIEW" | "ACCEPTED" | "ACCEPTED_WITH_EDIT" | "REJECTED";
  question: string;
  answer: string;
  currentQuestion: string;
  currentAnswer: string;
  sourceSnippet: string;
  ocrText: string;
  evidenceUnit: string;
  pageNumber: number;
  sourceText?: string;
  cardType?: string | null;
  format?: string | null;
  subject?: string | null;
  topic?: string | null;
  qualityVerdict?: string | null;
  qualityScore?: number | null;
  imageUrl?: string | null;
  options?: { text: string; isCorrect: boolean }[] | null;
  blank?: { text: string | null; answers: string[] } | null;
  occlusions?: Array<{ x: number; y: number; w: number; h: number; label: string }> | null;
  explanation?: string | null;
  documentTitle?: string | null;
  sourcePdfUrl?: string | null;
};

type BackendReview = {
  id: string;
  flashcardId: string;
  flashcardQuestion?: string;
  runId?: string;
  qaUserId: string;
  qaUserName?: string;
  qaUserEmail?: string;
  action: "ACCEPTED" | "ACCEPTED_WITH_EDIT" | "REJECTED";
  rejectionReason: string | null;
  reviewerNote: string | null;
  originalQuestion: string;
  originalAnswer: string;
  finalQuestion: string | null;
  finalAnswer: string | null;
  reviewVersion: number;
  isCurrent: boolean;
  createdAt: string;
};

function getBackendBaseUrl() {
  return process.env.QA_BACKEND_BASE_URL ?? "http://localhost:4010";
}

async function parseJson<T>(response: Response): Promise<T> {
  const raw = await response.text();
  let data: T | { message?: string; error?: string };

  if (!raw) {
    data = { error: "Empty response from backend" };
  } else {
    try {
      data = JSON.parse(raw) as T | { message?: string; error?: string };
    } catch {
      data = { error: "Invalid response from backend" };
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && ("message" in data || "error" in data)
        ? String((data as { message?: string; error?: string }).message ?? (data as { error?: string }).error ?? "Request failed")
        : "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export async function qaBackendLogin(email: string, password: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa-auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  return parseJson<BackendLoginResponse>(response);
}

export async function qaBackendMe(accessToken: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa-auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<{ profile: BackendLoginResponse["profile"] }>(response);
}

export async function qaBackendRuns(accessToken: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/runs`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<BackendRun[]>(response);
}

export async function qaBackendRun(accessToken: string, runId: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/runs/${runId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<{ run: BackendRun }>(response);
}

export async function qaBackendRunCards(
  accessToken: string,
  runId: string,
  page = 1,
  limit = 50,
) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/runs/${runId}/cards?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<{
    run: BackendRun;
    cards: BackendCard[];
    pagination: {
      page: number;
      limit: number;
      totalCards: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }>(response);
}

export async function qaBackendCard(accessToken: string, cardId: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/cards/${cardId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<BackendCard>(response);
}

export async function qaBackendCardReviews(accessToken: string, cardId: string) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/cards/${cardId}/reviews`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<BackendReview[]>(response);
}

export async function qaBackendReviewCard(
  accessToken: string,
  cardId: string,
  body: {
    action: "ACCEPTED" | "ACCEPTED_WITH_EDIT" | "REJECTED";
    reviewerNote?: string;
    rejectionReason?: string;
    finalQuestion?: string;
    finalAnswer?: string;
  },
) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/cards/${cardId}/review`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return parseJson<{ review: BackendReview; flashcard: BackendCard }>(response);
}

export async function qaBackendRecentReviews(accessToken: string, limit = 30) {
  const response = await fetch(`${getBackendBaseUrl()}/qa/reviews?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return parseJson<BackendReview[]>(response);
}

// Public deck view: reads the current run's cards (the `/cards` endpoint) and shapes
// them for the /deck gallery. Previously lived in the redundant lib/deck-backend.ts.
export async function readDeckFromBackend(limit = 60) {
  const response = await fetch(`${getBackendBaseUrl()}/cards?limit=${limit}`, {
    cache: "no-store",
  });

  const { run, cards } = await parseJson<{ run: BackendRun | null; cards: BackendCard[] }>(response);
  const topics = new Set(cards.map((card) => card.evidenceUnit || "General")).size;

  return {
    run,
    cards: cards.map((card) => ({
      id: card.id,
      cardType: card.status === "ACCEPTED_WITH_EDIT" ? "edited card" : "flashcard",
      front: card.currentQuestion,
      back: card.currentAnswer,
      topic: card.evidenceUnit || "Unclassified",
      subject: "Maritime",
      page: card.pageNumber,
      verdict: card.status.replaceAll("_", " "),
      score: card.status === "PENDING_REVIEW" ? 0 : 100,
      hasImage: false,
      sourceSnippet: card.sourceSnippet,
    })),
    stats: {
      cards: run?.totalCards ?? cards.length,
      pending: run?.pending ?? cards.filter((card) => card.status === "PENDING_REVIEW").length,
      accepted: (run?.accepted ?? 0) + (run?.edited ?? 0),
      rejected: run?.rejected ?? 0,
      topics,
    },
  };
}

export type { BackendCard, BackendReview, BackendRun };
