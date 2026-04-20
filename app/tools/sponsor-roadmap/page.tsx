"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { SaveIndicator } from "@/components/SaveIndicator";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

interface SponsorAction {
  id: string;
  action: string;
  status: "not-started" | "in-progress" | "complete";
  dueDate: string;
}

interface PhaseData {
  actions: SponsorAction[];
  notes: string;
}

interface SponsorRoadmap {
  projectName: string;
  sponsorName: string;
  createdBy: string;
  phases: {
    direction: PhaseData;
    engagement: PhaseData;
    enablement: PhaseData;
    execution: PhaseData;
    sustainment: PhaseData;
  };
}

type PhaseKey = keyof SponsorRoadmap["phases"];

/* ------------------------------------------------------------------ */
/*  PILLAR DEFINITIONS                                                 */
/* ------------------------------------------------------------------ */

interface PillarDef {
  key: PhaseKey;
  num: string;
  name: string;
  focus: string;
  defaultActions: string[];
}

const pillarDefs: PillarDef[] = [
  {
    key: "direction",
    num: "01",
    name: "Direction",
    focus: "Setting the conditions for change",
    defaultActions: [
      "Personally articulate the case for change in your own words, without slides or scripts",
      "Test leadership alignment individually -- ask each peer to describe the future state independently",
      "Define success in terms of behaviour and business outcomes, not activity metrics",
      "Identify and communicate what will be deprioritised or stopped to create space for this change",
    ],
  },
  {
    key: "engagement",
    num: "02",
    name: "Engagement",
    focus: "Winning hearts and minds",
    defaultActions: [
      "Communicate the change directly to impacted teams at critical moments, not only through cascaded messages",
      "Hold listening sessions where your role is to hear, not present -- then act visibly on what you learn",
      "Publicly acknowledge what is being lost, not just what is being gained",
      "Intervene personally when senior stakeholder resistance signals a real problem",
    ],
  },
  {
    key: "enablement",
    num: "03",
    name: "Enablement",
    focus: "Equipping people to change",
    defaultActions: [
      "Challenge whether the enablement plan builds confidence, not just knowledge transfer",
      "Ensure managers are specifically equipped to support their teams through the transition",
      "Protect the time and capacity people need to learn by reducing competing demands",
      "Test readiness yourself by talking directly to frontline staff about their preparedness",
    ],
  },
  {
    key: "execution",
    num: "04",
    name: "Execution",
    focus: "Making change happen",
    defaultActions: [
      "Remove blockers directly rather than waiting for them to appear on a RAID log",
      "Make visible trade-offs when this change competes with other priorities",
      "Celebrate early progress and recognise people working differently for the first time",
      "Attend key delivery moments in person -- go-lives, pilot launches, training sessions",
    ],
  },
  {
    key: "sustainment",
    num: "05",
    name: "Sustainment",
    focus: "Making change stick",
    defaultActions: [
      "Stay visibly engaged after the programme formally ends -- reference the change in leadership meetings",
      "Ensure performance management, KPIs, and reward systems reflect the new way of working",
      "Hold leadership peers accountable for sustaining the change in their areas",
      "Commission reviews at six and twelve months focused on behaviour change, not just technical completion",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

let _idCounter = 0;
function newId(): string {
  _idCounter += 1;
  return `action-${Date.now()}-${_idCounter}`;
}

function buildInitialPhases(): SponsorRoadmap["phases"] {
  const phases: Record<string, PhaseData> = {};
  for (const p of pillarDefs) {
    phases[p.key] = {
      actions: p.defaultActions.map((a) => ({
        id: newId(),
        action: a,
        status: "not-started" as const,
        dueDate: "",
      })),
      notes: "",
    };
  }
  return phases as SponsorRoadmap["phases"];
}

const statusLabels: Record<SponsorAction["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete",
};

const statusColours: Record<SponsorAction["status"], string> = {
  "not-started": "#C0392B",
  "in-progress": "#D4A017",
  complete: "#27AE60",
};

const statusBg: Record<SponsorAction["status"], string> = {
  "not-started": "rgba(192,57,43,0.08)",
  "in-progress": "rgba(212,160,23,0.10)",
  complete: "rgba(39,174,96,0.08)",
};

function nextStatus(s: SponsorAction["status"]): SponsorAction["status"] {
  if (s === "not-started") return "in-progress";
  if (s === "in-progress") return "complete";
  return "not-started";
}

/* ------------------------------------------------------------------ */
/*  STATUS BADGE                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({
  status,
  onClick,
}: {
  status: SponsorAction["status"];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={`Click to change status (currently: ${statusLabels[status]})`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        border: `1.5px solid ${statusColours[status]}`,
        background: statusBg[status],
        color: statusColours[status],
        fontFamily: "var(--ui)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 0.2s",
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: statusColours[status],
          flexShrink: 0,
        }}
      />
      {statusLabels[status]}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function SponsorRoadmapPage() {
  /* ---- roadmap state ---- */
  const [roadmap, setRoadmap] = useState<SponsorRoadmap>({
    projectName: "",
    sponsorName: "",
    createdBy: "",
    phases: buildInitialPhases(),
  });

  /* ---- active tab ---- */
  const [activeTab, setActiveTab] = useState<PhaseKey>("direction");

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<SponsorRoadmap>({
    toolType: "sponsor-roadmap",
    defaultData: {
      projectName: "",
      sponsorName: "",
      createdBy: "",
      phases: buildInitialPhases(),
    },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setRoadmap(savedData);
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
    saveToDb(roadmap);
  }, [roadmap]);

  /* ---- new action form state per pillar ---- */
  const [newActionText, setNewActionText] = useState<Record<PhaseKey, string>>({
    direction: "",
    engagement: "",
    enablement: "",
    execution: "",
    sustainment: "",
  });

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "sponsorName" | "createdBy", value: string) => {
      setRoadmap((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateNotes = useCallback((phase: PhaseKey, value: string) => {
    setRoadmap((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phase]: { ...prev.phases[phase], notes: value },
      },
    }));
  }, []);

  const toggleActionStatus = useCallback((phase: PhaseKey, actionId: string) => {
    setRoadmap((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phase]: {
          ...prev.phases[phase],
          actions: prev.phases[phase].actions.map((a) =>
            a.id === actionId ? { ...a, status: nextStatus(a.status) } : a
          ),
        },
      },
    }));
  }, []);

  const updateActionDueDate = useCallback(
    (phase: PhaseKey, actionId: string, date: string) => {
      setRoadmap((prev) => ({
        ...prev,
        phases: {
          ...prev.phases,
          [phase]: {
            ...prev.phases[phase],
            actions: prev.phases[phase].actions.map((a) =>
              a.id === actionId ? { ...a, dueDate: date } : a
            ),
          },
        },
      }));
    },
    []
  );

  const removeAction = useCallback((phase: PhaseKey, actionId: string) => {
    setRoadmap((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phase]: {
          ...prev.phases[phase],
          actions: prev.phases[phase].actions.filter((a) => a.id !== actionId),
        },
      },
    }));
  }, []);

  const addAction = useCallback(
    (phase: PhaseKey) => {
      const text = newActionText[phase].trim();
      if (!text) return;
      const action: SponsorAction = {
        id: newId(),
        action: text,
        status: "not-started",
        dueDate: "",
      };
      setRoadmap((prev) => ({
        ...prev,
        phases: {
          ...prev.phases,
          [phase]: {
            ...prev.phases[phase],
            actions: [...prev.phases[phase].actions, action],
          },
        },
      }));
      setNewActionText((prev) => ({ ...prev, [phase]: "" }));
    },
    [newActionText]
  );

  /* ---- derived stats ---- */
  const allActions = pillarDefs.flatMap((p) => roadmap.phases[p.key].actions);
  const totalActions = allActions.length;
  const completedActions = allActions.filter(
    (a) => a.status === "complete"
  ).length;
  const overallPct =
    totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  function phaseStats(phase: PhaseKey) {
    const actions = roadmap.phases[phase].actions;
    const total = actions.length;
    const done = actions.filter((a) => a.status === "complete").length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  }

  const activePillar = pillarDefs.find((p) => p.key === activeTab)!;
  const activePhaseData = roadmap.phases[activeTab];

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      <Nav />

      {/* ---------- HEADER ---------- */}
      <header className="article-header" style={{ paddingBottom: 32 }}>
        <Link href="/tools" className="article-back">
          &larr; Back to Tools
        </Link>
        <span className="article-label">TCA Tool</span>
        <h1 className="article-title">Sponsor Roadmap</h1>
        <p className="article-intro">
          Plan and track executive sponsorship actions across all five TCA
          pillars. Each phase includes suggested actions drawn from best practice
          sponsorship behaviours. Add your own actions, set due dates, track
          progress, and build a clear roadmap for visible, genuine sponsorship
          throughout the change lifecycle.
        </p>
      </header>

      {/* ---------- OVERALL PROGRESS ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 40px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--ui)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "#9A9080",
              }}
            >
              Overall Progress
            </span>
            <span
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--navy)",
                fontWeight: 500,
              }}
            >
              {completedActions} / {totalActions} actions complete
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${overallPct}%`,
                background: overallPct === 100 ? "#27AE60" : "var(--gold)",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* per-pillar mini progress */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              marginTop: 20,
            }}
          >
            {pillarDefs.map((p) => {
              const s = phaseStats(p.key);
              return (
                <div key={p.key} style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 500,
                        color:
                          activeTab === p.key ? "var(--navy)" : "var(--text-mid)",
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        color: "#9A9080",
                      }}
                    >
                      {s.done}/{s.total}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "var(--border)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${s.pct}%`,
                        background:
                          s.pct === 100 ? "#27AE60" : "var(--gold)",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- PROJECT INFO ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 40px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              padding: "28px 32px",
              border: "1px solid var(--border)",
              background: "var(--cream)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "#9A9080",
                marginBottom: 20,
              }}
            >
              Project Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. ERP Transformation Programme"
                  value={roadmap.projectName}
                  onChange={(e) => updateField("projectName", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Executive Sponsor</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Chen, CFO"
                  value={roadmap.sponsorName}
                  onChange={(e) => updateField("sponsorName", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Created By</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith, Change Lead"
                  value={roadmap.createdBy}
                  onChange={(e) => updateField("createdBy", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div style={{ padding: "0 48px", maxWidth: 900, margin: "0 auto" }}>
        <SaveIndicator isAuthenticated={isAuthenticated} isSaving={isSaving} lastSaved={lastSaved} />
      </div>

      {/* ---------- PILLAR TABS ---------- */}
      <section
        style={{
          padding: "0 48px 56px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* tab bar */}
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "2px solid var(--border)",
              marginBottom: 0,
            }}
          >
            {pillarDefs.map((p) => {
              const isActive = activeTab === p.key;
              const s = phaseStats(p.key);
              return (
                <button
                  key={p.key}
                  onClick={() => setActiveTab(p.key)}
                  style={{
                    flex: 1,
                    padding: "16px 12px 14px",
                    background: isActive ? "var(--cream)" : "transparent",
                    border: "none",
                    borderBottom: isActive
                      ? "2px solid var(--navy)"
                      : "2px solid transparent",
                    marginBottom: -2,
                    cursor: "pointer",
                    fontFamily: "var(--ui)",
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.06em",
                    color: isActive ? "var(--navy)" : "var(--text-mid)",
                    transition: "all 0.2s",
                    textAlign: "center" as const,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>{p.name}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color:
                        s.pct === 100
                          ? "#27AE60"
                          : isActive
                            ? "var(--gold)"
                            : "#9A9080",
                      fontWeight: 500,
                    }}
                  >
                    {s.done}/{s.total}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* tab content */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderTop: "none",
            background: "var(--cream)",
            padding: "32px 32px 36px",
          }}
        >
          {/* pillar header */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                }}
              >
                {activePillar.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "var(--navy)",
                }}
              >
                {activePillar.name}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 14,
                color: "var(--text-mid)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {activePillar.focus}
            </p>
          </div>

          {/* actions list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 10,
              marginBottom: 24,
            }}
          >
            {activePhaseData.actions.length === 0 && (
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  color: "#9A9080",
                  fontStyle: "italic",
                  padding: "20px 0",
                  margin: 0,
                }}
              >
                No actions yet. Add your first sponsor action below.
              </p>
            )}

            {activePhaseData.actions.map((action, idx) => (
              <div
                key={action.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "16px 20px",
                  border: "1px solid var(--border)",
                  background:
                    action.status === "complete"
                      ? "rgba(39,174,96,0.04)"
                      : "#fff",
                  transition: "all 0.2s",
                }}
              >
                {/* index number */}
                <span
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#9A9080",
                    minWidth: 20,
                    paddingTop: 2,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* action text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 14,
                      color:
                        action.status === "complete"
                          ? "var(--text-mid)"
                          : "var(--navy)",
                      lineHeight: 1.65,
                      margin: "0 0 10px 0",
                      textDecoration:
                        action.status === "complete"
                          ? "line-through"
                          : "none",
                      opacity: action.status === "complete" ? 0.7 : 1,
                    }}
                  >
                    {action.action}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap" as const,
                    }}
                  >
                    <StatusBadge
                      status={action.status}
                      onClick={() => toggleActionStatus(activeTab, action.id)}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          color: "#9A9080",
                        }}
                      >
                        Due:
                      </span>
                      <input
                        type="date"
                        value={action.dueDate}
                        onChange={(e) =>
                          updateActionDueDate(
                            activeTab,
                            action.id,
                            e.target.value
                          )
                        }
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 12,
                          color: "var(--navy)",
                          border: "1px solid var(--border)",
                          background: "transparent",
                          padding: "3px 8px",
                          cursor: "pointer",
                        }}
                      />
                    </div>

                    <button
                      onClick={() => removeAction(activeTab, action.id)}
                      title="Remove action"
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        color: "#9A9080",
                        padding: "2px 6px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#C0392B")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9A9080")
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* add new action */}
          <div
            style={{
              padding: "20px",
              border: "1px dashed var(--border)",
              background: "rgba(10,22,40,0.02)",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#9A9080",
                marginBottom: 12,
              }}
            >
              Add Custom Action
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Describe the sponsor action..."
                  value={newActionText[activeTab]}
                  onChange={(e) =>
                    setNewActionText((prev) => ({
                      ...prev,
                      [activeTab]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addAction(activeTab);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    background: "#fff",
                    fontFamily: "var(--ui)",
                    fontSize: 14,
                    color: "var(--navy)",
                    outline: "none",
                  }}
                />
              </div>
              <button
                onClick={() => addAction(activeTab)}
                style={{
                  padding: "10px 20px",
                  background: "var(--navy)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--navy)")
                }
              >
                Add Action
              </button>
            </div>
          </div>

          {/* notes */}
          <div>
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#9A9080",
                marginBottom: 10,
              }}
            >
              Notes for {activePillar.name}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <textarea
                rows={4}
                placeholder={`Add notes about ${activePillar.name.toLowerCase()} phase sponsorship activities, observations, or reminders...`}
                value={activePhaseData.notes}
                onChange={(e) => updateNotes(activeTab, e.target.value)}
                style={{ minHeight: 100 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ROADMAP SUMMARY ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "56px 48px",
            maxWidth: 900,
            margin: "0 auto",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--ui)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: "#9A9080",
              marginBottom: 10,
            }}
          >
            Roadmap Summary
          </div>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: 32,
              fontWeight: 500,
              color: "var(--navy)",
              marginBottom: 8,
            }}
          >
            {roadmap.projectName || "Untitled Sponsor Roadmap"}
          </h2>
          {(roadmap.sponsorName || roadmap.createdBy) && (
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 28,
              }}
            >
              {roadmap.sponsorName && <>Sponsor: {roadmap.sponsorName}</>}
              {roadmap.sponsorName && roadmap.createdBy && <> &middot; </>}
              {roadmap.createdBy && <>Prepared by {roadmap.createdBy}</>}
            </p>
          )}

          {/* overall badge */}
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background:
                completedActions === totalActions && totalActions > 0
                  ? "#27AE60"
                  : "var(--navy)",
              color: "#fff",
              fontFamily: "var(--ui)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              marginBottom: 36,
            }}
          >
            {completedActions === totalActions && totalActions > 0
              ? "Roadmap Complete"
              : `${completedActions} of ${totalActions} actions complete (${overallPct}%)`}
          </div>

          {/* per-pillar summary */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 0,
            }}
          >
            {pillarDefs.map((p) => {
              const phase = roadmap.phases[p.key];
              const s = phaseStats(p.key);

              return (
                <div
                  key={p.key}
                  style={{
                    padding: "28px 0",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        color: "var(--gold)",
                      }}
                    >
                      {p.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 22,
                        fontWeight: 600,
                        color: "var(--navy)",
                        flex: 1,
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        fontWeight: 500,
                        color:
                          s.pct === 100 ? "#27AE60" : "var(--text-mid)",
                      }}
                    >
                      {s.done}/{s.total} complete
                    </span>
                  </div>

                  {/* mini progress bar */}
                  <div
                    style={{
                      height: 4,
                      background: "var(--border)",
                      overflow: "hidden",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${s.pct}%`,
                        background:
                          s.pct === 100 ? "#27AE60" : "var(--gold)",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>

                  {/* action list in summary */}
                  {phase.actions.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column" as const,
                        gap: 6,
                      }}
                    >
                      {phase.actions.map((action) => (
                        <div
                          key={action.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: statusColours[action.status],
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 13,
                              color:
                                action.status === "complete"
                                  ? "var(--text-mid)"
                                  : "var(--navy)",
                              textDecoration:
                                action.status === "complete"
                                  ? "line-through"
                                  : "none",
                              opacity:
                                action.status === "complete" ? 0.65 : 1,
                              flex: 1,
                              lineHeight: 1.6,
                            }}
                          >
                            {action.action}
                          </span>
                          {action.dueDate && (
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 11,
                                color: "#9A9080",
                                whiteSpace: "nowrap" as const,
                              }}
                            >
                              {action.dueDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        color: "#9A9080",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      No actions defined for this phase.
                    </p>
                  )}

                  {/* notes in summary */}
                  {phase.notes.trim() && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: "12px 16px",
                        background: "rgba(10,22,40,0.03)",
                        borderLeft: "3px solid var(--gold)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--text-mid)",
                          lineHeight: 1.7,
                          whiteSpace: "pre-wrap" as const,
                          margin: 0,
                        }}
                      >
                        {phase.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- RELATED KNOWLEDGE ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "40px 48px 56px",
            maxWidth: 900,
            margin: "0 auto",
            borderTop: "1px solid var(--border)",
            textAlign: "center" as const,
          }}
        >
          <p
            style={{
              fontFamily: "var(--ui)",
              fontSize: 14,
              color: "var(--text-mid)",
              marginBottom: 20,
              lineHeight: 1.7,
            }}
          >
            Learn what genuine executive sponsorship looks like at each phase of
            the change journey, with real-world case studies and a readiness
            checklist.
          </p>
          <Link href="/knowledge/building-sponsorship" className="btn">
            Related Knowledge: Building Sponsorship
          </Link>
        </section>
      </ScrollReveal>

      <Footer />
    </>
  );
}
