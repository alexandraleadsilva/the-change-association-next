"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ActionItem {
  text: string;
  detail: string;
}

interface PIRSection {
  id: string;
  num: string;
  title: string;
  description: string;
  prompts: string[];
  goodAnswers: string[];
}

interface FeedbackLoop {
  id: string;
  name: string;
  icon: string;
  frequency: string;
  purpose: string;
  howItWorks: string;
  whatGoodLooksLike: string[];
  commonFailure: string;
}

/* ------------------------------------------------------------------ */
/*  Data: Post-Implementation Review Sections                         */
/* ------------------------------------------------------------------ */

const pirSections: PIRSection[] = [
  {
    id: "what-changed",
    num: "01",
    title: "What Changed",
    description: "Before you evaluate anything, you need an honest account of what actually happened. Not what was planned. Not what was reported. What people experienced. This section establishes the factual baseline that everything else builds on.",
    prompts: [
      "What was the original scope of the change, and how did the final delivered scope differ?",
      "Which groups were affected, and was the impact what we predicted?",
      "What changed in terms of process, technology, structure, and daily work?",
      "Were there unintended changes we did not plan for but that happened anyway?",
      "How does the current state compare to the future state we described at the outset?",
    ],
    goodAnswers: [
      "Good answers are specific and evidence-based, not general. Instead of saying the new system was implemented, describe exactly which processes moved to the new system and which still rely on workarounds.",
      "Good answers acknowledge scope changes honestly. Every program changes scope. Documenting this is not failure. It is honesty that enables learning.",
      "Good answers distinguish between the technical change and the human change. The system may be live, but that does not mean people have changed how they work. Both dimensions need to be captured separately.",
      "Good answers include the perspective of people who lived through the change, not just those who designed it. Frontline staff and middle managers often have a very different account of what changed than the program team.",
    ],
  },
  {
    id: "what-worked",
    num: "02",
    title: "What Worked",
    description: "Most reviews spend too little time on this. Understanding what worked and why is just as valuable as understanding what failed. It tells you what to repeat, what to invest in, and what capabilities you have built that can be applied elsewhere.",
    prompts: [
      "Which aspects of the change landed well, and what evidence supports that assessment?",
      "Where did adoption exceed expectations, and what conditions enabled that?",
      "Which communication or engagement approaches resonated most strongly?",
      "Where did leadership support make a measurable difference?",
      "What capabilities did the team or organisation build during this program that did not exist before?",
    ],
    goodAnswers: [
      "Good answers link success to specific actions, not luck or general enthusiasm. If a team adopted quickly, identify what was different about their preparation, leadership, or support.",
      "Good answers are transferable. They describe what worked in terms that another team, program, or organisation could replicate. Saying our people were great is not useful. Saying weekly manager briefings with Q&A reduced resistance by giving people a forum for concerns is useful.",
      "Good answers recognise the people and conditions behind success. Was it the approach that worked, or was it the quality of a particular leader, facilitator, or team? If the success depended on a specific person rather than a repeatable process, that is important to note.",
      "Good answers quantify where possible. Adoption rates, satisfaction scores, time-to-competence, error rates, and customer feedback all provide evidence that general statements do not.",
    ],
  },
  {
    id: "what-did-not",
    num: "03",
    title: "What Did Not Work",
    description: "This is where the real value lives. But it only works if people feel safe enough to be honest. The purpose of this section is not to assign blame. It is to build organisational intelligence. Every problem you surface here is a problem the next program can avoid.",
    prompts: [
      "Where did the change not land as intended, and what was the impact?",
      "Which risks materialised, and were our mitigations adequate?",
      "Where did we lose people, either through disengagement, resistance, or confusion?",
      "What did our stakeholders or customers experience that we did not anticipate?",
      "Which assumptions proved wrong, and what was the cost of those assumptions?",
    ],
    goodAnswers: [
      "Good answers describe systemic causes, not individual failures. If training was inadequate, the question is why the training design process did not catch that, not who designed the training.",
      "Good answers distinguish between things that were foreseeable and things that genuinely could not have been anticipated. Both are valuable, but they lead to different actions. Foreseeable problems indicate gaps in the risk management process. Genuine surprises indicate gaps in the sensing mechanisms.",
      "Good answers include the voice of those who struggled. The people who found the change hardest are often the people whose feedback is most valuable. They see the gaps that enthusiastic adopters do not.",
      "Good answers are proportionate. Not everything that went wrong is equally important. Focus on the issues that had the greatest impact on outcomes, adoption, or trust.",
    ],
  },
  {
    id: "what-surprised",
    num: "04",
    title: "What Surprised Us",
    description: "Surprises are the most underrated category in a post-implementation review. They reveal the limits of your planning, the blind spots in your stakeholder analysis, and the assumptions you did not know you were making. Every surprise is a lesson about your organisational awareness.",
    prompts: [
      "What outcomes, positive or negative, did nobody on the program team predict?",
      "Which groups reacted differently from how we expected, and why?",
      "What dependencies or interactions between workstreams caught us off guard?",
      "Where did the culture respond in ways our change plan did not account for?",
      "What did we learn about our organisation that we did not know before this program?",
    ],
    goodAnswers: [
      "Good answers are genuinely surprising, not repackaged versions of known risks that were inadequately managed. If the surprise was predictable, it belongs in the What Did Not Work section instead.",
      "Good answers explore why the surprise happened, not just what it was. The gap between prediction and reality is where organisational learning lives. Was the surprise caused by insufficient data, wrong assumptions, or a failure to listen to the right people?",
      "Good answers lead to changes in how the organisation approaches future programs. If a cultural dynamic surprised you, that should change how you conduct stakeholder analysis next time. If an unintended benefit emerged, that should change how you define scope.",
      "Good answers treat positive surprises as seriously as negative ones. An unexpected benefit that is not understood cannot be replicated. An unexpected success that is attributed to luck rather than analysed for its causes is a wasted insight.",
    ],
  },
  {
    id: "what-differently",
    num: "05",
    title: "What We Would Do Differently",
    description: "This is the section that turns reflection into action. Everything above is diagnosis. This section is prescription. It should produce concrete, specific commitments that the organisation can apply to its next change program. If this section contains only general statements, the review has failed.",
    prompts: [
      "If we were starting this program again, what would we change about the approach?",
      "What would we start doing, stop doing, and continue doing?",
      "Which decisions would we make earlier, later, or differently?",
      "What support, resources, or capabilities were missing that should be in place next time?",
      "What recommendations do we have for the team that will sustain this change going forward?",
    ],
    goodAnswers: [
      "Good answers are specific enough to act on. Instead of communicate more, say establish weekly all-hands updates from week one with a dedicated Q&A channel monitored by the program team.",
      "Good answers are addressed to a specific audience. Recommendations for executive sponsors are different from recommendations for program managers, which are different from recommendations for the HR team. Generic advice helps nobody.",
      "Good answers distinguish between things that should change in the approach and things that should change in the organisation. Some lessons are about how you run programs. Others are about how the organisation makes decisions, allocates resources, or manages risk. Both are valuable but they require different actions.",
      "Good answers include a mechanism for follow-through. A recommendation without an owner, a timeline, and a review point is a wish, not an action. The best reviews produce a small number of high-impact actions that are tracked and reviewed, not a long list that is filed and forgotten.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Feedback Loop Types                                         */
/* ------------------------------------------------------------------ */

const feedbackLoops: FeedbackLoop[] = [
  {
    id: "pulse-surveys",
    name: "Pulse Surveys",
    icon: "\u2661",
    frequency: "Every 2 to 4 weeks post-go-live, tapering to monthly",
    purpose: "Capture the emotional and practical temperature of the organisation at scale. Pulse surveys give you breadth: how are most people feeling about the change right now?",
    howItWorks: "Short, focused surveys of five to eight questions sent to all affected groups. Questions should be consistent over time to show trends, with one or two rotating questions to explore emerging issues. Results should be shared back within 48 hours, with visible action taken on at least one finding before the next pulse.",
    whatGoodLooksLike: [
      "Response rates above 60 percent, sustained over multiple cycles. If rates drop, people have stopped believing the survey leads to action.",
      "Questions that focus on experience, not satisfaction. Instead of asking how satisfied are you with the new system, ask what is the biggest barrier you face when using the new system this week.",
      "A visible feedback loop where results are shared, actions are taken, and people can see that their input made a difference. Without this, pulse surveys become background noise.",
      "Trend data that shows movement over time, not just snapshots. A single pulse tells you how people feel. Multiple pulses tell you whether the change is embedding or eroding.",
    ],
    commonFailure: "Running pulse surveys and collecting data but never closing the loop. If people give feedback and nothing visibly changes, response rates collapse and trust erodes. The survey itself becomes evidence that leadership does not listen.",
  },
  {
    id: "retrospectives",
    name: "Retrospectives",
    icon: "\u21BA",
    frequency: "Every 2 to 4 weeks during stabilisation, monthly thereafter",
    purpose: "Create a structured forum where the people closest to the change can reflect on what is working and what is not, and agree on adjustments. Retrospectives give you depth: what is actually happening in practice?",
    howItWorks: "A facilitated session of 60 to 90 minutes with a cross-section of people affected by the change. The format follows a simple structure: what went well, what did not go well, and what should we change. The critical element is that retrospectives must produce actions, not just observations. Each session should end with two or three specific changes to be implemented before the next retrospective.",
    whatGoodLooksLike: [
      "Psychological safety is high enough that people share real problems, not sanitised versions. If every retrospective only produces positive feedback, the environment is not safe enough for honesty.",
      "Actions from previous retrospectives are reviewed at the start of each session. This creates accountability and demonstrates that the process leads to real change.",
      "Attendance includes people at different levels and from different functions. A retrospective with only the project team misses the perspectives that matter most.",
      "The facilitator is skilled enough to draw out quiet voices and manage dominant ones. The quality of a retrospective depends almost entirely on the quality of facilitation.",
    ],
    commonFailure: "Holding retrospectives that produce lists of issues but no actions, or actions that are never followed up. People quickly learn that the session is a venting exercise rather than a problem-solving one, and engagement drops.",
  },
  {
    id: "adoption-dashboards",
    name: "Adoption Dashboards",
    icon: "\u25A0",
    frequency: "Real-time data, reviewed weekly by the change team",
    purpose: "Provide objective, quantitative evidence of whether people are actually using the new ways of working. Dashboards cut through opinion and show behaviour. They answer the question: is the change actually happening?",
    howItWorks: "A set of leading and lagging indicators tracked through system data, process metrics, and behavioural measures. Leading indicators include login rates, feature usage, process compliance, and support ticket volumes. Lagging indicators include productivity, quality, customer satisfaction, and error rates. The dashboard should be visible to leadership and reviewed in a standing weekly meeting with clear escalation paths for metrics that are trending in the wrong direction.",
    whatGoodLooksLike: [
      "Metrics are tied to the outcomes the change was supposed to deliver, not just usage statistics. High login rates mean nothing if people are logging in but using workarounds.",
      "The dashboard distinguishes between compliance and adoption. Compliance means people are doing the minimum required. Adoption means people are using the new way of working as their default approach. These are different things and require different interventions.",
      "Thresholds and triggers are defined in advance. If adoption drops below 70 percent in any group, what happens? Who is notified? What intervention is deployed? Without predefined triggers, dashboards become wallpaper.",
      "The dashboard is updated frequently enough to enable intervention. Monthly adoption data is a history lesson. Weekly data is actionable intelligence.",
    ],
    commonFailure: "Building a beautiful dashboard that nobody reviews or acts on. The value of an adoption dashboard is not in the data. It is in the decisions the data enables. If the dashboard does not drive weekly conversations and interventions, it is decorative.",
  },
  {
    id: "manager-check-ins",
    name: "Manager Check-Ins",
    icon: "\u2726",
    frequency: "Weekly during the first 3 months, fortnightly thereafter",
    purpose: "Middle managers are the most important feedback mechanism in any change program. They hear what the frontline will not escalate, they see the workarounds forming, and they know which parts of the change are landing and which are being quietly ignored.",
    howItWorks: "Structured one-to-one or small group conversations between the change team and line managers. The conversation follows a simple framework: what are you hearing from your team, what are you struggling with, and what support do you need. These are not status meetings. They are listening sessions designed to surface the informal intelligence that formal reporting misses.",
    whatGoodLooksLike: [
      "Managers feel heard, not interrogated. The tone is supportive, not evaluative. If managers perceive these as performance checks, they will tell you what you want to hear instead of what you need to hear.",
      "The intelligence gathered is aggregated and acted on rapidly. If three managers in different teams report the same issue, that is a pattern that requires a response within days, not weeks.",
      "Check-ins are reciprocal. The change team shares what they are hearing from other parts of the organisation, creating a sense of shared awareness rather than one-way extraction.",
      "The frequency adapts based on the stage of the change. Weekly during the first month. Fortnightly during stabilisation. Monthly during sustainment. The rhythm should match the pace of change.",
    ],
    commonFailure: "Treating manager check-ins as a reporting mechanism rather than a support mechanism. When managers feel that check-ins are about extracting information for a dashboard rather than helping them succeed, engagement evaporates and the most valuable feedback channel closes.",
  },
  {
    id: "customer-feedback",
    name: "Customer and End-User Feedback",
    icon: "\u2605",
    frequency: "Continuous collection, weekly synthesis, monthly strategic review",
    purpose: "Internal changes always have external consequences. Customer feedback tells you whether the change is achieving its ultimate purpose: delivering better outcomes for the people the organisation serves.",
    howItWorks: "A combination of direct feedback channels such as support tickets, complaints, and satisfaction surveys along with indirect signals such as usage patterns, churn rates, and Net Promoter Score movements. The change team should establish a direct line to the customer experience team and review customer feedback specifically through the lens of the change: has the customer experience improved, deteriorated, or remained unchanged since the change went live?",
    whatGoodLooksLike: [
      "Customer feedback is reviewed alongside internal adoption data. High internal adoption with declining customer satisfaction is a warning sign that the change is working for the organisation but not for the customer.",
      "Feedback is segmented by customer type and journey stage. An overall satisfaction score can mask significant variation. Some customers may be thriving while others are struggling, and the change may affect them differently.",
      "There is a clear mechanism for customer feedback to influence ongoing adjustments to the change. If customers are reporting problems, the change team should be able to act on that intelligence without waiting for a formal review cycle.",
      "Baseline measurements were taken before the change, so post-change data can be compared meaningfully. Without a baseline, you are guessing whether the change made things better or worse.",
    ],
    commonFailure: "Treating customer feedback as someone else's responsibility. The customer experience team owns the relationship, but the change team owns the impact. If a change degrades the customer experience and the change team is not monitoring it, the damage compounds until it becomes a crisis.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Case Studies                                                */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Adobe",
    headline: "Adobe replaced annual reviews with continuous check-ins and saw voluntary turnover drop 30%",
    hook: "80,000 manager hours reclaimed. A feedback culture embedded across the entire company.",
    dimension: "Feedback Loops",
    body: [
      "In 2012, Adobe made a bold decision: abolish annual performance reviews entirely and replace them with a system of continuous check-ins. The driver was not dissatisfaction with performance management in the abstract. It was a business transformation. Adobe was shifting from perpetual software licensing to a cloud-based subscription model, and the once-a-year review cycle no longer matched the pace at which the company needed to learn and adapt.",
      "The Check-In system established quarterly conversations between managers and employees focused on expectations, feedback, and growth. These were not formal reviews. They were ongoing feedback loops designed to surface problems early, align priorities in real time, and give people a continuous sense of whether they were on track.",
      "The results were significant. Voluntary turnover dropped 30 percent within the first year. Adobe reclaimed 80,000 hours of manager time previously spent on administrative review processes. More importantly, the company built a feedback culture that supported its broader transformation: people were accustomed to giving and receiving feedback regularly, which made them more adaptive to change.",
      "The lesson for continuous improvement is clear. Adobe did not just change a process. They built a feedback loop into the operating rhythm of the company. When change came, the mechanism for sensing problems and adjusting was already in place. The check-in system was not designed for change management. But it became one of the most effective change sustainment tools the company had.",
    ],
    lesson: "Feedback loops that are embedded in the daily operating rhythm of the organisation are far more effective at sustaining change than feedback mechanisms that are bolted on as part of a program. Adobe succeeded because continuous feedback became the way they worked, not something extra they did during a transition.",
    source: "https://www.gsb.stanford.edu/faculty-research/case-studies/adobe-building-momentum-abandoning-annual-performance-reviews-check",
    sourceLabel: "Stanford Graduate School of Business",
  },
  {
    label: "Toyota",
    headline: "Toyota's Hansei reflection meetings drive continuous improvement regardless of success or failure",
    hook: "Even successful changes are reviewed. Especially successful changes.",
    dimension: "Post-Implementation Review",
    body: [
      "Toyota's approach to post-implementation review is embedded in two interconnected practices: Hansei, which means self-reflection or self-criticism, and the PDCA cycle of Plan, Do, Check, Act. What makes Toyota's approach distinctive is that reflection is not reserved for failures. Hansei meetings are held regardless of whether a change succeeded or failed.",
      "After every significant change, a Hansei-kai reflection meeting brings together the people involved to examine what happened, why it happened, and what should be done differently. The cultural expectation is that even successful outcomes contain lessons. A change that achieved its goals but could have been implemented more efficiently, more quickly, or with less disruption is not considered a complete success. It is considered an opportunity for improvement.",
      "This creates a fundamentally different relationship with post-implementation reviews. In most Western organisations, reviews happen when things go wrong. At Toyota, reviews happen because the act of reviewing is itself a driver of improvement. The review is not a response to a problem. It is a practice that prevents problems from forming.",
      "The PDCA cycle ensures that the lessons from Hansei are not just documented but acted upon. Each reflection feeds into the planning of the next change. The Check and Act stages are not optional. They are built into the process with the same rigour as the Plan and Do stages. This creates a closed loop where every change informs the next one, and the organisation gets measurably better at change over time.",
    ],
    lesson: "The most valuable insight from Toyota is that post-implementation reviews should be a practice, not an event. When reflection is cultural rather than procedural, it produces continuous improvement. When it is only triggered by failure, it produces blame avoidance.",
    source: "https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/still-learning-from-toyota",
    sourceLabel: "McKinsey",
  },
  {
    label: "Microsoft",
    headline: "Microsoft used structured feedback loops and post-go-live reviews to rescue Dynamics 365 implementations",
    hook: "Implementation is not the finish line. The governance that follows determines whether the investment pays off.",
    dimension: "Feedback Loops and PIR",
    body: [
      "Microsoft's own guidance for Dynamics 365 enterprise implementations reflects hard-won lessons from thousands of deployment programs. Their implementation framework explicitly requires post-go-live reviews and structured feedback loops as non-negotiable elements of the implementation lifecycle, not optional extras.",
      "The framework mandates that organisations conduct structured reviews after go-live to assess whether the implementation achieved its intended outcomes, identify gaps between planned and actual adoption, and document lessons learned. Critically, these reviews are designed to feed directly into a continuous improvement cycle: each finding produces a specific action, an owner, and a timeline.",
      "Microsoft's approach to feedback loops during the post-implementation phase includes monitoring adoption metrics through built-in analytics, establishing feedback channels for end users, and conducting regular governance reviews that compare actual usage patterns against planned outcomes. The guidance emphasises that feedback must be acted on visibly and quickly, because user confidence in the new system depends on seeing that their reported issues are being resolved.",
      "The evidence from Microsoft's customer base is that organisations which follow this structured approach to post-implementation review and continuous feedback are significantly more likely to realise the full value of their technology investment. Organisations that skip the post-implementation phase or treat it as a formality consistently underperform on adoption, user satisfaction, and return on investment.",
    ],
    lesson: "Microsoft learned, through thousands of enterprise implementations, that the post-go-live phase is where value is either realised or lost. The technology works the same in every organisation. The difference between success and failure is whether the organisation builds feedback loops that surface problems early and a review process that turns lessons into action.",
    source: "https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/change-management-case-study",
    sourceLabel: "Microsoft Learn",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
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

function PIRPlanner({ sections }: { sections: PIRSection[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedGoodAnswers, setExpandedGoodAnswers] = useState<Record<string, boolean>>({});

  const toggleGoodAnswers = (id: string) => {
    setExpandedGoodAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pir-planner">
      {sections.map((section, i) => {
        const isActive = activeSection === section.id;
        const showGood = expandedGoodAnswers[section.id];
        return (
          <ScrollReveal key={section.id} direction="up" delay={i * 60}>
            <div className={`pir-section${isActive ? " pir-section-active" : ""}`}>
              <button
                className="pir-section-header"
                onClick={() => setActiveSection(isActive ? null : section.id)}
              >
                <span className="pir-section-num">{section.num}</span>
                <span className="pir-section-title">{section.title}</span>
                <span className={`detail-list-item-toggle${isActive ? " open" : ""}`}>&rsaquo;</span>
              </button>

              {isActive && (
                <div className="pir-section-body">
                  <p className="pir-section-desc">{section.description}</p>

                  <div className="pir-prompts">
                    <h4 className="pir-prompts-heading">Guided Prompts</h4>
                    <ul className="pir-prompts-list">
                      {section.prompts.map((prompt, j) => (
                        <li key={j} className="pir-prompt-item">{prompt}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="pir-good-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGoodAnswers(section.id);
                    }}
                  >
                    {showGood ? "Hide" : "Show"} what good answers look like
                    <span className={`detail-list-item-toggle${showGood ? " open" : ""}`}>&rsaquo;</span>
                  </button>

                  {showGood && (
                    <div className="pir-good-answers">
                      {section.goodAnswers.map((answer, k) => (
                        <p key={k} className="pir-good-answer">{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

function FeedbackLoopCards({ loops }: { loops: FeedbackLoop[] }) {
  const [expandedLoop, setExpandedLoop] = useState<string | null>(null);

  return (
    <div className="feedback-loop-grid">
      {loops.map((loop, i) => {
        const isExpanded = expandedLoop === loop.id;
        return (
          <ScrollReveal key={loop.id} direction="up" delay={i * 60}>
            <div className={`feedback-loop-card${isExpanded ? " feedback-loop-card-expanded" : ""}`}>
              <button
                className="feedback-loop-card-header"
                onClick={() => setExpandedLoop(isExpanded ? null : loop.id)}
              >
                <span className="feedback-loop-icon">{loop.icon}</span>
                <div className="feedback-loop-header-text">
                  <span className="feedback-loop-name">{loop.name}</span>
                  <span className="feedback-loop-frequency">{loop.frequency}</span>
                </div>
                <span className={`detail-list-item-toggle${isExpanded ? " open" : ""}`}>&rsaquo;</span>
              </button>

              {isExpanded && (
                <div className="feedback-loop-card-body">
                  <div className="feedback-loop-purpose">
                    <h4 className="feedback-loop-label">Purpose</h4>
                    <p>{loop.purpose}</p>
                  </div>

                  <div className="feedback-loop-how">
                    <h4 className="feedback-loop-label">How It Works</h4>
                    <p>{loop.howItWorks}</p>
                  </div>

                  <div className="feedback-loop-good">
                    <h4 className="feedback-loop-label">What Good Looks Like</h4>
                    <ul className="feedback-loop-good-list">
                      {loop.whatGoodLooksLike.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="feedback-loop-failure">
                    <h4 className="feedback-loop-label">The Most Common Failure</h4>
                    <p>{loop.commonFailure}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                               */
/* ------------------------------------------------------------------ */

export default function ContinuousImprovement() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "pir-scheduled", label: "A post-implementation review is scheduled within 4 to 8 weeks of go-live, with a clear owner" },
    { key: "pir-inclusive", label: "The PIR includes frontline staff and middle managers, not just the program team and senior sponsors" },
    { key: "pir-safe", label: "The environment is psychologically safe enough that people will share what genuinely did not work" },
    { key: "pir-actions", label: "PIR findings produce specific actions with owners and timelines, not just a report" },
    { key: "feedback-multiple", label: "We have at least three different feedback mechanisms running post-go-live, not just one" },
    { key: "feedback-visible", label: "People can see that their feedback leads to visible action within days, not weeks" },
    { key: "adoption-tracked", label: "Adoption is tracked through behavioural data, not just system login rates" },
    { key: "managers-supported", label: "Managers have regular check-ins with the change team where they can share what they are hearing" },
    { key: "customer-monitored", label: "Customer or end-user experience is being monitored for the impact of the change" },
    { key: "loop-closed", label: "Every feedback loop has a defined close mechanism: data in, action out, result communicated back" },
    { key: "sustainability-owned", label: "A specific person in the business owns continuous improvement for this change beyond the program" },
    { key: "review-cadence", label: "Structured reviews are planned at 30, 90, and 180 days post go-live" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      {/* ---- HEADER ---- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Sustainment &middot; Continuous Improvement</span>
          <h1 className="article-title">
            Feedback loops and post-implementation reviews: how to keep change alive after the program ends
          </h1>
          <p className="article-intro">
            Most change programs invest heavily in getting to go-live and almost nothing in what happens after. The program team disbands. The budget closes. The sponsors move on. And the change, left without the feedback mechanisms that kept it on track during delivery, slowly drifts back towards the old way of working. This article covers two practices that prevent that drift: feedback loops that keep the organisation sensing and adapting, and post-implementation reviews that turn experience into organisational intelligence. Both are essential. Neither works without the other.
          </p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
        <div className="article-main">

          {/* ============================================================ */}
          {/*  PART 1: FEEDBACK LOOPS                                      */}
          {/* ============================================================ */}

          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Part One: Building Feedback Loops That Keep Change Alive</h2>
              <p className="article-section-desc">
                A feedback loop is not a survey. It is a system that takes input from the people living the change, converts that input into decisions, acts on those decisions, and communicates the result back to the people who provided the input. If any of those steps is missing, it is not a loop. It is a dead end. The five feedback mechanisms below, used together, give you the breadth, depth, and speed you need to sustain change after the program ends.
              </p>
            </ScrollReveal>
          </section>

          <section className="article-section">
            <ScrollReveal direction="up">
              <p className="article-section-desc">
                Click any feedback loop below to explore how it works, what good looks like, and the most common way organisations get it wrong.
              </p>
            </ScrollReveal>
            <FeedbackLoopCards loops={feedbackLoops} />
          </section>

          {/* Why feedback loops fail */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Why Feedback Loops Fail After the Program Ends</h2>
              <p className="article-section-desc">
                The pattern is predictable. During the program, feedback flows freely because there is a team dedicated to collecting it, analysing it, and acting on it. After the program, that team dissolves and the feedback mechanisms either stop entirely or continue collecting data that nobody reviews. The solution is not to keep the program team running indefinitely. It is to transfer the feedback mechanisms to the business with clear ownership, defined rhythms, and the authority to act on what they hear.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80}>
              <ExpandableList items={[
                {
                  text: "The ownership gap: who runs the feedback loops after the program team leaves?",
                  detail: "Before the program closes, every feedback mechanism needs a named owner in the business. Not a team. A person. Someone who is accountable for reviewing the data, making decisions, and communicating back to the people who provided feedback. If this handover does not happen explicitly, the loops die within weeks of the program closing."
                },
                {
                  text: "The action gap: feedback is collected but nothing changes",
                  detail: "The fastest way to kill a feedback loop is to collect input and not act on it. People learn very quickly whether their feedback leads to change. After two or three cycles of providing input and seeing nothing happen, even the most engaged employees stop participating. The rule is simple: if you cannot commit to acting on what you hear, do not ask."
                },
                {
                  text: "The communication gap: actions are taken but nobody knows about it",
                  detail: "Sometimes organisations do act on feedback but fail to communicate that they have done so. The result is the same as not acting: people do not see a connection between their input and any change. Closing the loop means telling people what you heard, what you did about it, and what happened as a result. This communication is not optional. It is the mechanism that keeps the loop alive."
                },
                {
                  text: "The frequency gap: feedback is too infrequent to catch problems early",
                  detail: "An annual engagement survey is not a feedback loop for change sustainment. By the time you see the results, the problems are six months old. Effective feedback during the sustainment phase needs to operate on a weekly or fortnightly cycle, at least for the first three to six months. The frequency can reduce as the change embeds, but it should never disappear entirely."
                },
                {
                  text: "The courage gap: the organisation collects feedback but avoids acting on the difficult findings",
                  detail: "Some feedback is easy to act on: fix a bug, update a guide, adjust a timeline. Other feedback challenges fundamental assumptions: the change is not working for this group, the training was inadequate, the new process is slower than the old one. Organisations that avoid acting on the difficult feedback create a false sense of progress while the real issues compound beneath the surface."
                },
              ]} />
            </ScrollReveal>
          </section>

          {/* ============================================================ */}
          {/*  PART 2: POST-IMPLEMENTATION REVIEW                          */}
          {/* ============================================================ */}

          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Part Two: What a Post-Implementation Review Actually Needs to Cover</h2>
              <p className="article-section-desc">
                A post-implementation review is not a project closure exercise. It is not a celebration. It is not a performance assessment of the program manager. It is a structured process for turning experience into organisational intelligence. Done well, it produces insights that make every subsequent change program better. Done badly, it produces a document that nobody reads. The difference lies in who is in the room, what questions are asked, and whether the findings lead to action.
              </p>
            </ScrollReveal>
          </section>

          {/* PIR Planner Interactive */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Post-Implementation Review Planner</h2>
              <p className="article-section-desc">
                Work through the five sections below. Each section covers a different dimension of the review, with guided prompts to structure the conversation and expandable guidance on what good answers look like. Use this as both a planning tool and a facilitation guide.
              </p>
            </ScrollReveal>
            <PIRPlanner sections={pirSections} />
          </section>

          {/* Who should be in the room */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Who Should Be in the Room</h2>
              <p className="article-section-desc">
                The composition of the review determines its value. Most PIRs include only the program team and the executive sponsor. This produces a review that reflects what the program intended, not what the organisation experienced. The following groups should be represented, and their absence should be treated as a risk to the quality of the review.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80}>
              <ExpandableList items={[
                {
                  text: "Frontline staff who lived through the change",
                  detail: "These are the people whose daily work was most affected. They know which parts of the change work in practice, which are being circumvented, and which created problems nobody anticipated. Their perspective is the most valuable and the most frequently excluded. Include at least three to five frontline representatives from different teams and locations."
                },
                {
                  text: "Middle managers who had to implement the change in their teams",
                  detail: "Middle managers carry the heaviest burden during change. They translate strategy into action, manage the emotional impact on their teams, and deal with the gap between what was planned and what is possible. They see the change from a unique vantage point: close enough to the frontline to understand the reality, and senior enough to understand the intent. Their feedback on what support was adequate and what was missing is essential."
                },
                {
                  text: "The executive sponsor and key decision-makers",
                  detail: "Their presence signals that the review matters. More importantly, they need to hear unfiltered feedback about how their decisions played out in practice. Were the resources adequate? Was the timeline realistic? Did the governance model work? These questions can only be answered honestly if the sponsor creates an environment where people feel safe to speak candidly."
                },
                {
                  text: "The program or project team",
                  detail: "They have the most detailed knowledge of what was planned versus what was delivered, where compromises were made, and where the approach deviated from the original design. Their perspective is necessary but not sufficient. A review that only includes the program team is a self-assessment, not a post-implementation review."
                },
                {
                  text: "Representatives from support functions: IT, HR, Finance, Communications",
                  detail: "These teams supported the change and have their own perspective on what worked. IT knows which technical issues are still outstanding. HR knows which capability gaps remain. Finance knows whether the business case assumptions are holding. Communications knows which messages resonated and which fell flat. Each function adds a layer of insight that the program team alone cannot provide."
                },
                {
                  text: "An independent facilitator",
                  detail: "The person who led the program should not facilitate the review. They have too much invested in the outcome. An independent facilitator can ask uncomfortable questions, manage the dynamics in the room, and ensure that quieter voices are heard. This is not a nice-to-have. The quality of the facilitation determines whether the review produces honest insights or polished summaries."
                },
              ]} />
            </ScrollReveal>
          </section>

          {/* Timing the PIR */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">When to Run the Review</h2>
              <p className="article-section-desc">
                Timing matters. Too early and you are reviewing the implementation, not the outcomes. Too late and people have forgotten the details and moved on. The most effective approach uses a staged review cadence.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80}>
              <ExpandableList items={[
                {
                  text: "4 to 6 weeks post go-live: the initial review",
                  detail: "This review focuses on the implementation experience. What happened during the transition? What immediate issues need resolution? What support is still required? The purpose is rapid course correction. This review should be short, focused, and action-oriented. It is not the time for deep reflection. It is the time for fixing what is broken."
                },
                {
                  text: "90 days post go-live: the adoption review",
                  detail: "This is the main post-implementation review. By 90 days, the initial disruption has settled and you can see whether the change is genuinely embedding or whether people are reverting. This review covers all five sections of the PIR planner above and should include the full range of stakeholders. It produces the primary lessons learned document and the action plan for sustainment."
                },
                {
                  text: "180 days post go-live: the outcomes review",
                  detail: "This review assesses whether the change is delivering the outcomes it was designed to achieve. Are the benefits materialising? Are the behavioural changes sustained? Are there unintended consequences that have only become visible over time? This review connects back to the original business case and success criteria defined during the foundation phase."
                },
              ]} />
            </ScrollReveal>
          </section>

          {/* Connecting the two */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">How Feedback Loops and PIRs Work Together</h2>
              <p className="article-section-desc">
                Feedback loops and post-implementation reviews are not separate practices. They are two parts of the same system. Feedback loops provide the continuous stream of intelligence that keeps the change on track day to day. Post-implementation reviews provide the structured reflection that turns that intelligence into organisational learning. Without feedback loops, the PIR has no data. Without the PIR, the feedback loops have no strategic direction. Together, they create a continuous improvement cycle that keeps change alive long after the program has ended.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80}>
              <ExpandableList items={[
                {
                  text: "Feedback loops generate the evidence that PIRs evaluate",
                  detail: "The data from pulse surveys, adoption dashboards, manager check-ins, and customer feedback provides the evidence base for the post-implementation review. Without this data, the PIR relies on memory and opinion. With it, the PIR is grounded in evidence and can identify patterns that no single feedback channel would reveal on its own."
                },
                {
                  text: "PIRs identify gaps in the feedback system itself",
                  detail: "One of the most valuable outputs of a post-implementation review is an assessment of whether the feedback mechanisms were adequate. Did the pulse surveys ask the right questions? Were manager check-ins frequent enough? Did the adoption dashboard measure the right things? The PIR improves the feedback system, which improves the data for the next PIR."
                },
                {
                  text: "Together they create accountability for sustained improvement",
                  detail: "Feedback loops without reviews produce activity without learning. Reviews without feedback loops produce reflection without evidence. The combination creates a system where intelligence flows continuously, is periodically synthesised into strategic insights, and those insights produce actions that are tracked and measured through the same feedback loops. This is continuous improvement in practice, not just in name."
                },
              ]} />
            </ScrollReveal>
          </section>

          {/* ============================================================ */}
          {/*  SELF-CHECK CHECKLIST                                        */}
          {/* ============================================================ */}

          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Self-Check: Is Your Continuous Improvement System Working?</h2>
              <p className="article-section-desc">
                Use this checklist to assess whether your post-go-live continuous improvement system is genuinely functional or just present on paper. Each item represents a condition that effective organisations meet. Gaps indicate where your change is vulnerable to regression.
              </p>
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
                      <span className="check-complete"> &mdash; Your continuous improvement system is comprehensive. Sustain the discipline.</span>
                    )}
                    {checkedCount >= 9 && checkedCount < checkItems.length && (
                      <span className="check-partial"> &mdash; Strong foundations. Close the remaining gaps to prevent blind spots.</span>
                    )}
                    {checkedCount >= 6 && checkedCount < 9 && (
                      <span className="check-partial"> &mdash; Good intent, but gaps remain. Focus on closing the feedback-to-action cycle.</span>
                    )}
                    {checkedCount >= 3 && checkedCount < 6 && (
                      <span className="check-partial"> &mdash; Significant gaps. Your change is at risk of regression without stronger feedback mechanisms.</span>
                    )}
                    {checkedCount > 0 && checkedCount < 3 && (
                      <span className="check-partial"> &mdash; Critical gaps. Without immediate attention to feedback loops and review processes, the change will not sustain.</span>
                    )}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ---- CTA ---- */}
          <section className="article-section article-cta">
            <ScrollReveal direction="up">
              <p className="article-cta-text">This topic is part of <strong>Sustainment</strong>, the fifth pillar of the TCA Change Model.</p>
              <Link href="/knowledge" className="btn">Explore the Full Model</Link>
            </ScrollReveal>
          </section>

        </div>

        {/* ============================================================ */}
        {/*  SIDEBAR: CASE STUDIES                                       */}
        {/* ============================================================ */}

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

      {/* ============================================================ */}
      {/*  CASE STUDY MODAL                                            */}
      {/* ============================================================ */}

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
