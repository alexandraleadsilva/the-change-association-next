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
    date: "April 2026",
    headline: "CNBC warns of AI driven labour crisis as Meta and Microsoft cut 20,000 jobs",
    summary: "Combined layoffs at Meta and Microsoft have surpassed 20,000 roles in April alone, with both companies redirecting budgets toward AI infrastructure. An LHH survey found 87 percent of HR leaders say their organisation has already conducted or is planning layoffs in the next 12 months. The scale of workforce disruption underscores the urgent need for change professionals to lead people through AI driven transitions, not just manage the technology rollout.",
    category: "change-adoption",
    region: "Global",
    source: "https://www.cnbc.com/2026/04/24/20k-job-cuts-at-meta-microsoft-raise-concern-of-ai-labor-crisis-.html",
    sourceLabel: "CNBC",
  },
  {
    date: "April 2026",
    headline: "Prosci launches evolved brand and subscription membership after 30 years",
    summary: "Prosci has unveiled a refreshed brand identity and a new Membership subscription service giving change practitioners ongoing access to research tools, expert guidance, and a global peer community. With 275,000 certified professionals in 80 countries, CEO Scott McAllister says out changing the competition is rapidly becoming the next source of competitive advantage. The move signals a broader industry shift from one off certification toward continuous capability building.",
    category: "tools",
    region: "Global",
    source: "https://www.prosci.com/blog/prosci-evolved-brand",
    sourceLabel: "Prosci",
  },
  {
    date: "April 2026",
    headline: "City and Guilds identifies five essential change management skills for leaders",
    summary: "A new City and Guilds article argues that effective change leadership depends on human centred behaviours rather than rigid frameworks. The five capabilities highlighted are adaptability, empathy, communication clarity, decision making under uncertainty, and stakeholder alignment. The piece recommends building change skills proactively across all levels through scenario based learning rather than relying solely on specialist change roles.",
    category: "leadership",
    region: "UK",
    source: "https://www.cityandguilds.com/news/april-2026/change-management-skills-for-confident-leaders",
    sourceLabel: "City and Guilds",
  },
  {
    date: "March 2026",
    headline: "Gartner finds 78 percent of CHROs say workflows must change to realise AI value",
    summary: "A Gartner report on change management trends in the age of AI reveals that just over half of organisations have redesigned roles because of AI, yet many are struggling to manage the people side of these transitions. With 78 percent of CHROs acknowledging that workflows and roles need to change, the research reinforces that technology adoption without structured change management leaves organisations vulnerable to resistance and disengagement.",
    category: "digital-transformation",
    region: "Global",
    source: "https://www.gartner.com/en/newsroom/press-releases/2026-3-16-gartner-identifies-top-change-management-trends-for-chros-in-age-of-ai",
    sourceLabel: "Gartner",
  },
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
    summary: "Boeing's 2025 Chief Aerospace Safety Officer report details progress on its cultural overhaul following the 737 MAX door plug incident. Under CEO Kelly Ortberg, the company has expanded its Speak Up program, introduced unannounced production audits, and reported a 40 percent reduction in assembly defects. The case is a live example of culture-led change at enterprise scale.",
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
