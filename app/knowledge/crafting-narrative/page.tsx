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

const narrativeLayers = [
  {
    id: "strategic",
    num: "01",
    name: "The Strategic Layer",
    audience: "Senior Leadership",
    question: "Why does this matter for the organisation?",
    description: "This is the boardroom version. It connects the change to business strategy, competitive positioning, and long-term viability. It speaks in the language of value, risk, and opportunity. Most change narratives stop here.",
    example: "We are consolidating three regional operating models into one global platform to reduce duplication, accelerate decision-making, and position ourselves to enter new markets within 18 months.",
    pitfall: "If this is the only layer of your narrative, it will land with senior leaders and no one else. Frontline staff do not think in terms of operating models and market positioning. They think in terms of what happens to their job on Monday.",
    guidance: [
      { text: "Ground the strategic narrative in a diagnosis that leaders have validated", detail: "A strategic narrative built on assumptions rather than evidence will be challenged. Ensure the case for change is grounded in data that leaders have seen, tested, and agreed on. The narrative is only as strong as the diagnosis behind it." },
      { text: "Use the strategy to define scope, not to inspire people", detail: "The strategic layer defines what is changing and why. It is not designed to motivate frontline staff. Its job is to give senior leaders a shared framework for decision-making. Inspiration comes from the layers below." },
    ] as ActionItem[],
  },
  {
    id: "organisational",
    num: "02",
    name: "The Organisational Layer",
    audience: "Middle Management",
    question: "What does this mean for my team?",
    description: "This is the translation layer. It takes the strategic rationale and converts it into operational implications. Managers need to understand not just the vision but what it means for their function, their team, and their priorities. This is the layer most often skipped entirely.",
    example: "For the operations team, this means moving from regional process ownership to a shared service model. Your team will shift from executing processes locally to designing and governing them globally. Some roles will change. New skills will be needed. We will support you through that transition.",
    pitfall: "If managers cannot translate the narrative for their teams, they will either repeat the strategic version (which does not resonate) or say nothing (which creates a vacuum that anxiety fills). Equipping managers with their own version of the narrative is not optional.",
    guidance: [
      { text: "Brief managers before the wider organisation, not at the same time", detail: "Managers need time to process the change themselves before being asked to support their teams through it. If they hear the narrative at the same time as everyone else, they are unable to answer questions, and their credibility suffers." },
      { text: "Give managers a narrative they can adapt, not a script they must follow", detail: "Managers know their teams better than the change programme does. Give them the key messages and the boundaries, then let them deliver the narrative in a way that makes sense for their people. Scripts feel inauthentic. Guided flexibility feels genuine." },
      { text: "Include what you know and what you do not know yet", detail: "Managers will be asked questions they cannot answer. If the narrative pretends everything is certain, managers are left exposed. Include honest statements about what is still being worked out. This builds credibility rather than undermining it." },
    ] as ActionItem[],
  },
  {
    id: "personal",
    num: "03",
    name: "The Personal Layer",
    audience: "Frontline Staff",
    question: "What does this mean for me?",
    description: "This is where the narrative becomes real. It answers the questions that every person affected by the change is silently asking: will my job change? Will I still be good at what I do? Will I have the support I need? Does anyone understand what this feels like from where I sit?",
    example: "Your role will shift from processing regional orders manually to managing exceptions in the new global system. The routine work will be automated. Your expertise in resolving complex cases is exactly what we need in the new model. We will provide training over the next eight weeks, and your manager will be your first point of support.",
    pitfall: "If the narrative never reaches this level of specificity, people will fill the gap themselves, usually with worst-case assumptions. Silence at the personal level is not neutral. It is anxiety-producing.",
    guidance: [
      { text: "Answer the three questions everyone is asking: what changes, what stays, and will I be okay?", detail: "Every person going through change needs answers to these three questions. What specifically changes about my role, my team, or my daily work? What stays the same? And will I be supported through the transition? A narrative that addresses all three builds trust. One that avoids any of them creates fear." },
      { text: "Acknowledge the emotional reality, not just the operational one", detail: "People are not just processing information. They are processing feelings: uncertainty, loss, excitement, anxiety. A narrative that only addresses the practical changes misses the human experience. Acknowledge that this is difficult, that it is okay to feel uncertain, and that support is available." },
      { text: "Make the narrative specific to roles, not generic to the organisation", detail: "A single narrative that speaks to the entire organisation will feel generic to everyone. The personal layer needs to be tailored: what this means for the finance team is different from what it means for operations. The more specific the narrative, the more people feel seen." },
    ] as ActionItem[],
  },
  {
    id: "identity",
    num: "04",
    name: "The Identity Layer",
    audience: "Everyone",
    question: "Who are we becoming?",
    description: "This is the deepest layer. It goes beyond what is changing to who the organisation is becoming. It connects the change to a sense of shared purpose and identity. When people see themselves in the narrative, they do not need to be pushed. They move because the narrative describes who they want to be.",
    example: "We are becoming an organisation that trusts its people to make decisions closer to the customer. We are moving from a culture of approval to a culture of empowerment. This is not just a structural change. It is a statement about the kind of company we believe we should be.",
    pitfall: "The identity layer cannot be manufactured. If the organisation's actions contradict the narrative, people will see through it instantly. This layer only works when leadership behaviour, systems, and decisions are consistent with the story being told.",
    guidance: [
      { text: "Connect the change to something people already believe in", detail: "The most powerful narratives do not ask people to adopt a new identity. They remind them of an identity they already hold but the organisation has not lived up to. If the change reconnects the organisation to its best self, people will rally to it." },
      { text: "Let the narrative evolve through the voices of the people living it", detail: "The identity layer is not just top-down. As the change progresses, the narrative should be shaped by the stories people tell about their own experience. When frontline staff start describing the change in their own words, the narrative has become real." },
      { text: "Model the identity before you announce it", detail: "If the narrative says the organisation is becoming more collaborative but leaders still make decisions in isolation, the identity layer collapses. Leadership must embody the identity before asking the organisation to adopt it." },
    ] as ActionItem[],
  },
];

function ExpandableGuidance({ items }: { items: ActionItem[] }) {
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
    label: "Starbucks",
    headline: "Howard Schultz built a narrative from his childhood that 380,000 people could see themselves in",
    hook: "He grew up watching his father suffer without healthcare. Then he built a company where baristas get stock options.",
    dimension: "Identity Narrative",
    body: [
      "Howard Schultz's change narrative at Starbucks was not a strategy document. It was a personal story. He grew up in a working-class family in Brooklyn. His father was a labourer who suffered a workplace injury and had no healthcare, no safety net, and no dignity from his employer. That experience shaped everything Schultz built.",
      "When Starbucks turned its first profit in 1990, Schultz did something that made no financial sense: he extended health benefits to part-time workers and gave stock options to every employee. He called them 'partners', not employees, and backed it up with tuition-free college degrees, veterans hiring programmes, and genuine ownership through equity.",
      "The narrative was not 'we are a coffee company implementing a benefits programme'. It was 'we are building the kind of company my father never got to work for'. Every partner, from barista to regional manager, could connect to that story because it was about dignity, respect, and being valued as a person, not just a worker.",
      "When Starbucks faced a crisis in 2008, Schultz returned as CEO and closed 7,000 stores for a day to retrain every barista. The narrative was the same: this is about who we are, not what we sell. The identity was the anchor that made every change decision coherent.",
    ],
    lesson: "Schultz demonstrates that the most powerful change narratives are personal, not strategic. When a leader connects the change to a story that people can see themselves in, the narrative becomes an identity that the entire organisation wants to live up to.",
    source: "https://oxfordexecutive.co.uk/case-study-howard-schultz-starbucks-how-schultz-used-storytelling-to-revive-starbucks-culture/",
    sourceLabel: "Oxford Executive Institute",
  },
  {
    label: "Microsoft",
    headline: "Nadella translated 'cloud-first' into 'learn-it-all' and gave 130,000 people a personal reason to change",
    hook: "The strategy was about technology. The narrative was about mindset. That is why it worked.",
    dimension: "Narrative Cascade",
    body: [
      "Microsoft's strategic narrative under Satya Nadella was 'cloud-first, mobile-first'. That was the strategic layer: a repositioning from packaged software to cloud services. It made sense in a boardroom.",
      "But Nadella understood that a cloud strategy would not inspire 130,000 employees to change how they worked. So he translated it. The organisational layer became 'growth mindset': a shift from 'know-it-all' to 'learn-it-all'. This gave every team and every manager a framework for understanding what the change meant for them.",
      "At the personal layer, growth mindset meant that failure was no longer punished. Curiosity was valued over certainty. Performance reviews shifted from competitive ranking to collaborative contribution. Every employee could see what was different about their daily experience.",
      "At the identity layer, Nadella reframed Microsoft's purpose: from 'a Windows company' to 'a company that empowers every person and every organisation on the planet to achieve more'. Employees were not just building software. They were enabling human potential. That is a story people want to be part of.",
    ],
    lesson: "Nadella demonstrates the full narrative cascade: strategic rationale translated into organisational framework, personal implications, and shared identity. Each layer used different language for a different audience while telling the same story.",
    source: "https://fortune.com/2024/05/20/satya-nadella-microsoft-culture-growth-mindset-learn-it-alls-know-it-alls/",
    sourceLabel: "Fortune",
  },
  {
    label: "Gallup Research",
    headline: "Only 30% of employees believe in their company's change narrative. The rest are guessing.",
    hook: "If people cannot describe the change in their own words, the narrative has not landed.",
    dimension: "Research Evidence",
    body: [
      "Gallup research on organisational change found that only about 30% of employees strongly agree that their leadership communicates effectively during change. The majority are left to interpret the change through incomplete information, rumour, and assumption.",
      "The research found that effective change narratives share three characteristics. First, they create a shared understanding of the past: why the current state exists and what led to this moment. Second, they explain the change planned today in terms that connect to the audience's experience. Third, they project a future that people can see themselves in.",
      "Critically, the research showed that the most engaged employees during change were those who could describe the change in their own words, not the company's words. This is the test of a narrative that has truly cascaded: when people at every level can articulate the story using their own language, the narrative has moved from communication to understanding.",
      "The implication is clear: sending a well-crafted email or presenting a polished town hall is not enough. The narrative needs to be translated, discussed, questioned, and personalised at every level before it becomes real.",
    ],
    lesson: "The Gallup data shows that narrative effectiveness is not about the quality of the message. It is about whether the message has been translated into something each person can make their own. A narrative that only lives in leadership presentations has not landed.",
    source: "https://www.gallup.com/workplace/349295/successful-organizational-change-needs-strong-narrative.aspx",
    sourceLabel: "Gallup",
  },
];

export default function CraftingNarrative() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "strategic", label: "We have a clear strategic rationale that senior leaders can articulate consistently" },
    { key: "translated", label: "The narrative has been translated into specific implications for each major team or function" },
    { key: "managers", label: "Managers were briefed before the wider organisation and given a version they can adapt" },
    { key: "personal", label: "People affected by the change can describe what is changing for them specifically" },
    { key: "loss", label: "The narrative acknowledges what people are giving up, not just what they are gaining" },
    { key: "uncertainty", label: "We have been honest about what we do not yet know, rather than pretending certainty" },
    { key: "identity", label: "The narrative connects to a sense of purpose or identity that people want to be part of" },
    { key: "ownwords", label: "People at different levels can describe the change in their own words, not the company's" },
    { key: "actions", label: "Leadership actions are consistent with the narrative being told" },
    { key: "evolving", label: "The narrative evolves based on feedback, not delivered once and assumed to be complete" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Strategic Narrative</span>
          <h1 className="article-title">How to craft a change narrative that connects strategy to individual meaning</h1>
          <p className="article-intro">Most change narratives are written for boardrooms. They explain the strategic rationale, the business case, and the expected outcomes. Then they are cascaded down the organisation and lose meaning at every level. A narrative that connects strategy to individual meaning is not one message delivered to everyone. It is the same story, told in four layers, each one speaking to a different question that a different audience is asking.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* THE FOUR LAYERS */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Four Layers of a Change Narrative</h2>
          <p className="article-section-desc">A compelling narrative speaks to four audiences simultaneously. Each layer answers a different question. Most organisations only build the first. Click any layer to see how to build it.</p>
        </ScrollReveal>

        <div className="staircase">
          {narrativeLayers.map((l, i) => (
            <ScrollReveal key={l.id} direction="up" delay={i * 100}>
              <button
                className={`stair${activeLayer === l.id ? " stair-active" : ""}`}
                style={{
                  "--stair-colour": i === 0 ? "#6B7280" : i === 1 ? "#B8860B" : i === 2 ? "#2E6B4F" : "#0A1628",
                  marginLeft: `${i * 48}px`,
                } as React.CSSProperties}
                onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
              >
                <span className="stair-level">{l.num}</span>
                <span className="stair-name">{l.name}</span>
                <span className="stair-tagline">{l.audience}: &ldquo;{l.question}&rdquo;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EXPANDED LAYER DETAIL */}
      {activeLayer && (
        <section className="article-section dimension-detail">
          {narrativeLayers.filter(l => l.id === activeLayer).map(l => (
            <div key={l.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{l.num}</span>
                  <h2 className="detail-title">{l.name}</h2>
                </div>
                <p style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "16px" }}>Audience: {l.audience}</p>
                <p className="detail-body">{l.description}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block" style={{ borderLeft: "3px solid var(--gold)" }}>
                  <h3 className="detail-block-title">Example</h3>
                  <p className="detail-body" style={{ marginBottom: 0, fontStyle: "italic" }}>&ldquo;{l.example}&rdquo;</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">The Pitfall</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{l.pitfall}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="detail-block">
                  <h3 className="detail-block-title">How to Build This Layer</h3>
                  <ExpandableGuidance items={l.guidance} />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Narrative Connecting?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your change narrative has the depth to connect strategy to individual meaning across all four layers.</p>
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
                <div className="check-bar-fill" style={{ width: `${(checkedCount / checkItems.length) * 100}%` }}></div>
              </div>
              <p className="check-score">
                {checkedCount} of {checkItems.length} complete
                {checkedCount === checkItems.length && (
                  <span className="check-complete"> &mdash; Your narrative connects at every level.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong narrative. Close the remaining gaps before going wider.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; The strategic layer is likely strong but the personal and identity layers need work.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Your narrative is likely landing at the top but not reaching the people who need to change.</span>
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
