"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface GuidanceItem {
  text: string;
  detail: string;
}

const timingDimensions = [
  {
    id: "organisational-readiness",
    num: "01",
    name: "Organisational Readiness",
    summary: "Can the organisation absorb a restructure right now?",
    description:
      "Organisational readiness is the most fundamental timing dimension. It measures whether the people, processes, and systems in the organisation are in a position to absorb a structural change without collapsing under the weight of it. Readiness is not enthusiasm. A leadership team can be enthusiastic about a restructure while the organisation itself is completely unprepared for one.",
    guidance: [
      {
        text: "Assess the stability of current operations before announcing any structural change",
        detail:
          "If the organisation is already struggling to deliver its core operations, adding the disruption of a restructure will make things worse, not better. Restructuring requires people to learn new reporting lines, new processes, and new ways of working. If they are already overwhelmed, they do not have the capacity to absorb that learning. The restructure becomes a burden rather than an improvement.",
      },
      {
        text: "Evaluate the level of trust between leadership and the wider organisation",
        detail:
          "Restructuring requires people to accept uncertainty about their roles, teams, and future. They will only accept that uncertainty if they trust that the leadership making the decisions has their interests in mind. If trust is low, the restructure will be seen as a threat regardless of its intent. Measure trust through honest conversations, not engagement surveys.",
      },
      {
        text: "Determine whether the organisation has the change capability to manage a restructure",
        detail:
          "A restructure needs project management, communication, people transition support, and systems reconfiguration. If the organisation does not have these capabilities internally, and has not secured them externally, the restructure will be poorly managed. Poor management of a restructure does more damage than no restructure at all.",
      },
    ] as GuidanceItem[],
    redFlag:
      "The organisation is already underperforming operationally and the restructure is being positioned as the solution. Restructuring a struggling organisation rarely fixes the underlying problems. It usually creates new ones while the old ones persist.",
  },
  {
    id: "market-conditions",
    num: "02",
    name: "Market Conditions",
    summary: "Does the external environment support or undermine this restructure?",
    description:
      "Market conditions create the context in which a restructure either makes sense or becomes reckless. An organisation restructuring during a period of market stability has the luxury of time and space. An organisation restructuring during a market downturn, a competitive crisis, or a regulatory shift is trying to rebuild the ship while sailing through a storm. The question is not whether the restructure is the right design. It is whether this is the right moment to execute it.",
    guidance: [
      {
        text: "Map the competitive landscape and identify whether the restructure creates vulnerability",
        detail:
          "Restructures create temporary periods of reduced effectiveness as people adjust to new structures. During this period, the organisation is slower to respond to competitive threats, slower to serve customers, and slower to make decisions. If the market is stable, this temporary reduction matters less. If competitors are actively gaining ground, the timing gap created by a restructure can be fatal.",
      },
      {
        text: "Assess whether the economic environment supports the investment a restructure requires",
        detail:
          "Restructures are expensive. Redundancy costs, recruitment, system changes, productivity losses, and consulting support add up quickly. If the organisation is under financial pressure, funding the restructure competes with funding operations. A restructure launched during a revenue decline often gets its budget cut halfway through, leaving the organisation stuck between the old structure and the new one.",
      },
      {
        text: "Consider whether regulatory or industry changes make the timing urgent or premature",
        detail:
          "Sometimes external forces demand a restructure on a specific timeline. Regulatory changes, mergers, or market shifts can create genuine urgency. But just as often, organisations restructure in anticipation of changes that may not materialise, or restructure before the full picture is clear. Premature restructuring based on speculation wastes resources and credibility.",
      },
    ] as GuidanceItem[],
    redFlag:
      "The organisation is restructuring in response to a market crisis that requires an operational response, not a structural one. Restructuring during a crisis often delays the operational actions that would actually address the problem.",
  },
  {
    id: "leadership-stability",
    num: "03",
    name: "Leadership Stability",
    summary: "Is the leadership team stable enough to see this through?",
    description:
      "A restructure is only as durable as the leadership team that sponsors it. If the CEO, the executive team, or the board is likely to change within the next 12 to 18 months, the restructure is at risk of being reversed, modified, or abandoned by the next leadership team. Every new leader wants to put their stamp on the organisation, and the easiest way to do that is to restructure again. Launching a restructure under unstable leadership is asking the organisation to absorb disruption that may not last.",
    guidance: [
      {
        text: "Assess whether the sponsoring leader is likely to be in post long enough to see the restructure through",
        detail:
          "A restructure takes 12 to 24 months to fully embed. If the leader who sponsors it leaves within that window, the restructure loses its champion. The new leader may have different priorities, a different organisational philosophy, or simply a desire to be seen as bringing their own ideas rather than implementing their predecessor's. The restructure stalls, and the organisation is left in an incomplete transition.",
      },
      {
        text: "Evaluate whether the executive team is aligned on the restructure or whether it is being driven by one individual",
        detail:
          "If the restructure is the vision of a single leader without genuine support from the broader executive team, it is vulnerable. Other executives may undermine it subtly, fail to champion it in their areas, or simply wait for the sponsoring leader to leave before reverting to the old structure. Alignment needs to be tested through honest conversation, not assumed from silence in a meeting.",
      },
      {
        text: "Consider whether the board is committed to the restructure or treating it as an experiment",
        detail:
          "Board support determines whether the restructure gets the time and resources it needs to succeed. If the board views the restructure as conditional on short-term results, the pressure to show quick wins will distort the implementation. Structural change takes time. A board that expects immediate returns will pull the plug before the restructure has had a chance to work.",
      },
    ] as GuidanceItem[],
    redFlag:
      "The restructure is being launched by a new leader within their first six months as a way to demonstrate decisiveness. Restructuring before understanding the organisation usually produces a structure that looks good on paper but does not work in practice.",
  },
  {
    id: "change-fatigue",
    num: "04",
    name: "Change Fatigue",
    summary: "Has the organisation been through too much change already?",
    description:
      "Change fatigue is the accumulated exhaustion that comes from repeated organisational changes. It is not resistance. It is depletion. People who are change-fatigued are not opposed to the restructure on principle. They simply do not have the energy, trust, or willingness to engage with another round of disruption. Research consistently shows that organisations which restructure repeatedly produce worse outcomes with each successive change, because the workforce's capacity to adapt has been consumed.",
    guidance: [
      {
        text: "Map the change history of the organisation over the past three years",
        detail:
          "List every significant change the organisation has been through: restructures, system implementations, leadership changes, strategy shifts, redundancy programmes. If the list is long, the organisation is likely fatigued. People do not distinguish between types of change. To them, it is all disruption. Each new change draws on the same reserve of energy and goodwill, and if that reserve is depleted, the restructure will face passive resistance regardless of how well it is designed.",
      },
      {
        text: "Listen for the language of fatigue in the organisation",
        detail:
          "Change fatigue reveals itself in language. Phrases like 'here we go again,' 'this too shall pass,' 'I will wait and see,' and 'they will change it again in a year' are diagnostic. When people assume the restructure is temporary, they will not invest the effort to make it work. They will maintain their existing networks and relationships and wait for the next change to reverse this one.",
      },
      {
        text: "Assess whether the previous changes have been completed or abandoned before starting new ones",
        detail:
          "One of the most common causes of change fatigue is starting new changes before the previous ones have been fully implemented. If the last restructure is still being embedded, launching another one sends the message that completion does not matter. People learn that they do not need to commit to any change because another one will arrive before this one is finished.",
      },
    ] as GuidanceItem[],
    redFlag:
      "The organisation has been through more than two significant structural changes in the past three years and has not had a period of stability between them. Each additional restructure produces diminishing returns and increasing cynicism.",
  },
  {
    id: "resource-availability",
    num: "05",
    name: "Resource Availability",
    summary: "Do you have the people, budget, and bandwidth to execute this properly?",
    description:
      "Restructures fail not because the design is wrong but because the organisation does not have the resources to implement the design properly. Implementation requires dedicated programme management, HR capacity for role transitions, IT capacity for systems changes, communication support, and management time. If these resources are not available, the restructure will be under-supported. An under-supported restructure is worse than no restructure at all, because it creates disruption without delivering the intended benefits.",
    guidance: [
      {
        text: "Calculate the true cost of the restructure, including the hidden costs",
        detail:
          "The visible costs of a restructure are redundancy payments and consulting fees. The hidden costs are far larger: productivity losses during the transition, attrition of talented people who do not want to wait for clarity, management time diverted from operations, customer impact from disrupted service, and the cost of fixing problems created by the transition. If the business case does not include these hidden costs, it understates the investment by a significant margin.",
      },
      {
        text: "Assess whether the people who will manage the restructure have the capacity to do so",
        detail:
          "Restructures are usually managed by HR and line managers who already have full-time roles. The restructure is added to their existing workload. When this happens, either the restructure is poorly managed or their existing responsibilities suffer. Both outcomes damage the organisation. If dedicated programme resources are not available, the restructure should be delayed until they are.",
      },
      {
        text: "Ensure that the systems and infrastructure changes required by the restructure are feasible within the timeline",
        detail:
          "Every restructure requires changes to HR systems, finance systems, reporting structures, access permissions, and communication channels. These changes are often underestimated in both complexity and duration. If the IT and operations teams cannot deliver the required changes within the restructure timeline, people will be working in a new structure supported by old systems. The mismatch creates confusion, workarounds, and frustration.",
      },
    ] as GuidanceItem[],
    redFlag:
      "The restructure is being launched with a tight timeline and no dedicated programme resources, relying on managers to absorb the implementation alongside their existing responsibilities. This is the most common setup for failure.",
  },
];

function ExpandableGuidance({ items }: { items: GuidanceItem[] }) {
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
    label: "Yahoo",
    headline: "Six CEOs, five restructures, and a decade of decline that better timing could have interrupted",
    hook: "Yahoo restructured repeatedly but never at the right moment. By the time each change took hold, the market had already moved on.",
    dimension: "Leadership Instability",
    body: [
      "Between 2006 and 2016, Yahoo cycled through six CEOs, each of whom launched their own restructuring of the company. Terry Semel's 2006 reorganisation came too late to address the search advertising gap that Google had already exploited. Jerry Yang's brief tenure ended without completing his strategic shift. Carol Bartz restructured again from 2009 to 2011, but revenue continued to decline. Marissa Mayer arrived in 2012 and launched yet another reorganisation, acquiring over 50 companies in an attempt to reinvent Yahoo as a technology innovator.",
      "The timing problem was structural. Each restructure was launched by a new leader trying to stamp their vision on the company before they had fully understood what was broken. The 2006 reorganisation and Project Panama, Yahoo's new advertising platform, were delayed by more than two quarters. By the time Panama launched in February 2007, Google's AdWords had already captured the market. Yahoo's stock had declined 32% during the delay. The restructure was the right idea executed at the wrong time.",
      "Mayer's restructures compounded the problem. She inherited an organisation that was already fatigued from years of leadership change and structural upheaval. Rather than stabilising the organisation first, she launched an aggressive acquisition and reorganisation strategy that further destabilised it. Employees described a culture of 'waiting for the next CEO' rather than committing to the current strategy.",
      "The ultimate consequence was the sale of Yahoo's core internet business to Verizon in 2017 for $4.48 billion, a fraction of the $125 billion the company had been valued at in January 2000. Each individual restructure may have been defensible in isolation. But the timing of each one, launched before the previous one had landed, meant that none of them had the chance to succeed.",
    ],
    lesson:
      "Yahoo demonstrates what happens when restructuring is treated as a leadership arrival ritual rather than a strategic intervention. Each new CEO restructured before understanding the organisation, and each restructure was abandoned before it could deliver results. The lesson is that leadership stability is a precondition for structural change, not a consequence of it.",
    source: "https://www.nbcnews.com/tech/tech-news/it-s-not-just-marissa-yahoo-has-history-troubled-ceos-n696966",
    sourceLabel: "NBC News",
  },
  {
    label: "Vodafone UK",
    headline: "A 28.5 million account migration launched while the company was already the most complained-about provider",
    hook: "Vodafone restructured its entire billing system at the worst possible moment: when customer trust was already at breaking point.",
    dimension: "Organisational Readiness",
    body: [
      "In 2013, Vodafone UK embarked on the largest IT and operational restructuring in its history: migrating 28.5 million customer accounts from seven separate billing platforms onto a single Siebel CRM system. The migration programme ran for two years and completed in April 2015. The technical ambition was sound. The timing was catastrophic.",
      "At the time of the migration, Vodafone was already the most complained-about mobile provider in the UK according to Ofcom's 2015 industry survey, generating nearly three times the industry average in customer complaints per 100,000 subscribers. The organisation's customer service operation was already strained. Its complaints handling processes were already inadequate. Into this environment, Vodafone introduced the disruption of a massive systems migration that affected every customer account.",
      "The consequences were immediate and severe. A proportion of the 28.5 million accounts were incorrectly migrated, introducing errors into billing data and price plan records. Over 10,452 pay-as-you-go customers lost money when top-ups were not credited to their accounts, losing a combined total of over 150,000 pounds across 17 months. The billing chaos drove a customer exodus that resulted in a 54 million pound revenue crash between April and June 2015 and a 3.2% drop in sales to 1.55 billion pounds.",
      "In October 2016, Ofcom fined Vodafone 4.6 million pounds for serious and sustained breaches of consumer protection rules. The fine covered both the pay-as-you-go billing failures and the inadequacy of Vodafone's complaints handling during the crisis. The restructuring had been executed without first addressing the operational weaknesses that made it dangerous.",
    ],
    lesson:
      "Vodafone's CRM migration demonstrates the cost of restructuring an operation that is not ready for disruption. The technical design of the migration was not the primary failure. The failure was launching it into an organisation that was already struggling to serve its customers. Readiness is not about whether the new system is ready. It is about whether the organisation is ready to absorb the transition.",
    source: "https://www.henricodolfing.com/2020/05/case-study-vodafone-crm-disaster.html",
    sourceLabel: "Henrico Dolfing",
  },
  {
    label: "General Electric",
    headline: "Two decades of serial restructuring that exhausted the workforce and destroyed 75% of the company's value",
    hook: "GE restructured so often that employees stopped believing any change would last. The company eventually had to break itself apart.",
    dimension: "Change Fatigue",
    body: [
      "General Electric's decline from the world's most valuable company to a cautionary tale of corporate excess is fundamentally a story about restructuring timing and fatigue. Under Jack Welch, who earned the nickname 'Neutron Jack' for eliminating people while leaving buildings standing, GE became synonymous with constant reorganisation. Every business unit had to be number one or number two in its market or face disposal. The relentless restructuring produced short-term results but left the workforce exhausted and the organisation culturally depleted.",
      "When Jeffrey Immelt succeeded Welch in 2001, he inherited an organisation that had been through years of radical change. Rather than allowing a period of stability, Immelt launched his own restructuring agenda. He shifted GE's focus from financial services toward industrial and technology businesses, restructuring the portfolio repeatedly over his 16-year tenure. But the timing was consistently off. The expansion into financial services proved devastating when the 2008 financial crisis hit, revealing that GE Capital held more than 500 billion dollars in assets and nearly as much in debt.",
      "Immelt's response was to restructure again, spending from 2015 onward selling off chunks of GE Capital. But the restructuring came after the damage was done, not before. By the time the financial arm was reduced to 129 billion dollars in assets, the company had already lost the confidence of investors and the energy of its workforce. Under Immelt's leadership, 75% of GE's market value was destroyed.",
      "The pattern continued under Immelt's successor John Flannery, who lasted just 14 months before being replaced by Larry Culp. In 2021, Culp announced the ultimate restructure: breaking GE into three separate companies. The split, completed in April 2024, was an admission that decades of serial restructuring had failed to produce a coherent, effective organisation. The workforce that had lived through reorganisation after reorganisation had learned to disengage rather than commit to any single structural vision.",
    ],
    lesson:
      "GE demonstrates the compound cost of change fatigue. Each restructure consumed the organisation's finite reserve of energy and goodwill. Because no restructure was given enough time to embed before the next one began, none of them delivered their intended benefits. The lesson is that the timing between restructures matters as much as the timing of any individual one. Organisations need periods of stability to recover, embed, and realise value before the next structural change.",
    source: "https://shahmm.medium.com/divided-we-stand-the-fall-and-fracture-of-general-electric-0b3d378bb68f",
    sourceLabel: "Medium",
  },
];

export default function RestructureTiming() {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "operations", label: "Current operations are stable enough to absorb the disruption of a restructure" },
    { key: "trust", label: "There is sufficient trust between leadership and the workforce to navigate uncertainty" },
    { key: "market", label: "Market conditions support a period of internal transition without creating competitive vulnerability" },
    { key: "leader-tenure", label: "The sponsoring leader is likely to remain in post for at least 18 months beyond the restructure launch" },
    { key: "exec-alignment", label: "The executive team is genuinely aligned on the restructure, not just silent in meetings" },
    { key: "fatigue-check", label: "The organisation has not been through more than one significant structural change in the past two years" },
    { key: "previous-complete", label: "Previous changes have been fully embedded before this restructure is being launched" },
    { key: "budget", label: "The full cost of the restructure has been calculated, including hidden costs like productivity loss and attrition" },
    { key: "dedicated-resources", label: "Dedicated programme resources are available, not just managers absorbing implementation alongside their day jobs" },
    { key: "systems-feasible", label: "The systems and infrastructure changes required by the restructure are feasible within the planned timeline" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Roadmap &amp; Planning</span>
          <h1 className="article-title">What can a failed restructure teach us about the timing of change?</h1>
          <p className="article-intro">Most restructures do not fail because the new structure is wrong. They fail because the timing is wrong. The organisation is not ready, the leadership is not stable, the market is not forgiving, or the workforce is too fatigued from the last round of changes to engage with another one. Timing is not a detail to be managed after the restructure is designed. It is a strategic decision that determines whether the restructure has any chance of succeeding. The organisations that get restructuring right are the ones that ask not just what should we change, but when is the right moment to change it.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* TIMING DECISION MATRIX */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Timing Decision Matrix</h2>
          <p className="article-section-desc">Before launching a restructure, assess these five timing dimensions. Each one can independently determine whether the restructure succeeds or fails. A restructure that scores well on design but poorly on timing will produce worse outcomes than a mediocre design launched at the right moment. Click any dimension to see how to assess it and the red flag that should make you pause.</p>
        </ScrollReveal>

        <div className="phase-list">
          {timingDimensions.map((d, i) => (
            <ScrollReveal key={d.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeDimension === d.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveDimension(activeDimension === d.id ? null : d.id)}
              >
                <span className="phase-card-pillar">{d.num} &mdash; {d.name}</span>
                <span className="phase-card-name">{d.summary}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {activeDimension && (
        <section className="article-section dimension-detail">
          {timingDimensions.filter(d => d.id === activeDimension).map(d => (
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
                  <h3 className="detail-block-title">How to Assess This Dimension</h3>
                  <ExpandableGuidance items={d.guidance} />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">Red Flag</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{d.redFlag}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* WHY TIMING FAILS */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Why Organisations Get Timing Wrong</h2>
          <p className="article-section-desc">There are predictable reasons why restructures are launched at the wrong time. Understanding these patterns helps organisations avoid repeating them.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="detail-block">
            <h3 className="detail-block-title">The Urgency Trap</h3>
            <p className="detail-body">When an organisation is struggling, leadership feels pressure to act. Restructuring feels like action. It is visible, decisive, and signals to the board and the market that something is being done. But urgency is not the same as readiness. Launching a restructure because something must be done often produces a restructure that makes things worse before anything gets better. The discipline is to distinguish between the need for action and the need for structural change. They are not the same thing.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={160}>
          <div className="detail-block">
            <h3 className="detail-block-title">The New Leader Impulse</h3>
            <p className="detail-body">New leaders restructure. It is one of the most consistent patterns in organisational life. A new CEO, a new division head, a new board chair arrives and within months announces a restructure. The impulse is understandable: they want to put their stamp on the organisation, signal a new direction, and create a structure that reflects their priorities. But restructuring before understanding the organisation produces structures based on assumptions rather than evidence. The most effective leaders resist the impulse to restructure immediately and invest their first six to twelve months in understanding what actually needs to change.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={240}>
          <div className="detail-block">
            <h3 className="detail-block-title">The Fatigue Blindspot</h3>
            <p className="detail-body">Senior leaders often underestimate change fatigue because they experience change differently from the rest of the organisation. For leaders, a restructure is a strategic decision they are making. For everyone else, it is a disruption that is happening to them. Leaders who have been through multiple restructures and emerged with their positions intact may not recognise that the workforce has been through the same number of restructures and is exhausted. The result is a leadership team that sees a fresh start where the organisation sees another round of upheaval.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* SELF-CHECK */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is the Timing Right for Your Restructure?</h2>
          <p className="article-section-desc">Use this checklist to assess whether the conditions for a successful restructure are in place. Each item represents a timing condition that, if absent, significantly increases the risk of failure. Be honest. The cost of launching at the wrong time is far greater than the cost of waiting.</p>
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
                {checkedCount} of {checkItems.length} conditions met
                {checkedCount === checkItems.length && (
                  <span className="check-complete"> &mdash; Timing conditions are strong. The restructure has a credible foundation for success.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Most conditions are in place. Address the gaps before committing to a launch date.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Significant timing risks. Consider delaying until more conditions are met.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; The timing conditions are not in place. Launching now carries a high probability of failure.</span>
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
