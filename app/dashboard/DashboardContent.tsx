"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
      <div style={{ padding: "0 48px 64px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ background: "var(--navy)", padding: "32px 40px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--cream)", marginBottom: 6 }}>See your program health at a glance</p>
            <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "rgba(234,228,213,0.6)", lineHeight: 1.5 }}>Sign in to track readiness, stakeholders, sponsorship, adoption, and more.</p>
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent("tca-open-signin"))} style={{ background: "var(--gold)", border: "none", fontFamily: "var(--ui)", fontSize: 12, fontWeight: 500, color: "var(--navy)", padding: "10px 24px", cursor: "pointer" }}>Sign In</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {["Readiness", "Stakeholders", "Charter", "Communications", "Sponsor", "Resistance", "Benefits", "Adoption", "Culture"].map(n => (
            <div key={n} style={{ border: "1px solid var(--border)", padding: "28px 16px", textAlign: "center", opacity: 0.35 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(100,90,70,0.1)", margin: "0 auto 10px" }} />
              <span style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--navy)" }}>{n}</span>
            </div>
          ))}
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 36 }}>
          {[
            { label: "Readiness", val: rAvg > 0 ? rAvg.toFixed(1)+"/5" : "N/A", c: clr(rAvg, 5), href: "/tools/readiness-assessment" },
            { label: "Stakeholders", val: String(sCount), c: sCount > 0 ? "#27AE60" : "#9E9E9E", href: "/tools/stakeholder-map" },
            { label: "Charter", val: cDone+"/7", c: clr(cDone, 7), href: "/tools/charter-builder" },
            { label: "Comms", val: String(comCount), c: comCount > 0 ? "#27AE60" : "#9E9E9E", href: "/tools/communication-planner" },
            { label: "Sponsor", val: spActions.length > 0 ? spDone+"/"+spActions.length : "N/A", c: clr(spDone, Math.max(spActions.length,1)), href: "/tools/sponsor-roadmap" },
            { label: "Resistance", val: String(resCount), c: resCount > 0 ? "#D4A017" : "#9E9E9E", href: "/tools/resistance-tracker" },
            { label: "Benefits", val: String(bCount), c: bCount > 0 ? "#27AE60" : "#9E9E9E", href: "/tools/benefits-register" },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{ borderLeft: "3px solid "+item.c, border: "1px solid var(--border)", borderLeftWidth: 3, borderLeftColor: item.c, padding: "16px 18px", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>{item.label}</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 600, color: "var(--navy)" }}>{item.val}</span>
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Readiness by Dimension</span>
            {dims.map((d, i) => (
              <div key={d} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--text-dark)", textTransform: "capitalize" as const }}>{d}</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, color: clr(rScores[i], 5) }}>{rScores[i] > 0 ? rScores[i].toFixed(1) : "0"}</span>
                </div>
                <div style={{ height: 5, background: "rgba(100,90,70,0.1)", borderRadius: 3 }}><div style={{ height: "100%", width: pct(rScores[i], 5), background: clr(rScores[i], 5), borderRadius: 3 }} /></div>
              </div>
            ))}
            {rScores.every(s => s === 0) && <p style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)" }}>No data. <Link href="/tools/readiness-assessment" style={{ color: "var(--gold)" }}>Start</Link></p>}
          </div>
          <div style={{ border: "1px solid var(--border)", padding: 20 }}>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 14 }}>Adoption Curve</span>
            {aStages.map((s, i) => (
              <div key={s} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 11, color: "var(--text-dark)", textTransform: "capitalize" as const }}>{s}</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, color: clr(aScores[i], 5) }}>{aScores[i] > 0 ? aScores[i].toFixed(1) : "0"}</span>
                </div>
                <div style={{ height: 5, background: "rgba(100,90,70,0.1)", borderRadius: 3 }}><div style={{ height: "100%", width: pct(aScores[i], 5), background: clr(aScores[i], 5), borderRadius: 3 }} /></div>
              </div>
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
