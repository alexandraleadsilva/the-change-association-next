"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    setStakeholders((prev) => [...prev, { ...form, id: generateId() }]);
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
            href="/knowledge"
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
            &larr; Back to Knowledge Hub
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

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Add Stakeholder Toggle ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
                flexWrap: "wrap",
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
                Stakeholders
                {stakeholders.length > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "var(--text-mid)",
                      marginLeft: 12,
                    }}
                  >
                    ({stakeholders.length})
                  </span>
                )}
              </h2>
              <button
                className="btn"
                onClick={() => {
                  setShowForm(!showForm);
                  setFormError("");
                }}
              >
                {showForm ? "Cancel" : "+ Add Stakeholder"}
              </button>
            </div>

            {/* ---- Add Stakeholder Form ---- */}
            {showForm && (
              <div
                style={{
                  background: "rgba(10,22,40,0.02)",
                  border: "1px solid var(--border)",
                  padding: 28,
                  marginBottom: 32,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginBottom: 20,
                  }}
                >
                  New Stakeholder
                </h3>

                {/* Row 1: Name + Role */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sh-name">Name</label>
                    <input
                      id="sh-name"
                      type="text"
                      placeholder="e.g. Sarah Chen"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sh-role">Role / Group</label>
                    <input
                      id="sh-role"
                      type="text"
                      placeholder="e.g. Head of Operations"
                      value={form.role}
                      onChange={(e) => updateField("role", e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2: Ring + Influence */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sh-ring">Stakeholder Ring</label>
                    <select
                      id="sh-ring"
                      value={form.ring}
                      onChange={(e) =>
                        updateField("ring", e.target.value as Stakeholder["ring"])
                      }
                    >
                      <option value="decision-maker">Decision Maker</option>
                      <option value="influencer">Influencer</option>
                      <option value="impacted">Impacted</option>
                      <option value="peripheral">Peripheral</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sh-influence">Influence Level</label>
                    <select
                      id="sh-influence"
                      value={form.influence}
                      onChange={(e) =>
                        updateField(
                          "influence",
                          e.target.value as Stakeholder["influence"]
                        )
                      }
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Current Position + Target Position */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sh-current">Current Position</label>
                    <select
                      id="sh-current"
                      value={form.currentPosition}
                      onChange={(e) =>
                        updateField(
                          "currentPosition",
                          e.target.value as Stakeholder["currentPosition"]
                        )
                      }
                    >
                      <option value="champion">Champion</option>
                      <option value="supporter">Supporter</option>
                      <option value="neutral">Neutral</option>
                      <option value="resistant">Resistant</option>
                      <option value="blocker">Blocker</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sh-target">Target Position</label>
                    <select
                      id="sh-target"
                      value={form.targetPosition}
                      onChange={(e) =>
                        updateField(
                          "targetPosition",
                          e.target.value as Stakeholder["targetPosition"]
                        )
                      }
                    >
                      <option value="champion">Champion</option>
                      <option value="supporter">Supporter</option>
                      <option value="neutral">Neutral</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Impact */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sh-impact">Impact Level</label>
                    <select
                      id="sh-impact"
                      value={form.impact}
                      onChange={(e) =>
                        updateField(
                          "impact",
                          e.target.value as Stakeholder["impact"]
                        )
                      }
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="form-group" />
                </div>

                {/* Row 5: Engagement Action */}
                <div className="form-group">
                  <label htmlFor="sh-action">Engagement Action</label>
                  <textarea
                    id="sh-action"
                    placeholder="What specific actions will you take to move this stakeholder to their target position?"
                    value={form.engagementAction}
                    onChange={(e) =>
                      updateField("engagementAction", e.target.value)
                    }
                    style={{ minHeight: 90 }}
                  />
                </div>

                {/* Row 6: Notes */}
                <div className="form-group">
                  <label htmlFor="sh-notes">Notes</label>
                  <textarea
                    id="sh-notes"
                    placeholder="Any additional context, concerns, or relationship dynamics."
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    style={{ minHeight: 70 }}
                  />
                </div>

                {formError && (
                  <p
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 13,
                      color: "#C62828",
                      marginBottom: 14,
                    }}
                  >
                    {formError}
                  </p>
                )}

                <button className="btn-gold" onClick={addStakeholder}>
                  Add Stakeholder
                </button>
              </div>
            )}

            {/* ---- Stakeholder Cards ---- */}
            {stakeholders.length === 0 && !showForm && (
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 14,
                  color: "var(--text-mid)",
                  lineHeight: 1.7,
                  padding: "32px 0",
                  textAlign: "center",
                  border: "1px dashed var(--border)",
                }}
              >
                No stakeholders added yet. Click &ldquo;+ Add Stakeholder&rdquo;
                to begin building your map.
              </p>
            )}

            {stakeholders.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {stakeholders.map((s) => {
                  const needsMovement = s.currentPosition !== s.targetPosition;
                  return (
                    <div
                      key={s.id}
                      style={{
                        background: POSITION_BG[s.currentPosition],
                        border: "1px solid var(--border)",
                        borderLeft: `4px solid ${POSITION_COLOURS[s.currentPosition]}`,
                        padding: "20px 24px",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                        position: "relative",
                      }}
                    >
                      {/* Top row: name, role, ring badge, delete */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: 12,
                          flexWrap: "wrap",
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 180 }}>
                          <div
                            style={{
                              fontFamily: "var(--serif)",
                              fontSize: 19,
                              fontWeight: 600,
                              color: "var(--navy)",
                              marginBottom: 2,
                            }}
                          >
                            {s.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 13,
                              color: "var(--text-mid)",
                            }}
                          >
                            {s.role}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexShrink: 0,
                          }}
                        >
                          {/* Ring badge */}
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "var(--gold)",
                              padding: "4px 10px",
                              border: "1px solid var(--gold)",
                            }}
                          >
                            {RING_LABELS[s.ring]}
                          </span>

                          {/* Influence badge */}
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.10em",
                              textTransform: "uppercase",
                              color: "var(--text-mid)",
                              padding: "4px 10px",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {INFLUENCE_LABELS[s.influence]} Influence
                          </span>

                          {/* Impact badge */}
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.10em",
                              textTransform: "uppercase",
                              color: "var(--text-mid)",
                              padding: "4px 10px",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {INFLUENCE_LABELS[s.impact]} Impact
                          </span>

                          {/* Delete */}
                          <button
                            onClick={() => removeStakeholder(s.id)}
                            aria-label={`Remove ${s.name}`}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "var(--ui)",
                              fontSize: 16,
                              color: "#9A9080",
                              padding: "4px 8px",
                              transition: "color 0.2s",
                              lineHeight: 1,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#C62828")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#9A9080")
                            }
                          >
                            &times;
                          </button>
                        </div>
                      </div>

                      {/* Position row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: s.engagementAction ? 12 : 0,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            fontWeight: 500,
                            color: POSITION_COLOURS[s.currentPosition],
                            padding: "3px 10px",
                            background: "rgba(255,255,255,0.6)",
                            border: `1px solid ${POSITION_COLOURS[s.currentPosition]}`,
                          }}
                        >
                          {POSITION_LABELS[s.currentPosition]}
                        </span>

                        {needsMovement && (
                          <>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 14,
                                color: "var(--gold)",
                                fontWeight: 600,
                              }}
                            >
                              &rarr;
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 12,
                                fontWeight: 500,
                                color: "#2E7D32",
                                padding: "3px 10px",
                                background: "rgba(46,125,50,0.08)",
                                border: "1px solid #2E7D32",
                              }}
                            >
                              {TARGET_LABELS[s.targetPosition]}
                            </span>
                          </>
                        )}

                        {!needsMovement && (
                          <span
                            style={{
                              fontFamily: "var(--ui)",
                              fontSize: 11,
                              color: "var(--text-mid)",
                              fontStyle: "italic",
                            }}
                          >
                            Already at target
                          </span>
                        )}
                      </div>

                      {/* Engagement action */}
                      {s.engagementAction && (
                        <div
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "var(--text-dark)",
                            lineHeight: 1.6,
                            padding: "10px 14px",
                            background: "rgba(255,255,255,0.5)",
                            borderLeft: "2px solid var(--gold)",
                            marginTop: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--gold)",
                              display: "block",
                              marginBottom: 4,
                            }}
                          >
                            Engagement Action
                          </span>
                          {s.engagementAction}
                        </div>
                      )}

                      {/* Notes */}
                      {s.notes && (
                        <div
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            color: "var(--text-mid)",
                            lineHeight: 1.6,
                            marginTop: 8,
                            fontStyle: "italic",
                          }}
                        >
                          {s.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* ---- Visual Summary ---- */}
        {stakeholders.length > 0 && (
          <>
            <hr className="section-divider" style={{ marginBottom: 48 }} />

            <ScrollReveal>
              <section style={{ marginBottom: 48 }}>
                <h2
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 26,
                    fontWeight: 400,
                    color: "var(--navy)",
                    marginBottom: 28,
                  }}
                >
                  Summary
                </h2>

                {/* Summary Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 20,
                    marginBottom: 28,
                  }}
                >
                  {/* Count by Ring */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      padding: "22px 24px",
                      background: "rgba(10,22,40,0.02)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 16,
                      }}
                    >
                      By Stakeholder Ring
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {(
                        [
                          "decision-maker",
                          "influencer",
                          "impacted",
                          "peripheral",
                        ] as Stakeholder["ring"][]
                      ).map((ring) => {
                        const count = countByRing(ring);
                        return (
                          <div
                            key={ring}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "6px 0",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 13,
                                color: "var(--text-dark)",
                              }}
                            >
                              {RING_LABELS[ring]}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 14,
                                fontWeight: 600,
                                color: count > 0 ? "var(--navy)" : "#9A9080",
                              }}
                            >
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Count by Current Position */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      padding: "22px 24px",
                      background: "rgba(10,22,40,0.02)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 16,
                      }}
                    >
                      By Current Position
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {(
                        [
                          "champion",
                          "supporter",
                          "neutral",
                          "resistant",
                          "blocker",
                        ] as Stakeholder["currentPosition"][]
                      ).map((pos) => {
                        const count = countByPosition(pos);
                        return (
                          <div
                            key={pos}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "6px 0",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontFamily: "var(--ui)",
                                fontSize: 13,
                                color: "var(--text-dark)",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  background: POSITION_COLOURS[pos],
                                  flexShrink: 0,
                                }}
                              />
                              {POSITION_LABELS[pos]}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--ui)",
                                fontSize: 14,
                                fontWeight: 600,
                                color: count > 0 ? "var(--navy)" : "#9A9080",
                              }}
                            >
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Movement Needed */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      padding: "22px 24px",
                      background: "rgba(10,22,40,0.02)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 16,
                      }}
                    >
                      Movement Needed
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          padding: "16px 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: 42,
                            fontWeight: 600,
                            color:
                              movementNeeded > 0 ? "var(--navy)" : "#2E7D32",
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {movementNeeded}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            color: "var(--text-mid)",
                          }}
                        >
                          of {stakeholders.length} stakeholder
                          {stakeholders.length !== 1 ? "s" : ""} need
                          {movementNeeded === 1 ? "s" : ""} to move
                        </div>
                      </div>

                      {/* Movement breakdown */}
                      {stakeholders
                        .filter(
                          (s) => s.currentPosition !== s.targetPosition
                        )
                        .map((s) => (
                          <div
                            key={s.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: 12,
                              fontFamily: "var(--ui)",
                              color: "var(--text-dark)",
                              flexWrap: "wrap",
                            }}
                          >
                            <span style={{ fontWeight: 500, minWidth: 80 }}>
                              {s.name}
                            </span>
                            <span
                              style={{
                                color: POSITION_COLOURS[s.currentPosition],
                                fontWeight: 500,
                              }}
                            >
                              {POSITION_LABELS[s.currentPosition]}
                            </span>
                            <span style={{ color: "var(--gold)" }}>
                              &rarr;
                            </span>
                            <span
                              style={{ color: "#2E7D32", fontWeight: 500 }}
                            >
                              {TARGET_LABELS[s.targetPosition]}
                            </span>
                          </div>
                        ))}

                      {movementNeeded === 0 && (
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "#2E7D32",
                            fontWeight: 500,
                            textAlign: "center",
                          }}
                        >
                          All stakeholders are at their target position.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </>
        )}

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

      <Footer />
    </>
  );
}
