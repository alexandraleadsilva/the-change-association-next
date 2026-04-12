"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ListItem {
  text: string;
  detail: string;
}

const dimensions = [
  {
    id: "people",
    num: "01",
    name: "People",
    summary: "Who is affected, how they feel, and what they need to move forward.",
    what: "A people assessment looks at the individuals and teams who will be impacted by the change. It goes beyond headcount and org charts to understand how people are currently experiencing their work, their level of trust in leadership, and their emotional readiness for change.",
    questions: [
      { text: "Who are the key groups affected by this change?", detail: "Map out every team, role, and individual who will experience a shift in how they work. Include those indirectly affected, such as teams who depend on the outputs of the changing group. The goal is a complete picture, not just the obvious stakeholders." },
      { text: "What is the current level of trust between leadership and the workforce?", detail: "Trust determines how change messages are received. If trust is low, even well-intentioned change will be met with suspicion. Look at recent decisions, communication patterns, and whether leadership has followed through on past commitments." },
      { text: "How have people responded to previous change initiatives?", detail: "Past experience shapes present expectations. If previous changes were poorly managed, people carry that memory forward. Understand what went well, what went badly, and what promises were broken. This is the emotional context your change will land in." },
      { text: "What concerns or anxieties are already surfacing, even informally?", detail: "The most valuable intelligence often comes from corridor conversations, not formal channels. Pay attention to what people say when they think no one is listening. These informal signals reveal the real concerns that surveys will never capture." },
      { text: "Where are the informal influencers who shape how others feel about change?", detail: "Every organisation has people whose opinions carry weight beyond their job title. These are the individuals others look to when deciding how to feel about something new. Identify them early, because they will either accelerate or undermine your change effort." },
    ] as ListItem[],
    methods: [
      { text: "One-to-one interviews with a cross-section of impacted staff", detail: "Select a diverse sample that includes different levels, tenures, locations, and perspectives. Use open-ended questions and give people space to speak honestly. The goal is to listen, not to present the change case." },
      { text: "Focus groups with frontline teams, not just managers", detail: "Managers often filter what they share upwards. Go directly to the people doing the work. Small groups of 6 to 8 people, facilitated well, will surface themes that individual interviews might miss." },
      { text: "Listening sessions where leadership receives, not delivers, the message", detail: "Invert the usual dynamic. Put leaders in a room where their job is to hear, ask questions, and take notes. This builds trust and gives leadership an unfiltered view of the current state." },
      { text: "Review of exit interview data and engagement survey trends", detail: "Look at patterns over time, not just the latest numbers. Are the same themes recurring? What do people say when they leave that they would not say while they were here? This data often contains the clearest diagnosis." },
    ] as ListItem[],
    blindSpots: [
      { text: "Relying solely on surveys, which tell you what people say, not what they feel", detail: "Surveys capture stated opinions in a structured format. They do not capture hesitation, frustration, or hope. They are a useful input but a dangerous sole source. Always triangulate with qualitative methods." },
      { text: "Only talking to managers and assuming they represent their teams", detail: "Managers have their own experience of change, which is different from their team's. They may also have reasons to present a rosier picture than reality. Always go to the source." },
      { text: "Ignoring the emotional residue of previous failed changes", detail: "Organisations have memory. If the last transformation was painful, people will bring that experience to this one. Acknowledge it directly rather than pretending this time is different without explaining why." },
    ] as ListItem[],
  },
  {
    id: "process",
    num: "02",
    name: "Process",
    summary: "How work actually gets done today, not how it is documented.",
    what: "A process assessment examines the real workflows, handoffs, and decision points that define how work gets done. The goal is to understand the gap between documented processes and actual practice, because change that targets the former while ignoring the latter will fail.",
    questions: [
      { text: "What are the core processes that this change will impact?", detail: "Start with a clear scope. Identify every process that will need to change, even partially. This includes upstream and downstream processes that may seem unrelated but are connected through handoffs, data, or dependencies." },
      { text: "Where do workarounds exist, and what do they tell us about the current system?", detail: "Workarounds are not evidence of laziness. They are evidence of a system that does not work as designed. Every workaround is a clue about where the official process fails people. Map them carefully, because they reveal the real operating model." },
      { text: "Which processes are owned clearly, and which fall between teams?", detail: "Processes that sit between teams are where most friction lives. No one owns them fully, so no one improves them. Identify these gaps because they are often where change fails to land." },
      { text: "How long do decisions actually take compared to how long they should take?", detail: "Decision latency is one of the most reliable indicators of organisational health. If decisions that should take a day take a month, that tells you something about governance, trust, and risk appetite. Measure it." },
      { text: "What processes are people most frustrated with today?", detail: "Ask people directly what slows them down, creates rework, or makes their job harder than it needs to be. Their frustrations point to the processes most in need of change, and also to the areas where change will be most welcomed." },
    ] as ListItem[],
    methods: [
      { text: "Process walk-throughs with the people who actually do the work", detail: "Sit with the people who run the process daily. Ask them to walk you through it step by step, including the parts that are not documented. You will learn more in one hour of this than in a week of reading process maps." },
      { text: "Shadowing and observation of real workflows", detail: "Watch how work actually flows. Observe the handoffs, the waiting, the rework, and the informal coordination that keeps things moving. Observation reveals what interviews and documents cannot." },
      { text: "Mapping the difference between the documented process and the actual process", detail: "Create two maps: the official version and the real version. The gap between them is your diagnosis. It shows where the organisation has outgrown its own design." },
      { text: "Reviewing escalation logs and bottleneck data", detail: "Escalations happen when the normal process breaks. Bottleneck data shows where work queues up. Together, these data sources reveal the structural weaknesses in your current operating model." },
    ] as ListItem[],
    blindSpots: [
      { text: "Assuming the process map on the wall reflects reality", detail: "Process documentation is often aspirational rather than descriptive. It shows how things were designed to work, not how they actually work. Treat it as a starting point, not the answer." },
      { text: "Overlooking informal workarounds that people depend on daily", detail: "If you remove a workaround without understanding why it exists, you will break something. People created it because they needed it. Understand the need before you change the solution." },
      { text: "Treating process issues as people problems", detail: "When things go wrong, it is tempting to blame the person. But most errors are system errors. If multiple people struggle with the same process, the process is the problem, not the people." },
    ] as ListItem[],
  },
  {
    id: "culture",
    num: "03",
    name: "Culture",
    summary: "The unwritten rules, behaviours, and norms that shape how things really work.",
    what: "Culture is the environment in which change either takes root or dies. A culture assessment seeks to understand the values, behaviours, and power dynamics that operate beneath the surface. It asks: what does this organisation reward, tolerate, and punish, and how will that help or hinder the change?",
    questions: [
      { text: "What behaviours get rewarded here, formally and informally?", detail: "Look beyond the stated values. What actually gets people promoted, praised, or protected? That is the real culture. If the organisation says it values collaboration but rewards individual heroics, that gap will undermine any change that depends on teamwork." },
      { text: "How does the organisation respond to failure or mistakes?", detail: "The response to failure reveals psychological safety. If mistakes lead to blame and punishment, people will avoid risk. If they lead to learning, people will experiment. Your change needs the latter." },
      { text: "Is there psychological safety to raise concerns or challenge decisions?", detail: "Can people disagree with their manager without consequences? Can they flag a problem without being seen as negative? If not, you will only hear what people think you want to hear, and your assessment will be incomplete." },
      { text: "How are decisions really made, through hierarchy, consensus, or influence?", detail: "The formal decision-making structure may not reflect reality. Decisions may be made in meetings, or they may be made in the car park afterwards. Understanding the real decision-making culture is essential for knowing how to navigate change." },
      { text: "What stories do people tell about this organisation, and what do those stories reveal?", detail: "Stories are the most honest expression of culture. The stories people tell new starters, the legends of what happened during the last restructure, the warnings about certain leaders. These narratives shape behaviour more than any policy document." },
    ] as ListItem[],
    methods: [
      { text: "Cultural artefact analysis: what do the office, comms, rituals, and language tell you?", detail: "Walk through the building. Read the internal newsletters. Attend the all-hands meetings. The physical environment, the language people use, and the rituals they maintain all reveal culture in ways that interviews cannot." },
      { text: "Narrative interviews: ask people to tell stories, not answer questions", detail: "Instead of asking what the culture is like, ask people to tell you about a time something went well, or a time something went wrong. Stories contain emotion, context, and meaning that direct questions strip away." },
      { text: "Observation of meetings, especially how conflict and disagreement are handled", detail: "Meetings are culture in action. Who speaks? Who stays silent? What happens when someone disagrees? How are decisions actually made versus how they are supposed to be made? Sit in and observe." },
      { text: "Review of what gets celebrated, promoted, and tolerated", detail: "Celebration reveals what the organisation values. Promotion reveals what it rewards. Toleration reveals what it accepts. Together, these three things define the culture more accurately than any values statement." },
    ] as ListItem[],
    blindSpots: [
      { text: "Trying to measure culture through a survey alone", detail: "Culture is experienced, not reported. A survey can capture perceptions, but it cannot capture the feeling of being in the room when a leader dismisses a concern. Qualitative methods are essential." },
      { text: "Confusing stated values with lived values", detail: "Every organisation has values on the wall. Very few live them consistently. The gap between stated and lived values is one of the most important things a culture assessment can reveal." },
      { text: "Assuming culture is the same across teams, locations, or levels", detail: "Culture varies. The culture in head office may be very different from the culture in a regional site. The culture at senior leadership level may be unrecognisable to frontline staff. Assess at the level where change needs to happen." },
    ] as ListItem[],
  },
  {
    id: "capability",
    num: "04",
    name: "Capability",
    summary: "Whether people have the skills, knowledge, and confidence to work in new ways.",
    what: "A capability assessment looks at whether the organisation and its people have what they need to operate in the future state. This is not just about training needs. It is about confidence, judgement, and the practical ability to do things differently when it matters.",
    questions: [
      { text: "What new skills or knowledge will the change require?", detail: "Be specific. Do not just say people need to be trained. Define exactly what they need to know and be able to do in the future state that they cannot do today. The more precise you are, the more targeted your enablement plan will be." },
      { text: "Where are the biggest capability gaps between current and future state?", detail: "Not all gaps are equal. Some are minor and can be closed with a quick briefing. Others are fundamental and will require sustained investment. Prioritise by impact: which gaps, if not closed, will prevent adoption?" },
      { text: "How confident are people in their ability to adapt to new ways of working?", detail: "Confidence matters as much as competence. People may have the skills on paper but lack the confidence to apply them under pressure. Assess both, because a confident person with moderate skill will outperform a skilled person with no confidence." },
      { text: "What learning has already been tried, and how effective was it?", detail: "Do not repeat what has already failed. Review previous training initiatives, their completion rates, and more importantly, whether they actually changed behaviour. If they did not, understand why before designing more of the same." },
      { text: "Are managers equipped to coach and support their teams through the transition?", detail: "Managers are the bridge between strategy and execution. If they cannot explain the change, answer questions, and support their teams through uncertainty, the change will stall at the middle layer of the organisation." },
    ] as ListItem[],
    methods: [
      { text: "Skills gap analysis mapped to specific future-state requirements", detail: "Start with the future state and work backwards. What does each role need to do differently? What skills does that require? Where is the gap? This gives you a targeted, actionable view rather than a generic training needs analysis." },
      { text: "Self-assessment surveys paired with manager validation", detail: "Ask people how confident they feel, then cross-reference with what their managers observe. The gap between self-perception and observed capability is where the real development needs sit." },
      { text: "Review of past training effectiveness and completion data", detail: "Completion is not effectiveness. Look at whether previous training changed behaviour, not just whether people attended. If 95% completed but nothing changed, the training was not the answer." },
      { text: "Interviews with managers about where their teams struggle most", detail: "Managers see the daily reality. They know which tasks take too long, which processes people avoid, and where errors cluster. Their perspective is one of the most practical inputs to a capability assessment." },
    ] as ListItem[],
    blindSpots: [
      { text: "Equating training completion with capability", detail: "Completing a course does not mean someone can do the thing. Capability requires practice, feedback, and application in context. If your assessment stops at attendance data, you are measuring the wrong thing." },
      { text: "Focusing only on technical skills and ignoring behavioural capability", detail: "Many changes require people to collaborate differently, communicate differently, or make decisions differently. These are behavioural capabilities, and they are often harder to build than technical ones." },
      { text: "Assuming managers can support the change without being supported themselves", detail: "Managers are expected to lead their teams through change while going through it themselves. If you do not equip and support them specifically, they become the weakest link in the chain." },
    ] as ListItem[],
  },
  {
    id: "systems",
    num: "05",
    name: "Systems",
    summary: "The technology, tools, and infrastructure that enable or constrain the way people work.",
    what: "A systems assessment examines whether the current technology landscape supports or inhibits the change. It looks at the tools people use daily, the data they rely on, and the infrastructure that connects or disconnects the organisation. Systems that are not ready for the future state will undermine adoption no matter how good the people strategy is.",
    questions: [
      { text: "What systems and tools will be directly impacted by this change?", detail: "Create a complete inventory. Include not just the major platforms but the spreadsheets, shared drives, and informal tools that people depend on. The systems you overlook are often the ones that cause the most disruption when they change." },
      { text: "Where are people using workarounds because the current systems do not support them?", detail: "Shadow IT and manual workarounds are symptoms of system failure. If people are exporting data to Excel because the reporting tool does not give them what they need, that is a system gap, not a user problem." },
      { text: "How integrated are existing systems, or are teams working in silos?", detail: "Integration matters because change often requires information to flow between teams that previously operated independently. If your systems do not talk to each other, your people will struggle to work together." },
      { text: "What data do people need to do their jobs, and can they access it easily today?", detail: "Data accessibility is a proxy for organisational effectiveness. If people spend time hunting for information, chasing approvals for access, or working with outdated data, the current systems are not serving them." },
      { text: "What is the organisation's track record with technology implementations?", detail: "Past technology rollouts leave a legacy. If the last system implementation was chaotic, people will approach this one with scepticism. Understand the history so you can address it directly." },
    ] as ListItem[],
    methods: [
      { text: "System usage and adoption data review", detail: "Look at actual usage patterns, not just licence counts. Which features are people using? Which are they ignoring? Low adoption of existing tools tells you something important about how the next tool will land." },
      { text: "Interviews with end users about their daily experience with tools", detail: "IT teams see systems from the inside. End users see them from the outside. Both perspectives matter, but the end user perspective is the one most often missing from technology assessments." },
      { text: "IT architecture review mapped against future-state requirements", detail: "Work with IT to understand what the current architecture can and cannot support. Identify technical constraints early so they do not become surprises during implementation." },
      { text: "Analysis of shadow IT and unofficial tools teams have adopted", detail: "The tools people choose to use when they have a choice tell you what the official tools are missing. Map the shadow IT landscape as a source of requirements, not a compliance problem." },
    ] as ListItem[],
    blindSpots: [
      { text: "Letting IT define the systems assessment without end-user input", detail: "IT knows the architecture. End users know the experience. A systems assessment that only includes the IT perspective will miss the human factors that determine whether a system is actually adopted." },
      { text: "Assuming a new system will fix a broken process", detail: "Technology amplifies whatever it is applied to. If you automate a broken process, you get a faster broken process. Fix the process first, then apply the technology." },
      { text: "Underestimating the emotional attachment people have to familiar tools", detail: "People build their routines, their shortcuts, and their sense of competence around the tools they use daily. Replacing those tools is not just a technical change. It is an identity change. Treat it with the seriousness it deserves." },
    ] as ListItem[],
  },
];

function ExpandableList({ items, type }: { items: ListItem[]; type: "questions" | "methods" | "blindSpots" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listClass = type === "methods" ? "detail-list detail-list-methods" : "detail-list";

  return (
    <ul className={listClass}>
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
                <span className="dimension-num">{d.num}</span>
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
                    <span className="dimension-num-lg">{d.num}</span>
                    <h2 className="detail-title">{d.name}</h2>
                  </div>
                  <p className="detail-body">{d.what}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Key Questions to Ask</h3>
                    <ExpandableList items={d.questions} type="questions" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={200}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Methods Beyond Surveys</h3>
                    <ExpandableList items={d.methods} type="methods" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300}>
                  <div className="detail-block detail-block-warning">
                    <h3 className="detail-block-title">Common Blind Spots</h3>
                    <ExpandableList items={d.blindSpots} type="blindSpots" />
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
