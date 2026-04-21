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

type BenefitType =
  | "financial"
  | "operational"
  | "customer"
  | "employee"
  | "strategic";

type TrackingFrequency = "monthly" | "quarterly" | "six-monthly" | "annually";

type BenefitStatus =
  | "not-started"
  | "on-track"
  | "at-risk"
  | "achieved"
  | "not-achieved";

interface Benefit {
  id: string;
  name: string;
  description: string;
  type: BenefitType;
  owner: string;
  baseline: string;
  target: string;
  currentValue: string;
  measureMethod: string;
  trackingFrequency: TrackingFrequency;
  status: BenefitStatus;
}

interface BenefitsRegister {
  projectName: string;
  createdBy: string;
  benefits: Benefit[];
}

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                          */
/* ------------------------------------------------------------------ */

const TYPE_LABELS: Record<BenefitType, string> = {
  financial: "Financial",
  operational: "Operational",
  customer: "Customer",
  employee: "Employee",
  strategic: "Strategic",
};

const TYPE_COLOURS: Record<BenefitType, string> = {
  financial: "#2E7D32",
  operational: "#1565C0",
  customer: "#6A1B9A",
  employee: "#C4943A",
  strategic: "#0A1628",
};

const FREQUENCY_LABELS: Record<TrackingFrequency, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "six-monthly": "Six-Monthly",
  annually: "Annually",
};

const STATUS_LABELS: Record<BenefitStatus, string> = {
  "not-started": "Not Started",
  "on-track": "On Track",
  "at-risk": "At Risk",
  achieved: "Achieved",
  "not-achieved": "Not Achieved",
};

const STATUS_COLOURS: Record<BenefitStatus, string> = {
  "not-started": "#8E8E8E",
  "on-track": "#27AE60",
  "at-risk": "#D4A017",
  achieved: "#1B7A3D",
  "not-achieved": "#C0392B",
};

const EMPTY_BENEFIT: Omit<Benefit, "id"> = {
  name: "",
  description: "",
  type: "financial",
  owner: "",
  baseline: "",
  target: "",
  currentValue: "",
  measureMethod: "",
  trackingFrequency: "quarterly",
  status: "not-started",
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getOverallHealth(benefits: Benefit[]): {
  label: string;
  colour: string;
} {
  if (benefits.length === 0) return { label: "No Benefits Registered", colour: "#8E8E8E" };
  const achieved = benefits.filter((b) => b.status === "achieved").length;
  const onTrack = benefits.filter((b) => b.status === "on-track").length;
  const atRisk = benefits.filter((b) => b.status === "at-risk").length;
  const notAchieved = benefits.filter((b) => b.status === "not-achieved").length;
  if (achieved === benefits.length) return { label: "All Benefits Achieved", colour: "#1B7A3D" };
  if (notAchieved > benefits.length / 2) return { label: "Critical", colour: "#C0392B" };
  if (atRisk > benefits.length / 2) return { label: "At Risk", colour: "#D4A017" };
  if (onTrack + achieved >= benefits.length / 2) return { label: "Healthy", colour: "#27AE60" };
  return { label: "Needs Attention", colour: "#D4A017" };
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function BenefitsRegisterPage() {
  /* ---- register state ---- */
  const [register, setRegister] = useState<BenefitsRegister>({
    projectName: "",
    createdBy: "",
    benefits: [],
  });

  /* ---- modal state ---- */
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Benefit, "id">>(EMPTY_BENEFIT);

  const { data: savedData, setData: saveToDb, isAuthenticated, isSaving, lastSaved, loaded } = useToolData<BenefitsRegister>({
    toolType: "benefits-register",
    defaultData: { projectName: "", createdBy: "", benefits: [] },
  });

  // Load from database on first load
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (loaded && !hasLoaded.current && savedData && savedData.projectName !== undefined) {
      setRegister(savedData);
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
    saveToDb(register);
  }, [register]);

  /* ---- updaters ---- */
  const updateField = useCallback(
    (field: "projectName" | "createdBy", value: string) => {
      setRegister((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateFormField = useCallback(
    <K extends keyof Omit<Benefit, "id">>(
      field: K,
      value: Omit<Benefit, "id">[K]
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  /* ---- modal actions ---- */
  const openAddModal = useCallback(() => {
    setEditingId(null);
    setFormData({ ...EMPTY_BENEFIT });
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback(
    (benefit: Benefit) => {
      setEditingId(benefit.id);
      const { id, ...rest } = benefit;
      setFormData(rest);
      setModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ ...EMPTY_BENEFIT });
  }, []);

  const saveBenefit = useCallback(() => {
    if (!formData.name.trim()) return;

    setRegister((prev) => {
      if (editingId) {
        return {
          ...prev,
          benefits: prev.benefits.map((b) =>
            b.id === editingId ? { ...formData, id: editingId } : b
          ),
        };
      }
      return {
        ...prev,
        benefits: [...prev.benefits, { ...formData, id: generateId() }],
      };
    });
    closeModal();
  }, [formData, editingId, closeModal]);

  const deleteBenefit = useCallback(() => {
    if (!editingId) return;
    setRegister((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((b) => b.id !== editingId),
    }));
    closeModal();
  }, [editingId, closeModal]);

  /* ---- derived ---- */
  const { benefits } = register;
  const health = getOverallHealth(benefits);

  const countByStatus = (s: BenefitStatus) =>
    benefits.filter((b) => b.status === s).length;
  const countByType = (t: BenefitType) =>
    benefits.filter((b) => b.type === t).length;

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
        <h1 className="article-title">Benefits Register</h1>
        <p className="article-intro">
          Define, track, and manage the benefits your change initiative is
          expected to deliver. For each benefit, capture baselines, targets,
          owners, and measurement methods, then monitor realisation status over
          time with the summary dashboard.
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
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <ProjectSelector value={register.projectName} onChange={(val: string) => updateField("projectName", val)} isAuthenticated={isAuthenticated} />
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Created By</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith, Benefits Owner"
                  value={register.createdBy}
                  onChange={(e) => updateField("createdBy", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>


      {/* ---------- SUMMARY DASHBOARD ---------- */}
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
              fontFamily: "var(--ui)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: "#9A9080",
              marginBottom: 20,
            }}
          >
            Benefits Dashboard
          </div>

          {/* top row: total + health */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                padding: "24px 28px",
                border: "1px solid var(--border)",
                background: "var(--cream)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#9A9080",
                  marginBottom: 8,
                }}
              >
                Total Benefits
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 36,
                  fontWeight: 500,
                  color: "var(--navy)",
                }}
              >
                {benefits.length}
              </div>
            </div>
            <div
              style={{
                padding: "24px 28px",
                border: "1px solid var(--border)",
                background: "var(--cream)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#9A9080",
                  marginBottom: 8,
                }}
              >
                Overall Health
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: health.colour,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--navy)",
                  }}
                >
                  {health.label}
                </span>
              </div>
            </div>
          </div>

          {/* status row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {(
              [
                "not-started",
                "on-track",
                "at-risk",
                "achieved",
                "not-achieved",
              ] as BenefitStatus[]
            ).map((s) => (
              <div
                key={s}
                style={{
                  padding: "16px 14px",
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  textAlign: "center" as const,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: STATUS_COLOURS[s],
                    marginBottom: 4,
                  }}
                >
                  {countByStatus(s)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: "#9A9080",
                  }}
                >
                  {STATUS_LABELS[s]}
                </div>
              </div>
            ))}
          </div>

          {/* type row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {(
              [
                "financial",
                "operational",
                "customer",
                "employee",
                "strategic",
              ] as BenefitType[]
            ).map((t) => (
              <div
                key={t}
                style={{
                  padding: "16px 14px",
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                  textAlign: "center" as const,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--navy)",
                    marginBottom: 4,
                  }}
                >
                  {countByType(t)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: TYPE_COLOURS[t],
                  }}
                >
                  {TYPE_LABELS[t]}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------- ADD BENEFIT BUTTON ---------- */}
      <ScrollReveal>
        <section
          style={{
            padding: "0 48px 20px",
            maxWidth: 820,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            }}
          >
            Registered Benefits
          </div>
          <button
            onClick={openAddModal}
            className="btn"
            style={{ fontSize: 12, padding: "10px 22px" }}
          >
            + Add Benefit
          </button>
        </section>
      </ScrollReveal>

      {/* ---------- BENEFIT CARDS ---------- */}
      <section
        style={{
          padding: "0 48px 56px",
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        {benefits.length === 0 ? (
          <ScrollReveal>
            <div
              style={{
                padding: "48px 32px",
                border: "1px dashed var(--border)",
                textAlign: "center" as const,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 14,
                  color: "#9A9080",
                  marginBottom: 8,
                }}
              >
                No benefits have been registered yet.
              </p>
              <p
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  color: "#9A9080",
                }}
              >
                Click &ldquo;Add Benefit&rdquo; to define your first benefit.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: 14,
            }}
          >
            {benefits.map((benefit, idx) => (
              <ScrollReveal key={benefit.id} delay={idx * 60}>
                <div
                  onClick={() => openEditModal(benefit)}
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--cream)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    borderLeft: `4px solid ${STATUS_COLOURS[benefit.status]}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      STATUS_COLOURS[benefit.status];
                    (e.currentTarget as HTMLDivElement).style.borderLeftWidth =
                      "4px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                      STATUS_COLOURS[benefit.status];
                    (e.currentTarget as HTMLDivElement).style.borderLeftWidth =
                      "4px";
                  }}
                >
                  {/* card header */}
                  <div
                    style={{
                      padding: "20px 24px 0",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 14,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 6,
                          flexWrap: "wrap" as const,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: 20,
                            fontWeight: 600,
                            color: "var(--navy)",
                          }}
                        >
                          {benefit.name}
                        </span>
                        {/* type badge */}
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            fontFamily: "var(--ui)",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            color: "#fff",
                            background: TYPE_COLOURS[benefit.type],
                          }}
                        >
                          {TYPE_LABELS[benefit.type]}
                        </span>
                      </div>
                      {benefit.description && (
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: 13,
                            color: "var(--text-mid)",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {benefit.description}
                        </p>
                      )}
                    </div>
                    {/* status badge */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: STATUS_COLOURS[benefit.status],
                        background: `${STATUS_COLOURS[benefit.status]}15`,
                        border: `1px solid ${STATUS_COLOURS[benefit.status]}30`,
                        whiteSpace: "nowrap" as const,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: STATUS_COLOURS[benefit.status],
                        }}
                      />
                      {STATUS_LABELS[benefit.status]}
                    </span>
                  </div>

                  {/* card details */}
                  <div
                    style={{
                      padding: "16px 24px 20px",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 16,
                    }}
                  >
                    {/* owner */}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                          marginBottom: 4,
                        }}
                      >
                        Owner
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--navy)",
                          fontWeight: 500,
                        }}
                      >
                        {benefit.owner || "\u2014"}
                      </div>
                    </div>
                    {/* baseline */}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                          marginBottom: 4,
                        }}
                      >
                        Baseline
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--navy)",
                          fontWeight: 500,
                        }}
                      >
                        {benefit.baseline || "\u2014"}
                      </div>
                    </div>
                    {/* target */}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                          marginBottom: 4,
                        }}
                      >
                        Target
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--navy)",
                          fontWeight: 500,
                        }}
                      >
                        {benefit.target || "\u2014"}
                      </div>
                    </div>
                    {/* current */}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "#9A9080",
                          marginBottom: 4,
                        }}
                      >
                        Current
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: 13,
                          color: "var(--navy)",
                          fontWeight: 500,
                        }}
                      >
                        {benefit.currentValue || "\u2014"}
                      </div>
                    </div>
                  </div>

                  {/* measurement row */}
                  <div
                    style={{
                      padding: "0 24px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap" as const,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 12,
                        color: "var(--text-mid)",
                      }}
                    >
                      <span style={{ color: "#9A9080" }}>Measurement: </span>
                      {benefit.measureMethod || "\u2014"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: "#9A9080",
                        textTransform: "uppercase" as const,
                      }}
                    >
                      Tracked {FREQUENCY_LABELS[benefit.trackingFrequency]}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

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
            Want to learn how to define, measure, and realise benefits
            effectively? Read the full knowledge article.
          </p>
          <Link href="/knowledge/benefits-realisation" className="btn">
            Related Knowledge: Benefits Realisation
          </Link>
        </section>
      </ScrollReveal>

      {/* ---------- MODAL ---------- */}
      <div
        className={`modal-overlay${modalOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          className="modal"
          style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" as const }}
        >
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-title">
            {editingId ? "Edit Benefit" : "Add Benefit"}
          </div>
          <div className="modal-desc">
            {editingId
              ? "Update the details of this benefit, or delete it from the register."
              : "Define a new benefit for your change initiative. All fields help build a comprehensive benefits register."}
          </div>

          <div className="modal-form">
            {/* name */}
            <div className="form-group">
              <label>Benefit Name</label>
              <input
                type="text"
                placeholder="e.g. Reduced processing time"
                value={formData.name}
                onChange={(e) => updateFormField("name", e.target.value)}
              />
            </div>

            {/* description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={3}
                placeholder="Describe what this benefit is and why it matters..."
                value={formData.description}
                onChange={(e) =>
                  updateFormField("description", e.target.value)
                }
                style={{ minHeight: 80 }}
              />
            </div>

            {/* type + owner */}
            <div className="form-row">
              <div className="form-group">
                <label>Benefit Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    updateFormField("type", e.target.value as BenefitType)
                  }
                >
                  {(Object.keys(TYPE_LABELS) as BenefitType[]).map((t) => (
                    <option key={t} value={t}>
                      {TYPE_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Benefit Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Head of Operations"
                  value={formData.owner}
                  onChange={(e) => updateFormField("owner", e.target.value)}
                />
              </div>
            </div>

            {/* baseline + target */}
            <div className="form-row">
              <div className="form-group">
                <label>Baseline Value</label>
                <input
                  type="text"
                  placeholder="e.g. 45 minutes per transaction"
                  value={formData.baseline}
                  onChange={(e) => updateFormField("baseline", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Target Value</label>
                <input
                  type="text"
                  placeholder="e.g. 15 minutes per transaction"
                  value={formData.target}
                  onChange={(e) => updateFormField("target", e.target.value)}
                />
              </div>
            </div>

            {/* current value */}
            <div className="form-group">
              <label>Current Value</label>
              <input
                type="text"
                placeholder="e.g. 30 minutes per transaction"
                value={formData.currentValue}
                onChange={(e) =>
                  updateFormField("currentValue", e.target.value)
                }
              />
            </div>

            {/* measurement method */}
            <div className="form-group">
              <label>Measurement Method</label>
              <input
                type="text"
                placeholder="e.g. Monthly average from system reports"
                value={formData.measureMethod}
                onChange={(e) =>
                  updateFormField("measureMethod", e.target.value)
                }
              />
            </div>

            {/* tracking frequency + status */}
            <div className="form-row">
              <div className="form-group">
                <label>Tracking Frequency</label>
                <select
                  value={formData.trackingFrequency}
                  onChange={(e) =>
                    updateFormField(
                      "trackingFrequency",
                      e.target.value as TrackingFrequency
                    )
                  }
                >
                  {(
                    Object.keys(FREQUENCY_LABELS) as TrackingFrequency[]
                  ).map((f) => (
                    <option key={f} value={f}>
                      {FREQUENCY_LABELS[f]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    updateFormField(
                      "status",
                      e.target.value as BenefitStatus
                    )
                  }
                >
                  {(Object.keys(STATUS_LABELS) as BenefitStatus[]).map(
                    (s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* actions */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <button
                className="btn modal-submit"
                onClick={saveBenefit}
                style={{ flex: 1 }}
              >
                {editingId ? "Update Benefit" : "Add Benefit"}
              </button>
              {editingId && (
                <button
                  onClick={deleteBenefit}
                  style={{
                    background: "none",
                    border: "1px solid #C0392B",
                    color: "#C0392B",
                    fontFamily: "var(--ui)",
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    padding: "13px 22px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap" as const,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#C0392B";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "none";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#C0392B";
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
