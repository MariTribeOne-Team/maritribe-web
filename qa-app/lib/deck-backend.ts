type DeckCard = {
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
};

type DeckRun = {
  id: string;
  documentTitle: string;
  status: "completed" | "processing" | "failed";
  totalCards: number;
  pending: number;
  accepted: number;
  edited: number;
  rejected: number;
};

function getBackendBaseUrl() {
  return process.env.QA_BACKEND_BASE_URL ?? "http://localhost:4010";
}

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | { message?: string; error?: string };
  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && ("message" in data || "error" in data)
        ? String((data as { message?: string; error?: string }).message ?? (data as { error?: string }).error ?? "Request failed")
        : "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export async function readDeckFromBackend(limit = 60) {
  const response = await fetch(`${getBackendBaseUrl()}/cards?limit=${limit}`, {
    cache: "no-store",
  });

  const data = await parseJson<{ run: DeckRun | null; cards: DeckCard[] }>(response);
  const { run, cards } = data;

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
