"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ───────────────────────────── types ───────────────────────────── */

interface DetailItem {
  text: string;
  detail: string;
}

/* ─────────────── resistance decoder data ─────────────── */

interface ResistanceSignal {
  id: string;
  behaviour: string;
  surfaceRead: string;
  actualSignal: string;
  whatItTellsYou: string;
  responseStrategy: string;
}

const resistanceSignals: ResistanceSignal[] = [
  {
    id: "silence",
    behaviour: "Silence in meetings and town halls",
    surfaceRead: "People are disengaged or do not care",
    actualSignal: "People do not feel safe enough to speak",
    whatItTellsYou: "Silence is not apathy. It is self-protection. When people stop asking questions, it usually means they have learned that questions are unwelcome, or that previous questions were dismissed. The absence of visible resistance is not the presence of commitment. It is often the most dangerous form of resistance because it is invisible until it is too late.",
    responseStrategy: "Create smaller, safer forums where people can speak without an audience. Use anonymous pulse surveys to surface what silence is hiding. Most importantly, when someone does speak up, respond with gratitude and action, not defence. One visible act of listening can unlock what months of town halls could not.",
  },
  {
    id: "compliance",
    behaviour: "Malicious compliance or box-ticking",
    surfaceRead: "People are being difficult or passive-aggressive",
    actualSignal: "People feel they have no real influence over the change",
    whatItTellsYou: "When people follow the letter of a change but not the spirit, they are telling you that they have given up trying to influence it. They have concluded that their input does not matter, so they do the minimum required to avoid consequences. This is not laziness. It is a rational response to powerlessness.",
    responseStrategy: "Reopen genuine channels for input. Ask people what would make this change work better for them, and demonstrate that their answers change something. Malicious compliance dissolves when people believe they have agency. Give them a decision they can actually influence, even a small one.",
  },
  {
    id: "nostalgia",
    behaviour: "Constant references to how things used to be",
    surfaceRead: "People are stuck in the past and cannot move on",
    actualSignal: "People are grieving a loss that has not been acknowledged",
    whatItTellsYou: "Nostalgia during change is not stubbornness. It is grief. People are mourning the loss of competence, identity, relationships, or a sense of mastery that took years to build. When the organisation only talks about the future, it invalidates the past and the investment people made in it. The more you dismiss nostalgia, the more fiercely people cling to it.",
    responseStrategy: "Explicitly acknowledge what is being lost, not just what is being gained. Honour the past before asking people to let go of it. Create a moment, in a meeting, a communication, or a ritual, where the organisation says: what we built before mattered, and the skills and relationships you developed are valuable even as we move forward.",
  },
  {
    id: "questions",
    behaviour: "Endless questions and requests for more detail",
    surfaceRead: "People are stalling or being obstructive",
    actualSignal: "People do not yet have enough information to feel safe",
    whatItTellsYou: "Excessive questioning is not obstruction. It is anxiety seeking structure. When people cannot see how the change affects them personally, they ask questions to try to build a picture. If the answers keep being vague or strategic, the questions will keep coming because the real question underneath all of them is: will I be okay?",
    responseStrategy: "Answer the personal question directly, even when it is uncomfortable. Tell people what changes for their role, what stays the same, and what support is available. Where you genuinely do not know yet, say so honestly and give a date by which you will know. Uncertainty with a timeline is manageable. Uncertainty without one is paralysing.",
  },
  {
    id: "workload",
    behaviour: "Claims of being too busy for the change",
    surfaceRead: "People are making excuses to avoid the change",
    actualSignal: "The organisation has not created capacity for the change",
    whatItTellsYou: "When people say they are too busy, they are usually telling the truth. Most change programs are layered on top of existing workloads without anything being deprioritised. People are being asked to learn new systems, attend training, and adopt new processes while delivering 100% of their current responsibilities. This is not resistance. It is a resourcing problem the program has not solved.",
    responseStrategy: "Audit the actual workload of impacted teams. Identify what can be paused, delegated, or deprioritised during the transition. If the answer is nothing, then the program is asking the impossible and will get compliance at best, burnout at worst. Creating capacity is a leadership responsibility, not an individual one.",
  },
  {
    id: "cynicism",
    behaviour: "Cynicism and eye-rolling about the change",
    surfaceRead: "People are negative and need to be brought around",
    actualSignal: "People have been burned by previous changes that failed or were abandoned",
    whatItTellsYou: "Cynicism is earned. It comes from experience. If the organisation has a history of launching changes that were quietly abandoned, restructures that promised improvement but delivered disruption, or consultations that were performative rather than genuine, then cynicism is a perfectly rational response. People are protecting themselves from investing emotionally in something they expect to be temporary.",
    responseStrategy: "Acknowledge the history directly. Say: we know that previous changes did not land the way they should have, and we understand why you might be sceptical about this one. Then demonstrate, through early actions rather than words, that this time is different. Cynics do not need convincing. They need evidence.",
  },
  {
    id: "workarounds",
    behaviour: "Creating workarounds to avoid the new process",
    surfaceRead: "People are undermining the change",
    actualSignal: "The new process does not work as well as the old one for their context",
    whatItTellsYou: "Workarounds are not sabotage. They are innovation under constraint. When people build a workaround, they are solving a problem that the change program did not anticipate. The workaround tells you exactly where the new design has gaps, where it fails to account for edge cases, or where the lived experience of the work differs from the documented process.",
    responseStrategy: "Treat workarounds as design feedback, not defiance. Map the workarounds people are creating, understand what problem each one solves, and feed that intelligence back into the design. Some workarounds will reveal genuine gaps that need to be fixed. Others will reveal training gaps where people need more support. Both are valuable.",
  },
  {
    id: "champions",
    behaviour: "Previously supportive people going quiet",
    surfaceRead: "Champions are losing enthusiasm",
    actualSignal: "Champions are losing credibility because promises made to them are not being kept",
    whatItTellsYou: "When your strongest advocates go quiet, it is one of the most serious signals in change management. Champions put their personal credibility on the line when they advocated for the change. If the program fails to deliver on what was promised, or if their feedback is ignored, they withdraw to protect their reputation. The loss of champions is not a morale problem. It is a trust breach.",
    responseStrategy: "Have a direct and honest conversation with withdrawn champions. Ask what has changed for them. In most cases, they will tell you exactly what promise was broken or what feedback was ignored. Fix it visibly. Champions who see their concerns acted on become even stronger advocates than before, because they can say: I raised a problem and it was fixed.",
  },
];

/* ─────────────── topic 1: change readiness ─────────────── */

const readinessItems: DetailItem[] = [
  {
    text: "A readiness assessment should measure willingness, not just awareness",
    detail: "Most readiness assessments ask whether people know about the change. Awareness is the lowest bar. The question that matters is whether people are willing to work differently. Willingness is shaped by trust in leadership, belief in the rationale, confidence in the support available, and personal calculation of what the change means for their role. A readiness assessment that only measures awareness will tell you that communications have been received. It will not tell you whether anyone intends to change.",
  },
  {
    text: "It should reveal the gap between leadership perception and frontline reality",
    detail: "In almost every organisation, leadership believes the change is further along than it actually is. They have been immersed in the strategy for months. They mistake their own familiarity for organisational readiness. A good readiness assessment deliberately measures both perspectives and presents the gap. This gap is not a failure. It is the most valuable data point the assessment produces, because it tells you exactly how much work remains and where the disconnect lives.",
  },
  {
    text: "It should identify pockets of readiness, not just an organisational average",
    detail: "An overall readiness score is almost meaningless. Readiness varies dramatically by team, by function, by geography, and by level. Some teams may be ready to move tomorrow. Others may be months away. A good assessment identifies these pockets so the change approach can be tailored. Treating a varied organisation as uniformly ready or uniformly unready wastes effort in both directions.",
  },
  {
    text: "It should surface the conditions that are missing, not just rate the current state",
    detail: "Rating readiness on a scale tells you where you are. It does not tell you what to do about it. A useful readiness assessment identifies the specific conditions that are absent: trust has not been built, capacity has not been created, managers have not been equipped, or the personal impact has not been communicated. These missing conditions become the work plan, not the score.",
  },
  {
    text: "It should be repeated, not treated as a one-time checkpoint",
    detail: "Readiness is not a gate to pass through. It is a dynamic state that shifts as the change progresses. A single assessment at the start of a program tells you about a moment in time that will not last. Readiness should be measured repeatedly, especially after major milestones, communications, or setbacks. The trend matters more than any individual score.",
  },
  {
    text: "It should measure emotional readiness alongside operational readiness",
    detail: "Operational readiness asks whether systems are configured, processes are documented, and training is scheduled. Emotional readiness asks whether people feel heard, supported, and confident enough to try something new. Programs that only measure operational readiness are frequently surprised when a technically ready organisation refuses to adopt the change. The emotional dimension is not a soft extra. It is the variable that determines whether operational readiness translates into actual adoption.",
  },
];

/* ─────────────── topic 2: stakeholder impact assessment ─────────────── */

const stakeholderItems: DetailItem[] = [
  {
    text: "Start with impact, not influence",
    detail: "Most stakeholder analyses begin by mapping influence and interest. This tells you who has power. It does not tell you who is most affected. A stakeholder impact assessment starts from the other direction: who will experience the most change in their daily work? Who will need to give up the most? Who will need to learn the most? Starting with impact ensures that the people who need the most support are identified first, not the people who have the most political weight.",
  },
  {
    text: "Map the specific dimensions of impact for each group",
    detail: "Impact is not a single score. It has dimensions: process impact (how much their workflow changes), role impact (whether their responsibilities shift), skill impact (what new capabilities they need), relationship impact (whether their teams, managers, or collaborators change), and identity impact (whether their professional identity or sense of competence is threatened). Assessing each dimension separately reveals that two groups with the same overall impact score may need completely different support.",
  },
  {
    text: "Include the people who think they are not affected",
    detail: "Every change has a ripple effect that extends beyond the official scope. Teams upstream and downstream, support functions, and people adjacent to the change will feel its effects even if they are not in the program scope. A stakeholder impact assessment that only covers the directly impacted will miss the groups who are blindsided by changes they were told would not affect them. These groups often become the loudest resisters because they were excluded from the conversation.",
  },
  {
    text: "Validate the assessment with the stakeholders themselves",
    detail: "An impact assessment written by the change team without input from the people being assessed is an assumption document, not an assessment. The most effective approach is to draft an initial assessment based on design documentation and then validate it directly with representatives from each stakeholder group. They will tell you what you missed, what you overestimated, and what you underestimated. This validation step also builds engagement because people feel consulted rather than categorised.",
  },
  {
    text: "Make the assessment drive the plan, not sit in a document",
    detail: "The most common failure of stakeholder impact assessments is that they are completed, filed, and forgotten. The assessment should directly shape the engagement plan, the communication approach, the training design, and the support model. If the assessment identifies that a particular group faces high identity impact, the plan should include specific interventions for that group. An assessment that does not change the plan is an exercise in compliance, not in change management.",
  },
  {
    text: "Reassess at every phase transition",
    detail: "Impact shifts as the change progresses. A group that was minimally affected during design may be heavily affected during deployment. A group that was heavily affected during training may stabilise after go-live. The assessment is not a snapshot. It is a living document that should be revisited at each major phase transition to ensure the support model still matches the reality of the impact.",
  },
];

/* ─────────────── topic 3: resistance reframed ─────────────── */

const resistanceItems: DetailItem[] = [
  {
    text: "Resistance is not a character flaw. It is a rational response to perceived threat.",
    detail: "The dominant framing in change management treats resistance as a problem to be overcome, a barrier, an obstacle, something that needs to be managed away. This framing is fundamentally wrong. Resistance is a rational response to perceived threat. When people resist change, they are protecting something that matters to them: their competence, their relationships, their identity, their sense of stability. The question is not how to overcome resistance. It is what is the resistance protecting, and is that something the program should be paying attention to?",
  },
  {
    text: "The language of resistance creates the problem it claims to describe",
    detail: "When organisations label people as resistant, they create an adversarial dynamic. The change team becomes the force pushing forward. The resisters become the force pushing back. This framing makes collaboration impossible because one side has been defined as the problem. If instead you treat resistance as feedback, the dynamic shifts entirely. People are not opposing the change. They are telling you something about the change that you need to hear. The best change practitioners do not manage resistance. They listen to it.",
  },
  {
    text: "Most resistance is caused by the change approach, not the change itself",
    detail: "Here is the finding that most change teams do not want to hear: the majority of resistance is not about the change. It is about how the change is being done. People resist when they are told rather than consulted. They resist when timelines are imposed without regard for their workload. They resist when their expertise is ignored in the design. They resist when they are asked to trust a process that has let them down before. Fix the approach and much of the resistance dissolves. Continue with a flawed approach and no amount of resistance management will help.",
  },
  {
    text: "Early resistance is cheaper than late resistance",
    detail: "Organisations that suppress early resistance pay for it later. Concerns that are dismissed in the design phase become defects in the deployment phase. Feedback that is ignored during consultation becomes active opposition during rollout. The people who raised their hand early and were told to get on board are the same people who say I told you so when the problems they predicted materialise. Early resistance is an investment opportunity. It costs almost nothing to listen and adjust. Late resistance costs rework, delay, and lost credibility.",
  },
  {
    text: "The people who resist most visibly are often your greatest asset",
    detail: "Visible resisters care enough to speak up. They have analysed the change, identified problems, and are willing to put their reputation on the line to raise them. This is exactly the behaviour the organisation should want. Quiet compliance means people have stopped caring enough to object. Visible resistance means people believe the change matters enough to fight for a better version of it. The most effective change leaders seek out their strongest critics, not to convert them, but to learn from them.",
  },
  {
    text: "Resistance often reveals problems with the change itself, not with the people",
    detail: "If a significant portion of an organisation is resisting a change, the most likely explanation is not that those people are all wrong. It is that the change has a problem. Perhaps the design does not work for the edge cases that frontline staff deal with daily. Perhaps the timeline is unrealistic. Perhaps the technology does not do what was promised. Resistance at scale is diagnostic. It is the organisation's immune system telling you that something needs attention. Treat it as data, not as a disease.",
  },
];

/* ─────────────── case studies ─────────────── */

const caseStudies = [
  {
    label: "Nokia",
    headline: "Nokia assessed everything except the one thing that mattered: whether its culture could support the change it needed",
    hook: "They had the technology, the market share, and the resources. They did not have the organisational honesty to face what their own people were telling them.",
    dimension: "Change Readiness",
    body: [
      "Nokia's decline from the world's dominant mobile phone manufacturer to near-irrelevance is frequently cited as a failure of technology strategy. It was not. Nokia had working touchscreen prototypes years before Apple launched the iPhone. The failure was one of change readiness: the organisation was structurally and culturally unable to act on what it knew.",
      "Nokia operated as a matrix organisation where multiple managers held equal authority. This created chronic power struggles, competing priorities, and a decision-making culture that rewarded consensus over speed. Middle managers learned to suppress bad news because the culture punished messengers. Senior leaders received reassuring readiness assessments that bore little resemblance to the reality on the ground.",
      "The gap between leadership perception and frontline reality was enormous. Senior leaders believed the organisation was ready to pivot to smartphones. Engineers and product managers knew the internal processes, approval chains, and cultural dynamics made rapid adaptation impossible. But readiness assessments measured what leadership wanted to hear, not what the organisation was actually experiencing.",
      "When Stephen Elop took over as CEO in 2010, his famous 'burning platform' memo acknowledged the crisis, but the readiness assessment that should have preceded the response never happened in any meaningful way. Nokia partnered with Microsoft on Windows Phone without assessing whether the organisation had the capability, willingness, or cultural conditions to execute such a radical pivot. The result was a transformation built on a readiness assumption that was fundamentally wrong.",
    ],
    lesson: "Nokia demonstrates that a change readiness assessment must measure the honest truth about organisational capability and willingness, not the version that leadership wants to see. When readiness assessments are designed to confirm rather than to challenge, they become instruments of self-deception.",
    source: "https://knowledge.insead.edu/strategy/who-killed-nokia-nokia-did",
    sourceLabel: "INSEAD Knowledge",
  },
  {
    label: "ING Bank",
    headline: "ING put 3,500 employees on mobility and asked them to reapply for their own jobs, then used resistance as a redesign tool",
    hook: "The agile transformation that worked because they treated resistance as intelligence, not insubordination.",
    dimension: "Stakeholder Impact",
    body: [
      "In 2015, ING Bank Netherlands undertook one of the most ambitious organisational transformations in European banking. Inspired by Spotify, Netflix, and Google, ING restructured its headquarters from a traditional hierarchy into approximately 350 nine-person squads organised into 13 tribes. The transformation affected roughly 3,500 people.",
      "The stakeholder impact was unprecedented in its directness: every affected employee was placed on mobility, effectively made jobless, and asked to reapply for a position in the new organisation. The selection process weighted cultural fit and growth mindset more heavily than technical knowledge or seniority. Approximately 25% of employees were not selected for the new structure.",
      "What made ING's approach distinctive was how it handled the impact assessment and subsequent resistance. Rather than treating the reselection process as a single event to push through, the bank invested heavily in understanding the specific dimensions of impact for each group. They identified that the primary impact for most people was not skill-based but identity-based: people who had built careers around functional expertise were being asked to become cross-functional team members. This required a fundamentally different support approach than technical retraining.",
      "Critically, ING used the resistance it encountered as design feedback. When squads struggled, rather than labelling them as resistant, the transformation team investigated what structural or support conditions were missing. They discovered that many who were expected to resist, including longer-tenured employees, adapted more quickly than anticipated, while some younger employees who were expected to thrive actually struggled because the new model required collaboration skills that were not being adequately developed.",
    ],
    lesson: "ING demonstrates that a stakeholder impact assessment must look beyond the obvious dimensions. The primary impact of a change is often identity and belonging, not process or skills. Organisations that assess and address the identity dimension of impact find that much of what looks like resistance is actually a rational response to an unaddressed loss.",
    source: "https://www.mckinsey.com/industries/financial-services/our-insights/ings-agile-transformation",
    sourceLabel: "McKinsey & Company",
  },
  {
    label: "Target Canada",
    headline: "Target opened 124 stores in a country it had never assessed and lost $7 billion learning what stakeholder impact analysis would have revealed for free",
    hook: "Every warning signal was there. The stakeholder impact assessment that could have saved $7 billion was never done.",
    dimension: "Resistance as Signal",
    body: [
      "In 2013, Target Corporation entered Canada with a plan to open 124 stores simultaneously, the largest retail expansion in Canadian history. By January 2015, every store was closed. The total cost of the failure exceeded $7 billion. The post-mortem revealed a cascade of failures that a genuine change impact assessment would have surfaced before a single store opened.",
      "Target acquired 220 leases from the departing Zellers chain without adequately assessing whether those locations met Target's operational requirements. Many were the wrong size, in the wrong locations, and required extensive renovation. The supply chain was built on an SAP implementation that was rushed and riddled with data quality problems. Stores opened with empty shelves, wrong products, and prices that were often higher than American Target stores, the exact opposite of what Canadian customers expected.",
      "The resistance signals were present from the earliest stages. Canadian retail experts warned that the Zellers locations were problematic. Supply chain staff flagged that the SAP data was unreliable. Store managers reported that shelves could not be stocked. But the program had no mechanism to treat these signals as legitimate feedback. The timeline was fixed, the commitments to investors were public, and the organisational culture rewarded optimism over honesty.",
      "The stakeholders most affected, Canadian employees, store-level managers, and local suppliers, were the last to be consulted and the first to see the problems. They had intimate knowledge of Canadian retail conditions, customer expectations, and operational realities. Their input, had it been systematically gathered through a stakeholder impact assessment, would have revealed that the gap between Target's operating model and Canadian market requirements was far wider than the executive team believed.",
    ],
    lesson: "Target Canada is a case study in what happens when an organisation skips the impact assessment entirely. Every signal that the change was failing was present. Employees, suppliers, and local managers were raising concerns from the start. The organisation chose to interpret those signals as resistance rather than intelligence, and it cost $7 billion.",
    source: "https://www.canadianbusiness.com/ideas/the-last-days-of-target-canada/",
    sourceLabel: "Canadian Business",
  },
];

/* ─────────────── expandable list component ─────────────── */

function ExpandableList({ items }: { items: DetailItem[] }) {
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

/* ─────────────── page component ─────────────── */

export default function ChangeImpactAssessment() {
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [decodedSignal, setDecodedSignal] = useState<ResistanceSignal | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const toggleSignal = (id: string) => {
    const signal = resistanceSignals.find(s => s.id === id);
    if (!signal) return;
    setSelectedSignals(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    setDecodedSignal(signal);
  };

  const checkItems = [
    { key: "willingness", label: "Our readiness assessment measures willingness and emotional readiness, not just awareness" },
    { key: "gap", label: "We have measured and openly discussed the gap between leadership perception and frontline reality" },
    { key: "pockets", label: "We have identified specific pockets of readiness and tailored our approach to each, rather than treating the organisation as uniform" },
    { key: "impact-dimensions", label: "Our stakeholder impact assessment maps multiple dimensions of impact (process, role, skill, relationship, identity) for each group" },
    { key: "validated", label: "We have validated the impact assessment directly with representatives from affected stakeholder groups" },
    { key: "ripple", label: "We have identified and included stakeholders outside the official program scope who will be affected by ripple effects" },
    { key: "resistance-listen", label: "When we encounter resistance, our first response is to listen and understand, not to manage or overcome" },
    { key: "early-signals", label: "We have mechanisms to surface and act on early resistance signals before they become entrenched opposition" },
    { key: "capacity", label: "We have created real capacity for the change by deprioritising other work, not just adding the change on top" },
    { key: "repeat", label: "Our readiness and impact assessments are repeated at phase transitions, not treated as one-time exercises" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Engagement &middot; Change Impact Assessment</span>
          <h1 className="article-title">Change readiness, stakeholder impact, and the real reason employees resist change</h1>
          <p className="article-intro">Change impact assessment is where most programs get the fundamentals wrong. They measure awareness and call it readiness. They map influence and call it impact analysis. They label concern as resistance and try to manage it away. This guide reframes all three: what a readiness assessment should actually tell you, how to run a stakeholder impact assessment that shapes the plan rather than sitting in a drawer, and why the resistance you are seeing is not a problem to overcome but the most valuable feedback your program will receive.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ─── TOPIC 1: CHANGE READINESS ─── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">What Does a Good Change Readiness Assessment Actually Tell You?</h2>
          <p className="article-section-desc">Most readiness assessments produce a score that makes everyone feel either comfortable or anxious, and then nothing happens differently. A genuinely useful readiness assessment does not just rate the current state. It reveals the specific conditions that are missing and tells you exactly where to focus. Click each principle to understand what separates a useful readiness assessment from a compliance exercise.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Principles of an Effective Readiness Assessment</h3>
            <ExpandableList items={readinessItems} />
          </div>
        </ScrollReveal>
      </section>

      {/* ─── TOPIC 2: STAKEHOLDER IMPACT ─── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">How to Run a Stakeholder Impact Assessment That People Actually Use</h2>
          <p className="article-section-desc">A stakeholder impact assessment should be the engine that drives every decision about engagement, communication, training, and support. In practice, most are completed once, presented in a steering committee, and never referenced again. The difference is not in the template. It is in whether the assessment is treated as a living tool that shapes the plan or a static artefact that satisfies a governance requirement.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Building an Impact Assessment That Drives Action</h3>
            <ExpandableList items={stakeholderItems} />
          </div>
        </ScrollReveal>
      </section>

      {/* ─── TOPIC 3: RESISTANCE REFRAMED ─── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Real Reason Employees Resist Change, and It Is Not What You Think</h2>
          <p className="article-section-desc">The conventional wisdom says resistance is a barrier to change. The reality is that resistance is your most honest feedback mechanism. It tells you where the design is flawed, where trust has broken down, where capacity is missing, and where the human cost of the change has not been addressed. The organisations that treat resistance as intelligence consistently outperform those that treat it as an obstacle.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Reframing Resistance as Organisational Feedback</h3>
            <ExpandableList items={resistanceItems} />
          </div>
        </ScrollReveal>
      </section>

      {/* ─── INTERACTIVE: RESISTANCE DECODER ─── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Resistance Decoder</h2>
          <p className="article-section-desc">Select the types of resistance you are currently seeing in your organisation. The decoder will reveal what each behaviour is actually telling you and how to respond in a way that treats resistance as feedback rather than a problem.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px", marginBottom: "32px" }}>
            {resistanceSignals.map((signal) => (
              <button
                key={signal.id}
                onClick={() => toggleSignal(signal.id)}
                style={{
                  padding: "16px 20px",
                  border: selectedSignals.includes(signal.id) ? "2px solid var(--gold)" : "2px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  background: selectedSignals.includes(signal.id) ? "rgba(184,134,11,0.1)" : "rgba(255,255,255,0.03)",
                  color: selectedSignals.includes(signal.id) ? "var(--gold)" : "var(--foreground)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--body)",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  transition: "all 0.2s ease",
                }}
              >
                {signal.behaviour}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {decodedSignal && (
          <ScrollReveal direction="up">
            <div style={{
              background: "var(--navy)",
              border: "1px solid rgba(184,134,11,0.3)",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "32px",
            }}>
              <div style={{ marginBottom: "24px" }}>
                <p style={{
                  fontFamily: "var(--ui)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}>You are seeing</p>
                <p style={{
                  fontFamily: "var(--heading)",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: "0",
                }}>{decodedSignal.behaviour}</p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px",
              }}>
                <div style={{
                  padding: "20px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  borderLeft: "3px solid rgba(255,255,255,0.2)",
                }}>
                  <p style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "8px",
                  }}>The surface read</p>
                  <p style={{
                    fontFamily: "var(--body)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "0",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255,255,255,0.3)",
                  }}>{decodedSignal.surfaceRead}</p>
                </div>

                <div style={{
                  padding: "20px",
                  background: "rgba(184,134,11,0.08)",
                  borderRadius: "8px",
                  borderLeft: "3px solid var(--gold)",
                }}>
                  <p style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "var(--gold)",
                    marginBottom: "8px",
                  }}>What it actually signals</p>
                  <p style={{
                    fontFamily: "var(--body)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--foreground)",
                    marginBottom: "0",
                  }}>{decodedSignal.actualSignal}</p>
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                marginBottom: "16px",
              }}>
                <p style={{
                  fontFamily: "var(--ui)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}>What this tells you</p>
                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--foreground)",
                  marginBottom: "0",
                }}>{decodedSignal.whatItTellsYou}</p>
              </div>

              <div style={{
                padding: "20px",
                background: "rgba(46,107,79,0.1)",
                borderRadius: "8px",
                borderLeft: "3px solid #2E6B4F",
              }}>
                <p style={{
                  fontFamily: "var(--ui)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "#2E6B4F",
                  marginBottom: "8px",
                }}>How to respond</p>
                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--foreground)",
                  marginBottom: "0",
                }}>{decodedSignal.responseStrategy}</p>
              </div>
            </div>

            {selectedSignals.length > 1 && (
              <div style={{
                padding: "20px 24px",
                background: "rgba(184,134,11,0.06)",
                borderRadius: "8px",
                border: "1px solid rgba(184,134,11,0.2)",
                marginBottom: "32px",
              }}>
                <p style={{
                  fontFamily: "var(--ui)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}>Pattern detected: {selectedSignals.length} signals selected</p>
                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--foreground)",
                  marginBottom: "0",
                }}>
                  {selectedSignals.length >= 5
                    ? "You are seeing resistance across multiple dimensions. This pattern typically indicates a systemic issue with the change approach itself rather than individual pockets of difficulty. Consider pausing to reassess the fundamentals: has the case for change been genuinely made? Have people been consulted or merely informed? Has capacity been created? When resistance is this widespread, the signal is about the program, not the people."
                    : selectedSignals.length >= 3
                    ? "Multiple resistance signals suggest the issue goes beyond individual concerns. Look for the common thread connecting these behaviours. Often, several different forms of resistance share a single root cause: a trust deficit, an unacknowledged loss, or a gap between what was promised and what is being delivered. Address the root cause and multiple symptoms often resolve simultaneously."
                    : "You are seeing resistance in a couple of areas. Click each signal above to decode it individually. If additional signals emerge over the coming weeks, return to this tool to check whether a broader pattern is forming."}
                </p>
              </div>
            )}
          </ScrollReveal>
        )}
      </section>

      {/* ─── CHECKLIST ─── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Change Impact Assessment Health Check</h2>
          <p className="article-section-desc">Use this checklist to evaluate whether your change impact assessment approach is genuinely useful or has become a compliance exercise. Be honest. The value of this checklist is in identifying the gaps, not in achieving a perfect score.</p>
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
                  <span className="check-complete"> &mdash; Your impact assessment approach is comprehensive and action-oriented.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. The remaining gaps likely relate to how you handle resistance or repeat assessments over time.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Your assessments are partially effective but may be missing the emotional and relational dimensions that determine adoption.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Your impact assessment approach needs significant strengthening. Start with the items you did not check and prioritise the ones that involve listening to the people affected.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Engagement</strong>, the second pillar of the TCA Change Model.</p>
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
