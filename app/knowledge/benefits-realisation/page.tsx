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

interface MaturityDimension {
  id: string;
  name: string;
  description: string;
  levels: [string, string, string, string];
}

/* ------------------------------------------------------------------ */
/*  Data: Why Benefits Plans Fail                                      */
/* ------------------------------------------------------------------ */

const failureReasons: ActionItem[] = [
  {
    text: "The benefits case was written to secure funding, not to guide delivery",
    detail:
      "Most business cases are advocacy documents. They are designed to get the project approved, not to provide a realistic basis for tracking value. The benefits are inflated, the assumptions are optimistic, and the timelines are compressed. When the project is approved, nobody goes back to reconcile the approved case with what is actually achievable. The business case becomes a historical document rather than a living accountability framework.",
  },
  {
    text: "Nobody owns the benefits after the project closes",
    detail:
      "Projects have project managers. Programs have program directors. But benefits? Benefits are typically orphaned at project closure. The project team disbands, the program board stands down, and the benefits are assumed to materialise on their own. They do not. Benefits require active management: tracking, reporting, intervening when things drift, and adjusting plans when circumstances change. Without a named owner with authority and accountability, this management simply does not happen.",
  },
  {
    text: "Benefits are defined as outputs rather than outcomes",
    detail:
      "A new system going live is an output. People using the system differently is an outcome. The organisation saving money or serving customers faster is a benefit. Most benefits plans confuse these three things. They list outputs (system deployed, training completed, process documented) and label them as benefits. This means the plan is technically complete the moment the project delivers, regardless of whether any value has been realised.",
  },
  {
    text: "No baseline was established before the change began",
    detail:
      "You cannot measure improvement if you do not know where you started. Yet many programs launch without establishing credible baselines for the metrics they claim to be improving. Six months after go-live, when someone asks whether the change delivered value, there is no data to compare against. The result is anecdote, opinion, and assumption rather than evidence.",
  },
  {
    text: "The tracking period is too short",
    detail:
      "Most benefits realise over 12 to 24 months after the change is embedded. But most project governance structures close within weeks of go-live. The result is a gap: the period when benefits should be tracked has no governance structure, no reporting mechanism, and no accountability. The benefits may eventually materialise, but nobody is in a position to know whether they did.",
  },
  {
    text: "Benefits are treated as a compliance exercise rather than a management tool",
    detail:
      "In many organisations, benefits tracking exists because the PMO or finance function requires it. A spreadsheet is completed at project initiation, updated at stage gates, and filed at closure. It is never used to make decisions, challenge assumptions, or redirect effort. When benefits tracking is compliance rather than management, it produces paperwork rather than insight.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Outputs vs Outcomes vs Benefits                              */
/* ------------------------------------------------------------------ */

const taxonomy = [
  {
    label: "Output",
    colour: "#6B7280",
    definition: "What the project delivers",
    description:
      "Outputs are the tangible deliverables of the project. A new IT system, a restructured team, a redesigned process, a training program. Outputs are within the direct control of the project team. They can be planned, scheduled, and measured with precision. But an output is not a benefit. It is a necessary precondition for a benefit.",
    examples: [
      "New CRM system deployed across all regions",
      "Revised operating procedures documented and distributed",
      "All managers completed the two-day leadership program",
      "New organisational structure implemented",
    ],
  },
  {
    label: "Outcome",
    colour: "#B8860B",
    definition: "How behaviour or capability changes",
    description:
      "Outcomes are the changes in behaviour, capability, or practice that result from the outputs. They sit between what the project delivers and the value the organisation receives. Outcomes require people to do something differently. They are not within the direct control of the project team, which is why they are harder to guarantee and why so many benefits plans skip them entirely.",
    examples: [
      "Sales teams use the new CRM for all customer interactions",
      "Managers apply the revised procedures consistently",
      "Leaders hold structured monthly performance conversations",
      "Cross-functional teams collaborate through the new structure",
    ],
  },
  {
    label: "Benefit",
    colour: "#2E6B4F",
    definition: "The measurable value the organisation receives",
    description:
      "Benefits are the measurable improvements in organisational performance that result from the outcomes. They are the reason the change was funded. Benefits take time to materialise because they depend on sustained behaviour change, not just project completion. A benefit is only real when it can be evidenced with data, not just claimed in a report.",
    examples: [
      "15% increase in sales conversion rate within 18 months",
      "20% reduction in processing errors within 12 months",
      "Employee engagement scores improve by 8 points over two years",
      "Customer complaint volumes reduce by 30% within 18 months",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Designing a Plan That Survives Project Closure               */
/* ------------------------------------------------------------------ */

const planElements: ActionItem[] = [
  {
    text: "Define each benefit with a clear measurement method and a specific target",
    detail:
      "Every benefit in the plan needs four things: a plain-language description of what will improve, the metric that will evidence it, the current baseline, and the target value with a date. If any of these four elements is missing, the benefit is not trackable. A benefit described as 'improved efficiency' with no metric, no baseline, and no target is not a benefit. It is a hope.",
  },
  {
    text: "Map the causal chain from output to outcome to benefit",
    detail:
      "For each benefit, document the chain of causation. What does the project deliver? What behaviour change does that enable? What business result does that behaviour change produce? This chain makes the assumptions explicit. If the chain relies on an assumption that is unrealistic (for example, that all managers will voluntarily adopt a new process without reinforcement), the plan can be challenged and strengthened before delivery begins.",
  },
  {
    text: "Assign a named benefits owner for every benefit who sits outside the project team",
    detail:
      "The benefits owner must be a senior person in the business, not the project. They must have the authority to influence the conditions that enable the benefit, the accountability to report on progress, and the commitment to sustain tracking after the project closes. The benefits owner should sign off on the benefits plan and accept accountability formally, not be assigned the role without their knowledge or consent.",
  },
  {
    text: "Establish baselines before the change begins, not after",
    detail:
      "Baseline measurement must happen before the project changes anything. Once the change is underway, the baseline is contaminated. For each benefit, identify the data source, collect the baseline data, and document any limitations. If a baseline cannot be established (because the data does not exist or is unreliable), this should be flagged as a risk and alternative measurement approaches should be agreed.",
  },
  {
    text: "Build a tracking schedule that extends 12 to 24 months beyond go-live",
    detail:
      "The tracking schedule should specify when each benefit will be measured, by whom, and reported to which governance body. This schedule must extend well beyond project closure. A quarterly benefits review for 18 months after go-live is a reasonable starting point. The schedule should be embedded in business-as-usual governance, not dependent on a project structure that will no longer exist.",
  },
  {
    text: "Design an escalation path for benefits that are not materialising",
    detail:
      "The plan must include what happens when a benefit is off track. Who is informed? What authority do they have to intervene? What corrective actions are available? Without an escalation path, benefits reviews become reporting exercises with no consequence. The organisation learns that benefits are off track but has no mechanism to do anything about it.",
  },
  {
    text: "Include dis-benefits and ensure they are monitored alongside benefits",
    detail:
      "Every change creates dis-benefits: things that get worse as a result of the change. Increased workload during transition, temporary reduction in productivity, loss of institutional knowledge. Honest benefits plans acknowledge dis-benefits, estimate their impact, and track them. Ignoring dis-benefits does not make them disappear. It makes the benefits plan less credible.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Who Should Own Benefits Tracking                             */
/* ------------------------------------------------------------------ */

const ownershipRoles = [
  {
    role: "Executive Sponsor",
    responsibility: "Accountable for the overall benefits case being delivered",
    what: "The executive sponsor does not track benefits day to day. They ensure that benefits tracking is happening, that the results are reported to the right governance body, and that corrective action is taken when benefits are off track. They are the escalation point when a benefits owner cannot resolve an issue within their authority.",
    mistake:
      "Delegating all benefits accountability to the project manager and never asking about benefits after go-live.",
  },
  {
    role: "Benefits Owner (Business)",
    responsibility: "Owns specific benefits and is accountable for their realisation",
    what: "Each significant benefit should have a named owner in the business who accepts accountability for creating the conditions in which the benefit can materialise. This means sustaining behaviour change, maintaining process discipline, and continuing to invest management attention after the project team leaves. The benefits owner reports on progress and raises issues that threaten realisation.",
    mistake:
      "Assigning benefits ownership to someone who does not have the authority or the capacity to influence the conditions that enable the benefit.",
  },
  {
    role: "PMO or Change Team",
    responsibility: "Maintains the tracking framework and facilitates reviews",
    what: "The PMO or change team provides the infrastructure: the tracking tools, the reporting templates, the review schedule, and the data collection. They do not own the benefits. They enable the benefits owners to track and report on them. They also provide the analytical capability to identify trends, flag risks, and recommend interventions.",
    mistake:
      "Allowing the PMO to become the de facto benefits owner because nobody else is willing to accept accountability.",
  },
  {
    role: "Finance",
    responsibility: "Validates financial benefits and ensures they flow through to budgets",
    what: "Finance plays a critical role in benefits realisation by validating that claimed financial benefits are real and that they are reflected in budgets. A benefit that is claimed but not reflected in a reduced budget or increased revenue target has not been realised. It has been reported. Finance provides the rigour that prevents benefits from being double-counted, inflated, or claimed without evidence.",
    mistake:
      "Only involving finance at the start (to approve the business case) and at the end (to audit the result), rather than throughout the tracking period.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Benefits Tracking Maturity Assessment                        */
/* ------------------------------------------------------------------ */

const maturityDimensions: MaturityDimension[] = [
  {
    id: "clarity",
    name: "Clarity of Expected Benefits",
    description: "How clearly are the expected benefits defined?",
    levels: [
      "Benefits are described in vague terms like 'improved efficiency' or 'better customer experience' with no specific metrics or targets.",
      "Benefits are listed with some metrics but targets are aspirational rather than evidence-based. The link between project deliverables and benefits is assumed rather than mapped.",
      "Each benefit has a clear metric, a specific target, and a defined measurement method. The causal chain from output to outcome to benefit is documented.",
      "Benefits are defined with precision, stress-tested against realistic assumptions, and validated by the business. Dis-benefits are also identified and tracked.",
    ],
  },
  {
    id: "baseline",
    name: "Baseline Measurement",
    description: "Do you have credible baselines to measure improvement against?",
    levels: [
      "No baselines exist. Improvement will be assessed based on perception or anecdote after the change.",
      "Some baselines exist but they are incomplete, outdated, or based on unreliable data sources.",
      "Baselines are established for all major benefits before the change begins, using credible and repeatable data sources.",
      "Baselines are comprehensive, validated by the business and finance, and include data quality assessments. Measurement methodology is documented and repeatable.",
    ],
  },
  {
    id: "cadence",
    name: "Tracking Cadence",
    description: "How often are benefits tracked and reported after go-live?",
    levels: [
      "Benefits are not tracked after project closure. The business case is filed and never revisited.",
      "Benefits are reviewed once, typically at a post-implementation review 3 to 6 months after go-live, then never again.",
      "Benefits are tracked quarterly for at least 12 months after go-live, with formal reporting to a governance body.",
      "Benefits are tracked on a defined schedule for 18 to 24 months, with real-time dashboards, quarterly reviews, and annual reconciliation against the original business case.",
    ],
  },
  {
    id: "ownership",
    name: "Ownership of Benefits",
    description: "Who is accountable for benefits being realised?",
    levels: [
      "Nobody is explicitly accountable. The project team assumed the benefits would happen after delivery.",
      "The project manager or PMO tracks benefits, but no business leader has accepted personal accountability.",
      "Named benefits owners exist in the business for each major benefit, with formal accountability and reporting obligations.",
      "Benefits owners are senior business leaders who actively manage realisation, have authority to intervene, and are held accountable through performance management and governance.",
    ],
  },
  {
    id: "connection",
    name: "Connection to Performance",
    description: "Are benefits linked to organisational performance management?",
    levels: [
      "Benefits exist only in the business case document. They are not connected to any operational or performance framework.",
      "Benefits are referenced in project reporting but are not linked to business unit targets or individual performance objectives.",
      "Key benefits are reflected in business unit targets and operational KPIs. Progress is visible alongside other performance data.",
      "Benefits are fully integrated into performance management. They appear in business unit scorecards, are linked to individual objectives for benefits owners, and are reconciled against budgets by finance.",
    ],
  },
];

const maturityLabels = [
  {
    level: "Ad Hoc",
    range: [0, 5],
    description:
      "Your organisation has no systematic approach to benefits realisation. Benefits are assumed rather than managed. The investment case is approved but never validated. This is the most common state and the primary reason that change investments fail to deliver their intended value.",
  },
  {
    level: "Emerging",
    range: [6, 10],
    description:
      "Some elements of benefits management are in place, but they are inconsistent and incomplete. Benefits are defined but not rigorously tracked. Ownership exists on paper but not in practice. The foundation is there, but it needs strengthening to be effective.",
  },
  {
    level: "Established",
    range: [11, 15],
    description:
      "Benefits management is systematic and embedded. Benefits are clearly defined, baselines exist, tracking continues after project closure, and named owners are accountable. The organisation can evidence whether its change investments are delivering value.",
  },
  {
    level: "Optimised",
    range: [16, 20],
    description:
      "Benefits management is a strategic capability. It informs investment decisions, shapes program design, and is integrated into performance management. The organisation learns from every benefits review and applies those lessons to future investments.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Case Studies                                                 */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "NHS NPfIT",
    headline:
      "The NHS National Program for IT spent over 10 billion pounds with only a fraction of intended benefits realised",
    hook: "The largest civilian IT program in history became a case study in what happens when benefits realisation is an afterthought.",
    dimension: "Benefits Failure",
    body: [
      "In 2002, the UK government launched the National Program for IT in the NHS (NPfIT) with an initial budget of 6.2 billion pounds. The program aimed to digitise healthcare records, enable electronic prescriptions, and connect every NHS organisation through a single IT infrastructure. The projected benefits were enormous: safer patient care, faster information sharing, and significant efficiency savings across the entire health service.",
      "The program was dismantled in 2011. By that point, costs had escalated to over 10 billion pounds. The UK Public Accounts Committee reported that estimated benefits to March 2012 were just 3.7 billion pounds, roughly half of the costs incurred to that point. The Committee described it as one of the worst and most expensive contracting fiascos in public sector history.",
      "The benefits failure was structural, not incidental. The business case was built on top-down assumptions about how clinicians would work with the new systems, without adequate engagement with the people who would need to change their behaviour. Benefits were defined at the national level but depended on local adoption patterns that varied enormously. There was no systematic mechanism for tracking whether local organisations were realising the benefits that justified the national investment.",
      "Critically, the program focused on outputs (systems deployed, organisations connected) rather than outcomes (clinicians using systems effectively, patient care improving). When systems were delivered but not adopted, the program could claim delivery but not value. The gap between output and benefit was never bridged because the benefits plan was designed for approval, not for management.",
    ],
    lesson:
      "The NHS NPfIT demonstrates that the scale of the investment does not compensate for the absence of benefits management. A 10 billion pound program with no credible mechanism for tracking whether benefits are materialising is simply a very expensive way to produce outputs that may or may not create value.",
    source:
      "https://publications.parliament.uk/pa/cm201314/cmselect/cmpubacc/294/294.pdf",
    sourceLabel: "UK Parliament Public Accounts Committee",
  },
  {
    label: "Symcor",
    headline:
      "Symcor saved over 70 million Canadian dollars by implementing benefits realisation management and cancelling projects that could not evidence value",
    hook: "They stopped treating project cancellation as failure and started treating it as discipline.",
    dimension: "Benefits Success",
    body: [
      "Symcor, a joint venture owned by three of Canada's largest financial institutions, found itself in a familiar position: too many projects, inconsistent delivery, and no reliable way to know whether the investment was generating value. The organisation was spending significant capital on projects but could not demonstrate which ones were delivering their intended benefits.",
      "In response, Symcor established an Enterprise Project Office and implemented a comprehensive benefits realisation management framework. Every project was required to define its benefits clearly, establish baselines, assign business owners, and track realisation over time. Projects that could not demonstrate a credible return on investment were identified and cancelled.",
      "The result was dramatic. Symcor cancelled more than 80 projects that had poor or no return on investment, saving the company over 70 million Canadian dollars. But the financial saving was only part of the story. The cultural shift was equally significant. The organisation moved from treating project cancellation as a sign of failure to recognising it as evidence of disciplined management.",
      "Symcor's CEO described the benefits realisation management process as underpinning all aspects of strategic success from a project perspective. The framework created a culture of accountability, discipline, and predictability. Investment decisions became evidence-based rather than opinion-based. The organisation could measure real, tangible success rather than relying on project completion as a proxy for value.",
    ],
    lesson:
      "Symcor demonstrates that benefits realisation management is not just about tracking. It is about decision-making. When you can evidence which investments are delivering value and which are not, you gain the ability to redirect resources from low-value activities to high-value ones. The 70 million dollars saved was not new money. It was money that was already being wasted.",
    source:
      "https://www.pmi.org/business-solutions/case-studies/benefits-realization-symcor",
    sourceLabel: "Project Management Institute",
  },
  {
    label: "UK NAO Research",
    headline:
      "The UK National Audit Office found that fewer than half of government programs could demonstrate that they had achieved their intended benefits",
    hook: "Across 73 billion pounds of program spending, the evidence for benefits realisation was consistently weak.",
    dimension: "Research Evidence",
    body: [
      "The UK National Audit Office (NAO) has conducted multiple reviews of benefits realisation across government programs, consistently finding that the public sector struggles to evidence whether its investments deliver value. Their research found that fewer than half of programs could demonstrate achievement of their intended benefits.",
      "The NAO identified several systemic problems. Benefits cases were often optimistic at the point of approval, with insufficient challenge to the assumptions. Baselines were frequently not established before the change began, making it impossible to measure improvement. Benefits ownership was unclear, with accountability typically sitting with the project team rather than the business. Once the project closed, tracking stopped.",
      "A particularly significant finding was the gap between claimed and evidenced benefits. Many programs reported benefits in their closure documents that could not be substantiated with data. Financial benefits were claimed that had not flowed through to budgets. Efficiency improvements were reported that had not reduced costs. The reporting system was producing numbers that did not reflect reality.",
      "The NAO recommended that organisations carry out benefits realisation management earlier, establish baselines before changes begin, ensure benefits are not treated as an add-on to the business case but are integral to it, develop better techniques for measuring non-financial benefits, and improve post-evaluation practice so that lessons are learned and applied to future investments.",
    ],
    lesson:
      "The NAO research demonstrates that benefits realisation failure is not an occasional problem. It is a systemic one. Across billions of pounds of investment, the most common finding is that organisations cannot evidence whether the money delivered the intended value. The solution is not better reporting. It is better management: clearer definitions, credible baselines, named owners, and tracking that extends beyond project closure.",
    source:
      "https://www.nao.org.uk/insights/benefits-realisation/",
    sourceLabel: "UK National Audit Office",
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable List Component                                          */
/* ------------------------------------------------------------------ */

function ExpandableList({ items }: { items: ActionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li
          key={i}
          className="detail-list-item"
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="detail-list-item-head">
            {item.text}
            <span
              className={`detail-list-item-toggle${openIndex === i ? " open" : ""}`}
            >
              &rsaquo;
            </span>
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
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BenefitsRealisation() {
  const [maturityScores, setMaturityScores] = useState<Record<string, number>>(
    {}
  );
  const [activeOwnership, setActiveOwnership] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  /* Maturity assessment helpers */
  const totalScore = Object.values(maturityScores).reduce((a, b) => a + b, 0);
  const answeredCount = Object.keys(maturityScores).length;
  const allAnswered = answeredCount === maturityDimensions.length;

  const currentMaturity = maturityLabels.find(
    (m) => totalScore >= m.range[0] && totalScore <= m.range[1]
  );

  /* Checklist */
  const checkItems = [
    {
      key: "defined",
      label:
        "Every benefit in our plan has a specific metric, a measurable target, and a date by which it should be realised",
    },
    {
      key: "chain",
      label:
        "We have mapped the causal chain from project output to behaviour change to business benefit for each item",
    },
    {
      key: "baseline",
      label:
        "Credible baselines have been established for all key metrics before the change began",
    },
    {
      key: "owner",
      label:
        "Every significant benefit has a named owner in the business who has accepted personal accountability",
    },
    {
      key: "tracking",
      label:
        "A tracking schedule extends at least 12 months beyond project closure with defined review points",
    },
    {
      key: "governance",
      label:
        "Benefits reporting is embedded in business-as-usual governance, not dependent on the project structure",
    },
    {
      key: "escalation",
      label:
        "There is a defined escalation path for benefits that are not materialising on schedule",
    },
    {
      key: "finance",
      label:
        "Finance has validated the financial benefits and confirmed they are reflected in budgets or targets",
    },
    {
      key: "disbenefits",
      label:
        "Dis-benefits have been identified, estimated, and are being tracked alongside benefits",
    },
    {
      key: "lessons",
      label:
        "Lessons from previous benefits reviews are being applied to improve the plan for future investments",
    },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      {/* ------------------------------------------------------------ */}
      {/*  Header                                                       */}
      {/* ------------------------------------------------------------ */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">
          &larr; Back to Knowledge Hub
        </Link>
        <ScrollReveal direction="up">
          <span className="article-label">
            Execution &middot; Adoption Metrics
          </span>
          <h1 className="article-title">
            Benefits realisation planning: how to track whether change delivers
            its intended value
          </h1>
          <p className="article-intro">
            Adoption metrics tell you whether people changed their behaviour.
            Benefits realisation tells you whether that behaviour change produced
            the value that justified the investment. Most organisations are
            reasonably good at the first and remarkably poor at the second. The
            business case promises millions in savings, efficiency gains, or
            revenue growth. The project delivers. The team disbands. And nobody
            ever goes back to check whether the promised value materialised.
            Benefits realisation planning is the discipline of designing that
            accountability before the project starts, sustaining it after the
            project ends, and being honest about what the evidence shows.
          </p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
        <div className="article-main">
          {/* -------------------------------------------------------- */}
          {/*  Why Benefits Plans Fail                                  */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Why Benefits Realisation Plans Fail
              </h2>
              <p className="article-section-desc">
                The majority of organisations have a benefits realisation
                process. Very few have one that works. The UK National Audit
                Office found that fewer than half of government programs could
                demonstrate achievement of their intended benefits. In the
                private sector, the picture is no better. The problem is rarely
                that benefits were not defined. It is that the definitions were
                not rigorous enough, the tracking was not sustained long enough,
                and nobody was accountable enough. Click any reason to understand
                the mechanism behind the failure.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <ExpandableList items={failureReasons} />
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------- */}
          {/*  Outputs vs Outcomes vs Benefits                          */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Outputs, Outcomes, and Benefits: The Distinction That Matters
              </h2>
              <p className="article-section-desc">
                The single most important concept in benefits realisation is the
                distinction between outputs, outcomes, and benefits. Most plans
                conflate them. The project delivers an output. The output enables
                an outcome. The outcome produces a benefit. Each step in this
                chain requires different conditions, different owners, and
                different timescales. Confusing them is the root cause of most
                benefits tracking failures.
              </p>
            </ScrollReveal>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "24px",
              }}
            >
              {taxonomy.map((t, i) => (
                <ScrollReveal key={t.label} direction="up" delay={i * 100}>
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "32px",
                      borderLeft: `4px solid ${t.colour}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase" as const,
                          color: t.colour,
                        }}
                      >
                        {t.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ui)",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          color: "var(--muted)",
                        }}
                      >
                        {t.definition}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--body)",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "var(--fg)",
                        marginBottom: "16px",
                      }}
                    >
                      {t.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {t.examples.map((ex, j) => (
                        <span
                          key={j}
                          style={{
                            fontFamily: "var(--body)",
                            fontSize: "13px",
                            lineHeight: 1.6,
                            color: "var(--muted)",
                            paddingLeft: "16px",
                            borderLeft: `2px solid ${t.colour}33`,
                          }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal direction="up" delay={350}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontFamily: "var(--ui)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>Output</span>
                  <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                    &rarr;
                  </span>
                  <span style={{ color: "#B8860B" }}>Outcome</span>
                  <span style={{ color: "var(--muted)", fontSize: "16px" }}>
                    &rarr;
                  </span>
                  <span style={{ color: "#2E6B4F" }}>Benefit</span>
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 400,
                      fontSize: "11px",
                      marginLeft: "8px",
                    }}
                  >
                    The project controls the first. The organisation must deliver
                    the rest.
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/*  Designing a Plan That Survives Project Closure            */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                How to Design a Benefits Plan That Survives Project Closure
              </h2>
              <p className="article-section-desc">
                The critical test of a benefits realisation plan is not whether
                it is complete at project initiation. It is whether it is still
                being used 12 months after the project closes. Most plans fail
                this test because they are designed for project governance, not
                business governance. The following elements are what distinguish
                a plan that survives from one that is filed and forgotten.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <ExpandableList items={planElements} />
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------- */}
          {/*  Who Should Own Benefits Tracking                         */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Who Should Own Benefits Tracking
              </h2>
              <p className="article-section-desc">
                The question of ownership is where most benefits realisation
                plans break down. Not because ownership is undefined, but
                because it is assigned to the wrong people or accepted without
                genuine commitment. Benefits tracking requires four distinct
                roles, each with a different purpose. Click any role to see what
                it involves and the most common mistake.
              </p>
            </ScrollReveal>

            <div className="phase-list">
              {ownershipRoles.map((r, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 60}>
                  <button
                    className={`phase-card${activeOwnership === i ? " phase-card-active" : ""}`}
                    onClick={() =>
                      setActiveOwnership(activeOwnership === i ? null : i)
                    }
                  >
                    <span className="phase-card-pillar">{r.role}</span>
                    <span className="phase-card-name">{r.responsibility}</span>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            {activeOwnership !== null && (
              <ScrollReveal direction="up">
                <div className="phase-compare" style={{ marginTop: "4px" }}>
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">What This Looks Like</span>
                    <p className="phase-compare-text">
                      {ownershipRoles[activeOwnership].what}
                    </p>
                  </div>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">
                      The Most Common Mistake
                    </span>
                    <p className="phase-compare-text">
                      {ownershipRoles[activeOwnership].mistake}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </section>

          {/* -------------------------------------------------------- */}
          {/*  Maturity Assessment (Interactive)                        */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Benefits Tracking Maturity Assessment
              </h2>
              <p className="article-section-desc">
                Assess your organisation&rsquo;s current maturity across five
                dimensions. For each dimension, select the level that most
                accurately describes your current state. This is not a test. It
                is a diagnostic. The value is in the honest assessment, not the
                score.
              </p>
            </ScrollReveal>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                marginTop: "24px",
              }}
            >
              {maturityDimensions.map((dim, dIdx) => (
                <ScrollReveal key={dim.id} direction="up" delay={dIdx * 80}>
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "28px 32px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--heading)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "var(--fg)",
                        marginBottom: "4px",
                      }}
                    >
                      {dim.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--body)",
                        fontSize: "13px",
                        color: "var(--muted)",
                        marginBottom: "16px",
                      }}
                    >
                      {dim.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "10px",
                      }}
                    >
                      {dim.levels.map((level, lIdx) => {
                        const score = lIdx + 1;
                        const isSelected = maturityScores[dim.id] === score;
                        const levelLabels = [
                          "Ad Hoc",
                          "Emerging",
                          "Established",
                          "Optimised",
                        ];
                        return (
                          <button
                            key={lIdx}
                            onClick={() =>
                              setMaturityScores((prev) => ({
                                ...prev,
                                [dim.id]: score,
                              }))
                            }
                            style={{
                              background: isSelected
                                ? "var(--navy)"
                                : "var(--bg)",
                              color: isSelected ? "#fff" : "var(--fg)",
                              border: isSelected
                                ? "2px solid var(--gold)"
                                : "1px solid var(--border)",
                              borderRadius: "8px",
                              padding: "14px 16px",
                              textAlign: "left",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--ui)",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase" as const,
                                color: isSelected
                                  ? "var(--gold)"
                                  : "var(--muted)",
                                marginBottom: "6px",
                              }}
                            >
                              Level {score}: {levelLabels[lIdx]}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--body)",
                                fontSize: "12px",
                                lineHeight: 1.5,
                                color: isSelected
                                  ? "rgba(255,255,255,0.85)"
                                  : "var(--muted)",
                              }}
                            >
                              {level}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Maturity Result */}
            {allAnswered && currentMaturity && (
              <ScrollReveal direction="up">
                <div
                  style={{
                    marginTop: "32px",
                    background: "var(--navy)",
                    borderRadius: "12px",
                    padding: "32px",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--heading)",
                        fontSize: "36px",
                        fontWeight: 700,
                        color: "var(--gold)",
                      }}
                    >
                      {totalScore}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      out of 20
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--heading)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    Your maturity level: {currentMaturity.level}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: "20px",
                    }}
                  >
                    {currentMaturity.description}
                  </p>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      height: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(totalScore / 20) * 100}%`,
                        background: "var(--gold)",
                        borderRadius: "8px",
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      fontFamily: "var(--ui)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    <span>Ad Hoc</span>
                    <span>Emerging</span>
                    <span>Established</span>
                    <span>Optimised</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </section>

          {/* -------------------------------------------------------- */}
          {/*  Self-Check Checklist                                     */}
          {/* -------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Is Your Benefits Plan Robust Enough?
              </h2>
              <p className="article-section-desc">
                Use this checklist to assess whether your benefits realisation
                plan will survive contact with reality. Each item represents a
                condition that, if absent, significantly reduces the probability
                of benefits being tracked and realised.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="self-check">
                {checkItems.map((item) => (
                  <label key={item.key} className="check-item">
                    <input
                      type="checkbox"
                      checked={!!checklist[item.key]}
                      onChange={() =>
                        setChecklist((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
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
                      style={{
                        width: `${(checkedCount / checkItems.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="check-score">
                    {checkedCount} of {checkItems.length} complete
                    {checkedCount === checkItems.length && (
                      <span className="check-complete">
                        {" "}
                        &mdash; Your benefits plan has the structural elements
                        needed to survive project closure and deliver
                        accountability.
                      </span>
                    )}
                    {checkedCount >= 7 && checkedCount < checkItems.length && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Strong foundation. Close the remaining gaps
                        before the project team disbands.
                      </span>
                    )}
                    {checkedCount >= 4 && checkedCount < 7 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Significant gaps remain. The plan may not survive
                        project closure in its current form.
                      </span>
                    )}
                    {checkedCount > 0 && checkedCount < 4 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; The benefits plan needs substantial
                        strengthening. Benefits are unlikely to be tracked
                        effectively after go-live.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------- */}
          {/*  CTA                                                      */}
          {/* -------------------------------------------------------- */}
          <section className="article-section article-cta">
            <ScrollReveal direction="up">
              <p className="article-cta-text">
                This topic is part of <strong>Execution</strong>, the fourth
                pillar of the TCA Change Model. Benefits realisation sits between
                adoption metrics and sustainment, bridging the gap between
                behaviour change and business value.
              </p>
              <Link href="/knowledge" className="btn">
                Explore the Full Model
              </Link>
            </ScrollReveal>
          </section>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Sidebar                                                     */}
        {/* ------------------------------------------------------------ */}
        <aside className="article-sidebar">
          <div className="sidebar-sticky">
            <span className="case-sidebar-heading">Enterprise Examples</span>
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={i} direction="right" delay={i * 120}>
                <button
                  className="case-teaser"
                  onClick={() => setActiveCaseStudy(i)}
                >
                  <span className="case-teaser-label">{cs.dimension}</span>
                  <span className="case-teaser-headline">{cs.headline}</span>
                  <span className="case-teaser-hook">{cs.hook}</span>
                  <span className="case-teaser-read">
                    Read the full story &rarr;
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </aside>
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  Case Study Modal                                             */}
      {/* ------------------------------------------------------------ */}
      {activeCaseStudy !== null && (
        <div
          className="modal-overlay open"
          onClick={(e) =>
            e.target === e.currentTarget && setActiveCaseStudy(null)
          }
        >
          <div className="modal case-study-modal">
            <button
              className="modal-close"
              onClick={() => setActiveCaseStudy(null)}
            >
              &times;
            </button>
            <span className="case-study-label">
              {caseStudies[activeCaseStudy].label}
            </span>
            <span className="case-study-dimension">
              {caseStudies[activeCaseStudy].dimension}
            </span>
            <h2 className="case-study-modal-title">
              {caseStudies[activeCaseStudy].headline}
            </h2>
            {caseStudies[activeCaseStudy].body.map((p, i) => (
              <p key={i} className="case-study-modal-body">
                {p}
              </p>
            ))}
            <div className="case-study-lesson">
              <span className="case-study-lesson-label">The lesson</span>
              <p>{caseStudies[activeCaseStudy].lesson}</p>
            </div>
            <a
              href={caseStudies[activeCaseStudy].source}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-source"
            >
              Source: {caseStudies[activeCaseStudy].sourceLabel} &rarr;
            </a>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
