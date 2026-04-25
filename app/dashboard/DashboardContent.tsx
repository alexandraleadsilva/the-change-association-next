"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GaugeChart, DonutChart, BarMeter, getColour } from "@/components/DashboardCharts";
import { getDemoTools } from "@/data/demo-tools";

interface ToolRecord {
  tool_type: string;
  project_name: string;
  data: Record<string, unknown>;
  updated_at: string;
}

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
        if (!session.authenticated) { setLoading(false); return; }
        setAuthenticated(true);

        const [toolsRes, projectsRes] = await Promise.all([fetch("/api/tools"), fetch("/api/projects")]);
        const toolsData = await toolsRes.json();
        const projectsData = await projectsRes.json();
        setTools(toolsData.tools || []);
        setProjects(projectsData.projects || []);
      } catch { /* */ }
      setLoading(false);
    }
    load();
  }, []);

  // Extract data helpers
  function getTool(type: string): Record<string, unknown> | null {
    const t = displayTools.find(t => t.tool_type === type);
    return t ? t.data : null;
  }

  // Readiness data
  const readiness = getTool("readiness-assessment");
  const readinessDims = readiness?.dimensions as Record<string, { score: number }> | undefined;
  const readinessScores = readinessDims ? Object.entries(readinessDims).map(([key, d]) => ({ key, score: d.score || 0 })) : [];
  const readinessAvg = readinessScores.length > 0 ? readinessScores.reduce((a, s) => a + s.score, 0) / readinessScores.length : 0;

  // Stakeholder data
  const stakeholderData = getTool("stakeholder-map");
  const stakeholders = (stakeholderData?.stakeholders || []) as { currentPosition: string }[];
  const stakeSegments = [
    { value: stakeholders.filter(s => s.currentPosition === "champion").length, colour: "#1B7A3D", label: "Champion" },
    { value: stakeholders.filter(s => s.currentPosition === "supporter").length, colour: "#27AE60", label: "Supporter" },
    { value: stakeholders.filter(s => s.currentPosition === "neutral").length, colour: "#9E9E9E", label: "Neutral" },
    { value: stakeholders.filter(s => s.currentPosition === "resistant").length, colour: "#D4A017", label: "Resistant" },
    { value: stakeholders.filter(s => s.currentPosition === "blocker").length, colour: "#C0392B", label: "Blocker" },
  ];

  // Charter data
  const charter = getTool("charter-builder");
  const charterSections = charter?.sections as Record<string, string> | undefined;
  const charterFilled = charterSections ? Object.values(charterSections).filter(v => v && v.length > 10).length : 0;

  // Sponsor data
  const sponsor = getTool("sponsor-roadmap");
  const sponsorPhases = sponsor?.phases as Record<string, { actions: { status: string }[] }> | undefined;
  const sponsorActions = sponsorPhases ? Object.values(sponsorPhases).flatMap(p => p.actions || []) : [];
  const sponsorComplete = sponsorActions.filter(a => a.status === "complete").length;

  // Communication data
  const commData = getTool("communication-planner");
  const comms = (commData?.entries || []) as { status: string }[];
  const commSegments = [
    { value: comms.filter(c => c.status === "complete").length, colour: "#27AE60", label: "Complete" },
    { value: comms.filter(c => c.status === "in-progress").length, colour: "#D4A017", label: "In Progress" },
    { value: comms.filter(c => c.status === "planned").length, colour: "#9E9E9E", label: "Planned" },
  ];

  // Resistance data
  const resistData = getTool("resistance-tracker");
  const signals = (resistData?.signals || []) as { severity: string; status: string }[];
  const highSignals = signals.filter(s => s.severity === "high").length;
  const unresolvedSignals = signals.filter(s => s.status !== "resolved").length;

  // Benefits data
  const benefitsData = getTool("benefits-register");
  const benefits = (benefitsData?.benefits || []) as { status: string }[];
  const benefitSegments = [
    { value: benefits.filter(b => b.status === "achieved").length, colour: "#1B7A3D", label: "Achieved" },
    { value: benefits.filter(b => b.status === "on-track").length, colour: "#27AE60", label: "On Track" },
    { value: benefits.filter(b => b.status === "at-risk").length, colour: "#C0392B", label: "At Risk" },
    { value: benefits.filter(b => b.status === "not-started").length, colour: "#9E9E9E", label: "Not Started" },
  ];

  // Adoption data
  const adoptionData = getTool("adoption-scorecard");
  const adoptionStages = adoptionData?.stages as Record<string, { score: number }> | undefined;
  const adoptionScores = adoptionStages ? Object.entries(adoptionStages).map(([key, s]) => ({ key, score: s.score || 0 })) : [];
  const adoptionAvg = adoptionScores.length > 0 ? adoptionScores.filter(s => s.score > 0).reduce((a, s) => a + s.score, 0) / Math.max(adoptionScores.filter(s => s.score > 0).length, 1) : 0;

  // Culture data
  const cultureData = getTool("culture-tracker");
  const cultureIndicators = cultureData?.indicators as Record<string, { level: string }> | undefined;
  const cultureScoreMap: Record<string, number> = { "not-yet": 0, "emerging": 1, "established": 2, "embedded": 3 };
  const cultureScores = cultureIndicators ? Object.values(cultureIndicators).map(i => cultureScoreMap[i.level] ?? 0) : [];
  const cultureAvg = cultureScores.length > 0 ? cultureScores.reduce((a, b) => a + b, 0) / cultureScores.length : 0;

  const dimLabels: Record<string, string> = { people: "People", process: "Process", culture: "Culture", capability: "Capability", systems: "Systems" };
  const adoptionLabels: Record<string, string> = { awareness: "Awareness", understanding: "Understanding", trial: "Trial", adoption: "Adoption", proficiency: "Proficiency" };
  const cultureLabels: Record<string, string> = { language: "Language", behaviours: "Behaviours", oldWays: "Old Ways", newStarters: "New Starters", leadershipChange: "Leadership" };

  if (loading) {
    return (<><Nav /><div style={{ padding: "120px 48px", textAlign: "center", fontFamily: "var(--ui)", color: "var(--text-mid)" }}>Loading your dashboard...</div><Footer /></>);
  }

  // Use dummy data for non-authenticated users
  const isDemo = !authenticated;

  const displayTools = isDemo ? getDemoTools() as ToolRecord[] : tools;

  return (
    <>
      <Nav />

      <div className="page-header">
        <span>Dashboard</span>
        <h1>Program Health</h1>
        <p>A visual overview of your change program across all dimensions of the TCA model.</p>
      </div>

      {isDemo && (
        <div style={{
          background: "var(--navy)",
          padding: "16px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "rgba(234,228,213,0.8)" }}>
            This is a preview with sample data. <strong style={{ color: "var(--cream)" }}>Sign in</strong> to see your own program health dashboard.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("tca-open-signin"))}
            style={{
              background: "var(--gold)",
              border: "none",
              fontFamily: "var(--ui)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "var(--navy)",
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>
      )}

      <section style={{ padding: "0 48px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <label style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080" }}>Project:</label>
          <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ fontFamily: "var(--ui)", fontSize: 13, padding: "8px 14px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-dark)", outline: "none" }}>
            <option value="all">All Projects</option>
            {projects.map(p => (<option key={p} value={p}>{p}</option>))}
          </select>
        </div>
      </section>

      {/* ROW 1: Readiness Gauge + Readiness Breakdown */}
      <section style={{ padding: "0 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart value={readinessAvg} max={5} label="Overall Readiness" colour={getColour(readinessAvg, 5)} size={180} />
            <Link href="/tools/readiness-assessment" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 12 }}>Open Assessment &rarr;</Link>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "32px 28px" }}>
            <h3 style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9A9080", marginBottom: 20 }}>Readiness by Dimension</h3>
            {readinessScores.length > 0 ? readinessScores.map(s => (
              <BarMeter key={s.key} value={s.score} max={5} label={dimLabels[s.key] || s.key} colour={getColour(s.score, 5)} />
            )) : (
              <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)" }}>No readiness data yet. <Link href="/tools/readiness-assessment" style={{ color: "var(--gold)" }}>Start assessment</Link></p>
            )}
          </div>
        </div>
      </section>

      {/* ROW 2: Stakeholders + Comms + Charter */}
      <section style={{ padding: "0 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
            <DonutChart segments={stakeSegments} label="Stakeholders" />
            <Link href="/tools/stakeholder-map" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Open Map &rarr;</Link>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
            <DonutChart segments={commSegments} label="Communications" />
            <Link href="/tools/communication-planner" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Open Planner &rarr;</Link>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <GaugeChart value={charterFilled} max={7} label="Charter Progress" colour={getColour(charterFilled, 7)} size={140} />
            <span style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)", marginTop: 4 }}>{charterFilled}/7 sections</span>
            <Link href="/tools/charter-builder" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 8 }}>Open Charter &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ROW 3: Sponsor + Resistance + Benefits */}
      <section style={{ padding: "0 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart value={sponsorComplete} max={Math.max(sponsorActions.length, 1)} label="Sponsor Actions" colour={getColour(sponsorComplete, Math.max(sponsorActions.length, 1))} size={140} />
            <span style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)", marginTop: 4 }}>{sponsorComplete}/{sponsorActions.length} complete</span>
            <Link href="/tools/sponsor-roadmap" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 8 }}>Open Roadmap &rarr;</Link>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 48, fontWeight: 600, color: highSignals > 0 ? "#C0392B" : unresolvedSignals > 0 ? "#D4A017" : "#27AE60" }}>{signals.length}</span>
              <p style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--navy)", marginTop: 4 }}>Resistance Signals</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--ui)", fontSize: 12 }}><span style={{ color: "#C0392B", fontWeight: 600 }}>{highSignals}</span> high</span>
              <span style={{ fontFamily: "var(--ui)", fontSize: 12 }}><span style={{ color: "#D4A017", fontWeight: 600 }}>{unresolvedSignals}</span> unresolved</span>
            </div>
            <Link href="/tools/resistance-tracker" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none" }}>Open Tracker &rarr;</Link>
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
            <DonutChart segments={benefitSegments} label="Benefits" />
            <Link href="/tools/benefits-register" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Open Register &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ROW 4: Adoption + Culture */}
      <section style={{ padding: "0 48px 56px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px" }}>
            <h3 style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9A9080", marginBottom: 20 }}>Adoption Curve</h3>
            {adoptionScores.length > 0 ? adoptionScores.map(s => (
              <BarMeter key={s.key} value={s.score} max={5} label={adoptionLabels[s.key] || s.key} colour={getColour(s.score, 5)} />
            )) : (
              <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)" }}>No adoption data. <Link href="/tools/adoption-scorecard" style={{ color: "var(--gold)" }}>Start scorecard</Link></p>
            )}
          </div>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", padding: "28px" }}>
            <h3 style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9A9080", marginBottom: 20 }}>Culture Embedding</h3>
            {cultureScores.length > 0 ? Object.entries(cultureIndicators || {}).map(([key, ind]) => (
              <BarMeter key={key} value={cultureScoreMap[ind.level] ?? 0} max={3} label={cultureLabels[key] || key} colour={getColour(cultureScoreMap[ind.level] ?? 0, 3)} />
            )) : (
              <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)" }}>No culture data. <Link href="/tools/culture-tracker" style={{ color: "var(--gold)" }}>Start tracker</Link></p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
