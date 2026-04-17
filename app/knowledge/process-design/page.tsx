"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Sequencing Decision Tool Data                                      */
/* ------------------------------------------------------------------ */

interface SequencingQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    value: "process-first" | "people-first" | "simultaneous";
    explanation: string;
  }[];
}

const sequencingQuestions: SequencingQuestion[] = [
  {
    id: "clarity",
    question: "How clear is the future-state operating model?",
    options: [
      {
        label: "The new operating model is well-defined and documented",
        value: "process-first",
        explanation: "When the target state is clear, designing processes first gives people something concrete to learn and adopt.",
      },
      {
        label: "We have a direction but the details are still emerging",
        value: "simultaneous",
        explanation: "When the model is still forming, evolving processes alongside people allows you to co-design and iterate.",
      },
      {
        label: "The future state depends on input from the people doing the work",
        value: "people-first",
        explanation: "When frontline insight shapes the design, engaging people first ensures processes reflect reality rather than assumptions.",
      },
    ],
  },
  {
    id: "resistance",
    question: "What is the primary source of resistance you anticipate?",
    options: [
      {
        label: "People do not understand why the current process needs to change",
        value: "people-first",
        explanation: "If people cannot see the problem with the current state, no new process will stick. Build understanding first.",
      },
      {
        label: "People are willing to change but do not know what the new way looks like",
        value: "process-first",
        explanation: "When willingness exists but clarity does not, showing the new process gives people a tangible path forward.",
      },
      {
        label: "Both: people question the rationale and lack clarity on the future state",
        value: "simultaneous",
        explanation: "When both understanding and clarity are missing, you need to build the case while designing the solution together.",
      },
    ],
  },
  {
    id: "complexity",
    question: "How interdependent are the processes being changed?",
    options: [
      {
        label: "The processes are relatively self-contained within a single team or function",
        value: "process-first",
        explanation: "Contained processes can be redesigned and tested quickly, then people can be trained on the new way of working.",
      },
      {
        label: "The processes span multiple teams and require coordination across functions",
        value: "simultaneous",
        explanation: "Cross-functional processes need people and process change to move together so that handoffs and dependencies stay aligned.",
      },
      {
        label: "The processes are deeply embedded in how people relate to each other and make decisions",
        value: "people-first",
        explanation: "When processes are essentially relationships and judgement calls, changing the people dynamics first creates space for new processes to emerge.",
      },
    ],
  },
  {
    id: "speed",
    question: "What is the timeline pressure on this change?",
    options: [
      {
        label: "There is a hard deadline driven by regulation, technology, or market forces",
        value: "process-first",
        explanation: "Hard deadlines often require leading with the new process and wrapping support around people as fast as possible.",
      },
      {
        label: "There is urgency but we have some flexibility on timing",
        value: "simultaneous",
        explanation: "Moderate urgency gives you room to run people and process change in parallel, which increases adoption quality.",
      },
      {
        label: "The timeline is driven by readiness rather than external pressure",
        value: "people-first",
        explanation: "When you have the luxury of readiness-driven timing, investing in people first creates the conditions for smoother process change.",
      },
    ],
  },
  {
    id: "capability",
    question: "How significant is the capability gap between current and future state?",
    options: [
      {
        label: "People have most of the skills they need, the process is what is changing",
        value: "process-first",
        explanation: "When the gap is mainly procedural rather than capability-based, lead with the new process and provide targeted training.",
      },
      {
        label: "People need new skills and the process is also changing significantly",
        value: "simultaneous",
        explanation: "When both skills and processes must shift, building capability while co-designing processes ensures neither gets too far ahead.",
      },
      {
        label: "The capability shift is fundamental, requiring new mindsets and behaviours",
        value: "people-first",
        explanation: "Fundamental capability shifts need time. Investing in people development first means new processes will be understood and owned rather than resisted.",
      },
    ],
  },
];

type SequencingResult = "process-first" | "people-first" | "simultaneous";

const sequencingResults: Record<SequencingResult, { title: string; summary: string; tradeoffs: { benefits: string[]; risks: string[] } }> = {
  "process-first": {
    title: "Lead with Process Change",
    summary: "Your context suggests that designing and implementing the new processes first, then enabling people to adopt them, is the strongest approach. This works when the future state is clear, the timeline is tight, and people have the foundational capability to adapt.",
    tradeoffs: {
      benefits: [
        "Provides concrete clarity: people can see and touch what the new way of working looks like",
        "Faster to implement when the design is already sound",
        "Creates a clear training target, making enablement more focused",
        "Works well when regulatory or technical deadlines are non-negotiable",
      ],
      risks: [
        "Can feel imposed if people were not consulted during the design phase",
        "Risks building processes based on assumptions that prove wrong at the frontline",
        "May generate compliance without genuine commitment",
        "If the process is wrong, rework is expensive and trust is damaged",
      ],
    },
  },
  "people-first": {
    title: "Lead with People Change",
    summary: "Your context suggests that investing in people first, building understanding, developing capability, and creating readiness, before introducing new processes, will produce the best outcome. This works when the change requires new mindsets, when resistance stems from lack of understanding, and when the future state benefits from frontline input.",
    tradeoffs: {
      benefits: [
        "Builds genuine ownership because people understand the why before the what",
        "Processes designed after people engagement tend to reflect operational reality",
        "Reduces resistance during implementation because people feel heard and prepared",
        "Creates change champions who can support their peers through the transition",
      ],
      risks: [
        "Takes longer, which can be problematic when external deadlines exist",
        "Can feel like a lot of talking without action if not managed carefully",
        "People may develop expectations that are hard to meet in the final process design",
        "Requires strong facilitation to convert engagement into tangible process outcomes",
      ],
    },
  },
  simultaneous: {
    title: "Change People and Process Together",
    summary: "Your context suggests that the most effective approach is to evolve people and processes in parallel. This works when the future state is still being shaped, when cross-functional coordination is essential, and when both capability gaps and process gaps are significant.",
    tradeoffs: {
      benefits: [
        "Creates a feedback loop: people inform process design while process design builds capability",
        "Keeps momentum because neither workstream waits for the other",
        "Best suited for complex, cross-functional changes where everything is interconnected",
        "Produces more resilient outcomes because the design is tested and refined with real users",
      ],
      risks: [
        "The most complex approach to manage, requiring strong coordination",
        "Can feel chaotic if governance and communication are not tight",
        "Harder to measure progress because both dimensions are moving at once",
        "Requires leaders who are comfortable with ambiguity and iteration",
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Expandable Detail Items                                            */
/* ------------------------------------------------------------------ */

interface DetailItem {
  id: string;
  title: string;
  content: string[];
}

const processDesignPrinciples: DetailItem[] = [
  {
    id: "start-from-behaviour",
    title: "Start from behaviour, not from workflow diagrams",
    content: [
      "Most process redesign starts with a current-state map and a future-state map. The gap between them becomes the implementation plan. This is logical but insufficient. It treats process change as a technical exercise when it is fundamentally a behavioural one.",
      "The first question should not be 'what does the new workflow look like?' It should be 'what do we need people to actually do differently, and what will make that natural rather than forced?' A process that looks elegant on paper but requires people to fight their instincts every day will fail.",
      "Design from the behaviour outward. Identify the five or six critical behaviours the future state requires, then build processes that make those behaviours the path of least resistance.",
    ],
  },
  {
    id: "remove-old-reinforcement",
    title: "Identify and remove what reinforces the old state",
    content: [
      "Organisations are full of invisible reinforcement mechanisms that keep the old way of working alive. Approval chains that reward caution. Metrics that measure activity rather than outcomes. Systems that force workarounds. Meeting structures that replicate hierarchy.",
      "If you redesign a process without dismantling the reinforcement mechanisms of the old one, people will be caught between two systems. They will default to the familiar one because it is what their environment rewards.",
      "Conduct a reinforcement audit before finalising any new process. For every new behaviour the process requires, ask: what in our current environment actively discourages this behaviour? Then remove or redesign those reinforcements before you ask people to change.",
    ],
  },
  {
    id: "design-for-transition",
    title: "Design for the transition, not just the end state",
    content: [
      "Most process designs describe the future state as though people will arrive there on day one. They will not. There is always a transition period where people are learning, making mistakes, and falling back to old habits.",
      "A well-designed process includes a transition architecture: temporary scaffolding that supports people while they build new muscle memory. This might mean simplified decision criteria for the first three months, buddy systems for complex new workflows, or parallel running of old and new processes during a handover period.",
      "The transition design is not a compromise. It is a recognition that human adoption follows a learning curve, and the process should accommodate that curve rather than ignore it.",
    ],
  },
  {
    id: "test-with-real-people",
    title: "Test with real people in real conditions",
    content: [
      "Process designs that are developed in workshops and approved in steering committees often fail on contact with reality. The gap between how a process looks on a screen and how it feels at a desk at 4pm on a Friday is significant.",
      "Before rolling out any new process, test it with a representative group of the people who will actually use it. Not a demo. Not a walkthrough. Actual use, in actual conditions, with actual data and actual time pressure.",
      "The feedback from this testing is not a nice-to-have. It is the most important input into your process design. If you skip it, you are choosing assumption over evidence.",
    ],
  },
  {
    id: "build-in-feedback-loops",
    title: "Build feedback loops into the process itself",
    content: [
      "Static processes decay. The moment a new process is implemented, the environment begins to change around it. Customer expectations shift. Team composition evolves. Technology updates. A process without feedback loops will become the next legacy system you have to redesign.",
      "Build in structured moments where the process is reviewed by the people who use it. Not annual reviews. Frequent, lightweight check-ins that ask: what is working? What is creating friction? What has changed since we designed this?",
      "The best processes are living systems, not fixed documents. They evolve because the mechanism for evolution is built into the process itself.",
    ],
  },
];

const sequencingPrinciples: DetailItem[] = [
  {
    id: "neither-is-optional",
    title: "Neither people change nor process change is optional",
    content: [
      "One of the most common mistakes in change management is treating people change and process change as separate workstreams that can be prioritised independently. They cannot. A new process without people who understand and commit to it is a document. People who are ready to change but have no new process to follow will revert to the old way within weeks.",
      "The question is never whether to do both. It is how to sequence them so they reinforce each other. The right sequence depends on your context, but both must happen.",
    ],
  },
  {
    id: "sequence-is-not-binary",
    title: "Sequencing is not binary, it is a rhythm",
    content: [
      "When we talk about 'process first' or 'people first', we are describing emphasis, not exclusion. Even when you lead with process design, you are doing some people work: communicating, consulting, building awareness. Even when you lead with people, you are sketching process possibilities to make the change tangible.",
      "Think of sequencing as a rhythm rather than a switch. In a process-first approach, the beat is: design, consult, refine, train, support. In a people-first approach, the beat is: engage, explore, co-design, test, adopt. In a simultaneous approach, both beats play together, which requires more coordination but can produce richer outcomes.",
    ],
  },
  {
    id: "watch-for-drift",
    title: "Watch for the moment when process and people drift apart",
    content: [
      "In any change programme, there is a risk that process change and people change lose synchronisation. Process design accelerates while enablement lags behind. Or people are ready but the new systems are not. This drift is one of the most reliable predictors of change failure.",
      "Build checkpoints into your plan where you explicitly assess alignment. Are people keeping pace with the process changes being introduced? Are the processes keeping pace with the capability people are developing? If the answer to either is no, slow down the faster workstream rather than speeding up the slower one.",
    ],
  },
  {
    id: "legacy-processes-are-cultural",
    title: "Legacy processes are cultural artefacts, not just operational ones",
    content: [
      "A process that has been in place for years is not just a workflow. It is a set of relationships, power structures, informal norms, and identity markers. When you change a process, you are changing all of these things, whether you intend to or not.",
      "This is why process change that ignores the cultural dimension so often fails. People resist not because the new process is bad, but because the old process was theirs. It was how they demonstrated competence, how they navigated the organisation, how they understood their role. Acknowledging this cultural dimension openly makes the transition more honest and more effective.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "NUMMI",
    headline: "How Toyota transformed GM's worst plant by changing the process first, then watching the culture follow",
    hook: "Same workers. Same factory. New process system. Absenteeism dropped from 20% to 2%.",
    dimension: "Process-First Change",
    body: [
      "In 1984, Toyota and General Motors launched NUMMI (New United Motor Manufacturing, Inc.), a joint venture that reopened a shuttered GM plant in Fremont, California. The plant had been closed in 1982 after years of disastrous performance: 20% absenteeism, wildcat strikes, drugs and alcohol on the shop floor, and the worst quality record in GM's entire system.",
      "Toyota did something remarkable. It rehired the same workforce, including many of the workers who had been responsible for the plant's dysfunction. But it introduced the Toyota Production System: standardised work, team-based production, the andon cord that let any worker stop the production line to flag a defect, and a fundamentally different relationship between workers and management.",
      "The approach was process-first, but not process-only. Before reopening, Toyota sent hundreds of workers to Japan to train at the Takaoka plant, learning the new system by doing it. The process change came with deep investment in enabling people to succeed within it. The system was designed to make quality the path of least resistance.",
      "The results were extraordinary. Absenteeism fell immediately from 20% to 2%. Within a year, NUMMI was producing cars with the lowest defect rates in the United States, comparable to Toyota's Japanese plants. As John Shook, who was directly involved, later wrote for MIT Sloan Management Review: 'It is easier to act your way to a new way of thinking than to think your way to a new way of acting.'",
    ],
    lesson: "NUMMI demonstrates that when the future-state process is well-designed and the enabling conditions are right, leading with process change can transform even the most resistant culture. The key is that the process must be designed to support people, not just control them. Toyota did not impose a new process and hope for the best. It designed a system where doing the right thing was easier than doing the wrong thing, then invested heavily in helping people learn it.",
    source: "https://sloanreview.mit.edu/article/how-to-change-a-culture-lessons-from-nummi/",
    sourceLabel: "MIT Sloan Management Review",
  },
  {
    label: "NHS NPfIT",
    headline: "The NHS spent more than 10 billion pounds redesigning processes without bringing people along",
    hook: "The largest public-sector IT programme in history. Designed without its users. Dismantled after a decade.",
    dimension: "Process Without People",
    body: [
      "In 2002, the UK government launched the National Programme for IT (NPfIT), the most ambitious healthcare IT initiative ever attempted. The goal was to digitise the entire National Health Service: electronic patient records, online appointment booking, electronic prescriptions, and a national network connecting every hospital and GP surgery in England. The initial budget was 6.2 billion pounds.",
      "The programme was designed and procured centrally, with contracts awarded to major IT vendors including Accenture, CSC, Fujitsu, and BT. The process redesign was extensive and technically sound on paper. But it was done with almost no meaningful consultation with the doctors, nurses, and administrators who would actually use the systems every day.",
      "The consequences were predictable. Clinicians resisted systems that did not reflect their workflows. GPs refused to adopt electronic records they had no role in designing. Key stakeholders raised concerns from the outset about accessibility, utility, and patient confidentiality, but these were overridden in favour of the centralised plan. Accenture withdrew from its contract in 2006. Fujitsu followed.",
      "The NPfIT was officially dismantled in September 2011. The total cost to taxpayers exceeded 10 billion pounds, with some estimates reaching 12.7 billion. The government acknowledged the programme had delivered only around 2.6 billion in actual benefits. An independent review concluded the programme had failed because of its top-down approach, its lack of user engagement, and its assumption that people would simply adopt new processes because the technology was available.",
    ],
    lesson: "The NHS NPfIT is a definitive case study in what happens when process redesign is treated as a purely technical exercise. The processes were redesigned without the people who would use them, and billions were spent building systems that clinicians did not trust, did not want, and ultimately did not adopt. The lesson is not that process redesign is wrong. It is that process redesign without people engagement is waste.",
    source: "https://www.henricodolfing.com/2019/01/case-study-10-billion-it-disaster.html",
    sourceLabel: "Henrico Dolfing",
  },
  {
    label: "DBS Bank",
    headline: "DBS transformed people and processes simultaneously to become the world's best digital bank",
    hook: "A traditional Southeast Asian bank became a technology company. By changing everything at once, deliberately.",
    dimension: "Simultaneous Change",
    body: [
      "In 2014, DBS Bank, the largest bank in Southeast Asia, embarked on a digital transformation under CEO Piyush Gupta with the ambition of becoming the 'World's Best Digital Bank'. The strategy, internally called 'Making Banking Joyful', rested on three pillars: digital to the core, customer obsession, and a startup culture. This was not a technology project. It was a simultaneous transformation of processes, people, and culture.",
      "On the process side, DBS partnered with McKinsey to rebuild its operating model around 33 platforms aligned to business segments and products, each co-led by a business leader and a technology leader. The bank re-engineered customer journeys end to end, eliminating friction and automating manual processes. It adopted agile and DevOps methodologies across the organisation.",
      "Crucially, the people change happened in parallel, not after. DBS launched a programme to develop a 'startup mindset' across all 22,000 employees. It introduced hackathons, experimentation frameworks, and data-driven decision-making as cultural norms. It redesigned performance management to reward innovation and learning, not just delivery. New ways of working were introduced alongside new processes, so neither got ahead of the other.",
      "The results validated the approach. DBS was named 'World's Best Digital Bank' by Euromoney and 'World's Most Innovative in Digital Banking' by The Banker. The transformation has become one of the most studied cases in business schools globally, with case studies published by Harvard Business School, IMD, INSEAD, and Singapore Management University.",
    ],
    lesson: "DBS demonstrates that simultaneous people and process change, while the most complex approach to manage, can produce transformational results when the coordination is strong. The bank did not sequence one before the other. It changed the operating model, the technology, the culture, and the capability together, keeping them aligned through strong governance and constant communication. The lesson is that when the change is fundamental, sequencing may not be enough. You may need to move everything at once.",
    source: "https://www.mckinsey.com/capabilities/tech-and-ai/how-we-help-clients/rewired-in-action/dbs-transforming-a-banking-leader-into-a-technology-leader",
    sourceLabel: "McKinsey & Company",
  },
];

/* ------------------------------------------------------------------ */
/*  Self-Check Items                                                   */
/* ------------------------------------------------------------------ */

const checkItems = [
  { key: "behaviour", label: "We have identified the critical behaviours the new process requires, not just the workflow steps" },
  { key: "reinforcement", label: "We have audited what in our current environment reinforces the old way of working and have a plan to change it" },
  { key: "transition", label: "We have designed a transition period with scaffolding, not just a go-live date" },
  { key: "tested", label: "The new process has been tested with real users in real conditions before full rollout" },
  { key: "feedback", label: "There is a built-in feedback mechanism so the process can evolve after launch" },
  { key: "sequenced", label: "We have made a deliberate decision about the sequencing of people change and process change based on our context" },
  { key: "aligned", label: "We have checkpoints to ensure process change and people change stay synchronised" },
  { key: "cultural", label: "We have acknowledged what the old process meant to people beyond its operational function" },
  { key: "metrics", label: "Our success metrics measure adoption and effectiveness, not just implementation completion" },
  { key: "ownership", label: "The people who will use the new process had meaningful input into its design" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProcessDesign() {
  const [sequencingAnswers, setSequencingAnswers] = useState<Record<string, SequencingResult>>({});
  const [showSequencingResult, setShowSequencingResult] = useState(false);
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);
  const [expandedSequencing, setExpandedSequencing] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const allSequencingAnswered = Object.keys(sequencingAnswers).length === sequencingQuestions.length;

  function getSequencingRecommendation(): SequencingResult {
    const counts: Record<SequencingResult, number> = { "process-first": 0, "people-first": 0, simultaneous: 0 };
    Object.values(sequencingAnswers).forEach((v) => { counts[v]++; });
    if (counts["process-first"] >= counts["people-first"] && counts["process-first"] >= counts.simultaneous) return "process-first";
    if (counts["people-first"] >= counts["process-first"] && counts["people-first"] >= counts.simultaneous) return "people-first";
    return "simultaneous";
  }

  const recommendation = getSequencingRecommendation();
  const result = sequencingResults[recommendation];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      {/* ---- HEADER ---- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Enablement &middot; Process Design</span>
          <h1 className="article-title">How to redesign processes that reinforce the future state, and when to sequence process change with people change</h1>
          <p className="article-intro">Process redesign is where strategy becomes operational reality. But too many organisations treat it as a technical exercise: map the current state, design the future state, train people on the new workflow. The result is processes that look right on paper but collapse on contact with human behaviour. Effective process design starts from behaviour, removes the reinforcement mechanisms of the old state, and sequences process change and people change so that each makes the other possible.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ---- SEQUENCING DECISION TOOL ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Sequencing Decision Tool</h2>
          <p className="article-section-desc">Should you change the process first, the people first, or both together? The answer depends on your context. Answer these five questions to get a recommendation, along with the trade-offs of each approach.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="assessment-pairs">
            {sequencingQuestions.map((q) => (
              <div key={q.id} className="pair-row">
                <span className="pair-theme">{q.question}</span>
                <div className="pair-options" style={{ flexDirection: "column", gap: "10px" }}>
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={`pair-option${sequencingAnswers[q.id] === opt.value && sequencingQuestions.findIndex(sq => sq.id === q.id) === oi ? "" : ""}${sequencingAnswers[q.id] === opt.value && q.options[oi] === opt ? " pair-selected" : ""}`}
                      style={{ textAlign: "left" }}
                      onClick={() => setSequencingAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {sequencingAnswers[q.id] && (
                  <div className="detail-block" style={{ marginTop: "12px" }}>
                    <p className="detail-body" style={{ marginBottom: 0, fontSize: "0.95rem", opacity: 0.85 }}>
                      {q.options.find((o) => o.value === sequencingAnswers[q.id])?.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {allSequencingAnswered && !showSequencingResult && (
              <button className="btn" style={{ marginTop: "28px" }} onClick={() => setShowSequencingResult(true)}>
                See My Recommendation
              </button>
            )}

            {showSequencingResult && (
              <div className="assessment-result">
                <h3 className="assessment-result-title">{result.title}</h3>
                <p className="assessment-result-desc">{result.summary}</p>

                <div className="phase-compare" style={{ marginTop: "24px" }}>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">Benefits of this approach</span>
                    <ul style={{ paddingLeft: "18px", margin: "8px 0 0" }}>
                      {result.tradeoffs.benefits.map((b, i) => (
                        <li key={i} style={{ marginBottom: "6px", fontSize: "0.95rem" }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">Risks to manage</span>
                    <ul style={{ paddingLeft: "18px", margin: "8px 0 0" }}>
                      {result.tradeoffs.risks.map((r, i) => (
                        <li key={i} style={{ marginBottom: "6px", fontSize: "0.95rem" }}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="detail-block detail-block-warning" style={{ marginTop: "20px" }}>
                  <h3 className="detail-block-title">Remember</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>This recommendation is a starting point, not a prescription. The right sequencing may shift as your change progresses. Build checkpoints to reassess whether people and process change are staying aligned.</p>
                </div>

                <button
                  className="btn"
                  style={{ marginTop: "20px", background: "transparent", border: "1px solid var(--navy)", color: "var(--navy)" }}
                  onClick={() => {
                    setSequencingAnswers({});
                    setShowSequencingResult(false);
                  }}
                >
                  Reset and Try Again
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ---- PROCESS DESIGN PRINCIPLES ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Five Principles for Future-State Process Design</h2>
          <p className="article-section-desc">Most process redesign reinforces the old state without realising it. These five principles ensure your new processes actually support the behaviours and outcomes the future state requires.</p>
        </ScrollReveal>

        <div className="detail-list">
          {processDesignPrinciples.map((item, i) => (
            <ScrollReveal key={item.id} direction="up" delay={i * 60}>
              <div className="detail-list-item">
                <button
                  className={`detail-list-toggle${expandedPrinciple === item.id ? " detail-list-open" : ""}`}
                  onClick={() => setExpandedPrinciple(expandedPrinciple === item.id ? null : item.id)}
                >
                  <span className="detail-list-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="detail-list-name">{item.title}</span>
                  <span className="detail-list-arrow">{expandedPrinciple === item.id ? "\u2212" : "+"}</span>
                </button>
                {expandedPrinciple === item.id && (
                  <div className="detail-list-body">
                    {item.content.map((p, pi) => (
                      <p key={pi} className="detail-body">{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---- SEQUENCING PRINCIPLES ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Sequencing People Change and Process Change</h2>
          <p className="article-section-desc">The relationship between people change and process change is one of the most important design decisions in any transformation. These principles will help you get the rhythm right.</p>
        </ScrollReveal>

        <div className="detail-list">
          {sequencingPrinciples.map((item, i) => (
            <ScrollReveal key={item.id} direction="up" delay={i * 60}>
              <div className="detail-list-item">
                <button
                  className={`detail-list-toggle${expandedSequencing === item.id ? " detail-list-open" : ""}`}
                  onClick={() => setExpandedSequencing(expandedSequencing === item.id ? null : item.id)}
                >
                  <span className="detail-list-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="detail-list-name">{item.title}</span>
                  <span className="detail-list-arrow">{expandedSequencing === item.id ? "\u2212" : "+"}</span>
                </button>
                {expandedSequencing === item.id && (
                  <div className="detail-list-body">
                    {item.content.map((p, pi) => (
                      <p key={pi} className="detail-body">{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---- SELF-CHECK ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Process Design Readiness Check</h2>
          <p className="article-section-desc">Use this checklist to assess whether your process redesign has the depth it needs to survive contact with reality.</p>
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
                  <span className="check-complete"> &mdash; Your process design is thorough and people-centred. You are ready to implement.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Close the remaining gaps before go-live.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Significant gaps remain. Your process may not stick without addressing these.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Your process redesign is at risk. Address these fundamentals before proceeding.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ---- CTA ---- */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Enablement</strong>, the third pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ---- SIDEBAR ---- */}
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

      {/* ---- CASE STUDY MODAL ---- */}
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
