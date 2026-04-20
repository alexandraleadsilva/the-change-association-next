"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { SaveIndicator } from "@/components/SaveIndicator";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

type EmbeddingLevel = "not-yet" | "emerging" | "established" | "embedded";

interface IndicatorState {
  level: EmbeddingLevel;
  evidence: string;
}

interface CultureTracker {
  projectName: string;
  createdBy: string;
  assessmentDate: string;
  indicators: {
    language: IndicatorState;
    behaviours: IndicatorState;
    oldWays: IndicatorState;
    newStarters: IndicatorState;
    leadershipChange: IndicatorState;
  };
}

/* ------------------------------------------------------------------ */
/*  INDICATOR DEFINITIONS                                              */
/* ------------------------------------------------------------------ */

interface IndicatorDef {
  key: keyof CultureTracker["indicators"];
  num: string;
  name: string;
  description: string;
}

const indicatorDefs: IndicatorDef[] = [
  {
    key: "language",
    num: "01",
    name: "Language Has Changed",
    description:
      "People naturally use the new terminology, frameworks, or concepts without being prompted. The change language has become part of everyday conversation.",
  },
  {
    key: "behaviours",
    num: "02",
    name: "New Behaviours Are Default",
    description:
      "The new ways of working happen automatically, not because someone is watching. People default to the new process without conscious effort.",
  },
  {
    key: "oldWays",
    num: "03",
    name: "Old Ways Feel Strange",
    description:
      "When someone reverts to the old way, it feels wrong or uncomfortable. People notice and self-correct, or others flag it as unusual.",
  },
  {
    key: "newStarters",
    num: "04",
    name: "New Starters Learn Naturally",
    description:
      "People who join the team after the change learn the new way as 'how we do things here' without needing to know the old way existed.",
  },
  {
    key: "leadershipChange",
    num: "05",
    name: "Survives Leadership Change",
    description:
      "The change persists even when the sponsor or senior leaders who championed it move on. It is embedded in systems, not dependent on individuals.",
  },
];

/* ------------------------------------------------------------------ */
/*  LEVEL DEFINITIONS                                                  */
/* ------------------------------------------------------------------ */

interface LevelDef {
  value: EmbeddingLevel;
  label: string;
  colour: string;
  colourLight: string;
}

const levelDefs: LevelDef[] = [
  {
    value: "not-yet",
    label: "Not Yet",
    colour: "#C0392B",
    colourLight: "rgba(192,57,43,0.10)",
  },
  {
    value: "emerging",
    label: "Emerging",
    colour: "#D4A017",
    colourLight: "rgba(212,160,23,0.10)",
  },
  {
    value: "established",
    label: "Established",
    colour: "#7DB867",
    colourLight: "rgba(125,184,103,0.10)",
  },
  {
    value: "embedded",
    label: "Embedded",
    colour: "#27AE60",
    colourLight: "rgba(39,174,96,0.10)",
  },
];

/* ------------------------------------------------------------------ */
/*  SCORE HELPERS                                                      */
/* ------------------------------------------------------------------ */

const levelScore: Record<EmbeddingLevel, number> = {
  "not-yet": 0,
  emerging: 1,
  established: 2,
  embedded: 3,
};

function getLevelDef(level: EmbeddingLevel): LevelDef {
  return levelDefs.find((l) => l.value === level)!;
}

function getLevelWidthPct(level: EmbeddingLevel): number {
  const scores: Record<EmbeddingLevel, number> = {
    "not-yet": 8,
    emerging: 40,
    established: 72,
    embedded: 100,
  };
  return scores[level];
}

/* ------------------------------------------------------------------ */
/*  INTERPRETATION ENGINE                                              */
/* ------------------------------------------------------------------ */

function generateInterpretation(
  indicators: CultureTracker["indicators"]
): string[] {
  const insights: string[] = [];
  const levels = {
    language: indicators.language.level,
    behaviours: indicators.behaviours.level,
    oldWays: indicators.oldWays.level,
    newStarters: indicators.newStarters.level,
    leadershipChange: indicators.leadershipChange.level,
  };

  const scores = Object.values(levels).map((l) => levelScore[l]);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const allNotYet = scores.every((s) => s === 0);
  const allEmbedded = scores.every((s) => s === 3);

  if (allNotYet) {
    insights.push(
      "No indicators are showing embedding yet. This is expected early in a change. Focus first on language and visible behaviours to create momentum."
    );
    return insights;
  }

  if (allEmbedded) {
    insights.push(
      "All five indicators show full embedding. This change appears to have become part of the organisational culture. Consider documenting what made this successful for future change efforts."
    );
    return insights;
  }

  /* --- Language vs Behaviours gap --- */
  if (
    levelScore[levels.language] >= 2 &&
    levelScore[levels.behaviours] <= 1
  ) {
    insights.push(
      "Language has changed but behaviours have not followed. People may be talking the talk without walking the walk. Focus on behavioural reinforcement, role modelling, and removing barriers to the new ways of working."
    );
  }

  if (
    levelScore[levels.behaviours] >= 2 &&
    levelScore[levels.language] <= 1
  ) {
    insights.push(
      "Behaviours are ahead of language, which is unusual. People may be following new processes without fully understanding the rationale. Consider investing in communication and sense-making to deepen understanding."
    );
  }

  /* --- Old ways not feeling strange --- */
  if (
    levelScore[levels.behaviours] >= 2 &&
    levelScore[levels.oldWays] <= 1
  ) {
    insights.push(
      "New behaviours are taking hold, but the old ways do not yet feel strange. This suggests the change is still fragile. Continue reinforcing why the new way is better and make it easy to stay on the new path."
    );
  }

  /* --- New starters gap --- */
  if (
    avgScore >= 2 &&
    levelScore[levels.newStarters] <= 1
  ) {
    insights.push(
      "Most indicators suggest embedding, but new starters are not yet learning the new way naturally. Check onboarding materials, team norms, and documentation to ensure the change is captured for newcomers."
    );
  }

  /* --- Leadership vulnerability --- */
  if (
    avgScore >= 2 &&
    levelScore[levels.leadershipChange] <= 1
  ) {
    insights.push(
      "The change shows strong embedding on most indicators but remains vulnerable to leadership change. Ensure the change is embedded in systems, processes, and governance rather than relying on individual champions."
    );
  }

  /* --- Leadership strong but rest weak --- */
  if (
    levelScore[levels.leadershipChange] >= 2 &&
    avgScore < 1.5
  ) {
    insights.push(
      "Leadership resilience is rated higher than other indicators. Verify this assessment: it is unusual for change to survive leadership transitions before it has embedded in daily behaviours and language."
    );
  }

  /* --- General progress summaries --- */
  if (avgScore > 0 && avgScore < 1) {
    insights.push(
      "Embedding is in its early stages. This is normal for changes that are still being rolled out. Focus on quick wins and visible signals that the new way is taking hold."
    );
  }

  if (avgScore >= 1 && avgScore < 2) {
    insights.push(
      "The change is emerging but not yet established. Keep reinforcing, recognising early adopters, and addressing pockets of resistance."
    );
  }

  if (avgScore >= 2 && avgScore < 3) {
    insights.push(
      "The change is largely established. Focus on the remaining gaps to move from 'established' to 'truly embedded' in the culture."
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Complete the assessment to receive targeted interpretation and recommendations."
    );
  }

  return insights;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CultureTrackerPage() {
  /* ---- tracker state ---- */
  const [tracker, setTracker] = useState<CultureTracker>({
    projectName: "",
    createdBy: "",
    assessmentDate: new Date().toISOString().slice(0, 10),
    indicators: {
      language: { level: "not-yet", evidence: "" },
      behaviours: { level: "not-yet", evidence: "" },
      oldWays: { level: "not-yet", evidence: "" },
      newStarters: { level: "not-yet", evidence: "" },
      leadershipChange: { level: "not-yet", evidence: "" },
    },
  });

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<CultureTracker>({
    toolType: "culture-tracker",
    defaultData: {
      projectName: "",
      createdBy: "",
      assessmentDate: new Date().toISOString().slice(0, 10),
      indicators: {
        language: { level: "not-yet", evidence: "" },
        behaviours: { level: "not-yet", evidence: "" },
        oldWays: { level: "not-yet", evidence: "" },
        newStarters: { level: "not-yet", evidence: "" },
        leadershipChange: { level: "not-yet", evidence: "" },
      },
    },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setTracker(savedData);
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
    saveToDb(tracker);
  }, [tracker]);

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "createdBy" | "assessmentDate", value: string) => {
      setTracker((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateLevel = useCallback(
    (key: keyof CultureTracker["indicators"], level: EmbeddingLevel) => {
      setTracker((prev) => ({
        ...prev,
        indicators: {
          ...prev.indicators,
          [key]: { ...prev.indicators[key], level },
        },
      }));
    },
    []
  );

  const updateEvidence = useCallback(
    (key: keyof CultureTracker["indicators"], evidence: string) => {
      setTracker((prev) => ({
        ...prev,
        indicators: {
          ...prev.indicators,
          [key]: { ...prev.indicators[key], evidence },
        },
      }));
    },
    []
  );

  /* ---- derived ---- */
  const overallScore = useMemo(() => {
    const scores = Object.values(tracker.indicators).map(
      (ind) => levelScore[ind.level]
    );
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }, [tracker.indicators]);

  const overallPct = Math.round((overallScore / 3) * 100);

  const overallLabel = useMemo(() => {
    if (overallScore === 0) return "Not Yet Embedding";
    if (overallScore < 1) return "Early Signs";
    if (overallScore < 2) return "Emerging";
    if (overallScore < 3) return "Established";
    return "Fully Embedded";
  }, [overallScore]);

  const overallColour = useMemo(() => {
    if (overallScore === 0) return "#C0392B";
    if (overallScore < 1) return "#D4A017";
    if (overallScore < 2) return "#D4A017";
    if (overallScore < 3) return "#7DB867";
    return "#27AE60";
  }, [overallScore]);

  const interpretation = useMemo(
    () => generateInterpretation(tracker.indicators),
    [tracker.indicators]
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
        <h1 className="article-title">Culture Embedding Tracker</h1>
        <p className="article-intro">
          Assess how deeply a change has embedded into your organisational
          culture. Rate five key indicators, capture supporting evidence, and
          receive an automatic interpretation of where embedding is strong and
          where gaps remain.
        </p>
      </header>

      {/* ---------- PROJECT INFO ---------- */}
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
                <label>Project / Change Name</label>
                <input
                  type="text"
                  placeholder="e.g. Agile Ways of Working"
                  value={tracker.projectName}
                  onChange={(e) => updateField("projectName", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Assessed By</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith, Change Lead"
                  value={tracker.createdBy}
                  onChange={(e) => updateField("createdBy", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Assessment Date</label>
                <input
                  type="date"
                  value={tracker.assessmentDate}
                  onChange={(e) =>
                    updateField("assessmentDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <SaveIndicator isAuthenticated={isAuthenticated} isSaving={isSaving} lastSaved={lastSaved} />

      {/* ---------- 5 INDICATOR CARDS ---------- */}
      <section
        style={{
          padding: "0 48px 56px",
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
          Embedding Indicators
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: 16,
          }}
        >
          {indicatorDefs.map((ind, idx) => {
            const state = tracker.indicators[ind.key];
            const currentLevelDef = getLevelDef(state.level);

            return (
              <ScrollReveal key={ind.key} delay={idx * 60}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--cream)",
                    borderLeft: `4px solid ${currentLevelDef.colour}`,
                    transition: "border-color 0.3s",
                  }}
                >
                  {/* card header */}
                  <div style={{ padding: "24px 28px 0" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 8,
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
                        {ind.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 20,
                          fontWeight: 600,
                          color: "var(--navy)",
                        }}
                      >
                        {ind.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13.5,
                        color: "var(--text-mid)",
                        lineHeight: 1.7,
                        margin: "0 0 20px 0",
                      }}
                    >
                      {ind.description}
                    </p>
                  </div>

                  {/* level selector */}
                  <div
                    style={{
                      padding: "0 28px 20px",
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
                        marginBottom: 10,
                      }}
                    >
                      Assessment Level
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 8,
                      }}
                    >
                      {levelDefs.map((lvl) => {
                        const isSelected = state.level === lvl.value;
                        return (
                          <button
                            key={lvl.value}
                            onClick={() => updateLevel(ind.key, lvl.value)}
                            style={{
                              padding: "12px 8px",
                              border: isSelected
                                ? `2px solid ${lvl.colour}`
                                : "1.5px solid var(--border)",
                              background: isSelected
                                ? lvl.colourLight
                                : "transparent",
                              cursor: "pointer",
                              fontFamily: "var(--ui)",
                              fontSize: 12,
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected ? lvl.colour : "var(--text-mid)",
                              letterSpacing: "0.04em",
                              transition: "all 0.2s",
                              textAlign: "center" as const,
                              position: "relative" as const,
                            }}
                          >
                            {/* radio dot */}
                            <span
                              style={{
                                display: "inline-block",
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                border: isSelected
                                  ? `2px solid ${lvl.colour}`
                                  : "2px solid rgba(100,90,70,0.3)",
                                background: isSelected ? lvl.colour : "transparent",
                                marginRight: 6,
                                verticalAlign: "middle",
                                transition: "all 0.2s",
                              }}
                            />
                            {lvl.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* evidence textarea */}
                  <div style={{ padding: "0 28px 24px" }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        Supporting Evidence
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What evidence supports this rating? What have you observed, heard, or measured?"
                        value={state.evidence}
                        onChange={(e) =>
                          updateEvidence(ind.key, e.target.value)
                        }
                        style={{ minHeight: 80 }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ---------- VISUAL SUMMARY ---------- */}
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
            Embedding Summary
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
            {tracker.projectName || "Untitled Assessment"}
          </h2>
          {(tracker.createdBy || tracker.assessmentDate) && (
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 32,
              }}
            >
              {tracker.createdBy && <>Assessed by {tracker.createdBy}</>}
              {tracker.createdBy && tracker.assessmentDate && (
                <> &middot; </>
              )}
              {tracker.assessmentDate && <>{tracker.assessmentDate}</>}
            </p>
          )}

          {/* overall score badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 36,
              padding: "20px 24px",
              border: "1px solid var(--border)",
              background: "var(--cream)",
            }}
          >
            {/* score circle */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: `3px solid ${overallColour}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 24,
                  fontWeight: 600,
                  color: overallColour,
                }}
              >
                {overallPct}%
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--navy)",
                  marginBottom: 4,
                }}
              >
                {overallLabel}
              </div>
              <div
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  color: "var(--text-mid)",
                  lineHeight: 1.6,
                }}
              >
                Overall embedding score across all five indicators.{" "}
                {overallScore.toFixed(1)} / 3.0 average.
              </div>
            </div>
          </div>

          {/* indicator bars */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 16,
            }}
          >
            {indicatorDefs.map((ind) => {
              const state = tracker.indicators[ind.key];
              const def = getLevelDef(state.level);
              const widthPct = getLevelWidthPct(state.level);

              return (
                <div key={ind.key}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--navy)",
                      }}
                    >
                      {ind.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 500,
                        color: def.colour,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {def.label}
                    </span>
                  </div>
                  {/* bar track */}
                  <div
                    style={{
                      height: 10,
                      background: "var(--border)",
                      overflow: "hidden",
                      position: "relative" as const,
                    }}
                  >
                    {/* bar fill */}
                    <div
                      style={{
                        height: "100%",
                        width: `${widthPct}%`,
                        background: def.colour,
                        transition: "width 0.4s ease, background 0.3s ease",
                      }}
                    />
                    {/* quartile markers */}
                    {[25, 50, 75].map((pct) => (
                      <div
                        key={pct}
                        style={{
                          position: "absolute" as const,
                          top: 0,
                          left: `${pct}%`,
                          width: 1,
                          height: "100%",
                          background: "rgba(255,255,255,0.4)",
                        }}
                      />
                    ))}
                  </div>
                  {/* evidence snippet */}
                  {state.evidence.trim() && (
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        color: "var(--text-mid)",
                        lineHeight: 1.6,
                        marginTop: 6,
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;
                      {state.evidence.length > 120
                        ? state.evidence.slice(0, 120) + "..."
                        : state.evidence}
                      &rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- INTERPRETATION ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 56px",
            maxWidth: 820,
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
                marginBottom: 16,
              }}
            >
              Interpretation &amp; Recommendations
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
              }}
            >
              {interpretation.map((insight, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--gold)",
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 14,
                      color: "var(--text-mid)",
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {insight}
                  </p>
                </div>
              ))}
            </div>
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
            Want to understand what drives cultural embedding and how to
            accelerate it? Read the full knowledge article.
          </p>
          <Link href="/knowledge/culture-integration" className="btn">
            Related Knowledge: Culture Integration
          </Link>
        </section>
      </ScrollReveal>

      <Footer />
    </>
  );
}
