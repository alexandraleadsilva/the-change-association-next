"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { ToolLayout } from "@/components/ToolLayout";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

type StageKey =
  | "awareness"
  | "understanding"
  | "trial"
  | "adoption"
  | "proficiency";

interface StageScore {
  score: number; // 0 = unscored, 1-5
  evidence: string;
}

interface AdoptionScorecard {
  projectName: string;
  createdBy: string;
  assessmentDate: string;
  stages: Record<StageKey, StageScore>;
}

/* ------------------------------------------------------------------ */
/*  STAGE DEFINITIONS                                                  */
/* ------------------------------------------------------------------ */

interface StageDef {
  key: StageKey;
  num: string;
  name: string;
  description: string;
}

const stageDefs: StageDef[] = [
  {
    key: "awareness",
    num: "01",
    name: "Awareness",
    description:
      "People know the change is happening. Communications have reached the target audience and they can articulate what is changing and why.",
  },
  {
    key: "understanding",
    num: "02",
    name: "Understanding",
    description:
      "People understand what the change means for them personally. They grasp the impact on their role, their team, and their day-to-day work.",
  },
  {
    key: "trial",
    num: "03",
    name: "Trial",
    description:
      "People have tried the new way of working. They have experimented with new processes, tools, or behaviours in a supported environment.",
  },
  {
    key: "adoption",
    num: "04",
    name: "Adoption",
    description:
      "People are consistently using the new way of working. The change has become the default approach and old behaviours are fading.",
  },
  {
    key: "proficiency",
    num: "05",
    name: "Proficiency",
    description:
      "People are proficient and the change is embedded. They can adapt, optimise, and teach others. The new way of working is sustained without active change support.",
  },
];

/* ------------------------------------------------------------------ */
/*  RATING LABELS                                                      */
/* ------------------------------------------------------------------ */

const ratingLabels: Record<number, string> = {
  1: "Not evident",
  2: "Early signs",
  3: "Developing",
  4: "Established",
  5: "Embedded",
};

/* ------------------------------------------------------------------ */
/*  COLOUR HELPERS                                                     */
/* ------------------------------------------------------------------ */

function scoreColour(score: number): string {
  if (score === 0) return "#9A9080";
  if (score <= 1) return "#C0392B";
  if (score <= 2) return "#D4A017";
  if (score <= 3) return "#D4A017";
  if (score <= 4) return "#27AE60";
  return "#1A7A45";
}

function overallColour(avg: number): string {
  if (avg === 0) return "#9A9080";
  if (avg < 2) return "#C0392B";
  if (avg < 3) return "#D4A017";
  if (avg < 4) return "var(--gold)";
  return "#27AE60";
}

function overallLabel(avg: number): string {
  if (avg === 0) return "Not assessed";
  if (avg < 2) return "Low Adoption Maturity";
  if (avg < 3) return "Emerging Adoption";
  if (avg < 4) return "Progressing Adoption";
  return "Strong Adoption Maturity";
}

/* ------------------------------------------------------------------ */
/*  INTERPRETATION LOGIC                                               */
/* ------------------------------------------------------------------ */

interface Interpretation {
  type: "healthy" | "inconsistent" | "early" | "incomplete";
  message: string;
}

function getInterpretation(
  stages: Record<StageKey, StageScore>
): Interpretation {
  const keys: StageKey[] = [
    "awareness",
    "understanding",
    "trial",
    "adoption",
    "proficiency",
  ];
  const scores = keys.map((k) => stages[k].score);
  const scored = scores.filter((s) => s > 0);

  if (scored.length === 0) {
    return {
      type: "incomplete",
      message: "Score each stage to see your adoption interpretation.",
    };
  }

  if (scored.length < 5) {
    return {
      type: "incomplete",
      message:
        "Complete all five stages for a full interpretation. Partial scores are shown above.",
    };
  }

  // Check for inconsistency: later stages scored higher than earlier ones
  let inconsistent = false;
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[i - 1] + 1) {
      inconsistent = true;
      break;
    }
  }

  // Also flag if any later stage is higher than an earlier stage that is low
  const earlyAvg = (scores[0] + scores[1]) / 2;
  const laterAvg = (scores[3] + scores[4]) / 2;

  if (laterAvg > earlyAvg + 0.5) {
    inconsistent = true;
  }

  if (inconsistent) {
    return {
      type: "inconsistent",
      message:
        "Inconsistency detected: later adoption stages are scoring higher than foundational stages. This is unusual. People rarely adopt or become proficient without first having awareness and understanding. Validate the evidence for each stage and consider whether early-stage scores need to be revisited.",
    };
  }

  const avg = scored.reduce((a, b) => a + b, 0) / scored.length;

  if (avg <= 2) {
    return {
      type: "early",
      message:
        "Adoption is in its early stages. Focus on building foundational awareness and understanding before pushing for behavioural change. This is a healthy pattern if the change is new.",
    };
  }

  return {
    type: "healthy",
    message:
      "Adoption is progressing in a healthy pattern. Earlier stages are scoring at or above later stages, indicating a solid foundation. Continue to reinforce and sustain.",
  };
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function AdoptionScorecardPage() {
  /* ---- scorecard state ---- */
  const [scorecard, setScorecard] = useState<AdoptionScorecard>({
    projectName: "",
    createdBy: "",
    assessmentDate: new Date().toISOString().slice(0, 10),
    stages: {
      awareness: { score: 0, evidence: "" },
      understanding: { score: 0, evidence: "" },
      trial: { score: 0, evidence: "" },
      adoption: { score: 0, evidence: "" },
      proficiency: { score: 0, evidence: "" },
    },
  });

  /* ---- expanded stages ---- */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<AdoptionScorecard>({
    toolType: "adoption-scorecard",
    defaultData: {
      projectName: "",
      createdBy: "",
      assessmentDate: new Date().toISOString().slice(0, 10),
      stages: {
        awareness: { score: 0, evidence: "" },
        understanding: { score: 0, evidence: "" },
        trial: { score: 0, evidence: "" },
        adoption: { score: 0, evidence: "" },
        proficiency: { score: 0, evidence: "" },
      },
    },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setScorecard(savedData);
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
    saveToDb(scorecard);
  }, [scorecard]);

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "createdBy", value: string) => {
      setScorecard((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateScore = useCallback((key: StageKey, score: number) => {
    setScorecard((prev) => ({
      ...prev,
      stages: {
        ...prev.stages,
        [key]: { ...prev.stages[key], score },
      },
    }));
  }, []);

  const updateEvidence = useCallback((key: StageKey, evidence: string) => {
    setScorecard((prev) => ({
      ...prev,
      stages: {
        ...prev.stages,
        [key]: { ...prev.stages[key], evidence },
      },
    }));
  }, []);

  /* ---- derived ---- */
  const scoredCount = useMemo(
    () => stageDefs.filter((s) => scorecard.stages[s.key].score > 0).length,
    [scorecard.stages]
  );

  const overallAvg = useMemo(() => {
    const scored = stageDefs
      .map((s) => scorecard.stages[s.key].score)
      .filter((s) => s > 0);
    if (scored.length === 0) return 0;
    return scored.reduce((a, b) => a + b, 0) / scored.length;
  }, [scorecard.stages]);

  const interpretation = useMemo(
    () => getInterpretation(scorecard.stages),
    [scorecard.stages]
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
        <h1 className="article-title">Adoption Scorecard</h1>
        <p className="article-intro">
          Assess adoption maturity across the five stages of the adoption curve.
          Click each stage to score it, capture evidence, and surface gaps in
          your change adoption strategy.
        </p>
      </header>

      {/* ---------- PROGRESS TRACKER ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 40px",
            maxWidth: 820,
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
              Assessment Progress
            </span>
            <span
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--navy)",
                fontWeight: 500,
              }}
            >
              {scoredCount} / {stageDefs.length} stages scored
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
                width: `${Math.round((scoredCount / stageDefs.length) * 100)}%`,
                background:
                  scoredCount === stageDefs.length ? "#27AE60" : "var(--gold)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </section>
      </ScrollReveal>

      <ToolLayout
        projectName={scorecard.projectName}
        onProjectChange={(val) => updateField("projectName", val)}
        createdBy={scorecard.createdBy}
        onCreatedByChange={(val) => updateField("createdBy", val)}
        isAuthenticated={isAuthenticated}
      >

      {/* ---------- ADOPTION CURVE STAIRCASE ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 48px",
            maxWidth: 820,
            margin: "0 auto",
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
            Adoption Curve
          </div>

          {/* Staircase visualisation */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              padding: "0 0 24px",
              minHeight: 200,
            }}
          >
            {stageDefs.map((s, idx) => {
              const stage = scorecard.stages[s.key];
              const isScored = stage.score > 0;
              const stepHeight = 40 + idx * 32;
              const isOpen = !!expanded[s.key];

              return (
                <button
                  key={s.key}
                  onClick={() => toggle(s.key)}
                  style={{
                    flex: 1,
                    height: stepHeight,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    background: isScored
                      ? scoreColour(stage.score)
                      : "var(--border)",
                    border: isOpen
                      ? "2px solid var(--navy)"
                      : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative" as const,
                    padding: "8px 4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: isScored ? "#fff" : "#9A9080",
                      textAlign: "center" as const,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.name}
                  </span>
                  {isScored && (
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {stage.score}
                    </span>
                  )}
                  {!isScored && (
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        color: "#9A9080",
                      }}
                    >
                      --
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap" as const,
              justifyContent: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: scoreColour(n),
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 11,
                    color: "var(--text-mid)",
                  }}
                >
                  {n} = {ratingLabels[n]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- 5 STAGE CARDS ---------- */}
      <section
        style={{
          padding: "0 48px 56px",
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: 12,
          }}
        >
          {stageDefs.map((s, idx) => {
            const isOpen = !!expanded[s.key];
            const stage = scorecard.stages[s.key];
            const isScored = stage.score > 0;

            return (
              <ScrollReveal key={s.key} delay={idx * 60}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--cream)",
                    transition: "border-color 0.2s",
                    ...(isScored ? { borderColor: scoreColour(stage.score) } : {}),
                  }}
                >
                  {/* card header, clickable */}
                  <button
                    onClick={() => toggle(s.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      width: "100%",
                      padding: "20px 24px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left" as const,
                      fontFamily: "var(--ui)",
                    }}
                  >
                    {/* score indicator */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isScored
                          ? scoreColour(stage.score)
                          : "var(--border)",
                        color: isScored ? "#fff" : "#9A9080",
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isScored ? stage.score : "--"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        color: "var(--gold)",
                        minWidth: 20,
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "var(--navy)",
                        flex: 1,
                      }}
                    >
                      {s.name}
                    </span>
                    {isScored && (
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          color: scoreColour(stage.score),
                          fontWeight: 500,
                          marginRight: 8,
                        }}
                      >
                        {ratingLabels[stage.score]}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 18,
                        color: "var(--gold)",
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    >
                      &#9654;
                    </span>
                  </button>

                  {/* card body, expandable */}
                  {isOpen && (
                    <div style={{ padding: "0 24px 24px" }}>
                      {/* stage description */}
                      <div
                        style={{
                          padding: "14px 18px",
                          background: "rgba(10,22,40,0.03)",
                          borderLeft: "3px solid var(--gold)",
                          marginBottom: 22,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13.5,
                            color: "var(--text-mid)",
                            lineHeight: 1.7,
                            fontStyle: "italic",
                            margin: 0,
                          }}
                        >
                          {s.description}
                        </p>
                      </div>

                      {/* rating scale */}
                      <div style={{ marginBottom: 22 }}>
                        <div
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase" as const,
                            color: "#9A9080",
                            marginBottom: 12,
                          }}
                        >
                          Rating
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap" as const,
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((n) => {
                            const isActive = stage.score === n;
                            return (
                              <button
                                key={n}
                                onClick={() => updateScore(s.key, n)}
                                style={{
                                  display: "flex",
                                  flexDirection: "column" as const,
                                  alignItems: "center",
                                  gap: 4,
                                  padding: "12px 14px",
                                  minWidth: 100,
                                  flex: 1,
                                  border: isActive
                                    ? `2px solid ${scoreColour(n)}`
                                    : "1.5px solid var(--border)",
                                  background: isActive
                                    ? scoreColour(n)
                                    : "transparent",
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: isActive ? "#fff" : "var(--navy)",
                                    lineHeight: 1,
                                  }}
                                >
                                  {n}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "var(--ui)",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    color: isActive ? "#fff" : "#9A9080",
                                    textAlign: "center" as const,
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {ratingLabels[n]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* evidence textarea */}
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase" as const,
                            color: "#9A9080",
                            marginBottom: 8,
                            display: "block",
                          }}
                        >
                          Evidence &amp; Observations
                        </label>
                        <textarea
                          rows={4}
                          placeholder={`What evidence supports this rating for ${s.name.toLowerCase()}? E.g. survey data, observation, feedback, participation rates...`}
                          value={stage.evidence}
                          onChange={(e) =>
                            updateEvidence(s.key, e.target.value)
                          }
                          style={{ minHeight: 100 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ---------- OVERALL RESULT ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "56px 48px",
            maxWidth: 820,
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
            Overall Adoption Score
          </div>

          {/* Score display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 28,
              flexWrap: "wrap" as const,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: overallColour(overallAvg),
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {overallAvg > 0 ? overallAvg.toFixed(1) : "--"}
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 28,
                  fontWeight: 500,
                  color: "var(--navy)",
                  margin: "0 0 4px",
                }}
              >
                {scorecard.projectName || "Untitled Assessment"}
              </h2>
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 14px",
                  background: overallColour(overallAvg),
                  color: "#fff",
                  fontFamily: "var(--ui)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                {overallLabel(overallAvg)}
              </div>
              {(scorecard.createdBy || scorecard.assessmentDate) && (
                <p
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 13,
                    color: "var(--text-mid)",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {scorecard.createdBy && (
                    <>Assessed by {scorecard.createdBy}</>
                  )}
                  {scorecard.createdBy && scorecard.assessmentDate && (
                    <> &middot; </>
                  )}
                  {scorecard.assessmentDate && <>{scorecard.assessmentDate}</>}
                </p>
              )}
            </div>
          </div>

          {/* Stage-by-stage summary bar */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 32,
            }}
          >
            {stageDefs.map((s) => {
              const stage = scorecard.stages[s.key];
              const isScored = stage.score > 0;
              return (
                <div
                  key={s.key}
                  style={{
                    flex: 1,
                    textAlign: "center" as const,
                  }}
                >
                  <div
                    style={{
                      height: 8,
                      background: isScored
                        ? scoreColour(stage.score)
                        : "var(--border)",
                      marginBottom: 8,
                      transition: "background 0.3s",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 10,
                      fontWeight: 500,
                      color: isScored ? "var(--navy)" : "#9A9080",
                      display: "block",
                      marginBottom: 2,
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isScored ? scoreColour(stage.score) : "#9A9080",
                    }}
                  >
                    {isScored ? `${stage.score}/5` : "--"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interpretation */}
          <div
            style={{
              padding: "20px 24px",
              background:
                interpretation.type === "inconsistent"
                  ? "rgba(192,57,43,0.06)"
                  : interpretation.type === "healthy"
                    ? "rgba(39,174,96,0.06)"
                    : "rgba(10,22,40,0.03)",
              borderLeft: `3px solid ${
                interpretation.type === "inconsistent"
                  ? "#C0392B"
                  : interpretation.type === "healthy"
                    ? "#27AE60"
                    : "var(--gold)"
              }`,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontFamily: "var(--ui)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color:
                  interpretation.type === "inconsistent"
                    ? "#C0392B"
                    : interpretation.type === "healthy"
                      ? "#27AE60"
                      : "#9A9080",
                marginBottom: 8,
              }}
            >
              {interpretation.type === "inconsistent"
                ? "Attention Required"
                : interpretation.type === "healthy"
                  ? "Healthy Pattern"
                  : interpretation.type === "early"
                    ? "Early Stage"
                    : "Interpretation"}
            </div>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 14,
                color: "var(--text-mid)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {interpretation.message}
            </p>
          </div>

          {/* Stage detail summary */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 0,
            }}
          >
            {stageDefs.map((s) => {
              const stage = scorecard.stages[s.key];
              const isScored = stage.score > 0;

              return (
                <div
                  key={s.key}
                  style={{
                    padding: "24px 0",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: isScored
                          ? scoreColour(stage.score)
                          : "var(--border)",
                        color: isScored ? "#fff" : "#9A9080",
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isScored ? stage.score : "--"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        color: "var(--gold)",
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "var(--navy)",
                      }}
                    >
                      {s.name}
                    </span>
                    {isScored && (
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight: 500,
                          color: scoreColour(stage.score),
                          marginLeft: "auto",
                        }}
                      >
                        {ratingLabels[stage.score]}
                      </span>
                    )}
                  </div>
                  {stage.evidence.trim() ? (
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 14,
                        color: "var(--text-mid)",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap" as const,
                        margin: 0,
                        paddingLeft: 34,
                      }}
                    >
                      {stage.evidence}
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        color: "#9A9080",
                        fontStyle: "italic",
                        margin: 0,
                        paddingLeft: 34,
                      }}
                    >
                      {isScored
                        ? "No evidence recorded for this stage."
                        : "This stage has not been assessed yet."}
                    </p>
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
            maxWidth: 820,
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
            Want to learn how to define, measure, and track adoption across the
            change curve? Read the full knowledge article.
          </p>
          <Link href="/knowledge/adoption-metrics" className="btn">
            Related Knowledge: Adoption Metrics
          </Link>
        </section>
      </ScrollReveal>

      </ToolLayout>

      <Footer />
    </>
  );
}
