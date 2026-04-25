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

interface Metric {
  id: string;
  name: string;
  correctAnswer: "leading" | "lagging";
  explanation: string;
}

interface AdoptionStage {
  id: string;
  num: string;
  name: string;
  question: string;
  description: string;
  metrics: ActionItem[];
  signal: string;
}

/* ------------------------------------------------------------------ */
/*  Data: Metrics Classifier                                           */
/* ------------------------------------------------------------------ */

const metricsData: Metric[] = [
  {
    id: "m1",
    name: "Number of people who completed training",
    correctAnswer: "leading",
    explanation: "Training completion signals that people have been exposed to the new way of working. It predicts future adoption but does not confirm it. Someone can complete training without ever applying what they learned.",
  },
  {
    id: "m2",
    name: "System login rates in the first 30 days",
    correctAnswer: "leading",
    explanation: "Early login rates indicate initial willingness to engage with the change. They predict whether adoption is likely to follow but do not tell you whether people are using the system effectively or correctly.",
  },
  {
    id: "m3",
    name: "Manager confidence scores from pulse surveys",
    correctAnswer: "leading",
    explanation: "Manager confidence is one of the strongest leading indicators. If managers do not feel confident in the change, they cannot support their teams through it. Low manager confidence predicts resistance and adoption failure weeks before it shows up in other data.",
  },
  {
    id: "m4",
    name: "Reduction in errors or rework after go-live",
    correctAnswer: "lagging",
    explanation: "Error reduction is a lagging indicator because it can only be measured after people have been using the new process for a sustained period. It confirms that adoption has occurred and that people are proficient, not just compliant.",
  },
  {
    id: "m5",
    name: "Employee sentiment towards the change",
    correctAnswer: "leading",
    explanation: "Sentiment measured early in the change lifecycle is a leading indicator. How people feel about the change predicts whether they will engage with it. Negative sentiment that is not addressed becomes active resistance.",
  },
  {
    id: "m6",
    name: "Percentage of processes completed using the new method",
    correctAnswer: "lagging",
    explanation: "This is a lagging indicator because it measures actual behaviour change. It tells you whether people have adopted the new way of working in practice, not just whether they intend to or have been trained to.",
  },
  {
    id: "m7",
    name: "Number of support tickets or help requests",
    correctAnswer: "leading",
    explanation: "An early spike in support tickets is a leading indicator. It tells you that people are trying to use the new system but encountering difficulties. High ticket volumes predict whether the current level of support is sufficient for adoption to succeed.",
  },
  {
    id: "m8",
    name: "Business outcome improvement (revenue, cost, speed)",
    correctAnswer: "lagging",
    explanation: "Business outcomes are the ultimate lagging indicator. They confirm that the change has been adopted and is delivering value, but they appear months after the change itself. Waiting for business outcomes to measure adoption is too late to intervene.",
  },
  {
    id: "m9",
    name: "Attendance at change champion briefings",
    correctAnswer: "leading",
    explanation: "Champion briefing attendance indicates engagement with the change network. High attendance suggests the champion model is working and predicts stronger peer-to-peer support during rollout. Low attendance is an early warning signal.",
  },
  {
    id: "m10",
    name: "Proficiency assessment scores at 90 days",
    correctAnswer: "lagging",
    explanation: "Proficiency scores measured after a sustained period confirm whether people can perform the new behaviours competently. This is a lagging indicator because it measures the outcome of the adoption process, not its likelihood.",
  },
  {
    id: "m11",
    name: "Number of workarounds or shadow processes detected",
    correctAnswer: "lagging",
    explanation: "Workarounds are a lagging indicator of adoption failure. They appear after people have tried the new process and found it inadequate. Each workaround represents a point where the intended change has not been adopted as designed.",
  },
  {
    id: "m12",
    name: "Leadership communication frequency about the change",
    correctAnswer: "leading",
    explanation: "How often leaders communicate about the change predicts how visible and important the change feels to the organisation. Declining communication frequency is a leading indicator that adoption momentum will stall.",
  },
  {
    id: "m13",
    name: "Stakeholder readiness assessment scores",
    correctAnswer: "leading",
    explanation: "Readiness scores measured before or during rollout are a leading indicator. They predict which groups will adopt smoothly and which will struggle, allowing targeted intervention before problems become entrenched.",
  },
  {
    id: "m14",
    name: "Customer satisfaction scores post-change",
    correctAnswer: "lagging",
    explanation: "Customer satisfaction is a lagging indicator because it reflects the downstream impact of internal adoption. It takes time for changed internal processes to affect the customer experience, making this a confirmation metric rather than a predictive one.",
  },
  {
    id: "m15",
    name: "Percentage of managers who can articulate the change rationale",
    correctAnswer: "leading",
    explanation: "If managers cannot explain why the change is happening, their teams will not understand it either. This is a powerful leading indicator because manager understanding is a prerequisite for team adoption. Measure this before rollout, not after.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Adoption Curve Stages                                        */
/* ------------------------------------------------------------------ */

const adoptionStages: AdoptionStage[] = [
  {
    id: "awareness",
    num: "01",
    name: "Awareness",
    question: "Do people know the change is happening?",
    description: "Awareness is the first and most basic stage. It seems simple but is frequently overestimated. Leaders assume that because a communication was sent, people are aware. In reality, awareness requires multiple touchpoints across multiple channels before it registers. At this stage you are measuring whether the message has landed, not whether people agree with it.",
    metrics: [
      { text: "Communication reach and open rates across all channels", detail: "Track not just whether emails were sent, but whether they were opened, and across which channels people actually received the message. A communication that reaches 95% of inboxes but is read by 30% of recipients has an awareness problem, not a communication problem." },
      { text: "Unprompted recall in pulse surveys", detail: "Ask people to describe, in their own words, what is changing and why. This is a far more reliable measure of awareness than asking whether they received a communication. If people cannot describe the change without prompting, awareness has not been achieved." },
      { text: "Manager briefing completion rates", detail: "Managers are the primary channel for awareness in most organisations. Track whether every manager has been briefed and whether they have in turn briefed their teams. Gaps here create pockets of the organisation that are genuinely unaware." },
    ],
    signal: "You have achieved awareness when at least 80% of affected people can describe, without prompting, what is changing and the broad reason why. Below this threshold, you are building on a foundation that does not exist.",
  },
  {
    id: "understanding",
    num: "02",
    name: "Understanding",
    question: "Do people understand what the change means for them personally?",
    description: "Understanding goes beyond awareness. People may know that a new system is being implemented, but do they understand what it means for their daily work? This is where the change becomes personal. Generic communications create awareness. Targeted, role-specific communication creates understanding. Most organisations stop at awareness and wonder why adoption stalls.",
    metrics: [
      { text: "Role-specific comprehension checks", detail: "Test whether people understand what will change in their specific role, not just the overall program. A finance analyst and a sales manager experience the same ERP implementation very differently. Measure understanding at the role level." },
      { text: "Quality of questions asked in town halls and briefings", detail: "The questions people ask reveal their level of understanding. Generic questions indicate surface-level awareness. Specific, practical questions indicate genuine understanding. No questions at all often indicates disengagement, not comprehension." },
      { text: "Manager confidence in explaining personal impact", detail: "Managers need to translate organisational change into personal meaning for each team member. Survey managers on their confidence in explaining what will change for their team specifically. Low confidence here means understanding will not cascade." },
    ],
    signal: "You have achieved understanding when people can explain not just what is changing, but what it means for their specific role, their daily tasks, and their team. If understanding is shallow, trial will be frustrated and adoption will be superficial.",
  },
  {
    id: "trial",
    num: "03",
    name: "Trial",
    question: "Are people trying the new way of working?",
    description: "Trial is the stage where people first attempt the new behaviour, process, or system. This is the most fragile stage because the experience of trying something new is often frustrating. If the trial experience is poor, people will revert to the old way and become much harder to re-engage. The quality of support during trial determines whether people progress to adoption or retreat to resistance.",
    metrics: [
      { text: "First-use rates within the expected timeframe", detail: "Track how many people have tried the new process or system within the first week, two weeks, and month after go-live. People who have not tried it within the first month are unlikely to try it voluntarily. They need direct intervention." },
      { text: "Support ticket volume and resolution speed", detail: "A spike in support tickets during trial is healthy. It means people are trying. What matters is whether tickets are resolved quickly enough to prevent people from abandoning the attempt. Measure resolution time, not just volume." },
      { text: "Drop-off rates between first and second use", detail: "The gap between first use and second use is the most critical measurement at the trial stage. People who try once and never return have had a negative experience. Investigate why. This drop-off rate predicts long-term adoption more reliably than any other trial-stage metric." },
    ],
    signal: "You have achieved trial when 70% or more of affected people have attempted the new way of working at least once. If trial rates are low, the barriers to entry are too high. If drop-off after first use is high, the trial experience needs immediate improvement.",
  },
  {
    id: "adoption",
    num: "04",
    name: "Adoption",
    question: "Are people using the new way of working consistently?",
    description: "Adoption means people are using the new process, system, or behaviour as their default. They are not alternating between old and new. They are not maintaining workarounds. They are using the intended approach consistently. This is where most organisations declare success too early. Consistent use for two weeks is not adoption. Consistent use after the initial support has been withdrawn is adoption.",
    metrics: [
      { text: "Sustained usage rates over 60 to 90 days", detail: "Measure usage not at go-live, but at 60 and 90 days post go-live. The initial spike in usage is often driven by novelty and support. Sustained usage after the initial period is the true measure of adoption. A declining usage curve after 30 days indicates adoption is failing." },
      { text: "Reduction in parallel or legacy system usage", detail: "If people are still using the old system alongside the new one, adoption has not occurred. Track legacy system access and the existence of shadow spreadsheets or manual processes. These are direct evidence that the change has not been fully adopted." },
      { text: "Compliance rates without active enforcement", detail: "True adoption means people use the new approach because it works, not because they are being monitored. If usage drops when enforcement is relaxed, you have compliance, not adoption. Measure what happens when you stop actively pushing." },
    ],
    signal: "You have achieved adoption when sustained usage exceeds 80% over 90 days and legacy system access has declined to near zero. If you are relying on enforcement to maintain these numbers, you have compliance, not adoption.",
  },
  {
    id: "proficiency",
    num: "05",
    name: "Proficiency",
    question: "Are people performing at or above the expected level?",
    description: "Proficiency is the final stage and the one most often ignored. People may be using the new system consistently, but are they using it well? Are they getting the full benefit? Proficiency is the difference between adoption and value realisation. An organisation can have 95% adoption and still fail to achieve its intended outcomes if proficiency is low.",
    metrics: [
      { text: "Quality and accuracy metrics specific to the changed process", detail: "Measure the quality of outputs produced using the new approach. Error rates, rework rates, and accuracy scores all indicate whether people are proficient or merely compliant. Proficiency means producing good work through the new process, not just using it." },
      { text: "Time-to-completion compared to baseline", detail: "People who are proficient complete tasks in the new system at or faster than baseline expectations. If tasks consistently take longer than they should 90 days after go-live, people need additional capability development, not just more practice." },
      { text: "Peer coaching and knowledge sharing behaviours", detail: "When people start helping others use the new approach, they have reached proficiency. Track whether informal coaching networks emerge, whether people contribute to knowledge bases, and whether they adapt the new approach to fit their context. These are signs of genuine mastery." },
    ],
    signal: "You have achieved proficiency when quality metrics meet or exceed targets, task completion times are within expected ranges, and people are adapting and improving the new approach rather than merely following it. This is where the return on your change investment is realised.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Case Studies                                                 */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Microsoft",
    headline: "How Microsoft measured Copilot adoption across 200,000 employees using layered leading indicators",
    hook: "Average enterprise adoption is 34%. Microsoft achieved over 90% monthly active usage by measuring what mattered before it mattered.",
    dimension: "Leading Indicators",
    body: [
      "When Microsoft rolled out Microsoft 365 Copilot internally, the scale was extraordinary: over 200,000 employees across every function and geography. The company could have measured success by counting how many people logged in. Instead, Microsoft Digital designed a layered measurement framework that tracked leading indicators at every stage of the adoption curve.",
      "The team monitored monthly active usage, which consistently stayed in the 90% range, but they treated this as a lagging confirmation, not a leading driver. The real measurement work happened earlier. Microsoft tracked manager readiness scores, training completion by role, support ticket patterns, and net satisfaction scores through in-app reporting, enterprise-wide surveys, and focused research activities.",
      "Critically, Microsoft measured sentiment and friction alongside usage. They captured qualitative feedback through structured research sessions, not just quantitative data through dashboards. This allowed them to detect adoption barriers before they showed up in usage numbers. When satisfaction dipped in specific functions, the team intervened with targeted enablement before usage could decline.",
      "The contrast with typical enterprise deployments is stark. Across the industry, the average enterprise Copilot adoption rate is just 34% of licensed users at 90 days. Organisations with structured rollout programs achieve 65 to 78%. Microsoft's approach demonstrates that the difference is not the technology. It is the measurement and response system built around it.",
    ],
    lesson: "Microsoft's internal Copilot rollout proves that adoption metrics must be layered. Usage data tells you what happened. Leading indicators like manager confidence, training quality, and early sentiment tell you what will happen. The organisations that measure both can intervene before adoption stalls.",
    source: "https://www.microsoft.com/insidetrack/blog/measuring-the-success-of-our-microsoft-365-copilot-rollout-at-microsoft/",
    sourceLabel: "Microsoft Inside Track",
  },
  {
    label: "Nationwide",
    headline: "Nationwide Building Society measured adoption through business outcomes, not just system usage",
    hook: "60,000 courses completed. Over half of all members converted to mobile. But the real metric was behavioural change.",
    dimension: "Adoption Curve",
    body: [
      "When Nationwide Building Society embarked on its digital transformation in 2017, the leadership team understood that measuring technology deployment was not the same as measuring change adoption. The transformation affected over 18,000 employees across branches, contact centres, and back-office functions, and the measurement framework had to reflect this complexity.",
      "Nationwide implemented Planview's Enterprise Agile Planning solution to create a single line of sight across the entire organisation. Rather than relying on a single adoption metric, they built measurement at each stage of the curve. At the awareness and understanding stages, they tracked engagement with their Discover Digital training platform, which ultimately recorded over 60,000 courses completed.",
      "At the trial and adoption stages, they measured what mattered for the business: the percentage of members converting to digital channels and the percentage of product sales made digitally. By the proficiency stage, over half of the Society's members had converted to active mobile users, and 76% of all product sales were made through digital channels.",
      "What made Nationwide's approach distinctive was their use of innovators within the organisation to drive adoption through demonstrated results rather than mandated compliance. They allowed team members to engage naturally with new solutions and leveraged early adopters as proof points. This created organic momentum that could be measured through increasing levels of buy-in across the Society.",
    ],
    lesson: "Nationwide demonstrates that adoption metrics must connect individual behaviour change to business outcomes. Measuring training completion is necessary but not sufficient. The real question is whether the training translated into changed behaviour, and whether that changed behaviour delivered the intended business result.",
    source: "https://www.planview.com/resources/case-study/nationwide-building-society-planview-transformation/",
    sourceLabel: "Planview",
  },
  {
    label: "Prosci Research",
    headline: "Organisations that measure individual transition are three times more likely to meet project objectives",
    hook: "76% success rate with adoption measurement versus 24% without. The data is unambiguous.",
    dimension: "Research Evidence",
    body: [
      "Prosci's benchmarking research, drawn from over two decades of data across thousands of change initiatives, provides the most compelling evidence for the impact of adoption measurement on project success. The finding is stark: organisations that actively measure how well people are adopting and using changes achieve a 76% success rate against project objectives, compared to just 24% for those that do not measure adoption.",
      "The research identifies a critical distinction between measuring change management activities and measuring change adoption. Many organisations track whether communications were sent, whether training was delivered, and whether the project was completed on time. These are activity metrics. They tell you what the change team did, not whether the change landed.",
      "Prosci's ADKAR model provides a framework for measuring individual transition through five stages: Awareness, Desire, Knowledge, Ability, and Reinforcement. Two-thirds of practitioners using ADKAR as a measurement framework rated it extremely effective. The model works because it measures individual progress, not just organisational activity.",
      "The research also highlights three specific adoption metrics that differentiate successful projects: speed of adoption, which measures how quickly people begin using the change; ultimate utilisation, which measures the total percentage of people who adopt; and proficiency, which measures how well people perform using the new approach. Organisations that track all three are significantly more likely to achieve and sustain their intended outcomes.",
    ],
    lesson: "Prosci's research eliminates the debate about whether adoption measurement matters. It does. The organisations that measure individual transition through the change, not just project delivery, are three times more likely to succeed. The question is not whether to measure adoption, but how to measure it at the right level of granularity.",
    source: "https://www.prosci.com/blog/metrics-for-measuring-change-management",
    sourceLabel: "Prosci",
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

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function AdoptionMetrics() {
  /* Metrics classifier state */
  const [classifications, setClassifications] = useState<Record<string, "leading" | "lagging">>({});
  const [showResults, setShowResults] = useState(false);

  /* Adoption curve state */
  const [activeStage, setActiveStage] = useState<string | null>(null);

  /* Self-check state */
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  /* Case study modal state */
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  /* Hard-to-measure expandable section state */
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  /* Metrics classifier helpers */
  const classifyMetric = (id: string, answer: "leading" | "lagging") => {
    if (showResults) return;
    setClassifications((prev) => ({ ...prev, [id]: answer }));
  };

  const allClassified = Object.keys(classifications).length === metricsData.length;

  const correctCount = metricsData.filter(
    (m) => classifications[m.id] === m.correctAnswer
  ).length;

  /* Checklist data */
  const checkItems = [
    { key: "leading", label: "We are tracking at least three leading indicators that predict adoption before it happens" },
    { key: "lagging", label: "We are measuring lagging indicators to confirm adoption, not just to report progress" },
    { key: "curve", label: "Our measurement framework covers all five stages of the adoption curve, not just usage" },
    { key: "baseline", label: "We established a baseline before the change so we can measure genuine movement" },
    { key: "role", label: "Our metrics are tailored to different roles and groups, not one-size-fits-all" },
    { key: "qualitative", label: "We collect qualitative data through conversations and observations, not just dashboards" },
    { key: "frequency", label: "We measure frequently enough to intervene before problems become entrenched" },
    { key: "workarounds", label: "We actively look for workarounds and shadow processes as evidence of adoption gaps" },
    { key: "proficiency", label: "We measure proficiency after adoption, not just whether people are using the new approach" },
    { key: "action", label: "Every metric we track has a clear action plan for what we do if it falls below threshold" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  /* Hard-to-measure challenges data */
  const hardToMeasure = [
    {
      title: "When the change is cultural, not procedural",
      detail: "Cultural change is hard to measure because there is no system to log into and no process to track. But it is not unmeasurable. Use behavioural proxies: how many managers are having regular one-to-ones? How often do teams escalate problems versus solve them locally? Are people volunteering for cross-functional work? Cultural change shows up in patterns of behaviour that can be observed and counted, even if the culture itself cannot be directly quantified. The key is to define the specific behaviours that the desired culture would produce, and then measure those behaviours.",
    },
    {
      title: "When you cannot isolate the change from other variables",
      detail: "In a complex organisation, multiple things change simultaneously. Attributing outcomes to a specific change initiative feels impossible. The solution is not perfect attribution. It is triangulation. Use multiple data sources that point in the same direction. If training completion is high, system usage is growing, manager feedback is positive, and quality metrics are improving, the combined weight of evidence is more reliable than any single metric. Accept that you are building a case, not proving a theorem. Directional confidence at the right time is more valuable than perfect certainty too late.",
    },
    {
      title: "When the data does not exist yet",
      detail: "Many organisations discover that they have no baseline data for the metrics they need. They cannot measure improvement because they never measured the starting point. If you are in this position, start measuring now, even if the change has already begun. A baseline taken at week four is better than no baseline at all. For future changes, build baseline measurement into the foundation phase. The cost of establishing a baseline is trivial compared to the cost of having no evidence that your change delivered results.",
    },
    {
      title: "When people game the metrics",
      detail: "If the only adoption metric is system login rates, people will log in without using the system. If the metric is training completion, people will click through without learning. Every metric can be gamed if it stands alone. The defence against gaming is to use layered metrics that are hard to fake simultaneously. Someone can log in without using the system, but they cannot simultaneously fake login rates, task completion quality, support ticket patterns, and manager observations. Triangulation defeats gaming.",
    },
    {
      title: "When leadership wants a single number",
      detail: "Executives often want a single adoption percentage. The reality is that a single number is either misleading or meaningless. The answer is not to refuse to provide one, but to provide it with context. Report the headline number alongside the three or four metrics that compose it. An adoption score of 72% means nothing on its own. An adoption score of 72% composed of 90% awareness, 80% understanding, 65% trial, and 55% sustained usage tells a specific story and points to specific interventions.",
    },
    {
      title: "When the change affects different groups differently",
      detail: "A single adoption metric across the entire organisation can mask critical variation. One department might be at 95% adoption while another is at 30%. The average of 62% tells you nothing useful. Segment your metrics by the groups that experience the change differently: by role, by geography, by business unit, by tenure. The segments where adoption is lowest are where your measurement and intervention efforts should be concentrated. An organisation-wide average is a reporting convenience, not a management tool.",
    },
  ];

  return (
    <>
      <Nav />

      {/* ------------------------------------------------------------ */}
      {/*  HEADER                                                       */}
      {/* ------------------------------------------------------------ */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Adoption Metrics</span>
          <h1 className="article-title">How to measure change adoption when the metrics are hard to pin down, and what leading indicators actually predict success</h1>
          <p className="article-intro">Most organisations measure change adoption by counting system logins and training completions. These metrics tell you what happened, not what will happen. The real skill in adoption measurement is knowing which indicators predict success before it arrives, and which only confirm it after the fact. This guide covers both: how to measure adoption when the metrics feel elusive, and which leading indicators genuinely predict whether a change will stick.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 1: WHY ADOPTION METRICS ARE HARD                     */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Why Adoption Metrics Are Hard to Pin Down</h2>
          <p className="article-section-desc">Measuring change adoption is harder than measuring project delivery because adoption is a human phenomenon, not a technical one. A system can be live without being used. A process can be documented without being followed. Training can be completed without being applied. The gap between technical completion and genuine adoption is where most measurement frameworks fail.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <p style={{ fontSize: "0.975rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "1.5rem" }}>
            The core challenge is that adoption lives in the space between what people do and why they do it. A login count tells you someone accessed the system. It does not tell you whether they completed their work there, whether they reverted to a spreadsheet afterwards, or whether they will log in again tomorrow. Adoption measurement requires you to look beyond activity data and into behaviour, capability, and intent.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <p style={{ fontSize: "0.975rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "2rem" }}>
            The following are the six most common situations where adoption metrics feel impossible to define. Each one has a practical approach. Click any challenge to see how to measure what feels unmeasurable.
          </p>
        </ScrollReveal>

        <div>
          {hardToMeasure.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <div
                className="detail-list-item"
                style={{ cursor: "pointer" }}
                onClick={() => setActiveChallenge(activeChallenge === i ? null : i)}
              >
                <div className="detail-list-item-head">
                  {item.title}
                  <span className={`detail-list-item-toggle${activeChallenge === i ? " open" : ""}`}>&rsaquo;</span>
                </div>
                {activeChallenge === i && (
                  <div className="detail-list-item-body">{item.detail}</div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 2: METRICS CLASSIFIER (interactive)                  */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Leading or Lagging? Classify the Metrics</h2>
          <p className="article-section-desc">The most important distinction in adoption measurement is between leading indicators, which predict whether adoption will happen, and lagging indicators, which confirm whether it did. Most organisations over-index on lagging indicators and discover problems too late to fix them. Test your understanding: classify each of the 15 metrics below as leading or lagging, then reveal the correct answers.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "2rem",
          }}>
            {metricsData.map((metric, i) => {
              const userAnswer = classifications[metric.id];
              const isCorrect = userAnswer === metric.correctAnswer;
              const showFeedback = showResults && userAnswer;

              return (
                <ScrollReveal key={metric.id} direction="up" delay={i * 40}>
                  <div style={{
                    background: showFeedback
                      ? isCorrect ? "rgba(46, 107, 79, 0.06)" : "rgba(180, 60, 60, 0.06)"
                      : "var(--white)",
                    border: showFeedback
                      ? isCorrect ? "1px solid rgba(46, 107, 79, 0.25)" : "1px solid rgba(180, 60, 60, 0.25)"
                      : "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "16px 20px",
                    transition: "all 0.3s ease",
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}>
                      <span style={{
                        fontSize: "0.925rem",
                        lineHeight: 1.5,
                        color: "var(--ink)",
                        flex: "1 1 300px",
                        fontWeight: 500,
                      }}>
                        {metric.name}
                      </span>
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        <button
                          onClick={() => classifyMetric(metric.id, "leading")}
                          style={{
                            padding: "6px 16px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            fontFamily: "var(--ui)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            border: userAnswer === "leading" ? "2px solid var(--gold)" : "1px solid var(--border)",
                            borderRadius: "4px",
                            background: userAnswer === "leading" ? "rgba(184, 134, 11, 0.08)" : "transparent",
                            color: userAnswer === "leading" ? "var(--gold)" : "var(--ink-light)",
                            cursor: showResults ? "default" : "pointer",
                            transition: "all 0.2s ease",
                            opacity: showResults ? 0.8 : 1,
                          }}
                        >
                          Leading
                        </button>
                        <button
                          onClick={() => classifyMetric(metric.id, "lagging")}
                          style={{
                            padding: "6px 16px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            fontFamily: "var(--ui)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            border: userAnswer === "lagging" ? "2px solid var(--navy)" : "1px solid var(--border)",
                            borderRadius: "4px",
                            background: userAnswer === "lagging" ? "rgba(10, 22, 40, 0.08)" : "transparent",
                            color: userAnswer === "lagging" ? "var(--navy)" : "var(--ink-light)",
                            cursor: showResults ? "default" : "pointer",
                            transition: "all 0.2s ease",
                            opacity: showResults ? 0.8 : 1,
                          }}
                        >
                          Lagging
                        </button>
                      </div>
                    </div>

                    {showFeedback && (
                      <div style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border)",
                      }}>
                        <span style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          fontFamily: "var(--ui)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: isCorrect ? "#2E6B4F" : "#B43C3C",
                          marginBottom: "6px",
                        }}>
                          {isCorrect ? "Correct" : `Incorrect — this is a ${metric.correctAnswer} indicator`}
                        </span>
                        <p style={{
                          fontSize: "0.875rem",
                          lineHeight: 1.65,
                          color: "var(--ink-light)",
                          margin: 0,
                        }}>
                          {metric.explanation}
                        </p>
                      </div>
                    )}

                    {showResults && !userAnswer && (
                      <div style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border)",
                      }}>
                        <span style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          fontFamily: "var(--ui)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "var(--ink-light)",
                          marginBottom: "6px",
                        }}>
                          Not classified — this is a {metric.correctAnswer} indicator
                        </span>
                        <p style={{
                          fontSize: "0.875rem",
                          lineHeight: 1.65,
                          color: "var(--ink-light)",
                          margin: 0,
                        }}>
                          {metric.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {!showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="btn"
                style={{
                  opacity: allClassified ? 1 : 0.5,
                  pointerEvents: allClassified ? "auto" : "none",
                }}
              >
                Reveal Answers
              </button>
            )}
            {!showResults && !allClassified && (
              <span style={{
                fontSize: "0.85rem",
                color: "var(--ink-light)",
                fontFamily: "var(--ui)",
              }}>
                Classify all {metricsData.length} metrics to reveal answers ({Object.keys(classifications).length} of {metricsData.length} done)
              </span>
            )}
            {showResults && (
              <div style={{
                background: "var(--navy)",
                color: "var(--white)",
                padding: "16px 24px",
                borderRadius: "8px",
                width: "100%",
              }}>
                <span style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  fontFamily: "var(--ui)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "8px",
                }}>
                  Your Result
                </span>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, margin: "0 0 8px 0" }}>
                  {correctCount} of {metricsData.length} correct
                </p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, margin: 0, opacity: 0.85 }}>
                  {correctCount >= 13
                    ? "Excellent. You have a strong grasp of the leading versus lagging distinction. This understanding is the foundation of a measurement framework that allows you to intervene early, not just report late."
                    : correctCount >= 9
                    ? "Good understanding with some gaps. Review the metrics you misclassified. The most common mistake is treating activity metrics as lagging when they are actually leading indicators of future adoption."
                    : correctCount >= 5
                    ? "Mixed results. The leading versus lagging distinction is not intuitive, and many organisations make the same mistakes. The key insight is that leading indicators measure conditions and readiness, while lagging indicators measure outcomes and results."
                    : "This is a common starting point. Most change practitioners default to lagging indicators because they are easier to define. The challenge is building a measurement framework that weights leading indicators heavily enough to enable early intervention."}
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 3: THE ADOPTION CURVE                                */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Adoption Measurement Curve</h2>
          <p className="article-section-desc">Adoption is not a single event. It is a progression through five stages, and each stage requires different metrics. Most organisations only measure the middle: they track whether people are using the system. But adoption starts before usage and extends beyond it. Click any stage to see what to measure, how to measure it, and what signal tells you it is time to move on.</p>
        </ScrollReveal>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "2rem",
        }}>
          {adoptionStages.map((stage, i) => (
            <ScrollReveal key={stage.id} direction="up" delay={i * 80}>
              <button
                className={`stair${activeStage === stage.id ? " stair-active" : ""}`}
                style={{
                  "--stair-colour": i === 0 ? "#6B7280" : i === 1 ? "#8B7355" : i === 2 ? "#B8860B" : i === 3 ? "#2E6B4F" : "#0A1628",
                  marginLeft: `${i * 40}px`,
                } as React.CSSProperties}
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
              >
                <span className="stair-level">{stage.num}</span>
                <span className="stair-name">{stage.name}</span>
                <span className="stair-tagline">{stage.question}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeStage && (
          <section className="article-section dimension-detail">
            {adoptionStages.filter((s) => s.id === activeStage).map((stage) => (
              <div key={stage.id}>
                <ScrollReveal direction="up">
                  <div className="detail-header">
                    <span className="dimension-num-lg">{stage.num}</span>
                    <h2 className="detail-title">{stage.name}</h2>
                  </div>
                  <p style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "var(--gold)",
                    marginBottom: "16px",
                  }}>
                    {stage.question}
                  </p>
                  <p className="detail-body">{stage.description}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">What to Measure at This Stage</h3>
                    <ExpandableList items={stage.metrics} />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={200}>
                  <div className="detail-block detail-block-warning">
                    <h3 className="detail-block-title">The Signal That You Can Progress</h3>
                    <p className="detail-body" style={{ marginBottom: 0 }}>{stage.signal}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </section>
        )}
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 4: BUILDING A MEASUREMENT FRAMEWORK                  */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Building Your Adoption Measurement Framework</h2>
          <p className="article-section-desc">A strong measurement framework is not a list of metrics. It is a system that connects leading indicators to lagging outcomes, covers all stages of the adoption curve, and provides actionable signals at every point. The following principles should guide its design.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "2rem",
          }}>
            {[
              {
                principle: "Start with the outcome and work backwards",
                detail: "Define what success looks like in business terms. Then identify the behaviours that would produce that outcome. Then identify the conditions that would produce those behaviours. Your leading indicators are the conditions. Your lagging indicators are the outcomes. The behaviours are what you are trying to change.",
              },
              {
                principle: "Measure at the segment level, not the aggregate",
                detail: "Organisation-wide averages hide the variation that matters. A team at 95% adoption and a team at 15% adoption produce a meaningless 55% average. Segment your metrics by role, function, geography, and tenure. The segments with the lowest scores are where your attention should be focused.",
              },
              {
                principle: "Balance quantitative data with qualitative insight",
                detail: "Dashboards tell you what is happening. Conversations tell you why. A declining usage trend is data. Understanding that usage is declining because the new system does not handle a critical edge case is insight. Build structured qualitative collection into your framework, not as an afterthought but as a primary data source.",
              },
              {
                principle: "Define thresholds and response plans in advance",
                detail: "Every metric should have a threshold that triggers action. If manager readiness drops below 60%, what do you do? If first-use drop-off exceeds 40%, what is the response? Defining these thresholds before you need them prevents the paralysis that occurs when data reveals problems that nobody has a plan for.",
              },
              {
                principle: "Measure frequently enough to act",
                detail: "A monthly adoption dashboard is a historical report, not a management tool. If your rollout is happening in weekly waves, you need weekly or even daily measurement of leading indicators. The frequency of measurement should match the speed at which you can intervene. Data that arrives too late to act on is not measurement. It is post-mortem.",
              },
              {
                principle: "Retire metrics that have served their purpose",
                detail: "Not every metric is relevant at every stage. Awareness metrics matter in the first weeks. By month three, they should be replaced by adoption and proficiency metrics. A measurement framework that never changes accumulates noise and dilutes attention. Review and retire metrics quarterly.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "20px",
              }}>
                <h4 style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}>
                  {item.principle}
                </h4>
                <p style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                  color: "var(--ink-light)",
                  margin: 0,
                }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  SECTION 5: SELF-CHECK                                        */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Measurement Framework Fit for Purpose?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your current adoption measurement approach will give you the insight you need to intervene early and sustain results long-term.</p>
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
                  <span className="check-complete"> &mdash; Your measurement framework is comprehensive and action-oriented. You are set up to detect and respond to adoption challenges early.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps to ensure you can measure across all stages and intervene before problems become entrenched.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Measurement is in place but may be too narrow or too infrequent. You risk discovering adoption problems after they have become structural.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Significant gaps in your measurement approach. Without leading indicators and stage-specific metrics, you are likely measuring outcomes you can no longer influence.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  CTA                                                          */}
      {/* ------------------------------------------------------------ */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Execution</strong>, the fourth pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ------------------------------------------------------------ */}
      {/*  SIDEBAR                                                      */}
      {/* ------------------------------------------------------------ */}
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

      {/* ------------------------------------------------------------ */}
      {/*  CASE STUDY MODAL                                             */}
      {/* ------------------------------------------------------------ */}
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
