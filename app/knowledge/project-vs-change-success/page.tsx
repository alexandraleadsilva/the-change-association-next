"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const stages = [
  {
    id: "planning",
    stage: "Planning",
    project: {
      question: "Is the plan complete?",
      measures: "Scope defined, timeline agreed, budget approved, resources allocated, governance in place.",
      success: "The plan is baselined and signed off by the steering committee.",
    },
    change: {
      question: "Do we understand what needs to change for people?",
      measures: "Impact assessment completed, stakeholder analysis done, current state understood, capability gaps identified, success defined in terms of behaviour and outcomes.",
      success: "The people affected can describe what is changing for them and why it matters.",
    },
    gap: "A project can have a perfect plan and still fail because no one assessed whether people were ready. Planning success and readiness are different things.",
  },
  {
    id: "delivery",
    stage: "Delivery",
    project: {
      question: "Are we on track?",
      measures: "Milestones hit, budget within tolerance, risks managed, deliverables produced on schedule.",
      success: "The delivery dashboard is green. Governance is satisfied.",
    },
    change: {
      question: "Are people moving?",
      measures: "Awareness levels rising, engagement quality improving, resistance being addressed, managers actively supporting their teams, early adopters emerging.",
      success: "People are talking about the change with understanding, not just awareness. Resistance is being surfaced and addressed, not suppressed.",
    },
    gap: "A green delivery dashboard says nothing about whether people are prepared for what is coming. The project can be on time while the organisation is completely unready.",
  },
  {
    id: "golive",
    stage: "Go-Live",
    project: {
      question: "Did we deliver what was scoped?",
      measures: "System is live, process is documented, training is complete, cutover executed, no critical defects.",
      success: "The deliverable is in production. The project team can stand down.",
    },
    change: {
      question: "Are people using it?",
      measures: "Adoption rates in the first week, support ticket themes, manager confidence levels, workaround creation, user sentiment.",
      success: "People are actively using the new system or process. They are not reverting to old ways or creating workarounds to avoid it.",
    },
    gap: "This is the stage where the gap is most visible. The system is live but the shelves are empty. The process is documented but no one follows it. Go-live is where project success and change failure collide.",
  },
  {
    id: "postlive",
    stage: "Post Go-Live",
    project: {
      question: "Is the project closed?",
      measures: "Lessons learned captured, resources released, benefits case handed to the business, project board disbanded.",
      success: "The project is formally closed. It is off the portfolio.",
    },
    change: {
      question: "Is the change sticking?",
      measures: "Sustained adoption at 30, 90, and 180 days. Behaviour change embedded. Performance aligned. Reinforcement in place. No regression to old ways.",
      success: "Six months later, the new way of working is the normal way of working. People would find it strange to go back.",
    },
    gap: "This is where most change programmes fail. The project closes, the team disbands, and no one is accountable for whether the change persists. The project succeeded. The change did not.",
  },
];

const diagnosticMetrics = [
  { text: "System go-live date achieved", type: "project" as const },
  { text: "Budget variance within tolerance", type: "project" as const },
  { text: "Training completion rates above target", type: "project" as const },
  { text: "Number of communications sent", type: "project" as const },
  { text: "User adoption rates at 30/60/90 days", type: "change" as const },
  { text: "Reduction in workarounds or manual overrides", type: "change" as const },
  { text: "Manager confidence in supporting the change", type: "change" as const },
  { text: "Behaviour change sustained at 6 months", type: "change" as const },
  { text: "Customer or end-user experience improvement", type: "change" as const },
  { text: "Employee sentiment about the change", type: "change" as const },
  { text: "Milestones and deliverables completed on time", type: "project" as const },
  { text: "Performance metrics aligned to the new way of working", type: "change" as const },
];

const caseStudies = [
  {
    label: "Hershey's",
    headline: "The $112 million ERP that went live on time and cost Hershey $100 million in lost orders",
    hook: "The project was a success. Halloween was a disaster.",
    dimension: "Project Success, Change Failure",
    body: [
      "In 1996, Hershey's embarked on a $112 million project to replace its legacy systems with SAP ERP, Manugistics supply chain software, and Siebel CRM. The company compressed the recommended 48-month timeline to just 30 months to beat the Y2K deadline.",
      "The system went live in July 1999. By the metrics that matter to a project, it was delivered: the system was in production, the cutover was complete, the go-live was achieved. The project could report success.",
      "But the organisation was not ready. Orders were not flowing correctly. Despite having inventory in warehouses, Hershey could not fulfil orders for its top-selling products, including Kisses and Jolly Ranchers. The company missed more than $100 million in orders during its most critical sales period: Halloween.",
      "Hershey's stock dropped nearly 10%. Retail partners were furious. The company took a significant hit to quarterly profits. The project had succeeded on every delivery metric. The change had catastrophically failed on every outcome metric.",
    ],
    lesson: "Hershey's is the definitive case study for why project success and change success are not the same thing. The system went live. The business did not. Testing was cut short, training was insufficient, and go-live timing ignored the business reality of Hershey's seasonal cycle.",
    source: "https://pemeco.com/a-case-study-on-hersheys-erp-implementation-failure-the-importance-of-testing-and-scheduling/",
    sourceLabel: "Pemeco",
  },
  {
    label: "SAP Research",
    headline: "43% of SAP success comes from employee adoption, not system delivery",
    hook: "The technology works. Whether anyone uses it determines whether the investment pays off.",
    dimension: "Adoption as Success",
    body: [
      "Research into SAP implementations across multiple industries found that companies attributed 43% of their success with SAP to high adoption of the application among employees. Conversely, poor employee adoption negatively impacted a project's success by 25%.",
      "This means that nearly half of the return on a technology investment is determined not by whether the system was delivered, but by whether people actually use it. A technically perfect implementation with low adoption delivers less than half of its potential value.",
      "The same research found that around 70% of ERP implementations fail to produce expected benefits. The system goes live. The project closes. But the business outcomes never materialise because people were not adequately prepared, supported, or motivated to work differently.",
      "The research identifies lack of organisational readiness and poor understanding of business processes as the most critical failure factors, both of which are change outcomes, not project deliverables.",
    ],
    lesson: "The research makes the case quantitatively: change success (adoption, readiness, capability) accounts for nearly half of overall success. Organisations that measure only project metrics are blind to the dimension that determines whether the investment pays off.",
    source: "https://www.computerweekly.com/news/252435884/Chances-of-success-with-SAP-are-only-50-50",
    sourceLabel: "Computer Weekly",
  },
  {
    label: "McKinsey",
    headline: "70% of transformations fail to reach their goals. The measurement gap is a primary reason.",
    hook: "Most organisations cannot tell you whether their transformation succeeded because they measured the wrong things.",
    dimension: "The Measurement Gap",
    body: [
      "McKinsey's research consistently shows that approximately 70% of large-scale transformation programmes fail to achieve their stated goals. This is one of the most cited statistics in change management, and it has remained stubbornly consistent for decades.",
      "A key finding is that organisations that distinguish between project delivery and business outcome measurement are significantly more likely to achieve sustained results. Those that treat go-live as the finish line systematically underperform.",
      "The research identifies a common pattern: organisations invest heavily in project governance, tracking milestones, budgets, and deliverables with precision. But they invest far less in measuring whether people are working differently, whether capabilities have been built, and whether the intended business outcomes are materialising.",
      "The conclusion is clear: the measurement framework itself is a predictor of success. Organisations that measure change outcomes alongside project outputs are better positioned to intervene early, course-correct, and sustain results.",
    ],
    lesson: "The persistent 70% failure rate is not about poor project management. It is about organisations measuring the wrong things and therefore not knowing whether their change is succeeding until it is too late to fix.",
    source: "https://www.mckinsey.com/capabilities/transformation/our-insights/the-numbers-behind-successful-transformations",
    sourceLabel: "McKinsey",
  },
];

export default function ProjectVsChangeSuccess() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<Record<number, boolean>>({});
  const [showDiagResult, setShowDiagResult] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const selectedCount = Object.values(selectedMetrics).filter(Boolean).length;
  const projectSelected = diagnosticMetrics.filter((m, i) => selectedMetrics[i] && m.type === "project").length;
  const changeSelected = diagnosticMetrics.filter((m, i) => selectedMetrics[i] && m.type === "change").length;

  function getDiagResult() {
    if (selectedCount === 0) return { title: "", desc: "" };
    const changePercent = Math.round((changeSelected / Math.max(selectedCount, 1)) * 100);
    if (changePercent >= 70) return { title: "Change-Focused", desc: "Your measurement framework prioritises adoption and outcomes. This means you will know whether the change is working, not just whether the project is on track." };
    if (changePercent >= 40) return { title: "Balanced", desc: "You are measuring both project delivery and change outcomes. This is the right approach. Ensure the change metrics have the same visibility and accountability as the project ones." };
    if (changePercent > 0) return { title: "Project-Heavy", desc: "Most of your metrics measure delivery, not adoption. You will know whether the project is on track, but you may not know whether the change is landing until it is too late to intervene." };
    return { title: "Project-Only", desc: "You are measuring project success exclusively. You will know whether you delivered on time and budget, but you will have no visibility into whether people are working differently. This is the measurement gap that causes 70% of transformations to fail." };
  }

  const checkItems = [
    { key: "distinct", label: "We have explicitly defined project success AND change success as separate things" },
    { key: "change-metrics", label: "Our success framework includes metrics that measure behaviour change, not just delivery" },
    { key: "adoption", label: "We are tracking adoption rates, not just training completion" },
    { key: "sustained", label: "We have metrics for 30, 90, and 180 days post go-live, not just at launch" },
    { key: "business-owns", label: "The business owns the change success metrics, not just the programme team" },
    { key: "visible", label: "Change metrics have the same visibility in governance as project metrics" },
    { key: "early", label: "We have leading indicators that will tell us early if adoption is at risk" },
    { key: "accountable", label: "Someone is accountable for change outcomes after the project formally closes" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Success Definition</span>
          <h1 className="article-title">What is the difference between project success and change success, and why it matters</h1>
          <p className="article-intro">A project succeeds when it delivers what was scoped, on time and on budget. A change succeeds when people are working differently and the intended outcomes are being realised. These are not the same thing. A system can go live while no one uses it. A restructure can complete while nothing actually changes. The gap between project success and change success is where most transformations fail.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* STAGE BY STAGE COMPARISON */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Same Transformation, Two Lenses</h2>
          <p className="article-section-desc">At every stage of a transformation, the project view and the change view ask different questions, measure different things, and define success differently. Click any stage to see the gap.</p>
        </ScrollReveal>

        <div className="phase-list">
          {stages.map((s, i) => (
            <ScrollReveal key={s.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeStage === s.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveStage(activeStage === s.id ? null : s.id)}
              >
                <span className="phase-card-pillar">Stage {i + 1}</span>
                <span className="phase-card-name">{s.stage}</span>
                <span className="phase-card-question">{s.project.question} vs {s.change.question}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeStage && (
          <ScrollReveal direction="up">
            {stages.filter(s => s.id === activeStage).map(s => (
              <div key={s.id} style={{ marginTop: "4px" }}>
                <div className="phase-compare" style={{ marginBottom: "16px" }}>
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">Project View</span>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--navy)", marginBottom: "10px" }}>{s.project.question}</p>
                    <p className="phase-compare-text" style={{ marginBottom: "12px" }}><strong>Measures:</strong> {s.project.measures}</p>
                    <p className="phase-compare-text"><strong>Success looks like:</strong> {s.project.success}</p>
                  </div>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">Change View</span>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--navy)", marginBottom: "10px" }}>{s.change.question}</p>
                    <p className="phase-compare-text" style={{ marginBottom: "12px" }}><strong>Measures:</strong> {s.change.measures}</p>
                    <p className="phase-compare-text"><strong>Success looks like:</strong> {s.change.success}</p>
                  </div>
                </div>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">The Gap</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{s.gap}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        )}
      </section>

      {/* METRIC DIAGNOSTIC */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Which One Are You Measuring?</h2>
          <p className="article-section-desc">Select the metrics your programme is currently tracking. The result will show whether you are measuring project success, change success, or both.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="self-check">
            {diagnosticMetrics.map((m, i) => (
              <label key={i} className="check-item">
                <input
                  type="checkbox"
                  checked={!!selectedMetrics[i]}
                  onChange={() => setSelectedMetrics(prev => ({ ...prev, [i]: !prev[i] }))}
                />
                <span className="check-box"></span>
                <span className="check-label">{m.text}</span>
              </label>
            ))}

            {selectedCount >= 3 && !showDiagResult && (
              <button className="btn" style={{ marginTop: "20px" }} onClick={() => setShowDiagResult(true)}>
                See My Result
              </button>
            )}

            {showDiagResult && selectedCount > 0 && (
              <div className="diagnostic-result" style={{ background: "transparent", padding: 0 }}>
                <div className="assessment-bar" style={{ marginTop: "20px" }}>
                  <div className="assessment-bar-manager" style={{ width: `${Math.round((projectSelected / Math.max(selectedCount, 1)) * 100)}%` }}>
                    <span>Project {projectSelected}</span>
                  </div>
                  <div className="assessment-bar-leader" style={{ width: `${Math.round((changeSelected / Math.max(selectedCount, 1)) * 100)}%` }}>
                    <span>Change {changeSelected}</span>
                  </div>
                </div>
                <p className="diagnostic-result-text" style={{ color: "var(--cream)" }}>{getDiagResult().title}</p>
                <p className="diagnostic-result-desc" style={{ color: "rgba(234, 228, 213, 0.6)" }}>{getDiagResult().desc}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* READINESS CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Are You Measuring What Matters?</h2>
          <p className="article-section-desc">Use this checklist to ensure your success framework captures change outcomes, not just project delivery.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="self-check">
            {checkItems.map((item) => (
              <label key={item.key} className="check-item">
                <input
                  type="checkbox"
                  checked={!!checklist[item.key]}
                  onChange={() => setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                />
                <span className="check-box"></span>
                <span className="check-label">{item.label}</span>
              </label>
            ))}

            <div className="check-result">
              <div className="check-bar">
                <div className="check-bar-fill" style={{ width: `${(checkedCount / checkItems.length) * 100}%` }}></div>
              </div>
              <p className="check-score">
                {checkedCount} of {checkItems.length} complete
                {checkedCount === checkItems.length && (
                  <span className="check-complete"> &mdash; You are measuring both project and change success.</span>
                )}
                {checkedCount >= 5 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Good coverage. Close the remaining gaps before go-live.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Your framework is weighted towards project metrics. Add change outcomes.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Direction</strong>, the first pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      <aside className="article-sidebar">
        <div className="sidebar-sticky">
          <span className="case-sidebar-heading">Enterprise Examples</span>
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={i} direction="right" delay={i * 120}>
              <button className="case-teaser" onClick={() => setActiveCaseStudy(i)}>
                <span className="case-teaser-label">{cs.dimension}</span>
                <span className="case-teaser-headline">{cs.headline}</span>
                <span className="case-teaser-hook">{cs.hook}</span>
                <span className="case-teaser-read">Read the full story &rarr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </aside>
      </div>

      {activeCaseStudy !== null && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setActiveCaseStudy(null)}>
          <div className="modal case-study-modal">
            <button className="modal-close" onClick={() => setActiveCaseStudy(null)}>&times;</button>
            <span className="case-study-label">{caseStudies[activeCaseStudy].label}</span>
            <span className="case-study-dimension">{caseStudies[activeCaseStudy].dimension}</span>
            <h2 className="case-study-modal-title">{caseStudies[activeCaseStudy].headline}</h2>
            {caseStudies[activeCaseStudy].body.map((p, i) => (
              <p key={i} className="case-study-modal-body">{p}</p>
            ))}
            <div className="case-study-lesson">
              <span className="case-study-lesson-label">The lesson</span>
              <p>{caseStudies[activeCaseStudy].lesson}</p>
            </div>
            <a href={caseStudies[activeCaseStudy].source} target="_blank" rel="noopener noreferrer" className="case-study-source">
              Source: {caseStudies[activeCaseStudy].sourceLabel} &rarr;
            </a>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
