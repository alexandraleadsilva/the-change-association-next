"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const frameworks = [
  {
    id: "adkar",
    name: "Prosci ADKAR",
    origin: "Jeff Hiatt, Prosci (2003)",
    focus: "Individual change",
    summary: "ADKAR is a goal-oriented model that focuses on five outcomes an individual must achieve for change to be successful: Awareness, Desire, Knowledge, Ability, and Reinforcement. It is the most widely certified change management methodology globally.",
    strengths: [
      "Provides a clear, sequential model for individual adoption",
      "Widely recognised and understood across industries",
      "Strong diagnostic tool for identifying where individuals are stuck",
      "Backed by extensive research and a global certification program",
    ],
    limitations: [
      "Focuses on the individual level and can underweight organisational and cultural factors",
      "Can become overly prescriptive when applied rigidly to complex, non-linear change",
      "The certification model ties practitioners to a specific toolset and methodology",
      "Does not deeply address process redesign, systems readiness, or governance",
    ],
    tcaConnection: "The TCA Change Model maps ADKAR's Awareness and Desire to the Engagement pillar, Knowledge and Ability to Enablement, and Reinforcement to Sustainment. However, TCA adds Direction (strategic clarity before engagement begins) and Execution (governance and delivery mechanisms) which ADKAR does not explicitly cover.",
  },
  {
    id: "kotter",
    name: "Kotter's 8 Steps",
    origin: "John Kotter, Harvard (1996)",
    focus: "Leadership-driven transformation",
    summary: "Kotter's model outlines eight sequential steps for leading large-scale change, from creating urgency through to anchoring new approaches in the culture. It is one of the most referenced change models in leadership and MBA programs worldwide.",
    strengths: [
      "Provides a clear narrative arc that leaders can follow and communicate",
      "Emphasises the importance of urgency, vision, and coalition building",
      "Well suited to large-scale, top-down transformation programs",
      "Widely taught and understood at senior leadership level",
    ],
    limitations: [
      "Assumes a linear, top-down approach that may not suit agile or iterative change",
      "Strong on leadership mobilisation but lighter on practical enablement and process design",
      "Does not provide detailed tools for impact assessment, role clarity, or adoption measurement",
      "Can overemphasise the role of senior leaders and underweight frontline engagement",
    ],
    tcaConnection: "Kotter's Steps 1 to 3 align closely with TCA's Direction pillar. Steps 5 to 7 map to Execution. The TCA model adds more structured attention to Engagement (stakeholder strategy, impact assessment), Enablement (capability, process, systems), and Sustainment (reinforcement, performance alignment) which Kotter addresses more broadly.",
  },
  {
    id: "lewin",
    name: "Lewin's Change Model",
    origin: "Kurt Lewin (1947)",
    focus: "Unfreezing, changing, refreezing",
    summary: "Lewin's three-stage model is the foundation of modern change theory. It describes change as a process of unfreezing existing behaviours, making the change, and refreezing new behaviours into the culture. Its simplicity makes it enduringly useful as a mental model.",
    strengths: [
      "Elegantly simple and easy to communicate to any audience",
      "The concept of unfreezing remains one of the most powerful ideas in change management",
      "Provides a useful lens for understanding why change does not stick",
      "Foundational to almost every subsequent change model",
    ],
    limitations: [
      "Too high-level to serve as a practical implementation framework",
      "The refreezing concept assumes a stable end state, which is increasingly rare",
      "Does not address stakeholder engagement, capability building, or governance",
      "Better as a thinking tool than a delivery methodology",
    ],
    tcaConnection: "Lewin's Unfreeze maps to TCA's Direction and Engagement pillars. Change maps to Enablement and Execution. Refreeze maps directly to Sustainment. The TCA model provides the operational detail that Lewin's model deliberately leaves open.",
  },
  {
    id: "bridges",
    name: "Bridges' Transition Model",
    origin: "William Bridges (1991)",
    focus: "The human experience of change",
    summary: "Bridges distinguishes between change (external, situational) and transition (internal, psychological). The model describes three phases: Ending, Neutral Zone, and New Beginning. It is particularly valuable for understanding the emotional experience of change.",
    strengths: [
      "Uniquely focused on the psychological and emotional dimensions of change",
      "The Neutral Zone concept helps explain the disorientation people feel during transition",
      "Complements more structural models by addressing the human side explicitly",
      "Useful for coaching leaders and managers on how to support their teams",
    ],
    limitations: [
      "Does not provide a framework for planning, delivering, or governing change",
      "Better suited as a lens for understanding people than a methodology for managing programs",
      "Limited guidance on stakeholder strategy, capability building, or systems readiness",
      "Can be difficult to operationalise without pairing it with a more structured model",
    ],
    tcaConnection: "Bridges' model directly informs TCA's Engagement pillar, particularly the Change Experience sub-pillar. The emotional transition from Ending through Neutral Zone to New Beginning is the human journey that runs beneath all five TCA pillars.",
  },
  {
    id: "acmp",
    name: "ACMP Standard for Change Management",
    origin: "Association of Change Management Professionals",
    focus: "Professional standard and body of knowledge",
    summary: "The ACMP Standard provides a comprehensive body of knowledge for the change management profession. It defines five process groups and covers the full lifecycle of change. The CCMP (Certified Change Management Professional) certification is based on this standard.",
    strengths: [
      "Comprehensive and thorough coverage of the change management lifecycle",
      "Vendor-neutral, not tied to a single methodology or toolset",
      "The CCMP certification is increasingly recognised as a professional credential",
      "Provides a strong foundation for building organisational change capability",
    ],
    limitations: [
      "Can feel academic and process-heavy in practice",
      "Less well known than Prosci in many markets",
      "Does not prescribe specific tools or techniques, which some practitioners find challenging",
      "The breadth of the standard can make it difficult to know where to start",
    ],
    tcaConnection: "The ACMP Standard and TCA share a commitment to raising the standard of the change management profession. Where ACMP provides the body of knowledge, TCA provides a sequenced delivery model that practitioners can follow. The two are complementary rather than competing.",
  },
  {
    id: "tca",
    name: "The TCA Change Model",
    origin: "The Change Association (2025)",
    focus: "End-to-end change delivery across five pillars",
    summary: "The TCA Change Model is a sequential framework that covers the full lifecycle of organisational change: Direction, Engagement, Enablement, Execution, and Sustainment. It draws on the strengths of existing models while addressing their gaps, particularly around process design, systems readiness, governance, and sustainment.",
    strengths: [
      "Covers the full lifecycle from strategic diagnosis to cultural embedding",
      "Each pillar has four sub-pillars with practical, actionable guidance",
      "Integrates the human side (Engagement, Change Experience) with the operational side (Process, Systems, Governance)",
      "Designed to be applied in practice, not just studied in theory",
      "Built on real-world patterns, not just academic research",
    ],
    limitations: [
      "Newer than established models and still building its evidence base",
      "Certification program is in development",
      "Less widely recognised than Prosci or Kotter at this stage",
    ],
    tcaConnection: "",
  },
];

export default function ChangeFrameworks() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Change Diagnosis</span>
          <h1 className="article-title">Which change framework should you use, and does it even matter?</h1>
          <p className="article-intro">There are more change management frameworks than most practitioners know what to do with. Prosci ADKAR, Kotter, Lewin, Bridges, ACMP, and now the TCA Change Model. Each has strengths. Each has gaps. The question is not which one is best. The question is which one fits your context, and whether you understand it well enough to adapt it when the situation demands.</p>
        </ScrollReveal>
      </div>

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Frameworks at a Glance</h2>
          <p className="article-section-desc">Click any framework to explore its strengths, limitations, and how it connects to the TCA Change Model.</p>
        </ScrollReveal>

        <div className="framework-grid">
          {frameworks.map((f, i) => (
            <ScrollReveal key={f.id} direction="up" delay={i * 60}>
              <button
                className={`framework-card${activeId === f.id ? " framework-card-active" : ""}${f.id === "tca" ? " framework-card-tca" : ""}`}
                onClick={() => setActiveId(activeId === f.id ? null : f.id)}
              >
                <span className="framework-card-name">{f.name}</span>
                <span className="framework-card-focus">{f.focus}</span>
                <span className="framework-card-origin">{f.origin}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {activeId && (
        <section className="article-section dimension-detail">
          {frameworks.filter(f => f.id === activeId).map(f => (
            <div key={f.id}>
              <ScrollReveal direction="up">
                <h2 className="detail-title">{f.name}</h2>
                <p className="detail-body">{f.summary}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">Strengths</h3>
                  <ul className="detail-list">
                    {f.strengths.map((s, i) => (
                      <li key={i} className="detail-list-item"><div className="detail-list-item-head">{s}</div></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">Limitations</h3>
                  <ul className="detail-list">
                    {f.limitations.map((l, i) => (
                      <li key={i} className="detail-list-item"><div className="detail-list-item-head">{l}</div></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {f.tcaConnection && (
                <ScrollReveal direction="up" delay={300}>
                  <div className="detail-block" style={{ borderLeft: "3px solid var(--navy)" }}>
                    <h3 className="detail-block-title">How This Connects to the TCA Change Model</h3>
                    <p className="detail-body" style={{ marginBottom: 0 }}>{f.tcaConnection}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">Explore the TCA Change Model in full and see how the five pillars work together.</p>
          <Link href="/knowledge" className="btn">View the TCA Change Model</Link>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
