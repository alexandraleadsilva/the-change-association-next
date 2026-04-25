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

const dimensions = [
  {
    id: "core",
    num: "01",
    name: "What Must Be Consistent",
    description: "The elements of the change that cannot vary between sites. These are the non-negotiables that define the change itself. If these differ by location, you do not have one change. You have multiple unrelated changes wearing the same name.",
    items: [
      { text: "The strategic narrative and the case for change", detail: "Every site must hear the same reason for the change, in the same terms, with the same level of honesty. The narrative can be delivered by different people in different ways, but the core story must be identical. If site A hears one rationale and site B hears another, alignment collapses." },
      { text: "The definition of success and how it will be measured", detail: "Success criteria must be universal. If one site measures adoption by system logins and another measures it by customer outcomes, you cannot compare, learn, or course-correct. Define the metrics centrally. Allow sites to add local measures, but not replace the core ones." },
      { text: "The core process or system that the change delivers", detail: "If the change involves a new system, the system must be the same everywhere. If it involves a new process, the process steps must be consistent. The moment you allow fundamental variations in the core deliverable, you lose the ability to support it, scale it, or govern it." },
      { text: "The minimum standard of readiness before go-live", detail: "Every site must meet the same readiness threshold before the change goes live. This includes training completion, leadership alignment, data quality, and system testing. If you lower the bar for one site because of timeline pressure, you are choosing a predictable failure." },
    ] as ActionItem[],
  },
  {
    id: "adapt",
    num: "02",
    name: "What Should Be Adapted Locally",
    description: "The elements that should flex to fit local context. These are the parts of the change that work better when shaped by the people closest to the work. Forcing uniformity here does not create consistency. It creates irrelevance.",
    items: [
      { text: "How the narrative is delivered and by whom", detail: "The story is the same. The storyteller should be local. A regional manager who knows the team, speaks the language, and understands the local context will deliver the narrative with more credibility than a central communication. Provide the key messages. Let local leaders deliver them." },
      { text: "The pace and sequencing of local rollout activities", detail: "Not every site is at the same starting point. Some have been through recent change and need more time. Some have strong local leadership and can move faster. The central plan sets the boundaries. The local plan fills in the detail." },
      { text: "Additional support based on local capability gaps", detail: "A site with strong digital skills may need minimal training on a new system. A site with limited experience may need intensive support. The training content should be consistent. The depth and delivery method should adapt to local needs." },
      { text: "Communication channels and engagement formats", detail: "A town hall works in one culture. A small team briefing works in another. An email is sufficient for one site. A face-to-face session is essential for another. Let local teams choose the engagement format that fits their people, as long as the content covers the core messages." },
    ] as ActionItem[],
  },
  {
    id: "govern",
    num: "03",
    name: "How to Govern the Balance",
    description: "The governance mechanisms that maintain consistency without killing local ownership. This is the hardest part. Too much central control produces compliance without commitment. Too little produces fragmentation.",
    items: [
      { text: "A global template with defined flex points", detail: "Create a central template that specifies what is fixed and what is flexible. For each element of the change, state clearly: this must be the same everywhere, or this can be adapted within these boundaries. If the boundaries are not defined, every site will interpret them differently." },
      { text: "Local change leads with clear authority and accountability", detail: "Every site needs a named person who owns the change locally. This person needs enough authority to make decisions about local adaptation and enough accountability to maintain alignment with the central plan. If they are too junior, they cannot act. If they are too senior, they will not be close enough to the detail." },
      { text: "Regular cross-site learning forums", detail: "The most valuable governance mechanism is not a report. It is a conversation. Bring local change leads together regularly to share what they are learning, what is working, and what they are struggling with. This creates a peer network that self-governs more effectively than any central team." },
      { text: "A shared dashboard that tracks both consistency and local context", detail: "The central team needs to see whether core elements are being delivered consistently. Local teams need to see their own progress in context. A single dashboard that shows both creates transparency without bureaucracy." },
    ] as ActionItem[],
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

const pitfalls = [
  { text: "Designing the change centrally and expecting sites to execute it without input", detail: "If local teams have no say in how the change is delivered, they will treat it as an imposition rather than a shared goal. Central design without local input produces technically correct plans that are operationally impossible. Involve local representatives in the design phase, not just the rollout phase." },
  { text: "Allowing so much local adaptation that the change loses coherence", detail: "Flexibility without boundaries is not empowerment. It is fragmentation. If every site adapts the change to the point where it is unrecognisable from the original intent, you have lost the benefits of a coordinated approach. Define what is fixed before you define what is flexible." },
  { text: "Rolling out to all sites simultaneously regardless of readiness", detail: "A simultaneous rollout feels fair but is rarely effective. Sites vary in readiness, capability, and complexity. Sequencing by readiness, not by geography or alphabet, allows you to learn from early sites and improve the approach for later ones." },
  { text: "Sending the same communication to every site without local translation", detail: "Translation is not just about language. It is about context. A message that resonates in head office may be meaningless in a factory, a retail store, or a regional office. Every communication needs to be filtered through the question: what does this mean for the people in this specific location?" },
  { text: "Measuring consistency by compliance rather than by outcome", detail: "Consistency does not mean every site does exactly the same thing at exactly the same time. It means every site achieves the same outcomes through an approach that fits their context. Measure outcomes consistently. Allow methods to vary." },
];

const caseStudies = [
  {
    label: "Nestle GLOBE",
    headline: "How Nestle rolled out SAP to 90 countries with an 80/20 global template",
    hook: "The largest SAP implementation in history. 3 billion Swiss francs. One global template. Local adaptation built in.",
    dimension: "Global Template Success",
    body: [
      "In 2001, Nestle launched GLOBE (Global Business Excellence), the largest SAP implementation project in history. The goal was to standardise data, processes, and systems across more than 90 countries. The estimated cost was 3 billion Swiss francs over five years.",
      "Nestle's approach was built on an 80/20 principle. A global template was designed centrally containing data standards, common processes, and system configurations that covered approximately 80% of Nestle's business requirements. The remaining 20% was left for local adaptation, allowing each country to configure the system for local regulatory requirements, market practices, and operational nuances.",
      "The first attempt failed. The US rollout in 2000 encountered massive employee resistance because none of the groups directly affected by the new processes were represented on the key stakeholders team. Nestle learned that multi-site change is not a technology problem. It is a people problem.",
      "After restructuring the approach to include local representation, change management support, and phased country-by-country rollouts, GLOBE was successfully deployed across 90 countries by 2010. The project gave Nestle global visibility into its operations, enabling strategic decisions that previously took days to be made in minutes.",
    ],
    lesson: "Nestle's GLOBE demonstrates the 80/20 principle in action: standardise the core, adapt the edges. But the most important lesson was that the first rollout failed because they forgot the people. The technology was consistent. The change management was not.",
    source: "https://www.cio.com/article/270680/enterprise-resource-planning-nestl-s-enterprise-resource-planning-erp-odyssey.html",
    sourceLabel: "CIO",
  },
  {
    label: "Hershey's",
    headline: "When a single-site big bang creates problems, multi-site makes them exponential",
    hook: "Hershey proved that what fails at one site will fail everywhere if you do not phase.",
    dimension: "Multi-Site Risk",
    body: [
      "Hershey's 1999 ERP failure is primarily remembered as a big bang disaster. But it is equally a cautionary tale about multi-site change. The system was deployed simultaneously across all of Hershey's operations, with no site-by-site testing, no regional pilots, and no ability to isolate failures.",
      "When the system went live and orders stopped flowing correctly, every part of the business was affected simultaneously. There was no fallback, no unaffected site that could compensate, and no reference point for what working correctly looked like. The failure was total because the rollout was total.",
      "A multi-site phased approach would have allowed Hershey to test the system in one region, identify the integration issues, and maintain business continuity through the transition. The sites that had not yet gone live could have continued operating while the problems were resolved.",
      "The Hershey case shows that multi-site change amplifies both success and failure. A phased approach limits the blast radius of problems. A simultaneous rollout guarantees that problems affect everyone at once.",
    ],
    lesson: "Hershey's failure reinforces a fundamental principle of multi-site change: never deploy to all sites simultaneously unless you are confident the change works. One failed site is a problem. All failed sites is a crisis.",
    source: "https://pemeco.com/a-case-study-on-hersheys-erp-implementation-failure-the-importance-of-testing-and-scheduling/",
    sourceLabel: "Pemeco",
  },
  {
    label: "ING Bank",
    headline: "ING scaled its agile transformation by letting each tribe adapt the model to their context",
    hook: "The structure was consistent. The way each tribe adopted it was deliberately different.",
    dimension: "Adaptive Consistency",
    body: [
      "When ING Netherlands transformed its operating model into squads and tribes, the structure was defined centrally: cross-functional squads of 6 to 9 people, organised into tribes of no more than 150. These structural parameters were non-negotiable across the entire organisation.",
      "But how each tribe operationalised the model was deliberately left flexible. Some tribes adopted Scrum. Others used Kanban. Some ran two-week sprints. Others ran four-week cycles. The rituals, the tools, and the daily practices were adapted by each tribe to fit their work and their people.",
      "ING maintained consistency through shared principles rather than shared procedures. Every tribe was expected to be autonomous, aligned, and transparent. How they achieved that was up to them. This created a sense of local ownership that a rigid central mandate would have destroyed.",
      "The transformation team supported this by creating cross-tribe learning forums where tribes shared what was working and what was not. This peer learning network became the primary mechanism for spreading good practice, far more effective than central mandates.",
    ],
    lesson: "ING demonstrates that multi-site consistency does not require uniformity. By defining the structure centrally and letting teams adapt the practices locally, ING achieved both alignment and ownership. The consistency was in the principles, not the procedures.",
    source: "https://www.mckinsey.com/industries/financial-services/our-insights/ings-agile-transformation",
    sourceLabel: "McKinsey",
  },
];

export default function MultiSiteChange() {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "defined", label: "We have explicitly defined what must be consistent and what can be adapted locally" },
    { key: "template", label: "A global template exists with clearly marked flex points" },
    { key: "local-leads", label: "Every site has a named local change lead with real authority" },
    { key: "input", label: "Local teams were involved in the design, not just the rollout" },
    { key: "sequenced", label: "Sites are sequenced by readiness, not geography or convenience" },
    { key: "learning", label: "There are regular cross-site learning forums where local leads share experience" },
    { key: "narrative", label: "The core narrative is consistent but delivered by local leaders in local context" },
    { key: "support", label: "Support levels are adapted to each site's capability gaps" },
    { key: "dashboard", label: "A shared dashboard tracks both global consistency and local progress" },
    { key: "outcomes", label: "We are measuring outcomes consistently while allowing methods to vary" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Roadmap & Planning</span>
          <h1 className="article-title">How to manage change across multiple sites without losing consistency</h1>
          <p className="article-intro">Multi-site change is where most transformation programs lose coherence. The central team designs a plan that makes sense in a boardroom. Then it hits reality: different cultures, different capabilities, different levels of readiness, and different local priorities. The result is either rigid uniformity that ignores context or local fragmentation that destroys alignment. The answer is neither. It is a deliberate framework that defines what must be the same everywhere and what should be adapted locally.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* CONSISTENCY VS ADAPTATION FRAMEWORK */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Consistency and Adaptation Framework</h2>
          <p className="article-section-desc">Multi-site change requires three clear decisions: what must be consistent, what should adapt, and how to govern the balance. Click any dimension to explore it.</p>
        </ScrollReveal>

        <div className="dimension-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {dimensions.map((d, i) => (
            <ScrollReveal key={d.id} direction="up" delay={i * 80}>
              <button
                className={`dimension-card${activeDimension === d.id ? " dimension-card-active" : ""}`}
                onClick={() => setActiveDimension(activeDimension === d.id ? null : d.id)}
              >
                <span className="dimension-num">{d.num}</span>
                <span className="dimension-name">{d.name}</span>
                <span className="dimension-expand">{activeDimension === d.id ? "Close" : "Explore"} &darr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {activeDimension && (
        <section className="article-section dimension-detail">
          {dimensions.filter(d => d.id === activeDimension).map(d => (
            <div key={d.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{d.num}</span>
                  <h2 className="detail-title">{d.name}</h2>
                </div>
                <p className="detail-body">{d.description}</p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">What This Looks Like in Practice</h3>
                  <ExpandableList items={d.items} />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* COMMON PITFALLS */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Five Most Common Multi-Site Pitfalls</h2>
          <p className="article-section-desc">These are the patterns that derail multi-site change most frequently. Each one is preventable if you design for it upfront.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block detail-block-warning">
            <h3 className="detail-block-title">Pitfalls to Watch For</h3>
            <ExpandableList items={pitfalls} />
          </div>
        </ScrollReveal>
      </section>

      {/* CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Multi-Site Approach Working?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your approach balances consistency with local adaptation.</p>
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
                  <span className="check-complete"> &mdash; Your multi-site approach balances consistency with local ownership.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong approach. Close the remaining gaps before the next wave.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Foundation is in place but risks remain around local adaptation or governance.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Significant gaps. Your approach may produce either fragmentation or rigid compliance.</span>
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
