"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const assessmentPairs = [
  {
    theme: "Communication",
    manager: "I track whether communications have been sent and received",
    leader: "I check whether people have understood the message and believe in it",
  },
  {
    theme: "Planning",
    manager: "I follow the change plan and report on milestone completion",
    leader: "I adapt the approach when the situation shifts, even if it means changing the plan",
  },
  {
    theme: "Resistance",
    manager: "I identify resistance and escalate it as a risk",
    leader: "I seek out resistance as a signal and use it to improve the approach",
  },
  {
    theme: "Stakeholders",
    manager: "I manage the stakeholder engagement schedule and track touchpoints",
    leader: "I build genuine relationships and understand what each stakeholder needs to move forward",
  },
  {
    theme: "Sponsorship",
    manager: "I brief the sponsor with status updates and ask them to attend governance meetings",
    leader: "I coach the sponsor on what the organisation needs to see from them and when",
  },
  {
    theme: "Decisions",
    manager: "I present options and wait for leadership to decide",
    leader: "I make a recommendation, explain the trade-offs, and push for a decision",
  },
  {
    theme: "Success",
    manager: "I measure success by whether activities were completed on time",
    leader: "I measure success by whether people are actually working differently",
  },
  {
    theme: "Ownership",
    manager: "I deliver the change management workstream within the programme",
    leader: "I take ownership of whether the change lands, regardless of what my role description says",
  },
];

interface PhaseContent {
  id: string;
  phase: string;
  pillar: string;
  managerDoes: string;
  leaderDoes: string;
  keyQuestion: string;
}

const phases: PhaseContent[] = [
  {
    id: "direction",
    phase: "Setting Direction",
    pillar: "Direction",
    managerDoes: "Documents the current state and future state as defined by leadership. Creates the change management plan based on scope and timeline provided.",
    leaderDoes: "Challenges whether the diagnosis is deep enough. Asks whether leaders are genuinely aligned or just publicly agreeing. Shapes the strategic narrative rather than just communicating it.",
    keyQuestion: "Am I accepting the brief, or shaping it?",
  },
  {
    id: "engagement",
    phase: "Building Engagement",
    pillar: "Engagement",
    managerDoes: "Executes the communication plan. Runs stakeholder workshops. Tracks engagement metrics. Identifies and logs resistance.",
    leaderDoes: "Designs engagement around what people actually need to hear, not what the programme wants to say. Treats resistance as intelligence. Creates space for honest conversation about what the change means for people.",
    keyQuestion: "Am I communicating at people, or engaging with them?",
  },
  {
    id: "enablement",
    phase: "Enabling People",
    pillar: "Enablement",
    managerDoes: "Coordinates the training schedule. Tracks completion rates. Ensures materials are available. Reports on readiness.",
    leaderDoes: "Assesses whether people have the confidence, not just the knowledge, to work differently. Equips managers to support their teams. Challenges whether training alone is enough to close the capability gap.",
    keyQuestion: "Am I scheduling training, or building capability?",
  },
  {
    id: "execution",
    phase: "Driving Execution",
    pillar: "Execution",
    managerDoes: "Maintains the RAID log. Reports status. Attends governance. Escalates risks through proper channels.",
    leaderDoes: "Makes judgement calls when the plan meets reality. Removes blockers directly rather than just escalating them. Adapts the approach when evidence shows the plan is not working.",
    keyQuestion: "Am I reporting status, or driving outcomes?",
  },
  {
    id: "sustainment",
    phase: "Sustaining Change",
    pillar: "Sustainment",
    managerDoes: "Hands over to business as usual. Documents lessons learned. Closes the project.",
    leaderDoes: "Stays engaged until the change is embedded in behaviour, not just processes. Ensures reinforcement mechanisms are in place. Challenges whether the organisation is genuinely operating differently or has quietly reverted.",
    keyQuestion: "Am I closing the project, or anchoring the change?",
  },
];

const caseStudies = [
  {
    label: "Ford",
    headline: "How Alan Mulally led Ford back from the brink through leadership, not just management",
    hook: "Ford was losing $17 billion. The other two begged for bailouts. Mulally led differently.",
    dimension: "Change Leadership",
    body: [
      "When Alan Mulally became CEO of Ford in 2006, the company was anticipating losses of $17 billion. The American auto industry was in crisis, and both GM and Chrysler would eventually seek government bailouts. Ford did not.",
      "Mulally's approach was not to manage the crisis through cost-cutting alone. He led it through clarity, transparency, and relentless alignment. He introduced the 'One Ford' plan, a single unifying strategy that every employee could understand and connect to. He sold off brands, simplified the product line, and focused the entire organisation on one goal.",
      "His weekly Business Plan Review meetings became the centrepiece of a new leadership culture. Every leader reported progress honestly, using colour-coded charts. When one executive admitted a problem by showing a red chart for the first time, Mulally applauded him. That single moment changed the culture from one of concealment to one of transparency.",
      "Mulally did not just manage a turnaround plan. He led a cultural transformation that gave people permission to be honest, aligned everyone around a shared vision, and made leadership visible at every level.",
    ],
    lesson: "Mulally demonstrates what happens when a leader treats change as their personal responsibility, not a programme to be managed. He did not delegate the culture shift. He modelled it in every meeting, every decision, and every interaction.",
    source: "https://www.acertitude.com/insights/how-superstar-ceo-alan-mulally-brought-ford-back-from-the-brink",
    sourceLabel: "Acertitude",
  },
  {
    label: "Kodak",
    headline: "Kodak had the technology, the talent, and the time. It lacked change leadership.",
    hook: "They invented the digital camera in 1975. They filed for bankruptcy in 2012.",
    dimension: "Change Management Without Leadership",
    body: [
      "Kodak is often cited as a case of failing to innovate. The reality is more nuanced. Kodak invented the digital camera in 1975 and held significant digital patents. The technology existed. The talent existed. What was missing was the leadership to transform the organisation around it.",
      "Kodak's executives managed the transition from film to digital as an operational problem: how to protect existing revenue while gradually introducing new products. They ran the change through plans, budgets, and committees. What they did not do was lead the organisation through the emotional and strategic shift that digital required.",
      "Middle management was not supportive of new strategies. Executives feared cannibalising their core film business. The organisation managed its decline methodically while avoiding the leadership decisions that could have changed its trajectory. No one stood up and said: we are a digital company now, and everything changes.",
      "Kodak filed for bankruptcy in 2012, not because it lacked a plan, but because it lacked leaders willing to disrupt their own business model before someone else did.",
    ],
    lesson: "Kodak had change management: plans, timelines, and governance for the digital transition. What it lacked was change leadership: someone willing to challenge the status quo, make uncomfortable trade-offs, and lead the organisation into a future that threatened the present.",
    source: "https://cdotimes.com/2023/09/27/case-study-kodaks-downfall-a-lesson-in-failed-digital-transformation-and-missed-opportunities/",
    sourceLabel: "CDO Times",
  },
  {
    label: "Prosci Research",
    headline: "The data is clear: active sponsorship is the number one driver of change success",
    hook: "After 25 years of research, the same factor keeps coming out on top.",
    dimension: "Research Evidence",
    body: [
      "Prosci's Best Practices in Change Management research, spanning over two decades and thousands of organisations, consistently identifies active and visible executive sponsorship as the number one contributor to change success.",
      "The research shows that projects with effective sponsors are significantly more likely to meet objectives than those without. Yet nearly 50 percent of teams rate the effectiveness of their sponsor as poor to fair.",
      "The gap between what the research says matters most and what organisations actually do is one of the most persistent findings in the change management field. Organisations invest in methodologies, tools, and training, but underinvest in the one factor that research shows matters more than any of them.",
    ],
    lesson: "The evidence is unambiguous. Change leadership, particularly at the executive level, is the single most important factor in whether a transformation succeeds. Change management activities without leadership behind them produce activity, not adoption.",
    source: "https://www.prosci.com/blog/3-reasons-executives-fail-at-sponsorship",
    sourceLabel: "Prosci",
  },
];

export default function LeadingVsManaging() {
  const [answers, setAnswers] = useState<Record<number, "manager" | "leader">>({});
  const [showResult, setShowResult] = useState(false);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const totalAnswered = Object.keys(answers).length;
  const leaderCount = Object.values(answers).filter(a => a === "leader").length;
  const managerCount = Object.values(answers).filter(a => a === "manager").length;
  const allAnswered = totalAnswered === assessmentPairs.length;
  const leaderPercent = allAnswered ? Math.round((leaderCount / assessmentPairs.length) * 100) : 0;

  function getResultLabel() {
    if (leaderPercent >= 88) return { title: "Change Leader", desc: "You are leading change, not just managing it. You focus on outcomes, relationships, and judgement over plans, activities, and compliance. Keep going." };
    if (leaderPercent >= 63) return { title: "Leaning Towards Leadership", desc: "You show strong leadership instincts but default to management in some areas. Look at where you chose the left column. Those are your growth areas." };
    if (leaderPercent >= 38) return { title: "Balanced But At Risk", desc: "You are doing a mix of both. In practice, this often means the management tasks crowd out the leadership moments. Be deliberate about where you spend your time." };
    return { title: "Managing, Not Leading", desc: "You are focused on activities, deliverables, and compliance. This is valuable work, but it is not enough on its own to make change stick. The shift starts with the questions you ask and the outcomes you measure." };
  }

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Leadership Alignment</span>
          <h1 className="article-title">Are you actually leading change or just managing tasks through a change plan?</h1>
          <p className="article-intro">Change management and change leadership are not the same thing. One focuses on activities, deliverables, and plans. The other focuses on people, outcomes, and judgement. Most change professionals do a mix of both, but the balance determines whether the change is delivered or merely documented.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* SELF ASSESSMENT */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Where Do You Sit?</h2>
          <p className="article-section-desc">For each pair, choose the statement that sounds more like you in practice. Be honest. There is no right answer, but the pattern will tell you something useful.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="assessment-pairs">
            {assessmentPairs.map((pair, i) => (
              <div key={i} className="pair-row">
                <span className="pair-theme">{pair.theme}</span>
                <div className="pair-options">
                  <button
                    className={`pair-option pair-option-manager${answers[i] === "manager" ? " pair-selected" : ""}`}
                    onClick={() => setAnswers(prev => ({ ...prev, [i]: "manager" }))}
                  >
                    {pair.manager}
                  </button>
                  <span className="pair-vs">or</span>
                  <button
                    className={`pair-option pair-option-leader${answers[i] === "leader" ? " pair-selected" : ""}`}
                    onClick={() => setAnswers(prev => ({ ...prev, [i]: "leader" }))}
                  >
                    {pair.leader}
                  </button>
                </div>
              </div>
            ))}

            {allAnswered && !showResult && (
              <button className="btn" style={{ marginTop: "28px" }} onClick={() => setShowResult(true)}>
                See My Result
              </button>
            )}

            {showResult && (
              <div className="assessment-result">
                <div className="assessment-bar">
                  <div className="assessment-bar-manager" style={{ width: `${100 - leaderPercent}%` }}>
                    <span>Manager {managerCount}/{assessmentPairs.length}</span>
                  </div>
                  <div className="assessment-bar-leader" style={{ width: `${leaderPercent}%` }}>
                    <span>Leader {leaderCount}/{assessmentPairs.length}</span>
                  </div>
                </div>
                <h3 className="assessment-result-title">{getResultLabel().title}</h3>
                <p className="assessment-result-desc">{getResultLabel().desc}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* LEADERSHIP AT EACH PHASE */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">What Leadership Looks Like at Each Phase</h2>
          <p className="article-section-desc">The difference between managing and leading plays out differently depending on where you are in the change journey. Click any phase to see the contrast.</p>
        </ScrollReveal>

        <div className="phase-list">
          {phases.map((p, i) => (
            <ScrollReveal key={p.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activePhase === p.id ? " phase-card-active" : ""}`}
                onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              >
                <span className="phase-card-pillar">{p.pillar}</span>
                <span className="phase-card-name">{p.phase}</span>
                <span className="phase-card-question">{p.keyQuestion}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activePhase && (
          <ScrollReveal direction="up">
            {phases.filter(p => p.id === activePhase).map(p => (
              <div key={p.id} className="phase-detail">
                <div className="phase-compare">
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">The Change Manager</span>
                    <p className="phase-compare-text">{p.managerDoes}</p>
                  </div>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">The Change Leader</span>
                    <p className="phase-compare-text">{p.leaderDoes}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        )}
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
