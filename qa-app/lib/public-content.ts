export type EpisodeSummary = {
  slug: string;
  number: string;
  category: string;
  duration: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  /**
   * Only published episodes are listed, linked, or reachable by URL. Drafts stay
   * in this file so a future episode goes live by flipping this one flag (plus
   * attaching its detail entry below).
   */
  published: boolean;
  /** Drives the card artwork (YouTube still) on listing and "keep listening" cards. */
  youtubeId?: string;
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

export type EpisodeFind = {
  label: string;
  url?: string;
};

export type EpisodeDetail = EpisodeSummary & {
  guestRole: string;
  youtubeId?: string;
  lead: string;
  intro: string[];
  learn: string[];
  takeaways: EpisodeTakeaway[];
  references: string[];
  find: EpisodeFind[];
  closing: string;
  chapters: EpisodeChapter[];
};

/** Where the show is distributed. Used by every "Listen on" surface. */
export const listenLinks = {
  spotify: "https://open.spotify.com/show/033mbKv7c9OTU75hbhT29m",
  youtube: "https://www.youtube.com/@maritribeOnePodcast",
} as const;

export const episodeSummaries: EpisodeSummary[] = [
  {
    slug: "twenty-years-regulatory-side-indian-shipping",
    number: "EP 01",
    category: "Regulation",
    duration: "26 min",
    published: true,
    youtubeId: "_xRXKorM7yk",
    title:
      "Twenty years on the regulatory side of Indian shipping: what an examiner sees that nobody else does",
    excerpt:
      "From rest hour violations nobody intends but everyone breaks, to agents quietly charging three to five lakh rupees for a placement, to the digitisation overhaul that cut exam results from three months to two weeks.",
    author: "Capt. Harish Khatri",
    date: "June 10, 2026",
  },
  {
    slug: "from-the-bridge-to-the-algorithm",
    number: "EP 02",
    category: "Voyage Optimization",
    duration: "36 min",
    published: true,
    youtubeId: "7gQ5WjTENzI",
    title:
      "From the bridge to the algorithm: a tanker Master on what voyage optimization actually is, and why the industry keeps getting it wrong",
    excerpt:
      "A tanker Master turned voyage optimization specialist draws the line between weather routing and voyage optimization, explains why a vessel's digital twin decides everything, and recalls overriding an algorithm that told him to sail through ten-metre waves.",
    author: "Capt. Ketan Bhatia",
    date: "June 6, 2026",
  },
  {
    slug: "forty-years-of-not-looking-away",
    number: "EP 03",
    category: "Leadership",
    duration: "50 min",
    published: true,
    youtubeId: "JlIkUYHsnYY",
    title: "Forty years of not looking away",
    excerpt:
      "Only five to ten percent of the world's seventy-five thousand vessels transmit auto log data. The rest still runs on Excel, email, and memory. Forty years in, the President of the Institute of Marine Engineers India explains why the data problem is really a people problem.",
    author: "Kaushik Kumar Seal",
    date: "June 3, 2026",
  },

  // ---------------------------------------------------------------------------
  // Drafts. Not listed, not linked, not reachable by URL. To publish one: attach
  // a detail entry to `episodeDetails` below, then set `published: true`.
  // ---------------------------------------------------------------------------
  {
    slug: "automation-paradoxes-indias-largest-container-terminal",
    number: "EP 04",
    category: "Technology",
    duration: "31 min",
    published: false,
    title:
      "The port that moved faster by standing still: automation paradoxes at India's largest container terminal",
    excerpt:
      "Why the terminals that invested least in automation often outperformed those that invested most and what that tells us about the next decade of port technology.",
    author: "Rajesh Nair",
    date: "June 3, 2026",
  },
  {
    slug: "methanol-ammonia-hydrogen-right-fuel",
    number: "EP 05",
    category: "Green Shipping",
    duration: "34 min",
    published: false,
    title:
      "Methanol, ammonia, or hydrogen: how do you bet on the right fuel when the rules aren't written yet?",
    excerpt:
      "A frank conversation about the gap between IMO ambitions and the commercial reality of ordering ships today.",
    author: "Dr. Priya Menon",
    date: "May 27, 2026",
  },
  {
    slug: "seafarers-mind-welfare-work",
    number: "EP 06",
    category: "Welfare",
    duration: "29 min",
    published: false,
    title:
      "The seafarer's mind: two decades of welfare work and what the industry still won't talk about",
    excerpt:
      "The stories welfare workers see and never share publicly and why the industry's mental health conversation still misses the people who need it most.",
    author: "Fr. Thomas D'Souza",
    date: "May 20, 2026",
  },
  {
    slug: "crewing-the-future-india-maritime-workforce",
    number: "EP 07",
    category: "Training",
    duration: "38 min",
    published: false,
    title:
      "Crewing the future: where India's maritime workforce strategy is heading next",
    excerpt:
      "A wide-ranging look at how India plans to grow from a major supplier of seafarers into a global maritime talent hub.",
    author: "Anjali Verma",
    date: "May 13, 2026",
  },
];

/** The only episodes any public surface should ever render. */
export const publishedEpisodes: EpisodeSummary[] = episodeSummaries.filter(
  (episode) => episode.published,
);

function summaryOf(slug: string): EpisodeSummary {
  const summary = episodeSummaries.find((episode) => episode.slug === slug);
  if (!summary) {
    throw new Error(`No episode summary found for slug: ${slug}`);
  }
  return summary;
}

const khatriDetail: EpisodeDetail = {
  ...summaryOf("twenty-years-regulatory-side-indian-shipping"),
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
  find: [{ label: "LinkedIn" }, { label: "BES website" }],
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

const bhatiaDetail: EpisodeDetail = {
  ...summaryOf("from-the-bridge-to-the-algorithm"),
  guestRole: "Voyage Optimization and Vessel Performance Specialist",
  youtubeId: "7gQ5WjTENzI",
  lead:
    "An Aframax voyage from the Middle East to Rotterdam carries a fuel bill close to a million dollars. Weather routing costs $500. And voyage optimization, the service most of the industry conflates it with, is an entirely different thing.",
  intro: [
    "Captain Ketan Bhatia spent two decades commanding tankers before making a deliberate move ashore, not into a superintendent's role or a port captain's desk, but into a discipline that barely had a name when he was at sea. He now works in voyage optimization and vessel performance, which puts him on the opposite side of a conversation he had many times as a master: the one where shore-based advice tells you to do something the ship cannot safely do. On this episode, he draws a clean line between weather routing and voyage optimization, explains what a digital twin actually is and why its accuracy determines the quality of every route recommendation, and walks through the moment he overrode a service provider's advice to sail through ten-metre waves.",
  ],
  learn: [
    "Why weather routing and voyage optimization are not the same thing, and what each one is actually optimizing for",
    "Why the accuracy of a vessel's digital twin determines the quality of every optimization recommendation it receives",
    "The three inputs that make routing advice trustworthy, and what happens when any one of them is wrong",
    "How a near-million dollar fuel decision becomes a very straightforward ROI calculation",
    "Why some masters ignore routing advice, and what it actually takes to earn that trust back",
    "What the industry gets wrong when it assumes a good system will run itself",
  ],
  takeaways: [
    {
      number: "01",
      title: "Weather routing and voyage optimization are not interchangeable.",
      body:
        "Weather routing keeps a vessel safe at a fixed charter party speed. Voyage optimization goes further: it weighs fuel cost, hire cost, ETA targets, and a vessel-specific digital twin to find the least-cost path. Ketan was direct on the distinction: “When you say voyage optimization, you are not only keeping the vessel safe, avoiding the bad weather, but you are also trying to keep the commercials intact.”",
    },
    {
      number: "02",
      title: "The routing advice he overrode: proceed through ten-metre waves.",
      body:
        "A service provider's algorithm told his vessel to keep proceeding through a low pressure system with wave heights above ten metres. He overrode it using master's authority, reviewed the weather himself, reduced speed, altered course, and brought the vessel through safely. He reported it back to the provider. His question to them: “Are you actually seeing what the master is going to experience on the ship?”",
    },
    {
      number: "03",
      title: "Weather models and weather forecasts are the same term, but not the same output.",
      body:
        "Different models can give completely different predictions for the same developing storm. One may say a hurricane will recurve. Another may say it disappears within two days. As a master, Ketan gathered inputs from multiple sources and took a collective decision. As a routing advisor, the quality of that underlying forecast is the foundation of everything that follows.",
    },
    {
      number: "04",
      title: "Routing moved from a fax printout to a hurricane on your ECDIS screen.",
      body:
        "In the old days, routing came as a printed warning from the NAVTEX or EGC. Today, advisors send HTML files that load directly onto the ECDIS, where the master can see the vessel's track moving relative to a developing storm in real time. This shift from text warnings to live visual overlays helps mariners make far more informed decisions.",
    },
    {
      number: "05",
      title: "When the algorithm changes its mind every six hours, the engine room pays for it.",
      body:
        "When a routing advisor asks a vessel to change RPM every six to eight hours, that instruction has direct consequences for engine wear and machinery stress. Ketan gave a specific example: being asked to jump from 24 tons per day consumption to 36 tons within six hours. Good routing advice has to account for what the engine can actually absorb, not just what the algorithm calculates as optimal.",
    },
    {
      number: "06",
      title: "The digital twin has to be right before the advice can be.",
      body:
        "A vessel's digital twin includes its engine make, kilowatts, power output, and speed-consumption curves. If that model is inaccurate, the optimization is inaccurate. In Ketan's words: “Your route advice is as good as zero.” The twin has to be close enough to the actual vessel that when a speed is recommended, the ship can physically achieve it.",
    },
    {
      number: "07",
      title: "For weather routing, a generic model is enough. For voyage optimization, it is not.",
      body:
        "Ketan drew this line explicitly. Weather routing uses a fixed speed and consumption, so a generic model approximating the vessel's deadweight and draft is sufficient. Voyage optimization requires a vessel-specific digital twin because the route advice depends on what that particular ship can do at different speeds. Use a generic model for optimization and you produce advice the vessel may be unable to follow.",
    },
    {
      number: "08",
      title:
        "Three inputs determine whether routing advice is useful: weather forecast, operational constraints, vessel model.",
      body:
        "The weather forecast has to be accurate, or the advisory is built on a false assumption. The operational constraint has to be understood: is the operator targeting ETA or fuel savings? And the vessel model has to reflect the actual ship. Miss any one of these three and, in Ketan's words, the whole idea goes for a toss.",
    },
    {
      number: "09",
      title: "A million-dollar fuel bill and a $500 decision.",
      body:
        "At roughly 40 tons per day over 25 days, the fuel cost on an Aframax voyage comes close to a million dollars. Weather routing costs approximately $500. Following the advice saves 3 to 7 percent of that fuel bill, between $30,000 and $70,000 on a single voyage. “It is absolutely a no-brainer,” Ketan said.",
    },
    {
      number: "10",
      title: "The master who said: who are you to advise me.",
      body:
        "Some masters distrust advice from people who haven't recently been to sea. Ketan has received emails from masters questioning his right to advise them at all. His response: “I am nobody. I am neither your operator nor your family. I am just here to advise you from a safety viewpoint and for making sure that your commercials are taken care of.” The trust problem between shore advisors and masters is real, and in his view, the only way through it is for routers to understand what the master is physically experiencing.",
    },
    {
      number: "11",
      title: "CII ratings can be improved through operational measures alone.",
      body:
        "Asked whether voyage optimization and weather routing can move a vessel from a D to a C CII rating without technical retrofits, Ketan's answer was yes. Advising vessels to proceed at eco speed, minimising time at anchorage, and reducing unnecessary fuel burn all feed directly into the CII calculation.",
    },
    {
      number: "12",
      title: "Voyage optimization costs more because monitoring costs more.",
      body:
        "Weather routing is a one-off service per voyage. Voyage optimization requires continuous tracking of whether the vessel is following the advised speed, consumption, and waypoints. Every deviation has to be caught and corrected. The higher cost reflects that monitoring burden directly.",
    },
    {
      number: "13",
      title: "He won't hire someone who trusts the algorithm blindly.",
      body:
        "Ketan said he prefers navigational officers for his team and welcomes engineers, but is cautious about analysts who rely entirely on the algorithm. Different vessel types behave differently in different weather. A bulk carrier is not a container ship. Without that experiential understanding, over-reliance on the algorithm becomes a genuine operational risk.",
    },
    {
      number: "14",
      title: "Voyage optimization is a process, not a tool.",
      body:
        "The biggest lie the industry tells itself, in Ketan's words: that a good system will run itself. “Voyage optimization is not a tool. It is actually a process.” The algorithm sometimes gives wrong advice. Manual intervention is still required. The human in the loop stays.",
    },
  ],
  references: [
    "EGC (Enhanced Group Call)",
    "NAVTEX",
    "ECDIS",
    "Charter party",
    "CII (Carbon Intensity Indicator)",
    "Laycan",
    "Arabian Sea southwest monsoon",
  ],
  find: [
    { label: "LinkedIn", url: "https://in.linkedin.com/in/ketan-bhatia-ab71a110" },
  ],
  closing:
    "This piece draws from a longer conversation with Capt. Ketan Bhatia on the maritribeOne podcast.",
  chapters: [
    { time: "00:00", label: "Intro" },
    { time: "00:31", label: "The routing advice he overrode to keep his crew safe" },
    { time: "02:33", label: "Two models, two completely different storms" },
    { time: "04:03", label: "The job that didn't exist when he was sailing it" },
    { time: "05:20", label: "Why most people confuse these two things" },
    { time: "07:16", label: "From a fax printout to a hurricane on your screen" },
    { time: "09:09", label: "The rpm change the engine room hates" },
    { time: "11:26", label: "The twin that makes or breaks the advice" },
    { time: "12:51", label: "When generic is good enough, when it is not" },
    { time: "14:47", label: "The three inputs that make advice trustworthy" },
    { time: "17:19", label: "What an optimization subscription gets you" },
    { time: "21:51", label: "The zigzag through the Arabian Sea monsoon" },
    { time: "24:26", label: "A million-dollar fuel bill and a $500 decision" },
    { time: "26:33", label: "The master who said: who are you to advise me" },
    { time: "30:21", label: "Choosing the right routing provider" },
    { time: "31:47", label: "Can CII improve without a retrofit" },
    { time: "32:58", label: "The analyst he will not hire" },
    { time: "34:16", label: "Shipping's biggest lie about optimization" },
  ],
};

const sealDetail: EpisodeDetail = {
  ...summaryOf("forty-years-of-not-looking-away"),
  guestRole: "President, Institute of Marine Engineers India",
  youtubeId: "JlIkUYHsnYY",
  lead:
    "Only five to ten percent of the world's seventy-five thousand vessels transmit auto log data. The rest still runs on Excel, email, and memory. Kaushik Kumar Seal has spent a decade trying to close that gap, and a career of forty years learning why the data problem is really a people problem.",
  intro: [
    "Kaushik Kumar Seal trained at DMET Kolkata, sailed as Chief Engineer on some of the most demanding vessels in service, surveyed and inspected ships for Lloyd Register, managed environmental compliance for four hundred vessels at Anglo Eastern, made safety cases for heavy lift semi-submersible ships at Dockwise, optimised fleets from Singapore, and built IMEI's first international chapter before returning to Mumbai to lead the Institute of Marine Engineers India as its President. In this conversation with Shankar, he traces that arc from the inside out: the surveyor who got badly burnt in a boiler Kaushik had warned him about, the chief engineer detained for five to six days after insisting everything was fine, and the one piece of advice from his father, a Princeton-educated statistician in the Indian civil service, that has shaped every professional decision since.",
  ],
  learn: [
    "The difference between a survey, an inspection, and an audit, explained across time rather than technically",
    "Why only five to ten percent of the world's vessels transmit usable auto log data, and what happens to the rest",
    "What an experienced inspector is actually looking for when he boards a vessel, and why it is rarely the pipelines",
    "How to build a mentorship structure that works in practice, not just as a philosophy",
    "What the psychological cost of leaving the sea permanently looks like from the inside",
    "How IMEI's first international chapter in Singapore got built, and who received the first call when it came through",
  ],
  takeaways: [
    {
      number: "01",
      title: "If you turn a blind eye, you are seen as taking part in it.",
      body:
        "Kaushik's father, a Princeton-educated statistician who rose through the Indian civil service, gave him one piece of advice when he joined the merchant navy. That advice has stayed for forty years. “If you turn a blind eye towards inefficiency and corruption, it is also seen as you taking part in that.” The result, by his own account: very good sleep at night.",
    },
    {
      number: "02",
      title: "Integrity is not just a moral position. It is a career strategy.",
      body:
        "When Kaushik chose what he called “the self-righteous path” after leaving the sea, he acknowledged that it meant missing certain opportunities for growth available to those willing to compromise. His reading of the long game is different. “Hopefully I have earned a lot of respect from the industry. And that's what eggs me on and that's what propels me to do more for the fraternity.”",
    },
    {
      number: "03",
      title: "An inspector looks at safety culture, not at pipelines.",
      body:
        "In his years at Lloyd Register, Kaushik says he never actually inspected one hundred percent of what he was scoped to see. “I need to talk to people to understand how the safety culture is on board. I need to see some records, and believe me, with my experience, I could know if somebody is fudging something or not.” The attitude and behaviour of the crew in front of the inspector, he says, tells you more than any open crankshaft.",
    },
    {
      number: "04",
      title: "Not everyone is trying to fool you.",
      body:
        "As Chief Engineer, Kaushik had a boiler due for survey that had not cooled sufficiently. He told the surveyor it was not ready. The surveyor did not believe him and entered anyway. He came out badly burnt. The lesson Kaushik drew was the opposite of what you might expect. “Not everyone is trying to fool you, you must tend to believe by having a look around.” The surveyor credited the remaining items and left.",
    },
    {
      number: "05",
      title: "Sometimes nothing is okay.",
      body:
        "As a surveyor, Kaushik boarded a vessel where the chief engineer, expecting his relief, was already in civilian clothes with his bags packed. Nothing had been opened for survey. Under gentle but persistent questioning, the crew opened the engine room. “Nothing was okay.” What began as an anecdote ended with a condition of class, a workshop called in, and a stay of five to six days instead of the usual one and a half.",
    },
    {
      number: "06",
      title: "Audit is the past. Inspection is the present. Survey is the future.",
      body:
        "Three terms that maritime professionals use interchangeably and, in Kaushik's view, incorrectly. An auditor looks at records. An inspector checks whether the fire pump is making pressure right now. A surveyor opens equipment to certify it for the next five years. “A survey is something for the future, which means that I'd like to see something opened up as a surveyor.” Lloyd Register gave him the rare opportunity to carry out all three activities in the same role.",
    },
    {
      number: "07",
      title: "Only five to ten percent of vessels transmit auto log data.",
      body:
        "Kaushik has spent a decade in fleet performance. His assessment of where the industry actually stands on digitalization is blunt. “About five to ten percent only have auto log data which is coming in. The rest of the data is still manual.” The gap between conference talk about digitalization and the Excel spreadsheets running actual ships is not, in his view, closing fast enough.",
    },
    {
      number: "08",
      title: "Data quality is the real problem, not data volume.",
      body:
        "The issue is not how much data ships generate. It is whether that data is reliable. Kaushik's framing is direct: “our data quality sucks, if I may use terminology from Gen Z.” His counterintuitive position is that frequency matters less than accuracy. “Even once every 12 hours, as long as that data point is good and it's correct, our performance can be good.”",
    },
    {
      number: "09",
      title: "Technology without crew competency becomes a defunct piece of equipment.",
      body:
        "Kaushik's concern about digital technology on ships is not scepticism about the technology itself. It is about the match between the technology and the crew operating it. When that match is absent, the outcome is predictable. “People who are going to use it, it's a nightmare on board. And then it's a defunct piece of equipment lying in one corner of the engine room.”",
    },
    {
      number: "10",
      title: "Mentorship is thirty to forty percent generic and sixty to seventy percent customized.",
      body:
        "Kaushik's framework for mentorship resists the idea that one experienced person can effectively guide anyone. Context matters more than seniority. “It's all different strokes for different folks here, mind you. There's not one single answer. Some part of it is generic in my opinion, maybe thirty to forty percent. But the balance sixty, seventy percent is the customized stuff which you have to understand what the person has been through.”",
    },
    {
      number: "11",
      title: "Stop the weld halfway. That is where the learning happens.",
      body:
        "The mentor who shaped Kaushik most in his early sea years was his second engineer, Mr. Binny, who later died in a vessel accident. What he remembers is a specific method. “He used to teach not by just telling the answer. He used to teach us by telling us, find it out the correct way.” If a task was half right, Binny would correct course mid-task rather than letting the error complete. “When you're going wrong, at the correct time, if you do a course correction, then you tend to learn the correct thing.”",
    },
    {
      number: "12",
      title: "You pick a few good people and then make it happen.",
      body:
        "The IMEI Singapore chapter had been attempted before and had not gathered momentum. Kaushik's approach was simple in description, if not in execution: identify the right people, register the body with the ROC Singapore, and build from there. When it came through, he called the then-president of IMEI, Mr. Vijendra Jain, his own batchmate from Marine College, at around ten o'clock at night to share the news.",
    },
    {
      number: "13",
      title: "Engineers from naval dockyards had no unified voice.",
      body:
        "One of the outcomes of the Singapore chapter that Kaushik speaks about with clear satisfaction is not the institution itself but who it brought in. Engineers from Mazagon Docks, naval dockyards, Vizag Port Trust, and Chennai Port Trust, professionals who had no alumni network and no forum to speak from, finally had one. “They were not getting a unified voice or a forum to come out and share what they had in mind.”",
    },
    {
      number: "14",
      title: "As a result, I get very good sleep at night.",
      body:
        "It is the closing line of his answer about staying honest across forty years, and it is delivered without drama. The opportunities that came from compromising his principles were visible, and he acknowledges them plainly. What he chose instead was a quieter metric. “As a result I get very good sleep at night, Shankar, just to let you know.” For a career that has spanned engine rooms, classification societies, fleet performance desks, and institutional leadership, it may be the most specific thing he says.",
    },
  ],
  references: [
    "DMET Kolkata (Directorate of Marine Engineering Training)",
    "Lloyd Register and LR QA (Lloyd Register Quality Assurance)",
    "Germanischer Lloyd, now part of DNV",
    "Anglo Eastern",
    "Dockwise (heavy lift shipping)",
    "StormGeo, acquired by Alfa Laval",
    "Njord, part of Maersk Tankers",
    "ABS (American Bureau of Shipping)",
    "Applied Research International (ARI)",
    "IMEI (Institute of Marine Engineers India)",
    "DMET Singapore Alumni Association",
    "ISWAN (International Seafarers' Welfare and Assistance Network)",
    "CMMI (Company of Master Mariners in India)",
    "ISM Code (International Safety Management Code)",
    "MARPOL (Marine Pollution Convention)",
    "ISO 9000, ISO 14000, ISO 45000",
    "ONGC and DGH (Director General of Hydrocarbons)",
    "Maritime India Vision / Amrit Kaal 2047",
    "Mazagon Docks, Vizag Port Trust, Chennai Port Trust",
  ],
  find: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/kkseal/" }],
  closing:
    "This piece draws from a longer conversation with Kaushik Kumar Seal on the maritribeOne podcast.",
  chapters: [
    { time: "00:00", label: "Welcome to maritribeOne" },
    { time: "00:26", label: "His father's one rule on corruption" },
    { time: "03:33", label: "The conversation before leaving the sea" },
    { time: "05:44", label: "What a surveyor actually looks for" },
    { time: "08:35", label: "The boiler the surveyor entered anyway" },
    { time: "10:29", label: "The chief engineer who was ready to leave" },
    { time: "17:02", label: "Survey, inspection, audit: across time" },
    { time: "19:56", label: "From Lloyd's to IMEI presidency" },
    { time: "31:56", label: "Building IMEI's first chapter in Singapore" },
    { time: "35:50", label: "Data rich, insight poor: where it goes" },
    { time: "38:54", label: "Mentorship as a movement" },
    { time: "42:04", label: "Three people he would call to dinner" },
  ],
};

export const episodeDetails: Record<string, EpisodeDetail> = {
  [khatriDetail.slug]: khatriDetail,
  [bhatiaDetail.slug]: bhatiaDetail,
  [sealDetail.slug]: sealDetail,
};

/** The episode surfaced in "featured" slots (newest fully-produced episode). */
export const featuredEpisode: EpisodeDetail = khatriDetail;

export function getEpisodeBySlug(slug: string): EpisodeDetail | null {
  const summary = episodeSummaries.find((episode) => episode.slug === slug);
  // Drafts are unreachable by URL, not just unlisted.
  if (!summary || !summary.published) return null;

  const detail = episodeDetails[slug];
  if (detail) return detail;

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
