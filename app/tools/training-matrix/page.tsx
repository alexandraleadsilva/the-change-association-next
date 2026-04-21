"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToolData } from "@/lib/useToolData";
import { ToolLayout } from "@/components/ToolLayout";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SkillCategory =
  | "technical"
  | "process"
  | "behavioural"
  | "system"
  | "leadership";

interface Role {
  id: string;
  name: string;
  headcount: string;
}

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

interface GapValue {
  current: number;
  required: number;
}

interface TrainingMatrix {
  projectName: string;
  createdBy: string;
  roles: Role[];
  skills: Skill[];
  gaps: Record<string, Record<string, GapValue>>;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: "technical", label: "Technical" },
  { value: "process", label: "Process" },
  { value: "behavioural", label: "Behavioural" },
  { value: "system", label: "System" },
  { value: "leadership", label: "Leadership" },
];

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: "Technical",
  process: "Process",
  behavioural: "Behavioural",
  system: "System",
  leadership: "Leadership",
};

const CATEGORY_COLOURS: Record<SkillCategory, string> = {
  technical: "#2980B9",
  process: "#8E44AD",
  behavioural: "#27AE60",
  system: "#D4A017",
  leadership: "#C0392B",
};

const LEVEL_LABELS: Record<number, string> = {
  1: "None",
  2: "Basic",
  3: "Competent",
  4: "Expert",
};

const EMPTY_DEFAULT: TrainingMatrix = {
  projectName: "",
  createdBy: "",
  roles: [],
  skills: [],
  gaps: {},
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getGapSeverity(current: number, required: number): "none" | "amber" | "red" {
  const diff = required - current;
  if (diff <= 0) return "none";
  if (diff === 1) return "amber";
  return "red";
}

function gapColour(severity: "none" | "amber" | "red"): string {
  if (severity === "none") return "rgba(39,174,96,0.12)";
  if (severity === "amber") return "rgba(212,160,23,0.15)";
  return "rgba(198,40,40,0.12)";
}

function gapBorderColour(severity: "none" | "amber" | "red"): string {
  if (severity === "none") return "rgba(39,174,96,0.35)";
  if (severity === "amber") return "rgba(212,160,23,0.45)";
  return "rgba(198,40,40,0.40)";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TrainingMatrixPage() {
  /* --- project-level state --- */
  const [projectName, setProjectName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  /* --- data state --- */
  const [roles, setRoles] = useState<Role[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [gaps, setGaps] = useState<Record<string, Record<string, GapValue>>>({});

  /* --- form state --- */
  const [roleName, setRoleName] = useState("");
  const [roleHeadcount, setRoleHeadcount] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState<SkillCategory>("technical");

  /* --- persistence --- */
  const {
    data: savedData,
    setData: saveToDb,
    isAuthenticated,
    loaded,
  } = useToolData<TrainingMatrix>({
    toolType: "training-matrix",
    defaultData: EMPTY_DEFAULT,
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setProjectName(savedData.projectName || "");
      setCreatedBy(savedData.createdBy || "");
      setRoles(savedData.roles || []);
      setSkills(savedData.skills || []);
      setGaps(savedData.gaps || {});
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
    saveToDb({ projectName, createdBy, roles, skills, gaps });
  }, [projectName, createdBy, roles, skills, gaps]);

  /* --- role helpers --- */
  const addRole = () => {
    if (!roleName.trim()) return;
    const newRole: Role = {
      id: generateId(),
      name: roleName.trim(),
      headcount: roleHeadcount.trim(),
    };
    setRoles((prev) => [...prev, newRole]);
    setRoleName("");
    setRoleHeadcount("");
  };

  const removeRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setGaps((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  /* --- skill helpers --- */
  const addSkill = () => {
    if (!skillName.trim()) return;
    const newSkill: Skill = {
      id: generateId(),
      name: skillName.trim(),
      category: skillCategory,
    };
    setSkills((prev) => [...prev, newSkill]);
    setSkillName("");
    setSkillCategory("technical");
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    setGaps((prev) => {
      const next: Record<string, Record<string, GapValue>> = {};
      for (const roleId of Object.keys(prev)) {
        const roleCopy = { ...prev[roleId] };
        delete roleCopy[id];
        next[roleId] = roleCopy;
      }
      return next;
    });
  };

  /* --- gap helpers --- */
  const getGap = (roleId: string, skillId: string): GapValue => {
    return gaps[roleId]?.[skillId] || { current: 1, required: 1 };
  };

  const setGap = (roleId: string, skillId: string, field: "current" | "required", value: number) => {
    setGaps((prev) => ({
      ...prev,
      [roleId]: {
        ...(prev[roleId] || {}),
        [skillId]: {
          ...(prev[roleId]?.[skillId] || { current: 1, required: 1 }),
          [field]: value,
        },
      },
    }));
  };

  /* --- summary helpers --- */
  const allGapEntries: { roleId: string; skillId: string; gap: GapValue; severity: "none" | "amber" | "red" }[] = [];
  for (const role of roles) {
    for (const skill of skills) {
      const g = getGap(role.id, skill.id);
      const sev = getGapSeverity(g.current, g.required);
      allGapEntries.push({ roleId: role.id, skillId: skill.id, gap: g, severity: sev });
    }
  }

  const totalGaps = allGapEntries.filter((e) => e.severity !== "none").length;
  const amberGaps = allGapEntries.filter((e) => e.severity === "amber").length;
  const redGaps = allGapEntries.filter((e) => e.severity === "red").length;
  const greenCells = allGapEntries.filter((e) => e.severity === "none").length;

  // Roles with most gaps
  const roleGapCounts = roles.map((role) => {
    const count = allGapEntries.filter((e) => e.roleId === role.id && e.severity !== "none").length;
    return { role, count };
  }).sort((a, b) => b.count - a.count);

  // Skills with most gaps
  const skillGapCounts = skills.map((skill) => {
    const count = allGapEntries.filter((e) => e.skillId === skill.id && e.severity !== "none").length;
    return { skill, count };
  }).sort((a, b) => b.count - a.count);

  const hasMatrix = roles.length > 0 && skills.length > 0;

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
          <h1>Training Needs Matrix</h1>
          <p>
            Identify skill gaps across roles and prioritise training for your
            change initiative. Map current vs required competency levels to build
            a targeted learning plan.
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
      <ToolLayout
        projectName={projectName}
        onProjectChange={setProjectName}
        createdBy={createdBy}
        onCreatedByChange={setCreatedBy}
        isAuthenticated={isAuthenticated}
      >

        {/* ---- Add Roles ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--navy)",
                marginBottom: 20,
              }}
            >
              Add Roles
            </h2>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              Define the roles or groups impacted by the change. Include an approximate headcount for prioritisation.
            </p>

            {/* Inline form */}
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-end",
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <div className="form-group" style={{ flex: 2, minWidth: 200, marginBottom: 0 }}>
                <label htmlFor="roleName">Role Name</label>
                <input
                  id="roleName"
                  type="text"
                  placeholder="e.g. Finance Team, Project Managers"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRole()}
                />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: 120, marginBottom: 0 }}>
                <label htmlFor="roleHeadcount">Headcount (approx)</label>
                <input
                  id="roleHeadcount"
                  type="text"
                  placeholder="e.g. 25"
                  value={roleHeadcount}
                  onChange={(e) => setRoleHeadcount(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRole()}
                />
              </div>
              <button
                className="btn"
                onClick={addRole}
                style={{ marginBottom: 0, whiteSpace: "nowrap" }}
              >
                + Add Role
              </button>
            </div>

            {/* Role list */}
            {roles.length === 0 ? (
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
                  No roles added yet. Add a role above to begin.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {roles.map((role) => (
                  <div
                    key={role.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      border: "1px solid var(--border)",
                      background: "var(--cream)",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--navy)",
                        }}
                      >
                        {role.name}
                      </span>
                      {role.headcount && (
                        <span
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 11,
                            color: "#9A9080",
                            marginLeft: 8,
                          }}
                        >
                          ~{role.headcount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeRole(role.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--ui)",
                        fontSize: 16,
                        color: "#9A9080",
                        padding: "0 2px",
                        lineHeight: 1,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#C62828"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#9A9080"; }}
                      title="Remove role"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Add Skills ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--navy)",
                marginBottom: 20,
              }}
            >
              Add Skills
            </h2>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              Define the skills or competencies needed for the change. Categorise each to help structure training delivery.
            </p>

            {/* Inline form */}
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-end",
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <div className="form-group" style={{ flex: 2, minWidth: 200, marginBottom: 0 }}>
                <label htmlFor="skillName">Skill Name</label>
                <input
                  id="skillName"
                  type="text"
                  placeholder="e.g. SAP Navigation, Stakeholder Management"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: 160, marginBottom: 0 }}>
                <label htmlFor="skillCategory">Category</label>
                <select
                  id="skillCategory"
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value as SkillCategory)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn"
                onClick={addSkill}
                style={{ marginBottom: 0, whiteSpace: "nowrap" }}
              >
                + Add Skill
              </button>
            </div>

            {/* Skill list */}
            {skills.length === 0 ? (
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
                  No skills added yet. Add a skill above to begin.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      border: "1px solid var(--border)",
                      background: "var(--cream)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: CATEGORY_COLOURS[skill.category],
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--navy)",
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: CATEGORY_COLOURS[skill.category],
                          marginLeft: 8,
                        }}
                      >
                        {CATEGORY_LABELS[skill.category]}
                      </span>
                    </div>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--ui)",
                        fontSize: 16,
                        color: "#9A9080",
                        padding: "0 2px",
                        lineHeight: 1,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#C62828"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#9A9080"; }}
                      title="Remove skill"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        <hr className="section-divider" style={{ marginBottom: 48 }} />

        {/* ---- Training Needs Matrix ---- */}
        <ScrollReveal>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--navy)",
                marginBottom: 8,
              }}
            >
              Training Needs Matrix
            </h2>
            <p
              style={{
                fontFamily: "var(--ui)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Set current and required competency levels for each role-skill combination.
              Cells are colour-coded: <span style={{ color: "#27AE60", fontWeight: 500 }}>green</span> = no gap,{" "}
              <span style={{ color: "#D4A017", fontWeight: 500 }}>amber</span> = gap of 1,{" "}
              <span style={{ color: "#C62828", fontWeight: 500 }}>red</span> = gap of 2+.
            </p>

            {!hasMatrix ? (
              <div
                style={{
                  padding: "40px 28px",
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
                  Add at least one role and one skill above to generate the matrix.
                </p>
              </div>
            ) : (
              <div
                style={{
                  overflowX: "auto",
                  border: "1px solid var(--border)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    minWidth: skills.length * 160 + 180,
                    borderCollapse: "collapse",
                    fontFamily: "var(--ui)",
                    fontSize: 13,
                  }}
                >
                  {/* Column headers */}
                  <thead>
                    <tr>
                      <th
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          background: "var(--navy)",
                          color: "var(--cream)",
                          padding: "14px 16px",
                          textAlign: "left",
                          fontFamily: "var(--ui)",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          borderRight: "1px solid rgba(255,255,255,0.1)",
                          minWidth: 180,
                        }}
                      >
                        Role
                      </th>
                      {skills.map((skill) => (
                        <th
                          key={skill.id}
                          style={{
                            background: "var(--navy)",
                            color: "var(--cream)",
                            padding: "14px 12px",
                            textAlign: "center",
                            fontFamily: "var(--ui)",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            borderRight: "1px solid rgba(255,255,255,0.1)",
                            minWidth: 160,
                            lineHeight: 1.4,
                          }}
                        >
                          <div style={{ marginBottom: 4 }}>{skill.name}</div>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 400,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: CATEGORY_COLOURS[skill.category],
                            }}
                          >
                            {CATEGORY_LABELS[skill.category]}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {roles.map((role, rowIdx) => (
                      <tr key={role.id}>
                        {/* Role label */}
                        <td
                          style={{
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                            background: rowIdx % 2 === 0 ? "var(--cream)" : "var(--cream-lt)",
                            padding: "14px 16px",
                            borderBottom: "1px solid var(--border)",
                            borderRight: "1px solid var(--border)",
                            fontWeight: 500,
                            color: "var(--navy)",
                            minWidth: 180,
                          }}
                        >
                          <div>{role.name}</div>
                          {role.headcount && (
                            <span
                              style={{
                                fontSize: 11,
                                color: "#9A9080",
                                fontWeight: 400,
                              }}
                            >
                              ~{role.headcount} people
                            </span>
                          )}
                        </td>

                        {/* Gap cells */}
                        {skills.map((skill) => {
                          const g = getGap(role.id, skill.id);
                          const severity = getGapSeverity(g.current, g.required);
                          return (
                            <td
                              key={skill.id}
                              style={{
                                background: gapColour(severity),
                                borderBottom: "1px solid var(--border)",
                                borderRight: `1px solid ${gapBorderColour(severity)}`,
                                padding: "10px 8px",
                                textAlign: "center",
                                verticalAlign: "middle",
                                minWidth: 160,
                                transition: "background 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 6,
                                  alignItems: "center",
                                }}
                              >
                                {/* Current level */}
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span
                                    style={{
                                      fontSize: 9,
                                      fontWeight: 500,
                                      letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      color: "#9A9080",
                                      width: 56,
                                      textAlign: "right",
                                    }}
                                  >
                                    Current
                                  </span>
                                  <select
                                    value={g.current}
                                    onChange={(e) =>
                                      setGap(role.id, skill.id, "current", Number(e.target.value))
                                    }
                                    style={{
                                      fontFamily: "var(--ui)",
                                      fontSize: 12,
                                      padding: "4px 6px",
                                      border: "1px solid var(--border)",
                                      background: "rgba(255,255,255,0.6)",
                                      color: "var(--navy)",
                                      cursor: "pointer",
                                      outline: "none",
                                      minWidth: 80,
                                    }}
                                  >
                                    {[1, 2, 3, 4].map((v) => (
                                      <option key={v} value={v}>
                                        {v} - {LEVEL_LABELS[v]}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Required level */}
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span
                                    style={{
                                      fontSize: 9,
                                      fontWeight: 500,
                                      letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      color: "#9A9080",
                                      width: 56,
                                      textAlign: "right",
                                    }}
                                  >
                                    Required
                                  </span>
                                  <select
                                    value={g.required}
                                    onChange={(e) =>
                                      setGap(role.id, skill.id, "required", Number(e.target.value))
                                    }
                                    style={{
                                      fontFamily: "var(--ui)",
                                      fontSize: 12,
                                      padding: "4px 6px",
                                      border: "1px solid var(--border)",
                                      background: "rgba(255,255,255,0.6)",
                                      color: "var(--navy)",
                                      cursor: "pointer",
                                      outline: "none",
                                      minWidth: 80,
                                    }}
                                  >
                                    {[1, 2, 3, 4].map((v) => (
                                      <option key={v} value={v}>
                                        {v} - {LEVEL_LABELS[v]}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Gap indicator */}
                                {severity !== "none" && (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      fontWeight: 600,
                                      letterSpacing: "0.06em",
                                      color: severity === "amber" ? "#B8860B" : "#C62828",
                                    }}
                                  >
                                    Gap: {g.required - g.current}
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </ScrollReveal>

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
              Gap Analysis Summary
            </h2>

            {!hasMatrix ? (
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
                  Add roles and skills to see the gap analysis summary.
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
                      Total Gaps Identified
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 32,
                        fontWeight: 600,
                        color: "var(--cream)",
                      }}
                    >
                      {totalGaps}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        color: "rgba(234,228,213,0.5)",
                        marginLeft: 8,
                      }}
                    >
                      of {allGapEntries.length} cells
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 24,
                          fontWeight: 600,
                          color: "#27AE60",
                          display: "block",
                        }}
                      >
                        {greenCells}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          color: "rgba(234,228,213,0.5)",
                        }}
                      >
                        No Gap
                      </span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 24,
                          fontWeight: 600,
                          color: "#D4A017",
                          display: "block",
                        }}
                      >
                        {amberGaps}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          color: "rgba(234,228,213,0.5)",
                        }}
                      >
                        Amber (1)
                      </span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 24,
                          fontWeight: 600,
                          color: "#C62828",
                          display: "block",
                        }}
                      >
                        {redGaps}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          color: "rgba(234,228,213,0.5)",
                        }}
                      >
                        Red (2+)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role and Skill breakdown */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {/* Roles with most gaps */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--cream)",
                      padding: "20px 22px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        display: "block",
                        marginBottom: 14,
                      }}
                    >
                      Roles by Gap Count
                    </span>
                    {roleGapCounts.length === 0 ? (
                      <p
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "#9A9080",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        No roles defined.
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {roleGapCounts.map(({ role, count }, idx) => {
                          const maxCount = roleGapCounts[0]?.count || 1;
                          const isHighest = idx === 0 && count > 0;
                          return (
                            <div
                              key={role.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--ui)",
                                  fontSize: 13,
                                  fontWeight: isHighest ? 600 : 400,
                                  color: isHighest ? "#C62828" : "var(--navy)",
                                  minWidth: 120,
                                }}
                              >
                                {role.name}
                              </span>
                              <div
                                style={{
                                  flex: 1,
                                  height: 8,
                                  background: "rgba(10,22,40,0.06)",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%",
                                    background: count === 0 ? "#27AE60" : isHighest ? "#C62828" : "#D4A017",
                                    transition: "width 0.4s",
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  fontFamily: "var(--ui)",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: count === 0 ? "#27AE60" : isHighest ? "#C62828" : "var(--navy)",
                                  minWidth: 24,
                                  textAlign: "right",
                                }}
                              >
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Skills with most gaps */}
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--cream)",
                      padding: "20px 22px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        display: "block",
                        marginBottom: 14,
                      }}
                    >
                      Skills by Gap Count
                    </span>
                    {skillGapCounts.length === 0 ? (
                      <p
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "#9A9080",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        No skills defined.
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {skillGapCounts.map(({ skill, count }, idx) => {
                          const maxCount = skillGapCounts[0]?.count || 1;
                          const isHighest = idx === 0 && count > 0;
                          return (
                            <div
                              key={skill.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  fontFamily: "var(--ui)",
                                  fontSize: 13,
                                  fontWeight: isHighest ? 600 : 400,
                                  color: isHighest ? "#C62828" : "var(--navy)",
                                  minWidth: 120,
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: CATEGORY_COLOURS[skill.category],
                                    flexShrink: 0,
                                  }}
                                />
                                {skill.name}
                              </span>
                              <div
                                style={{
                                  flex: 1,
                                  height: 8,
                                  background: "rgba(10,22,40,0.06)",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%",
                                    background: count === 0 ? "#27AE60" : isHighest ? "#C62828" : "#D4A017",
                                    transition: "width 0.4s",
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  fontFamily: "var(--ui)",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: count === 0 ? "#27AE60" : isHighest ? "#C62828" : "var(--navy)",
                                  minWidth: 24,
                                  textAlign: "right",
                                }}
                              >
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
              href="/knowledge/learning-design"
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
              <span>Learning Design</span>
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
      </ToolLayout>

      <Footer />
    </>
  );
}
