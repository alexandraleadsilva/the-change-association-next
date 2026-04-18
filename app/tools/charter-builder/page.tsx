"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  DATA MODEL                                                         */
/* ------------------------------------------------------------------ */

interface ChangeCharter {
  projectName: string;
  createdBy: string;
  createdDate: string;
  sections: {
    strategicContext: string;
    caseForChange: string;
    scopeBoundaries: string;
    approachPhasing: string;
    governanceRoles: string;
    successCriteria: string;
    risksDependencies: string;
  };
  completeness: Record<string, boolean>;
}

/* ------------------------------------------------------------------ */
/*  SECTION DEFINITIONS                                                */
/* ------------------------------------------------------------------ */

interface SectionDef {
  key: keyof ChangeCharter["sections"];
  num: string;
  name: string;
  guidance: string;
}

const sectionDefs: SectionDef[] = [
  {
    key: "strategicContext",
    num: "01",
    name: "Strategic Context",
    guidance:
      "What is the strategic driver for this change? What external or internal factors make this necessary?",
  },
  {
    key: "caseForChange",
    num: "02",
    name: "Case for Change",
    guidance:
      "Why must the organisation change? What is the cost of not changing? What is the opportunity?",
  },
  {
    key: "scopeBoundaries",
    num: "03",
    name: "Scope & Boundaries",
    guidance:
      "What is in scope and what is explicitly out of scope? What are the boundaries of this change?",
  },
  {
    key: "approachPhasing",
    num: "04",
    name: "Approach & Phasing",
    guidance:
      "How will the change be delivered? What phases are planned? What is the high-level timeline?",
  },
  {
    key: "governanceRoles",
    num: "05",
    name: "Governance & Roles",
    guidance:
      "How will decisions be made? Who sponsors this change? Who leads delivery? Who owns adoption?",
  },
  {
    key: "successCriteria",
    num: "06",
    name: "Success Criteria",
    guidance:
      "How will the organisation know this change has succeeded? What outcomes, behaviours, and evidence will be measured?",
  },
  {
    key: "risksDependencies",
    num: "07",
    name: "Risks & Dependencies",
    guidance:
      "What are the key risks to this change succeeding? What dependencies exist with other initiatives?",
  },
];

/* ------------------------------------------------------------------ */
/*  QUALITY STATUS HELPERS                                             */
/* ------------------------------------------------------------------ */

type QualityStatus = "empty" | "partial" | "complete";

function getQualityStatus(
  text: string,
  isMarkedComplete: boolean
): QualityStatus {
  if (isMarkedComplete) return "complete";
  if (text.trim().length === 0) return "empty";
  if (text.trim().length < 50) return "partial";
  return "partial";
}

function StatusDot({ status }: { status: QualityStatus }) {
  const colours: Record<QualityStatus, string> = {
    empty: "#C0392B",
    partial: "#D4A017",
    complete: "#27AE60",
  };
  const labels: Record<QualityStatus, string> = {
    empty: "Empty",
    partial: "In progress",
    complete: "Complete",
  };
  return (
    <span
      title={labels[status]}
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: colours[status],
        flexShrink: 0,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CharterBuilderPage() {
  /* ---- charter state ---- */
  const [charter, setCharter] = useState<ChangeCharter>({
    projectName: "",
    createdBy: "",
    createdDate: new Date().toISOString().slice(0, 10),
    sections: {
      strategicContext: "",
      caseForChange: "",
      scopeBoundaries: "",
      approachPhasing: "",
      governanceRoles: "",
      successCriteria: "",
      risksDependencies: "",
    },
    completeness: {},
  });

  /* ---- expanded cards ---- */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    strategicContext: true,
  });

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "createdBy", value: string) => {
      setCharter((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateSection = useCallback(
    (key: keyof ChangeCharter["sections"], value: string) => {
      setCharter((prev) => ({
        ...prev,
        sections: { ...prev.sections, [key]: value },
      }));
    },
    []
  );

  const toggleComplete = useCallback((key: string) => {
    setCharter((prev) => ({
      ...prev,
      completeness: {
        ...prev.completeness,
        [key]: !prev.completeness[key],
      },
    }));
  }, []);

  /* ---- derived ---- */
  const completedCount = sectionDefs.filter(
    (s) => charter.completeness[s.key]
  ).length;
  const progressPct = Math.round((completedCount / sectionDefs.length) * 100);

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <>
      <Nav />

      {/* ---------- HEADER ---------- */}
      <header className="article-header" style={{ paddingBottom: 32 }}>
        <Link href="/knowledge" className="article-back">
          &larr; Back to Knowledge Hub
        </Link>
        <span className="article-label">Interactive Tool</span>
        <h1 className="article-title">Change Charter Builder</h1>
        <p className="article-intro">
          Build your change charter on-screen, section by section. Each of the
          seven sections includes guidance on what to write. Mark sections
          complete as you go and review the full charter summary at the bottom.
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
              Charter Progress
            </span>
            <span
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--navy)",
                fontWeight: 500,
              }}
            >
              {completedCount} / {sectionDefs.length} sections complete
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
                width: `${progressPct}%`,
                background: progressPct === 100 ? "#27AE60" : "var(--gold)",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* mini dots row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 14,
              flexWrap: "wrap" as const,
            }}
          >
            {sectionDefs.map((s) => {
              const status = getQualityStatus(
                charter.sections[s.key],
                !!charter.completeness[s.key]
              );
              return (
                <div
                  key={s.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <StatusDot status={status} />
                  <span
                    style={{
                      fontFamily: "var(--ui)",
                      fontSize: 11,
                      color: "var(--text-mid)",
                    }}
                  >
                    {s.name}
                  </span>
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
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. ERP Transformation Programme"
                  value={charter.projectName}
                  onChange={(e) => updateField("projectName", e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Created By</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith, Change Lead"
                  value={charter.createdBy}
                  onChange={(e) => updateField("createdBy", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- 7 CHARTER SECTIONS ---------- */}
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
          {sectionDefs.map((s, idx) => {
            const isOpen = !!expanded[s.key];
            const text = charter.sections[s.key];
            const isComplete = !!charter.completeness[s.key];
            const status = getQualityStatus(text, isComplete);

            return (
              <ScrollReveal key={s.key} delay={idx * 60}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--cream)",
                    transition: "border-color 0.2s",
                    ...(isComplete
                      ? { borderColor: "#27AE60" }
                      : {}),
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
                    <StatusDot status={status} />
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
                    <div
                      style={{
                        padding: "0 24px 24px",
                      }}
                    >
                      {/* guidance prompt */}
                      <div
                        style={{
                          padding: "14px 18px",
                          background: "rgba(10,22,40,0.03)",
                          borderLeft: "3px solid var(--gold)",
                          marginBottom: 18,
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
                          {s.guidance}
                        </p>
                      </div>

                      {/* textarea */}
                      <div className="form-group" style={{ marginBottom: 14 }}>
                        <textarea
                          rows={6}
                          placeholder={`Write your ${s.name.toLowerCase()} here...`}
                          value={text}
                          onChange={(e) => updateSection(s.key, e.target.value)}
                          style={{ minHeight: 140 }}
                        />
                      </div>

                      {/* character hint + mark complete */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap" as const,
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 11,
                            color: "#9A9080",
                          }}
                        >
                          {text.trim().length === 0
                            ? "Not started"
                            : text.trim().length < 50
                              ? `${text.trim().length} characters \u2014 consider adding more detail`
                              : `${text.trim().length} characters`}
                        </span>

                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                            fontFamily: "var(--ui)",
                            fontSize: 12,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            color: isComplete ? "#27AE60" : "var(--text-mid)",
                            userSelect: "none",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 20,
                              height: 20,
                              border: isComplete
                                ? "1.5px solid #27AE60"
                                : "1.5px solid rgba(100,90,70,0.35)",
                              background: isComplete
                                ? "#27AE60"
                                : "transparent",
                              transition: "all 0.2s",
                              flexShrink: 0,
                            }}
                          >
                            {isComplete && (
                              <span
                                style={{
                                  color: "#fff",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  lineHeight: 1,
                                }}
                              >
                                &#10003;
                              </span>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            checked={isComplete}
                            onChange={() => toggleComplete(s.key)}
                            style={{ display: "none" }}
                          />
                          Mark as complete
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ---------- CHARTER SUMMARY ---------- */}
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
            Charter Summary
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
            {charter.projectName || "Untitled Charter"}
          </h2>
          {(charter.createdBy || charter.createdDate) && (
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 32,
              }}
            >
              {charter.createdBy && <>Prepared by {charter.createdBy}</>}
              {charter.createdBy && charter.createdDate && <> &middot; </>}
              {charter.createdDate && <>{charter.createdDate}</>}
            </p>
          )}

          {/* progress badge */}
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background:
                completedCount === sectionDefs.length
                  ? "#27AE60"
                  : "var(--navy)",
              color: "#fff",
              fontFamily: "var(--ui)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              marginBottom: 32,
            }}
          >
            {completedCount === sectionDefs.length
              ? "Charter Complete"
              : `${completedCount} of ${sectionDefs.length} sections complete`}
          </div>

          {/* rendered sections */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 0,
            }}
          >
            {sectionDefs.map((s) => {
              const text = charter.sections[s.key];
              const isComplete = !!charter.completeness[s.key];
              const status = getQualityStatus(text, isComplete);

              return (
                <div
                  key={s.key}
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
                      marginBottom: 10,
                    }}
                  >
                    <StatusDot status={status} />
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
                        fontSize: 22,
                        fontWeight: 600,
                        color: "var(--navy)",
                      }}
                    >
                      {s.name}
                    </span>
                  </div>
                  {text.trim() ? (
                    <p
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 14,
                        color: "var(--text-mid)",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap" as const,
                        margin: 0,
                      }}
                    >
                      {text}
                    </p>
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
                      This section has not been completed yet.
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
            Want to learn what makes each charter section effective? Read the
            full knowledge article.
          </p>
          <Link href="/knowledge/change-charter" className="btn">
            Related Knowledge: The Change Charter
          </Link>
        </section>
      </ScrollReveal>

      <Footer />
    </>
  );
}
