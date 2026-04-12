// ============================================
// CHANGE FEED
// Add new entries at the top. Each entry appears
// on the homepage feed and the Change Bites page.
//
// Categories: "leadership" | "culture" | "hr-people"
//           | "digital-transformation" | "change-adoption" | "tools"
// ============================================

export interface FeedEntry {
  date: string;        // e.g. "April 2026"
  headline: string;
  summary: string;
  category: string;
  region: string;      // e.g. "Global", "UK", "US", "EU"
  source?: string;     // URL to original article
  sourceLabel?: string; // e.g. "BBC News", "Reuters"
}

export const feed: FeedEntry[] = [
  // ---- ADD NEW ENTRIES HERE ----

  {
    date: "April 2026",
    headline: "NHS England scraps major IT programme after years of delays",
    summary: "A flagship digital transformation programme across NHS trusts has been quietly wound down after repeated delays, budget overruns, and low adoption among clinical staff. The programme was designed to unify patient records across regions but struggled with stakeholder engagement and frontline resistance.",
    category: "digital-transformation",
    region: "UK",
    source: "https://www.bbc.co.uk",
    sourceLabel: "BBC News",
  },
  {
    date: "April 2026",
    headline: "Boeing announces sweeping cultural overhaul following safety review",
    summary: "Boeing has committed to a company-wide cultural transformation in response to ongoing safety concerns. The initiative focuses on empowering engineers to raise issues without fear of reprisal, a direct acknowledgement that the existing culture suppressed critical feedback.",
    category: "culture",
    region: "US",
    source: "https://www.reuters.com",
    sourceLabel: "Reuters",
  },
  {
    date: "March 2026",
    headline: "Unilever restructures into five divisions, cutting 7,500 roles",
    summary: "Unilever has announced a major restructure, splitting into five distinct business groups with greater autonomy. The change affects 7,500 roles globally and is intended to improve speed and accountability. Change management experts note the risk of unclear role transitions at this scale.",
    category: "leadership",
    region: "Global",
    source: "https://www.ft.com",
    sourceLabel: "Financial Times",
  },
  {
    date: "March 2026",
    headline: "Australian government mandates return-to-office for public servants",
    summary: "The Australian Public Service Commission has directed all federal agencies to require a minimum of three days in the office. The mandate has been met with significant resistance, with unions arguing that the change was imposed without meaningful consultation or impact assessment.",
    category: "hr-people",
    region: "Australia",
    source: "https://www.theguardian.com",
    sourceLabel: "The Guardian",
  },
  {
    date: "February 2026",
    headline: "Spotify rolls back its 'Work From Anywhere' policy",
    summary: "After two years of fully flexible remote work, Spotify has introduced location-based expectations for certain teams. The shift highlights the tension between organisational design and employee experience, and the challenge of changing a policy that became part of the culture.",
    category: "change-adoption",
    region: "Global",
    source: "https://www.businessinsider.com",
    sourceLabel: "Business Insider",
  },
];
