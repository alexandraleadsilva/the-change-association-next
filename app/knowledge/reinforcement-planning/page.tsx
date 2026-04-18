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

interface ReinforcementMechanism {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  howToImplement: string[];
  commonMistakes: string[];
}

interface ManagerCapability {
  id: string;
  area: string;
  description: string;
  behaviours: string[];
  developmentActions: string[];
}

/* ------------------------------------------------------------------ */
/*  Reinforcement Mechanisms Data                                      */
/* ------------------------------------------------------------------ */

const reinforcementMechanisms: ReinforcementMechanism[] = [
  {
    id: "recognition",
    icon: "\u2605",
    name: "Recognition",
    tagline: "What gets recognised gets repeated",
    description:
      "Recognition mechanisms make the new behaviour visible and valued. They signal to the organisation what matters. Without deliberate recognition of the new way of working, people default to what was rewarded before. Recognition does not have to be monetary. In most cases, the most powerful recognition is public, specific, and timely acknowledgement from someone whose opinion matters.",
    examples: [
      "Peer-nominated awards for teams that demonstrate new behaviours, presented at all-hands meetings with specific stories of what they did and why it mattered.",
      "Leaders opening meetings by naming a specific example of someone working the new way and explaining what impact it had.",
      "A dedicated channel or board where people can share examples of the new behaviour in action, creating a visible stream of evidence that the change is happening.",
      "Including specific behavioural examples in performance conversations, not just outcomes. Asking not only what someone achieved, but how they achieved it.",
    ],
    howToImplement: [
      "Define the specific behaviours you want to reinforce. Generic recognition of being a good team player does not drive change. Name the exact behaviours the change requires.",
      "Train managers to recognise behaviours in real time, not just at annual review cycles. A delay of weeks or months between the behaviour and the recognition eliminates the reinforcement effect.",
      "Make recognition public and specific. Tell the story of what the person did, why it mattered, and how it connects to the change. This teaches others what the new behaviour looks like in practice.",
      "Create multiple channels for recognition: leader-to-team, peer-to-peer, and team-to-leader. The more directions recognition flows, the more embedded it becomes.",
    ],
    commonMistakes: [
      "Recognising outcomes without recognising the behaviours that produced them. If people are rewarded for results regardless of how they were achieved, the old behaviours persist.",
      "Making recognition so formulaic that it loses meaning. When every team meeting starts with the same scripted recognition exercise, people tune out.",
      "Only recognising early adopters. The middle majority needs recognition too, especially when they are making genuine effort to change despite finding it difficult.",
      "Stopping recognition once the change feels established. Reinforcement needs to continue well beyond the point where the behaviour appears embedded, because what appears embedded can still revert under pressure.",
    ],
  },
  {
    id: "systems",
    icon: "\u2699",
    name: "Systems",
    tagline: "Align the infrastructure to the new behaviour",
    description:
      "Systems reinforcement means aligning the organisation's formal mechanisms with the change: performance management, KPIs, reporting structures, approval processes, technology platforms, and resource allocation. If the systems still reward or enable the old way of working, no amount of communication or training will sustain the new way. Systems create the path of least resistance. If the old path is still easier, people will walk it.",
    examples: [
      "Updating KPIs and scorecards to measure behaviours and outcomes that the change requires, not just legacy metrics that reflect the old operating model.",
      "Modifying approval workflows so the new process is actually easier and faster than the old one. If the new way requires more steps or more sign-offs, it will not stick.",
      "Configuring technology platforms to default to the new process. If the old system is still accessible and faster, people will use it.",
      "Adjusting resource allocation and budgeting processes to fund the new way of working. If teams have to fight for resources to do things differently, they will stop trying.",
    ],
    howToImplement: [
      "Audit every formal system that touches the change: performance management, compensation, promotion criteria, reporting, technology, governance. Map where each one currently reinforces the old behaviour.",
      "Prioritise the systems changes that have the highest reinforcement impact. Performance management and technology defaults are usually the most powerful.",
      "Sequence systems changes to coincide with the rollout of behavioural change. If the new behaviours are expected before the systems support them, people experience a gap between what they are asked to do and what the organisation actually enables.",
      "Close old pathways where possible. If the old system or process remains available as a fallback, it becomes a permanent escape route from the change.",
    ],
    commonMistakes: [
      "Asking people to work differently while measuring them the same way. This is the single most common reinforcement failure. If KPIs have not changed, the change has not been reinforced.",
      "Leaving old systems accessible alongside new ones. Parallel systems create choice, and under pressure, people choose what is familiar.",
      "Treating systems alignment as a phase two activity. By the time the systems are updated, people have already built workarounds that are very difficult to undo.",
      "Updating systems on paper without changing how they are actually used. A revised competency framework means nothing if managers do not reference it in performance conversations.",
    ],
  },
  {
    id: "rituals",
    icon: "\u25C6",
    name: "Rituals",
    tagline: "Embed the change in how work actually happens",
    description:
      "Rituals are the recurring practices, meetings, and rhythms that define how an organisation actually operates day to day. They are more powerful than policies because they are experienced, not just read. When you embed the change into the rituals of the organisation, you move it from something people think about to something people do automatically. A well-designed ritual makes the new behaviour the default, not an additional effort.",
    examples: [
      "Starting every team meeting with a brief reflection on how the team applied the new approach that week. Not a compliance check, but a genuine conversation about what they learned.",
      "Monthly retrospectives specifically focused on the change: what is working, what is not, what needs to be adjusted. This builds continuous improvement into the change itself.",
      "Onboarding rituals that teach new joiners the new way of working from day one, so they never learn the old way. New people arriving into the new culture reinforce it simply by treating it as normal.",
      "Leadership walk-throughs or town halls structured around the new behaviours, where leaders share their own experience of adopting the change, including what they found difficult.",
    ],
    howToImplement: [
      "Identify the existing rituals of the organisation: weekly meetings, quarterly reviews, annual planning, onboarding, project kick-offs. These are the moments where culture is transmitted.",
      "Redesign the rituals that have the most reach and frequency. A weekly team meeting that reinforces the change is more powerful than an annual event, because frequency builds habit.",
      "Script the first few iterations of new rituals to ensure consistency, then allow teams to adapt them to their context. The principle should be consistent; the execution can flex.",
      "Remove rituals that reinforce the old way. If the old quarterly review process still dominates the calendar, the new rituals will be seen as an addition rather than a replacement.",
    ],
    commonMistakes: [
      "Adding new rituals without removing old ones. If the change creates additional meetings or processes on top of what already exists, people experience it as a burden, not a new way of working.",
      "Making rituals performative rather than functional. If the ritual does not produce genuine value for the participants, it becomes theatre and breeds cynicism.",
      "Allowing rituals to atrophy after the initial enthusiasm. Rituals need a guardian, someone who ensures they continue, adapts them as needed, and holds the standard.",
      "Designing rituals only at the leadership level. The most powerful rituals happen in teams, in the daily work, not in executive offsites.",
    ],
  },
  {
    id: "accountability",
    icon: "\u2691",
    name: "Accountability",
    tagline: "Make the new way non-negotiable, not optional",
    description:
      "Accountability reinforcement means creating clear expectations, transparent tracking, and genuine consequences for whether the new behaviours are adopted. Without accountability, reinforcement is just encouragement. Encouragement fades. Accountability endures. This is not about punishment. It is about making it clear that the change is a genuine expectation of the role, not a suggestion that people can choose to ignore if they are busy or unconvinced.",
    examples: [
      "Including specific change-related objectives in every relevant role's performance plan, not as a bonus item, but as a core expectation with the same weight as operational targets.",
      "Regular progress reviews where managers discuss adoption of the new behaviours with their teams, using data and observation, not just self-reporting.",
      "Transparent dashboards showing adoption metrics by team. Visibility creates social accountability: teams can see how they compare, and no one wants to be the outlier.",
      "Leaders modelling accountability by publicly sharing their own adoption journey, including where they have struggled. When leaders hold themselves accountable, it legitimises accountability at every level.",
    ],
    howToImplement: [
      "Define what good looks like in behavioural terms that can be observed and discussed. Accountability requires clarity. If people do not know exactly what is expected, they cannot be held to it.",
      "Build accountability into existing management rhythms rather than creating parallel tracking systems. Use the one-to-one conversations, team meetings, and performance reviews that already happen.",
      "Equip managers to have accountability conversations that are coaching-oriented, not compliance-oriented. The goal is to understand barriers and provide support, not to assign blame.",
      "Address persistent non-adoption directly but constructively. If someone consistently does not adopt the new behaviour, the conversation should explore why, not assume resistance. Sometimes the barrier is capability, not willingness.",
    ],
    commonMistakes: [
      "Creating accountability at the front line but not at the leadership level. If senior leaders are exempt from the expectations of the change, accountability feels like surveillance, not shared commitment.",
      "Relying on self-reporting as the primary accountability mechanism. People will report what they think you want to hear. Use observation, data, and outcomes alongside self-reporting.",
      "Making accountability punitive rather than developmental. If the first consequence of non-adoption is a negative performance review, people will comply superficially rather than change genuinely.",
      "Delaying accountability until the change is fully rolled out. Accountability should begin during the pilot, not after the full deployment. Early accountability signals that the change is serious.",
    ],
  },
  {
    id: "environment",
    icon: "\u25CB",
    name: "Environment",
    tagline: "Shape the context so the new behaviour is the default",
    description:
      "Environment reinforcement means designing the physical and digital spaces, information flows, and social context so that the new behaviour is the easiest, most natural thing to do. This draws on the principle that behaviour is shaped more by context than by intention. People do not consistently choose the harder path, no matter how much they agree with it. The environment needs to make the right thing the easy thing.",
    examples: [
      "Redesigning office layouts to support new collaboration patterns. If the change requires cross-functional working but people sit in functional silos, the environment contradicts the change.",
      "Configuring digital tools so the new workflow is the default. For example, making the new template the one that opens automatically, or routing requests through the new approval path by default.",
      "Placing visual cues in the environment: dashboards in common areas showing progress, prompts on screens reminding people of the new approach, posters that ask provocative questions about the change.",
      "Restructuring information flows so people receive the data they need to work the new way. If the old reports are still the primary information source, the old decisions follow.",
    ],
    howToImplement: [
      "Walk the process as a frontline employee would experience it. Where does the environment make the old behaviour easier than the new one? Each of those points is a reinforcement failure.",
      "Apply choice architecture principles: make the new behaviour the default option, reduce the steps required for the new way, increase the steps required for the old way.",
      "Design the digital environment with the same care as the physical one. Default settings, notification structures, dashboard designs, and template choices all shape behaviour.",
      "Test environmental changes with a small group before deploying widely. What seems logical to the design team may create friction for the people actually working in the environment.",
    ],
    commonMistakes: [
      "Changing processes without changing the environment that supports them. New processes in old environments produce frustration, not adoption.",
      "Focusing only on the physical environment and ignoring the digital environment. For many organisations, the digital workspace is where most behaviour actually happens.",
      "Designing the environment from the perspective of the change team rather than the people living in it. What the change team thinks is intuitive may not be intuitive for the end user.",
      "Treating environmental design as a one-time activity. As people interact with the new environment, they will surface friction points. The design needs to iterate based on real usage.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Manager Sustainment Capabilities Data                              */
/* ------------------------------------------------------------------ */

const managerCapabilities: ManagerCapability[] = [
  {
    id: "translate",
    area: "Translating the Change into Team Context",
    description:
      "The ability to take the organisational narrative about the change and make it specific, relevant, and credible for their team. This means answering the questions their team actually has, not repeating the corporate talking points. Managers who translate well connect the change to the work their team does every day.",
    behaviours: [
      "Explains why the change matters for their specific team, not just for the organisation as a whole.",
      "Anticipates and addresses the questions and concerns that are specific to their team's role and context.",
      "Uses concrete examples from the team's work to illustrate what the change means in practice.",
      "Adjusts the message based on where each team member is in their personal adoption journey.",
    ],
    developmentActions: [
      "Provide managers with a narrative toolkit that includes the core message plus space for them to add their own team-specific context and examples.",
      "Run facilitated sessions where managers practise translating the organisational message into their team context, with feedback from peers and change professionals.",
      "Share examples of effective team-level communication from the pilot or early waves, so managers can learn from what worked in practice.",
    ],
  },
  {
    id: "coach",
    area: "Coaching Through the Transition",
    description:
      "The ability to support individual team members through the personal transition that the change requires. This is fundamentally a coaching capability: listening, asking questions, helping people work through their concerns, and building their confidence in the new way of working. Most managers default to telling rather than coaching, which produces compliance rather than commitment.",
    behaviours: [
      "Creates regular, safe space for team members to express concerns and ask questions about the change.",
      "Asks open questions to understand where each person is in their adoption, rather than assuming everyone is at the same stage.",
      "Helps individuals identify their specific barriers to adoption and works with them to address those barriers.",
      "Celebrates progress, however small, and treats setbacks as learning opportunities rather than failures.",
    ],
    developmentActions: [
      "Provide coaching skills training specifically focused on change conversations. Generic coaching training is not sufficient because the change context creates specific dynamics.",
      "Create a library of common scenarios that managers can practise: the resistant team member, the overwhelmed team member, the quietly disengaged team member, the vocal critic.",
      "Pair managers with a change practitioner or experienced peer who can coach them through their own coaching challenges. Managers cannot coach others through a change they have not processed themselves.",
    ],
  },
  {
    id: "model",
    area: "Modelling the New Behaviour",
    description:
      "The ability and willingness to visibly adopt the new behaviour themselves, before asking their team to do so. Managers who model the change provide the most powerful reinforcement available: proof that the new way works for someone like them. Managers who do not model the change send a clear signal that the old way is still acceptable.",
    behaviours: [
      "Adopts the new way of working before or simultaneously with their team, not after.",
      "Shares their own experience of the transition openly, including what they found difficult and how they worked through it.",
      "Makes their adoption visible to the team, not just private. Uses the new tools, follows the new process, and demonstrates the new behaviours in team settings.",
      "Acknowledges when they revert to old habits and corrects themselves publicly, normalising the learning process.",
    ],
    developmentActions: [
      "Give managers early access to the change so they have time to adopt it themselves before they need to support their team. A manager who is learning at the same time as their team cannot credibly model the way.",
      "Create a manager cohort where they can share their own adoption experience with peers. This normalises the struggle and provides practical strategies.",
      "Provide managers with specific, observable actions they can take to demonstrate adoption. Do not leave it to them to figure out what modelling looks like.",
    ],
  },
  {
    id: "reinforce",
    area: "Reinforcing Consistently Over Time",
    description:
      "The ability to sustain reinforcement of the change beyond the initial rollout period, when energy naturally fades and competing priorities emerge. This is the capability that separates organisations where change sticks from those where it reverts. Consistent reinforcement requires discipline, because the urgency to reinforce diminishes as the change becomes familiar, even if the adoption is not yet complete.",
    behaviours: [
      "Integrates change reinforcement into regular management activities rather than treating it as a separate task.",
      "Monitors adoption through observation and data, not just through formal reporting, and intervenes early when adoption slips.",
      "Maintains the frequency and quality of change-related conversations with their team beyond the initial rollout period.",
      "Connects the ongoing work of the team back to the change purpose regularly, keeping the narrative alive.",
    ],
    developmentActions: [
      "Provide managers with a simple reinforcement rhythm: weekly touchpoints, monthly reviews, quarterly reflections. Make it easy to sustain by making it structured.",
      "Create dashboards or simple tracking tools that give managers visibility into their team's adoption without requiring extensive data collection.",
      "Schedule reinforcement check-ins with the change team at 30, 60, 90, and 180 days after rollout. These check-ins keep reinforcement on the manager's agenda when other priorities compete for attention.",
    ],
  },
  {
    id: "escalate",
    area: "Escalating Barriers They Cannot Remove",
    description:
      "The ability to identify barriers to adoption that are beyond their authority to resolve and escalate them effectively to the people who can act. Many changes fail not because managers did not try, but because structural barriers persisted that only senior leadership could remove. A manager who can diagnose and escalate systemic barriers is more valuable to the change than one who simply tries harder within a broken system.",
    behaviours: [
      "Distinguishes between barriers that are within their control and those that require escalation.",
      "Escalates with specificity: describes the barrier, its impact on adoption, what they have tried, and what they need.",
      "Follows up on escalations to ensure they are being addressed and communicates progress back to their team.",
      "Aggregates feedback from their team into patterns that make the case for systemic change, not just individual complaints.",
    ],
    developmentActions: [
      "Create a clear escalation pathway for change-related barriers, so managers know exactly who to contact and what format to use.",
      "Establish a regular forum where managers can raise barriers collectively, creating a shared view of systemic issues and preventing the same barrier from being raised in isolation multiple times.",
      "Ensure that escalated barriers receive a response within a defined timeframe. If managers escalate and nothing happens, they stop escalating and start working around the problem.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Manager Assessment Questions                                       */
/* ------------------------------------------------------------------ */

const assessmentQuestions = [
  {
    id: "q1",
    area: "translate",
    text: "Managers can explain why this change matters for their specific team, not just repeat the corporate narrative.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q2",
    area: "translate",
    text: "Managers have been given the tools and information to answer team-specific questions about the change.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q3",
    area: "coach",
    text: "Managers are creating space for team members to express concerns and ask questions about the change.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q4",
    area: "coach",
    text: "Managers have been trained in coaching skills specifically relevant to change conversations.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q5",
    area: "model",
    text: "Managers are visibly adopting the new behaviours before asking their teams to do so.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q6",
    area: "model",
    text: "Managers share their own experience of the transition openly, including difficulties.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q7",
    area: "reinforce",
    text: "Managers integrate change reinforcement into their regular management activities, not as a separate task.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q8",
    area: "reinforce",
    text: "Managers are monitoring adoption through observation and data, not just formal reporting.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q9",
    area: "escalate",
    text: "Managers have a clear pathway to escalate barriers that are beyond their authority to resolve.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
  {
    id: "q10",
    area: "escalate",
    text: "Escalated barriers receive a response within a defined timeframe and are visibly acted upon.",
    scores: ["Not at all", "Partially", "Mostly", "Fully"],
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable Content Items Data                                      */
/* ------------------------------------------------------------------ */

const reinforcementPrinciples: ActionItem[] = [
  {
    text: "Reinforcement must begin before rollout, not after it",
    detail:
      "Most organisations treat reinforcement as a post-implementation activity. By then, the window for shaping behaviour has narrowed significantly. The mechanisms that will reinforce the change need to be designed and in place before people are asked to adopt the new behaviour. If recognition, systems, rituals, accountability, and environment are not ready on day one, the first experience people have of the change is one where the old way is still easier.",
  },
  {
    text: "The strongest reinforcement is making the old behaviour harder, not the new behaviour easier",
    detail:
      "Many reinforcement strategies focus exclusively on encouraging the new behaviour through incentives and recognition. While these are important, the most powerful reinforcement is structural: removing the old pathways, closing the old systems, restructuring the old processes. When the old way is no longer available, the new way is not a choice. It is the only option. This sounds heavy-handed, but it is how every successful technology migration works: you retire the old system.",
  },
  {
    text: "Different people need different reinforcement at different times",
    detail:
      "Early adopters need recognition and visibility. The early majority needs social proof that the change is working for people like them. The late majority needs accountability and structural support. Resistors need a direct conversation about expectations. A single reinforcement strategy applied uniformly to all groups is less effective than a targeted approach that meets each group where they are.",
  },
  {
    text: "Reinforcement must be sustained long after the change feels embedded",
    detail:
      "Organisations typically withdraw reinforcement too early, usually when adoption metrics reach a certain threshold and leadership attention moves to the next initiative. But behaviour that is reinforced for 90 days is a project. Behaviour that is reinforced for 18 months is a culture. The difference between change that sticks and change that reverts is almost always the duration of reinforcement, not its initial intensity.",
  },
  {
    text: "Managers are the primary reinforcement mechanism, whether you design for this or not",
    detail:
      "Regardless of what the change team designs, the day-to-day reinforcement that people experience comes from their direct manager. What the manager pays attention to, what they ask about, what they recognise, what they ignore. If managers are not deliberately equipped and enabled to reinforce the change, their default behaviour will reinforce the status quo. This is not a failure of will. It is the natural consequence of not designing for the manager's role.",
  },
];

/* ------------------------------------------------------------------ */
/*  Case Studies Data                                                  */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Microsoft",
    headline: "How Microsoft embedded a growth mindset through systematic reinforcement across 180,000 employees",
    hook: "Nadella did not just announce a culture change. He rewired performance reviews, meeting rituals, and leadership expectations to make the new mindset the path of least resistance.",
    dimension: "Recognition + Systems + Rituals",
    body: [
      "When Satya Nadella became CEO of Microsoft in 2014, he inherited a culture described internally as know-it-all rather than learn-it-all. Stack ranking had created internal competition. Teams hoarded information. Collaboration was the exception. Nadella's vision was a growth mindset culture, but vision without reinforcement is just a speech.",
      "The reinforcement was systematic and multi-layered. Microsoft eliminated stack ranking and redesigned its performance management system to evaluate not just what people achieved but how they learned and helped others learn. This single systems change sent a clearer signal than any number of communications could have.",
      "Rituals were redesigned to embed the new culture. Hackathons became a recurring practice where employees from different divisions collaborated on projects, building cross-functional relationships that the old structure had prevented. Leaders were trained to open meetings by asking what the team had learned rather than what targets they had hit. Conference rooms displayed posters asking whether this would be a fixed mindset or growth mindset meeting.",
      "Recognition was redirected toward learning and collaboration. Leaders were expected to model vulnerability by sharing their own learning journeys, including failures. Every manager went through required training on how to coach rather than direct, reinforcing the cultural expectation at the most influential layer of the organisation.",
    ],
    lesson:
      "Microsoft demonstrates that cultural change at scale requires reinforcement across every mechanism simultaneously. Nadella did not rely on communication and hope. He changed the systems that measured people, the rituals that shaped their daily experience, the recognition that signalled what mattered, and the accountability that made it non-negotiable. The result is a company whose market capitalisation increased from $300 billion to over $3 trillion, driven in significant part by a culture that now reinforces collaboration and learning rather than competition and defensiveness.",
    source: "https://fortune.com/2024/05/20/satya-nadella-microsoft-culture-growth-mindset-learn-it-alls-know-it-alls/",
    sourceLabel: "Fortune",
  },
  {
    label: "Toyota",
    headline: "Toyota Kata turned every manager into a daily coach for continuous improvement",
    hook: "The secret to Toyota's sustained operational excellence is not the tools. It is a coaching routine practised by every manager, every day.",
    dimension: "Accountability + Rituals + Environment",
    body: [
      "Toyota's production system is widely studied and frequently imitated, but few organisations sustain the level of continuous improvement that Toyota achieves. Researchers spent years trying to understand why. The answer, documented by Mike Rother in his study of Toyota's practices, was not a set of tools or a management philosophy. It was a daily coaching routine called the Coaching Kata.",
      "The Coaching Kata is a structured set of questions that every manager uses when coaching their team through improvement challenges. The questions follow a pattern: What is the target condition? What is the actual condition now? What obstacles are preventing you from reaching the target? What is your next step? When can we see what you have learned? This routine is practised every day, not as a special event, but as the normal way managers interact with their teams.",
      "The reinforcement mechanism is elegant in its simplicity. The routine itself is the reinforcement. Because managers practise it daily, it becomes habit. Because the questions are consistent, they create a shared language. Because the coaching is about learning rather than compliance, it builds genuine capability rather than dependent performance.",
      "When performance inevitably drifts, the team already has a practised routine to understand why it is drifting and to experiment their way back to the target condition. The manager does not need to intervene with a directive. They coach through the established routine. This is what makes Toyota's improvement sustainable long after any project team leaves: the reinforcement is built into the daily management system, not layered on top of it.",
    ],
    lesson:
      "Toyota demonstrates that the most sustainable reinforcement mechanism is one that is embedded in the daily work of management, not one that is added as an extra activity. The Coaching Kata works because it is simple enough to practise daily, structured enough to be consistent, and developmental enough to build genuine capability. It also demonstrates the critical role of the manager: at Toyota, the manager is not the person who checks whether the change happened. The manager is the mechanism through which the change sustains itself.",
    source: "https://www.lean.org/lexicon-terms/kata/",
    sourceLabel: "Lean Enterprise Institute",
  },
  {
    label: "Cleveland Clinic",
    headline: "Cleveland Clinic trained 43,000 caregivers in empathy and embedded it into the management system to make it last",
    hook: "A single comment from a student at Harvard Business School triggered a culture transformation that redesigned how every employee is managed, measured, and onboarded.",
    dimension: "Systems + Recognition + Environment",
    body: [
      "In 2006, Dr. Delos Cosgrove, then CEO of Cleveland Clinic, was told by a student at Harvard Business School that although the Clinic had excellent surgical outcomes, her family chose not to go there because they heard it had no empathy. That single comment triggered one of the most comprehensive culture transformations in healthcare.",
      "Cleveland Clinic created an Office of Patient Experience and appointed its first Chief Experience Officer. But the real change was not structural. It was the systematic reinforcement of empathy as a core professional behaviour. All 43,000 employees, whom the Clinic calls caregivers regardless of role, went through the Cleveland Clinic Experience programme, a training designed to build empathy, engagement, and service behaviours.",
      "The reinforcement extended far beyond training. The Communicate with H.E.A.R.T. framework (Hear, Empathise, Apologise, Respond, Thank) became the standard for all patient interactions and was embedded into performance management. Patient experience scores became as visible and as important as clinical outcomes. New caregiver onboarding was redesigned so that empathy was taught from day one, meaning new employees entered a culture where this behaviour was already the norm.",
      "Critically, managers were equipped to reinforce the change in daily practice. Patient experience data was available at the unit level, giving managers specific, timely information to coach their teams. Recognition programmes celebrated caregivers who demonstrated exceptional empathy. The physical environment was redesigned to support the new culture, including spaces designed for staff wellbeing on the principle that caregivers who are cared for provide better care.",
    ],
    lesson:
      "Cleveland Clinic demonstrates that reinforcement of behavioural change at scale requires every mechanism working together. Training created awareness and capability. Systems changes made empathy a measured and managed expectation. Rituals embedded it into daily practice. The environment supported it. And managers were given the tools and data to reinforce it in real time. The result was a measurable and sustained improvement in patient experience scores that has persisted for over a decade, long past the initial programme.",
    source: "https://www.fiercehealthcare.com/hospitals-health-systems/cleveland-clinic-kaiser-permanente-patient-experience",
    sourceLabel: "Fierce Healthcare",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic — Practical Coaching Guide for Managers                      */
/* ------------------------------------------------------------------ */

const coachingConversations: ActionItem[] = [
  {
    text: "The \"What's Changing For You\" Conversation",
    detail:
      "When to have it: Within the first week of the change being announced to the team, before assumptions solidify. This is the foundational conversation that ensures every person understands specifically what is changing in their role, their processes, and their daily experience. What to ask: What have you heard so far about this change? What do you think it means for your role specifically? What are you unsure about? What to listen for: Misunderstandings about scope, catastrophising about impact, or dangerous assumptions that nothing will actually change. People often hear the corporate announcement and either inflate the impact or dismiss it entirely. Neither response is helpful. What to do with what you hear: Correct misinformation immediately and honestly. Where you do not have answers, say so and commit to a date by which you will follow up. Document the specific concerns raised so you can track whether they are resolved. Feed common misunderstandings back to the change team so communications can be adjusted.",
  },
  {
    text: "The \"How Are You Feeling\" Conversation",
    detail:
      "When to have it: Two to three weeks after the change has been announced or is beginning to take effect, and again at any point where resistance or disengagement becomes visible. This conversation acknowledges the emotional dimension of change that most organisations ignore. What to ask: How are you feeling about this change right now, honestly? What is your biggest concern? Is there anything about this that feels personal to you, not just professional? What to listen for: Fear of incompetence in the new way of working, grief for what is being lost, anger about not being consulted, or anxiety about job security. People rarely articulate these emotions directly. Listen for the signals: withdrawal from team discussions, cynicism, excessive focus on what is wrong with the new approach, or uncharacteristic negativity. What to do with what you hear: Do not try to fix the emotion or argue people out of it. Acknowledge it. Validate that the feeling makes sense given their experience. Then explore what would help: more information, more time, more support, more involvement in shaping the change. If someone is genuinely distressed, connect them with appropriate support. Feed patterns of emotional response back to the change team because widespread anxiety is a programme risk, not an individual problem.",
  },
  {
    text: "The \"What Do You Need\" Conversation",
    detail:
      "When to have it: As the change moves from announcement into implementation, typically four to six weeks in, and repeated at regular intervals throughout the transition. This conversation shifts from understanding to action. What to ask: What do you need to be able to work effectively in the new way? What barriers are you hitting? What training or support would make the biggest difference? Is there anything I can remove or simplify to make this easier? What to listen for: Practical blockers such as missing access, inadequate training, conflicting priorities, or unclear processes. Also listen for capability gaps that people are reluctant to admit. If someone says they are fine but their performance is declining, the need is there but unspoken. What to do with what you hear: Act on what you can control immediately. Escalate what you cannot. Be transparent about what is within your power and what requires programme-level intervention. Track needs and follow up visibly. Nothing destroys trust faster than asking what someone needs and then doing nothing about it. Where multiple people raise the same need, consolidate the feedback and present it to the change team as a systemic issue rather than individual requests.",
  },
  {
    text: "The \"What's Working\" Conversation",
    detail:
      "When to have it: Six to eight weeks after the change has been implemented, and periodically thereafter. This conversation is often skipped because managers focus on problems, but it is essential for reinforcement. What to ask: What aspects of the new way of working are actually better than before? Where have you found unexpected benefits? What would you tell a colleague in another team about how this has gone? What to listen for: Genuine positive experiences that can be amplified, specific examples of the new approach delivering value, and moments where people surprised themselves by succeeding with the new behaviour. Also listen for people who are compliant but not convinced. If the only positive thing someone can say is that the new system is not as bad as expected, that is not adoption. What to do with what you hear: Share the positive stories with the broader team, with permission. Specific, authentic examples of the change working are far more powerful than corporate success metrics. Feed the stories to the change team for use in communications. Recognise the individuals who are making the change work. Use these conversations to build a narrative of progress that sustains momentum through the inevitable difficult periods.",
  },
  {
    text: "The \"What Would You Do Differently\" Conversation",
    detail:
      "When to have it: Eight to twelve weeks after implementation, when people have enough experience to offer informed feedback, and again at subsequent milestones. This conversation treats the people experiencing the change as experts in how it could be improved. What to ask: If you could change one thing about how this was rolled out, what would it be? What advice would you give us for the next team going through this? Is there anything about the new way of working that still does not make sense to you? What to listen for: Practical suggestions for improvement that the programme team may have missed. Residual confusion that indicates gaps in training or communication. Frustration with aspects of the change that feel unnecessary or poorly designed. Also listen for the meta-feedback: how people feel about whether their input matters. If someone says there is no point giving feedback because nothing changes, that is the most important signal in the conversation. What to do with what you hear: Take the feedback seriously and visibly act on what you can. Where feedback cannot be incorporated, explain why honestly. Feed improvement suggestions to the change team and advocate for adjustments where the evidence supports them. Close the loop: tell people what happened as a result of their feedback. This single act, showing that input led to change, is the most powerful reinforcement mechanism a manager has.",
  },
];

/* ------------------------------------------------------------------ */
/*  Checklist Items                                                    */
/* ------------------------------------------------------------------ */

const checkItems = [
  { key: "mechanisms", label: "We have designed specific reinforcement mechanisms for the new behaviours, not just communicated the expectation" },
  { key: "systems", label: "Performance management, KPIs, and reward systems have been updated to align with the change" },
  { key: "old_paths", label: "Old systems, processes, or pathways that enable the previous way of working have been closed or made harder to access" },
  { key: "rituals", label: "The change has been embedded into recurring rituals: team meetings, reviews, onboarding, and planning cycles" },
  { key: "recognition", label: "There is a deliberate recognition programme that specifically names and celebrates the new behaviours" },
  { key: "managers_equipped", label: "Managers have been equipped with the skills, tools, and time to reinforce the change with their teams" },
  { key: "managers_early", label: "Managers were given early access to the change so they could adopt it before supporting their teams" },
  { key: "accountability", label: "Clear accountability exists at every level, including leadership, for sustaining the new behaviours" },
  { key: "environment", label: "The physical and digital environment has been designed to make the new behaviour the path of least resistance" },
  { key: "duration", label: "Reinforcement is planned to continue for at least 12 to 18 months beyond the initial rollout, not just 90 days" },
  { key: "escalation", label: "Managers have a clear pathway to escalate barriers they cannot remove themselves" },
  { key: "segmented", label: "Reinforcement is tailored to different groups based on where they are in their adoption journey" },
];

/* ------------------------------------------------------------------ */
/*  Reusable Components                                                */
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

export default function ReinforcementPlanning() {
  const [activeMechanism, setActiveMechanism] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [assessmentScores, setAssessmentScores] = useState<Record<string, number>>({});
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const totalAssessmentScore = Object.values(assessmentScores).reduce((a, b) => a + b, 0);
  const maxAssessmentScore = assessmentQuestions.length * 3;
  const answeredCount = Object.keys(assessmentScores).length;

  function getReadinessLevel(): { label: string; description: string } {
    if (answeredCount < assessmentQuestions.length) {
      return { label: "Incomplete", description: "Answer all questions to see your readiness level." };
    }
    const pct = totalAssessmentScore / maxAssessmentScore;
    if (pct >= 0.85) {
      return { label: "High Readiness", description: "Your managers are well-equipped to sustain this change. Focus on maintaining this capability and addressing any specific gaps." };
    }
    if (pct >= 0.6) {
      return { label: "Moderate Readiness", description: "Your managers have a foundation, but there are meaningful gaps. Prioritise the lowest-scoring areas before or during rollout." };
    }
    if (pct >= 0.35) {
      return { label: "Low Readiness", description: "Significant development is needed before managers can effectively sustain this change. Invest in manager readiness before expecting them to reinforce adoption." };
    }
    return { label: "Critical Gap", description: "Managers are not currently equipped to sustain this change. Without investment in manager capability, reinforcement will default to the status quo." };
  }

  const readiness = getReadinessLevel();

  return (
    <>
      <Nav />

      {/* ---- HEADER ---- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Sustainment &middot; Reinforcement Planning</span>
          <h1 className="article-title">Reinforcement Planning: How to Design Mechanisms That Make New Behaviours Stick and Equip Managers to Sustain Them</h1>
          <p className="article-intro">
            Most change programmes invest heavily in communication, training, and rollout, then wonder why adoption declines six months later. The answer is almost always the same: reinforcement was treated as an afterthought, and managers were expected to sustain the change without being equipped for the role. Reinforcement planning is the deliberate design of mechanisms that make the new behaviour the path of least resistance, combined with the systematic development of managers as the primary vehicle through which that reinforcement is delivered. Without both, change is a temporary event. With both, change becomes the new normal.
          </p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
        <div className="article-main">

          {/* ---- SECTION 1: REINFORCEMENT PRINCIPLES ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Five Principles of Effective Reinforcement</h2>
              <p className="article-section-desc">
                Before designing specific mechanisms, it is important to understand the principles that make reinforcement effective. These are not optional refinements. They are the foundation that determines whether your reinforcement mechanisms will sustain the change or simply delay its reversion.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <ExpandableList items={reinforcementPrinciples} />
              </div>
            </ScrollReveal>
          </section>

          {/* ---- SECTION 2: THE REINFORCEMENT DESIGNER ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">The Reinforcement Designer</h2>
              <p className="article-section-desc">
                There are five types of reinforcement mechanism, and sustainable change requires all five working together. A change that is recognised but not supported by systems will not last. A change that is built into systems but not reinforced through rituals will feel like compliance. Click any mechanism to explore what it looks like in practice, how to implement it, and the mistakes that undermine it.
              </p>
            </ScrollReveal>

            <div className="phase-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {reinforcementMechanisms.map((m, i) => (
                <ScrollReveal key={m.id} direction="up" delay={i * 60}>
                  <button
                    className={`phase-card${activeMechanism === m.id ? " phase-card-active" : ""}`}
                    onClick={() => setActiveMechanism(activeMechanism === m.id ? null : m.id)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>{m.icon}</span>
                    <span className="phase-card-pillar">{m.name}</span>
                    <span className="phase-card-name">{m.tagline}</span>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            {activeMechanism && (() => {
              const m = reinforcementMechanisms.find((m) => m.id === activeMechanism);
              if (!m) return null;
              return (
                <ScrollReveal direction="up">
                  <div className="dimension-detail" style={{ marginTop: "24px" }}>
                    <div className="detail-header">
                      <span style={{ fontSize: "32px", marginRight: "12px" }}>{m.icon}</span>
                      <h2 className="detail-title">{m.name}</h2>
                    </div>
                    <p className="detail-body">{m.description}</p>

                    <div className="detail-block" style={{ marginTop: "24px" }}>
                      <h3 className="detail-block-title">Examples in Practice</h3>
                      <ul className="detail-list">
                        {m.examples.map((ex, i) => (
                          <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                            <div className="detail-list-item-head">{ex}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-block" style={{ marginTop: "24px" }}>
                      <h3 className="detail-block-title">How to Implement</h3>
                      <ul className="detail-list">
                        {m.howToImplement.map((step, i) => (
                          <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                            <div className="detail-list-item-head">{step}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-block detail-block-warning" style={{ marginTop: "24px" }}>
                      <h3 className="detail-block-title">Common Mistakes</h3>
                      <ul className="detail-list">
                        {m.commonMistakes.map((mistake, i) => (
                          <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                            <div className="detail-list-item-head">{mistake}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}
          </section>

          {/* ---- SECTION 3: THE MANAGER'S ROLE ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">The Manager&rsquo;s Role in Sustaining Change</h2>
              <p className="article-section-desc">
                Research consistently shows that the direct manager is the single most influential factor in whether change is sustained at the team level. Prosci data indicates that half of all reinforcement responsibility falls to the direct manager. Yet most change programmes invest less than 5% of their budget in manager readiness. This section defines the five capabilities managers need and how to develop them.
              </p>
            </ScrollReveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
              {managerCapabilities.map((cap, i) => (
                <ScrollReveal key={cap.id} direction="up" delay={i * 60}>
                  <button
                    className={`phase-card${activeCapability === cap.id ? " phase-card-active" : ""}`}
                    onClick={() => setActiveCapability(activeCapability === cap.id ? null : cap.id)}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <span className="phase-card-pillar">{cap.area}</span>
                    <span className="phase-card-name">{cap.description.slice(0, 120)}...</span>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            {activeCapability && (() => {
              const cap = managerCapabilities.find((c) => c.id === activeCapability);
              if (!cap) return null;
              return (
                <ScrollReveal direction="up">
                  <div className="dimension-detail" style={{ marginTop: "24px" }}>
                    <h2 className="detail-title">{cap.area}</h2>
                    <p className="detail-body">{cap.description}</p>

                    <div className="detail-block" style={{ marginTop: "24px" }}>
                      <h3 className="detail-block-title">What This Looks Like in Practice</h3>
                      <ul className="detail-list">
                        {cap.behaviours.map((b, i) => (
                          <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                            <div className="detail-list-item-head">{b}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-block" style={{ marginTop: "24px" }}>
                      <h3 className="detail-block-title">How to Develop This Capability</h3>
                      <ul className="detail-list">
                        {cap.developmentActions.map((action, i) => (
                          <li key={i} className="detail-list-item" style={{ cursor: "default" }}>
                            <div className="detail-list-item-head">{action}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}
          </section>

          {/* ---- SECTION 4: MANAGER READINESS ASSESSMENT ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Manager Sustainment Readiness Assessment</h2>
              <p className="article-section-desc">
                Use this assessment to evaluate how ready your managers are to sustain the change. Rate each statement based on where your organisation is right now, not where you hope it will be. Honest assessment now prevents reinforcement failures later.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div style={{
                background: "var(--navy)",
                borderRadius: "12px",
                padding: "32px",
                marginTop: "8px",
              }}>
                {assessmentQuestions.map((q, i) => (
                  <div key={q.id} style={{
                    borderBottom: i < assessmentQuestions.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                    padding: "20px 0",
                  }}>
                    <p style={{
                      color: "#ffffff",
                      fontFamily: "var(--body)",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      marginBottom: "12px",
                    }}>
                      {q.text}
                    </p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {q.scores.map((label, si) => (
                        <button
                          key={si}
                          onClick={() => setAssessmentScores((prev) => ({ ...prev, [q.id]: si }))}
                          style={{
                            padding: "6px 16px",
                            borderRadius: "6px",
                            border: assessmentScores[q.id] === si ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.2)",
                            background: assessmentScores[q.id] === si ? "rgba(184,134,11,0.15)" : "transparent",
                            color: assessmentScores[q.id] === si ? "var(--gold)" : "rgba(255,255,255,0.7)",
                            fontFamily: "var(--ui)",
                            fontSize: "12px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: "24px",
                  padding: "20px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{
                      fontFamily: "var(--ui)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "var(--gold)",
                    }}>
                      {readiness.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--ui)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                    }}>
                      {answeredCount} of {assessmentQuestions.length} answered
                      {answeredCount === assessmentQuestions.length && ` \u2014 Score: ${totalAssessmentScore} / ${maxAssessmentScore}`}
                    </span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "6px",
                    borderRadius: "3px",
                    background: "rgba(255,255,255,0.1)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width: answeredCount === assessmentQuestions.length ? `${(totalAssessmentScore / maxAssessmentScore) * 100}%` : "0%",
                      height: "100%",
                      borderRadius: "3px",
                      background: "var(--gold)",
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <p style={{
                    fontFamily: "var(--body)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: "12px",
                    marginBottom: 0,
                  }}>
                    {readiness.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ---- SECTION: PRACTICAL COACHING GUIDE FOR MANAGERS ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Practical Coaching Guide for Managers
              </h2>
              <p className="article-section-desc">
                Managers are the primary reinforcement mechanism for any change. But telling managers to &ldquo;support their teams through the change&rdquo; without giving them practical guidance is like telling someone to fly a plane without training. The five conversations below are the backbone of effective change coaching. Each one addresses a different stage of the adoption journey, and together they give managers a structured, repeatable approach to helping their teams move from awareness through to genuine ownership of the new way of working.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Five Coaching Conversations During Change</h3>
                <ExpandableList items={coachingConversations} />
              </div>
            </ScrollReveal>
          </section>

          {/* ---- SECTION 5: SELF-CHECK CHECKLIST ---- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Reinforcement Planning Self-Check</h2>
              <p className="article-section-desc">
                Before your change goes live, or if it has already gone live and adoption is declining, use this checklist to assess whether your reinforcement planning is sufficient. Every unchecked item is a potential point of failure for sustainment.
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
                      <span className="check-complete"> &mdash; Your reinforcement planning is comprehensive. Ensure it is sustained beyond the initial rollout period.</span>
                    )}
                    {checkedCount >= 9 && checkedCount < checkItems.length && (
                      <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps to reduce sustainment risk.</span>
                    )}
                    {checkedCount >= 5 && checkedCount < 9 && (
                      <span className="check-partial"> &mdash; Meaningful gaps exist. The change is at risk of reverting in areas where reinforcement is missing.</span>
                    )}
                    {checkedCount > 0 && checkedCount < 5 && (
                      <span className="check-partial"> &mdash; Significant reinforcement gaps. Without addressing these, the change is likely to revert within 6 to 12 months.</span>
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
