"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

interface DimensionData {
  score: number;
  notes: string;
  items: Record<string, number>;
}

interface ReadinessAssessment {
  projectName: string;
  assessedBy: string;
  assessedDate: string;
  dimensions: {
    people: DimensionData;
    process: DimensionData;
    culture: DimensionData;
    capability: DimensionData;
    systems: DimensionData;
  };
}

type DimensionKey = keyof ReadinessAssessment["dimensions"];

/* ------------------------------------------------------------------ */
/*  DIMENSION DEFINITIONS                                              */
/* ------------------------------------------------------------------ */

interface DimensionDef {
  key: DimensionKey;
  label: string;
  description: string;
  items: { id: string; statement: string }[];
  recommendations: { low: string; mid: string };
}

const DIMENSIONS: DimensionDef[] = [
  {
    key: "people",
    label: "People",
    description:
      "Assesses whether the people affected by this change have been identified, understood, and engaged, and whether leadership credibility is sufficient to carry the change forward.",
    items: [
      { id: "people_1", statement: "Key stakeholders have been identified and their concerns are understood" },
      { id: "people_2", statement: "There is visible and active executive sponsorship for this change" },
      { id: "people_3", statement: "Impacted employees understand why the change is happening" },
      { id: "people_4", statement: "Trust between leadership and the workforce is sufficient to support the change" },
      { id: "people_5", statement: "Previous change experiences have been acknowledged and addressed" },
    ],
    recommendations: {
      low: "Your people readiness score indicates significant gaps. Before proceeding, invest in stakeholder analysis to understand who is affected and how. Ensure executive sponsors are visibly active, not just named on a slide. Address any trust deficit from previous change experiences before asking people to engage with this one. Consider holding listening sessions to surface concerns that have not been captured.",
      mid: "Your people readiness is developing but has gaps. Focus on deepening stakeholder understanding beyond surface-level mapping, what are people actually worried about? Ensure the 'why' of this change is communicated in terms that matter to those impacted, not just in strategic language. Check that sponsorship is active and sustained, not front-loaded.",
    },
  },
  {
    key: "process",
    label: "Process",
    description:
      "Evaluates whether current ways of working have been mapped honestly and whether the gap between current and future state processes is understood.",
    items: [
      { id: "process_1", statement: "Current processes have been mapped based on how work actually gets done" },
      { id: "process_2", statement: "The gap between current and future state processes has been assessed" },
      { id: "process_3", statement: "Process owners have been identified and engaged" },
      { id: "process_4", statement: "Workarounds and informal processes have been documented" },
      { id: "process_5", statement: "Handoffs between teams have been reviewed for the future state" },
    ],
    recommendations: {
      low: "Your process readiness score suggests significant work is needed. Start by mapping how work actually gets done, not the documented procedures, but the real workflows including workarounds. Identify process owners for every process the change will affect. Until you understand the current state honestly, any future state design is built on assumptions.",
      mid: "Process readiness is partially in place. Pay particular attention to informal processes and workarounds, these are often the glue that holds current operations together, and if the future state does not account for them, people will either resist or recreate them. Review handoffs between teams, as these are where most process failures occur during transitions.",
    },
  },
  {
    key: "culture",
    label: "Culture",
    description:
      "Examines whether the organisation's culture has been assessed honestly and whether the change aligns with or deliberately addresses existing cultural norms.",
    items: [
      { id: "culture_1", statement: "The current culture has been assessed beyond surveys" },
      { id: "culture_2", statement: "Behaviours that the change requires have been defined" },
      { id: "culture_3", statement: "Leadership is modelling the behaviours the change demands" },
      { id: "culture_4", statement: "Psychological safety exists for people to raise concerns" },
      { id: "culture_5", statement: "The change aligns with or deliberately addresses cultural norms" },
    ],
    recommendations: {
      low: "Your culture readiness score highlights a critical gap. Culture is the most common reason changes fail to sustain. Go beyond engagement surveys, observe how decisions are actually made, how bad news travels, and what behaviours are rewarded versus what is stated in values documents. Define the specific behaviours the change requires and assess honestly whether leadership is modelling them. If psychological safety is low, people will comply publicly and resist privately.",
      mid: "Culture readiness is emerging but needs reinforcement. Ensure the behaviours the change demands have been explicitly defined, not just values, but observable actions. Check whether leadership behaviour matches the change narrative. If the change requires collaboration but leaders compete for resources, the message is contradicted daily. Create safe channels for people to raise concerns without career risk.",
    },
  },
  {
    key: "capability",
    label: "Capability",
    description:
      "Assesses whether people have, or will have, the skills, confidence, and support to work effectively in the future state.",
    items: [
      { id: "capability_1", statement: "Specific skill gaps between current and future state have been identified" },
      { id: "capability_2", statement: "Training has been designed for behaviour change, not just knowledge transfer" },
      { id: "capability_3", statement: "Managers are equipped to support their teams through the transition" },
      { id: "capability_4", statement: "People's confidence, not just competence, has been assessed" },
      { id: "capability_5", statement: "Learning is planned close to the point of need" },
    ],
    recommendations: {
      low: "Capability readiness requires significant attention. Start by identifying the specific skill gaps the change creates, not generic training needs, but the delta between what people can do today and what the future state requires. Design learning that builds behaviour change, not just knowledge. Critically, equip managers to support their teams: managers are the most important enablers of change at the frontline, and if they are not prepared, no amount of training will compensate.",
      mid: "Capability readiness is progressing but has gaps. Check that training is designed for behaviour change, not just awareness. Consider confidence alongside competence, people may know what to do but not feel ready to do it under pressure. Ensure learning is timed close to when people will use it: training delivered months before go-live is largely forgotten by the time it matters.",
    },
  },
  {
    key: "systems",
    label: "Systems",
    description:
      "Reviews whether the technology and infrastructure changes have been assessed from the perspective of the people who will use them.",
    items: [
      { id: "systems_1", statement: "Systems that will be impacted have been inventoried" },
      { id: "systems_2", statement: "End users have been consulted on system design and usability" },
      { id: "systems_3", statement: "Data quality and readiness have been assessed" },
      { id: "systems_4", statement: "Integration dependencies have been mapped" },
      { id: "systems_5", statement: "Support mechanisms are in place for the transition period" },
    ],
    recommendations: {
      low: "Systems readiness is significantly underprepared. Before go-live, ensure every impacted system has been inventoried and that integration dependencies are mapped, missing one dependency can cascade across the organisation. Involve end users in design and usability decisions, not just in user acceptance testing at the end. Assess data quality now: dirty data in a new system creates more problems than the old system did. Plan transition support that goes beyond a helpdesk, people need floor-walking, champions, and quick-reference resources.",
      mid: "Systems readiness is partially in place. Focus on areas that are commonly under-invested: end user consultation (not just UAT sign-off), data quality assessment, and transition support. Integration dependencies are a frequent blind spot, map not just the primary systems but the downstream effects. Ensure support mechanisms are designed for the first weeks post-go-live, when demand is highest and confidence is lowest.",
    },
  },
];

const SCALE_LABELS = ["", "Not Ready", "Early Stage", "Developing", "Advanced", "Fully Ready"];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function scoreColour(score: number): string {
  if (score === 0) return "#9A9080";
  if (score <= 2) return "#C0392B";
  if (score <= 3) return "#D4880F";
  return "#27864A";
}

function scoreBg(score: number): string {
  if (score === 0) return "rgba(154,144,128,0.10)";
  if (score <= 2) return "rgba(192,57,43,0.08)";
  if (score <= 3) return "rgba(212,136,15,0.08)";
  return "rgba(39,134,74,0.08)";
}

function bandLabel(score: number): string {
  if (score === 0) return "Not Assessed";
  if (score <= 2) return "Not Ready";
  if (score <= 3) return "Developing";
  return "Ready";
}

function overallBand(score: number): { label: string; description: string } {
  if (score === 0)
    return {
      label: "Not Yet Assessed",
      description: "Complete the assessment across all five dimensions to see your overall readiness profile.",
    };
  if (score < 2)
    return {
      label: "Significant Gaps",
      description:
        "The organisation is not ready for this change in its current state. Proceeding now risks failure, resistance, and eroded trust. Address the foundational gaps identified below before setting a go-live date.",
    };
  if (score < 3)
    return {
      label: "Developing Readiness",
      description:
        "Some foundations are in place but critical gaps remain. Focus on the lowest-scoring dimensions, these represent the areas most likely to undermine the change. A phased approach with targeted interventions will reduce risk.",
    };
  if (score < 4)
    return {
      label: "Strong Readiness",
      description:
        "The organisation has solid foundations for this change. Address the specific gaps identified below to strengthen your position further. Monitor the lower-scoring dimensions closely through the transition.",
    };
  return {
    label: "Fully Ready",
    description:
      "Readiness is strong across all dimensions. Maintain momentum by continuing the practices that got you here. Use this assessment as a baseline to track any shifts during implementation.",
  };
}

function emptyDimension(): DimensionData {
  return { score: 0, notes: "", items: {} };
}

function initialAssessment(): ReadinessAssessment {
  return {
    projectName: "",
    assessedBy: "",
    assessedDate: todayISO(),
    dimensions: {
      people: emptyDimension(),
      process: emptyDimension(),
      culture: emptyDimension(),
      capability: emptyDimension(),
      systems: emptyDimension(),
    },
  };
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ReadinessAssessmentPage() {
  const [assessment, setAssessment] = useState<ReadinessAssessment>(initialAssessment);
  const [activeTab, setActiveTab] = useState<DimensionKey>("people");
  const [showResults, setShowResults] = useState(false);

  /* ---- state helpers ---- */

  function setField(field: "projectName" | "assessedBy", value: string) {
    setAssessment((prev) => ({ ...prev, [field]: value }));
  }

  function setItemScore(dim: DimensionKey, itemId: string, value: number) {
    setAssessment((prev) => {
      const dimData = { ...prev.dimensions[dim] };
      const items = { ...dimData.items, [itemId]: value };
      const def = DIMENSIONS.find((d) => d.key === dim)!;
      const values = def.items.map((it) => items[it.id] || 0);
      const answered = values.filter((v) => v > 0);
      const score = answered.length > 0 ? answered.reduce((a, b) => a + b, 0) / answered.length : 0;
      return {
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dim]: { ...dimData, items, score: Math.round(score * 100) / 100 },
        },
      };
    });
  }

  function setNotes(dim: DimensionKey, value: string) {
    setAssessment((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dim]: { ...prev.dimensions[dim], notes: value },
      },
    }));
  }

  /* ---- computed ---- */

  const overallScore = useMemo(() => {
    const scores = DIMENSIONS.map((d) => assessment.dimensions[d.key].score);
    const answered = scores.filter((s) => s > 0);
    if (answered.length === 0) return 0;
    return Math.round((answered.reduce((a, b) => a + b, 0) / answered.length) * 100) / 100;
  }, [assessment]);

  const totalAnswered = useMemo(() => {
    let count = 0;
    for (const dim of DIMENSIONS) {
      for (const item of dim.items) {
        if ((assessment.dimensions[dim.key].items[item.id] || 0) > 0) count++;
      }
    }
    return count;
  }, [assessment]);

  const sortedDimensions = useMemo(() => {
    return [...DIMENSIONS].sort(
      (a, b) => assessment.dimensions[a.key].score - assessment.dimensions[b.key].score
    );
  }, [assessment]);

  const activeDef = DIMENSIONS.find((d) => d.key === activeTab)!;

  /* ---- styles ---- */

  const styles = {
    toolWrap: {
      maxWidth: 920,
      margin: "0 auto",
      padding: "0 48px 80px",
    } as React.CSSProperties,
    projectSection: {
      display: "grid" as const,
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16,
      marginBottom: 48,
    } as React.CSSProperties,
    fieldLabel: {
      fontFamily: "var(--ui)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color: "var(--text-dark)",
      display: "block",
      marginBottom: 6,
    } as React.CSSProperties,
    fieldInput: {
      width: "100%",
      padding: "12px 14px",
      fontFamily: "var(--ui)",
      fontSize: 14,
      background: "transparent",
      border: "1px solid rgba(100,90,70,0.35)",
      color: "var(--text-dark)",
      outline: "none",
    } as React.CSSProperties,
    tabBar: {
      display: "flex",
      gap: 0,
      borderBottom: "1px solid var(--border)",
      marginBottom: 0,
      flexWrap: "wrap" as const,
    } as React.CSSProperties,
    tab: (isActive: boolean, dim: DimensionKey) => ({
      fontFamily: "var(--ui)",
      fontSize: 12,
      fontWeight: isActive ? 500 : 400,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      color: isActive ? "var(--navy)" : "var(--text-mid)",
      padding: "12px 20px 14px",
      cursor: "pointer",
      borderBottom: isActive ? "2px solid var(--navy)" : "2px solid transparent",
      marginBottom: -1,
      background: "none",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      transition: "all 0.2s",
      position: "relative" as const,
    }),
    tabDot: (score: number) => ({
      display: "inline-block",
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: scoreColour(score),
      marginLeft: 8,
      verticalAlign: "middle",
    }),
    dimHeader: {
      padding: "32px 0 24px",
    } as React.CSSProperties,
    dimTitle: {
      fontFamily: "var(--serif)",
      fontSize: 28,
      fontWeight: 500,
      color: "var(--navy)",
      marginBottom: 8,
    } as React.CSSProperties,
    dimDesc: {
      fontFamily: "var(--ui)",
      fontSize: 14,
      color: "var(--text-mid)",
      lineHeight: 1.8,
      maxWidth: 620,
    } as React.CSSProperties,
    statementRow: {
      padding: "20px 0",
      borderBottom: "1px solid var(--border)",
    } as React.CSSProperties,
    statementText: {
      fontFamily: "var(--ui)",
      fontSize: 14,
      color: "var(--text-dark)",
      lineHeight: 1.7,
      marginBottom: 12,
    } as React.CSSProperties,
    ratingRow: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      flexWrap: "wrap" as const,
    } as React.CSSProperties,
    ratingBtn: (isSelected: boolean, value: number) => ({
      fontFamily: "var(--ui)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "8px 14px",
      border: isSelected
        ? `1px solid ${scoreColour(value)}`
        : "1px solid rgba(100,90,70,0.22)",
      background: isSelected ? scoreColour(value) : "transparent",
      color: isSelected ? "#fff" : "var(--text-mid)",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap" as const,
    }),
    notesArea: {
      width: "100%",
      padding: "12px 14px",
      fontFamily: "var(--ui)",
      fontSize: 13,
      lineHeight: 1.7,
      background: "transparent",
      border: "1px solid rgba(100,90,70,0.22)",
      color: "var(--text-dark)",
      outline: "none",
      resize: "vertical" as const,
      minHeight: 80,
    } as React.CSSProperties,
    notesLabel: {
      fontFamily: "var(--ui)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      color: "#9A9080",
      display: "block",
      marginBottom: 8,
      marginTop: 24,
    } as React.CSSProperties,
    dimScore: (score: number) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--ui)",
      fontSize: 13,
      fontWeight: 500,
      color: scoreColour(score),
      marginTop: 24,
      padding: "8px 16px",
      background: scoreBg(score),
      border: `1px solid ${scoreColour(score)}20`,
    }),
    resultsSection: {
      marginTop: 56,
      paddingTop: 48,
      borderTop: "1px solid var(--border)",
    } as React.CSSProperties,
    overallCard: {
      padding: "36px 40px",
      background: "var(--navy)",
      marginBottom: 32,
    } as React.CSSProperties,
    overallLabel: {
      fontFamily: "var(--ui)",
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: "0.22em",
      textTransform: "uppercase" as const,
      color: "var(--gold)",
      display: "block",
      marginBottom: 8,
    } as React.CSSProperties,
    overallScore: {
      fontFamily: "var(--serif)",
      fontSize: 56,
      fontWeight: 400,
      color: "var(--cream)",
      lineHeight: 1,
      marginBottom: 4,
    } as React.CSSProperties,
    overallBand: {
      fontFamily: "var(--ui)",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--cream)",
      marginBottom: 12,
    } as React.CSSProperties,
    overallDesc: {
      fontFamily: "var(--ui)",
      fontSize: 14,
      color: "rgba(234,228,213,0.7)",
      lineHeight: 1.8,
      maxWidth: 620,
    } as React.CSSProperties,
    barRow: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 8,
    } as React.CSSProperties,
    barLabel: {
      fontFamily: "var(--ui)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.06em",
      color: "var(--cream)",
      width: 90,
      flexShrink: 0,
      textAlign: "right" as const,
    } as React.CSSProperties,
    barTrack: {
      flex: 1,
      height: 10,
      background: "rgba(234,228,213,0.08)",
      position: "relative" as const,
      overflow: "hidden" as const,
    } as React.CSSProperties,
    barFill: (score: number) => ({
      position: "absolute" as const,
      top: 0,
      left: 0,
      height: "100%",
      width: `${(score / 5) * 100}%`,
      background: scoreColour(score),
      transition: "width 0.6s ease",
    }),
    barScore: (score: number) => ({
      fontFamily: "var(--ui)",
      fontSize: 12,
      fontWeight: 500,
      color: scoreColour(score),
      width: 32,
      flexShrink: 0,
    }),
    breakdownCard: {
      padding: "20px 24px",
      border: "1px solid var(--border)",
      marginBottom: 8,
    } as React.CSSProperties,
    breakdownHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    } as React.CSSProperties,
    breakdownDim: {
      fontFamily: "var(--serif)",
      fontSize: 20,
      fontWeight: 600,
      color: "var(--navy)",
    } as React.CSSProperties,
    breakdownBadge: (score: number) => ({
      fontFamily: "var(--ui)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: scoreColour(score),
      padding: "4px 12px",
      background: scoreBg(score),
      border: `1px solid ${scoreColour(score)}20`,
    }),
    breakdownScore: (score: number) => ({
      fontFamily: "var(--ui)",
      fontSize: 32,
      fontWeight: 300,
      color: scoreColour(score),
      lineHeight: 1,
      marginBottom: 8,
    }),
    breakdownItems: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 4,
      marginTop: 12,
      paddingTop: 12,
      borderTop: "1px solid var(--border)",
    } as React.CSSProperties,
    breakdownItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12,
    } as React.CSSProperties,
    breakdownItemText: {
      fontFamily: "var(--ui)",
      fontSize: 13,
      color: "var(--text-mid)",
      lineHeight: 1.6,
    } as React.CSSProperties,
    breakdownItemScore: (score: number) => ({
      fontFamily: "var(--ui)",
      fontSize: 12,
      fontWeight: 500,
      color: scoreColour(score),
      flexShrink: 0,
      minWidth: 18,
      textAlign: "right" as const,
    }),
    recCard: {
      padding: "24px 28px",
      border: "1px solid var(--border)",
      borderLeft: "3px solid var(--gold)",
      marginBottom: 12,
    } as React.CSSProperties,
    recDim: {
      fontFamily: "var(--ui)",
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      color: "var(--gold)",
      display: "block",
      marginBottom: 6,
    } as React.CSSProperties,
    recTitle: {
      fontFamily: "var(--serif)",
      fontSize: 20,
      fontWeight: 600,
      color: "var(--navy)",
      marginBottom: 10,
    } as React.CSSProperties,
    recText: {
      fontFamily: "var(--ui)",
      fontSize: 14,
      color: "var(--text-mid)",
      lineHeight: 1.8,
    } as React.CSSProperties,
    relatedSection: {
      marginTop: 56,
      paddingTop: 40,
      borderTop: "1px solid var(--border)",
    } as React.CSSProperties,
    progressBar: {
      height: 3,
      background: "rgba(100,90,70,0.12)",
      marginBottom: 48,
      overflow: "hidden" as const,
    } as React.CSSProperties,
    progressFill: {
      height: "100%",
      background: "var(--gold)",
      transition: "width 0.4s ease",
    } as React.CSSProperties,
    viewResultsBtn: {
      display: "inline-block",
      background: totalAnswered === 25 ? "var(--navy)" : "rgba(10,22,40,0.25)",
      color: "#fff",
      fontFamily: "var(--ui)",
      fontSize: 13,
      fontWeight: 400,
      letterSpacing: "0.08em",
      padding: "13px 26px",
      border: "none",
      cursor: totalAnswered === 25 ? "pointer" : "default",
      transition: "background 0.2s",
      marginTop: 32,
    } as React.CSSProperties,
  };

  /* ---- responsive overrides (applied via media-query-like checks) ---- */
  /* We handle responsive via a style block at the bottom */

  return (
    <>
      <style>{`
        .ra-project-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 48px;
        }
        .ra-tab-bar {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
          flex-wrap: wrap;
        }
        .ra-tab {
          font-family: var(--ui);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-mid);
          padding: 12px 20px 14px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          transition: all 0.2s;
        }
        .ra-tab:hover { color: var(--navy); }
        .ra-tab.active {
          color: var(--navy);
          font-weight: 500;
          border-bottom-color: var(--navy);
        }
        .ra-rating-row {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }
        .ra-rating-btn {
          font-family: var(--ui);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .ra-rating-btn:hover {
          border-color: var(--navy) !important;
          color: var(--navy) !important;
        }
        .ra-bar-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
        }
        .ra-bar-label {
          font-family: var(--ui);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: var(--cream);
          width: 90px;
          flex-shrink: 0;
          text-align: right;
        }
        .ra-breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .ra-breakdown-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .ra-breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        @media (max-width: 1024px) {
          .ra-project-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .ra-project-grid {
            grid-template-columns: 1fr;
          }
          .ra-tab {
            padding: 10px 14px 12px;
            font-size: 11px;
          }
          .ra-bar-label {
            width: 70px;
            font-size: 11px;
          }
          .ra-breakdown-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .ra-breakdown-item {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>

      <Nav />

      {/* ---- HEADER ---- */}
      <header className="article-header" style={{ paddingTop: 48 }}>
        <Link href="/tools" className="article-back">
          &larr; Back to Tools
        </Link>
        <span className="article-label">Interactive Tool</span>
        <h1 className="article-title">Change Readiness Assessment</h1>
        <p className="article-intro">
          Rate your organisation across five dimensions, People, Process, Culture, Capability, and
          Systems, to identify where you are ready, where gaps exist, and what to focus on before
          go-live. This is based on the TCA current state assessment framework.
        </p>
      </header>

      <div style={styles.toolWrap}>
        {/* ---- PROGRESS ---- */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(totalAnswered / 25) * 100}%` }} />
        </div>

        {/* ---- PROJECT INFO ---- */}
        <ScrollReveal>
          <div className="ra-project-grid">
            <div>
              <label style={styles.fieldLabel}>Project / Change Name</label>
              <input
                type="text"
                style={styles.fieldInput}
                placeholder="e.g. ERP Transformation"
                value={assessment.projectName}
                onChange={(e) => setField("projectName", e.target.value)}
              />
            </div>
            <div>
              <label style={styles.fieldLabel}>Assessed By</label>
              <input
                type="text"
                style={styles.fieldInput}
                placeholder="e.g. Jane Smith"
                value={assessment.assessedBy}
                onChange={(e) => setField("assessedBy", e.target.value)}
              />
            </div>
            <div>
              <label style={styles.fieldLabel}>Date</label>
              <input
                type="date"
                style={styles.fieldInput}
                value={assessment.assessedDate}
                onChange={(e) =>
                  setAssessment((prev) => ({ ...prev, assessedDate: e.target.value }))
                }
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ---- DIMENSION TABS ---- */}
        <ScrollReveal>
          <div className="ra-tab-bar">
            {DIMENSIONS.map((dim) => {
              const isActive = activeTab === dim.key;
              const score = assessment.dimensions[dim.key].score;
              return (
                <button
                  key={dim.key}
                  className={`ra-tab${isActive ? " active" : ""}`}
                  onClick={() => setActiveTab(dim.key)}
                >
                  {dim.label}
                  {score > 0 && <span style={styles.tabDot(score)} />}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ---- ACTIVE DIMENSION ---- */}
        <div style={styles.dimHeader}>
          <h2 style={styles.dimTitle}>{activeDef.label}</h2>
          <p style={styles.dimDesc}>{activeDef.description}</p>
        </div>

        {activeDef.items.map((item, idx) => {
          const currentVal = assessment.dimensions[activeTab].items[item.id] || 0;
          return (
            <div key={item.id} style={styles.statementRow}>
              <p style={styles.statementText}>
                <span
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    color: "#9A9080",
                    marginRight: 10,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.statement}
              </p>
              <div className="ra-rating-row">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    className="ra-rating-btn"
                    style={{
                      border:
                        currentVal === val
                          ? `1px solid ${scoreColour(val)}`
                          : "1px solid rgba(100,90,70,0.22)",
                      background: currentVal === val ? scoreColour(val) : "transparent",
                      color: currentVal === val ? "#fff" : "var(--text-mid)",
                    }}
                    onClick={() => setItemScore(activeTab, item.id, val)}
                    title={SCALE_LABELS[val]}
                  >
                    {val}, {SCALE_LABELS[val]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* ---- DIMENSION NOTES ---- */}
        <label style={styles.notesLabel}>Notes for {activeDef.label}</label>
        <textarea
          style={styles.notesArea}
          placeholder={`Add observations, context, or evidence for the ${activeDef.label} dimension...`}
          value={assessment.dimensions[activeTab].notes}
          onChange={(e) => setNotes(activeTab, e.target.value)}
        />

        {/* ---- DIMENSION SCORE ---- */}
        {assessment.dimensions[activeTab].score > 0 && (
          <div style={styles.dimScore(assessment.dimensions[activeTab].score)}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              {assessment.dimensions[activeTab].score.toFixed(1)}
            </span>
            <span style={{ fontSize: 12 }}>
              / 5, {bandLabel(assessment.dimensions[activeTab].score)}
            </span>
          </div>
        )}

        {/* ---- VIEW RESULTS BUTTON ---- */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--ui)",
              fontSize: 13,
              color: "#9A9080",
              marginBottom: 12,
            }}
          >
            {totalAnswered} of 25 statements rated
          </p>
          <button
            style={styles.viewResultsBtn}
            onClick={() => {
              if (totalAnswered > 0) setShowResults(true);
            }}
            disabled={totalAnswered === 0}
          >
            {totalAnswered === 25 ? "View Full Results" : totalAnswered > 0 ? "View Partial Results" : "Rate All Statements to View Results"}
          </button>
        </div>

        {/* ================================================================ */}
        {/*  RESULTS SECTION                                                  */}
        {/* ================================================================ */}

        {showResults && (
          <div style={styles.resultsSection}>
            <ScrollReveal>
              <span className="article-label">Results Summary</span>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 32,
                  fontWeight: 500,
                  color: "var(--navy)",
                  marginBottom: 24,
                }}
              >
                Your Readiness Profile
              </h2>

              {/* ---- OVERALL CARD WITH BARS ---- */}
              <div style={styles.overallCard}>
                <span style={styles.overallLabel}>Overall Readiness Score</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={styles.overallScore}>{overallScore.toFixed(1)}</span>
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 16,
                      color: "rgba(234,228,213,0.5)",
                    }}
                  >
                    / 5
                  </span>
                </div>
                <p style={styles.overallBand}>{overallBand(overallScore).label}</p>
                <p style={styles.overallDesc}>{overallBand(overallScore).description}</p>

                {/* ---- RADAR BARS ---- */}
                <div style={{ marginTop: 32 }}>
                  {DIMENSIONS.map((dim) => {
                    const score = assessment.dimensions[dim.key].score;
                    return (
                      <div className="ra-bar-row" key={dim.key}>
                        <span className="ra-bar-label">{dim.label}</span>
                        <div style={styles.barTrack}>
                          <div style={styles.barFill(score)} />
                        </div>
                        <span style={styles.barScore(score)}>
                          {score > 0 ? score.toFixed(1) : ","}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* ---- DIMENSION BREAKDOWN ---- */}
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 24,
                  fontWeight: 500,
                  color: "var(--navy)",
                  marginBottom: 16,
                  marginTop: 40,
                }}
              >
                Dimension Breakdown
              </h3>

              {DIMENSIONS.map((dim) => {
                const dimData = assessment.dimensions[dim.key];
                return (
                  <div key={dim.key} style={styles.breakdownCard}>
                    <div className="ra-breakdown-header">
                      <span style={styles.breakdownDim}>{dim.label}</span>
                      <span style={styles.breakdownBadge(dimData.score)}>
                        {bandLabel(dimData.score)}
                      </span>
                    </div>
                    <span style={styles.breakdownScore(dimData.score)}>
                      {dimData.score > 0 ? dimData.score.toFixed(1) : ","}
                    </span>

                    <div className="ra-breakdown-items">
                      {dim.items.map((item) => {
                        const val = dimData.items[item.id] || 0;
                        return (
                          <div className="ra-breakdown-item" key={item.id}>
                            <span style={styles.breakdownItemText}>{item.statement}</span>
                            <span style={styles.breakdownItemScore(val)}>
                              {val > 0 ? val : ","}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {dimData.notes && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#9A9080",
                            display: "block",
                            marginBottom: 6,
                          }}
                        >
                          Notes
                        </span>
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "var(--text-mid)",
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {dimData.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </ScrollReveal>

            {/* ---- RECOMMENDATIONS ---- */}
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 24,
                  fontWeight: 500,
                  color: "var(--navy)",
                  marginBottom: 8,
                  marginTop: 48,
                }}
              >
                Recommendations
              </h3>
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 14,
                  color: "var(--text-mid)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  maxWidth: 620,
                }}
              >
                Based on your scores, the following dimensions need the most attention. They are
                listed in priority order, starting with the lowest-scoring dimension.
              </p>

              {sortedDimensions
                .filter((dim) => assessment.dimensions[dim.key].score > 0 && assessment.dimensions[dim.key].score < 4)
                .map((dim) => {
                  const score = assessment.dimensions[dim.key].score;
                  const rec = score <= 2.5 ? dim.recommendations.low : dim.recommendations.mid;
                  return (
                    <div key={dim.key} style={styles.recCard}>
                      <span style={styles.recDim}>{dim.label}, {score.toFixed(1)} / 5</span>
                      <h4 style={styles.recTitle}>
                        {score <= 2.5
                          ? `${dim.label}: Significant gaps to address`
                          : `${dim.label}: Developing, strengthen before go-live`}
                      </h4>
                      <p style={styles.recText}>{rec}</p>
                    </div>
                  );
                })}

              {sortedDimensions.filter(
                (dim) => assessment.dimensions[dim.key].score >= 4
              ).length > 0 && (
                <div
                  style={{
                    padding: "20px 24px",
                    background: "rgba(39,134,74,0.06)",
                    border: "1px solid rgba(39,134,74,0.15)",
                    marginTop: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#27864A",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Strengths
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 14,
                      color: "var(--text-mid)",
                      lineHeight: 1.8,
                    }}
                  >
                    {sortedDimensions
                      .filter((dim) => assessment.dimensions[dim.key].score >= 4)
                      .map((dim) => dim.label)
                      .join(", ")}{" "}
                    {sortedDimensions.filter((dim) => assessment.dimensions[dim.key].score >= 4)
                      .length === 1
                      ? "is"
                      : "are"}{" "}
                    showing strong readiness. Maintain the practices and engagement that produced
                    these scores, and monitor for any regression during the transition period.
                  </p>
                </div>
              )}

              {sortedDimensions.every(
                (dim) =>
                  assessment.dimensions[dim.key].score === 0 ||
                  assessment.dimensions[dim.key].score >= 4
              ) &&
                sortedDimensions.every(
                  (dim) => assessment.dimensions[dim.key].score > 0
                ) && (
                  <div
                    style={{
                      padding: "20px 24px",
                      background: "rgba(39,134,74,0.06)",
                      border: "1px solid rgba(39,134,74,0.15)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 14,
                        color: "#27864A",
                        fontWeight: 500,
                        lineHeight: 1.8,
                      }}
                    >
                      All dimensions show strong readiness. Continue monitoring through
                      implementation and use this assessment as your baseline.
                    </p>
                  </div>
                )}
            </ScrollReveal>

            {/* ---- RELATED KNOWLEDGE ---- */}
            <ScrollReveal>
              <div style={styles.relatedSection}>
                <span
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#9A9080",
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  Related Knowledge
                </span>
                <Link
                  href="/knowledge/current-state-assessment"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 24,
                    padding: "20px 0",
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 19,
                        fontWeight: 500,
                        color: "var(--text-dark)",
                        lineHeight: 1.35,
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      How to Conduct a Current State Assessment
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        color: "var(--text-mid)",
                        lineHeight: 1.6,
                      }}
                    >
                      The full guide to assessing readiness across People, Process, Culture,
                      Capability, and Systems, with key questions, methods, and case studies.
                    </span>
                  </div>
                  <span
                    style={{
                      color: "var(--gold)",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
