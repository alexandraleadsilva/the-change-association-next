"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { ProjectSelector } from "@/components/ProjectSelector";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

interface ResistanceSignal {
  id: string;
  dateObserved: string;
  description: string;
  type:
    | "silence"
    | "questions"
    | "compliance"
    | "workarounds"
    | "advocacy-loss"
    | "escalation"
    | "other";
  severity: "low" | "medium" | "high";
  source: string;
  interpretation: string;
  response: string;
  status: "new" | "investigating" | "responding" | "resolved";
}

interface ResistanceTracker {
  projectName: string;
  createdBy: string;
  signals: ResistanceSignal[];
}

/* ------------------------------------------------------------------ */
/*  CONSTANTS & LABELS                                                 */
/* ------------------------------------------------------------------ */

const TYPE_LABELS: Record<ResistanceSignal["type"], string> = {
  silence: "Silence",
  questions: "Persistent Questions",
  compliance: "Malicious Compliance",
  workarounds: "Workarounds",
  "advocacy-loss": "Advocacy Loss",
  escalation: "Escalation",
  other: "Other",
};

const SEVERITY_LABELS: Record<ResistanceSignal["severity"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const SEVERITY_COLOURS: Record<ResistanceSignal["severity"], string> = {
  low: "#27AE60",
  medium: "#D4A017",
  high: "#C0392B",
};

const SEVERITY_BG: Record<ResistanceSignal["severity"], string> = {
  low: "rgba(39,174,96,0.08)",
  medium: "rgba(212,160,23,0.08)",
  high: "rgba(192,57,43,0.08)",
};

const STATUS_LABELS: Record<ResistanceSignal["status"], string> = {
  new: "New",
  investigating: "Investigating",
  responding: "Responding",
  resolved: "Resolved",
};

const STATUS_COLOURS: Record<ResistanceSignal["status"], string> = {
  new: "#6C63FF",
  investigating: "#D4A017",
  responding: "#2E86C1",
  resolved: "#27AE60",
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  EMPTY FORM STATE                                                   */
/* ------------------------------------------------------------------ */

const EMPTY_FORM: Omit<ResistanceSignal, "id"> = {
  dateObserved: new Date().toISOString().slice(0, 10),
  description: "",
  type: "silence",
  severity: "medium",
  source: "",
  interpretation: "",
  response: "",
  status: "new",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ResistanceTrackerPage() {
  /* ---- project-level state ---- */
  const [projectName, setProjectName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  /* ---- signals ---- */
  const [signals, setSignals] = useState<ResistanceSignal[]>([]);

  /* ---- form / modal state ---- */
  const [form, setForm] = useState<Omit<ResistanceSignal, "id">>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  /* ---- filters ---- */
  const [filterSeverity, setFilterSeverity] = useState<
    "all" | ResistanceSignal["severity"]
  >("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | ResistanceSignal["status"]
  >("all");

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<ResistanceTracker>({
    toolType: "resistance-tracker",
    defaultData: { projectName: "", createdBy: "", signals: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setProjectName(savedData.projectName || "");
      setCreatedBy(savedData.createdBy || "");
      setSignals(savedData.signals || []);
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
    saveToDb({ projectName, createdBy, signals });
  }, [projectName, createdBy, signals]);

  /* ---- form helpers ---- */
  const updateField = useCallback(
    <K extends keyof Omit<ResistanceSignal, "id">>(
      key: K,
      value: Omit<ResistanceSignal, "id">[K]
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const openNewForm = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }, []);

  const openEditForm = useCallback(
    (id: string) => {
      const s = signals.find((sig) => sig.id === id);
      if (!s) return;
      const { id: _id, ...rest } = s;
      setForm(rest);
      setEditingId(id);
      setFormError("");
      setShowForm(true);
    },
    [signals]
  );

  const cancelForm = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(false);
  }, []);

  const saveSignal = useCallback(() => {
    if (!form.description.trim()) {
      setFormError("Please enter a description of the resistance signal.");
      return;
    }
    if (!form.source.trim()) {
      setFormError("Please enter the source (who or where observed).");
      return;
    }
    setFormError("");

    if (editingId) {
      setSignals((prev) =>
        prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s))
      );
    } else {
      setSignals((prev) => [...prev, { ...form, id: generateId() }]);
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }, [form, editingId]);

  const deleteSignal = useCallback(
    (id: string) => {
      setSignals((prev) => prev.filter((s) => s.id !== id));
      cancelForm();
    },
    [cancelForm]
  );

  /* ---- filtered signals ---- */
  const filtered = signals.filter((s) => {
    if (filterSeverity !== "all" && s.severity !== filterSeverity) return false;
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    return true;
  });

  /* ---- dashboard counts ---- */
  const totalSignals = signals.length;
  const countBySeverity = (sev: ResistanceSignal["severity"]) =>
    signals.filter((s) => s.severity === sev).length;
  const countByStatus = (st: ResistanceSignal["status"]) =>
    signals.filter((s) => s.status === st).length;
  const countByType = (t: ResistanceSignal["type"]) =>
    signals.filter((s) => s.type === t).length;

  /* ---- serialisable snapshot (for future DB) ---- */
  const _snapshot: ResistanceTracker = {
    projectName,
    createdBy,
    signals,
  };
  // _snapshot available for future persistence

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      <Nav />

      {/* ---------- HEADER ---------- */}
      <header className="page-header">
        <ScrollReveal>
          <span>TCA TOOL</span>
          <h1>Resistance Tracker</h1>
          <p>
            Track and interpret resistance signals across your change
            initiative. Log observations as they emerge, assess their severity,
            plan thoughtful responses, and monitor resolution over time.
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
                <label htmlFor="rt-createdBy">Created By</label>
                <input
                  id="rt-createdBy"
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

        {/* ---- Dashboard Summary ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 26,
                fontWeight: 400,
                color: "var(--navy)",
                marginBottom: 24,
              }}
            >
              Dashboard
            </h2>

            {totalSignals === 0 ? (
              <div
                style={{
                  padding: "32px 24px",
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  textAlign: "center" as const,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 14,
                    color: "var(--text-mid)",
                    marginBottom: 8,
                  }}
                >
                  No resistance signals logged yet.
                </p>
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 12,
                    color: "#9A9080",
                  }}
                >
                  Use the button below to log your first observation.
                </p>
              </div>
            ) : (
              <>
                {/* Total + Severity row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  {/* Total */}
                  <div
                    style={{
                      padding: "20px 24px",
                      background: "var(--navy)",
                      textAlign: "center" as const,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: "var(--gold)",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Total Signals
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 32,
                        fontWeight: 600,
                        color: "var(--cream)",
                      }}
                    >
                      {totalSignals}
                    </span>
                  </div>

                  {/* Severity counts */}
                  {(["high", "medium", "low"] as const).map((sev) => (
                    <div
                      key={sev}
                      style={{
                        padding: "20px 24px",
                        background: SEVERITY_BG[sev],
                        border: `1px solid ${SEVERITY_COLOURS[sev]}33`,
                        textAlign: "center" as const,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase" as const,
                          color: SEVERITY_COLOURS[sev],
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {SEVERITY_LABELS[sev]}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 32,
                          fontWeight: 600,
                          color: SEVERITY_COLOURS[sev],
                        }}
                      >
                        {countBySeverity(sev)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  {(
                    ["new", "investigating", "responding", "resolved"] as const
                  ).map((st) => (
                    <div
                      key={st}
                      style={{
                        padding: "16px 20px",
                        border: "1px solid var(--border)",
                        background: "var(--cream)",
                        textAlign: "center" as const,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase" as const,
                          color: STATUS_COLOURS[st],
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {STATUS_LABELS[st]}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 26,
                          fontWeight: 600,
                          color: "var(--navy)",
                        }}
                      >
                        {countByStatus(st)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Type breakdown */}
                <div
                  style={{
                    padding: "20px 24px",
                    border: "1px solid var(--border)",
                    background: "var(--cream)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "#9A9080",
                      display: "block",
                      marginBottom: 14,
                    }}
                  >
                    Signals by Type
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap" as const,
                      gap: 12,
                    }}
                  >
                    {(Object.keys(TYPE_LABELS) as ResistanceSignal["type"][])
                      .filter((t) => countByType(t) > 0)
                      .map((t) => (
                        <div
                          key={t}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 14px",
                            background: "rgba(10,22,40,0.04)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 12,
                              color: "var(--navy)",
                              fontWeight: 500,
                            }}
                          >
                            {TYPE_LABELS[t]}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 12,
                              fontWeight: 600,
                              color: "var(--gold)",
                            }}
                          >
                            {countByType(t)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </ScrollReveal>

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Signal List ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                flexWrap: "wrap" as const,
                gap: 12,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "var(--navy)",
                }}
              >
                Resistance Signals
              </h2>
              <button className="btn" onClick={openNewForm}>
                + Log Resistance Signal
              </button>
            </div>

            {/* Filters */}
            {signals.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  marginBottom: 24,
                  flexWrap: "wrap" as const,
                  alignItems: "center",
                }}
              >
                {/* Severity filter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "#9A9080",
                    }}
                  >
                    Severity:
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: 0,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {(
                      [
                        { label: "All", value: "all" as const },
                        { label: "High", value: "high" as const },
                        { label: "Medium", value: "medium" as const },
                        { label: "Low", value: "low" as const },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setFilterSeverity(tab.value)}
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight:
                            filterSeverity === tab.value ? 500 : 400,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color:
                            filterSeverity === tab.value
                              ? "var(--navy)"
                              : "var(--text-mid)",
                          padding: "6px 12px 8px",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          borderBottom:
                            filterSeverity === tab.value
                              ? "2px solid var(--navy)"
                              : "2px solid transparent",
                          marginBottom: -1,
                          transition: "all 0.2s",
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status filter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "#9A9080",
                    }}
                  >
                    Status:
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: 0,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {(
                      [
                        { label: "All", value: "all" as const },
                        { label: "New", value: "new" as const },
                        { label: "Investigating", value: "investigating" as const },
                        { label: "Responding", value: "responding" as const },
                        { label: "Resolved", value: "resolved" as const },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setFilterStatus(tab.value)}
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight:
                            filterStatus === tab.value ? 500 : 400,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color:
                            filterStatus === tab.value
                              ? "var(--navy)"
                              : "var(--text-mid)",
                          padding: "6px 12px 8px",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          borderBottom:
                            filterStatus === tab.value
                              ? "2px solid var(--navy)"
                              : "2px solid transparent",
                          marginBottom: -1,
                          transition: "all 0.2s",
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Signal cards */}
            {filtered.length === 0 && signals.length > 0 && (
              <div
                style={{
                  padding: "32px 24px",
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  textAlign: "center" as const,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 14,
                    color: "var(--text-mid)",
                  }}
                >
                  No signals match the current filters.
                </p>
              </div>
            )}

            {filtered.length === 0 && signals.length === 0 && (
              <div
                style={{
                  padding: "40px 24px",
                  border: "1px dashed var(--border)",
                  background: "var(--cream)",
                  textAlign: "center" as const,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 14,
                    color: "var(--text-mid)",
                    marginBottom: 8,
                  }}
                >
                  No resistance signals logged yet.
                </p>
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 12,
                    color: "#9A9080",
                    marginBottom: 20,
                  }}
                >
                  Start tracking resistance by logging your first signal.
                </p>
                <button className="btn" onClick={openNewForm}>
                  + Log Resistance Signal
                </button>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
              }}
            >
              {filtered.map((signal) => (
                <div
                  key={signal.id}
                  onClick={() => openEditForm(signal.id)}
                  style={{
                    padding: "24px 28px",
                    border: `1px solid ${SEVERITY_COLOURS[signal.severity]}33`,
                    borderLeft: `4px solid ${SEVERITY_COLOURS[signal.severity]}`,
                    background: SEVERITY_BG[signal.severity],
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(10,22,40,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Card top row: date, type badge, severity badge, status badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 14,
                      flexWrap: "wrap" as const,
                    }}
                  >
                    {/* Date */}
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        color: "var(--text-mid)",
                      }}
                    >
                      {signal.dateObserved}
                    </span>

                    {/* Type badge */}
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: "var(--navy)",
                        background: "rgba(10,22,40,0.06)",
                        padding: "3px 10px",
                      }}
                    >
                      {TYPE_LABELS[signal.type]}
                    </span>

                    {/* Severity badge */}
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: "#fff",
                        background: SEVERITY_COLOURS[signal.severity],
                        padding: "3px 10px",
                      }}
                    >
                      {SEVERITY_LABELS[signal.severity]}
                    </span>

                    {/* Status badge */}
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: STATUS_COLOURS[signal.status],
                        border: `1px solid ${STATUS_COLOURS[signal.status]}44`,
                        padding: "3px 10px",
                        background: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {STATUS_LABELS[signal.status]}
                    </span>

                    {/* Edit hint pushed right */}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        color: "#9A9080",
                      }}
                    >
                      Click to edit
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 14,
                      color: "var(--navy)",
                      lineHeight: 1.7,
                      marginBottom: 12,
                      fontWeight: 500,
                    }}
                  >
                    {signal.description}
                  </p>

                  {/* Source */}
                  <div style={{ marginBottom: 10 }}>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase" as const,
                        color: "#9A9080",
                      }}
                    >
                      Source:{" "}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        color: "var(--text-mid)",
                      }}
                    >
                      {signal.source}
                    </span>
                  </div>

                  {/* Interpretation */}
                  {signal.interpretation.trim() && (
                    <div style={{ marginBottom: 10 }}>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                        }}
                      >
                        Interpretation:{" "}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--text-mid)",
                          lineHeight: 1.6,
                        }}
                      >
                        {signal.interpretation}
                      </span>
                    </div>
                  )}

                  {/* Planned Response */}
                  {signal.response.trim() && (
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                        }}
                      >
                        Planned Response:{" "}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--text-mid)",
                          lineHeight: 1.6,
                        }}
                      >
                        {signal.response}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
              href="/knowledge/resistance-management"
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
              <span>Resistance Management</span>
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

      {/* ---- Signal Form Modal ---- */}
      {showForm && (
        <div
          className="modal-overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelForm();
          }}
        >
          <div
            className="modal"
            style={{ maxWidth: 600, maxHeight: "90vh", overflowY: "auto" }}
          >
            <button className="modal-close" onClick={cancelForm}>
              &times;
            </button>
            <h2 className="modal-title">
              {editingId ? "Edit Resistance Signal" : "Log Resistance Signal"}
            </h2>

            {/* Date */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Date Observed</label>
                <input
                  type="date"
                  value={form.dateObserved}
                  onChange={(e) => updateField("dateObserved", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Source (Who / Where)</label>
                <input
                  type="text"
                  placeholder="e.g. Operations team stand-up"
                  value={form.source}
                  onChange={(e) => updateField("source", e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Description</label>
              <textarea
                placeholder="Describe the resistance signal you observed..."
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                style={{ minHeight: 100 }}
              />
            </div>

            {/* Type + Severity */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Signal Type</label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    updateField(
                      "type",
                      e.target.value as ResistanceSignal["type"]
                    )
                  }
                >
                  {(
                    Object.entries(TYPE_LABELS) as [
                      ResistanceSignal["type"],
                      string,
                    ][]
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Severity</label>
                <select
                  value={form.severity}
                  onChange={(e) =>
                    updateField(
                      "severity",
                      e.target.value as ResistanceSignal["severity"]
                    )
                  }
                >
                  {(
                    Object.entries(SEVERITY_LABELS) as [
                      ResistanceSignal["severity"],
                      string,
                    ][]
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Interpretation */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Interpretation</label>
              <textarea
                placeholder="What do you think this signal means? What might be driving it?"
                value={form.interpretation}
                onChange={(e) =>
                  updateField("interpretation", e.target.value)
                }
                style={{ minHeight: 80 }}
              />
            </div>

            {/* Planned Response */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Planned Response</label>
              <textarea
                placeholder="How do you plan to address this resistance?"
                value={form.response}
                onChange={(e) => updateField("response", e.target.value)}
                style={{ minHeight: 80 }}
              />
            </div>

            {/* Status */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value as ResistanceSignal["status"]
                  )
                }
              >
                {(
                  Object.entries(STATUS_LABELS) as [
                    ResistanceSignal["status"],
                    string,
                  ][]
                ).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Error */}
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

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn-gold"
                onClick={saveSignal}
                style={{ flex: 1 }}
              >
                {editingId ? "Update Signal" : "Log Signal"}
              </button>
              {editingId && (
                <button
                  className="btn-outline"
                  onClick={() => deleteSignal(editingId)}
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
