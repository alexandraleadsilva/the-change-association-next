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

const playbook = [
  {
    id: "direction",
    pillar: "Direction",
    num: "01",
    focus: "Setting the conditions for change",
    what: "During Direction, the sponsor's role is to ensure the change has a clear diagnosis, a compelling narrative, and genuine leadership alignment. This is not about approving a business case. It is about personally owning the answer to: why are we doing this, and what does success look like?",
    actions: [
      { text: "Personally articulate the case for change in your own words", detail: "Do not delegate this to the change team or read from a script. The organisation needs to hear from you, in language that reflects your genuine conviction. If you cannot explain why this change matters without slides, you are not ready to sponsor it." },
      { text: "Ensure your leadership peers are genuinely aligned, not just agreeing", detail: "Test alignment privately. Ask each member of your leadership team to describe the future state independently. If their answers differ significantly, alignment does not exist yet. Your job is to resolve these differences before the change goes wider." },
      { text: "Define what success looks like before delivery begins", detail: "Commit publicly to specific outcomes. Not activity metrics like training completion or communication reach, but behaviour and business outcomes. This gives the organisation a standard to hold you, and the change, accountable to." },
      { text: "Identify what needs to stop to make room for this change", detail: "Every change consumes attention and resources. If you do not deprioritise something to make room, the organisation will try to absorb the change on top of everything else. Name what is being paused or stopped. This signals that you take the change seriously enough to create space for it." },
    ] as ActionItem[],
  },
  {
    id: "engagement",
    pillar: "Engagement",
    num: "02",
    focus: "Winning hearts and minds",
    what: "During Engagement, the sponsor's role shifts from setting direction to building belief. This means communicating directly, listening genuinely, and being visible to the people who will be most affected. The sponsor must demonstrate that this change is not just a leadership priority but a personal commitment.",
    actions: [
      { text: "Communicate the change directly to impacted teams, not through cascaded messages", detail: "Cascaded communication loses context and conviction at every level. At critical moments, the sponsor needs to be in the room, whether physical or virtual, speaking to people directly. This does not mean every message, but it means the ones that matter most." },
      { text: "Hold listening sessions where your role is to hear, not to present", detail: "Invert the usual dynamic. Put yourself in a room with people affected by the change and ask: what are you worried about? What do you need to know? What would make this easier? Then listen. Do not defend the change. Just take in what you hear and act on it." },
      { text: "Publicly acknowledge what is being lost, not just what is being gained", detail: "Change always involves loss. Old ways of working, familiar tools, established relationships, or a sense of competence that people have built over years. If the sponsor only talks about the future, people feel unheard. Acknowledge what they are giving up." },
      { text: "Intervene directly when stakeholder resistance signals a real problem", detail: "Not all resistance is irrational. Some of it is the organisation telling you something important. When a senior leader or a critical team is resisting, do not leave it to the change team. Engage personally. Understand what is driving it and decide whether to push through, adapt, or pause." },
    ] as ActionItem[],
  },
  {
    id: "enablement",
    pillar: "Enablement",
    num: "03",
    focus: "Equipping people to change",
    what: "During Enablement, the sponsor ensures people have what they need to work differently. This goes beyond approving a training budget. It means challenging whether the enablement plan is deep enough, whether managers are equipped to support their teams, and whether the organisation is building capability or just scheduling courses.",
    actions: [
      { text: "Challenge whether the enablement plan addresses confidence, not just knowledge", detail: "Ask the change team: after people complete the training, will they be confident enough to do this differently on a Monday morning? If the answer is uncertain, the enablement plan is not complete. Push for practice, coaching, and ongoing support, not just content delivery." },
      { text: "Ensure managers are specifically equipped to support their teams", detail: "Managers are the most important enablement layer. If they do not understand the change well enough to explain it, answer questions, and support their teams through uncertainty, the change will stall at the middle of the organisation. Ask what the plan is for managers specifically." },
      { text: "Protect the time and capacity people need to learn", detail: "If people are expected to learn new ways of working while maintaining their current workload at 100%, the learning will not happen. The sponsor's role is to create space: reduce competing demands, adjust deadlines, or formally allocate time for transition." },
      { text: "Test readiness yourself by talking to frontline staff", detail: "Do not rely on readiness dashboards. Go and talk to two or three people who will be directly affected. Ask them: do you know what is changing for you? Do you feel prepared? What support would help? Their answers are your most honest readiness assessment." },
    ] as ActionItem[],
  },
  {
    id: "execution",
    pillar: "Execution",
    num: "04",
    focus: "Making change happen",
    what: "During Execution, the sponsor's role is to maintain momentum, remove blockers, and make difficult decisions when the plan meets reality. This is the phase where many sponsors retreat into governance and status updates. The best sponsors stay close to the work and stay decisive.",
    actions: [
      { text: "Remove blockers directly rather than asking the change team to escalate them", detail: "When a resource conflict, a political barrier, or a decision bottleneck is slowing the change, do not wait for it to appear on a RAID log. Act on it directly. Call the person, send the email, make the decision. Speed of resolution signals commitment." },
      { text: "Make trade-offs visibly when priorities compete", detail: "The most powerful thing a sponsor can do during execution is choose. When this change conflicts with another priority, which one wins? Make that decision publicly. If you try to do both without choosing, neither will succeed fully." },
      { text: "Celebrate early progress to build momentum", detail: "Change is hard and people need to see that their effort is producing results. When a team hits a milestone, when adoption shows early signs of working, when someone does something differently for the first time, the sponsor should recognise it visibly. This is not cheerleading. It is reinforcement." },
      { text: "Attend key delivery moments in person, not just governance meetings", detail: "Show up at a go-live, a pilot launch, or a training session. Your presence at the moments that matter to frontline staff sends a signal that no steering committee attendance can match." },
    ] as ActionItem[],
  },
  {
    id: "sustainment",
    pillar: "Sustainment",
    num: "05",
    focus: "Making change stick",
    what: "During Sustainment, the sponsor's role is to prevent the organisation from quietly reverting to old ways. This means staying engaged after the program closes, ensuring reinforcement mechanisms are in place, and holding the leadership team accountable for maintaining the change.",
    actions: [
      { text: "Stay visibly engaged after the program formally ends", detail: "Most sponsors disengage when the project closes. But the change is not complete when the program ends. It is complete when the new way of working is normal. Continue to reference the change in leadership meetings, ask about adoption data, and hold people accountable for outcomes." },
      { text: "Ensure performance management reflects the new way of working", detail: "If the organisation changed how it works but the KPIs, promotion criteria, and performance conversations did not change, people will eventually revert. The sponsor must ensure the measurement and reward systems are aligned with the change, not with the old model." },
      { text: "Hold your leadership peers accountable for sustaining the change in their areas", detail: "Sustainment is not the change team's job. It is a leadership responsibility. The sponsor must hold their peers accountable for whether the change is being maintained in each division, function, and region. If it is reverting somewhere, the sponsor needs to intervene." },
      { text: "Commission a review at six and twelve months focused on behaviour, not just process", detail: "A post-implementation review that only asks whether the system is live or the process is documented will miss the point. Ask whether people are actually working differently. The sponsor should ensure the review measures behaviour change and cultural embedding, not just technical completion." },
    ] as ActionItem[],
  },
];

function ExpandableActions({ items }: { items: ActionItem[] }) {
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

export default function BuildingSponsorship() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "articulate", label: "The sponsor can articulate the case for change in their own words without slides" },
    { key: "aligned", label: "Leadership peers have been individually tested for alignment, not just asked in a group" },
    { key: "success", label: "Success has been defined in terms of behaviour and outcomes, not just activities" },
    { key: "space", label: "Something has been deprioritised to create space for this change" },
    { key: "direct", label: "The sponsor has communicated directly with impacted teams at least once" },
    { key: "listened", label: "The sponsor has held a listening session and acted on what they heard" },
    { key: "managers", label: "Managers have been specifically equipped to support their teams through this change" },
    { key: "blockers", label: "The sponsor has personally removed at least one blocker during delivery" },
    { key: "tradeoff", label: "The sponsor has made a visible trade-off when this change competed with another priority" },
    { key: "post", label: "There is a plan to review behaviour change at six and twelve months, not just project completion" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const caseStudies = [
    {
      label: "Microsoft",
      headline: "Nadella's sponsorship playbook: the specific actions that transformed Microsoft",
      hook: "He asked executives to read a book on empathy. Then he changed how every meeting was run.",
      dimension: "Full Lifecycle Sponsorship",
      body: [
        "When Satya Nadella became CEO in 2014, his first act of sponsorship was personal and symbolic. He asked every senior executive to read Marshall Rosenberg's 'Nonviolent Communication'. He never raised his voice in meetings. He refused to tolerate anger or aggressive behaviour in executive sessions. These were not management decisions. They were leadership signals.",
        "During Direction, Nadella personally defined the cultural shift: from 'know-it-all' to 'learn-it-all'. He did not delegate this narrative to HR or communications. He articulated it repeatedly, in his own words, until it became the language of the organisation.",
        "During Engagement, he went on a listening tour across the company, meeting managers at every level and implementing changes based on what he heard, including eliminating the hated stack ranking system. He did not just listen. He acted on what he heard, visibly.",
        "During Enablement, he partnered directly with CHRO Kathleen Hogan to redesign performance systems, leadership development, and team structures. Posters in conference rooms asked: 'Is this a fixed mindset meeting or a growth mindset meeting?'",
        "During Execution, he changed the weekly senior leadership meetings from competitive gladiatorial sessions into collaborative problem-solving forums. Microsoft researchers would call in to share innovations, reminding leaders to focus forward.",
        "During Sustainment, the growth mindset was embedded into performance reviews, promotion criteria, and hiring practices. By 2025, Microsoft's market capitalisation had grown from $300 billion to over $3 trillion.",
      ],
      lesson: "Nadella demonstrated sponsorship at every phase of the TCA model. He set direction personally, engaged by listening, enabled through systems change, executed by modelling new behaviours, and sustained by embedding the change into how the organisation measured and rewarded performance.",
      source: "https://fortune.com/2024/09/30/microsoft-ceo-satya-nadella-leadership-success-humility-culture-change/",
      sourceLabel: "Fortune",
    },
    {
      label: "Unilever",
      headline: "Paul Polman abolished quarterly earnings to sponsor a decade-long transformation",
      hook: "His first act as CEO was to remove the metric that would have killed his own change program.",
      dimension: "Direction Sponsorship",
      body: [
        "When Paul Polman became Unilever CEO in 2009, the company was losing market share and operating without a compelling strategic narrative. His response was to launch the Unilever Sustainable Living Plan, one of the most ambitious corporate transformations in modern history.",
        "His most significant act of sponsorship came on day one: he abolished quarterly earnings guidance. Shares dropped 8% immediately. But the decision removed the structural incentive that would have undermined every long-term decision the transformation required. By removing the metric, he created space for the change.",
        "Polman did not sponsor from a distance. He personally engaged with governments, NGOs, suppliers, and employees to co-create the strategy. He made sustainability a core business strategy rather than a CSR initiative, embedding it into KPIs, performance conversations, and reward systems at every level.",
        "Under his sponsorship, Unilever's share price returned 290% to shareholders. The company consistently ranked first globally for sustainability and became one of the most sought-after employers in consumer goods.",
      ],
      lesson: "Polman demonstrated that genuine sponsorship sometimes means removing the systems that would prevent the change from succeeding. His decision to abolish quarterly guidance was not popular, but it was the sponsorship action that made everything else possible.",
      source: "https://hbr.org/2021/11/former-unilever-ceo-paul-polman-says-aiming-for-sustainability-isnt-good-enough-the-goal-is-much-higher",
      sourceLabel: "Harvard Business Review",
    },
    {
      label: "Ford",
      headline: "Mulally's red chart moment: how one sponsorship action changed an entire culture",
      hook: "A single act of applause in a meeting told 200,000 people it was safe to be honest.",
      dimension: "Engagement Sponsorship",
      body: [
        "When Alan Mulally introduced weekly Business Plan Review meetings at Ford, every executive was expected to report progress using colour-coded charts: green for on track, yellow for caution, red for problems. For weeks, every chart was green, despite Ford losing $17 billion.",
        "Finally, one executive, Mark Fields, showed a red chart for a production problem with the Ford Edge. The room went silent. Everyone expected Mulally to react with anger or blame. Instead, he clapped. He thanked Fields for the honesty. Then he asked the room: who can help with this?",
        "That single moment fundamentally changed the culture of Ford's leadership team. Within weeks, the charts were full of yellows and reds. Problems were surfacing. Solutions were being found collaboratively. The culture shifted from concealment to transparency, not because of a policy or a program, but because the sponsor responded to honesty with recognition.",
        "Ford went from $17 billion in losses to profitability within three years. It was the only one of the 'big three' American automakers that did not request a government bailout.",
      ],
      lesson: "Mulally understood that sponsorship is not just about what you say. It is about how you respond when someone takes a risk. By applauding the first red chart, he sponsored a culture of transparency through a single visible action that the entire organisation could reference.",
      source: "https://www.kornferry.com/insights/briefings-magazine/issue-20/alan-mulally-man-who-saved-ford",
      sourceLabel: "Korn Ferry",
    },
  ];

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Leadership Alignment</span>
          <h1 className="article-title">What does genuine executive sponsorship look like in practice, and how do you build it?</h1>
          <p className="article-intro">Everyone agrees that executive sponsorship matters. The research is unambiguous. Active and visible sponsorship is the single greatest contributor to change success. But knowing it matters and knowing what it looks like in practice are different things. This is a practical playbook for what genuine sponsors do at each phase of the change journey.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* SPONSOR PLAYBOOK */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Sponsor Playbook</h2>
          <p className="article-section-desc">Genuine sponsorship is not a single act. It evolves as the change progresses through each phase. Click any phase to see exactly what the sponsor should be doing, saying, and deciding.</p>
        </ScrollReveal>

        <div className="phase-list">
          {playbook.map((p, i) => (
            <ScrollReveal key={p.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activePhase === p.id ? " phase-card-active" : ""}`}
                onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              >
                <span className="phase-card-pillar">{p.num} &middot; {p.pillar}</span>
                <span className="phase-card-name">{p.focus}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activePhase && (
          <section className="dimension-detail" style={{ marginTop: "4px" }}>
            {playbook.filter(p => p.id === activePhase).map(p => (
              <div key={p.id}>
                <ScrollReveal direction="up">
                  <div className="detail-header">
                    <span className="dimension-num-lg">{p.num}</span>
                    <h2 className="detail-title">{p.pillar}</h2>
                  </div>
                  <p className="detail-body">{p.what}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">What the Sponsor Should Do</h3>
                    <ExpandableActions items={p.actions} />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </section>
        )}
      </section>

      {/* READINESS CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Sponsor Readiness Checklist</h2>
          <p className="article-section-desc">Use this to assess whether your sponsor is doing what genuine sponsorship requires. Share the results with your sponsor as a conversation starter, not a report card.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="self-check">
            {checkItems.map((item) => (
              <label key={item.key} className="check-item">
                <input
                  type="checkbox"
                  checked={!!checklist[item.key]}
                  onChange={() =>
                    setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                  }
                />
                <span className="check-box"></span>
                <span className="check-label">{item.label}</span>
              </label>
            ))}

            <div className="check-result">
              <div className="check-bar">
                <div
                  className="check-bar-fill"
                  style={{ width: `${(checkedCount / checkItems.length) * 100}%` }}
                ></div>
              </div>
              <p className="check-score">
                {checkedCount} of {checkItems.length} complete
                {checkedCount === checkItems.length && (
                  <span className="check-complete"> &mdash; Your sponsor is demonstrating genuine sponsorship.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Focus on the gaps.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Some sponsorship in place but significant gaps remain.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Sponsorship is at risk. Prioritise a direct conversation with your sponsor.</span>
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
