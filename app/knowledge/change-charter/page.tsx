"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  CHARTER SECTIONS                                                   */
/* ------------------------------------------------------------------ */

interface CharterSection {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  whatToInclude: string[];
  commonMistakes: string[];
  qualityTest: string;
}

const charterSections: CharterSection[] = [
  {
    id: "strategic-context",
    num: "01",
    name: "Strategic Context",
    subtitle: "Why this change, why now",
    whatToInclude: [
      "The strategic driver behind the change: market shift, regulatory requirement, competitive threat, internal performance gap, or leadership ambition.",
      "How this change connects to the organisation's broader strategy, vision, or operating model. If it does not connect, that is a warning sign.",
      "The external and internal forces that make this change necessary now rather than later. Urgency must be grounded in evidence, not executive impatience.",
      "A plain-language summary that a frontline employee could read and understand why the organisation is doing this.",
    ],
    commonMistakes: [
      "Writing the strategic context as corporate jargon that nobody outside the leadership team would recognise as meaningful.",
      "Listing multiple strategic drivers without prioritising them, which makes everything a reason and therefore nothing a reason.",
      "Describing the solution before establishing the problem. The context section should create the case for action, not describe what has already been decided.",
    ],
    qualityTest: "Could a new joiner read this section and explain to a colleague why this change is happening and why it matters?",
  },
  {
    id: "case-for-change",
    num: "02",
    name: "Case for Change",
    subtitle: "The financial and human rationale",
    whatToInclude: [
      "The financial case: costs, benefits, return on investment, cost of inaction. This is the language the board and finance team need to see.",
      "The human case: what this change means for employees, customers, and communities. What improves in their experience, capability, or working life.",
      "The cost of doing nothing: what happens if this change does not proceed. This is often more persuasive than the benefits of proceeding.",
      "Evidence base: data, benchmarks, research, or precedents that support the case. Assertions without evidence are opinions, not a business case.",
    ],
    commonMistakes: [
      "Writing a business case that only speaks to finance. If the case does not address the human dimension, it will secure funding but not commitment.",
      "Overstating benefits and understating costs. Every executive has seen inflated business cases. Credibility comes from honesty, not optimism.",
      "Treating the business case as a one-time approval document rather than a living reference that the programme returns to when priorities shift or scope creeps.",
    ],
    qualityTest: "Does this case speak to both the CFO and the frontline manager? Would both find it credible and relevant?",
  },
  {
    id: "scope-boundaries",
    num: "03",
    name: "Scope & Boundaries",
    subtitle: "What is in, what is out, and where the edges are",
    whatToInclude: [
      "What is explicitly in scope: which teams, processes, systems, geographies, and time periods are covered by this change.",
      "What is explicitly out of scope: what this change will not address, even if stakeholders expect it to. Saying what you will not do is as important as saying what you will.",
      "Boundary conditions: the constraints within which this change must operate. Budget limits, regulatory requirements, contractual obligations, technology constraints.",
      "Dependencies on other programmes, decisions, or external factors that could affect scope.",
    ],
    commonMistakes: [
      "Defining scope so broadly that everything is included and the programme cannot fail because it never committed to anything specific.",
      "Failing to document what is out of scope, which creates a vacuum that every stakeholder fills with their own expectations.",
      "Not revisiting scope when circumstances change. A charter that was written six months ago may describe a scope that no longer matches reality.",
    ],
    qualityTest: "If a stakeholder asked whether their team or process is included in this change, could you answer definitively using this section?",
  },
  {
    id: "approach-phasing",
    num: "04",
    name: "Approach & Phasing",
    subtitle: "How the change will be delivered and in what order",
    whatToInclude: [
      "The overall delivery approach: phased rollout, big bang, pilot then scale, or hybrid. And the rationale for choosing it.",
      "High-level phasing: what happens first, what follows, and what the key milestones are. Not a detailed project plan, but enough to show the shape of delivery.",
      "How the change management approach integrates with the project delivery approach. These must be coordinated, not separate streams.",
      "How the approach will adapt if conditions change. A charter that assumes everything will go to plan is not a charter. It is a wish.",
    ],
    commonMistakes: [
      "Describing the project delivery approach without mentioning change management at all. This signals that the people side of the change has not been thought through.",
      "Over-detailing the approach in the charter, turning it into a project plan. The charter sets direction. The project plan sets the detail.",
      "Choosing the approach based on the preferred timeline rather than the readiness of the organisation. Speed is not a strategy.",
    ],
    qualityTest: "Does this section explain not just what will happen, but why this approach was chosen over the alternatives?",
  },
  {
    id: "governance-roles",
    num: "05",
    name: "Governance & Roles",
    subtitle: "Who decides, who delivers, who is accountable",
    whatToInclude: [
      "The governance structure: steering committee, programme board, working groups. Who sits on each, how often they meet, and what decisions they own.",
      "The executive sponsor: named, with a clear description of what the role requires in practice, not just a title on an organogram.",
      "The programme lead, change lead, and key delivery roles. Each with clear accountability, not just responsibility.",
      "Escalation paths: how decisions that cannot be resolved at one level move to the next. If this is not defined, unresolved issues will fester.",
    ],
    commonMistakes: [
      "Listing governance bodies without defining their decision rights. A steering committee that discusses but never decides is not governance. It is a meeting.",
      "Naming a sponsor who does not have the time, authority, or inclination to actively sponsor the change. A passive sponsor is worse than no sponsor.",
      "Creating governance that is too heavy for the size of the change, or too light for its complexity. Governance should be proportionate.",
    ],
    qualityTest: "If a difficult decision needed to be made next week, does everyone know who makes it and how it gets escalated if they cannot?",
  },
  {
    id: "success-criteria",
    num: "06",
    name: "Success Criteria",
    subtitle: "How we will know if this worked",
    whatToInclude: [
      "Outcome measures: the business results the change is intended to deliver. Revenue, cost, efficiency, customer satisfaction, employee engagement.",
      "Behavioural measures: the specific changes in how people work that will indicate the change has landed. What will people do differently?",
      "Leading indicators: early signals that the change is on track or off track, measurable before the final outcomes are realised.",
      "Timeframes: when each measure should show movement. Immediate, 90 days, 6 months, 12 months. Without timeframes, success is always in the future.",
    ],
    commonMistakes: [
      "Defining success only in terms of project delivery: on time, on budget, on scope. These measure the project, not the change.",
      "Setting success criteria that are unmeasurable. If you cannot describe the evidence that would prove the change succeeded, you have not defined success.",
      "Waiting until after delivery to define what success looks like. By then, the criteria will be reverse-engineered to match whatever happened.",
    ],
    qualityTest: "If someone asked you in 12 months whether this change succeeded, could you answer with evidence using these criteria?",
  },
  {
    id: "risks-dependencies",
    num: "07",
    name: "Risks & Dependencies",
    subtitle: "What could derail this and what must be true for it to work",
    whatToInclude: [
      "The top risks to the change programme, assessed by likelihood and impact. Not a register of every possible risk, but the ones that could genuinely derail it.",
      "Mitigation strategies for each top risk. Not generic statements about monitoring, but specific actions that reduce likelihood or impact.",
      "Dependencies: what this programme needs from other programmes, from external suppliers, from leadership decisions, or from organisational readiness.",
      "Assumptions: what this charter assumes to be true. If those assumptions prove false, the charter may need to be revised.",
    ],
    commonMistakes: [
      "Creating a risk register that is comprehensive but not prioritised. Fifty risks treated equally means none are managed seriously.",
      "Listing dependencies without owners. A dependency without an owner is a problem waiting to happen.",
      "Treating risks as static. The risk profile of a change programme shifts as it moves through phases. The charter should define when and how risks are reviewed.",
    ],
    qualityTest: "If the programme hit a serious problem in three months, would it be traceable to a risk identified here, or would it be a surprise?",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPANDABLE CONTENT ITEMS                                           */
/* ------------------------------------------------------------------ */

interface DetailItem {
  text: string;
  detail: string;
}

const charterVsProjectCharter: DetailItem[] = [
  {
    text: "A project charter defines what will be delivered. A change charter defines what will be different.",
    detail: "A project charter focuses on deliverables, timelines, budgets, and resources. It answers the question: what will the project produce? A change charter focuses on outcomes, behaviours, adoption, and sustainability. It answers the question: what will be different for people and the organisation when this is done? Both are necessary. Neither is sufficient on its own.",
  },
  {
    text: "A project charter is owned by the project manager. A change charter is owned by the executive sponsor.",
    detail: "The project charter belongs to the person accountable for delivery. The change charter belongs to the person accountable for the outcome. In practice, this means the executive sponsor should be able to present the change charter and answer questions about it. If the sponsor has never read the charter, or if it was written entirely by the change team without sponsor input, it is a document, not a mandate.",
  },
  {
    text: "A project charter is approved once. A change charter is a living reference point.",
    detail: "Project charters are typically approved at the start and then filed. Change charters should be revisited at each phase transition: has the strategic context shifted? Are the success criteria still right? Has the risk profile changed? A charter that was written twelve months ago and never updated is describing a change programme that no longer exists.",
  },
  {
    text: "A project charter manages scope. A change charter manages meaning.",
    detail: "Scope management prevents the project from growing beyond what was agreed. But meaning management is what a change charter provides: it maintains shared understanding of why this change matters, what it is trying to achieve, and how people should interpret what is happening. When meaning is not managed, people create their own interpretations, and those interpretations are rarely aligned.",
  },
];

const whyChartersFail: DetailItem[] = [
  {
    text: "They are too long. A charter that nobody reads serves nobody.",
    detail: "Most change charters are written to satisfy a governance requirement, not to guide a programme. They grow to 40 or 50 pages because every stakeholder adds their section, every concern gets a paragraph, and every caveat gets documented. The result is a comprehensive document that is comprehensively unread. A good charter is as long as it needs to be and no longer. If it cannot be summarised in a single page for leadership and understood in ten pages by the programme team, it is too long.",
  },
  {
    text: "They are too vague. Ambiguity is not diplomacy. It is a time bomb.",
    detail: "Charters often use deliberately vague language to avoid difficult conversations. The scope is described in terms broad enough to mean anything. The success criteria are aspirational rather than measurable. The governance structure lists committees but not decision rights. This vagueness feels safe at the start because it avoids conflict. But it creates far greater conflict later when different stakeholders discover they had completely different interpretations of what was agreed.",
  },
  {
    text: "They describe a project, not a change. The human dimension is missing.",
    detail: "A charter that covers budget, timeline, deliverables, and governance but says nothing about how people will be affected, how adoption will be driven, or how the organisation will sustain the new way of working is a project charter wearing a change label. The human dimension is not a nice-to-have section at the end. It is the reason most change programmes fail or underperform. If your charter does not address it with the same rigour as the financial case, it is incomplete.",
  },
  {
    text: "They are written by the wrong people. A charter written by consultants for leadership is owned by nobody.",
    detail: "The best charters are co-created. The executive sponsor provides the strategic direction. The programme team provides the delivery approach. The change team provides the people strategy. Finance provides the business case. Together, they produce a document that everyone understands because everyone contributed. A charter written in isolation by any one of these groups will reflect that group's perspective and miss the others.",
  },
  {
    text: "They are approved and forgotten. A charter that lives in a SharePoint folder is already dead.",
    detail: "Approval should be the beginning of a charter's life, not the end. The charter should be referenced at every steering committee. It should be the basis for scope change decisions. It should be updated when the strategic context shifts. If you cannot find your charter without searching, if it has not been opened since it was approved, it is not guiding anything. It is governance theatre.",
  },
];

const businessCaseDimensions: DetailItem[] = [
  {
    text: "The financial dimension: costs, benefits, and the cost of doing nothing",
    detail: "The financial case must be honest. Overstate the benefits and you lose credibility with anyone who has seen inflated business cases before, which is everyone. Understate the costs and you create a programme that is underfunded from day one. Include the cost of doing nothing: what is the ongoing expense, risk, or lost opportunity if this change does not proceed? Often, the cost of inaction is more compelling than the benefit of action.",
  },
  {
    text: "The capability dimension: what the organisation will be able to do that it cannot do today",
    detail: "Not every change has a direct financial return. Some changes build capability: the ability to respond to market shifts faster, to serve customers through new channels, to attract and retain different talent, or to comply with regulations that do not yet exist. The capability case should describe what becomes possible, not just what becomes cheaper.",
  },
  {
    text: "The human dimension: what changes for people and why they should care",
    detail: "This is the dimension most business cases ignore entirely or reduce to a single paragraph about change management. The human dimension answers the question every employee will ask: what does this mean for me? Will my role change? Will I need new skills? Will my team be restructured? Will my daily experience get better or worse? A business case that cannot answer these questions will get financial approval but not human commitment.",
  },
  {
    text: "The risk dimension: what could go wrong and what it would cost",
    detail: "Every business case presents the upside. Few present the downside with the same rigour. What happens if adoption is slower than planned? What if the technology does not perform as expected? What if key people leave? The risk dimension is not about being pessimistic. It is about being credible. Decision-makers who see only upside know they are not seeing the full picture.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPANDABLE LIST COMPONENT                                          */
/* ------------------------------------------------------------------ */

function ExpandableList({ items }: { items: DetailItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li key={i} className="detail-list-item" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
          <div className="detail-list-item-head">
            {item.text}
            <span className={`detail-list-item-toggle${openIndex === i ? " open" : ""}`}>&rsaquo;</span>
          </div>
          {openIndex === i && (
            <div className="detail-list-item-body">{item.detail}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  CASE STUDIES                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "NHS England",
    headline: "The 12.7 billion pound IT programme that never defined the change it was trying to make",
    hook: "The National Programme for IT had a project charter. It never had a change charter.",
    dimension: "Charter Failure",
    body: [
      "In 2002, the NHS launched the National Programme for IT (NPfIT), the largest civilian IT programme ever attempted in the UK. The ambition was to create a single electronic care record for every patient in England, connecting general practitioners, hospitals, and community services. The initial contracts were worth roughly 6 billion pounds. By the time the programme was dismantled in 2011, costs had reached 12.7 billion pounds against just 2.6 billion in realised benefits.",
      "The programme had extensive project governance: contracts, milestones, delivery partners, and a central programme office. What it did not have was a coherent change charter that addressed the human and organisational dimensions of what it was attempting.",
      "Politicians and programme managers rushed into procurement and implementation processes that allowed little time for consultation with key stakeholders. Doctors, nurses, and general practitioners were not meaningfully involved in defining what the change would mean for their clinical practice. The programme imposed a centralised, top-down solution on local organisations with fundamentally different needs, cultures, and levels of digital readiness.",
      "A business readiness assessment could have identified that the NHS was not ready to embrace a change of this size. But no such assessment was conducted. The business case spoke to efficiency and cost savings. It did not speak to the clinical experience, the workflow disruption, or the cultural resistance that would determine whether the technology was actually used.",
    ],
    lesson: "The NPfIT demonstrates what happens when a programme has a project charter but not a change charter. The project delivered technology. But the change, which required clinicians to work differently, share data across organisational boundaries, and trust a centrally imposed system, was never defined, scoped, or governed as a change. The absence of a change charter meant there was no shared definition of what success looked like beyond technical deployment, no governance for the people side of the transformation, and no mechanism for adapting the approach when reality diverged from the plan.",
    source: "https://www.henricodolfing.com/2019/01/case-study-10-billion-it-disaster.html",
    sourceLabel: "Henrico Dolfing",
  },
  {
    label: "Nokia",
    headline: "How a culture of fear made Nokia's strategic charter meaningless",
    hook: "Nokia had a strategy. It even had a plan. What it did not have was honest governance.",
    dimension: "Governance Failure",
    body: [
      "Nokia's decline from commanding over 40 percent of the global mobile phone market to selling its handset business to Microsoft in 2013 is one of the most studied failures in corporate history. Research by INSEAD professors Timo Vuori and Quy Huy revealed that the failure was not primarily technological. It was organisational.",
      "Nokia had strategic documents. It had governance structures. It had committees and boards and review processes. But an authoritarian culture of fear pervaded multiple levels of management. Middle managers were afraid to tell senior leaders the truth about Symbian's technical limitations. Senior leaders were afraid to challenge the CEO's strategic direction. The result was a governance system that looked functional on paper but produced systematically distorted information.",
      "The 2004 reorganisation into a matrix structure, intended to improve collaboration, instead created conflicted resource allocation between product line executives and horizontal platform managers. Key members of the executive team departed. Strategic thinking deteriorated. The charter for Nokia's future, such as it was, described a world that Nokia's own people knew was no longer real, but no one felt safe saying so.",
      "When Nokia finally chose Windows Phone as its platform in 2011, the decision was driven partly by fear: the CEO had previously worked at Microsoft, and managers assumed that dissenters would be targeted. The strategic rationale in the business case was secondary to the organisational dynamics that shaped it.",
    ],
    lesson: "Nokia demonstrates that a change charter is only as good as the governance culture that surrounds it. A charter built on distorted information, fear-driven decision-making, and governance bodies that discuss but never challenge is not a strategic document. It is a record of what leadership wanted to hear. Honest governance, where risks are named, assumptions are tested, and dissent is expected, is not a section in the charter. It is the condition that makes the charter trustworthy.",
    source: "https://knowledge.insead.edu/strategy/strategic-decisions-caused-nokias-failure",
    sourceLabel: "INSEAD Knowledge",
  },
  {
    label: "Unilever",
    headline: "How Unilever's Connected 4 Growth charter aligned strategy, structure, and people",
    hook: "A transformation that restructured 170,000 employees succeeded because the charter spoke to the human dimension from the start.",
    dimension: "Charter Success",
    body: [
      "In 2016, Unilever launched Connected 4 Growth (C4G), a fundamental restructuring of its operating model. The transformation touched all 170,000 employees across more than 190 countries. The company was reorganised from a centralised structure into smaller, more autonomous business units with greater decision-making authority. It was one of the largest organisational transformations in the consumer goods sector.",
      "What distinguished C4G was the clarity of its founding charter. The strategic context was explicit: Unilever needed to respond faster to local market conditions, reduce decision-making layers, and empower people closer to consumers. The business case addressed both the financial dimension, faster growth and reduced overhead, and the human dimension, more autonomy, clearer accountability, and a more entrepreneurial culture.",
      "The scope was deliberately defined: C4G addressed organisational structure, decision rights, and ways of working. It did not attempt to simultaneously transform every system and process. This focus allowed the programme to make meaningful progress rather than spreading resources across an impossibly broad front.",
      "Governance was designed for the scale and complexity of the change. Local markets had autonomy to adapt the model to their context within defined boundaries. Success criteria included both business performance metrics and cultural indicators, measured through employee surveys and behavioural assessments, not just financial results.",
    ],
    lesson: "Unilever's C4G demonstrates what a well-constructed change charter makes possible. The strategic context was clear and grounded in market reality. The business case spoke to both financial outcomes and human experience. The scope was focused rather than all-encompassing. Governance balanced central direction with local adaptation. Success was defined in terms of outcomes and behaviours, not just deliverables. The result was a transformation that achieved its business objectives while maintaining employee engagement through a period of significant structural change.",
    source: "https://changemanagementinsight.com/unilever-change-management-case-study/",
    sourceLabel: "Change Management Insight",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ChangeCharter() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "context", label: "The strategic context is clear, evidence-based, and would make sense to a frontline employee" },
    { key: "business-case", label: "The business case addresses both financial returns and the human impact of the change" },
    { key: "cost-of-inaction", label: "We have articulated the cost of doing nothing, not just the benefits of proceeding" },
    { key: "scope-in", label: "What is in scope is explicitly defined by team, process, system, and geography" },
    { key: "scope-out", label: "What is out of scope is documented, not just implied" },
    { key: "approach", label: "The delivery approach has been chosen based on organisational readiness, not just timeline preference" },
    { key: "sponsor", label: "The executive sponsor is named and has actively contributed to the charter, not just signed it" },
    { key: "decisions", label: "Governance bodies have defined decision rights, not just meeting schedules" },
    { key: "success-outcomes", label: "Success is defined in terms of outcomes and behaviours, not just project deliverables" },
    { key: "success-timeline", label: "Success criteria have specific timeframes: what we expect to see at 90 days, 6 months, 12 months" },
    { key: "risks-prioritised", label: "Risks are prioritised and owned, not just listed" },
    { key: "living-doc", label: "There is a plan to revisit and update the charter at each phase transition" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Change Diagnosis</span>
          <h1 className="article-title">The Change Charter: How to Define Scope, Rationale, and Governance Before Delivery Begins</h1>
          <p className="article-intro">Every change programme needs a founding document. Not a project initiation document. Not a business case buried in a spreadsheet. A change charter: the single reference point that defines why this change is happening, what it will achieve, how it will be governed, and how everyone will know if it worked. Most organisations have something that looks like a charter. Few have one that actually works. The ones that work share a quality: they are short enough to be read, honest enough to be trusted, and specific enough to guide real decisions when the programme hits difficulty.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* WHY MOST CHARTERS FAIL */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Why Most Charters Are Too Long and Too Vague</h2>
          <p className="article-section-desc">A charter that tries to cover everything ends up guiding nothing. The most common failure is not that organisations lack a charter. It is that the charter they have does not function as a decision-making tool. It functions as a governance artefact: produced to satisfy an approval gate, filed, and never referenced again. Here are the five ways charters fail.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={whyChartersFail} />
        </ScrollReveal>
      </section>

      {/* PROJECT CHARTER VS CHANGE CHARTER */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Project Charter vs Change Charter</h2>
          <p className="article-section-desc">Most organisations have a project charter. Many assume that is sufficient. It is not. A project charter and a change charter serve different purposes, are owned by different people, and measure success differently. Understanding the distinction is essential to getting the change charter right.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={charterVsProjectCharter} />
        </ScrollReveal>
      </section>

      {/* WRITING A BUSINESS CASE THAT SPEAKS TO BOTH DIMENSIONS */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Writing a Business Case That Speaks to Both Dimensions</h2>
          <p className="article-section-desc">The business case is the section of the charter that secures permission to proceed. But permission from the board is not the same as commitment from the organisation. A business case that only speaks to the financial dimension will get funding. A business case that speaks to the human dimension as well will get support. You need both. Here are the four dimensions a complete business case must address.</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={businessCaseDimensions} />
        </ScrollReveal>
      </section>

      {/* INTERACTIVE CHARTER BUILDER */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Seven Sections of a Change Charter</h2>
          <p className="article-section-desc">A well-structured change charter has seven sections. Each one serves a specific purpose. Click any section to see what to include, the most common mistakes, and a quality test you can apply to your own charter.</p>
        </ScrollReveal>

        <div className="phase-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {charterSections.map((s, i) => (
            <ScrollReveal key={s.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeSection === s.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
                style={{ width: "100%" }}
              >
                <span className="phase-card-pillar" style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em" }}>{s.num}</span>
                <span className="phase-card-name">{s.name}</span>
                <span style={{ fontFamily: "var(--body)", fontSize: "0.85rem", opacity: 0.7, marginTop: "4px", display: "block" }}>{s.subtitle}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EXPANDED CHARTER SECTION DETAIL */}
      {activeSection && (
        <section className="article-section dimension-detail">
          {charterSections.filter(s => s.id === activeSection).map(s => (
            <div key={s.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{s.num}</span>
                  <h2 className="detail-title">{s.name}</h2>
                </div>
                <p style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "16px" }}>{s.subtitle}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">What to Include</h3>
                  <ul className="detail-list">
                    {s.whatToInclude.map((item, i) => (
                      <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                        <div className="detail-list-item-head">{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">Common Mistakes</h3>
                  <ul className="detail-list">
                    {s.commonMistakes.map((item, i) => (
                      <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                        <div className="detail-list-item-head">{item}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="detail-block" style={{ background: "var(--navy)", color: "#fff", borderRadius: "12px", padding: "24px 28px" }}>
                  <h3 className="detail-block-title" style={{ color: "var(--gold)" }}>Quality Test</h3>
                  <p className="detail-body" style={{ marginBottom: 0, color: "rgba(255,255,255,0.9)" }}>{s.qualityTest}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* SELF-CHECK CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Charter Fit for Purpose?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your change charter is a genuine decision-making tool or a governance artefact. Be honest. A charter that scores well here will guide your programme through difficulty. One that scores poorly will be irrelevant the moment reality diverges from the plan.</p>
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
                  <span className="check-complete"> &mdash; Your charter is a genuine strategic document. It will guide decisions, not just satisfy governance.</span>
                )}
                {checkedCount >= 9 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps before the first phase transition.</span>
                )}
                {checkedCount >= 5 && checkedCount < 9 && (
                  <span className="check-partial"> &mdash; Your charter has the structure but may lack the specificity to guide difficult decisions.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant gaps. This charter may not survive contact with reality. Revisit before proceeding to delivery.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Direction</strong>, the first pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* SIDEBAR */}
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

      {/* CASE STUDY MODAL */}
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
