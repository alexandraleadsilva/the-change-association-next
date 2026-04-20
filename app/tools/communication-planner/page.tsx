"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { SaveIndicator } from "@/components/SaveIndicator";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Phase =
  | "pre-announcement"
  | "announcement"
  | "early-delivery"
  | "go-live"
  | "post-go-live";

type CommStatus = "planned" | "in-progress" | "complete";

interface CommEntry {
  id: string;
  phase: Phase;
  audience: string;
  keyMessage: string;
  channel: string;
  owner: string;
  timing: string;
  status: CommStatus;
}

interface CommunicationPlan {
  projectName: string;
  createdBy: string;
  entries: CommEntry[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PHASES: { value: Phase; label: string; num: string }[] = [
  { value: "pre-announcement", label: "Pre-Announcement", num: "01" },
  { value: "announcement", label: "Announcement", num: "02" },
  { value: "early-delivery", label: "Early Delivery", num: "03" },
  { value: "go-live", label: "Go-Live", num: "04" },
  { value: "post-go-live", label: "Post Go-Live", num: "05" },
];

const PHASE_LABELS: Record<Phase, string> = {
  "pre-announcement": "Pre-Announcement",
  announcement: "Announcement",
  "early-delivery": "Early Delivery",
  "go-live": "Go-Live",
  "post-go-live": "Post Go-Live",
};

const PHASE_COLOURS: Record<Phase, string> = {
  "pre-announcement": "#6C7A89",
  announcement: "#2980B9",
  "early-delivery": "#D4A017",
  "go-live": "#27AE60",
  "post-go-live": "#8E44AD",
};

const STATUS_LABELS: Record<CommStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  complete: "Complete",
};

const STATUS_COLOURS: Record<CommStatus, string> = {
  planned: "#6C7A89",
  "in-progress": "#D4A017",
  complete: "#27AE60",
};

const STATUS_BG: Record<CommStatus, string> = {
  planned: "rgba(108,122,137,0.10)",
  "in-progress": "rgba(212,160,23,0.10)",
  complete: "rgba(39,174,96,0.10)",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  Empty form state                                                   */
/* ------------------------------------------------------------------ */

const EMPTY_FORM: Omit<CommEntry, "id"> = {
  phase: "pre-announcement",
  audience: "",
  keyMessage: "",
  channel: "",
  owner: "",
  timing: "",
  status: "planned",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CommunicationPlannerPage() {
  /* --- project-level state --- */
  const [projectName, setProjectName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  /* --- entries --- */
  const [entries, setEntries] = useState<CommEntry[]>([]);

  /* --- form state --- */
  const [form, setForm] = useState<Omit<CommEntry, "id">>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<CommunicationPlan>({
    toolType: "communication-planner",
    defaultData: { projectName: "", createdBy: "", entries: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setProjectName(savedData.projectName || "");
      setCreatedBy(savedData.createdBy || "");
      setEntries(savedData.entries || []);
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
    saveToDb({ projectName, createdBy, entries });
  }, [projectName, createdBy, entries]);

  /* --- helpers --- */
  const updateField = <K extends keyof Omit<CommEntry, "id">>(
    key: K,
    value: Omit<CommEntry, "id">[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const addEntry = () => {
    if (!form.audience.trim()) {
      setFormError("Please enter an audience.");
      return;
    }
    if (!form.keyMessage.trim()) {
      setFormError("Please enter a key message.");
      return;
    }
    setFormError("");
    if (editingId) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e))
      );
      setEditingId(null);
    } else {
      setEntries((prev) => [...prev, { ...form, id: generateId() }]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const editEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    const { id: _id, ...rest } = entry;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(false);
  };

  const removeEntry = (id: string) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  /* --- derived summary data --- */
  const countByPhase = (phase: Phase) =>
    entries.filter((e) => e.phase === phase).length;

  const countByStatus = (status: CommStatus) =>
    entries.filter((e) => e.status === status).length;

  const entriesByPhase = (phase: Phase) =>
    entries.filter((e) => e.phase === phase);

  /* --- serialisable snapshot (for future DB / dashboard) --- */
  const _planSnapshot: CommunicationPlan = {
    projectName,
    createdBy,
    entries,
  };
  // _planSnapshot available for future persistence

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
          <h1>Communication Planner</h1>
          <p>
            Plan and track communications across every phase of your change
            initiative. Map audiences, channels, key messages, and ownership to
            ensure the right people hear the right thing at the right time.
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
              <div className="form-group">
                <label htmlFor="projectName">Project / Initiative Name</label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="e.g. ERP Rollout Phase 2"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
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

        <SaveIndicator isAuthenticated={isAuthenticated} isSaving={isSaving} lastSaved={lastSaved} />

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Phase Timeline ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 28,
                  fontWeight: 500,
                  color: "var(--navy)",
                }}
              >
                Communication Timeline
              </h2>
              <button
                className="btn"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY_FORM);
                  setFormError("");
                  setShowForm(true);
                }}
              >
                + Add Communication
              </button>
            </div>

            {/* Timeline visual */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 16,
                padding: "0 8px",
              }}
            >
              {/* connecting line */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 28,
                  right: 28,
                  height: 2,
                  background: "var(--border)",
                  zIndex: 0,
                }}
              />
              {PHASES.map((phase) => {
                const count = countByPhase(phase.value);
                return (
                  <div
                    key={phase.value}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      zIndex: 1,
                      flex: 1,
                    }}
                  >
                    {/* dot */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background:
                          count > 0
                            ? PHASE_COLOURS[phase.value]
                            : "var(--cream)",
                        border: `2px solid ${
                          count > 0
                            ? PHASE_COLOURS[phase.value]
                            : "var(--border)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                        transition: "all 0.3s",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight: 600,
                          color: count > 0 ? "#fff" : "#9A9080",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                    {/* label */}
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color:
                          count > 0
                            ? PHASE_COLOURS[phase.value]
                            : "#9A9080",
                        textAlign: "center",
                        lineHeight: 1.3,
                        maxWidth: 90,
                      }}
                    >
                      {phase.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Communications by Phase ---- */}
        {PHASES.map((phase, phaseIdx) => {
          const phaseEntries = entriesByPhase(phase.value);
          return (
            <ScrollReveal key={phase.value} delay={phaseIdx * 60}>
              <section style={{ marginBottom: 40 }}>
                {/* Phase heading */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      color: PHASE_COLOURS[phase.value],
                    }}
                  >
                    {phase.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--navy)",
                      margin: 0,
                    }}
                  >
                    {phase.label}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 11,
                      color: "#9A9080",
                      marginLeft: 4,
                    }}
                  >
                    {phaseEntries.length === 0
                      ? "No communications"
                      : `${phaseEntries.length} communication${
                          phaseEntries.length !== 1 ? "s" : ""
                        }`}
                  </span>
                </div>

                {/* Cards */}
                {phaseEntries.length === 0 ? (
                  <div
                    style={{
                      padding: "24px 28px",
                      border: "1px dashed var(--border)",
                      background: "rgba(10,22,40,0.01)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        color: "#9A9080",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      No communications planned for this phase yet.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: 14,
                    }}
                  >
                    {phaseEntries.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => editEntry(entry.id)}
                        style={{
                          padding: "20px 22px",
                          border: "1px solid var(--border)",
                          background: "var(--cream)",
                          cursor: "pointer",
                          transition:
                            "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--gold)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 20px rgba(10,22,40,0.08)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {/* Status badge */}
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            background: STATUS_BG[entry.status],
                            color: STATUS_COLOURS[entry.status],
                            fontFamily: "var(--ui)",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginBottom: 12,
                          }}
                        >
                          {STATUS_LABELS[entry.status]}
                        </span>

                        {/* Audience */}
                        <h4
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: 17,
                            fontWeight: 600,
                            color: "var(--navy)",
                            margin: "0 0 8px 0",
                            lineHeight: 1.3,
                          }}
                        >
                          {entry.audience}
                        </h4>

                        {/* Message preview */}
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "var(--text-mid)",
                            lineHeight: 1.6,
                            margin: "0 0 14px 0",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {entry.keyMessage}
                        </p>

                        {/* Meta row */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 16,
                            borderTop: "1px solid var(--border)",
                            paddingTop: 12,
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 9,
                                fontWeight: 500,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#9A9080",
                                display: "block",
                                marginBottom: 2,
                              }}
                            >
                              Channel
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                color: "var(--navy)",
                                fontWeight: 500,
                              }}
                            >
                              {entry.channel || "---"}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 9,
                                fontWeight: 500,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#9A9080",
                                display: "block",
                                marginBottom: 2,
                              }}
                            >
                              Owner
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                color: "var(--navy)",
                                fontWeight: 500,
                              }}
                            >
                              {entry.owner || "---"}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 9,
                                fontWeight: 500,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#9A9080",
                                display: "block",
                                marginBottom: 2,
                              }}
                            >
                              Timing
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                color: "var(--navy)",
                                fontWeight: 500,
                              }}
                            >
                              {entry.timing || "---"}
                            </span>
                          </div>
                        </div>

                        {/* Click hint */}
                        <span
                          style={{
                            position: "absolute",
                            top: 18,
                            right: 18,
                            fontFamily: "var(--ui)",
                            fontSize: 14,
                            color: "var(--gold)",
                            opacity: 0.5,
                          }}
                        >
                          &#9998;
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </ScrollReveal>
          );
        })}

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Summary ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--navy)",
                marginBottom: 24,
              }}
            >
              Plan Summary
            </h2>

            {entries.length === 0 ? (
              <div
                style={{
                  padding: "32px 28px",
                  border: "1px dashed var(--border)",
                  background: "rgba(10,22,40,0.01)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 14,
                    color: "#9A9080",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  Add communications to see a summary of your plan.
                </p>
              </div>
            ) : (
              <>
                {/* Total banner */}
                <div
                  style={{
                    padding: "20px 28px",
                    background: "var(--navy)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Total Communications
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 32,
                        fontWeight: 600,
                        color: "var(--cream)",
                      }}
                    >
                      {entries.length}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    {(
                      ["planned", "in-progress", "complete"] as CommStatus[]
                    ).map((status) => (
                      <div key={status} style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: 24,
                            fontWeight: 600,
                            color: "var(--cream)",
                            display: "block",
                          }}
                        >
                          {countByStatus(status)}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 10,
                            color: "rgba(234,228,213,0.5)",
                          }}
                        >
                          {STATUS_LABELS[status]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* By-phase breakdown */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {PHASES.map((phase) => {
                    const count = countByPhase(phase.value);
                    return (
                      <div
                        key={phase.value}
                        style={{
                          padding: "18px 20px",
                          border: "1px solid var(--border)",
                          background: "var(--cream)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 9,
                            fontWeight: 500,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: PHASE_COLOURS[phase.value],
                            display: "block",
                            marginBottom: 6,
                          }}
                        >
                          {phase.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: 26,
                            fontWeight: 600,
                            color: "var(--navy)",
                          }}
                        >
                          {count}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            color: "#9A9080",
                            marginLeft: 6,
                          }}
                        >
                          {count === 1 ? "comm" : "comms"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
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
              href="/knowledge/communication-planning"
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
              <span>Communication Planning</span>
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

      {/* ---- Communication Form Modal ---- */}
      {showForm && (
        <div
          className="modal-overlay open"
          onClick={(e) => e.target === e.currentTarget && cancelEdit()}
        >
          <div
            className="modal"
            style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}
          >
            <button className="modal-close" onClick={cancelEdit}>
              &times;
            </button>
            <h2 className="modal-title">
              {editingId ? "Edit Communication" : "Add Communication"}
            </h2>

            {/* Phase */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Phase</label>
              <select
                value={form.phase}
                onChange={(e) =>
                  updateField("phase", e.target.value as Phase)
                }
              >
                {PHASES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Audience + Channel */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Audience</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Leadership Team"
                  value={form.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Channel</label>
                <input
                  type="text"
                  placeholder="e.g. Town Hall, Email, Intranet"
                  value={form.channel}
                  onChange={(e) => updateField("channel", e.target.value)}
                />
              </div>
            </div>

            {/* Key Message */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Key Message</label>
              <textarea
                placeholder="What is the core message for this audience at this phase?"
                value={form.keyMessage}
                onChange={(e) => updateField("keyMessage", e.target.value)}
                style={{ minHeight: 100 }}
              />
            </div>

            {/* Owner + Timing */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Change Lead"
                  value={form.owner}
                  onChange={(e) => updateField("owner", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Timing</label>
                <input
                  type="text"
                  placeholder="e.g. Week 1, Day of launch"
                  value={form.timing}
                  onChange={(e) => updateField("timing", e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value as CommStatus)
                }
              >
                {(Object.keys(STATUS_LABELS) as CommStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            {formError && (
              <p
                style={{
                  color: "#C62828",
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                {formError}
              </p>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn-gold"
                onClick={addEntry}
                style={{ flex: 1 }}
              >
                {editingId ? "Update Communication" : "Add Communication"}
              </button>
              {editingId && (
                <button
                  className="btn-outline"
                  onClick={() => {
                    removeEntry(editingId);
                    cancelEdit();
                  }}
                >
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
