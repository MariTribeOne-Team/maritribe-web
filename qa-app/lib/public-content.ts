export type EpisodeSummary = {
  slug: string;
  number: string;
  category: string;
  duration: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

export type EpisodeChapter = {
  time: string;
  label: string;
};

export type EpisodeTakeaway = {
  number: string;
  title: string;
  body: string;
};

export type EpisodeDetail = EpisodeSummary & {
  guestRole: string;
  youtubeId?: string;
  lead: string;
  intro: string[];
  learn: string[];
  takeaways: EpisodeTakeaway[];
  references: string[];
  find: string[];
  closing: string;
  chapters: EpisodeChapter[];
};

export const episodeSummaries: EpisodeSummary[] = [
  {
    slug: "twenty-years-regulatory-side-indian-shipping",
    number: "EP 01",
    category: "Regulation",
    duration: "26 min",
    title:
      "Twenty years on the regulatory side of Indian shipping: what an examiner sees that nobody else does",
    excerpt:
      "From rest hour violations nobody intends but everyone breaks, to agents quietly charging three to five lakh rupees for a placement, to the digitisation overhaul that cut exam results from three months to two weeks.",
    author: "Capt. Harish Khatri",
    date: "June 10, 2026",
  },
  {
    slug: "automation-paradoxes-indias-largest-container-terminal",
    number: "EP 02",
    category: "Technology",
    duration: "31 min",
    title:
      "The port that moved faster by standing still: automation paradoxes at India's largest container terminal",
    excerpt:
      "Why the terminals that invested least in automation often outperformed those that invested most and what that tells us about the next decade of port technology.",
    author: "Rajesh Nair",
    date: "June 3, 2026",
  },
  {
    slug: "methanol-ammonia-hydrogen-right-fuel",
    number: "EP 03",
    category: "Green Shipping",
    duration: "34 min",
    title:
      "Methanol, ammonia, or hydrogen: how do you bet on the right fuel when the rules aren't written yet?",
    excerpt:
      "A frank conversation about the gap between IMO ambitions and the commercial reality of ordering ships today.",
    author: "Dr. Priya Menon",
    date: "May 27, 2026",
  },
  {
    slug: "seafarers-mind-welfare-work",
    number: "EP 04",
    category: "Welfare",
    duration: "29 min",
    title:
      "The seafarer's mind: two decades of welfare work and what the industry still won't talk about",
    excerpt:
      "The stories welfare workers see and never share publicly and why the industry's mental health conversation still misses the people who need it most.",
    author: "Fr. Thomas D'Souza",
    date: "May 20, 2026",
  },
  {
    slug: "crewing-the-future-india-maritime-workforce",
    number: "EP 05",
    category: "Training",
    duration: "38 min",
    title:
      "Crewing the future: where India's maritime workforce strategy is heading next",
    excerpt:
      "A wide-ranging look at how India plans to grow from a major supplier of seafarers into a global maritime talent hub.",
    author: "Anjali Verma",
    date: "May 13, 2026",
  },
];

export const featuredEpisode: EpisodeDetail = {
  ...episodeSummaries[0],
  guestRole: "CEO, Board of Examination for Seafarers (BES)",
  youtubeId: "_xRXKorM7yk",
  lead:
    "From rest hour violations nobody intends but everyone breaks, to agents quietly charging three to five lakh rupees for a placement, to the digitisation overhaul that cut exam results from three months to two weeks.",
  intro: [
    "Capt. Harish Khatri has spent two decades on the regulatory side of Indian shipping. For the last three years he has run the Board of Examination for Seafarers (BES), the trust that examines more than 10,000 GP rating candidates a year before they ever step onto a ship.",
    "On the maritribeOne podcast, he talked through where the training and examination system actually fails people, what the fixes look like when they work, and a handful of stories from twenty years of watching candidates walk into an oral exam.",
  ],
  learn: [
    "Why the most violated rule at sea isn't broken out of bad intent",
    "What share of candidates who pass their exit exam are actually ready to work on a ship the day they clear it",
    "What candidates are quietly paying agents just to get hired, and why nobody puts it in writing",
    "How one process change cut exam results from three months to two weeks",
    "Why he thinks the wrong people often end up doing the teaching",
  ],
  takeaways: [
    {
      number: "01",
      title: "The most abused rule on a ship isn't broken out of malice.",
      body:
        "Rest hour requirements under STCW and MLC are, in Capt. Khatri's words, the most difficult and most abused regulation at sea. The reason isn't intent, it's structural: reduced manning and modern ship design leave no real room to comply.",
    },
    {
      number: "02",
      title: "The Board of Examination for Seafarers exists because the directorate couldn't keep up.",
      body:
        "Formed in 2005, BES took on GP rating exit examinations delegated from DG Shipping and now examines thousands of candidates every cycle.",
    },
    {
      number: "03",
      title: "Passing the exam is not the same as being vessel ready.",
      body:
        "Capt. Khatri put the number of truly ship-ready candidates at only around 30 to 35 percent on the day they clear the exam.",
    },
    {
      number: "04",
      title: "The placement fee problem is real and mostly invisible.",
      body:
        "Candidates often pay agents large unofficial fees just to secure their first ship, even after already spending heavily on training.",
    },
    {
      number: "05",
      title: "Digitising the exam process closed a major exploitation gap.",
      body:
        "A QR-code-based online process now puts certificates directly into the candidate's portal and reduced result timelines from months to weeks.",
    },
  ],
  references: [
    "STCW Convention",
    "MLC, 2006",
    "DG Shipping, Government of India",
    "Board of Examination for Seafarers",
    "IMO HTW Sub-Committee",
  ],
  find: ["LinkedIn", "BES website"],
  closing:
    "This piece draws from a longer conversation with Capt. Harish Khatri on the maritribeOne podcast.",
  chapters: [
    { time: "00:00", label: "Intro: seafarers are getting exploited" },
    { time: "01:08", label: "The rest hour rule nobody can fully follow" },
    { time: "02:16", label: "What the Board of Examination actually does" },
    { time: "05:32", label: "What failure actually costs a candidate" },
    { time: "10:23", label: "How an examiner prepares for an oral exam" },
    { time: "18:22", label: "Digitising India's seafarer examinations" },
    { time: "25:35", label: "From a Lucknow boy who failed the NDA twice" },
  ],
};

export function getEpisodeBySlug(slug: string): EpisodeDetail | null {
  if (slug === featuredEpisode.slug) return featuredEpisode;

  const summary = episodeSummaries.find((episode) => episode.slug === slug);
  if (!summary) return null;

  return {
    ...summary,
    guestRole: "Guest details to be attached",
    youtubeId: undefined,
    lead: summary.excerpt,
    intro: [
      "This episode route is now migrated into the Next.js app and ready for the full written post once the final editorial copy is attached.",
    ],
    learn: [
      "Core episode summary will appear here",
      "Detailed breakdown can be attached next",
    ],
    takeaways: [],
    references: [],
    find: [],
    closing: "Full long-form article for this episode is pending migration.",
    chapters: [],
  };
}
