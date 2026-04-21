import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const tools = [
  {
    href: "/tools/readiness-assessment",
    pillar: "Direction",
    name: "Change Readiness Assessment",
    description: "Rate your organisation across People, Process, Culture, Capability, and Systems. Get a visual readiness score with targeted recommendations for each dimension.",
    relatedArticle: "/knowledge/current-state-assessment",
    relatedLabel: "Current State Assessment",
  },
  {
    href: "/tools/stakeholder-map",
    pillar: "Engagement",
    name: "Stakeholder Map Builder",
    description: "Build your stakeholder map on screen. Plot stakeholders by impact and influence, track their current and target support levels, and see where movement is needed.",
    relatedArticle: "/knowledge/stakeholder-strategy",
    relatedLabel: "Stakeholder Strategy",
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
    href: "/tools/communication-planner",
    pillar: "Engagement",
    name: "Communication Planner",
    description: "Plan communications by phase, audience, and channel. Track status across the full change timeline from pre-announcement to post go-live.",
    relatedArticle: "/knowledge/communication-planning",
    relatedLabel: "Communication Planning",
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
    href: "/tools/resistance-tracker",
    pillar: "Engagement",
    name: "Resistance Tracker",
    description: "Log resistance signals, classify them by type and severity, record your interpretation, and track your response. Filter by severity and status.",
    relatedArticle: "/knowledge/resistance-management",
    relatedLabel: "Resistance Management",
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
    description: "Score adoption across the five-stage curve: Awareness, Understanding, Trial, Adoption, Proficiency. Get auto-generated interpretation of your pattern.",
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
  {
    href: "/tools/impact-matrix",
    pillar: "Engagement",
    name: "Change Impact Matrix",
    description: "Score impact by group across five dimensions: role, process, system, skill, and location change. Visualise as a colour-coded heatmap.",
    relatedArticle: "/knowledge/change-impact-assessment",
    relatedLabel: "Change Impact Assessment",
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
    href: "/tools/training-matrix",
    pillar: "Enablement",
    name: "Training Needs Matrix",
    description: "Map roles against skills needed for the future state. Identify capability gaps and plan targeted training by group.",
    relatedArticle: "/knowledge/learning-design",
    relatedLabel: "Learning Design & Delivery",
  },
];


export default function ToolsPage() {
  return (
    <>
      <Nav />

      <div className="page-header">
        <span>TCA Tools</span>
        <h1>Interactive tools for change practitioners</h1>
        <p>
          Built for use on screen, not in a drawer. Each tool connects to the
          TCA Change Model and the relevant Knowledge Hub article. No downloads,
          no PDFs.
        </p>
      </div>

      <section style={{ padding: "56px 48px", maxWidth: 960, margin: "0 auto" }}>
        <ScrollReveal direction="up">
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 500, color: "var(--navy)", marginBottom: 32 }}>
            Available Now
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.href} direction="up" delay={i * 100}>
              <Link
                href={tool.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "28px 24px",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "all 0.25s",
                  height: "100%",
                }}
                className="home-card"
              >
                <span style={{
                  fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--gold)", marginBottom: 10,
                }}>
                  {tool.pillar}
                </span>
                <span style={{
                  fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600,
                  color: "var(--navy)", lineHeight: 1.25, marginBottom: 10,
                }}>
                  {tool.name}
                </span>
                <span style={{
                  fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)",
                  lineHeight: 1.6, marginBottom: 16, flex: 1,
                }}>
                  {tool.description}
                </span>
                <span style={{
                  fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)",
                  letterSpacing: "0.04em",
                }}>
                  Open tool &rarr;
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>


      <Footer />
    </>
  );
}
