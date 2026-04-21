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

type Phase = "foundation" | "pilot" | "rollout" | "stabilise" | "sustain";

type Category =
  | "change"
  | "communication"
  | "training"
  | "governance"
  | "delivery";

type MilestoneStatus =
  | "not-started"
  | "in-progress"
  | "complete"
  | "at-risk"
  | "delayed";

interface Milestone {
  id: string;
  title: string;
  phase: Phase;
  category: Category;
  startDate: string;
  endDate: string;
  owner: string;
  status: MilestoneStatus;
  notes: string;
}

interface ChangeRoadmap {
  projectName: string;
  createdBy: string;
  milestones: Milestone[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PHASES: { value: Phase; label: string; num: string }[] = [
  { value: "foundation", label: "Foundation", num: "01" },
  { value: "pilot", label: "Pilot", num: "02" },
  { value: "rollout", label: "Rollout", num: "03" },
  { value: "stabilise", label: "Stabilise", num: "04" },
  { value: "sustain", label: "Sustain", num: "05" },
];

const PHASE_LABELS: Record<Phase, string> = {
  foundation: "Foundation",
  pilot: "Pilot",
  rollout: "Rollout",
  stabilise: "Stabilise",
  sustain: "Sustain",
};

const PHASE_COLOURS: Record<Phase, string> = {
  foundation: "#6C7A89",
  pilot: "#2980B9",
  rollout: "#D4A017",
  stabilise: "#27AE60",
  sustain: "#8E44AD",
};

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "change", label: "Change" },
  { value: "communication", label: "Communication" },
  { value: "training", label: "Training" },
  { value: "governance", label: "Governance" },
  { value: "delivery", label: "Delivery" },
];

const CATEGORY_LABELS: Record<Category, string> = {
  change: "Change",
  communication: "Communication",
  training: "Training",
  governance: "Governance",
  delivery: "Delivery",
};

const CATEGORY_COLOURS: Record<Category, string> = {
  change: "#2980B9",
  communication: "#8E44AD",
  training: "#D4A017",
  governance: "#6C7A89",
  delivery: "#27AE60",
};

const STATUSES: { value: MilestoneStatus; label: string }[] = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "complete", label: "Complete" },
  { value: "at-risk", label: "At Risk" },
  { value: "delayed", label: "Delayed" },
];

const STATUS_LABELS: Record<MilestoneStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete",
  "at-risk": "At Risk",
  delayed: "Delayed",
};

const STATUS_COLOURS: Record<MilestoneStatus, string> = {
  "not-started": "#6C7A89",
  "in-progress": "#D4A017",
  complete: "#27AE60",
  "at-risk": "#E67E22",
  delayed: "#C0392B",
};

const STATUS_BG: Record<MilestoneStatus, string> = {
  "not-started": "rgba(108,122,137,0.10)",
  "in-progress": "rgba(212,160,23,0.10)",
  complete: "rgba(39,174,96,0.10)",
  "at-risk": "rgba(230,126,34,0.10)",
  delayed: "rgba(192,57,43,0.10)",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "---";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Empty form state                                                   */
/* ------------------------------------------------------------------ */

const EMPTY_FORM: Omit<Milestone, "id"> = {
  title: "",
  phase: "foundation",
  category: "change",
  startDate: "",
  endDate: "",
  owner: "",
  status: "not-started",
  notes: "",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChangeRoadmapPage() {
  /* --- project-level state --- */
  const [projectName, setProjectName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  /* --- milestones --- */
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  /* --- form state --- */
  const [form, setForm] = useState<Omit<Milestone, "id">>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    data: savedData,
    setData: saveToDb,
    isAuthenticated,
    isSaving,
    lastSaved,
    loaded,
  } = useToolData<ChangeRoadmap>({
    toolType: "change-roadmap",
    defaultData: { projectName: "", createdBy: "", milestones: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (
      loaded &&
      !hasLoaded.current &&
      savedData &&
      savedData.projectName !== undefined
    ) {
      setProjectName(savedData.projectName || "");
      setCreatedBy(savedData.createdBy || "");
      setMilestones(savedData.milestones || []);
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
    saveToDb({ projectName, createdBy, milestones });
  }, [projectName, createdBy, milestones]);

  /* --- helpers --- */
  const updateField = <K extends keyof Omit<Milestone, "id">>(
    key: K,
    value: Omit<Milestone, "id">[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const addMilestone = () => {
    if (!form.title.trim()) {
      setFormError("Please enter a milestone title.");
      return;
    }
    if (!form.startDate) {
      setFormError("Please select a start date.");
      return;
    }
    if (!form.endDate) {
      setFormError("Please select an end date.");
      return;
    }
    if (form.endDate < form.startDate) {
      setFormError("End date must be on or after start date.");
      return;
    }
    setFormError("");
    if (editingId) {
      setMilestones((prev) =>
        prev.map((m) => (m.id === editingId ? { ...form, id: editingId } : m))
      );
      setEditingId(null);
    } else {
      setMilestones((prev) => [...prev, { ...form, id: generateId() }]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const editMilestone = (id: string) => {
    const ms = milestones.find((m) => m.id === id);
    if (!ms) return;
    const { id: _id, ...rest } = ms;
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

  const removeMilestone = (id: string) =>
    setMilestones((prev) => prev.filter((m) => m.id !== id));

  /* --- derived summary data --- */
  const countByPhase = (phase: Phase) =>
    milestones.filter((m) => m.phase === phase).length;

  const countByStatus = (status: MilestoneStatus) =>
    milestones.filter((m) => m.status === status).length;

  const countByCategory = (category: Category) =>
    milestones.filter((m) => m.category === category).length;

  const milestonesByPhase = (phase: Phase) =>
    milestones
      .filter((m) => m.phase === phase)
      .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));

  /* ================================================================ */
  /*  Gantt helpers                                                    */
  /* ================================================================ */

  /** Compute the overall date range across all milestones */
  function getDateRange(): { min: number; max: number; span: number } | null {
    const dates = milestones.flatMap((m) => {
      const vals: number[] = [];
      if (m.startDate) vals.push(new Date(m.startDate + "T00:00:00").getTime());
      if (m.endDate) vals.push(new Date(m.endDate + "T00:00:00").getTime());
      return vals;
    });
    if (dates.length === 0) return null;
    const min = Math.min(...dates);
    const max = Math.max(...dates);
    const span = max - min || 1; // avoid division by zero
    return { min, max, span };
  }

  /** Percentage position within range */
  function pct(dateStr: string, range: { min: number; span: number }): number {
    const t = new Date(dateStr + "T00:00:00").getTime();
    return ((t - range.min) / range.span) * 100;
  }

  const dateRange = getDateRange();

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
          <h1>Change Roadmap</h1>
          <p>
            Build a visual roadmap for your change initiative. Map milestones
            across phases, assign ownership, and track progress from foundation
            through to sustained adoption.
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
              <ProjectSelector
                value={projectName}
                onChange={setProjectName}
                isAuthenticated={isAuthenticated}
              />
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

        {/* ---- Roadmap Timeline ---- */}
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
                Roadmap Timeline
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
                + Add Milestone
              </button>
            </div>

            {/* Phase dot timeline */}
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

        {/* ---- Gantt Chart ---- */}
        {milestones.length > 0 && dateRange && (
          <ScrollReveal>
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "var(--navy)",
                  marginBottom: 20,
                }}
              >
                Timeline View
              </h2>

              <div
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  overflow: "hidden",
                }}
              >
                {PHASES.map((phase, phaseIdx) => {
                  const phaseMilestones = milestonesByPhase(phase.value);
                  if (phaseMilestones.length === 0) return null;
                  return (
                    <div key={phase.value}>
                      {/* Phase swim lane header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "stretch",
                          borderBottom: "1px solid var(--border)",
                          borderTop:
                            phaseIdx > 0 ? "1px solid var(--border)" : "none",
                          minHeight: 0,
                        }}
                      >
                        {/* Phase label column */}
                        <div
                          style={{
                            width: 120,
                            minWidth: 120,
                            padding: "14px 16px",
                            background: "rgba(10,22,40,0.03)",
                            borderRight: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: PHASE_COLOURS[phase.value],
                            }}
                          >
                            {phase.label}
                          </span>
                        </div>

                        {/* Bars area */}
                        <div
                          style={{
                            flex: 1,
                            position: "relative",
                            padding: "10px 16px",
                            minHeight:
                              phaseMilestones.length * 36 + 10,
                          }}
                        >
                          {phaseMilestones.map((ms, i) => {
                            const left = pct(
                              ms.startDate,
                              dateRange
                            );
                            const right = pct(
                              ms.endDate,
                              dateRange
                            );
                            const width = Math.max(right - left, 2);
                            return (
                              <div
                                key={ms.id}
                                onClick={() => editMilestone(ms.id)}
                                title={`${ms.title} (${formatDate(ms.startDate)} - ${formatDate(ms.endDate)})`}
                                style={{
                                  position: "absolute",
                                  top: i * 36 + 6,
                                  left: `calc(${left}% + 0px)`,
                                  width: `calc(${width}% + 4px)`,
                                  minWidth: 40,
                                  height: 28,
                                  background:
                                    STATUS_COLOURS[ms.status],
                                  opacity: 0.85,
                                  borderRadius: 3,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  transition:
                                    "opacity 0.2s, transform 0.2s",
                                  overflow: "hidden",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.opacity = "1";
                                  e.currentTarget.style.transform =
                                    "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.opacity =
                                    "0.85";
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--ui)",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {ms.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  marginTop: 14,
                  paddingLeft: 4,
                }}
              >
                {STATUSES.map((s) => (
                  <div
                    key={s.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        background: STATUS_COLOURS[s.value],
                        opacity: 0.85,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#9A9080",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {milestones.length > 0 && dateRange && (
          <hr className="section-divider" style={{ marginBottom: 48 }} />
        )}

        {/* ---- Milestones by Phase (Card View) ---- */}
        {PHASES.map((phase, phaseIdx) => {
          const phaseMilestones = milestonesByPhase(phase.value);
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
                    {phaseMilestones.length === 0
                      ? "No milestones"
                      : `${phaseMilestones.length} milestone${
                          phaseMilestones.length !== 1 ? "s" : ""
                        }`}
                  </span>
                </div>

                {/* Cards */}
                {phaseMilestones.length === 0 ? (
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
                      No milestones planned for this phase yet.
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
                    {phaseMilestones.map((ms) => (
                      <div
                        key={ms.id}
                        onClick={() => editMilestone(ms.id)}
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
                        {/* Status + Category badges */}
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            marginBottom: 12,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              background: STATUS_BG[ms.status],
                              color: STATUS_COLOURS[ms.status],
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {STATUS_LABELS[ms.status]}
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              background: `${CATEGORY_COLOURS[ms.category]}14`,
                              color: CATEGORY_COLOURS[ms.category],
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {CATEGORY_LABELS[ms.category]}
                          </span>
                        </div>

                        {/* Title */}
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
                          {ms.title}
                        </h4>

                        {/* Notes preview */}
                        {ms.notes && (
                          <p
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 13,
                              color: "var(--text-mid)",
                              lineHeight: 1.6,
                              margin: "0 0 14px 0",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {ms.notes}
                          </p>
                        )}

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
                              Start
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                color: "var(--navy)",
                                fontWeight: 500,
                              }}
                            >
                              {formatDate(ms.startDate)}
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
                              End
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                color: "var(--navy)",
                                fontWeight: 500,
                              }}
                            >
                              {formatDate(ms.endDate)}
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
                              {ms.owner || "---"}
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
              Roadmap Summary
            </h2>

            {milestones.length === 0 ? (
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
                  Add milestones to see a summary of your roadmap.
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
                      Total Milestones
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 32,
                        fontWeight: 600,
                        color: "var(--cream)",
                      }}
                    >
                      {milestones.length}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    {STATUSES.map((s) => {
                      const c = countByStatus(s.value);
                      if (c === 0) return null;
                      return (
                        <div key={s.value} style={{ textAlign: "center" }}>
                          <span
                            style={{
                              fontFamily: "var(--serif)",
                              fontSize: 24,
                              fontWeight: 600,
                              color: "var(--cream)",
                              display: "block",
                            }}
                          >
                            {c}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              color: "rgba(234,228,213,0.5)",
                            }}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* By-phase breakdown */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 12,
                    marginBottom: 20,
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
                          {count === 1 ? "milestone" : "milestones"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* By-category breakdown */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {CATEGORIES.map((cat) => {
                    const count = countByCategory(cat.value);
                    return (
                      <div
                        key={cat.value}
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
                            color: CATEGORY_COLOURS[cat.value],
                            display: "block",
                            marginBottom: 6,
                          }}
                        >
                          {cat.label}
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
                          {count === 1 ? "milestone" : "milestones"}
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
              href="/knowledge/phased-approach"
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
              <span>Phased Approach to Change</span>
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

      {/* ---- Milestone Form Modal ---- */}
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
              {editingId ? "Edit Milestone" : "Add Milestone"}
            </h2>

            {/* Title */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Milestone Title</label>
              <input
                type="text"
                placeholder="e.g. Leadership Alignment Workshop"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            {/* Phase + Category */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
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
              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value as Category)
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Start Date + End Date */}
            <div className="form-row" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Owner + Status */}
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
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as MilestoneStatus
                    )
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Notes</label>
              <textarea
                placeholder="Any additional details, dependencies, or context for this milestone..."
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                style={{ minHeight: 80 }}
              />
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
                onClick={addMilestone}
                style={{ flex: 1 }}
              >
                {editingId ? "Update Milestone" : "Add Milestone"}
              </button>
              {editingId && (
                <button
                  className="btn-outline"
                  onClick={() => {
                    removeMilestone(editingId);
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
