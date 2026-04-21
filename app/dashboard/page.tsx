"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ToolRecord {
  tool_type: string;
  project_name: string;
  data: Record<string, unknown>;
  updated_at: string;
}

const TOOL_META: Record<string, { name: string; pillar: string; href: string; getStatus: (data: Record<string, unknown>) => { label: string; colour: string; detail: string } }> = {
  "readiness-assessment": {
    name: "Change Readiness Assessment",
    pillar: "Direction",
    href: "/tools/readiness-assessment",
    getStatus: (data) => {
      const dims = data.dimensions as Record<string, { score: number }> | undefined;
      if (!dims) return { label: "Not Started", colour: "#9E9E9E", detail: "No dimensions scored" };
      const scores = Object.values(dims).map(d => d.score || 0).filter(s => s > 0);
      if (scores.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No dimensions scored" };
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (scores.length < 5) return { label: "In Progress", colour: "#D4A017", detail: `${scores.length}/5 dimensions scored, avg ${avg.toFixed(1)}` };
      if (avg >= 4) return { label: "Strong", colour: "#27AE60", detail: `All scored, avg ${avg.toFixed(1)}/5` };
      if (avg >= 2.5) return { label: "Developing", colour: "#D4A017", detail: `All scored, avg ${avg.toFixed(1)}/5` };
      return { label: "Gaps Found", colour: "#C0392B", detail: `All scored, avg ${avg.toFixed(1)}/5` };
    },
  },
  "stakeholder-map": {
    name: "Stakeholder Map",
    pillar: "Engagement",
    href: "/tools/stakeholder-map",
    getStatus: (data) => {
      const stakeholders = data.stakeholders as unknown[] | undefined;
      if (!stakeholders || stakeholders.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No stakeholders mapped" };
      return { label: "Active", colour: "#27AE60", detail: `${stakeholders.length} stakeholders mapped` };
    },
  },
  "charter-builder": {
    name: "Change Charter",
    pillar: "Direction",
    href: "/tools/charter-builder",
    getStatus: (data) => {
      const sections = data.sections as Record<string, string> | undefined;
      if (!sections) return { label: "Not Started", colour: "#9E9E9E", detail: "No sections completed" };
      const filled = Object.values(sections).filter(v => v && v.length > 10).length;
      if (filled === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No sections completed" };
      if (filled === 7) return { label: "Complete", colour: "#27AE60", detail: "All 7 sections completed" };
      return { label: "In Progress", colour: "#D4A017", detail: `${filled}/7 sections completed` };
    },
  },
  "communication-planner": {
    name: "Communication Planner",
    pillar: "Engagement",
    href: "/tools/communication-planner",
    getStatus: (data) => {
      const entries = data.entries as unknown[] | undefined;
      if (!entries || entries.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No communications planned" };
      return { label: "Active", colour: "#27AE60", detail: `${entries.length} communications planned` };
    },
  },
  "sponsor-roadmap": {
    name: "Sponsor Roadmap",
    pillar: "Direction",
    href: "/tools/sponsor-roadmap",
    getStatus: (data) => {
      const phases = data.phases as Record<string, { actions: { status: string }[] }> | undefined;
      if (!phases) return { label: "Not Started", colour: "#9E9E9E", detail: "No actions tracked" };
      const allActions = Object.values(phases).flatMap(p => p.actions || []);
      if (allActions.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No actions tracked" };
      const complete = allActions.filter(a => a.status === "complete").length;
      if (complete === allActions.length) return { label: "Complete", colour: "#27AE60", detail: `All ${allActions.length} actions complete` };
      return { label: "In Progress", colour: "#D4A017", detail: `${complete}/${allActions.length} actions complete` };
    },
  },
  "resistance-tracker": {
    name: "Resistance Tracker",
    pillar: "Engagement",
    href: "/tools/resistance-tracker",
    getStatus: (data) => {
      const signals = data.signals as { severity: string; status: string }[] | undefined;
      if (!signals || signals.length === 0) return { label: "No Signals", colour: "#9E9E9E", detail: "No resistance signals logged" };
      const high = signals.filter(s => s.severity === "high").length;
      const unresolved = signals.filter(s => s.status !== "resolved").length;
      if (high > 0) return { label: "High Risk", colour: "#C0392B", detail: `${signals.length} signals, ${high} high severity, ${unresolved} unresolved` };
      if (unresolved > 0) return { label: "Active", colour: "#D4A017", detail: `${signals.length} signals, ${unresolved} unresolved` };
      return { label: "Resolved", colour: "#27AE60", detail: `All ${signals.length} signals resolved` };
    },
  },
  "benefits-register": {
    name: "Benefits Register",
    pillar: "Execution",
    href: "/tools/benefits-register",
    getStatus: (data) => {
      const benefits = data.benefits as { status: string }[] | undefined;
      if (!benefits || benefits.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No benefits registered" };
      const atRisk = benefits.filter(b => b.status === "at-risk").length;
      const achieved = benefits.filter(b => b.status === "achieved").length;
      if (atRisk > 0) return { label: "At Risk", colour: "#C0392B", detail: `${benefits.length} benefits, ${atRisk} at risk` };
      if (achieved === benefits.length) return { label: "Achieved", colour: "#27AE60", detail: `All ${benefits.length} benefits achieved` };
      return { label: "Tracking", colour: "#D4A017", detail: `${benefits.length} benefits, ${achieved} achieved` };
    },
  },
  "adoption-scorecard": {
    name: "Adoption Scorecard",
    pillar: "Execution",
    href: "/tools/adoption-scorecard",
    getStatus: (data) => {
      const stages = data.stages as Record<string, { score: number }> | undefined;
      if (!stages) return { label: "Not Started", colour: "#9E9E9E", detail: "No stages scored" };
      const scores = Object.values(stages).map(s => s.score || 0).filter(s => s > 0);
      if (scores.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No stages scored" };
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { label: scores.length < 5 ? "In Progress" : "Scored", colour: avg >= 3.5 ? "#27AE60" : "#D4A017", detail: `${scores.length}/5 stages, avg ${avg.toFixed(1)}` };
    },
  },
  "culture-tracker": {
    name: "Culture Embedding Tracker",
    pillar: "Sustainment",
    href: "/tools/culture-tracker",
    getStatus: (data) => {
      const indicators = data.indicators as Record<string, { level: string }> | undefined;
      if (!indicators) return { label: "Not Started", colour: "#9E9E9E", detail: "No indicators assessed" };
      const levels = Object.values(indicators).map(i => i.level).filter(l => l && l !== "not-yet");
      if (levels.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No indicators assessed" };
      const embedded = levels.filter(l => l === "embedded").length;
      return { label: embedded === 5 ? "Embedded" : "Emerging", colour: embedded >= 3 ? "#27AE60" : "#D4A017", detail: `${levels.length}/5 indicators assessed, ${embedded} embedded` };
    },
  },
  "impact-matrix": {
    name: "Change Impact Matrix",
    pillar: "Engagement",
    href: "/tools/impact-matrix",
    getStatus: (data) => {
      const groups = data.groups as unknown[] | undefined;
      if (!groups || groups.length === 0) return { label: "Not Started", colour: "#9E9E9E", detail: "No groups assessed" };
      return { label: "Active", colour: "#27AE60", detail: `${groups.length} groups assessed` };
    },
  },
};

const PILLAR_ORDER = ["Direction", "Engagement", "Execution", "Sustainment"];

export default function DashboardPage() {
  const [tools, setTools] = useState<ToolRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("all");

  useEffect(() => {
    async function load() {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        if (!session.authenticated) {
          setLoading(false);
          return;
        }
        setAuthenticated(true);

        const [toolsRes, projectsRes] = await Promise.all([
          fetch("/api/tools"),
          fetch("/api/projects"),
        ]);
        const toolsData = await toolsRes.json();
        const projectsData = await projectsRes.json();

        setTools(toolsData.tools || []);
        setProjects(projectsData.projects || []);
      } catch {
        // Error loading
      }
      setLoading(false);
    }
    load();
  }, []);

  // Build tool cards from saved data + all available tools
  const toolCards = Object.entries(TOOL_META).map(([toolType, meta]) => {
    const saved = tools.find(t => t.tool_type === toolType);
    const projectName = saved ? (saved.data as Record<string, unknown>)?.projectName as string || saved.project_name || "" : "";
    const status = saved ? meta.getStatus(saved.data) : { label: "Not Started", colour: "#9E9E9E", detail: "Not yet used" };
    const updatedAt = saved?.updated_at;

    return {
      toolType,
      ...meta,
      projectName,
      status,
      updatedAt,
      hasData: !!saved,
    };
  });

  // Filter by project
  const filteredCards = selectedProject === "all"
    ? toolCards
    : toolCards.filter(c => c.projectName === selectedProject || !c.hasData);

  // Group by pillar
  const byPillar = PILLAR_ORDER.map(pillar => ({
    pillar,
    tools: filteredCards.filter(c => c.pillar === pillar),
  }));

  // Summary stats
  const started = filteredCards.filter(c => c.hasData).length;
  const total = filteredCards.length;

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{ padding: "120px 48px", textAlign: "center", fontFamily: "var(--ui)", color: "var(--text-mid)" }}>
          Loading your dashboard...
        </div>
        <Footer />
      </>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Nav />
        <div style={{ padding: "120px 48px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 500, color: "var(--navy)", marginBottom: 16 }}>
            Sign in to view your dashboard
          </h1>
          <p style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 24 }}>
            Your dashboard shows the status of all your change tools in one place. Sign in to get started.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />

      <div className="page-header">
        <span>Dashboard</span>
        <h1>Your Change Programme at a Glance</h1>
        <p>Track progress across all TCA tools. See what has been started, what needs attention, and where the gaps are.</p>
      </div>

      <section style={{ padding: "0 48px 32px", maxWidth: 1060, margin: "0 auto" }}>
        {/* Project filter + summary */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080" }}>
              Project:
            </label>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{
                fontFamily: "var(--ui)", fontSize: 13, padding: "8px 14px",
                border: "1px solid var(--border)", background: "transparent",
                color: "var(--text-dark)", outline: "none",
              }}
            >
              <option value="all">All Projects</option>
              {projects.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ textAlign: "center" as const }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--navy)", display: "block" }}>{started}</span>
              <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "#9A9080", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Tools Used</span>
            </div>
            <div style={{ textAlign: "center" as const }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--navy)", display: "block" }}>{total - started}</span>
              <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "#9A9080", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Not Started</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: "var(--border)", marginBottom: 48 }}>
          <div style={{ height: "100%", width: `${(started / total) * 100}%`, background: "var(--gold)", transition: "width 0.4s" }}></div>
        </div>

        {/* Tools by pillar */}
        {byPillar.map((group, gi) => (
          <ScrollReveal key={group.pillar} direction="up" delay={gi * 80}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: 16 }}>
                {group.pillar}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {group.tools.map(tool => (
                  <Link
                    key={tool.toolType}
                    href={tool.href}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 22px",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      borderLeft: `3px solid ${tool.status.colour}`,
                    }}
                    className="home-card"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 600, color: "var(--navy)", lineHeight: 1.25 }}>
                        {tool.name}
                      </span>
                      <span style={{
                        fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500,
                        letterSpacing: "0.06em", color: tool.status.colour,
                        padding: "3px 8px", border: `1px solid ${tool.status.colour}`,
                        whiteSpace: "nowrap", marginLeft: 8,
                      }}>
                        {tool.status.label}
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)", lineHeight: 1.5, marginBottom: 8 }}>
                      {tool.status.detail}
                    </span>
                    {tool.projectName && (
                      <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "#9A9080", marginBottom: 4 }}>
                        Project: {tool.projectName}
                      </span>
                    )}
                    {tool.updatedAt && (
                      <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "#9A9080" }}>
                        Last updated: {new Date(tool.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <Footer />
    </>
  );
}
