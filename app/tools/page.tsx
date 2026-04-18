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
];

const comingSoon = [
  { pillar: "Engagement", name: "Communication Planner", description: "Build a timeline of messages by audience and channel." },
  { pillar: "Direction", name: "Sponsor Roadmap", description: "Map sponsor actions to each phase of the TCA model." },
  { pillar: "Engagement", name: "Resistance Tracker", description: "Log and categorise resistance signals with recommended responses." },
  { pillar: "Execution", name: "Benefits Register", description: "Define benefits, owners, baselines, and tracking schedules." },
  { pillar: "Execution", name: "Adoption Scorecard", description: "Score adoption across the five-stage adoption curve." },
  { pillar: "Sustainment", name: "Culture Embedding Tracker", description: "Track the five embedding indicators over time." },
  { pillar: "Execution", name: "Change Impact Matrix", description: "Score impact by role across multiple change dimensions." },
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

      <section style={{ padding: "0 48px 56px", maxWidth: 960, margin: "0 auto" }}>
        <ScrollReveal direction="up">
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 500, color: "var(--navy)", marginBottom: 12 }}>
            Coming Soon
          </h2>
          <p style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--text-mid)", marginBottom: 32 }}>
            These tools are in development and will be added as the toolkit grows.
          </p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {comingSoon.map((tool, i) => (
            <ScrollReveal key={tool.name} direction="up" delay={i * 60}>
              <div
                style={{
                  padding: "24px 22px",
                  border: "1px solid var(--border)",
                  opacity: 0.55,
                  height: "100%",
                }}
              >
                <span style={{
                  fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--gold)", marginBottom: 8, display: "block",
                }}>
                  {tool.pillar}
                </span>
                <span style={{
                  fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600,
                  color: "var(--navy)", lineHeight: 1.25, marginBottom: 6, display: "block",
                }}>
                  {tool.name}
                </span>
                <span style={{
                  fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)",
                  lineHeight: 1.5,
                }}>
                  {tool.description}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
