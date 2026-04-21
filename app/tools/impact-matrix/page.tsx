"use client";

import { useState, useCallback, useMemo, Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { ProjectSelector } from "@/components/ProjectSelector";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

interface ImpactGroup {
  id: string;
  name: string;
  headcount: string;
  impacts: {
    roleChange: number;
    processChange: number;
    systemChange: number;
    skillChange: number;
    locationChange: number;
  };
  overallImpact: "low" | "medium" | "high" | "very-high";
  readiness: "not-assessed" | "low" | "medium" | "high";
  notes: string;
}

interface ImpactMatrix {
  projectName: string;
  createdBy: string;
  groups: ImpactGroup[];
}

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                          */
/* ------------------------------------------------------------------ */

type DimensionKey = keyof ImpactGroup["impacts"];

const DIMENSIONS: { key: DimensionKey; label: string; short: string }[] = [
  { key: "roleChange", label: "Role Change", short: "Role" },
  { key: "processChange", label: "Process Change", short: "Process" },
  { key: "systemChange", label: "System Change", short: "System" },
  { key: "skillChange", label: "Skill Change", short: "Skill" },
  { key: "locationChange", label: "Location Change", short: "Location" },
];

const SCORE_LABELS: Record<number, string> = {
  1: "No Change",
  2: "Minor Change",
  3: "Moderate Change",
  4: "Significant Change",
  5: "Fundamental Change",
};

const READINESS_OPTIONS: { value: ImpactGroup["readiness"]; label: string }[] =
  [
    { value: "not-assessed", label: "Not Assessed" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function calcOverallImpact(
  impacts: ImpactGroup["impacts"]
): ImpactGroup["overallImpact"] {
  const avg =
    (impacts.roleChange +
      impacts.processChange +
      impacts.systemChange +
      impacts.skillChange +
      impacts.locationChange) /
    5;
  if (avg <= 1.5) return "low";
  if (avg <= 2.5) return "medium";
  if (avg <= 3.5) return "high";
  return "very-high";
}

function avgScore(impacts: ImpactGroup["impacts"]): number {
  return (
    (impacts.roleChange +
      impacts.processChange +
      impacts.systemChange +
      impacts.skillChange +
      impacts.locationChange) /
    5
  );
}

function scoreColour(score: number): string {
  if (score <= 1) return "#27AE60";
  if (score <= 1.5) return "#6BBF59";
  if (score <= 2) return "#A3C940";
  if (score <= 2.5) return "#D4A017";
  if (score <= 3) return "#E08A20";
  if (score <= 3.5) return "#D96A30";
  if (score <= 4) return "#D04A3A";
  return "#C0392B";
}

function scoreBg(score: number): string {
  if (score <= 1) return "rgba(39,174,96,0.12)";
  if (score <= 2) return "rgba(163,201,64,0.14)";
  if (score <= 3) return "rgba(212,160,23,0.14)";
  if (score <= 4) return "rgba(208,74,58,0.12)";
  return "rgba(192,57,43,0.16)";
}

function impactLabel(impact: ImpactGroup["overallImpact"]): string {
  const map: Record<ImpactGroup["overallImpact"], string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    "very-high": "Very High",
  };
  return map[impact];
}

function impactBadgeColour(impact: ImpactGroup["overallImpact"]): string {
  const map: Record<ImpactGroup["overallImpact"], string> = {
    low: "#27AE60",
    medium: "#D4A017",
    high: "#D96A30",
    "very-high": "#C0392B",
  };
  return map[impact];
}

function readinessLabel(r: ImpactGroup["readiness"]): string {
  const map: Record<ImpactGroup["readiness"], string> = {
    "not-assessed": "Not Assessed",
    low: "Low",
    medium: "Medium",
    high: "High",
  };
  return map[r];
}

function readinessColour(r: ImpactGroup["readiness"]): string {
  const map: Record<ImpactGroup["readiness"], string> = {
    "not-assessed": "#9A9080",
    low: "#C0392B",
    medium: "#D4A017",
    high: "#27AE60",
  };
  return map[r];
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyGroup(): ImpactGroup {
  return {
    id: uid(),
    name: "",
    headcount: "",
    impacts: {
      roleChange: 1,
      processChange: 1,
      systemChange: 1,
      skillChange: 1,
      locationChange: 1,
    },
    overallImpact: "low",
    readiness: "not-assessed",
    notes: "",
  };
}

/* ------------------------------------------------------------------ */
/*  INLINE STYLE TOKENS (reused across the page)                       */
/* ------------------------------------------------------------------ */

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--ui)",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#9A9080",
};

const panelStyle: React.CSSProperties = {
  padding: "28px 32px",
  border: "1px solid var(--border)",
  background: "var(--cream)",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ImpactMatrixPage() {
  /* ---- state ---- */
  const [matrix, setMatrix] = useState<ImpactMatrix>({
    projectName: "",
    createdBy: "",
    groups: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ImpactGroup>(emptyGroup());
  const [heatmapView, setHeatmapView] = useState(false);

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<ImpactMatrix>({
    toolType: "impact-matrix",
    defaultData: { projectName: "", createdBy: "", groups: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setMatrix(savedData);
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
    saveToDb(matrix);
  }, [matrix]);

  /* ---- derived ---- */
  const totalHeadcount = useMemo(
    () =>
      matrix.groups.reduce((sum, g) => {
        const n = parseInt(g.headcount, 10);
        return sum + (isNaN(n) ? 0 : n);
      }, 0),
    [matrix.groups]
  );

  const highestImpactGroup = useMemo(() => {
    if (matrix.groups.length === 0) return null;
    return matrix.groups.reduce((best, g) =>
      avgScore(g.impacts) > avgScore(best.impacts) ? g : best
    );
  }, [matrix.groups]);

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "createdBy", value: string) => {
      setMatrix((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const openAddModal = useCallback(() => {
    setEditId(null);
    setDraft(emptyGroup());
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback(
    (group: ImpactGroup) => {
      setEditId(group.id);
      setDraft({ ...group, impacts: { ...group.impacts } });
      setModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditId(null);
  }, []);

  const updateDraftField = useCallback(
    (field: "name" | "headcount" | "notes", value: string) => {
      setDraft((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateDraftDimension = useCallback(
    (key: DimensionKey, value: number) => {
      setDraft((prev) => {
        const impacts = { ...prev.impacts, [key]: value };
        return {
          ...prev,
          impacts,
          overallImpact: calcOverallImpact(impacts),
        };
      });
    },
    []
  );

  const updateDraftReadiness = useCallback(
    (value: ImpactGroup["readiness"]) => {
      setDraft((prev) => ({ ...prev, readiness: value }));
    },
    []
  );

  const saveGroup = useCallback(() => {
    if (!draft.name.trim()) return;
    const group = {
      ...draft,
      overallImpact: calcOverallImpact(draft.impacts),
    };
    if (editId) {
      setMatrix((prev) => ({
        ...prev,
        groups: prev.groups.map((g) => (g.id === editId ? group : g)),
      }));
    } else {
      setMatrix((prev) => ({
        ...prev,
        groups: [...prev.groups, group],
      }));
    }
    closeModal();
  }, [draft, editId, closeModal]);

  const removeGroup = useCallback(
    (id: string) => {
      setMatrix((prev) => ({
        ...prev,
        groups: prev.groups.filter((g) => g.id !== id),
      }));
      if (editId === id) closeModal();
    },
    [editId, closeModal]
  );

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
        <span className="article-label">TCA TOOL</span>
        <h1 className="article-title">Change Impact Matrix</h1>
        <p className="article-intro">
          Map the impact of change across every stakeholder group. Score five
          dimensions of impact on a 1&ndash;5 scale, visualise the results in a
          colour-coded matrix, and identify the groups that will need the most
          support during the transition.
        </p>
      </header>

      {/* ---------- PROJECT INFO ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 40px",
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          <div style={panelStyle}>
            <div style={{ ...labelStyle, marginBottom: 20 }}>
              Project Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <ProjectSelector value={matrix.projectName} onChange={(val: string) => updateField("projectName", val)} isAuthenticated={isAuthenticated} />
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Created By</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith, Change Lead"
                  value={matrix.createdBy}
                  onChange={(e) => updateField("createdBy", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>


      {/* ---------- ADD GROUP BUTTON ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 32px",
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={labelStyle}>
            Impact Groups ({matrix.groups.length})
          </div>
          <button
            className="btn"
            onClick={openAddModal}
            style={{ fontSize: 13 }}
          >
            + Add Group
          </button>
        </section>
      </ScrollReveal>

      {/* ---------- IMPACT MATRIX TABLE ---------- */}
      {matrix.groups.length > 0 && (
        <ScrollReveal>
          <section
            style={{
              padding: "0 48px 48px",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                overflowX: "auto",
                border: "1px solid var(--border)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  minWidth: 780,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "var(--navy)",
                      color: "#fff",
                    }}
                  >
                    <th style={thStyle}>Group</th>
                    <th style={{ ...thStyle, textAlign: "center" }}>
                      Headcount
                    </th>
                    {DIMENSIONS.map((d) => (
                      <th
                        key={d.key}
                        style={{ ...thStyle, textAlign: "center" }}
                      >
                        {d.short}
                      </th>
                    ))}
                    <th style={{ ...thStyle, textAlign: "center" }}>
                      Overall
                    </th>
                    <th style={{ ...thStyle, textAlign: "center" }}>
                      Readiness
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.groups.map((group, idx) => {
                    const avg = avgScore(group.impacts);
                    return (
                      <tr
                        key={group.id}
                        onClick={() => openEditModal(group)}
                        style={{
                          background:
                            idx % 2 === 0
                              ? "var(--cream)"
                              : "var(--cream-lt)",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "rgba(196,148,58,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background =
                            idx % 2 === 0
                              ? "var(--cream)"
                              : "var(--cream-lt)";
                        }}
                      >
                        <td style={tdStyle}>
                          <span
                            style={{
                              fontWeight: 500,
                              color: "var(--navy)",
                            }}
                          >
                            {group.name}
                          </span>
                        </td>
                        <td
                          style={{
                            ...tdStyle,
                            textAlign: "center",
                          }}
                        >
                          {group.headcount || "\u2014"}
                        </td>
                        {DIMENSIONS.map((d) => {
                          const val = group.impacts[d.key];
                          return (
                            <td
                              key={d.key}
                              style={{
                                ...tdStyle,
                                textAlign: "center",
                                background: scoreBg(val),
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 28,
                                  height: 28,
                                  borderRadius: "50%",
                                  background: scoreColour(val),
                                  color: "#fff",
                                  fontWeight: 600,
                                  fontSize: 12,
                                }}
                              >
                                {val}
                              </span>
                            </td>
                          );
                        })}
                        {/* overall */}
                        <td
                          style={{
                            ...tdStyle,
                            textAlign: "center",
                            background: scoreBg(avg),
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 12px",
                              borderRadius: 2,
                              background: impactBadgeColour(
                                group.overallImpact
                              ),
                              color: "#fff",
                              fontSize: 11,
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {impactLabel(group.overallImpact)}
                          </span>
                        </td>
                        {/* readiness */}
                        <td
                          style={{
                            ...tdStyle,
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 12px",
                              borderRadius: 2,
                              border: `1.5px solid ${readinessColour(
                                group.readiness
                              )}`,
                              color: readinessColour(group.readiness),
                              fontSize: 11,
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {readinessLabel(group.readiness)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 11,
                color: "#9A9080",
                marginTop: 10,
              }}
            >
              Click any row to edit or remove the group.
            </p>
          </section>
        </ScrollReveal>
      )}

      {/* ---------- EMPTY STATE ---------- */}
      {matrix.groups.length === 0 && (
        <ScrollReveal>
          <section
            style={{
              padding: "0 48px 48px",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                ...panelStyle,
                textAlign: "center",
                padding: "56px 32px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 22,
                  color: "var(--navy)",
                  marginBottom: 8,
                }}
              >
                No groups added yet
              </p>
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 14,
                  color: "var(--text-mid)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Add your first stakeholder group to begin building the impact
                matrix. Each group represents a distinct population affected by
                the change.
              </p>
              <button className="btn" onClick={openAddModal}>
                + Add First Group
              </button>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ---------- HEATMAP VIEW ---------- */}
      {matrix.groups.length > 0 && (
        <ScrollReveal>
          <section
            style={{
              padding: "0 48px 48px",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={labelStyle}>Heatmap View</div>
              <button
                className="btn-outline"
                onClick={() => setHeatmapView((p) => !p)}
                style={{ fontSize: 12, padding: "8px 18px" }}
              >
                {heatmapView ? "Hide Heatmap" : "Show Heatmap"}
              </button>
            </div>
            {heatmapView && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `120px repeat(${DIMENSIONS.length}, 1fr)`,
                  gap: 3,
                }}
              >
                {/* header row */}
                <div />
                {DIMENSIONS.map((d) => (
                  <div
                    key={d.key}
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-mid)",
                      textAlign: "center",
                      padding: "8px 4px",
                    }}
                  >
                    {d.short}
                  </div>
                ))}

                {/* data rows */}
                {matrix.groups.map((group) => (
                  <Fragment key={group.id}>
                    <div
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--navy)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {group.name}
                    </div>
                    {DIMENSIONS.map((d) => {
                      const val = group.impacts[d.key];
                      return (
                        <div
                          key={`${group.id}-${d.key}`}
                          style={{
                            background: scoreColour(val),
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--ui)",
                            fontSize: 14,
                            fontWeight: 600,
                            padding: "14px 0",
                            minHeight: 48,
                          }}
                        >
                          {val}
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>
      )}

      {/* ---------- SUMMARY ---------- */}
      {matrix.groups.length > 0 && (
        <ScrollReveal>
          <section
            style={{
              padding: "48px 48px 56px",
              maxWidth: 960,
              margin: "0 auto",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div style={{ ...labelStyle, marginBottom: 10 }}>
              Impact Summary
            </div>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 32,
                fontWeight: 500,
                color: "var(--navy)",
                marginBottom: 32,
              }}
            >
              {matrix.projectName || "Untitled Project"}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {/* Total Groups */}
              <div style={panelStyle}>
                <div style={{ ...labelStyle, marginBottom: 12 }}>
                  Total Groups
                </div>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 36,
                    fontWeight: 500,
                    color: "var(--navy)",
                  }}
                >
                  {matrix.groups.length}
                </span>
              </div>

              {/* Total Headcount */}
              <div style={panelStyle}>
                <div style={{ ...labelStyle, marginBottom: 12 }}>
                  Total Headcount Affected
                </div>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 36,
                    fontWeight: 500,
                    color: "var(--navy)",
                  }}
                >
                  {totalHeadcount > 0
                    ? totalHeadcount.toLocaleString()
                    : "\u2014"}
                </span>
              </div>

              {/* Highest Impact */}
              <div style={panelStyle}>
                <div style={{ ...labelStyle, marginBottom: 12 }}>
                  Highest Impact Group
                </div>
                {highestImpactGroup && (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 22,
                        fontWeight: 500,
                        color: "var(--navy)",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {highestImpactGroup.name}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: 2,
                        background: impactBadgeColour(
                          highestImpactGroup.overallImpact
                        ),
                        color: "#fff",
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {impactLabel(highestImpactGroup.overallImpact)} Impact
                      (avg {avgScore(highestImpactGroup.impacts).toFixed(1)})
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Per-group summary cards */}
            <div style={{ ...labelStyle, marginBottom: 16 }}>
              Group Details
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {matrix.groups.map((group) => {
                const avg = avgScore(group.impacts);
                return (
                  <div
                    key={group.id}
                    style={{
                      ...panelStyle,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 16,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 18,
                          fontWeight: 500,
                          color: "var(--navy)",
                        }}
                      >
                        {group.name}
                      </span>
                      {group.headcount && (
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            color: "var(--text-mid)",
                            marginLeft: 12,
                          }}
                        >
                          ~{group.headcount} people
                        </span>
                      )}
                      {group.notes && (
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "var(--text-mid)",
                            lineHeight: 1.6,
                            marginTop: 6,
                          }}
                        >
                          {group.notes}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 2,
                          background: impactBadgeColour(
                            group.overallImpact
                          ),
                          color: "#fff",
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {impactLabel(group.overallImpact)} ({avg.toFixed(1)})
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 2,
                          border: `1.5px solid ${readinessColour(
                            group.readiness
                          )}`,
                          color: readinessColour(group.readiness),
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                        }}
                      >
                        Readiness: {readinessLabel(group.readiness)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ---------- RELATED KNOWLEDGE ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "40px 48px 56px",
            maxWidth: 960,
            margin: "0 auto",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
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
            Learn how to conduct a thorough change impact assessment and use
            these results to shape your change strategy.
          </p>
          <Link href="/knowledge/change-impact-assessment" className="btn">
            Related Knowledge: Change Impact Assessment
          </Link>
        </section>
      </ScrollReveal>

      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div
          className="modal-overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="modal"
            style={{
              maxWidth: 580,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h3 className="modal-title">
              {editId ? "Edit Group" : "Add Stakeholder Group"}
            </h3>
            <p className="modal-desc">
              {editId
                ? "Update the details and impact scores for this group."
                : "Define the stakeholder group and score the degree of change they will experience across five dimensions."}
            </p>

            <div className="modal-form">
              {/* Group Name */}
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  placeholder="e.g. Finance Team, Regional Managers"
                  value={draft.name}
                  onChange={(e) => updateDraftField("name", e.target.value)}
                />
              </div>

              {/* Headcount */}
              <div className="form-group">
                <label>Approximate Headcount</label>
                <input
                  type="text"
                  placeholder="e.g. 120"
                  value={draft.headcount}
                  onChange={(e) =>
                    updateDraftField("headcount", e.target.value)
                  }
                />
              </div>

              {/* Impact Dimensions */}
              <div
                style={{
                  ...labelStyle,
                  marginBottom: 16,
                  marginTop: 8,
                }}
              >
                Impact Dimensions (1&ndash;5)
              </div>

              {DIMENSIONS.map((d) => {
                const val = draft.impacts[d.key];
                return (
                  <div
                    key={d.key}
                    style={{
                      marginBottom: 20,
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
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text-dark)",
                        }}
                      >
                        {d.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          color: scoreColour(val),
                          fontWeight: 500,
                        }}
                      >
                        {val} &mdash; {SCORE_LABELS[val]}
                      </span>
                    </div>

                    {/* score buttons 1-5 */}
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          onClick={() =>
                            updateDraftDimension(d.key, score)
                          }
                          style={{
                            flex: 1,
                            padding: "10px 0",
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            fontWeight: val === score ? 600 : 400,
                            background:
                              val === score
                                ? scoreColour(score)
                                : "transparent",
                            color:
                              val === score ? "#fff" : "var(--text-mid)",
                            border:
                              val === score
                                ? `1.5px solid ${scoreColour(score)}`
                                : "1.5px solid rgba(100,90,70,0.25)",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Auto-calculated overall impact */}
              <div
                style={{
                  padding: "16px 18px",
                  background: "rgba(10,22,40,0.03)",
                  borderLeft: "3px solid var(--gold)",
                  marginBottom: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 13,
                    color: "var(--text-mid)",
                  }}
                >
                  Overall Impact (auto-calculated)
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 14px",
                    borderRadius: 2,
                    background: impactBadgeColour(
                      calcOverallImpact(draft.impacts)
                    ),
                    color: "#fff",
                    fontFamily: "var(--ui)",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {impactLabel(calcOverallImpact(draft.impacts))} (
                  {avgScore(draft.impacts).toFixed(1)})
                </span>
              </div>

              {/* Readiness */}
              <div className="form-group">
                <label>Readiness Level</label>
                <select
                  value={draft.readiness}
                  onChange={(e) =>
                    updateDraftReadiness(
                      e.target.value as ImpactGroup["readiness"]
                    )
                  }
                >
                  {READINESS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  rows={3}
                  placeholder="Key considerations, risks, or support requirements for this group..."
                  value={draft.notes}
                  onChange={(e) => updateDraftField("notes", e.target.value)}
                  style={{ minHeight: 80 }}
                />
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <button
                  className="btn"
                  onClick={saveGroup}
                  style={{ flex: 1, textAlign: "center" }}
                >
                  {editId ? "Update Group" : "Add Group"}
                </button>
                {editId && (
                  <button
                    className="btn-outline"
                    onClick={() => removeGroup(editId)}
                    style={{
                      borderColor: "#C0392B",
                      color: "#C0392B",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  TABLE CELL STYLES                                                  */
/* ------------------------------------------------------------------ */

const thStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontFamily: "var(--ui)",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontFamily: "var(--ui)",
  fontSize: 13,
  borderTop: "1px solid var(--border)",
  whiteSpace: "nowrap",
};
