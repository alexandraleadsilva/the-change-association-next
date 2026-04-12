"use client";

import Link from "next/link";
import { feed } from "@/data/feed";
import { ScrollReveal } from "./ScrollReveal";

const categoryLabels: Record<string, string> = {
  leadership: "Leadership",
  culture: "Culture",
  "hr-people": "HR & People",
  "digital-transformation": "Digital Transformation",
  "change-adoption": "Change Adoption",
  tools: "Tools",
};

export function ChangeFeed({ limit = 5 }: { limit?: number }) {
  const entries = feed.slice(0, limit);

  return (
    <div className="change-feed">
      <div className="change-feed-header">
        <span className="change-feed-label">Change in the Real World</span>
        <p className="change-feed-desc">What is happening in organisational change right now</p>
      </div>
      <div className="change-feed-list">
        {entries.map((entry, i) => (
          <ScrollReveal key={i} direction="right" delay={i * 80}>
            <div className="feed-item">
              <div className="feed-item-meta">
                <span className="feed-item-category">{categoryLabels[entry.category] || entry.category}</span>
                <span className="feed-item-sep"></span>
                <span className="feed-item-region">{entry.region}</span>
              </div>
              <h3 className="feed-item-headline">{entry.headline}</h3>
              <p className="feed-item-summary">{entry.summary}</p>
              <div className="feed-item-footer">
                <span className="feed-item-date">{entry.date}</span>
                {entry.source && (
                  <a href={entry.source} target="_blank" rel="noopener noreferrer" className="feed-item-source">
                    {entry.sourceLabel || "Source"} &rarr;
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <Link href="/change-bites" className="btn-outline change-feed-cta">View All &rarr;</Link>
    </div>
  );
}
