"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const dimensions = [
  {
    id: "people",
    icon: "👤",
    name: "People",
    summary: "Who is affected, how they feel, and what they need to move forward.",
    what: "A people assessment looks at the individuals and teams who will be impacted by the change. It goes beyond headcount and org charts to understand how people are currently experiencing their work, their level of trust in leadership, and their emotional readiness for change.",
    questions: [
      "Who are the key groups affected by this change?",
      "What is the current level of trust between leadership and the workforce?",
      "How have people responded to previous change initiatives?",
      "What concerns or anxieties are already surfacing, even informally?",
      "Where are the informal influencers who shape how others feel about change?",
    ],
    methods: [
      "One-to-one interviews with a cross-section of impacted staff",
      "Focus groups with frontline teams, not just managers",
      "Listening sessions where leadership receives, not delivers, the message",
      "Review of exit interview data and engagement survey trends",
    ],
    blindSpots: [
      "Relying solely on surveys, which tell you what people say, not what they feel",
      "Only talking to managers and assuming they represent their teams",
      "Ignoring the emotional residue of previous failed changes",
    ],
  },
  {
    id: "process",
    icon: "⚙️",
    name: "Process",
    summary: "How work actually gets done today, not how it is documented.",
    what: "A process assessment examines the real workflows, handoffs, and decision points that define how work gets done. The goal is to understand the gap between documented processes and actual practice, because change that targets the former while ignoring the latter will fail.",
    questions: [
      "What are the core processes that this change will impact?",
      "Where do workarounds exist, and what do they tell us about the current system?",
      "Which processes are owned clearly, and which fall between teams?",
      "How long do decisions actually take compared to how long they should take?",
      "What processes are people most frustrated with today?",
    ],
    methods: [
      "Process walk-throughs with the people who actually do the work",
      "Shadowing and observation of real workflows",
      "Mapping the difference between the documented process and the actual process",
      "Reviewing escalation logs and bottleneck data",
    ],
    blindSpots: [
      "Assuming the process map on the wall reflects reality",
      "Overlooking informal workarounds that people depend on daily",
      "Treating process issues as people problems",
    ],
  },
  {
    id: "culture",
    icon: "🏛️",
    name: "Culture",
    summary: "The unwritten rules, behaviours, and norms that shape how things really work.",
    what: "Culture is the environment in which change either takes root or dies. A culture assessment seeks to understand the values, behaviours, and power dynamics that operate beneath the surface. It asks: what does this organisation reward, tolerate, and punish, and how will that help or hinder the change?",
    questions: [
      "What behaviours get rewarded here, formally and informally?",
      "How does the organisation respond to failure or mistakes?",
      "Is there psychological safety to raise concerns or challenge decisions?",
      "How are decisions really made, through hierarchy, consensus, or influence?",
      "What stories do people tell about this organisation, and what do those stories reveal?",
    ],
    methods: [
      "Cultural artefact analysis: what do the office, comms, rituals, and language tell you?",
      "Narrative interviews: ask people to tell stories, not answer questions",
      "Observation of meetings, especially how conflict and disagreement are handled",
      "Review of what gets celebrated, promoted, and tolerated",
    ],
    blindSpots: [
      "Trying to measure culture through a survey alone",
      "Confusing stated values with lived values",
      "Assuming culture is the same across teams, locations, or levels",
    ],
  },
  {
    id: "capability",
    icon: "📐",
    name: "Capability",
    summary: "Whether people have the skills, knowledge, and confidence to work in new ways.",
    what: "A capability assessment looks at whether the organisation and its people have what they need to operate in the future state. This is not just about training needs. It is about confidence, judgement, and the practical ability to do things differently when it matters.",
    questions: [
      "What new skills or knowledge will the change require?",
      "Where are the biggest capability gaps between current and future state?",
      "How confident are people in their ability to adapt to new ways of working?",
      "What learning has already been tried, and how effective was it?",
      "Are managers equipped to coach and support their teams through the transition?",
    ],
    methods: [
      "Skills gap analysis mapped to specific future-state requirements",
      "Self-assessment surveys paired with manager validation",
      "Review of past training effectiveness and completion data",
      "Interviews with managers about where their teams struggle most",
    ],
    blindSpots: [
      "Equating training completion with capability",
      "Focusing only on technical skills and ignoring behavioural capability",
      "Assuming managers can support the change without being supported themselves",
    ],
  },
  {
    id: "systems",
    icon: "💻",
    name: "Systems",
    summary: "The technology, tools, and infrastructure that enable or constrain the way people work.",
    what: "A systems assessment examines whether the current technology landscape supports or inhibits the change. It looks at the tools people use daily, the data they rely on, and the infrastructure that connects (or disconnects) the organisation. Systems that are not ready for the future state will undermine adoption no matter how good the people strategy is.",
    questions: [
      "What systems and tools will be directly impacted by this change?",
      "Where are people using workarounds because the current systems do not support them?",
      "How integrated are existing systems, or are teams working in silos?",
      "What data do people need to do their jobs, and can they access it easily today?",
      "What is the organisation's track record with technology implementations?",
    ],
    methods: [
      "System usage and adoption data review",
      "Interviews with end users about their daily experience with tools",
      "IT architecture review mapped against future-state requirements",
      "Analysis of shadow IT and unofficial tools teams have adopted",
    ],
    blindSpots: [
      "Letting IT define the systems assessment without end-user input",
      "Assuming a new system will fix a broken process",
      "Underestimating the emotional attachment people have to familiar tools",
    ],
  },
];

export default function CurrentStateAssessment() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const checkItems = [
    { key: "people", label: "We have spoken directly to the people affected, not just their managers" },
    { key: "process-real", label: "We have mapped how work actually gets done, not just how it is documented" },
    { key: "culture", label: "We have explored the unwritten rules and behaviours that shape this organisation" },
    { key: "capability", label: "We know where the real capability gaps are, not just the training needs" },
    { key: "systems", label: "We have assessed systems from the end-user perspective, not just IT" },
    { key: "blind-spots", label: "We have actively looked for what we might be missing or assuming" },
    { key: "leadership", label: "Leaders have engaged with the findings, not just received a report" },
    { key: "baseline", label: "We have established a clear baseline we can measure progress against" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  function toggle(id: string) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <>
      <Nav />

      {/* HEADER */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Change Diagnosis</span>
          <h1 className="article-title">How to conduct a current state assessment that reveals what surveys miss</h1>
          <p className="article-intro">Most current state assessments scratch the surface. They gather data, produce reports, and confirm what leadership already suspects. A meaningful assessment goes deeper. It uncovers the patterns, tensions, and truths that explain why the organisation operates the way it does, and what needs to shift for change to take hold.</p>
        </ScrollReveal>
      </div>

      {/* LEVEL 1: OVERVIEW */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Five Dimensions</h2>
          <p className="article-section-desc">A complete current state assessment examines the organisation through five lenses. Each reveals something the others cannot. Click any dimension to explore it in depth.</p>
        </ScrollReveal>

        <div className="dimension-grid">
          {dimensions.map((d, i) => (
            <ScrollReveal key={d.id} direction="up" delay={i * 80}>
              <button
                className={`dimension-card${expanded === d.id ? " dimension-card-active" : ""}`}
                onClick={() => toggle(d.id)}
              >
                <span className="dimension-icon">{d.icon}</span>
                <span className="dimension-name">{d.name}</span>
                <span className="dimension-summary">{d.summary}</span>
                <span className="dimension-expand">{expanded === d.id ? "Close" : "Explore"} &darr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* LEVEL 2: EXPANDABLE DETAIL */}
      {expanded && (
        <section className="article-section dimension-detail" id={`detail-${expanded}`}>
          {dimensions
            .filter((d) => d.id === expanded)
            .map((d) => (
              <div key={d.id}>
                <ScrollReveal direction="up">
                  <div className="detail-header">
                    <span className="dimension-icon-lg">{d.icon}</span>
                    <h2 className="detail-title">{d.name}</h2>
                  </div>
                  <p className="detail-body">{d.what}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Key Questions to Ask</h3>
                    <ul className="detail-list">
                      {d.questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={200}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Methods Beyond Surveys</h3>
                    <ul className="detail-list detail-list-methods">
                      {d.methods.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300}>
                  <div className="detail-block detail-block-warning">
                    <h3 className="detail-block-title">Common Blind Spots</h3>
                    <ul className="detail-list">
                      {d.blindSpots.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            ))}
        </section>
      )}

      {/* LEVEL 3: SELF-CHECK */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Assessment Complete?</h2>
          <p className="article-section-desc">Use this checklist to evaluate whether your current state assessment has the depth and breadth it needs. Be honest with yourself.</p>
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
                  <span className="check-complete"> &mdash; Your assessment looks thorough.</span>
                )}
                {checkedCount > 0 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; There may be gaps worth revisiting.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Direction</strong>, the first pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
