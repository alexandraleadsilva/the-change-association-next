"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ActionItem {
  text: string;
  detail: string;
}

const phases = [
  {
    id: "foundation",
    num: "01",
    name: "Foundation",
    duration: "Weeks 1 to 6",
    focus: "Diagnosis, alignment, and design",
    what: "The foundation phase is where most change programmes rush and most successful ones invest. It covers the diagnostic work, leadership alignment, narrative design, and success definition that everything else builds on. Nothing visible happens to the wider organisation yet, but the conditions for success are being established.",
    activities: [
      { text: "Complete the current state assessment across all five dimensions", detail: "People, Process, Culture, Capability, and Systems. This is the evidence base. Without it, every subsequent decision is based on assumption. The foundation phase exists to replace assumption with understanding." },
      { text: "Test and secure genuine leadership alignment", detail: "Not a single briefing followed by assumed agreement. Individual conversations with each senior leader to understand their interpretation of the future state, their concerns, and their commitment. Resolve differences now, not during delivery." },
      { text: "Design the change narrative at all four layers", detail: "Strategic, organisational, personal, and identity. The narrative should be tested with a small group of managers and frontline staff before the wider launch. If it does not resonate in a test, it will not resonate at scale." },
      { text: "Define success in terms of outcomes, behaviours, evidence, and timeline", detail: "This is the contract between the programme and the business. What will be different, how will we know, and when should we expect to see it? If this is not defined before delivery begins, there is no basis for knowing whether the change is working." },
    ] as ActionItem[],
    commonMistake: "Skipping or compressing the foundation phase because leadership wants to see action. The cost of a weak foundation is paid tenfold during delivery when problems that could have been prevented become crises that must be managed.",
  },
  {
    id: "pilot",
    num: "02",
    name: "Pilot",
    duration: "Weeks 4 to 10",
    focus: "Test, learn, and refine with a willing group",
    what: "The pilot phase tests the change with a small, carefully selected group before rolling it out to the wider organisation. The purpose is not to prove the change works. It is to discover what needs to be adjusted. A pilot that only confirms success is a missed opportunity. A pilot that surfaces real problems is invaluable.",
    activities: [
      { text: "Select a pilot group that is representative, not just willing", detail: "It is tempting to pilot with the most enthusiastic team. But if the pilot group is not representative of the wider population, the lessons you learn will not transfer. Include sceptics, include busy teams, include different geographies. The pilot should reflect reality." },
      { text: "Define what you are testing and how you will measure it", detail: "A pilot without a hypothesis is just early implementation. Define specifically what you want to learn: does the training prepare people adequately? Does the new process work in practice? Are the tools ready? Measure against these questions, not just whether the pilot completed." },
      { text: "Collect feedback aggressively and act on it visibly", detail: "The pilot group is giving you their time and goodwill. If they provide feedback and nothing changes, they will disengage. Act on what you hear quickly, even if the changes are small. This builds credibility for the full rollout." },
      { text: "Document what worked, what did not, and what surprised you", detail: "The most valuable output of a pilot is not a success story. It is a list of things you did not expect. These surprises are the gaps in your plan. Each one you address before the full rollout is a problem you will not face at scale." },
    ] as ActionItem[],
    commonMistake: "Treating the pilot as a formality rather than a genuine learning exercise. If the pilot plan does not include the possibility of changing the approach based on what you discover, it is not a pilot. It is a soft launch.",
  },
  {
    id: "rollout",
    num: "03",
    name: "Rollout",
    duration: "Weeks 8 to 20",
    focus: "Sequenced deployment with built-in adaptation",
    what: "The rollout phase deploys the change to the wider organisation in planned waves. Each wave builds on the lessons of the previous one. The sequencing is deliberate: start with groups that are most ready, then move to groups that need more support, then tackle the most complex or resistant areas last.",
    activities: [
      { text: "Sequence waves by readiness, not by convenience", detail: "It is tempting to roll out alphabetically, by region, or by business unit. But the most effective sequencing is based on readiness: which groups are most prepared, which need additional support, and which face the most complex change? Start where you can build momentum." },
      { text: "Build feedback loops between waves", detail: "Each wave should inform the next. What issues emerged? What support was insufficient? What was people's actual experience compared to what was planned? If you do not build these feedback loops, you repeat the same mistakes across every wave." },
      { text: "Maintain visible leadership presence throughout", detail: "Leadership energy often peaks at the launch and fades during rollout. But rollout is when people are experiencing the change for the first time. Executive visibility, manager readiness, and communication frequency should increase during rollout, not decrease." },
      { text: "Monitor adoption in real time, not at the end", detail: "If you wait until the rollout is complete to measure adoption, it is too late to intervene. Track leading indicators during each wave: are people using the new system? Are managers answering questions? Are workarounds appearing? Real-time data allows real-time course correction." },
    ] as ActionItem[],
    commonMistake: "Rolling out too fast because the programme timeline demands it. Speed without readiness produces compliance at best and chaos at worst. Each wave needs enough time for people to adapt before the next one begins.",
  },
  {
    id: "stabilise",
    num: "04",
    name: "Stabilise",
    duration: "Weeks 16 to 28",
    focus: "Embedding, reinforcing, and resolving what did not land",
    what: "The stabilisation phase is where most programmes hand over to business as usual and walk away. This is exactly where the change is most vulnerable. Stabilisation means staying engaged until the new way of working is genuinely embedded, not just technically live.",
    activities: [
      { text: "Address the issues that emerged during rollout before they become permanent workarounds", detail: "Every rollout surfaces problems. Some are minor. Some are structural. If they are not addressed during stabilisation, people will create workarounds that become the new normal. Those workarounds are very difficult to remove later." },
      { text: "Reinforce the behaviours that the change requires through recognition and systems", detail: "If the new behaviours are not reinforced, the old ones return. This means aligning performance management, recognition, and leadership behaviour with the change. If the KPIs still reward the old way of working, the new way will not stick." },
      { text: "Conduct structured reviews at 30, 90, and 180 days", detail: "Each review answers a different question. At 30 days: is it landing? At 90 days: is it sticking? At 180 days: is it embedded? These reviews should involve the people living the change, not just the people who designed it." },
      { text: "Transfer ownership formally from the programme to the business", detail: "Ownership does not transfer by default when the project closes. It transfers when a specific person in the business accepts accountability for sustaining the change, with the resources and authority to do so. If this handover is vague, sustainment will fail." },
    ] as ActionItem[],
    commonMistake: "Declaring success at go-live and disbanding the team. The change is not complete when the system is live or the restructure is announced. It is complete when people are working differently and the outcomes are being realised. That takes months after go-live.",
  },
];

const approachComparison = [
  {
    approach: "Big Bang",
    description: "Everything changes at once for everyone. One go-live date.",
    when: "Small organisation, simple change, strong readiness, high urgency.",
    risk: "If it fails, it fails everywhere simultaneously with no fallback.",
  },
  {
    approach: "Phased Rollout",
    description: "Change deployed in sequenced waves. Each wave informs the next.",
    when: "Large organisation, complex change, variable readiness, need to learn as you go.",
    risk: "Slower. Requires maintaining old and new systems in parallel. Fatigue if too many waves.",
  },
  {
    approach: "Pilot Then Scale",
    description: "Test with a small group, refine, then roll out based on what you learned.",
    when: "High uncertainty. New technology or process. Need evidence before committing at scale.",
    risk: "Pilot group may not be representative. Lessons may not transfer to different contexts.",
  },
  {
    approach: "Hybrid",
    description: "Different approaches for different parts of the change or different groups.",
    when: "Complex transformation with multiple workstreams at different levels of readiness.",
    risk: "Coordination complexity. Different groups at different stages can create confusion.",
  },
];

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

const caseStudies = [
  {
    label: "Hershey's",
    headline: "The $100 million cost of choosing big bang over phased rollout",
    hook: "They compressed 48 months into 30 and went live with everything at once. Right before Halloween.",
    dimension: "Big Bang Failure",
    body: [
      "In 1996, Hershey's decided to replace its legacy systems with SAP ERP, Manugistics supply chain software, and Siebel CRM simultaneously. The vendor recommended a 48-month phased implementation. Hershey compressed it to 30 months to beat the Y2K deadline.",
      "The company chose a big bang approach: all three systems went live at the same time in July 1999. There was no pilot. There was no phased rollout by region or product line. Every part of the business switched over simultaneously.",
      "The result was catastrophic. Orders were not flowing correctly. Despite having inventory in warehouses, Hershey could not fulfil orders for its most popular products during the Halloween and Christmas sales period. The company missed more than $100 million in orders. Its stock dropped nearly 10%.",
      "A phased approach would have allowed Hershey to test the systems with a single product line or region, identify the integration issues before they affected the entire business, and maintain fallback capability during the transition.",
    ],
    lesson: "Hershey's demonstrates the ultimate risk of big bang implementation: when everything changes at once, everything can fail at once. A phased approach sacrifices speed for safety, and in Hershey's case, that trade-off would have been worth hundreds of millions of dollars.",
    source: "https://pemeco.com/a-case-study-on-hersheys-erp-implementation-failure-the-importance-of-testing-and-scheduling/",
    sourceLabel: "Pemeco",
  },
  {
    label: "ING Bank",
    headline: "ING phased its agile transformation tribe by tribe and learned at every step",
    hook: "3,500 people reorganised into squads. But not all at once.",
    dimension: "Phased Success",
    body: [
      "When ING Netherlands transformed its operating model into agile squads and tribes in 2015, the scale was enormous: 3,500 people moved into entirely new team structures. But the transformation was deliberately phased.",
      "ING started with a pilot in one part of the organisation, testing the squad model with a small number of teams. They measured what worked, what did not, and what needed adjustment. The pilot revealed issues with role clarity, career progression, and team formation that the design phase had not anticipated.",
      "Based on these lessons, ING adjusted its approach before rolling out to the next set of tribes. Each wave incorporated feedback from the previous one. Teams that were ready moved first. Teams that needed more support received it before their transition.",
      "The phased approach allowed ING to build internal expertise in the new model, create a network of champions who had lived through the transition, and refine the support materials based on real experience rather than theory.",
    ],
    lesson: "ING demonstrates that phasing is not just about reducing risk. It is about building capability. Each wave creates people who understand the change from experience, and those people become the most credible advocates for the next wave.",
    source: "https://www.mckinsey.com/industries/financial-services/our-insights/ings-agile-transformation",
    sourceLabel: "McKinsey",
  },
  {
    label: "McKinsey Research",
    headline: "Transformations that phase deliberately are 1.5x more likely to succeed",
    hook: "The data shows that phasing is not about being cautious. It is about being smart.",
    dimension: "Research Evidence",
    body: [
      "McKinsey research on transformation success rates consistently shows that organisations which take a phased, iterative approach to implementation are significantly more likely to achieve their intended outcomes than those which attempt to change everything at once.",
      "The research identifies several mechanisms that explain this. First, phasing creates feedback loops: each wave produces data about what is working and what is not, allowing the approach to be refined. Second, phasing builds momentum: early successes create advocates who support subsequent waves. Third, phasing manages capacity: organisations can only absorb so much change at once.",
      "Critically, the research distinguishes between phasing and slowness. A well-phased approach can be faster overall than a big bang that fails and requires remediation. The time spent on a pilot and sequenced rollout is recovered many times over by avoiding the rework that comes from deploying a flawed approach at scale.",
      "The data also shows that the organisations which phase most effectively are those that build genuine learning into each phase, not just execution. They change the plan based on what they discover, rather than treating the plan as fixed and the phases as merely a deployment schedule.",
    ],
    lesson: "The evidence is clear: phasing is not a sign of caution. It is a sign of competence. Organisations that phase deliberately, learn from each wave, and adapt their approach are significantly more likely to deliver sustainable results.",
    source: "https://www.mckinsey.com/capabilities/transformation/our-insights/the-numbers-behind-successful-transformations",
    sourceLabel: "McKinsey",
  },
];

export default function PhasedApproach() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeApproach, setActiveApproach] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "foundation", label: "We have invested adequate time in the foundation phase before starting delivery" },
    { key: "pilot", label: "We are running a genuine pilot that could change our approach, not just a soft launch" },
    { key: "representative", label: "Our pilot group is representative of the wider population, not just the most willing" },
    { key: "sequenced", label: "Rollout waves are sequenced by readiness, not by convenience" },
    { key: "feedback", label: "We have feedback loops between waves that genuinely inform the next one" },
    { key: "leadership", label: "Leadership visibility increases during rollout, not decreases" },
    { key: "realtime", label: "We are monitoring adoption in real time during each wave" },
    { key: "stabilise", label: "We have a stabilisation plan that extends at least 6 months beyond go-live" },
    { key: "reviews", label: "Structured reviews are planned at 30, 90, and 180 days" },
    { key: "handover", label: "A specific person in the business has accepted accountability for sustaining the change" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Roadmap & Planning</span>
          <h1 className="article-title">What does a phased approach to change actually look like in practice?</h1>
          <p className="article-intro">Everyone talks about phasing. Few do it well. A phased approach is not just about splitting the work into stages. It is about designing each phase to build on the last, creating genuine learning loops, and having the discipline to adapt the plan based on what each phase reveals. Most organisations phase their project delivery but not their change delivery. The result is a perfectly sequenced technical rollout with an entirely unprepared organisation.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* THE FOUR PHASES */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Four Phases of a Well-Managed Change</h2>
          <p className="article-section-desc">A practical phased approach has four stages. Each one has a different purpose and different success criteria. Click any phase to see what it involves, what to watch for, and the most common mistake.</p>
        </ScrollReveal>

        <div className="staircase">
          {phases.map((p, i) => (
            <ScrollReveal key={p.id} direction="up" delay={i * 80}>
              <button
                className={`stair${activePhase === p.id ? " stair-active" : ""}`}
                style={{
                  "--stair-colour": i === 0 ? "#6B7280" : i === 1 ? "#B8860B" : i === 2 ? "#2E6B4F" : "#0A1628",
                  marginLeft: `${i * 48}px`,
                } as React.CSSProperties}
                onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              >
                <span className="stair-level">{p.num}</span>
                <span className="stair-name">{p.name}</span>
                <span className="stair-tagline">{p.duration}: {p.focus}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {activePhase && (
        <section className="article-section dimension-detail">
          {phases.filter(p => p.id === activePhase).map(p => (
            <div key={p.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{p.num}</span>
                  <h2 className="detail-title">{p.name}</h2>
                </div>
                <p style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "16px" }}>{p.duration}</p>
                <p className="detail-body">{p.what}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">Key Activities</h3>
                  <ExpandableList items={p.activities} />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">The Most Common Mistake</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{p.commonMistake}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* APPROACH COMPARISON */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Choosing Your Approach</h2>
          <p className="article-section-desc">There is no single correct way to phase a change. The right approach depends on the complexity, urgency, and readiness of your organisation. Click any approach to see when it works and the risks it carries.</p>
        </ScrollReveal>

        <div className="phase-list">
          {approachComparison.map((a, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeApproach === i ? " phase-card-active" : ""}`}
                onClick={() => setActiveApproach(activeApproach === i ? null : i)}
              >
                <span className="phase-card-pillar">{a.approach}</span>
                <span className="phase-card-name">{a.description}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeApproach !== null && (
          <ScrollReveal direction="up">
            <div className="phase-compare" style={{ marginTop: "4px" }}>
              <div className="phase-compare-col">
                <span className="phase-compare-label">Best When</span>
                <p className="phase-compare-text">{approachComparison[activeApproach].when}</p>
              </div>
              <div className="phase-compare-col phase-compare-leader">
                <span className="phase-compare-label">Key Risk</span>
                <p className="phase-compare-text">{approachComparison[activeApproach].risk}</p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Phasing Genuine?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your phased approach is designed for learning and adaptation, or whether it is just a deployment schedule with dates.</p>
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
                  <span className="check-complete"> &mdash; Your phased approach is designed for genuine learning and adaptation.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong approach. Address the gaps before the next wave.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Phasing is in place but may be more of a schedule than a learning system.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Significant gaps. Your phasing may not provide the learning and adaptation it needs to.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Execution</strong>, the fourth pillar of the TCA Change Model.</p>
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
