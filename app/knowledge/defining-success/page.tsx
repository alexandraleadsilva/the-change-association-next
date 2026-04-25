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

const layers = [
  {
    id: "outcome",
    num: "01",
    name: "Outcome",
    question: "What is different when this change succeeds?",
    description: "The outcome layer defines the end state in concrete terms. Not what activities will be completed, but what will be true about the organisation, its customers, or its people that is not true today. A well-defined outcome can be understood by anyone in the organisation without needing to see the project plan.",
    weak: [
      "We will have implemented the new system",
      "The restructure will be complete by Q3",
      "All staff will have been trained on the new process",
    ],
    strong: [
      "Customer enquiries will be resolved in a single interaction rather than being passed between three teams",
      "Managers will be making data-informed decisions weekly rather than relying on monthly reports",
      "New starters will be fully productive within four weeks rather than twelve",
    ],
    guidance: [
      { text: "Define the outcome from the perspective of the people affected, not the program", detail: "If the outcome only makes sense in a steering committee, it is not specific enough. Ask: what would a frontline employee notice is different? What would a customer experience differently? The answer is your outcome." },
      { text: "Test your outcome by asking 'so what?'", detail: "If the outcome is 'we will have implemented SAP', ask 'so what?' The answer might be 'so that managers can see real-time inventory data'. Then ask 'so what?' again. The answer might be 'so that we stop over-ordering and reduce waste by 20%'. Keep going until you reach the outcome that actually matters to the business." },
      { text: "Separate the change outcome from the project deliverable", detail: "A project delivers outputs: a system, a restructure, a new process. A change delivers outcomes: people working differently, decisions being made faster, customers being served better. Define both, but know the difference." },
    ] as ActionItem[],
  },
  {
    id: "behaviour",
    num: "02",
    name: "Behaviour",
    question: "What are people doing differently?",
    description: "The behaviour layer makes the outcome tangible. It describes the specific, observable actions that people will take in the future state that they do not take today. If you cannot describe the change in terms of behaviour, you have not defined it specifically enough.",
    weak: [
      "People will adopt the new system",
      "Teams will be more collaborative",
      "Leaders will support the change",
    ],
    strong: [
      "Sales teams will log customer interactions in the CRM within 24 hours rather than at month end",
      "Project managers will escalate blockers within the same working day rather than waiting for the weekly status meeting",
      "Team leads will hold a 15-minute check-in with their team every morning using the new dashboard",
    ],
    guidance: [
      { text: "Describe behaviours that can be observed, not attitudes that must be inferred", detail: "'People will be more engaged' is not a behaviour. It is a hope. 'Managers will ask for input from their teams before making decisions on resource allocation' is a behaviour. It can be observed, measured, and coached." },
      { text: "Be specific about frequency, context, and standard", detail: "Not just 'people will use the new system' but 'the procurement team will raise all purchase orders through the new system within two working days of the request'. Specificity makes it measurable and coachable." },
      { text: "Identify the behaviours that matter most, not all behaviours that change", detail: "Every transformation changes hundreds of small behaviours. Define the 5 to 10 critical behaviours that, if adopted, will produce the outcome you are looking for. These are the ones to measure and reinforce." },
    ] as ActionItem[],
  },
  {
    id: "evidence",
    num: "03",
    name: "Evidence",
    question: "How will we know? What will we observe or measure?",
    description: "The evidence layer defines how you will know whether the behaviours are happening and the outcomes are being achieved. This is where many success definitions fail, either by measuring nothing, measuring the wrong things, or measuring only what is easy to count.",
    weak: [
      "Training completion rates above 90%",
      "System go-live achieved on schedule",
      "No major incidents reported in the first month",
    ],
    strong: [
      "80% of customer enquiries resolved at first contact within 90 days of go-live, measured through CRM data",
      "Dashboard usage by managers at least three times per week, measured through system analytics",
      "Reduction in escalations from frontline teams to management by 40% within six months, measured through the ticketing system",
    ],
    guidance: [
      { text: "Include both leading and lagging indicators", detail: "Lagging indicators tell you whether the outcome happened: revenue grew, costs reduced, customer satisfaction improved. Leading indicators tell you whether it is going to happen: people are using the system, managers are holding the meetings, teams are following the new process. You need both." },
      { text: "Measure behaviour change, not just activity completion", detail: "Training completion tells you people sat in a room. It does not tell you they changed how they work. System go-live tells you the technology is available. It does not tell you people are using it. Define evidence that measures what people do, not what was done to them." },
      { text: "Establish a baseline before the change begins", detail: "You cannot measure improvement if you do not know where you started. Before the change goes live, measure the current state against the same criteria you will use to measure the future state. The distance between the two is your evidence of success." },
    ] as ActionItem[],
  },
  {
    id: "timeline",
    num: "04",
    name: "Timeline",
    question: "When should we expect to see it?",
    description: "The timeline layer sets realistic expectations for when the outcomes, behaviours, and evidence should materialise. Change does not happen at go-live. It happens in waves: early adoption, mainstream adoption, and sustained adoption. Each has a different timeframe.",
    weak: [
      "Benefits to be realised post-implementation",
      "Change will be embedded by year end",
      "Adoption expected within the first quarter",
    ],
    strong: [
      "Early adopters using the new process consistently by week 4. Mainstream adoption by month 3. Full adoption by month 6.",
      "Leading indicators showing positive trend by week 6. Lagging indicators showing measurable improvement by month 4.",
      "First review at 30 days focused on blockers. Second review at 90 days focused on adoption rates. Third review at 180 days focused on sustained behaviour change.",
    ],
    guidance: [
      { text: "Plan for waves of adoption, not a single switch", detail: "Change does not happen to everyone at once. Early adopters will move quickly. The majority will follow once they see it working. Laggards will need additional support. Define what success looks like at each wave, not just at the end." },
      { text: "Build in review points that are close enough to course-correct", detail: "If your first success review is at 12 months, you will not know whether the change is working until it is too late to fix. Build reviews at 30, 90, and 180 days. Each one should answer a different question: is it landing? Is it sticking? Is it embedded?" },
      { text: "Distinguish between project timeline and change timeline", detail: "The project may end at go-live. The change does not. Define the project timeline and the change timeline separately. The change timeline should extend at least six months beyond project closure, with clear accountability for monitoring and reinforcement." },
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
    label: "Hertz + Accenture",
    headline: "Hertz paid $32 million for a website that never went live because no one defined success",
    hook: "They spent years building something without agreeing on what 'done' looked like.",
    dimension: "Undefined Success",
    body: [
      "In 2016, Hertz engaged Accenture to lead a $32 million digital transformation, redesigning the company's website and mobile apps. The project was part of a larger $400 million overhaul of Hertz's digital systems.",
      "The fundamental problem was that success was never properly defined. Hertz contracted Accenture to be the 'product owner', meaning Accenture was responsible for defining the scope of what would be delivered. This created a situation where the consultancy's definition of success was different from the client's. There was no shared outcome, no agreed behaviours, and no evidence framework that both sides would recognise as success.",
      "The website never went live. Deliverables were repeatedly delayed. Accenture charged additional fees for work Hertz believed was already in scope. In 2019, Hertz sued Accenture for the $32 million in fees, plus additional damages.",
      "The lawsuit revealed that neither party had established a clear, measurable definition of what the project was supposed to achieve from the perspective of the customer or the business. The technical deliverables were defined. The change outcomes were not.",
    ],
    lesson: "The Hertz case is a textbook example of project success being defined in terms of deliverables rather than outcomes. Both parties had a different understanding of what success meant. A shared success definition, built around customer outcomes and business behaviours, would have surfaced the misalignment before $32 million was spent.",
    source: "https://www.henricodolfing.com/2019/10/case-study-hertz-accenture-website.html",
    sourceLabel: "Henrico Dolfing",
  },
  {
    label: "MIT Sloan Research",
    headline: "Why the wrong KPIs doom digital transformation before it starts",
    hook: "Most companies measure transformation success with metrics designed for the old operating model.",
    dimension: "Wrong Metrics",
    body: [
      "Research published by MIT Sloan Management Review found that one of the most common reasons digital transformations fail is that organisations measure success using legacy metrics that were designed for the old operating model.",
      "The research describes a financial services company that identified 'agility' as a key aspiration of its transformation. But the metrics in place, conformance and compliance measures designed for back-office processing, had nothing to do with agility. The organisation was measuring the wrong thing and therefore could not tell whether the transformation was working.",
      "The research found that most legacy companies treat KPIs as reporting and accounting mechanisms rather than strategic decision drivers. They cling to these legacy KPI perspectives because they are familiar and comfortable, but they are irrelevant to the change they are trying to make.",
      "The conclusion was clear: defining success before delivery begins is not just about setting targets. It is about ensuring those targets measure what actually matters in the future state, not what mattered in the past.",
    ],
    lesson: "If your success criteria are inherited from the operating model you are trying to change, you are measuring the past, not the future. Success definition requires deliberately designing new measures that reflect the outcomes and behaviours the transformation is intended to produce.",
    source: "https://sloanreview.mit.edu/article/how-the-wrong-kpis-doom-digital-transformation/",
    sourceLabel: "MIT Sloan Management Review",
  },
  {
    label: "McKinsey",
    headline: "Only 12% of transformations deliver all their intended value. Definition is the first failure point.",
    hook: "The data shows that organisations that define success rigorously outperform those that do not.",
    dimension: "Transformation Data",
    body: [
      "McKinsey research on transformation success rates found that only 12% of large-scale transformations deliver all of their intended value. The majority underperform or fail to sustain their gains.",
      "One of the primary differentiators between successful and unsuccessful transformations was the rigour with which success was defined at the outset. Organisations that established clear, measurable outcomes, tied to business performance and behavioural change, were significantly more likely to achieve and sustain results.",
      "The research emphasised that successful transformations define success across multiple dimensions: financial outcomes, operational performance, customer experience, and employee engagement. They also establish review cadences that allow for course correction rather than waiting for a post-implementation review.",
      "Critically, the research found that the definition of success needs to be owned by the business, not the transformation program. When success is defined and measured by the people responsible for delivering the outcome, accountability is clear and sustained.",
    ],
    lesson: "The McKinsey data makes the case quantitatively: defining success before delivery begins is not a nice to have. It is a statistically significant predictor of whether the transformation will deliver value. The 88% that fail to deliver full value often fail at this step first.",
    source: "https://www.mckinsey.com/capabilities/transformation/our-insights/the-numbers-behind-successful-transformations",
    sourceLabel: "McKinsey",
  },
];

export default function DefiningSuccess() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "outcome", label: "We have defined success in terms of outcomes, not activities or deliverables" },
    { key: "behaviour", label: "We can describe the specific behaviours that will be different in the future state" },
    { key: "leading", label: "We have both leading and lagging indicators to track progress" },
    { key: "baseline", label: "We have measured the baseline before the change begins" },
    { key: "waves", label: "We have planned for waves of adoption with different expectations at each stage" },
    { key: "reviews", label: "We have review points at 30, 90, and 180 days, not just at project close" },
    { key: "owned", label: "Success criteria are owned by the business, not just the program team" },
    { key: "understood", label: "The people affected by the change can describe what success looks like in their own words" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Success Definition</span>
          <h1 className="article-title">How to define change success before delivery begins, and why most organisations skip this</h1>
          <p className="article-intro">Most change programs define success in terms of what will be delivered: a system goes live, a restructure completes, training is rolled out. These are project deliverables. They are not change outcomes. A meaningful success definition answers a different question: what will be true about this organisation, its people, and its performance that is not true today?</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* THE FOUR LAYERS */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Four Layers of Success Definition</h2>
          <p className="article-section-desc">A complete success definition has four layers. Each one builds on the last. Most organisations stop at the first or skip straight to the third. Click any layer to explore it in depth.</p>
        </ScrollReveal>

        <div className="dimension-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {layers.map((l, i) => (
            <ScrollReveal key={l.id} direction="up" delay={i * 80}>
              <button
                className={`dimension-card${activeLayer === l.id ? " dimension-card-active" : ""}`}
                onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
              >
                <span className="dimension-num">{l.num}</span>
                <span className="dimension-name">{l.name}</span>
                <span className="dimension-summary">{l.question}</span>
                <span className="dimension-expand">{activeLayer === l.id ? "Close" : "Explore"} &darr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EXPANDED LAYER DETAIL */}
      {activeLayer && (
        <section className="article-section dimension-detail">
          {layers.filter(l => l.id === activeLayer).map(l => (
            <div key={l.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{l.num}</span>
                  <h2 className="detail-title">{l.name}</h2>
                </div>
                <p className="detail-body">{l.description}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="phase-compare" style={{ marginBottom: "24px" }}>
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">Weak Definitions</span>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {l.weak.map((w, i) => (
                        <li key={i} style={{ fontFamily: "var(--ui)", fontSize: "13px", color: "var(--text-mid)", lineHeight: "1.6" }}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">Strong Definitions</span>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {l.strong.map((s, i) => (
                        <li key={i} style={{ fontFamily: "var(--ui)", fontSize: "13px", color: "var(--text-mid)", lineHeight: "1.6" }}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block">
                  <h3 className="detail-block-title">Practical Guidance</h3>
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
          <h2 className="article-section-title">Is Your Success Definition Complete?</h2>
          <p className="article-section-desc">Use this checklist before delivery begins. If you cannot tick most of these, your success definition needs more work.</p>
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
                  <span className="check-complete"> &mdash; Your success definition is rigorous and measurable.</span>
                )}
                {checkedCount >= 5 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Good foundation. Close the gaps before delivery begins.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant gaps. Your program may not know when it has succeeded.</span>
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
