"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GaugeChart, DonutChart, BarMeter } from "@/components/DashboardCharts";

export default function DashboardPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(r => r.json())
      .then(session => {
        if (!session.authenticated) { setLoading(false); return; }
        setAuthenticated(true);
        return fetch("/api/tools").then(r => r.json());
      })
      .then(data => { if (data?.tools) setTools(data.tools); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><Nav /><div style={{ padding: 120, textAlign: "center", fontFamily: "var(--ui)", color: "var(--text-mid)" }}>Loading...</div><Footer /></>;

  function get(type: string): any { return tools.find((t: any) => t.tool_type === type)?.data || null; }
  function clr(v: number, m: number): string { const p = m > 0 ? v / m : 0; return p >= 0.8 ? "#27AE60" : p >= 0.5 ? "#D4A017" : p > 0 ? "#C0392B" : "#9E9E9E"; }

  const hdr: React.CSSProperties = { fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14, textAlign: "center", width: "100%" };
  const card: React.CSSProperties = { border: "1px solid var(--border)", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 8 };
  const lnk: React.CSSProperties = { fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 12 };

  /* ── READINESS ── */
  const rKeys = ["people", "process", "culture", "capability", "systems"];
  const rLabels = ["People", "Process", "Culture", "Capability", "Systems"];
  let rScores: number[], rAvg: number;
  if (authenticated) {
    const r = get("readiness-assessment");
    rScores = rKeys.map(d => r?.dimensions?.[d]?.score ?? 0);
    const nz = rScores.filter(v => v > 0);
    rAvg = nz.length > 0 ? nz.reduce((a, b) => a + b, 0) / nz.length : 0;
  } else {
    rScores = [3.8, 2.4, 3.2, 2.8, 4.1];
    rAvg = 3.3;
  }

  /* ── STAKEHOLDERS ── */
  let stakeSegs: { value: number; colour: string; label: string }[];
  if (authenticated) {
    const list: any[] = get("stakeholder-map")?.stakeholders || [];
    stakeSegs = [
      { value: list.filter(x => x.currentPosition === "champion" || x.currentPosition === "supporter").length, colour: "#27AE60", label: "Supportive" },
      { value: list.filter(x => x.currentPosition === "neutral").length, colour: "#9E9E9E", label: "Neutral" },
      { value: list.filter(x => x.currentPosition === "resistant" || x.currentPosition === "blocker").length, colour: "#C0392B", label: "Resistant" },
    ];
  } else {
    stakeSegs = [{ value: 3, colour: "#27AE60", label: "Supportive" }, { value: 2, colour: "#9E9E9E", label: "Neutral" }, { value: 2, colour: "#C0392B", label: "Resistant" }];
  }

  /* ── CHARTER ── */
  let cDone: number;
  if (authenticated) {
    cDone = Object.values(get("charter-builder")?.sections || {}).filter((v: any) => v && String(v).length > 10).length;
  } else {
    cDone = 4;
  }

  /* ── COMMS ── */
  let comC: number, comIP: number, comP: number;
  if (authenticated) {
    const e: any[] = get("communication-planner")?.entries || [];
    comC = e.filter(x => x.status === "complete").length;
    comIP = e.filter(x => x.status === "in-progress").length;
    comP = e.filter(x => x.status === "planned").length;
  } else {
    comC = 1; comIP = 1; comP = 2;
  }

  /* ── SPONSOR ── */
  const spNames = ["Direction", "Engagement", "Enablement", "Execution", "Sustainment"];
  const spKeys = ["direction", "engagement", "enablement", "execution", "sustainment"];
  let spStatus: string[], spDone: number, spTotal: number;
  if (authenticated) {
    const sp = get("sponsor-roadmap");
    const all: any[] = spKeys.flatMap(k => (sp?.phases?.[k]?.actions || []) as any[]);
    spTotal = Math.max(all.length, 1);
    spDone = all.filter(a => a.status === "complete").length;
    spStatus = spKeys.map(k => {
      const a: any[] = sp?.phases?.[k]?.actions || [];
      if (a.length === 0) return "not-started";
      if (a.every(x => x.status === "complete")) return "complete";
      if (a.some(x => x.status === "in-progress" || x.status === "complete")) return "in-progress";
      return "not-started";
    });
  } else {
    spDone = 1; spTotal = 5;
    spStatus = ["complete", "in-progress", "not-started", "not-started", "not-started"];
  }

  /* ── RESISTANCE ── */
  let resH: number, resM: number, resL: number;
  if (authenticated) {
    const sig: any[] = get("resistance-tracker")?.signals || [];
    resH = sig.filter(x => x.severity === "high").length;
    resM = sig.filter(x => x.severity === "medium").length;
    resL = sig.filter(x => x.severity === "low").length;
  } else {
    resH = 1; resM = 1; resL = 1;
  }

  /* ── BENEFITS ── */
  let benOT: number, benAR: number, benNS: number;
  if (authenticated) {
    const b: any[] = get("benefits-register")?.benefits || [];
    benOT = b.filter(x => x.status === "on-track").length;
    benAR = b.filter(x => x.status === "at-risk").length;
    benNS = b.filter(x => x.status === "not-started").length;
  } else {
    benOT = 1; benAR = 1; benNS = 1;
  }

  /* ── ADOPTION ── */
  const aLabels = ["Awareness", "Understanding", "Trial", "Adoption", "Proficiency"];
  const aKeys = ["awareness", "understanding", "trial", "adoption", "proficiency"];
  let aScores: number[];
  if (authenticated) {
    const a = get("adoption-scorecard");
    aScores = aKeys.map(s => a?.stages?.[s]?.score ?? 0);
  } else {
    aScores = [4.2, 3.5, 2.8, 1.6, 0];
  }

  /* ── CULTURE ── */
  const cuLabels = ["Language", "Behaviours", "Old Ways", "New Starters", "Leadership"];
  const cuKeys = ["language", "behaviours", "oldWays", "newStarters", "leadershipChange"];
  let cuScores: number[];
  if (authenticated) {
    const cu = get("culture-tracker");
    const lvl: Record<string, number> = { "not-yet": 0, emerging: 1, established: 2, embedded: 3 };
    cuScores = cuKeys.map(k => lvl[cu?.indicators?.[k]?.level] ?? 0);
  } else {
    cuScores = [1, 0, 0, 1, 0];
  }

  function phaseClr(s: string) { return s === "complete" ? "#27AE60" : s === "in-progress" ? "#D4A017" : "rgba(100,90,70,0.15)"; }
  function phaseTxt(s: string) { return s === "not-started" ? "var(--text-mid)" : "#fff"; }

  return (
    <>
      <Nav />
      <div className="page-header"><span>Dashboard</span><h1>Program Health</h1><p>Track your change program across all dimensions of the TCA model.</p></div>
      <div style={{ padding: "0 48px 64px", maxWidth: 1100, margin: "0 auto" }}>

        {!authenticated && (
          <div style={{ background: "var(--navy)", padding: "20px 40px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderRadius: 8 }}>
            <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "rgba(234,228,213,0.8)" }}>This is a preview with sample data. <strong style={{ color: "var(--cream)" }}>Sign in</strong> to track your own program.</p>
            <button onClick={() => window.dispatchEvent(new CustomEvent("tca-open-signin"))} style={{ background: "var(--gold)", border: "none", fontFamily: "var(--ui)", fontSize: 12, fontWeight: 500, color: "var(--navy)", padding: "8px 20px", cursor: "pointer", borderRadius: 6 }}>Sign In</button>
          </div>
        )}

        {/* ── READINESS — full width ── */}
        <div style={{ border: "1px solid var(--border)", padding: "28px 32px", marginBottom: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center", borderRadius: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart value={rAvg} max={5} label="Overall Readiness" colour={clr(rAvg, 5)} size={180} />
            <Link href="/tools/readiness-assessment" style={lnk}>Open Assessment &rarr;</Link>
          </div>
          <div>
            <span style={hdr}>Readiness by Dimension</span>
            {rLabels.map((d, i) => <BarMeter key={d} value={rScores[i]} max={5} label={d} colour={clr(rScores[i], 5)} />)}
          </div>
        </div>

        {/* ── ROW 2: Stakeholders · Charter · Comms ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div style={card}>
            <span style={hdr}>Stakeholder Map</span>
            <DonutChart segments={stakeSegs} label="Stakeholders" />
            <Link href="/tools/stakeholder-map" style={lnk}>Open Map &rarr;</Link>
          </div>
          <div style={card}>
            <span style={hdr}>Charter Builder</span>
            <GaugeChart value={cDone} max={7} label="Sections Complete" colour={clr(cDone, 7)} size={140} />
            <Link href="/tools/charter-builder" style={lnk}>Open Charter &rarr;</Link>
          </div>
          <div style={card}>
            <span style={hdr}>Communication Plan</span>
            <DonutChart segments={[
              { value: comC, colour: "#27AE60", label: "Complete" },
              { value: comIP, colour: "#D4A017", label: "In Progress" },
              { value: comP, colour: "#9E9E9E", label: "Planned" },
            ]} label="Communications" />
            <Link href="/tools/communication-planner" style={lnk}>Open Planner &rarr;</Link>
          </div>
        </div>

        {/* ── ROW 3: Sponsor · Resistance · Benefits ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div style={card}>
            <span style={hdr}>Sponsor Roadmap</span>
            <div style={{ width: "100%", marginTop: 4, marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 3, width: "100%" }}>
                {spNames.map((name, i) => (
                  <div key={name} style={{ flex: 1, background: phaseClr(spStatus[i]), padding: "14px 2px", textAlign: "center", borderRadius: i === 0 ? "4px 0 0 4px" : i === 4 ? "0 4px 4px 0" : "0" }}>
                    <span style={{ fontFamily: "var(--ui)", fontSize: 7, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: phaseTxt(spStatus[i]) }}>{name}</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 14 }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--navy)" }}>{spDone}</span>
                <span style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)" }}> of {spTotal} actions</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27AE60", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Complete</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4A017", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>In Progress</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(100,90,70,0.3)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Not Started</span>
              </div>
            </div>
            <Link href="/tools/sponsor-roadmap" style={lnk}>Open Roadmap &rarr;</Link>
          </div>
          <div style={card}>
            <span style={hdr}>Resistance Tracker</span>
            <DonutChart segments={[
              { value: resH, colour: "#C0392B", label: "High" },
              { value: resM, colour: "#D4A017", label: "Medium" },
              { value: resL, colour: "#27AE60", label: "Low" },
            ]} label="Signals" />
            <Link href="/tools/resistance-tracker" style={lnk}>Open Tracker &rarr;</Link>
          </div>
          <div style={card}>
            <span style={hdr}>Benefits Register</span>
            <DonutChart segments={[
              { value: benOT, colour: "#27AE60", label: "On Track" },
              { value: benAR, colour: "#D4A017", label: "At Risk" },
              { value: benNS, colour: "#9E9E9E", label: "Not Started" },
            ]} label="Benefits" />
            <Link href="/tools/benefits-register" style={lnk}>Open Register &rarr;</Link>
          </div>
        </div>

        {/* ── ROW 4: Adoption · Culture ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ border: "1px solid var(--border)", padding: "24px 20px", borderRadius: 8 }}>
            <span style={hdr}>Adoption Scorecard</span>
            {aLabels.map((s, i) => <BarMeter key={s} value={aScores[i]} max={5} label={s} colour={clr(aScores[i], 5)} />)}
            <div style={{ textAlign: "center", marginTop: 8 }}><Link href="/tools/adoption-scorecard" style={lnk}>Open Scorecard &rarr;</Link></div>
          </div>
          <div style={{ border: "1px solid var(--border)", padding: "24px 20px", borderRadius: 8 }}>
            <span style={hdr}>Culture Embedding</span>
            {cuLabels.map((l, i) => <BarMeter key={l} value={cuScores[i]} max={3} label={l} colour={clr(cuScores[i], 3)} />)}
            <div style={{ textAlign: "center", marginTop: 8 }}><Link href="/tools/culture-tracker" style={lnk}>Open Tracker &rarr;</Link></div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
