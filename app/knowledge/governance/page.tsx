"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ActionItem {
  text: string;
  detail: string;
}

interface HealthCriterion {
  id: string;
  label: string;
  description: string;
  enablers: string;
  obstructors: string;
}

/* ------------------------------------------------------------------ */
/*  Governance Health Check criteria                                    */
/* ------------------------------------------------------------------ */

const healthCriteria: HealthCriterion[] = [
  {
    id: "decision-speed",
    label: "Decision Speed",
    description: "How quickly does your governance enable decisions to be made once the relevant information is available?",
    enablers: "Decisions are made within days. Clear authority means the right person decides without waiting for a committee cycle. Urgent decisions have an explicit fast-track route.",
    obstructors: "Decisions wait for the next scheduled board. Multiple layers of approval are required even for low-risk items. People hold off deciding because they are unsure whether it is their call.",
  },
  {
    id: "clarity-of-authority",
    label: "Clarity of Authority",
    description: "Does every person involved in the programme know exactly what decisions they can and cannot make?",
    enablers: "Decision rights are documented and communicated. People can name who owns each type of decision. There are no grey areas between the programme and the business.",
    obstructors: "People escalate decisions they could make themselves because they are unsure of their authority. The same decision gets discussed in multiple forums. Ownership is assumed but never confirmed.",
  },
  {
    id: "escalation-effectiveness",
    label: "Escalation Effectiveness",
    description: "When issues are escalated, do they get resolved quickly and clearly, or do they enter a loop?",
    enablers: "Escalation paths are defined and short. Escalated issues get a decision within one meeting cycle. The person who escalates is told the outcome and the rationale.",
    obstructors: "Escalated issues bounce between forums. The steering committee defers decisions back to the working group. Issues are marked as escalated but nobody tracks whether they were actually resolved.",
  },
  {
    id: "burden-vs-value",
    label: "Burden vs Value",
    description: "Does your governance generate more value than it costs in time, effort, and delay?",
    enablers: "Reporting is proportionate to risk. Low-risk workstreams have lighter governance. People see governance as a support mechanism, not a bureaucratic hurdle. Meetings are short, focused, and decisive.",
    obstructors: "The programme team spends more time preparing for governance meetings than doing the work. Reports are produced that nobody reads. Governance requirements are the same regardless of the size or risk of the decision.",
  },
  {
    id: "stakeholder-confidence",
    label: "Stakeholder Confidence",
    description: "Do senior stakeholders trust the governance to surface problems early and make sound decisions?",
    enablers: "Sponsors get honest, concise updates. Bad news travels fast because the governance rewards transparency. Stakeholders defend the programme when challenged because they trust the information they receive.",
    obstructors: "Reports are optimistic by default. Problems are hidden until they become crises. Sponsors are surprised by issues that the programme team knew about weeks ago. Trust is low and micro-management increases.",
  },
];

/* ------------------------------------------------------------------ */
/*  Governance design principles (Topic 1)                             */
/* ------------------------------------------------------------------ */

const designPrinciples: ActionItem[] = [
  {
    text: "Design governance around decisions, not meetings",
    detail: "Start by listing the decisions the programme needs to make and who should make them. Then design the minimum governance structure required to support those decisions. Most organisations do it backwards: they set up a steering committee and then try to work out what it should decide. The result is a meeting in search of a purpose. When governance is designed around decisions, every meeting has a clear remit, every attendee knows why they are there, and the test for whether governance is working is simple: are decisions being made at the right speed and quality?",
  },
  {
    text: "Separate strategic governance from operational governance",
    detail: "Strategic decisions (should we change the scope, the timeline, the budget, or the approach?) require senior leadership. Operational decisions (how do we sequence the next sprint, which team goes first, what does the communication say?) do not. When both types of decision flow through the same forum, one of two things happens: senior leaders get dragged into detail they should not be deciding, or operational decisions get delayed waiting for a strategic forum. Separating these two layers is the single most effective thing you can do to speed up your governance.",
  },
  {
    text: "Define escalation criteria, not just escalation paths",
    detail: "Everyone knows that issues should be escalated. Few organisations define what constitutes an issue worth escalating. Without clear criteria, two failure modes emerge: under-escalation, where problems fester because people are reluctant to raise them, and over-escalation, where every minor issue gets pushed upward because people want to protect themselves. Define thresholds: what level of budget variance triggers escalation? What level of timeline risk? What types of stakeholder concern? When the criteria are clear, escalation becomes a process rather than a judgement call.",
  },
  {
    text: "Build in a governance review mechanism",
    detail: "Governance that was right at the start of a programme may not be right six months in. As the programme moves from design to delivery to stabilisation, the types of decisions change, the risks shift, and the people involved evolve. Build an explicit review point every quarter where the governance model itself is assessed: is it still enabling decisions? Is anything being delayed unnecessarily? Are the right people in the room? Governance that cannot adapt becomes the very obstacle it was designed to prevent.",
  },
  {
    text: "Make governance visible and accessible to the whole programme",
    detail: "If the only people who understand how governance works are the programme director and the PMO, the governance is not serving the programme. Everyone involved in the change should be able to answer three questions: who decides this? How do I escalate? What is the fastest route to a decision? Publish a simple one-page governance map. Keep it updated. Make it the first thing new team members see. When governance is visible, people use it. When it is opaque, people work around it.",
  },
];

/* ------------------------------------------------------------------ */
/*  Ownership clarity (Topic 2)                                        */
/* ------------------------------------------------------------------ */

const ownershipRoles = [
  {
    role: "Programme Sponsor",
    owns: "Strategic direction, budget authority, organisational commitment",
    doesNotOwn: "Day-to-day delivery decisions, resource allocation within workstreams, communication drafting",
    clarity: "The sponsor owns the 'why' and the 'what' at the highest level. They remove organisational barriers and hold the programme accountable for outcomes. They do not run the programme.",
  },
  {
    role: "Programme Director / Lead",
    owns: "Delivery approach, timeline, resource coordination, risk management, stakeholder management",
    doesNotOwn: "Business strategy, policy decisions, people management of seconded staff, technology architecture",
    clarity: "The programme lead owns the 'how' and the 'when'. They translate the sponsor's intent into a deliverable plan and manage the interdependencies across workstreams.",
  },
  {
    role: "Workstream Leads",
    owns: "Delivery within their workstream, team coordination, progress reporting, issue identification",
    doesNotOwn: "Cross-workstream dependencies, budget reallocation, scope changes that affect other workstreams",
    clarity: "Workstream leads own their domain but must escalate anything that crosses a boundary. The most common ownership failure is workstream leads making decisions that affect other workstreams without consulting them.",
  },
  {
    role: "Business Change Owners",
    owns: "Readiness of the business to receive the change, adoption, benefit realisation, sustainment post go-live",
    doesNotOwn: "Technical delivery, programme timeline, solution design",
    clarity: "This is the most frequently missing role. Without a named business change owner, nobody in the business is accountable for making the change stick. The programme delivers it and walks away. The business never truly adopts it.",
  },
  {
    role: "Impacted Leaders (Line Managers)",
    owns: "Team readiness, local communication, coaching, feedback, resistance management",
    doesNotOwn: "Programme design, governance, training content, system configuration",
    clarity: "Line managers are the single biggest factor in whether change lands. But they are often the last to be engaged and the least supported. They own the adoption experience for their teams and need to be equipped, not just informed.",
  },
];

const ownershipPrinciples: ActionItem[] = [
  {
    text: "Name names, not functions",
    detail: "Ownership that is assigned to a function ('IT owns the technical workstream') is not ownership. It is an assumption that someone within that function will step forward. Ownership must be personal. A named individual who has accepted the accountability, understands what it requires, and has the authority to deliver it. When ownership is assigned to a function, nobody is accountable. When it is assigned to a person, there is nowhere to hide.",
  },
  {
    text: "Distinguish between accountability and involvement",
    detail: "A RACI matrix is only useful if people genuinely understand the difference between being responsible and being consulted. The most common failure is that everyone thinks they are accountable, which means nobody is. Or worse, everyone thinks they are consulted, which means decisions require consensus from twenty people. For each major decision area, there should be exactly one accountable person. Others contribute, inform, or are informed. If you cannot name the single person accountable, the ownership is not clear.",
  },
  {
    text: "Document ownership at the decision level, not just the role level",
    detail: "A role description that says 'responsible for change delivery' tells you nothing about who decides whether to delay a go-live date, who approves a change to the training approach, or who signs off on a revised communication plan. Map ownership at the decision level. List the twenty most important decisions the programme will face and name who makes each one. This is far more useful than a generic RACI that maps roles to workstreams.",
  },
  {
    text: "Test ownership before you need it",
    detail: "The worst time to discover that ownership is unclear is during a crisis. Run a tabletop exercise early in the programme: present a realistic scenario (a key milestone is at risk, a senior stakeholder withdraws support, adoption data shows a problem) and ask people to walk through who decides what. If there is confusion, hesitation, or disagreement, fix it now. Ownership that has not been tested is ownership that has not been established.",
  },
  {
    text: "Revisit ownership at every phase transition",
    detail: "Ownership that was appropriate during design may not be appropriate during rollout. During design, the programme team owns most decisions. During rollout, the business needs to own more. During stabilisation, the business owns almost everything. If ownership does not shift as the programme progresses, the business never takes responsibility for the change and the programme team becomes a permanent dependency.",
  },
];

/* ------------------------------------------------------------------ */
/*  Checklist items                                                    */
/* ------------------------------------------------------------------ */

const checkItems = [
  { key: "decisions-mapped", label: "We have mapped the key decisions the programme needs to make and assigned each one to a named individual" },
  { key: "strategic-operational", label: "Strategic and operational governance are separated with clear remits for each" },
  { key: "escalation-criteria", label: "Escalation criteria are defined with specific thresholds, not just escalation paths" },
  { key: "governance-proportionate", label: "Governance requirements are proportionate to risk: lighter for low-risk items, heavier for high-risk ones" },
  { key: "one-page-map", label: "A one-page governance map exists and is accessible to everyone in the programme" },
  { key: "business-change-owner", label: "A named business change owner exists for each major area of change" },
  { key: "ownership-tested", label: "Ownership has been tested through a scenario exercise, not just documented on paper" },
  { key: "phase-transitions", label: "Ownership is reviewed and adjusted at each phase transition" },
  { key: "decision-speed-tracked", label: "We track how long decisions take from request to resolution" },
  { key: "governance-reviewed", label: "The governance model itself is reviewed at least quarterly and adapted as needed" },
];

/* ------------------------------------------------------------------ */
/*  Case studies                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "NHS England",
    headline: "The National Programme for IT: when centralised governance overrode local decision rights",
    hook: "A ten billion pound programme dismantled after a decade because governance was designed for control, not for decisions.",
    dimension: "Governance Failure",
    body: [
      "In 2002, the UK government launched the National Programme for IT (NPfIT) in the NHS, the largest public-sector IT programme ever attempted in the country. The ambition was to create a single, integrated electronic care records system across the entire NHS. The programme was centrally governed from Whitehall, with decisions about systems, suppliers, and implementation approaches made at the national level and imposed on local NHS organisations.",
      "The governance model was designed for control: a central authority made top-down decisions on behalf of hundreds of local organisations, each with different needs, different levels of readiness, and different existing systems. Local clinicians and managers had almost no decision rights over the systems they would be required to use. Feedback from doctors, nurses, and GPs about accessibility and usability requirements was raised early but had no effective route into the decision-making process.",
      "The result was a programme that delivered systems that local organisations did not want, could not use effectively, and actively resisted. Contracts were structured nationally, meaning that when a supplier failed to deliver in one region, the governance model had no mechanism for a local organisation to make alternative arrangements. Decisions that should have been made locally were trapped in a national governance structure that moved slowly and responded poorly to the reality on the ground.",
      "After nearly a decade of delays, cost overruns, and stakeholder opposition, the programme was formally dismantled in 2011. The total cost exceeded ten billion pounds. Subsequent analysis identified governance as one of the root causes: the programme concentrated decision rights at the wrong level, created escalation paths that were too long and too slow, and designed governance for oversight rather than for enabling effective decisions.",
    ],
    lesson: "NPfIT demonstrates what happens when governance is designed for control rather than for decisions. Centralising authority can feel like it reduces risk, but when the people closest to the problem have no decision rights, the governance itself becomes the biggest risk. Effective change governance distributes decision rights to the level where the best information exists.",
    source: "https://www.henricodolfing.com/2019/01/case-study-10-billion-it-disaster.html",
    sourceLabel: "Henrico Dolfing",
  },
  {
    label: "Boeing",
    headline: "The 737 MAX: what happens when safety decisions have no clear governance owner",
    hook: "No board committee was responsible for aircraft safety. Two crashes and 346 lives later, the governance gap became undeniable.",
    dimension: "Decision Rights Failure",
    body: [
      "The Boeing 737 MAX crisis, which led to two fatal crashes in 2018 and 2019 killing 346 people, is frequently discussed as an engineering or cultural failure. It was also, fundamentally, a governance and decision rights failure. At the time of the crashes, none of Boeing's board committees had been specifically assigned responsibility for overseeing aircraft safety. The most critical category of decision in an aerospace company had no clear governance owner at the highest level of the organisation.",
      "The absence of explicit safety governance at board level created a vacuum that was filled by production and commercial pressures. Decision rights around the 737 MAX programme were heavily influenced by the need to compete with Airbus and meet aggressive production timelines. Engineers who raised concerns about the MCAS system found that the governance structure provided no effective escalation path to someone with the authority and the mandate to prioritise safety over schedule.",
      "The relationship with the FAA compounded the problem. Boeing had been granted significant authority to self-certify aspects of its own aircraft. This delegation of decision rights from the regulator to the manufacturer required robust internal governance to ensure those rights were exercised responsibly. Instead, Boeing's governance incentivised speed and allowed critical test results to be managed rather than transparently reported.",
      "Between the first crash in October 2018 and the second in March 2019, Boeing's board did not discuss grounding the aircraft due to safety concerns. The governance structure simply did not surface this as a decision that required board-level attention. The decision rights for the most consequential safety question the company faced were not assigned to anyone with the authority and the information to make the right call.",
    ],
    lesson: "Boeing illustrates the lethal consequence of unclear decision rights. When the most important category of decision in an organisation has no named governance owner, that decision will be made by default, shaped by whatever pressures are strongest at the time. Governance must ensure that the most consequential decisions are explicitly owned, not left to emerge from competing priorities.",
    source: "https://blog.volkovlaw.com/2021/11/boeings-board-governance-failures-and-the-737-max-safety-scandal-part-iii-of-iv/",
    sourceLabel: "Volkov Law",
  },
  {
    label: "Spotify",
    headline: "How Spotify designed governance that scaled autonomy instead of restricting it",
    hook: "Squads decide how they decide. But alignment and enabling constraints make it work at scale.",
    dimension: "Governance Success",
    body: [
      "When Spotify scaled its engineering organisation, it faced the governance challenge that every growing company encounters: how do you maintain decision speed and team ownership as the organisation gets larger and more complex? Most companies respond by adding layers of approval. Spotify responded by designing a governance model that explicitly distributed decision rights to the teams closest to the work.",
      "The Spotify model organises teams into squads, tribes, chapters, and guilds. Each squad is responsible for a specific area of the product and has full autonomy over how it designs, builds, tests, and deploys its work. Critically, squads are not required to submit decisions to management for approval. The governance model does not prescribe a decision-making process for squads; each squad decides how it decides. This is a radical distribution of decision rights that most organisations would consider ungovernable.",
      "What makes it work is the governance architecture around the autonomy. Strategic decisions about organisational structure and long-term direction remain with senior leadership. Company-level priorities, called company bets, are reviewed and set quarterly. Squads operate freely within these strategic boundaries. The model creates what Spotify calls enabling constraints: enough structure to ensure alignment, but not so much that it slows teams down. The principle is explicit: the stronger the alignment, the more autonomy can be granted.",
      "The model is not without challenges. Technical dependencies between squads create coordination complexity. Autonomy can lead to duplication of effort or inconsistent approaches. But Spotify addresses these through voluntary coordination mechanisms like guilds and chapters rather than mandatory approval processes. The governance enables teams to coordinate because they want to, not because they are forced to.",
    ],
    lesson: "Spotify demonstrates that governance does not have to mean control. By clearly separating strategic decisions (owned by leadership) from operational decisions (owned by squads), and by creating enabling constraints rather than approval gates, Spotify built a governance model that scales autonomy rather than restricting it. The lesson for change programmes is that governance which distributes decision rights to the people with the best information produces faster, better decisions than governance which concentrates authority at the top.",
    source: "https://www.sciencedirect.com/science/article/pii/S0164121223000444",
    sourceLabel: "Journal of Systems and Software",
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable ExpandableList component                                  */
/* ------------------------------------------------------------------ */

function ExpandableList({ items }: { items: ActionItem[] }) {
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
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function GovernancePage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [activeRole, setActiveRole] = useState<number | null>(null);

  /* Governance Health Check state */
  const [healthScores, setHealthScores] = useState<Record<string, number>>({});

  const handleHealthScore = (id: string, score: number) => {
    setHealthScores((prev) => ({ ...prev, [id]: score }));
  };

  const allScored = Object.keys(healthScores).length === healthCriteria.length;

  const totalScore = Object.values(healthScores).reduce((a, b) => a + b, 0);
  const maxScore = healthCriteria.length * 5;
  const scorePercent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const getVerdict = () => {
    if (scorePercent >= 80) return { level: "Enabling", colour: "#2E6B4F", message: "Your governance is enabling delivery. It is designed around decisions, not control. Protect this by reviewing it quarterly and resisting the urge to add layers as complexity increases." };
    if (scorePercent >= 60) return { level: "Mixed", colour: "#B8860B", message: "Your governance has enabling elements but also significant friction points. Identify the two lowest-scoring criteria and address those first. Often, separating strategic and operational governance and defining escalation criteria will unlock the most improvement." };
    if (scorePercent >= 40) return { level: "Obstructing", colour: "#C0392B", message: "Your governance is more likely slowing delivery than enabling it. Decisions are probably waiting for meetings, authority is unclear, and escalation is unreliable. Consider a fundamental redesign focused on decision speed, not oversight coverage." };
    return { level: "Severely Obstructing", colour: "#7B241C", message: "Your governance is a significant barrier to delivery. It is likely consuming more programme effort than it is contributing value. The programme team is probably working around governance rather than through it. A complete reset is needed, starting from the decisions that matter and designing the minimum structure to support them." };
  };

  const verdict = getVerdict();

  /* Checklist */
  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      {/* ---------------------------------------------------------- */}
      {/*  HEADER                                                     */}
      {/* ---------------------------------------------------------- */}

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Governance &amp; Decision Rights</span>
          <h1 className="article-title">How to design change governance that enables decisions, not delays them</h1>
          <p className="article-intro">Governance is supposed to help. In most change programmes, it does the opposite. It creates layers of approval that slow decisions down, forums where the same issues are discussed repeatedly without resolution, and reporting that consumes more effort than the work it describes. The problem is not too much governance or too little. It is governance designed for the wrong purpose: oversight instead of decision-making, control instead of clarity. This guide covers two connected challenges. First, how to design governance that actually enables decisions. Second, how to make ownership of the change genuinely clear so that the right people are making the right calls at the right time.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ---------------------------------------------------------- */}
      {/*  TOPIC 1: GOVERNANCE DESIGN                                 */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Part One: Designing Governance That Enables Decisions</h2>
          <p className="article-section-desc">Most governance structures are designed by asking &ldquo;what do we need to oversee?&rdquo; The better question is &ldquo;what decisions does this programme need to make, and what is the fastest, clearest way to make them well?&rdquo; The five principles below describe what governance looks like when it is designed for decision-making rather than for control.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Five Principles of Decision-Enabling Governance</h3>
            <ExpandableList items={designPrinciples} />
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  THE GOVERNANCE HEALTH CHECK                                */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Governance Health Check</h2>
          <p className="article-section-desc">Rate your current governance against five criteria. For each one, score from 1 (strongly obstructing) to 5 (fully enabling). Be honest: the value of this assessment depends on accuracy, not optimism.</p>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "8px" }}>
          {healthCriteria.map((criterion, idx) => (
            <ScrollReveal key={criterion.id} direction="up" delay={idx * 60}>
              <div style={{
                background: "#fff",
                border: "1px solid #E5E5E5",
                borderRadius: "12px",
                padding: "28px 32px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "var(--gold)",
                  }}>Criterion {idx + 1}</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--heading)",
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  margin: "0 0 6px",
                }}>{criterion.label}</h3>
                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#555",
                  margin: "0 0 16px",
                }}>{criterion.description}</p>

                {/* Enablers vs Obstructors */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ background: "#F0FAF5", borderRadius: "8px", padding: "16px" }}>
                    <span style={{
                      fontFamily: "var(--ui)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "#2E6B4F",
                      display: "block",
                      marginBottom: "6px",
                    }}>Looks like when enabling</span>
                    <p style={{
                      fontFamily: "var(--body)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#333",
                      margin: 0,
                    }}>{criterion.enablers}</p>
                  </div>
                  <div style={{ background: "#FDF2F2", borderRadius: "8px", padding: "16px" }}>
                    <span style={{
                      fontFamily: "var(--ui)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "#C0392B",
                      display: "block",
                      marginBottom: "6px",
                    }}>Looks like when obstructing</span>
                    <p style={{
                      fontFamily: "var(--body)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#333",
                      margin: 0,
                    }}>{criterion.obstructors}</p>
                  </div>
                </div>

                {/* Score buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#888",
                    marginRight: "4px",
                  }}>Obstructing</span>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleHealthScore(criterion.id, score)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: healthScores[criterion.id] === score ? "2px solid var(--navy)" : "2px solid #DDD",
                        background: healthScores[criterion.id] === score ? "var(--navy)" : "#fff",
                        color: healthScores[criterion.id] === score ? "#fff" : "#555",
                        fontFamily: "var(--ui)",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {score}
                    </button>
                  ))}
                  <span style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#888",
                    marginLeft: "4px",
                  }}>Enabling</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Results */}
        {allScored && (
          <ScrollReveal direction="up">
            <div style={{
              marginTop: "32px",
              background: verdict.colour,
              borderRadius: "12px",
              padding: "32px",
              color: "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
                <span style={{
                  fontFamily: "var(--heading)",
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 800,
                  lineHeight: 1,
                }}>{totalScore}</span>
                <span style={{
                  fontFamily: "var(--ui)",
                  fontSize: "14px",
                  fontWeight: 500,
                  opacity: 0.8,
                }}>out of {maxScore}</span>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "6px",
                height: "8px",
                marginBottom: "20px",
                overflow: "hidden",
              }}>
                <div style={{
                  background: "#fff",
                  height: "100%",
                  width: `${scorePercent}%`,
                  borderRadius: "6px",
                  transition: "width 0.6s ease",
                }} />
              </div>

              <h3 style={{
                fontFamily: "var(--heading)",
                fontSize: "22px",
                fontWeight: 700,
                margin: "0 0 8px",
              }}>Your governance is: {verdict.level}</h3>

              <p style={{
                fontFamily: "var(--body)",
                fontSize: "15px",
                lineHeight: 1.7,
                margin: 0,
                opacity: 0.95,
              }}>{verdict.message}</p>

              {/* Per-criterion breakdown */}
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {healthCriteria.map((c) => {
                  const s = healthScores[c.id] || 0;
                  return (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "12px",
                        fontWeight: 600,
                        minWidth: "160px",
                        opacity: 0.9,
                      }}>{c.label}</span>
                      <div style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "4px",
                        height: "6px",
                        overflow: "hidden",
                      }}>
                        <div style={{
                          background: "#fff",
                          height: "100%",
                          width: `${(s / 5) * 100}%`,
                          borderRadius: "4px",
                          transition: "width 0.4s ease",
                        }} />
                      </div>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "13px",
                        fontWeight: 700,
                        minWidth: "20px",
                        textAlign: "right" as const,
                      }}>{s}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setHealthScores({})}
                style={{
                  marginTop: "24px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "#fff",
                  fontFamily: "var(--ui)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                Reset and reassess
              </button>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  TOPIC 2: OWNERSHIP & DECISION RIGHTS                      */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Part Two: Who Should Own What in a Change Programme</h2>
          <p className="article-section-desc">Governance structures are only as effective as the ownership beneath them. If it is not clear who owns what, governance becomes a forum for discussion rather than a mechanism for decision. Below are the five critical ownership roles in any change programme, what each one owns, and where the boundaries are. Click any role to see the detail.</p>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
          {ownershipRoles.map((r, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <button
                onClick={() => setActiveRole(activeRole === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left" as const,
                  background: activeRole === i ? "var(--navy)" : "#fff",
                  color: activeRole === i ? "#fff" : "var(--navy)",
                  border: activeRole === i ? "1px solid var(--navy)" : "1px solid #E5E5E5",
                  borderRadius: "10px",
                  padding: "20px 24px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontFamily: "var(--heading)",
                    fontSize: "17px",
                    fontWeight: 700,
                  }}>{r.role}</span>
                  <span style={{
                    fontSize: "18px",
                    transform: activeRole === i ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    opacity: 0.5,
                  }}>&rsaquo;</span>
                </div>
              </button>

              {activeRole === i && (
                <div style={{
                  background: "#FAFAFA",
                  border: "1px solid #E5E5E5",
                  borderTop: "none",
                  borderRadius: "0 0 10px 10px",
                  padding: "24px",
                  marginTop: "-4px",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: "#2E6B4F",
                        display: "block",
                        marginBottom: "6px",
                      }}>Owns</span>
                      <p style={{
                        fontFamily: "var(--body)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "#333",
                        margin: 0,
                      }}>{r.owns}</p>
                    </div>
                    <div>
                      <span style={{
                        fontFamily: "var(--ui)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: "#C0392B",
                        display: "block",
                        marginBottom: "6px",
                      }}>Does Not Own</span>
                      <p style={{
                        fontFamily: "var(--body)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "#333",
                        margin: 0,
                      }}>{r.doesNotOwn}</p>
                    </div>
                  </div>
                  <div style={{
                    background: "#fff",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    padding: "16px",
                  }}>
                    <span style={{
                      fontFamily: "var(--ui)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "var(--gold)",
                      display: "block",
                      marginBottom: "6px",
                    }}>Clarity Test</span>
                    <p style={{
                      fontFamily: "var(--body)",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#333",
                      margin: 0,
                    }}>{r.clarity}</p>
                  </div>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  MAKING OWNERSHIP CLEAR                                     */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">How to Make Ownership Genuinely Clear</h2>
          <p className="article-section-desc">Defining roles is necessary but not sufficient. Ownership only becomes real when it is specific, personal, tested, and regularly reviewed. These five principles turn theoretical ownership into practical accountability.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Five Principles of Clear Ownership</h3>
            <ExpandableList items={ownershipPrinciples} />
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  SELF-CHECK CHECKLIST                                       */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Governance and Ownership Self-Check</h2>
          <p className="article-section-desc">Use this checklist to assess whether your governance and ownership model is built for decisions or built for oversight. Each item represents a characteristic of programmes where governance enables delivery rather than obstructing it.</p>
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
                  <span className="check-complete"> &mdash; Your governance and ownership model is designed for decisions, not delays. Maintain this by reviewing it quarterly.</span>
                )}
                {checkedCount >= 8 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps to move from good governance to genuinely enabling governance.</span>
                )}
                {checkedCount >= 5 && checkedCount < 8 && (
                  <span className="check-partial"> &mdash; Governance structure exists but may be causing as many delays as it prevents. Focus on decision speed and ownership clarity.</span>
                )}
                {checkedCount >= 2 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant gaps in governance and ownership. Decisions are likely being delayed, duplicated, or avoided. Prioritise the fundamentals.</span>
                )}
                {checkedCount > 0 && checkedCount < 2 && (
                  <span className="check-partial"> &mdash; Governance is likely operating as a barrier rather than an enabler. Consider a fundamental redesign starting from the decisions that matter most.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  CTA                                                        */}
      {/* ---------------------------------------------------------- */}

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Execution</strong>, the fourth pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ---------------------------------------------------------- */}
      {/*  SIDEBAR                                                    */}
      {/* ---------------------------------------------------------- */}

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

      {/* ---------------------------------------------------------- */}
      {/*  CASE STUDY MODAL                                           */}
      {/* ---------------------------------------------------------- */}

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
