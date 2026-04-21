"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const tools = [
  {
    href: "/tools/readiness-assessment",
    pillar: "Direction",
    name: "Change Readiness Assessment",
    description: "Rate your organisation across People, Process, Culture, Capability, and Systems. Get a visual readiness score with targeted recommendations.",
    relatedArticle: "/knowledge/current-state-assessment",
    relatedLabel: "Current State Assessment",
  },
  {
    href: "/tools/charter-builder",
    pillar: "Direction",
    name: "Change Charter Builder",
    description: "Build your change charter section by section with guided prompts. Cover strategic context, case for change, scope, approach, governance, success criteria, and risks.",
    relatedArticle: "/knowledge/change-charter",
    relatedLabel: "Change Charter & Business Case",
  },
  {
    href: "/tools/sponsor-roadmap",
    pillar: "Direction",
    name: "Sponsor Roadmap",
    description: "Map your executive sponsor's actions to each TCA pillar. Track progress with pre-populated suggested actions and custom additions.",
    relatedArticle: "/knowledge/building-sponsorship",
    relatedLabel: "Building Sponsorship",
  },
  {
    href: "/tools/stakeholder-map",
    pillar: "Engagement",
    name: "Stakeholder Map Builder",
    description: "Plot stakeholders by impact and influence on a quadrant map. Track current and target support levels and see where movement is needed.",
    relatedArticle: "/knowledge/stakeholder-strategy",
    relatedLabel: "Stakeholder Strategy",
  },
  {
    href: "/tools/communication-planner",
    pillar: "Engagement",
    name: "Communication Planner",
    description: "Plan communications by phase, audience, and channel. Track status across the full change timeline from pre-announcement to post go-live.",
    relatedArticle: "/knowledge/communication-planning",
    relatedLabel: "Communication Planning",
  },
  {
    href: "/tools/resistance-tracker",
    pillar: "Engagement",
    name: "Resistance Tracker",
    description: "Log resistance signals, classify them by type and severity, record your interpretation, and track your response.",
    relatedArticle: "/knowledge/resistance-management",
    relatedLabel: "Resistance Management",
  },
  {
    href: "/tools/impact-matrix",
    pillar: "Engagement",
    name: "Change Impact Matrix",
    description: "Score impact by group across five dimensions: role, process, system, skill, and location change. Visualise as a colour-coded heatmap.",
    relatedArticle: "/knowledge/change-impact-assessment",
    relatedLabel: "Change Impact Assessment",
  },
  {
    href: "/tools/training-matrix",
    pillar: "Enablement",
    name: "Training Needs Matrix",
    description: "Map roles against skills needed for the future state. Identify capability gaps and plan targeted training by group.",
    relatedArticle: "/knowledge/learning-design",
    relatedLabel: "Learning Design & Delivery",
  },
  {
    href: "/tools/change-roadmap",
    pillar: "Execution",
    name: "Change Roadmap",
    description: "Build a visual timeline of your change programme with milestones, phases, and key activities. Track progress against plan.",
    relatedArticle: "/knowledge/phased-approach",
    relatedLabel: "Phased Approach to Change",
  },
  {
    href: "/tools/benefits-register",
    pillar: "Execution",
    name: "Benefits Register",
    description: "Define expected benefits with owners, baselines, targets, and tracking schedules. Monitor status and overall health of your benefits case.",
    relatedArticle: "/knowledge/benefits-realisation",
    relatedLabel: "Benefits Realisation",
  },
  {
    href: "/tools/adoption-scorecard",
    pillar: "Execution",
    name: "Adoption Scorecard",
    description: "Score adoption across the five-stage curve: Awareness, Understanding, Trial, Adoption, Proficiency. Get auto-generated interpretation.",
    relatedArticle: "/knowledge/adoption-metrics",
    relatedLabel: "Adoption Metrics",
  },
  {
    href: "/tools/culture-tracker",
    pillar: "Sustainment",
    name: "Culture Embedding Tracker",
    description: "Assess five embedding indicators: language, behaviours, old ways, new starters, and leadership resilience. See whether the change is becoming culture.",
    relatedArticle: "/knowledge/culture-integration",
    relatedLabel: "Culture Integration",
  },
];

const pillars = ["All", "Direction", "Engagement", "Enablement", "Execution", "Sustainment"];

export default function ToolsPage() {
  const [activePillar, setActivePillar] = useState("All");

  const filtered = activePillar === "All" ? tools : tools.filter(t => t.pillar === activePillar);

  return (
    <>
      <Nav />

      <div className="page-header">
        <span>TCA Tools</span>
        <h1>Interactive tools for change practitioners</h1>
        <p>
          Built for use on screen, not in a drawer. Each tool connects to the
          TCA Change Model and the relevant Knowledge Hub article.
        </p>
      </div>

      <div className="hub-layout">
        <aside className="hub-sidebar">
          {pillars.map(pillar => (
            <div className="sidebar-item" key={pillar}>
              <a
                href="#"
                className={activePillar === pillar ? "active" : ""}
                onClick={(e) => { e.preventDefault(); setActivePillar(pillar); }}
              >
                {pillar === "All" ? `All Tools (${tools.length})` : `${pillar} (${tools.filter(t => t.pillar === pillar).length})`}
              </a>
            </div>
          ))}
        </aside>

        <main className="hub-content">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((tool, i) => (
              <ScrollReveal key={tool.href} direction="up" delay={i * 40}>
                <Link
                  href={tool.href}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 24,
                    padding: "24px 0",
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div>
                    <span style={{
                      fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.16em", textTransform: "uppercase" as const,
                      color: "var(--gold)", display: "block", marginBottom: 6,
                    }}>
                      {tool.pillar}
                    </span>
                    <span style={{
                      fontFamily: "var(--serif)", fontSize: 20, fontWeight: 500,
                      color: "var(--navy)", lineHeight: 1.3, display: "block", marginBottom: 6,
                      transition: "color 0.2s",
                    }}>
                      {tool.name}
                    </span>
                    <span style={{
                      fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)",
                      lineHeight: 1.6, display: "block",
                    }}>
                      {tool.description}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "var(--ui)", fontSize: 12, color: "var(--gold)",
                    letterSpacing: "0.04em", whiteSpace: "nowrap", flexShrink: 0,
                    transition: "transform 0.2s",
                  }}>
                    Open &rarr;
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
