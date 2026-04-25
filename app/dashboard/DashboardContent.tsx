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

  function getData(type: string): any { return tools.find((t: any) => t.tool_type === type)?.data || null; }
  function score(data: any, ...path: string[]): number { let v = data; for (const k of path) { v = v?.[k]; } return typeof v === "number" ? v : 0; }
  function count(data: any, key: string): number { return Array.isArray(data?.[key]) ? data[key].length : 0; }
  function pct(v: number, m: number): string { return m > 0 ? Math.min((v / m) * 100, 100) + "%" : "0%"; }
  function clr(v: number, m: number): string { const p = v / m; return p >= 0.8 ? "#27AE60" : p >= 0.5 ? "#D4A017" : p > 0 ? "#C0392B" : "#9E9E9E"; }

  if (loading) return <><Nav /><div style={{ padding: 120, textAlign: "center", fontFamily: "var(--ui)", color: "var(--text-mid)" }}>Loading...</div><Footer /></>;

  if (!authenticated) return (
    <>
      <Nav />
      <div className="page-header"><span>Dashboard</span><h1>Program Health</h1><p>Track your change program across all dimensions of the TCA model.</p></div>
      <div style={{ padding: "0 48px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--navy)", padding: "20px 40px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "rgba(234,228,213,0.8)" }}>This is a preview with sample data. <strong style={{ color: "var(--cream)" }}>Sign in</strong> to track your own program.</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("tca-open-signin"))} style={{ background: "var(--gold)", border: "none", fontFamily: "var(--ui)", fontSize: 12, fontWeight: 500, color: "var(--navy)", padding: "8px 20px", cursor: "pointer" }}>Sign In</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart value={3.3} max={5} label="Overall Readiness" colour="#D4A017" size={180} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <DonutChart segments={[{ value: 4, colour: "#27AE60", label: "Supportive" }, { value: 3, colour: "#9E9E9E", label: "Neutral" }, { value: 3, colour: "#C0392B", label: "Resistant" }]} label="Stakeholders" />
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <GaugeChart value={4} max={7} label="Charter" colour="#D4A017" size={130} />
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <GaugeChart value={2} max={9} label="Sponsor" colour="#C0392B" size={130} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid #27AE60", padding: "16px 18px" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Communications</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>7</span>
          </div>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid #D4A017", padding: "16px 18px" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Resistance Signals</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>4</span>
          </div>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid #27AE60", padding: "16px 18px" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Benefits</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>4</span>
          </div>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid #9E9E9E", padding: "16px 18px" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Impact Groups</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>3</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Readiness by Dimension</span>
            <BarMeter value={3.8} max={5} label="People" colour="#D4A017" />
            <BarMeter value={2.4} max={5} label="Process" colour="#C0392B" />
            <BarMeter value={3.2} max={5} label="Culture" colour="#D4A017" />
            <BarMeter value={2.8} max={5} label="Capability" colour="#D4A017" />
            <BarMeter value={4.1} max={5} label="Systems" colour="#27AE60" />
          </div>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Adoption Curve</span>
            <BarMeter value={4.2} max={5} label="Awareness" colour="#27AE60" />
            <BarMeter value={3.5} max={5} label="Understanding" colour="#D4A017" />
            <BarMeter value={2.8} max={5} label="Trial" colour="#D4A017" />
            <BarMeter value={1.6} max={5} label="Adoption" colour="#C0392B" />
            <BarMeter value={0} max={5} label="Proficiency" colour="#9E9E9E" />
          </div>
        </div>

        <div style={{ border: "1px solid var(--border)", padding: 20 }}>
          <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Culture Embedding</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            <div style={{ textAlign: "center" }}><span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "#D4A017", display: "block" }}>1/3</span><span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Language</span></div>
            <div style={{ textAlign: "center" }}><span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "#C0392B", display: "block" }}>0/3</span><span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Behaviours</span></div>
            <div style={{ textAlign: "center" }}><span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "#C0392B", display: "block" }}>0/3</span><span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Old Ways</span></div>
            <div style={{ textAlign: "center" }}><span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "#D4A017", display: "block" }}>1/3</span><span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>New Starters</span></div>
            <div style={{ textAlign: "center" }}><span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "#C0392B", display: "block" }}>0/3</span><span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>Leadership</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  // Real data
  const r = getData("readiness-assessment");
  const dims = ["people","process","culture","capability","systems"];
  const rScores = dims.map(d => score(r, "dimensions", d, "score"));
  const rAvg = rScores.filter(v => v > 0).length > 0 ? rScores.reduce((a,b) => a+b, 0) / rScores.filter(v => v > 0).length : 0;

  const sData = getData("stakeholder-map");
  const sCount = count(sData, "stakeholders");

  const cData = getData("charter-builder");
  const cSections = cData?.sections || {};
  const cDone = Object.values(cSections).filter((v: any) => v && String(v).length > 10).length;

  const comData = getData("communication-planner");
  const comCount = count(comData, "entries");

  const spData = getData("sponsor-roadmap");
  const spActions = Object.values(spData?.phases || {}).flatMap((p: any) => p?.actions || []);
  const spDone = spActions.filter((a: any) => a.status === "complete").length;

  const resData = getData("resistance-tracker");
  const resCount = count(resData, "signals");

  const bData = getData("benefits-register");
  const bCount = count(bData, "benefits");

  const aData = getData("adoption-scorecard");
  const aStages = ["awareness","understanding","trial","adoption","proficiency"];
  const aScores = aStages.map(s => score(aData, "stages", s, "score"));

  const cuData = getData("culture-tracker");
  const cuKeys = ["language","behaviours","oldWays","newStarters","leadershipChange"];
  const lvl: any = { "not-yet": 0, emerging: 1, established: 2, embedded: 3 };
  const cuScores = cuKeys.map(k => lvl[cuData?.indicators?.[k]?.level] ?? 0);

  return (
    <>
      <Nav />
      <div className="page-header"><span>Dashboard</span><h1>Program Health</h1><p>Track your change program across all dimensions of the TCA model.</p></div>
      <section style={{ padding: "0 48px 48px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Row 1: Gauges */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart value={rAvg} max={5} label="Overall Readiness" colour={clr(rAvg, 5)} size={180} />
            <Link href="/tools/readiness-assessment" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 10 }}>Open Assessment &rarr;</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <DonutChart segments={[
                { value: (sData?.stakeholders as any[] || []).filter((s: any) => s.currentPosition === "champion" || s.currentPosition === "supporter").length, colour: "#27AE60", label: "Supportive" },
                { value: (sData?.stakeholders as any[] || []).filter((s: any) => s.currentPosition === "neutral").length, colour: "#9E9E9E", label: "Neutral" },
                { value: (sData?.stakeholders as any[] || []).filter((s: any) => s.currentPosition === "resistant" || s.currentPosition === "blocker").length, colour: "#C0392B", label: "Resistant" },
              ]} label="Stakeholders" />
              <Link href="/tools/stakeholder-map" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 6, display: "inline-block" }}>Open Map &rarr;</Link>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <GaugeChart value={cDone} max={7} label="Charter" colour={clr(cDone, 7)} size={130} />
              <Link href="/tools/charter-builder" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 6, display: "inline-block" }}>Open Charter &rarr;</Link>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "20px", textAlign: "center" }}>
              <GaugeChart value={spDone} max={Math.max(spActions.length, 1)} label="Sponsor" colour={clr(spDone, Math.max(spActions.length, 1))} size={130} />
              <Link href="/tools/sponsor-roadmap" style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--gold)", textDecoration: "none", marginTop: 6, display: "inline-block" }}>Open Roadmap &rarr;</Link>
            </div>
          </div>
        </div>

        {/* Row 2: Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36 }}>
          <Link href="/tools/communication-planner" style={{ border: "1px solid var(--border)", borderLeft: "3px solid " + (comCount > 0 ? "#27AE60" : "#9E9E9E"), padding: "16px 18px", textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Communications</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>{comCount}</span>
          </Link>
          <Link href="/tools/resistance-tracker" style={{ border: "1px solid var(--border)", borderLeft: "3px solid " + (resCount > 0 ? "#D4A017" : "#9E9E9E"), padding: "16px 18px", textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Resistance Signals</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>{resCount}</span>
          </Link>
          <Link href="/tools/benefits-register" style={{ border: "1px solid var(--border)", borderLeft: "3px solid " + (bCount > 0 ? "#27AE60" : "#9E9E9E"), padding: "16px 18px", textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Benefits</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>{bCount}</span>
          </Link>
          <Link href="/tools/impact-matrix" style={{ border: "1px solid var(--border)", borderLeft: "3px solid #9E9E9E", padding: "16px 18px", textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Impact Groups</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>{count(getData("impact-matrix"), "groups")}</span>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Readiness by Dimension</span>
            {dims.map((d, i) => (
              <BarMeter key={d} value={rScores[i]} max={5} label={d} colour={clr(rScores[i], 5)} />
            ))}
            {rScores.every(s => s === 0) && <p style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)" }}>No data. <Link href="/tools/readiness-assessment" style={{ color: "var(--gold)" }}>Start</Link></p>}
          </div>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Adoption Curve</span>
            {aStages.map((s, i) => (
              <BarMeter key={s} value={aScores[i]} max={5} label={s} colour={clr(aScores[i], 5)} />
            ))}
            {aScores.every(s => s === 0) && <p style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)" }}>No data. <Link href="/tools/adoption-scorecard" style={{ color: "var(--gold)" }}>Start</Link></p>}
          </div>
        </div>

        <div style={{ border: "1px solid var(--border)", padding: 20 }}>
          <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Culture Embedding</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {cuKeys.map((k, i) => (
              <div key={k} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: clr(cuScores[i], 3), display: "block" }}>{cuScores[i]}/3</span>
                <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)", textTransform: "capitalize" as const }}>{k}</span>
              </div>
            ))}
          </div>
          {cuScores.every(s => s === 0) && <p style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)", marginTop: 8 }}>No data. <Link href="/tools/culture-tracker" style={{ color: "var(--gold)" }}>Start</Link></p>}
        </div>

      </section>
      <Footer />
    </>
  );
}
