"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { ProjectSelector } from "@/components/ProjectSelector";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  ring: "decision-maker" | "influencer" | "impacted" | "peripheral";
  currentPosition: "champion" | "supporter" | "neutral" | "resistant" | "blocker";
  targetPosition: "champion" | "supporter" | "neutral";
  influence: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  engagementAction: string;
  notes: string;
}

interface StakeholderMap {
  projectName: string;
  createdBy: string;
  createdDate: string;
  stakeholders: Stakeholder[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const RING_LABELS: Record<Stakeholder["ring"], string> = {
  "decision-maker": "Decision Maker",
  influencer: "Influencer",
  impacted: "Impacted",
  peripheral: "Peripheral",
};

const POSITION_LABELS: Record<Stakeholder["currentPosition"], string> = {
  champion: "Champion",
  supporter: "Supporter",
  neutral: "Neutral",
  resistant: "Resistant",
  blocker: "Blocker",
};

const TARGET_LABELS: Record<Stakeholder["targetPosition"], string> = {
  champion: "Champion",
  supporter: "Supporter",
  neutral: "Neutral",
};

const INFLUENCE_LABELS: Record<Stakeholder["influence"], string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const POSITION_COLOURS: Record<Stakeholder["currentPosition"], string> = {
  champion: "#2E7D32",
  supporter: "#66BB6A",
  neutral: "#9E9E9E",
  resistant: "#F9A825",
  blocker: "#C62828",
};

const POSITION_BG: Record<Stakeholder["currentPosition"], string> = {
  champion: "rgba(46,125,50,0.10)",
  supporter: "rgba(102,187,106,0.10)",
  neutral: "rgba(158,158,158,0.08)",
  resistant: "rgba(249,168,37,0.10)",
  blocker: "rgba(198,40,40,0.08)",
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  Empty form state                                                   */
/* ------------------------------------------------------------------ */

const EMPTY_FORM: Omit<Stakeholder, "id"> = {
  name: "",
  role: "",
  ring: "impacted",
  currentPosition: "neutral",
  targetPosition: "supporter",
  influence: "medium",
  impact: "medium",
  engagementAction: "",
  notes: "",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StakeholderMapPage() {
  /* --- project-level state --- */
  const [projectName, setProjectName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  /* --- stakeholders --- */
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);

  /* --- form state --- */
  const [form, setForm] = useState<Omit<Stakeholder, "id">>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mapFilter, setMapFilter] = useState<"all" | Stakeholder["ring"]>("all");

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<StakeholderMap>({
    toolType: "stakeholder-map",
    defaultData: { projectName: "", createdBy: "", createdDate: "", stakeholders: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setProjectName(savedData.projectName || "");
      setCreatedBy(savedData.createdBy || "");
      setStakeholders(savedData.stakeholders || []);
      hasLoaded.current = true;
    }
  }, [loaded, savedData]);

  // Auto-save when data changes
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!hasLoaded.current && !isAuthenticated) return;
    saveToDb({ projectName, createdBy, createdDate: new Date().toISOString().slice(0, 10), stakeholders });
  }, [projectName, createdBy, stakeholders]);

  /* --- helpers --- */
  const updateField = <K extends keyof Omit<Stakeholder, "id">>(
    key: K,
    value: Omit<Stakeholder, "id">[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const addStakeholder = () => {
    if (!form.name.trim()) {
      setFormError("Please enter a stakeholder name.");
      return;
    }
    if (!form.role.trim()) {
      setFormError("Please enter a role or group.");
      return;
    }
    setFormError("");
    if (editingId) {
      setStakeholders((prev) =>
        prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s))
      );
      setEditingId(null);
    } else {
      setStakeholders((prev) => [...prev, { ...form, id: generateId() }]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const editStakeholder = (id: string) => {
    const s = stakeholders.find((s) => s.id === id);
    if (!s) return;
    const { id: _id, ...rest } = s;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const removeStakeholder = (id: string) =>
    setStakeholders((prev) => prev.filter((s) => s.id !== id));

  /* --- derived summary data --- */
  const countByRing = (ring: Stakeholder["ring"]) =>
    stakeholders.filter((s) => s.ring === ring).length;

  const countByPosition = (pos: Stakeholder["currentPosition"]) =>
    stakeholders.filter((s) => s.currentPosition === pos).length;

  const movementNeeded = stakeholders.filter(
    (s) => s.currentPosition !== s.targetPosition
  ).length;

  /* --- serialisable snapshot (for future DB) --- */
  const _mapSnapshot: StakeholderMap = {
    projectName,
    createdBy,
    createdDate: new Date().toISOString().slice(0, 10),
    stakeholders,
  };
  // _mapSnapshot available for future persistence

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      <Nav />

      {/* ---------- HEADER ---------- */}
      <header className="page-header">
        <ScrollReveal>
          <span>TCA TOOL</span>
          <h1>Stakeholder Map Builder</h1>
          <p>
            Identify your key stakeholders, map their current and target
            positions, and plan engagement actions that move people toward
            support for your change initiative.
          </p>
          <Link
            href="/tools"
            style={{
              display: "inline-block",
              marginTop: 20,
              fontFamily: "var(--ui)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            &larr; Back to Tools
          </Link>
        </ScrollReveal>
      </header>

      {/* ---------- MAIN ---------- */}
      <main
        style={{
          padding: "48px 48px 64px",
          maxWidth: 1060,
          marginInline: "auto",
        }}
      >
        {/* ---- Project Info ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 26,
                fontWeight: 400,
                color: "var(--navy)",
                marginBottom: 20,
              }}
            >
              Project Information
            </h2>
            <div className="form-row">
              <ProjectSelector value={projectName} onChange={setProjectName} isAuthenticated={isAuthenticated} />
              <div className="form-group">
                <label htmlFor="createdBy">Created By</label>
                <input
                  id="createdBy"
                  type="text"
                  placeholder="Your name"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>


        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Quadrant Map ---- */}
        <hr className="section-divider" style={{ marginBottom: 48 }} />

            <ScrollReveal>
              <section style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
                  <h2
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 28,
                      fontWeight: 500,
                      color: "var(--navy)",
                    }}
                  >
                    Stakeholder Map
                  </h2>
                  <button className="btn" onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true); }}>
                    + Add Stakeholder
                  </button>
                </div>
                <p style={{ fontFamily: "var(--ui)", fontSize: 13, color: "var(--text-mid)", marginBottom: 16 }}>
                  Impact (vertical) vs Influence (horizontal). Colour indicates current support level. Click any dot to edit.
                </p>

                {/* Filter tabs */}
                <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid var(--border)" }}>
                  {([{ label: "All", value: "all" as const }, ...Object.entries(RING_LABELS).map(([value, label]) => ({ label, value: value as Stakeholder["ring"] }))]).map(tab => (
                    <button
                      key={tab.value}
                      onClick={() => setMapFilter(tab.value)}
                      style={{
                        fontFamily: "var(--ui)", fontSize: 11, fontWeight: mapFilter === tab.value ? 500 : 400,
                        letterSpacing: "0.08em", textTransform: "uppercase" as const,
                        color: mapFilter === tab.value ? "var(--navy)" : "var(--text-mid)",
                        padding: "8px 16px 10px", cursor: "pointer",
                        background: "none", border: "none", borderBottom: mapFilter === tab.value ? "2px solid var(--navy)" : "2px solid transparent",
                        marginBottom: -1, transition: "all 0.2s",
                      }}
                    >{tab.label}</button>
                  ))}
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  {(Object.keys(POSITION_COLOURS) as Stakeholder["currentPosition"][]).map(pos => (
                    <div key={pos} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: POSITION_COLOURS[pos], display: "inline-block" }}></span>
                      <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>{POSITION_LABELS[pos]}</span>
                    </div>
                  ))}
                </div>

                {/* Quadrant Grid */}
                <div style={{ position: "relative", width: "100%", maxWidth: 560, aspectRatio: "1", border: "1px solid var(--border)", background: "var(--cream)", margin: "0 auto" }}>
                  {/* Axis labels */}
                  <span style={{ position: "absolute", left: -28, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontFamily: "var(--ui)", fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080", whiteSpace: "nowrap" }}>Impact</span>
                  <span style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--ui)", fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080" }}>Influence</span>

                  {/* Quadrant lines */}
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--border)" }}></div>
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "var(--border)" }}></div>

                  {/* Quadrant labels - short, positioned in corners */}
                  <span style={{ position: "absolute", top: 10, left: 10, fontFamily: "var(--ui)", fontSize: 9, color: "rgba(154,144,128,0.6)", lineHeight: "1.3" }}>Keep Satisfied</span>
                  <span style={{ position: "absolute", top: 10, right: 10, fontFamily: "var(--ui)", fontSize: 9, color: "rgba(154,144,128,0.6)", textAlign: "right" as const, lineHeight: "1.3" }}>Manage Closely</span>
                  <span style={{ position: "absolute", bottom: 10, left: 10, fontFamily: "var(--ui)", fontSize: 9, color: "rgba(154,144,128,0.6)", lineHeight: "1.3" }}>Monitor</span>
                  <span style={{ position: "absolute", bottom: 10, right: 10, fontFamily: "var(--ui)", fontSize: 9, color: "rgba(154,144,128,0.6)", textAlign: "right" as const, lineHeight: "1.3" }}>Keep Informed</span>

                  {/* Axis end labels */}
                  <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--ui)", fontSize: 8, color: "#9A9080" }}>HIGH</span>
                  <span style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--ui)", fontSize: 8, color: "#9A9080" }}>LOW</span>
                  <span style={{ position: "absolute", left: 4, top: "50%", transform: "translateY(8px)", fontFamily: "var(--ui)", fontSize: 8, color: "#9A9080" }}>LOW</span>
                  <span style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(8px)", fontFamily: "var(--ui)", fontSize: 8, color: "#9A9080" }}>HIGH</span>

                  {/* Empty state */}
                  {stakeholders.filter(s => mapFilter === "all" || s.ring === mapFilter).length === 0 && (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" as const, zIndex: 3 }}>
                      <p style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--text-mid)", marginBottom: 8 }}>
                        {stakeholders.length === 0 ? "No stakeholders yet" : "No stakeholders in this filter"}
                      </p>
                      {stakeholders.length === 0 && (
                        <p style={{ fontFamily: "var(--ui)", fontSize: 12, color: "#9A9080" }}>
                          Add stakeholders to see them plotted here
                        </p>
                      )}
                    </div>
                  )}

                  {/* Stakeholder dots - filtered */}
                  {stakeholders.filter(s => mapFilter === "all" || s.ring === mapFilter).map((s, i) => {
                    const xBase = s.influence === "high" ? 75 : s.influence === "medium" ? 50 : 25;
                    const yBase = s.impact === "high" ? 25 : s.impact === "medium" ? 50 : 75;
                    // Jitter to prevent overlap
                    const jitter = (i * 7) % 15 - 7;
                    const x = Math.min(95, Math.max(5, xBase + jitter));
                    const y = Math.min(95, Math.max(5, yBase + (jitter * 0.5)));
                    return (
                      <div
                        key={s.id}
                        title={`${s.name} (${POSITION_LABELS[s.currentPosition]})`}
                        style={{
                          position: "absolute",
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: POSITION_COLOURS[s.currentPosition],
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          zIndex: 2,
                        }}
                        onClick={() => editStakeholder(s.id)}
                      >
                        <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 600, color: "white" }}>
                          {s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Movement Summary */}
                {stakeholders.length > 0 && <div style={{ marginTop: 32, padding: "20px 24px", background: "var(--navy)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", display: "block", marginBottom: 4 }}>Movement Needed</span>
                    <span style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--cream)" }}>{movementNeeded}</span>
                    <span style={{ fontFamily: "var(--ui)", fontSize: 13, color: "rgba(234,228,213,0.6)", marginLeft: 8 }}>of {stakeholders.length} stakeholders need to shift position</span>
                  </div>
                  <div style={{ display: "flex", gap: 20 }}>
                    {(["decision-maker", "influencer", "impacted", "peripheral"] as const).map(ring => (
                      <div key={ring} style={{ textAlign: "center" as const }}>
                        <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "var(--cream)", display: "block" }}>{countByRing(ring)}</span>
                        <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "rgba(234,228,213,0.5)" }}>{RING_LABELS[ring]}s</span>
                      </div>
                    ))}
                  </div>
                </div>}

              </section>
            </ScrollReveal>


        {/* ---- Related Knowledge ---- */}
        <hr className="section-divider" style={{ marginBottom: 40 }} />
        <ScrollReveal>
          <section>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--navy)",
                marginBottom: 14,
              }}
            >
              Related Knowledge
            </h2>
            <Link
              href="/knowledge/stakeholder-strategy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 22px",
                border: "1px solid var(--border)",
                textDecoration: "none",
                fontFamily: "var(--ui)",
                fontSize: 14,
                color: "var(--navy)",
                fontWeight: 500,
                transition: "border-color 0.2s, box-shadow 0.2s",
                background: "rgba(10,22,40,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(10,22,40,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Knowledge Hub
              </span>
              <span>Stakeholder Strategy</span>
              <span
                style={{
                  fontSize: 14,
                  color: "var(--gold)",
                  marginLeft: "auto",
                }}
              >
                &rarr;
              </span>
            </Link>
          </section>
        </ScrollReveal>
      </main>

      {/* ---- Stakeholder Form Modal ---- */}
      {showForm && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && cancelEdit()}>
          <div className="modal" style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
            <button className="modal-close" onClick={cancelEdit}>&times;</button>
            <h2 className="modal-title">{editingId ? "Edit Stakeholder" : "Add Stakeholder"}</h2>

            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group"><label>Name</label><input type="text" placeholder="e.g. Jane Smith" value={form.name} onChange={e => updateField("name", e.target.value)} /></div>
              <div className="form-group"><label>Role / Group</label><input type="text" placeholder="e.g. Head of Operations" value={form.role} onChange={e => updateField("role", e.target.value)} /></div>
            </div>

            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Ring</label>
                <select value={form.ring} onChange={e => updateField("ring", e.target.value as Stakeholder["ring"])}>
                  {Object.entries(RING_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Influence</label>
                <select value={form.influence} onChange={e => updateField("influence", e.target.value as Stakeholder["influence"])}>
                  {Object.entries(INFLUENCE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Impact</label>
                <select value={form.impact} onChange={e => updateField("impact", e.target.value as Stakeholder["impact"])}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Current Position</label>
                <select value={form.currentPosition} onChange={e => updateField("currentPosition", e.target.value as Stakeholder["currentPosition"])}>
                  {Object.entries(POSITION_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Target Position</label>
              <select value={form.targetPosition} onChange={e => updateField("targetPosition", e.target.value as Stakeholder["targetPosition"])}>
                {Object.entries(TARGET_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Engagement Action</label>
              <textarea placeholder="What specific action will move this stakeholder to their target position?" value={form.engagementAction} onChange={e => updateField("engagementAction", e.target.value)} style={{ minHeight: 80 }} />
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Notes</label>
              <textarea placeholder="Any additional context" value={form.notes} onChange={e => updateField("notes", e.target.value)} style={{ minHeight: 60 }} />
            </div>

            {formError && <p style={{ color: "#C62828", fontFamily: "var(--ui)", fontSize: 13, marginBottom: 12 }}>{formError}</p>}

            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-gold" onClick={addStakeholder} style={{ flex: 1 }}>
                {editingId ? "Update Stakeholder" : "Add Stakeholder"}
              </button>
              {editingId && (
                <button className="btn-outline" onClick={() => { removeStakeholder(editingId); cancelEdit(); }}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
