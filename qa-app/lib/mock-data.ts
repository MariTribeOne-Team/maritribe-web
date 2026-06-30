export type MockRun = {
  id: string;
  documentTitle: string;
  status: "completed" | "processing" | "failed";
  totalCards: number;
  pending: number;
  accepted: number;
  edited: number;
  rejected: number;
};

export type MockCard = {
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
};

export const mockRuns: MockRun[] = [
  {
    id: "run-physics-01",
    documentTitle: "Physics Chapter 1",
    status: "completed",
    totalCards: 42,
    pending: 10,
    accepted: 22,
    edited: 6,
    rejected: 4,
  },
  {
    id: "run-biology-02",
    documentTitle: "Biology Notes",
    status: "completed",
    totalCards: 65,
    pending: 18,
    accepted: 31,
    edited: 10,
    rejected: 6,
  },
];

export const mockCards: MockCard[] = [
  {
    id: "card-001",
    runId: "run-physics-01",
    status: "PENDING_REVIEW",
    question: "What does Newton's First Law state?",
    answer: "An object remains at rest or in uniform motion unless acted upon by an external force.",
    currentQuestion: "What does Newton's First Law state?",
    currentAnswer: "An object remains at rest or in uniform motion unless acted upon by an external force.",
    sourceSnippet: "Every body continues in its state of rest or of uniform motion in a straight line...",
    ocrText: "Every body continues in its state of rest or uniform motion in straight line unless compelled to change that state by forces impressed on it.",
    evidenceUnit: "Newton's First Law explains inertia and resistance to change in motion.",
    pageNumber: 12,
  },
  {
    id: "card-002",
    runId: "run-physics-01",
    status: "ACCEPTED_WITH_EDIT",
    question: "Define inertia.",
    answer: "Inertia is the tendency of a body to resist changes in its state of motion.",
    currentQuestion: "Define inertia in one sentence.",
    currentAnswer: "Inertia is the tendency of a body to resist any change in its state of rest or motion.",
    sourceSnippet: "Inertia is the property of matter by which it remains at rest or in uniform motion...",
    ocrText: "Inertia is property of matter by which it remains at rest or uniform motion unless acted by force.",
    evidenceUnit: "Inertia is the physical property underlying Newton's First Law.",
    pageNumber: 12,
  },
  {
    id: "card-101",
    runId: "run-biology-02",
    status: "REJECTED",
    question: "What is photosynthesis?",
    answer: "Photosynthesis is the process by which plants make food.",
    currentQuestion: "What is photosynthesis?",
    currentAnswer: "Photosynthesis is the process by which plants make food.",
    sourceSnippet: "Photosynthesis converts light energy into chemical energy in chloroplasts.",
    ocrText: "Photosynthesis converts light energy to chemical energy in chloroplasts.",
    evidenceUnit: "Photosynthesis is an energy-conversion process in chloroplasts.",
    pageNumber: 33,
  },
];

export function getRunById(runId: string) {
  return mockRuns.find((run) => run.id === runId) ?? null;
}

export function getCardsByRunId(runId: string) {
  return mockCards.filter((card) => card.runId === runId);
}

export function getCardById(cardId: string) {
  return mockCards.find((card) => card.id === cardId) ?? null;
}

export const mockQaUser = {
  id: "qa-1",
  email: "qa@maritribe.test",
  name: "QA Reviewer",
  role: "QA_REVIEWER",
  password: "review123",
};
