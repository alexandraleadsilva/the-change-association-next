"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const levels = [
  {
    id: "absent",
    level: 1,
    name: "Absent",
    colour: "#8B2020",
    tagline: "Not visible. Not involved. Not aware.",
    description: "The sponsor has no meaningful presence in the change. They may have delegated sponsorship to someone without authority, or they may not realise they are the sponsor at all. The programme operates without executive cover, and when obstacles arise, there is no one with the power to remove them.",
    signs: [
      "The sponsor has not attended a single steering committee or programme update",
      "Teams do not know who the executive sponsor is",
      "Decisions that require executive authority are stalled or escalated into a void",
      "The change team is operating on its own, making promises it cannot keep",
    ],
    risks: "Without a visible sponsor, the change has no executive protection. It will be deprioritised the moment it competes with anything else. Middle managers will not commit resources, and frontline staff will read the absence as a signal that the change does not matter.",
    howToMove: [
      { text: "Make the cost of absence visible", detail: "Document the specific decisions that are stalled, the resources that are not being released, and the risks that are mounting because no one with authority is engaged. Present this as a business risk, not a change management complaint." },
      { text: "Request a single, time-bounded commitment", detail: "Do not ask for ongoing involvement immediately. Ask the sponsor to attend one meeting, make one decision, or send one communication. A single visible act of sponsorship can shift the dynamic." },
      { text: "Identify whether the wrong person has been named as sponsor", detail: "Sometimes the sponsor is absent because they were assigned the role without understanding what it requires. If the person does not have the authority, the interest, or the proximity to the change, the role needs to be reassigned." },
    ],
  },
  {
    id: "passive",
    level: 2,
    name: "Passive",
    colour: "#A0522D",
    tagline: "Approved it. Signed off. Moved on.",
    description: "The sponsor has formally approved the change and may have signed a business case or project charter. But approval was the end of their involvement, not the beginning. They believe their role is to authorise, not to lead. The change has a name on a document but not a leader in the room.",
    signs: [
      "The sponsor approved the business case but has not engaged since",
      "They refer questions about the change to the programme team, not to themselves",
      "Their name is on the governance structure but they send delegates to meetings",
      "When asked about the change, they can describe it in broad terms but not in specifics",
    ],
    risks: "A passive sponsor gives the change the appearance of support without the substance. When resistance emerges, middle managers will test whether the sponsor is genuinely behind the change by watching what they do, not what they signed. Passivity will be interpreted as indifference.",
    howToMove: [
      { text: "Show them what sponsorship looks like, specifically", detail: "Many executives are passive because they do not know what active sponsorship requires. Provide a clear, concise brief: here are the three things we need you to do this month, here is why they matter, and here is how long each will take." },
      { text: "Connect the change to something they already care about", detail: "Find the strategic priority that matters most to the sponsor and draw a direct line between it and the change. If they see the change as instrumental to their own goals, their involvement becomes self-interested rather than obligatory." },
      { text: "Create moments that require their presence", detail: "Design key milestones, communications, or decision points that cannot happen without the sponsor. Make their involvement structurally necessary rather than optional." },
    ],
  },
  {
    id: "informed",
    level: 3,
    name: "Informed",
    colour: "#B8860B",
    tagline: "Understands it. Can explain it. Does not act on it.",
    description: "The sponsor understands the change. They can articulate the vision, describe the rationale, and answer questions about it. But their involvement is intellectual, not behavioural. They know what needs to happen but are not doing anything differently themselves. They attend updates but do not intervene when the change hits obstacles.",
    signs: [
      "The sponsor can explain the change clearly when asked",
      "They attend steering committees and ask informed questions",
      "But they do not proactively communicate the change to their peers or the wider organisation",
      "When the change faces resistance or resource conflicts, they observe rather than intervene",
    ],
    risks: "An informed sponsor is the most deceptive level because it looks like engagement. The sponsor appears supportive. But information without action is not sponsorship. The organisation will eventually notice that the sponsor talks about the change but does not fight for it.",
    howToMove: [
      { text: "Ask them to do one visible thing, not just know one more thing", detail: "The gap between informed and active is behavioural, not intellectual. Ask the sponsor to send a personal communication, to raise the change in a leadership meeting they already attend, or to publicly commit a resource. One action is worth ten briefings." },
      { text: "Brief them on a specific blocker and ask them to remove it", detail: "Give the sponsor a concrete problem they can solve. Not a status update, but a specific obstacle: this team is not releasing people, this decision is stuck, this leader is actively undermining the change. Make it easy for them to act." },
      { text: "Show them the gap between their understanding and the organisation's understanding", detail: "The sponsor may assume the rest of the organisation is as informed as they are. Show them the reality: what frontline staff actually know, feel, and believe about the change. The gap between their understanding and the organisation's often motivates action." },
    ],
  },
  {
    id: "active",
    level: 4,
    name: "Active",
    colour: "#2E6B4F",
    tagline: "Visibly supports. Removes blockers. Communicates directly.",
    description: "The sponsor is actively involved in the change. They communicate about it directly, they intervene when obstacles arise, and they make decisions that demonstrate commitment. They are visible to the organisation as a leader of this change, not just an approver. The programme has executive momentum.",
    signs: [
      "The sponsor communicates about the change in their own words, not scripted talking points",
      "They raise the change in leadership forums without being prompted",
      "When resource conflicts arise, they make trade-offs in favour of the change",
      "Teams know who the sponsor is and have seen them engage directly",
    ],
    risks: "An active sponsor can still be fragile. If the change hits a major setback, an active sponsor may retreat to informed or passive. Active sponsorship needs to be sustained, and the change team needs to keep the sponsor engaged with the right information, the right asks, and the right recognition.",
    howToMove: [
      { text: "Help them see what committed looks like", detail: "The difference between active and committed is personal ownership. An active sponsor supports the change. A committed sponsor owns it. Share examples of what committed sponsorship looks like: making personal trade-offs, changing their own behaviour, holding peers accountable." },
      { text: "Create opportunities for them to lead, not just support", detail: "Move the sponsor from supporting the change team to leading the change directly. Ask them to chair a key workshop, deliver the vision to the organisation, or make a difficult decision publicly. These moments build commitment." },
      { text: "Ensure they receive direct feedback from the people being impacted", detail: "Active sponsors are engaged but may still be insulated from the real experience of change. Create structured opportunities for the sponsor to hear directly from frontline staff, not filtered through reports." },
    ],
  },
  {
    id: "committed",
    level: 5,
    name: "Committed",
    colour: "#0A1628",
    tagline: "Owns it. Makes trade-offs. Leads by example.",
    description: "The sponsor treats the change as their own. They do not just support it; they lead it. They make personal trade-offs to prioritise the change, they hold their peers accountable for their contributions, and they model the behaviours the change requires. When the organisation looks at this leader, they see someone who has genuinely changed, not just someone who approved a programme.",
    signs: [
      "The sponsor has changed their own behaviour to align with the change",
      "They hold their leadership peers accountable for supporting the change in their areas",
      "They make difficult resource and priority trade-offs to protect the change",
      "They speak about the change with personal conviction, not just strategic rationale",
      "The organisation sees them as the leader of this change, not just its sponsor",
    ],
    risks: "Even committed sponsors can burn out if the change drags on without visible progress. The change team's job at this level is to protect the sponsor's energy by delivering results, celebrating milestones, and ensuring the sponsor's investment is visibly paying off.",
    howToMove: [],
  },
];

const diagnosticQuestions = [
  { text: "Can the people affected by this change name the executive sponsor?", yes: 2, no: 0 },
  { text: "Has the sponsor communicated about the change in their own words?", yes: 2, no: 0 },
  { text: "Has the sponsor made a visible trade-off or decision to prioritise this change?", yes: 3, no: 0 },
  { text: "Does the sponsor intervene when the change hits blockers?", yes: 2, no: 0 },
  { text: "Has the sponsor changed their own behaviour to model what the change requires?", yes: 3, no: 0 },
  { text: "Does the sponsor hold their leadership peers accountable for supporting the change?", yes: 3, no: 0 },
];

function getLevelFromScore(score: number): string {
  if (score <= 2) return "absent";
  if (score <= 5) return "passive";
  if (score <= 8) return "informed";
  if (score <= 12) return "active";
  return "committed";
}

interface MoveItem {
  text: string;
  detail: string;
}

function ExpandableMoves({ items }: { items: MoveItem[] }) {
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

export default function ExecutiveSponsorship() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<number, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const diagnosticScore = Object.entries(diagnosticAnswers).reduce((sum, [idx, ans]) => {
    if (ans === null || ans === undefined) return sum;
    return sum + (ans ? diagnosticQuestions[Number(idx)].yes : diagnosticQuestions[Number(idx)].no);
  }, 0);

  const diagnosedLevel = getLevelFromScore(diagnosticScore);
  const allAnswered = Object.keys(diagnosticAnswers).length === diagnosticQuestions.length && !Object.values(diagnosticAnswers).includes(null);

  const caseStudies = [
    {
      label: "Microsoft",
      headline: "How Satya Nadella turned committed sponsorship into a $3 trillion transformation",
      hook: "He did not just approve the culture change. He changed himself first.",
      dimension: "Committed Sponsorship",
      body: [
        "When Satya Nadella became CEO of Microsoft in 2014, he inherited a culture defined by internal competition, fixed mindsets, and stack ranking. The company's market capitalisation was around $300 billion and its relevance was fading.",
        "Nadella did not delegate the culture change to HR. He owned it personally. He replaced the 'know-it-all' culture with a 'learn-it-all' growth mindset, inspired by Carol Dweck's research. He eliminated stack ranking and replaced it with systems that rewarded collaboration and learning. He partnered directly with CHRO Kathleen Hogan to redesign how 130,000 employees were evaluated, developed, and recognised.",
        "Critically, Nadella modelled the change himself. He led with curiosity and humility, publicly acknowledged mistakes, and consistently demonstrated the behaviours he was asking the organisation to adopt. By 2025, Microsoft's market capitalisation exceeded $3 trillion.",
      ],
      lesson: "Nadella did not just sponsor the transformation. He embodied it. The difference between active and committed sponsorship is whether the leader changes their own behaviour. Nadella changed his, and the organisation followed.",
      source: "https://fortune.com/2024/05/20/satya-nadella-microsoft-culture-growth-mindset-learn-it-alls-know-it-alls/",
      sourceLabel: "Fortune",
    },
    {
      label: "HP-Compaq",
      headline: "The $25 billion merger where the sponsor fought for approval but not for integration",
      hook: "She won the proxy fight. Then treated sponsorship as done.",
      dimension: "Passive Sponsorship",
      body: [
        "In 2002, HP CEO Carly Fiorina pushed through the acquisition of Compaq for $25 billion against significant board opposition. She fought a public proxy battle and won with a razor-thin 51.4% shareholder vote.",
        "But winning approval was treated as the finish line, not the starting line. After the merger was approved, Fiorina and the senior team focused on operational integration, the logistics of combining two companies. The strategic integration, how the combined company would compete differently, received far less attention.",
        "The sponsorship that had been so visible during the proxy fight became passive once the deal closed. HP lost half its market value during Fiorina's tenure, and she was forced to resign in 2005. Notably, under her successor Mark Hurd, the merger was ultimately judged to have been a sound strategic decision, proving that the concept was right but the sponsorship of its execution was inadequate.",
      ],
      lesson: "Fiorina demonstrated that fighting for approval is not the same as sponsoring execution. The gap between level 2 (Passive) and level 4 (Active) is the gap between winning permission and leading delivery. The merger needed a sponsor who would stay in the room long after the vote.",
      source: "https://knowledge.wharton.upenn.edu/podcast/knowledge-at-wharton-podcast/hp-after-carly-what-went-wrong/",
      sourceLabel: "Wharton",
    },
    {
      label: "GE Digital",
      headline: "A CEO who sponsored the vision but not the organisational change it required",
      hook: "Jeff Immelt championed digital transformation publicly. Inside GE, nothing changed.",
      dimension: "Informed Sponsorship",
      body: [
        "Under CEO Jeff Immelt, GE invested billions from 2011 onwards to become a 'digital industrial company'. Immelt was vocal about the vision, spoke at conferences, and positioned GE as a technology leader. He understood the change intellectually and could articulate it compellingly.",
        "But the sponsorship was informed, not active. Inside GE, the traditional culture of short-term financial targets and operational efficiency remained unchanged. Managers who attended innovation training at Crotonville returned to divisions still rewarded for legacy metrics. When the digital initiative conflicted with existing business priorities, there was no executive intervention to resolve the tension.",
        "Immelt talked about digital transformation but did not change the incentive structures, decision-making processes, or leadership behaviours that would have made it real. GE Digital accumulated billions in losses before being sold off. Immelt retired in 2017.",
      ],
      lesson: "Immelt could explain the change perfectly. He could not, or would not, act on it by changing the systems and behaviours inside GE that contradicted it. This is the hallmark of level 3 (Informed) sponsorship: understanding without action.",
      source: "https://www.cnbc.com/2019/10/30/heres-why-ge-fords-digital-transformation-programs-failed-last-year.html",
      sourceLabel: "CNBC",
    },
  ];

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Leadership Alignment</span>
          <h1 className="article-title">How to get executives on board when they say yes but act no</h1>
          <p className="article-intro">The most cited driver of change success is executive sponsorship. It is also the most frequently misunderstood. There is a significant difference between an executive who approves a change and one who actively leads it. Most sponsors sit somewhere in between, and knowing exactly where they are is the first step to closing the gap.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* THE STAIRCASE */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Five Levels of Executive Sponsorship</h2>
          <p className="article-section-desc">Sponsorship is not binary. It exists on a spectrum. Most sponsors are not absent, they are somewhere in the middle, doing some things but not enough. Click any level to understand what it looks like, the risks it carries, and how to move a sponsor up.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="staircase">
            {[...levels].reverse().map((l, i) => (
              <button
                key={l.id}
                className={`stair${activeLevel === l.id ? " stair-active" : ""}${showResult && diagnosedLevel === l.id ? " stair-diagnosed" : ""}`}
                style={{
                  "--stair-colour": l.colour,
                  "--stair-index": i,
                  marginLeft: `${(4 - i) * 48}px`,
                } as React.CSSProperties}
                onClick={() => setActiveLevel(activeLevel === l.id ? null : l.id)}
              >
                <span className="stair-level">Level {l.level}</span>
                <span className="stair-name">{l.name}</span>
                <span className="stair-tagline">{l.tagline}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* EXPANDED LEVEL DETAIL */}
      {activeLevel && (
        <section className="article-section dimension-detail">
          {levels.filter(l => l.id === activeLevel).map(l => (
            <div key={l.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg" style={{ color: l.colour }}>Level {l.level}</span>
                  <h2 className="detail-title">{l.name}</h2>
                </div>
                <p className="detail-body">{l.description}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">How to Recognise This Level</h3>
                  <ul className="detail-list">
                    {l.signs.map((s, i) => (
                      <li key={i} className="detail-list-item"><div className="detail-list-item-head">{s}</div></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">The Risk at This Level</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{l.risks}</p>
                </div>
              </ScrollReveal>

              {l.howToMove.length > 0 && (
                <ScrollReveal direction="up" delay={300}>
                  <div className="detail-block" style={{ borderLeft: "3px solid var(--navy)" }}>
                    <h3 className="detail-block-title">How to Move Your Sponsor Up</h3>
                    <ExpandableMoves items={l.howToMove} />
                  </div>
                </ScrollReveal>
              )}
            </div>
          ))}
        </section>
      )}

      {/* DIAGNOSTIC */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Where Is Your Sponsor Right Now?</h2>
          <p className="article-section-desc">Answer these six questions honestly. The result will tell you which level your sponsor is operating at and what to focus on next.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="self-check">
            {diagnosticQuestions.map((q, i) => (
              <div key={i} className="diagnostic-question">
                <p className="diagnostic-text">{q.text}</p>
                <div className="diagnostic-buttons">
                  <button
                    className={`diagnostic-btn${diagnosticAnswers[i] === true ? " diagnostic-btn-yes" : ""}`}
                    onClick={() => setDiagnosticAnswers(prev => ({ ...prev, [i]: true }))}
                  >Yes</button>
                  <button
                    className={`diagnostic-btn${diagnosticAnswers[i] === false ? " diagnostic-btn-no" : ""}`}
                    onClick={() => setDiagnosticAnswers(prev => ({ ...prev, [i]: false }))}
                  >No</button>
                </div>
              </div>
            ))}

            {allAnswered && !showResult && (
              <button className="btn" style={{ marginTop: "24px" }} onClick={() => setShowResult(true)}>
                See Result
              </button>
            )}

            {showResult && (
              <div className="diagnostic-result">
                <div className="check-bar">
                  <div className="check-bar-fill" style={{ width: `${(diagnosticScore / 15) * 100}%` }}></div>
                </div>
                <p className="diagnostic-result-text">
                  Your sponsor is currently at <strong>Level {levels.find(l => l.id === diagnosedLevel)?.level}: {levels.find(l => l.id === diagnosedLevel)?.name}</strong>
                </p>
                <p className="diagnostic-result-desc">{levels.find(l => l.id === diagnosedLevel)?.tagline}</p>
                <button
                  className="btn-outline"
                  style={{ marginTop: "16px" }}
                  onClick={() => setActiveLevel(diagnosedLevel)}
                >
                  See what to do next &rarr;
                </button>
              </div>
            )}
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
