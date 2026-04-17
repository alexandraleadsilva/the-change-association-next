"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  DIAGNOSTIC: Technology vs People Readiness                        */
/* ------------------------------------------------------------------ */

interface ReadinessDimension {
  id: string;
  name: string;
  question: string;
  techReady: string;
  peopleReady: string;
}

const readinessDimensions: ReadinessDimension[] = [
  {
    id: "input",
    name: "End-User Input",
    question: "Were the people who will use this system every day involved in designing how it works?",
    techReady: "Requirements were gathered from process owners and technical architects. End users will be trained after go-live.",
    peopleReady: "Frontline users co-designed key workflows. Their feedback shaped configuration decisions before development began.",
  },
  {
    id: "data",
    name: "Data Readiness",
    question: "Is the data that feeds the new system clean, understood, and owned by someone accountable?",
    techReady: "Data migration scripts are written and tested. Technical validation is complete. The cutover plan is on schedule.",
    peopleReady: "Business owners have reviewed migrated data for accuracy. People who use the data daily have confirmed it makes sense in context.",
  },
  {
    id: "process",
    name: "Process Alignment",
    question: "Have business processes been redesigned to fit the new system, or has the system been bent to fit old processes?",
    techReady: "The system is configured and customisations are documented. Gaps between old and new processes are listed in the backlog.",
    peopleReady: "Teams have walked through their new processes end to end. They understand what changes, why it changes, and what the transition period looks like.",
  },
  {
    id: "training",
    name: "Training Depth",
    question: "Does training teach people how to do their jobs differently, or just how to click buttons in a new interface?",
    techReady: "Training materials cover system navigation, data entry screens, and transaction codes. E-learning modules are available.",
    peopleReady: "Training is role-based and scenario-driven. People practise realistic tasks in a sandbox. Managers are trained to coach their teams through the transition.",
  },
  {
    id: "support",
    name: "Support Model",
    question: "When something goes wrong after go-live, do people know who to call and what to expect?",
    techReady: "A service desk is configured. Incident categories are defined. SLAs are documented.",
    peopleReady: "Floor-walkers and super-users are embedded in every affected team. Escalation paths are simple and known. There is a feedback loop to fix recurring issues quickly.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPANDABLE DETAIL ITEMS                                           */
/* ------------------------------------------------------------------ */

interface DetailItem {
  id: string;
  title: string;
  summary: string;
  body: string[];
}

const failurePatterns: DetailItem[] = [
  {
    id: "tech-first",
    title: "The technology-first mindset",
    summary: "Organisations treat digital transformation as a technology project with a people component, rather than a people project enabled by technology.",
    body: [
      "The most common pattern in failed digital transformations is a governance structure that centres on technology delivery. Steering committees track system milestones, integration testing, and go-live dates. People readiness is a line item in a status report, not a workstream with equal authority.",
      "This is not a criticism of technology teams. They deliver what they are asked to deliver. The problem is structural: when the programme is framed as a technology implementation, every decision defaults to what is technically optimal rather than what is humanly adoptable.",
      "The result is a system that works perfectly in a test environment and fails in the real world. Not because the code is wrong, but because the people who need to use it were never truly brought into the process of designing how it would fit into their working lives.",
    ],
  },
  {
    id: "training-gap",
    title: "Training that teaches buttons, not behaviours",
    summary: "Most ERP training programmes teach people how to navigate a new interface. Very few teach people how to do their jobs differently.",
    body: [
      "A typical ERP training programme consists of click-through guides, e-learning modules, and classroom sessions that walk users through transactions. This covers what the system does. It almost never covers why the process has changed, what judgement calls now need to be made differently, or what to do when the system does not behave as expected.",
      "The gap between knowing how to use a system and knowing how to work effectively with a system is enormous. A warehouse operative who can enter a goods receipt in SAP but does not understand why the receiving process has changed will default to old habits the moment pressure mounts.",
      "Effective training is role-based, scenario-driven, and iterative. It acknowledges that people learn by doing, not by watching. It gives them a safe environment to make mistakes before the stakes are real. And it equips managers to coach their teams through the transition, rather than pointing them to an e-learning portal.",
    ],
  },
  {
    id: "data-trust",
    title: "The hidden crisis of data trust",
    summary: "When migrated data is inaccurate, people lose trust in the entire system. Once trust is lost, workarounds proliferate and the system becomes a burden rather than a tool.",
    body: [
      "Data migration is treated as a technical exercise: extract, transform, load. The focus is on completeness and format compliance. What is rarely tested is whether the data makes sense to the people who will use it.",
      "When a procurement officer opens the new system and sees supplier records with wrong addresses, duplicate entries, or missing payment terms, they do not file a support ticket and wait. They open a spreadsheet. They build a workaround. And every workaround undermines the system it was designed to replace.",
      "Data readiness is not a technical milestone. It is a trust milestone. If the people who depend on the data do not trust it from day one, they will route around the system. And once those workarounds become embedded, the organisation has paid for an enterprise system that nobody fully uses.",
    ],
  },
  {
    id: "change-debt",
    title: "Accumulating change debt",
    summary: "Every shortcut taken during implementation becomes a debt that the workforce pays after go-live.",
    body: [
      "Change debt is the accumulation of unresolved people-side issues that are deferred during implementation. Incomplete process documentation. Untested exception-handling scenarios. Managers who were not given time to understand the new system before they were expected to support their teams through it.",
      "Each of these feels manageable in isolation. Project teams rationalise them as post-go-live optimisation items. But they compound. A team that encounters three or four unresolved issues in their first week on the new system does not see isolated problems. They see a broken system that was forced on them without proper preparation.",
      "Change debt is the reason why many ERP systems that are technically successful are operationally resisted. The system works. But the organisation around it was not ready, and the resulting friction becomes the dominant experience of the transformation.",
    ],
  },
  {
    id: "erp-halfway",
    title: "What happens when you lose the workforce halfway through",
    summary: "An ERP rollout can be technically flawless and still fail if the people who need to use it disengage during implementation.",
    body: [
      "Losing the workforce halfway through an ERP rollout is rarely a sudden event. It is a gradual erosion. People attend the training sessions but mentally check out. They nod in meetings but continue using their spreadsheets. They stop raising concerns because they have learned that concerns are treated as resistance.",
      "The warning signs are consistent across organisations: declining attendance at workshops, increasing reliance on super-users to do basic tasks, a growing gap between what the project team reports and what the operational reality looks like. By the time leadership recognises the pattern, the workforce has already decided that this is something being done to them, not with them.",
      "Recovery from this point is possible but expensive. It requires stopping, listening, and making visible changes based on what people say. It requires leaders to admit that the plan was not working and to demonstrate that feedback will lead to action. Most critically, it requires time, and time is the one thing most ERP programmes have already run out of.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  CASE STUDIES (sidebar + modal)                                    */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Lidl",
    headline: "How Lidl spent seven years and half a billion euros on SAP before walking away",
    hook: "They tried to make a world-class ERP system work like their legacy platform. It could not.",
    dimension: "Customisation Over Adaptation",
    body: [
      "In 2011, Lidl launched an ambitious project to replace its internally developed merchandise management system with SAP for Retail, powered by HANA. The project was codenamed eLWIS. The goal was to modernise the IT backbone of one of Europe's largest discount retailers and create a platform for global growth.",
      "The critical decision that defined the project's trajectory came early: rather than adapting Lidl's business processes to work within SAP's standard framework, the company chose to heavily customise SAP to replicate how the legacy system worked. One key example was inventory valuation. SAP's standard approach uses retail prices. Lidl insisted on retaining its practice of valuing inventory at purchase prices. This single decision cascaded into thousands of customisations.",
      "Over the seven years that followed, the project was plagued by executive turnover, unclear decision-making authority, and a widening gap between what the project team was building and what the business actually needed. Technical teams were left to make business-critical decisions without clear direction from leadership.",
      "In 2018, after spending approximately 500 million euros, Lidl abandoned the SAP implementation entirely. The company reverted to its legacy system, Wawi, and invested in modernising it instead. The eLWIS project became one of the most expensive ERP failures in European retail history.",
    ],
    lesson: "Lidl's failure was not a technology failure. It was a failure to confront the organisational change that a new system demands. When a company customises an enterprise system to avoid changing its processes, it pays for a transformation without getting one. The technology is new. Everything else stays the same, except the bill.",
    source: "https://www.panorama-consulting.com/lidl-erp-failure/",
    sourceLabel: "Panorama Consulting",
  },
  {
    label: "Hershey",
    headline: "When Hershey went live with SAP right before Halloween and lost $100 million in orders",
    hook: "They compressed a four-year implementation into two and a half. The system launched. The supply chain collapsed.",
    dimension: "Timeline Over Readiness",
    body: [
      "In 1996, Hershey Foods began a project to replace its legacy systems with an integrated suite of enterprise software: SAP for ERP, Manugistics for supply chain management, and Siebel for customer relationship management. The original plan called for a phased rollout over 48 months.",
      "Facing pressure from Y2K concerns, Hershey compressed the timeline to 30 months and chose a 'Big Bang' approach, deploying all three systems simultaneously rather than in phases. The project was already running behind schedule when leadership decided to go live in July 1999.",
      "July was the beginning of Hershey's peak season. Halloween and Christmas orders account for a disproportionate share of annual revenue, and the ramp-up begins in summer. Going live with an untested integrated system at the worst possible moment was a decision driven by project timeline, not business readiness.",
      "The consequences were immediate and severe. Order processing slowed dramatically. Shipments that should have taken days took weeks. Inventory management broke down. Retailers could not get the products they needed for the most important selling season of the year. Hershey missed over $100 million in orders. Revenue dropped 12 percent in the third quarter compared to the prior year. The stock price fell nearly 10 percent.",
    ],
    lesson: "Hershey's failure illustrates what happens when project timelines override people and operational readiness. The system was not adequately tested. Training was insufficient. Departments were in conflict. But the go-live date was treated as immovable. The technology launched on schedule. The business did not.",
    source: "https://www.panorama-consulting.com/hersheys-erp-failure/",
    sourceLabel: "Panorama Consulting",
  },
  {
    label: "Target Canada",
    headline: "How bad data and rushed training helped destroy Target's $5 billion Canadian expansion",
    hook: "Empty shelves, wrong prices, and 17,600 people who lost their jobs within two years.",
    dimension: "Speed Over Foundation",
    body: [
      "In 2013, Target opened 124 stores and three distribution centres across Canada in rapid succession. The US parent company's existing systems could not handle Canadian requirements such as bilingual labelling, metric measurements, and foreign currency. Rather than customising their proven US platform, Target chose to implement a new SAP system from scratch.",
      "The implementation was rushed. Accenture was brought in as lead consultant, but the timeline left almost no room for the kind of data validation and process testing that an implementation of this scale demands. Product data had to be entered manually for tens of thousands of items, with dozens of fields per product. Errors were rampant: dimensions entered in inches instead of centimetres, case-pack quantities that did not match reality, and product categories that made no sense.",
      "The warehouse management system and SAP were not communicating properly. Products that existed in the system did not arrive on shelves. Products that arrived could not be shelved because their recorded dimensions were wrong. Stores faced a paradox of empty shelves and overstocked back rooms simultaneously. Customers who came expecting the Target experience found barren aisles and wrong prices.",
      "Training was inadequate. New employees received only a few weeks of preparation. Managers lacked the institutional knowledge to troubleshoot problems. When issues arose, there was no effective support model, no super-users, no floor-walkers, no rapid feedback loop to fix the data errors that were poisoning the entire operation.",
    ],
    lesson: "Target Canada is a case study in what happens when every dimension of people readiness is sacrificed for speed. The data was wrong, so the shelves were empty. The training was thin, so nobody could fix the problems. The support model was absent, so issues compounded. The technology worked exactly as configured. It was configured with bad data by undertrained people operating without adequate support.",
    source: "https://canadianbusiness.com/ideas/the-last-days-of-target-canada/",
    sourceLabel: "Canadian Business",
  },
];

/* ------------------------------------------------------------------ */
/*  SELF-CHECK ITEMS                                                  */
/* ------------------------------------------------------------------ */

const checkItems = [
  { key: "users", label: "End users were involved in design decisions, not just consulted after the fact" },
  { key: "processes", label: "Business processes were redesigned before the system was configured, not after" },
  { key: "data", label: "Migrated data has been validated by the people who will use it, not just by the technical team" },
  { key: "training", label: "Training teaches people how their jobs change, not just how the new screens work" },
  { key: "managers", label: "Managers have been equipped to support their teams through the transition, not just informed of the timeline" },
  { key: "support", label: "A post-go-live support model exists that goes beyond a service desk and ticket queue" },
  { key: "feedback", label: "There is a visible feedback loop where user concerns lead to real changes" },
  { key: "readiness", label: "Go-live decisions are based on people readiness, not just technical readiness" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function ToolsAndSystems() {
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, "tech" | "people">>({});
  const [showDiagnosticResult, setShowDiagnosticResult] = useState(false);
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const allDiagnosticAnswered = Object.keys(diagnosticAnswers).length === readinessDimensions.length;
  const techCount = Object.values(diagnosticAnswers).filter(a => a === "tech").length;
  const peopleCount = Object.values(diagnosticAnswers).filter(a => a === "people").length;
  const peoplePercent = allDiagnosticAnswered ? Math.round((peopleCount / readinessDimensions.length) * 100) : 0;
  const techPercent = allDiagnosticAnswered ? Math.round((techCount / readinessDimensions.length) * 100) : 0;

  function getDiagnosticResult() {
    if (peoplePercent >= 80) return {
      title: "People-Ready",
      desc: "Your implementation is grounded in how people will actually experience the change. Technology delivery is supported by genuine human readiness. This is the foundation for sustainable adoption.",
    };
    if (peoplePercent >= 60) return {
      title: "Leaning People-Ready",
      desc: "You have strong foundations in people readiness, but there are areas where technical delivery is running ahead of human preparation. Review the dimensions where you chose the left column. Those are your risk areas.",
    };
    if (peoplePercent >= 40) return {
      title: "Balanced but Fragile",
      desc: "Your readiness is split. The technology may be on track, but half your workforce experience is unaddressed. This is the zone where implementations look healthy on dashboards but feel broken on the ground.",
    };
    if (peoplePercent >= 20) return {
      title: "Tech-Ready, People-Unready",
      desc: "Your implementation is technically progressing but the people who need to use the system are not ready. This is the most common pattern in digital transformation failures. The system will go live. Adoption will not.",
    };
    return {
      title: "Technology-Driven",
      desc: "Your implementation is entirely focused on technical delivery. People readiness is not being measured, managed, or prioritised. Without a course correction, you are building a system that will be technically complete and operationally resisted.",
    };
  }

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Enablement &middot; Tools &amp; Systems</span>
          <h1 className="article-title">Why digital transformations keep failing the people they are supposed to help</h1>
          <p className="article-intro">Digital transformations do not fail because the technology is wrong. They fail because the people who need to use the technology were never truly prepared for what it would demand of them. The pattern is consistent: organisations invest heavily in system selection, configuration, and technical testing while treating people readiness as an afterthought. The system goes live on schedule. Adoption does not. This article examines why that happens, what it looks like when a well-planned ERP rollout loses the workforce halfway through, and what organisations can do differently.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ---------------------------------------------------------- */}
      {/*  DIAGNOSTIC: Technology vs People Readiness                 */}
      {/* ---------------------------------------------------------- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Technology vs People Readiness</h2>
          <p className="article-section-desc">For each dimension, choose the statement that more accurately describes your current implementation. This diagnostic will reveal whether your programme is tech-ready but people-unready, the pattern behind most digital transformation failures.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="assessment-pairs">
            {readinessDimensions.map((dim) => (
              <div key={dim.id} className="pair-row">
                <span className="pair-theme">{dim.name}</span>
                <p style={{ fontSize: "0.97rem", color: "var(--mid)", margin: "0 0 10px" }}>{dim.question}</p>
                <div className="pair-options">
                  <button
                    className={`pair-option pair-option-manager${diagnosticAnswers[dim.id] === "tech" ? " pair-selected" : ""}`}
                    onClick={() => setDiagnosticAnswers(prev => ({ ...prev, [dim.id]: "tech" }))}
                  >
                    {dim.techReady}
                  </button>
                  <span className="pair-vs">or</span>
                  <button
                    className={`pair-option pair-option-leader${diagnosticAnswers[dim.id] === "people" ? " pair-selected" : ""}`}
                    onClick={() => setDiagnosticAnswers(prev => ({ ...prev, [dim.id]: "people" }))}
                  >
                    {dim.peopleReady}
                  </button>
                </div>
              </div>
            ))}

            {allDiagnosticAnswered && !showDiagnosticResult && (
              <button className="btn" style={{ marginTop: "28px" }} onClick={() => setShowDiagnosticResult(true)}>
                See My Readiness Profile
              </button>
            )}

            {showDiagnosticResult && (
              <div className="assessment-result">
                <div className="assessment-bar">
                  <div className="assessment-bar-manager" style={{ width: `${techPercent}%` }}>
                    <span>Tech {techCount}/{readinessDimensions.length}</span>
                  </div>
                  <div className="assessment-bar-leader" style={{ width: `${peoplePercent}%` }}>
                    <span>People {peopleCount}/{readinessDimensions.length}</span>
                  </div>
                </div>
                <h3 className="assessment-result-title">{getDiagnosticResult().title}</h3>
                <p className="assessment-result-desc">{getDiagnosticResult().desc}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  EXPANDABLE DETAIL ITEMS: Failure Patterns                  */}
      {/* ---------------------------------------------------------- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Where Digital Transformations Break Down</h2>
          <p className="article-section-desc">Every failed digital transformation shares a recognisable set of patterns. These are not technology problems. They are people problems that technology makes visible. Select each pattern to understand how it develops and why it matters.</p>
        </ScrollReveal>

        <div className="detail-list">
          {failurePatterns.map((item, i) => (
            <ScrollReveal key={item.id} direction="up" delay={i * 60}>
              <div className="detail-list-item">
                <button
                  className={`detail-list-toggle${expandedDetail === item.id ? " detail-list-toggle-active" : ""}`}
                  onClick={() => setExpandedDetail(expandedDetail === item.id ? null : item.id)}
                >
                  <span className="detail-list-title">{item.title}</span>
                  <span className="detail-list-arrow">{expandedDetail === item.id ? "\u2212" : "+"}</span>
                </button>
                <p className="detail-list-summary">{item.summary}</p>
                {expandedDetail === item.id && (
                  <div className="detail-list-body">
                    {item.body.map((paragraph, pi) => (
                      <p key={pi} className="detail-body">{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  NARRATIVE SECTION: The ERP Story                           */}
      {/* ---------------------------------------------------------- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">What Went Wrong When a Well-Planned ERP Rollout Lost the Workforce</h2>
          <p className="article-section-desc">The scenario is familiar to anyone who has lived through an enterprise system implementation. The programme was well-funded, the technology was proven, the consultants were experienced. And yet, somewhere between design and deployment, the people who mattered most stopped believing in it.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="detail-block" style={{ marginBottom: "20px" }}>
            <h3 className="detail-block-title">The pattern of disengagement</h3>
            <p className="detail-body">It starts with small signals. Workshop attendance drops. Questions in training sessions become less about how and more about why. Managers start hedging their language: &quot;we will see how this goes&quot; instead of &quot;this is how we are doing things now.&quot; Super-users report that colleagues are asking them to do basic tasks rather than learning the system themselves.</p>
            <p className="detail-body">These signals are easy to dismiss individually. But they are symptoms of a workforce that has mentally stepped back from the change. They have concluded, often correctly, that the system was designed without their input, that training does not reflect their real work, and that their concerns have been classified as resistance rather than treated as intelligence.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={120}>
          <div className="detail-block" style={{ marginBottom: "20px" }}>
            <h3 className="detail-block-title">Why well-planned programmes still lose people</h3>
            <p className="detail-body">The paradox of a well-planned ERP rollout that loses the workforce is that the planning itself can be the problem. When every milestone is technical, every status report is green, and every risk register focuses on system integration, the programme creates a false confidence. It looks like everything is on track because the only things being tracked are technical deliverables.</p>
            <p className="detail-body">People readiness does not fit neatly into a Gantt chart. You cannot measure it with test scripts. It shows up in how a warehouse operative feels about the new picking process, whether a finance team trusts the migrated data, and whether a regional manager believes the new system will help them or burden them. These things are real, measurable, and decisive, but they require different instruments than the ones most programmes use.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={160}>
          <div className="detail-block detail-block-warning">
            <h3 className="detail-block-title">The cost of recovery</h3>
            <p className="detail-body">Recovering a workforce that has disengaged from a system implementation is significantly more expensive than preparing them properly in the first place. It requires pausing deployment, which costs money and credibility. It requires listening to feedback that should have been gathered months earlier. It requires leaders to acknowledge publicly that the approach was not working, which many leadership teams are reluctant to do.</p>
            <p className="detail-body" style={{ marginBottom: 0 }}>The organisations that recover successfully share one trait: they treat the moment of recognition not as a failure but as a decision point. They stop measuring progress in technical milestones and start measuring it in human readiness. They give people genuine influence over how the system will work in their world. And they accept that the timeline will change, because the alternative is a system that launches on time and fails on adoption.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  SELF-CHECK CHECKLIST                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Implementation People-Ready?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your digital transformation is addressing the people-side foundations that determine whether a system is adopted or resisted.</p>
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
                  <span className="check-complete"> &mdash; Your implementation has the people-side foundations it needs for sustainable adoption.</span>
                )}
                {checkedCount >= 5 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Solid progress, but gaps remain. Address the unchecked items before go-live.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant people-readiness gaps. Your system may go live on time but fail on adoption.</span>
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
          <p className="article-cta-text">This topic is part of <strong>Enablement</strong>, the third pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ---------------------------------------------------------- */}
      {/*  SIDEBAR: Enterprise Examples                               */}
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
