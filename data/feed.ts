// ============================================
// CHANGE FEED
// Add new entries at the top. Each entry appears
// on the homepage feed and the Change Bites page.
//
// Categories: "leadership" | "culture" | "hr-people"
//           | "digital-transformation" | "change-adoption" | "tools"
// ============================================

export interface FeedEntry {
  date: string;
  headline: string;
  summary: string;
  category: string;
  region: string;
  source?: string;
  sourceLabel?: string;
}

export const feed: FeedEntry[] = [
  // ---- ADD NEW ENTRIES HERE ----

  {
    date: "March 2026",
    headline: "Unilever enforces global hiring pause amid restructuring",
    summary: "Unilever has paused all global hiring as part of its ongoing transformation. The company has already cut 6,000 of 7,500 planned roles and is separating its Ice Cream division into a standalone business. The restructure aims to deliver 800 million euros in cost savings but raises questions about how organisations sustain engagement during prolonged uncertainty.",
    category: "leadership",
    region: "Global",
    source: "https://www.cnbc.com/2026/03/31/unilever-global-hiring-pause-us-iran-war-challenges-.html",
    sourceLabel: "CNBC",
  },
  {
    date: "February 2026",
    headline: "Chevron to cut 8,000 jobs as it restructures for the energy transition",
    summary: "Chevron has announced plans to reduce its global workforce by 15 to 20 percent by the end of 2026. The cuts are tied to cost reduction, business simplification, and the integration of a major acquisition. The scale of change raises familiar challenges around communication, role clarity, and supporting people through transition.",
    category: "change-adoption",
    region: "US",
    source: "https://intellizence.com/insights/layoff-downsizing/q1-2026-layoffs-major-reset-by-companies/",
    sourceLabel: "Intellizence",
  },
  {
    date: "January 2026",
    headline: "Boeing publishes safety culture report as turnaround continues",
    summary: "Boeing's 2025 Chief Aerospace Safety Officer report details progress on its cultural overhaul following the 737 MAX door plug incident. Under CEO Kelly Ortberg, the company has expanded its Speak Up programme, introduced unannounced production audits, and reported a 40 percent reduction in assembly defects. The case is a live example of culture-led change at enterprise scale.",
    category: "culture",
    region: "US",
    source: "https://aviationsourcenews.com/boeings-2025-safety-report-highlights-progress-in-safety-culture-and-practices/",
    sourceLabel: "Aviation Source News",
  },
  {
    date: "April 2025",
    headline: "Spotify stands firm on remote work while others mandate return to office",
    summary: "While companies like Amazon and JPMorgan have mandated full return to office, Spotify's HR chief has reaffirmed its Work From Anywhere policy, stating that employees are not children. The company reports 15 percent lower attrition and improved diversity since the policy launched, making it a compelling counter-example in the RTO debate.",
    category: "hr-people",
    region: "Global",
    source: "https://fortune.com/europe/2025/04/29/spotifys-hr-chief-remote-staff-arent-children-work-from-anywhere/",
    sourceLabel: "Fortune",
  },
  {
    date: "February 2025",
    headline: "NHS digital workforce plan delayed again as trusts face funding cuts",
    summary: "NHS England has dropped plans to publish a dedicated digital workforce plan, folding it into a broader strategy refresh due in late 2025. Meanwhile, 86 percent of NHS trust leaders say they will need to cut non-clinical roles, including digital teams, to meet financial targets. It highlights how digital transformation stalls when the people dimension is deprioritised.",
    category: "digital-transformation",
    region: "UK",
    source: "https://www.digitalhealth.net/2025/05/nhse-drops-plans-to-publish-a-dedicated-digital-workforce-plan/",
    sourceLabel: "Digital Health",
  },
];
