export type RetrievalPreviewCard = {
  id: string;
  cardType: string;
  front: string;
  back: string;
  topic: string;
  subject: string;
  page: number;
  verdict: "publishable" | "minor_edit" | "needs_work";
  score: number;
  imageUrl?: string | null;
};

export const retrievalPreviewStats = {
  cards: 1525,
  publishablePct: 88,
  imageCards: 336,
  subjects: 6,
  topics: 189,
};

export const retrievalPreviewCards: RetrievalPreviewCard[] = [
  {
    id: "card-preview-1",
    cardType: "definition",
    front: "What is the maximum shear force value shown in the shear force diagram?",
    back: "239.756 kN",
    topic: "Unclassified",
    subject: "General",
    page: 1,
    verdict: "publishable",
    score: 100,
  },
  {
    id: "card-preview-2",
    cardType: "concept",
    front: "What does a positive GM indicate about the vessel?",
    back: "A positive GM indicates the vessel has initial stability and tends to return upright after a small heel.",
    topic: "Metacentric Height",
    subject: "Ship Stability",
    page: 7,
    verdict: "publishable",
    score: 96,
  },
  {
    id: "card-preview-3",
    cardType: "diagram",
    front: "What does the righting arm curve represent in the stability diagram?",
    back: "It represents the vessel's lever arm for returning to upright at different heel angles.",
    topic: "Righting Arm Curve",
    subject: "Ship Stability",
    page: 12,
    verdict: "publishable",
    score: 94,
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "card-preview-4",
    cardType: "formula",
    front: "What text form of the trim relation appears in the deck's trim explanation?",
    back: "Trim change is described using the trim moment relation with TPC and LCF terms from the deck content.",
    topic: "Trim Calculation",
    subject: "Naval Architecture",
    page: 24,
    verdict: "minor_edit",
    score: 82,
  },
];

export const retrievalPreviewAnswer = {
  question: "How does positive GM affect vessel stability?",
  answer:
    "Positive GM means the vessel has initial stability. In the retrieved deck context, it indicates the ship tends to return upright after a small angle of heel. [1][2]",
  sources: [
    {
      id: "src-1",
      front: "What does a positive GM indicate about the vessel?",
      back: "A positive GM indicates the vessel has initial stability and tends to return upright after a small heel.",
      topic: "Metacentric Height",
      page: 7,
      score: 0.9381,
    },
    {
      id: "src-2",
      front: "What does the righting arm curve represent in the stability diagram?",
      back: "It represents the vessel's lever arm for returning to upright at different heel angles.",
      topic: "Righting Arm Curve",
      page: 12,
      score: 0.9124,
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
    },
  ],
};
