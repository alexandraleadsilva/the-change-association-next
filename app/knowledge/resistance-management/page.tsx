"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ───────────────────────────── types ───────────────────────────── */

interface ActionItem {
  text: string;
  detail: string;
}

/* ───────────────── resistance lifecycle tracker data ───────────────── */

interface ResistanceType {
  name: string;
  description: string;
  response: string;
}

interface LifecyclePhase {
  id: string;
  num: string;
  name: string;
  timing: string;
  emotionalState: string;
  summary: string;
  resistanceTypes: ResistanceType[];
  monitoringSignals: string[];
  keyPrinciple: string;
}

const lifecyclePhases: LifecyclePhase[] = [
  {
    id: "announcement",
    num: "01",
    name: "Announcement",
    timing: "Day 0 to Week 2",
    emotionalState: "Shock, denial, anxiety, rumour",
    summary: "Resistance at announcement is almost entirely emotional. People have just learned that something they depend on is about to change. They do not yet know what the change means for them personally. The gap between what has been communicated and what people need to know creates a vacuum, and that vacuum fills with fear. Resistance at this stage is not about the change itself. It is about the uncertainty.",
    resistanceTypes: [
      {
        name: "Information hoarding",
        description: "Managers who received early briefings withhold detail from their teams, creating information asymmetry that breeds distrust.",
        response: "Equip managers with talking points and FAQs before the announcement. Make it clear that their role is to share, not to filter. Provide a single source of truth that anyone can access directly.",
      },
      {
        name: "Catastrophising",
        description: "People assume the worst-case scenario. Redundancies are assumed even when none are planned. Rumours spread faster than official communication.",
        response: "Address what will not change as explicitly as what will. People need boundaries around their uncertainty. If redundancies are not planned, say so directly. If some things are not yet decided, say that too, with a date for when they will be.",
      },
      {
        name: "Immediate disengagement",
        description: "Some people mentally check out the moment change is announced. Productivity drops. People start updating CVs and talking to recruiters.",
        response: "Move quickly from announcement to individual impact. The longer people wait to understand what the change means for them personally, the more they assume the worst. Forty-eight hours between a general announcement and a team-level conversation is the maximum gap before disengagement accelerates.",
      },
    ],
    monitoringSignals: [
      "Increase in informal corridor conversations and messaging activity",
      "Questions from managers that reveal they were not adequately briefed",
      "Spike in HR enquiries about contracts, notice periods, or benefits",
      "Drop in discretionary effort visible in project velocity or meeting attendance",
    ],
    keyPrinciple: "Speed of personal relevance. The faster people understand what the change means for them individually, the faster the initial shock resolves into something manageable.",
  },
  {
    id: "early-implementation",
    num: "02",
    name: "Early Implementation",
    timing: "Weeks 2 to 8",
    emotionalState: "Frustration, competence anxiety, nostalgia",
    summary: "This is where resistance shifts from emotional to practical. People are now being asked to do things differently. The new way is slower, harder, and less familiar than the old way. People who were competent and confident yesterday feel incompetent and uncertain today. This is a deeply uncomfortable experience for capable professionals, and the natural response is to resist the thing that is making them feel less capable.",
    resistanceTypes: [
      {
        name: "Workaround creation",
        description: "People find ways to use the old system or process alongside or instead of the new one. Shadow spreadsheets appear. Old email distribution lists stay active. The change exists on paper but not in practice.",
        response: "Do not immediately shut down workarounds. They are diagnostic information. Each workaround tells you where the new process is failing to meet a real need. Investigate first, then address the gap, then retire the workaround. Shutting them down without understanding them creates compliance without commitment.",
      },
      {
        name: "Competence-based resistance",
        description: "People who were experts in the old way are now novices in the new way. They resist because the change threatens their professional identity and their standing among peers.",
        response: "Acknowledge the transition explicitly. Name the fact that people are moving from expert to learner and that this is temporary. Pair experienced people with support resources that respect their expertise. The worst thing you can do is put a 20-year veteran in the same basic training as a new joiner without acknowledging the difference.",
      },
      {
        name: "Manager ambivalence",
        description: "Managers publicly support the change but privately express doubt. Their teams detect the inconsistency immediately. The result is a permission structure for resistance: if my manager is not really committed, why should I be?",
        response: "Have direct, private conversations with ambivalent managers. Understand their concerns. Some will be legitimate and should change the plan. Others will be personal and need coaching. But the conversation must happen. Ignoring manager ambivalence is the single fastest way to undermine a change programme.",
      },
    ],
    monitoringSignals: [
      "Usage data showing low adoption of new tools or processes",
      "Increase in support tickets or help desk queries beyond expected levels",
      "Manager feedback suggesting the training was insufficient",
      "Evidence of parallel systems being maintained alongside the new one",
    ],
    keyPrinciple: "Protect competence. People will accept change they can succeed at. Make success possible before demanding compliance.",
  },
  {
    id: "go-live",
    num: "03",
    name: "Go-Live",
    timing: "Weeks 6 to 12",
    emotionalState: "Overload, stress, fragmentation",
    summary: "Go-live concentrates every pressure into a single moment. The old way is no longer available. The new way must work. Support teams are stretched. Managers are overwhelmed with questions. Leadership often assumes the hard part is over when in reality it is just beginning. Resistance at go-live is often expressed as anger, blame, or withdrawal because people are under genuine pressure and the change is now inescapable.",
    resistanceTypes: [
      {
        name: "Blame escalation",
        description: "Every problem is attributed to the change. Issues that existed before the change are reframed as being caused by it. The change becomes a lightning rod for accumulated frustration.",
        response: "Separate change-related issues from pre-existing ones. Acknowledge genuine problems quickly and visibly. Have a rapid-response process for issues that are genuinely caused by the change. If people see that real problems are being fixed quickly, the blame attribution reduces. If problems are dismissed or explained away, blame intensifies.",
      },
      {
        name: "Support system overload",
        description: "Help desks, super users, and managers are overwhelmed. Response times increase. People who need help cannot get it. This converts neutral people into resistant ones.",
        response: "Over-resource support at go-live and scale back, rather than under-resource and try to scale up. The cost of excess support for two weeks is trivial compared to the cost of losing goodwill at the moment when it matters most. Every person who cannot get help at go-live becomes an advocate against the change.",
      },
      {
        name: "Performative compliance",
        description: "People use the new system for auditable transactions but revert to the old ways for everything else. The data shows adoption but the reality does not match.",
        response: "Measure behaviour, not just system usage. Walk the floor. Talk to people about their actual daily experience, not just whether they logged into the new platform. If you only measure what the system can track, you will only see what people want you to see.",
      },
    ],
    monitoringSignals: [
      "Support ticket volume relative to baseline expectations",
      "Sentiment in team meetings and informal channels",
      "Gap between system usage metrics and observed behaviour",
      "Manager escalations about workload or team stress",
    ],
    keyPrinciple: "Absorb the pain. Go-live is not the finish line. It is the moment of maximum vulnerability. Resource and lead accordingly.",
  },
  {
    id: "post-go-live",
    num: "04",
    name: "Post-Go-Live",
    timing: "Weeks 12 to 24",
    emotionalState: "Fatigue, cynicism, selective adoption",
    summary: "The programme team is winding down. Leadership attention has moved to the next priority. But the people living the change are still in the thick of it. Post-go-live resistance is characterised by quiet regression: people slowly drift back to old habits because nobody is watching anymore. The formal change is complete. The actual change is still in progress. This is where most change programmes lose what they gained.",
    resistanceTypes: [
      {
        name: "Quiet regression",
        description: "Without sustained attention, people revert to familiar patterns. Not defiantly, but gradually. The new process is used when someone is watching and ignored when they are not.",
        response: "Build sustainment into the plan from the beginning, not as an afterthought. Assign specific people to monitor adoption for at least six months after go-live. Make regression visible through data, not surveillance. When you can show a team that their adoption has dropped, the conversation shifts from policing to problem-solving.",
      },
      {
        name: "Change fatigue cynicism",
        description: "People who have been through multiple changes begin to treat this one as another initiative that will eventually be abandoned. They wait it out rather than commit.",
        response: "Acknowledge the pattern honestly. If the organisation has a history of starting things and not finishing them, pretending otherwise insults people's intelligence. Instead, demonstrate that this change is different by sustaining focus, resources, and leadership attention beyond the point where previous changes were abandoned.",
      },
      {
        name: "Localised resistance pockets",
        description: "Overall adoption is acceptable but specific teams or regions remain resistant. These pockets are often led by influential individuals whose concerns were never adequately addressed.",
        response: "Identify the influential individuals and have genuine conversations. Not to persuade them, but to understand them. Often their resistance is rooted in a legitimate issue that was deprioritised during implementation. Addressing it now is cheaper than working around it forever.",
      },
    ],
    monitoringSignals: [
      "Adoption metrics trending downward after initial post-go-live spike",
      "Decrease in support queries that might indicate people have stopped trying",
      "Inconsistent usage patterns across teams or regions",
      "Feedback themes shifting from specific problems to general cynicism",
    ],
    keyPrinciple: "Sustained visibility. The change is only complete when it no longer requires attention. That point comes months after go-live, not days.",
  },
  {
    id: "sustainment",
    num: "05",
    name: "Sustainment",
    timing: "Month 6 onwards",
    emotionalState: "Normalisation, identity integration, residual pockets",
    summary: "Sustainment is not a phase of resistance management so much as the test of whether your resistance management worked. If the change is genuinely embedded, resistance has resolved into acceptance or even advocacy. If it is not, residual resistance has become structural: baked into team norms, informal processes, and cultural expectations that are very difficult to shift after this point. The decisions you make about resistance in the first five months determine what you face in month six and beyond.",
    resistanceTypes: [
      {
        name: "Structural workarounds",
        description: "Workarounds that began as temporary coping mechanisms have become permanent unofficial processes. New joiners are taught the workaround, not the intended process.",
        response: "Conduct a process audit that compares intended ways of working with actual ways of working. Where they diverge, determine whether the workaround is genuinely better than the intended process. Sometimes it is, and the plan should adapt. Where it is not, redesign the intended process to address whatever need the workaround was meeting.",
      },
      {
        name: "Cultural antibodies",
        description: "The organisation has absorbed the surface of the change but rejected the substance. Language has changed but behaviour has not. People use the new terminology but operate by the old rules.",
        response: "This is the hardest form of resistance to address because it is invisible to metrics. It requires qualitative investigation: interviews, observation, and honest conversation with people who will tell you the truth. Align reinforcement systems, performance management, recognition, and promotion criteria, with the behaviours the change requires.",
      },
      {
        name: "New joiner confusion",
        description: "People who joined after the change find a gap between what the organisation says it does and what it actually does. This erodes trust and perpetuates the gap between intended and actual behaviour.",
        response: "Update onboarding to reflect actual current practice, not the original change vision. Use the gap between vision and reality as a diagnostic tool. If new joiners consistently report that reality does not match what they were told, that tells you exactly where the change has not landed.",
      },
    ],
    monitoringSignals: [
      "New joiner feedback about gaps between stated and actual practice",
      "Process compliance audits revealing systematic divergence",
      "Exit interview themes related to culture or ways of working",
      "Whether leadership still references the change or has moved on entirely",
    ],
    keyPrinciple: "Integration, not maintenance. The goal is not to keep managing resistance forever. It is to reach the point where the new way is simply how things are done.",
  },
];

/* ───────────────── anticipation framework ───────────────── */

const anticipationItems: ActionItem[] = [
  {
    text: "Map stakeholder impact before announcing the change",
    detail: "For each stakeholder group, identify what they will lose, what they will gain, and what they will need to learn. Loss is the primary driver of resistance. People do not resist change in the abstract. They resist specific losses: loss of competence, status, relationships, autonomy, or certainty. If you can name the loss before people experience it, you can address it before it becomes resistance.",
  },
  {
    text: "Assess organisational change history and scar tissue",
    detail: "Every organisation carries the residue of previous changes. If the last transformation was mishandled, people approach the next one with defensive scepticism. This is not irrational. It is learned behaviour. Before you plan your resistance management approach, understand what people learned from the last change. Their resistance to your change may actually be a rational response to the last one.",
  },
  {
    text: "Identify the influential nodes in the informal network",
    detail: "Formal hierarchy tells you who has authority. Informal networks tell you who has influence. The person whose opinion most people trust is rarely the most senior person in the room. Map the informal network through observation and conversation. Identify who people go to when they want to know what is really happening. These are the people whose early resistance or support will cascade through the organisation.",
  },
  {
    text: "Conduct a pre-mortem on your change plan",
    detail: "Gather a cross-functional group and ask: assume it is twelve months from now and this change has failed. What went wrong? A pre-mortem surfaces risks that optimism-biased planning misses. It gives people permission to voice concerns early, when they can be addressed, rather than later when they become resistance. The resistance you anticipate is the resistance you can prevent.",
  },
  {
    text: "Distinguish between what is decided and what is still open",
    detail: "People resist differently when they believe they have no influence. If some elements of the change are genuinely open for input, say so clearly and early. If other elements are decided and non-negotiable, say that too. Ambiguity about what people can and cannot influence creates the most toxic form of resistance: the kind born from false hope followed by disappointment.",
  },
];

/* ───────────────── monitoring framework ───────────────── */

const monitoringItems: ActionItem[] = [
  {
    text: "Establish a resistance baseline before the change begins",
    detail: "Measure sentiment, engagement, and readiness before you start. Without a baseline, you cannot distinguish change-related resistance from pre-existing dissatisfaction. Many organisations attribute problems to their change programme that actually existed before it began. A baseline protects you from this misattribution and focuses your effort on resistance that is genuinely connected to the change.",
  },
  {
    text: "Use leading indicators, not lagging ones",
    detail: "Adoption metrics tell you what happened. Sentiment data tells you what is about to happen. Monitor the leading indicators: the tone of questions in team meetings, the volume and nature of informal conversations, the speed at which workarounds appear, and whether managers are actively supporting the change or quietly distancing themselves from it. By the time adoption drops, the resistance has already won.",
  },
  {
    text: "Create regular, structured listening mechanisms",
    detail: "Weekly pulse surveys of three to five questions. Fortnightly skip-level conversations. Monthly manager forums with genuine two-way dialogue. These are not optional extras. They are the sensing system that tells you where resistance is building before it becomes visible in behaviour. The cadence matters: resistance can shift from manageable to entrenched in a matter of weeks if it is not monitored.",
  },
  {
    text: "Track resistance by stakeholder group, not just in aggregate",
    detail: "Aggregate resistance data hides the pattern. Overall sentiment may be acceptable while a specific team, region, or level is in active resistance. Segment your monitoring by the stakeholder groups you identified in your impact assessment. If one group's resistance is significantly higher than others, investigate what is different about their experience. The answer usually reveals a gap in your plan.",
  },
  {
    text: "Make resistance data part of the programme governance rhythm",
    detail: "Resistance data should be reported to the steering committee alongside cost, schedule, and scope. If it is not, it will be deprioritised. When resistance is treated as a governance metric, it receives the same attention and resource allocation as other programme risks. When it is treated as a soft measure, it is discussed in passing and addressed in spare time.",
  },
];

/* ───────────────── healthy vs destructive resistance ───────────────── */

interface ResistanceComparison {
  dimension: string;
  healthyChallenge: string;
  destructiveResistance: string;
}

const resistanceComparisons: ResistanceComparison[] = [
  {
    dimension: "Intent",
    healthyChallenge: "Aims to improve the change. The person wants the change to succeed but believes the current approach has flaws that need addressing.",
    destructiveResistance: "Aims to prevent the change. The person wants to return to the status quo regardless of whether the change approach is sound.",
  },
  {
    dimension: "Specificity",
    healthyChallenge: "Raises specific, actionable concerns. Points to particular risks, gaps, or assumptions that can be investigated and addressed.",
    destructiveResistance: "Raises vague, generalised objections. Uses phrases like 'this will never work' or 'they never listen to us' without specific evidence.",
  },
  {
    dimension: "Audience",
    healthyChallenge: "Directed at people who can act on it. Raised in meetings, feedback forums, or direct conversations with decision-makers.",
    destructiveResistance: "Directed at people who cannot act on it. Expressed in corridors, messaging groups, or social settings where it builds solidarity against the change but produces no action.",
  },
  {
    dimension: "Consistency",
    healthyChallenge: "Engages with the response. When concerns are addressed, the person acknowledges the response and either accepts it or raises a further specific point.",
    destructiveResistance: "Moves the goalposts. When one concern is addressed, a new one appears. The resistance is not about the specific issue. It is about the change itself.",
  },
  {
    dimension: "Tone",
    healthyChallenge: "Constructive, even when blunt. The person may be frustrated or direct, but the underlying message is: I want this to work and here is what needs to change.",
    destructiveResistance: "Corrosive. The underlying message is: this is being done to us and nothing we say will matter. The tone invites others to disengage rather than engage.",
  },
];

/* ───────────────── response framework ───────────────── */

const responseItems: ActionItem[] = [
  {
    text: "Respond to the concern, not the behaviour",
    detail: "When someone resists, it is natural to focus on how they are expressing their resistance: the tone, the timing, the audience. But the behaviour is a symptom. The concern is the cause. A person who raises objections aggressively in a meeting may be doing so because they tried raising them quietly and were ignored. If you address only the behaviour, you suppress the symptom without treating the disease. The resistance goes underground, where it is far more damaging.",
  },
  {
    text: "Differentiate your response by type of resistance",
    detail: "Not all resistance requires the same response. Resistance rooted in lack of information needs communication. Resistance rooted in lack of capability needs training and support. Resistance rooted in loss of status or identity needs acknowledgement and new sources of value. Resistance rooted in genuine disagreement with the direction needs honest dialogue. Applying the wrong response to the wrong type of resistance makes it worse, not better.",
  },
  {
    text: "Engage resistant individuals directly and privately",
    detail: "Public confrontation with resistant individuals polarises the situation. It forces them to defend their position in front of an audience, which hardens their stance and creates spectators who choose sides. Private, one-to-one conversations allow people to be honest about their concerns without performing for an audience. Most resistance softens significantly when the person feels genuinely heard in a safe setting.",
  },
  {
    text: "Convert legitimate resistance into plan improvements",
    detail: "The most powerful resistance management technique is also the simplest: change the plan when the resistance is right. If someone raises a concern that reveals a genuine gap, fix the gap and publicly credit the person who raised it. This does three things simultaneously: it improves the plan, it demonstrates that the organisation listens, and it converts a resistant individual into someone whose engagement with the change has been validated.",
  },
  {
    text: "Know when to accept, not resolve, residual resistance",
    detail: "Not all resistance will resolve. Some people will never fully embrace the change. This is acceptable as long as they comply with the required behaviours and do not actively undermine others. The goal of resistance management is not universal enthusiasm. It is sufficient adoption to achieve the intended outcomes, with resistance contained to a level that does not compromise the change. Pursuing zero resistance wastes resources and often creates more resistance than it resolves.",
  },
];

/* ───────────────── case studies ───────────────── */

const caseStudies = [
  {
    label: "Microsoft",
    headline: "How Satya Nadella's growth mindset transformation managed resistance across 130,000 employees",
    hook: "A culture commission, not a mandate. Coaching, not compliance.",
    dimension: "Culture Transformation",
    body: [
      "When Satya Nadella became CEO of Microsoft in 2014, the company's internal culture was defined by a forced-ranking performance system that pitted employees against each other. Teams hoarded knowledge, competed for resources, and avoided collaboration. The culture was not a side issue. It was the primary barrier to Microsoft's strategic transformation toward cloud computing and services.",
      "Nadella understood that mandating culture change would trigger exactly the resistance it was trying to overcome. Instead, he established a 'culture commission' led by Chief People Officer Kathleen Hogan, designed specifically to anticipate and manage resistance before it crystallised. The commission did not issue directives. It created conditions for change.",
      "The approach was phased deliberately. First, the forced-ranking system was eliminated, removing the structural cause of internal competition. Then, the new growth mindset framework was introduced not as a replacement but as an evolution. Nadella modelled the behaviour himself, publicly sharing his own learning moments and mistakes. When senior leaders who had thrived under the old system resisted the new expectations, they were coached individually rather than publicly corrected.",
      "The resistance management was sustained over years, not months. Nadella and Hogan continuously monitored cultural indicators through employee surveys and manager feedback, adjusting the approach based on what they found. Teams that adapted quickly became case studies for teams that were still transitioning. The result was not instantaneous transformation but a gradual, managed shift that moved Microsoft from a market value of $300 billion in 2014 to over $2.5 trillion by 2023.",
    ],
    lesson: "Microsoft demonstrates that resistance management at scale requires a structural approach, not a communications campaign. By creating a dedicated function to anticipate and address resistance, eliminating the systems that caused it, and sustaining attention over years rather than months, Nadella converted deeply embedded cultural resistance into a competitive advantage.",
    source: "https://hbr.org/2023/10/satya-nadellas-blueprint-for-culture-change-at-microsoft",
    sourceLabel: "Harvard Business Review",
  },
  {
    label: "Ford",
    headline: "Alan Mulally's One Ford plan turned a culture of blame into a culture of transparency",
    hook: "He made it safe to report problems. That changed everything.",
    dimension: "Leadership & Transparency",
    body: [
      "When Alan Mulally arrived as CEO of Ford Motor Company in 2006, the company was facing a $12.7 billion loss and a culture where admitting problems was career-ending. In weekly business plan review meetings, every executive's status report showed green, meaning on track, despite the fact that the company was haemorrhaging money. The resistance was not to a specific change. It was to honesty itself.",
      "Mulally's resistance management approach was deceptively simple but structurally profound. He instituted a colour-coded reporting system in weekly BPR meetings: green for on track, yellow for concerns, red for problems. In the first weeks, every slide was green. Mulally waited. Then Mark Fields, then head of the Americas division, reported a red item: a vehicle launch with a serious quality issue.",
      "The room went silent, expecting Mulally to react with anger. Instead, he clapped. He thanked Fields for the transparency and asked the room who could help solve the problem. The following week, the reports were covered in yellows and reds. The resistance to honesty dissolved in a single moment because Mulally had demonstrated that the response to problems would be support, not punishment.",
      "This was not accidental. Mulally had anticipated that the cultural resistance at Ford ran deeper than any process change. By creating a ritualized weekly forum where vulnerability was rewarded rather than punished, he addressed the root cause of resistance: fear. During his tenure, Ford went from a $12.7 billion loss to a $6.3 billion pre-tax profit in 2014 without taking a government bailout, the only major US automaker to do so during the financial crisis.",
    ],
    lesson: "Ford demonstrates that the most effective resistance management sometimes involves changing the environment rather than changing the people. Mulally did not try to convince executives to be more transparent. He created a structure where transparency was safe, and then publicly rewarded the first person brave enough to test it. The resistance dissolved not because it was managed but because its cause was removed.",
    source: "https://hbr.org/2013/06/how-alan-mulally-turned-ford-around",
    sourceLabel: "Harvard Business Review",
  },
  {
    label: "NHS England",
    headline: "The Global Digital Exemplar programme learned that clinical resistance requires clinical champions",
    hook: "IT-led mandates failed. Clinician-led adoption worked.",
    dimension: "Digital Transformation",
    body: [
      "NHS England's Global Digital Exemplar (GDE) programme, launched in 2016, aimed to create digitally advanced hospitals that would serve as blueprints for the wider health service. But the programme faced a fundamental resistance challenge: clinical staff viewed digital transformation as an IT initiative imposed on them, not a clinical improvement designed with them.",
      "Early implementation revealed that resistance was not uniform. It varied dramatically by clinical context. A digital system that worked well in an outpatient clinic created genuine safety concerns in an emergency department where seconds mattered and screen-based workflows competed with patient attention. Treating all clinical resistance as the same, as technophobia or stubbornness, missed the point entirely.",
      "The breakthrough came when the programme invested in Chief Clinical Information Officers: practising clinicians given dedicated time and authority to lead digital adoption within their trusts. These CCIOs could distinguish between resistance that reflected legitimate clinical risk and resistance that reflected unfamiliarity. They responded differently to each. Clinical safety concerns triggered system redesign. Unfamiliarity triggered targeted training and peer support from clinicians who had already adopted the tools.",
      "A formative evaluation across 12 NHS provider organisations found that the trusts which made the most progress were those that treated resistance as clinical intelligence rather than an obstacle to deployment. They used resistance data to redesign workflows, adjust implementation sequences, and create locally relevant training. The trusts that treated resistance as a communications problem to be overcome made the least progress.",
    ],
    lesson: "The NHS GDE programme demonstrates that resistance management requires domain credibility. In clinical settings, only clinicians could legitimately distinguish healthy challenge from obstruction. By investing in clinical champions with real authority, the programme converted resistance from a barrier into a quality assurance mechanism that improved the technology and the implementation.",
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8685936/",
    sourceLabel: "BMC Medicine",
  },
];

/* ───────────────── expandable list component ───────────────── */

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

/* ───────────────── main page component ───────────────── */

export default function ResistanceManagement() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeComparison, setActiveComparison] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "impact-mapped", label: "We have mapped the specific losses each stakeholder group will experience before announcing the change" },
    { key: "history-assessed", label: "We have assessed the organisation's change history and understood what scar tissue people carry from previous changes" },
    { key: "informal-network", label: "We have identified the informal influencers whose early response will shape the wider reaction" },
    { key: "pre-mortem", label: "We have conducted a pre-mortem to surface resistance risks that optimism-biased planning misses" },
    { key: "baseline", label: "We have a sentiment and engagement baseline from before the change began" },
    { key: "leading-indicators", label: "We are monitoring leading indicators of resistance, not just lagging adoption metrics" },
    { key: "listening", label: "We have structured, regular listening mechanisms with a cadence of no less than fortnightly" },
    { key: "segmented", label: "We are tracking resistance by stakeholder group, not just in aggregate" },
    { key: "governance", label: "Resistance data is reported to the steering committee alongside cost, schedule, and scope" },
    { key: "response-differentiated", label: "We differentiate our response based on the type of resistance, not applying a single approach to all forms" },
    { key: "healthy-challenge", label: "We can distinguish between healthy challenge that should improve the plan and destructive resistance that should be contained" },
    { key: "sustainment", label: "Our resistance management plan extends at least six months beyond go-live" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Engagement &middot; Change Impact Assessment</span>
          <h1 className="article-title">How to build a resistance management plan that actually works</h1>
          <p className="article-intro">Resistance is not a problem to be solved. It is a signal to be read. But reading it is not enough. You need a structured plan for anticipating resistance before it appears, monitoring it as the change unfolds, responding to it in ways that address root causes rather than suppress symptoms, and distinguishing between healthy challenge that should improve your plan and destructive resistance that should be contained. Most organisations do none of this systematically. They treat resistance as an unpleasant surprise rather than a predictable, manageable feature of every change.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ───────── RESISTANCE LIFECYCLE TRACKER ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Resistance Lifecycle Tracker</h2>
          <p className="article-section-desc">Resistance is not static. It evolves through five distinct phases of a change, each with different types of resistance, different emotional drivers, and different recommended responses. Click any phase to see what resistance looks like at that point, how to detect it, and how to respond.</p>
        </ScrollReveal>

        <div className="staircase">
          {lifecyclePhases.map((p, i) => (
            <ScrollReveal key={p.id} direction="up" delay={i * 80}>
              <button
                className={`stair${activePhase === p.id ? " stair-active" : ""}`}
                style={{
                  "--stair-colour": i === 0 ? "#B8860B" : i === 1 ? "#6B7280" : i === 2 ? "#8B0000" : i === 3 ? "#2E6B4F" : "#0A1628",
                  marginLeft: `${i * 48}px`,
                } as React.CSSProperties}
                onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              >
                <span className="stair-level">{p.num}</span>
                <span className="stair-name">{p.name}</span>
                <span className="stair-tagline">{p.timing}: {p.emotionalState}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {activePhase && (
        <section className="article-section dimension-detail">
          {lifecyclePhases.filter(p => p.id === activePhase).map(p => (
            <div key={p.id}>
              <ScrollReveal direction="up">
                <div className="detail-header">
                  <span className="dimension-num-lg">{p.num}</span>
                  <h2 className="detail-title">{p.name}</h2>
                </div>
                <p style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "16px" }}>{p.timing}</p>
                <p className="detail-body">{p.summary}</p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="detail-block">
                  <h3 className="detail-block-title">Types of Resistance at This Phase</h3>
                  <ul className="detail-list">
                    {p.resistanceTypes.map((rt, i) => (
                      <ResistanceTypeItem key={i} resistanceType={rt} />
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="detail-block">
                  <h3 className="detail-block-title">What to Monitor</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {p.monitoringSignals.map((signal, i) => (
                      <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(10,22,40,0.08)", fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)" }}>
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="detail-block detail-block-warning">
                  <h3 className="detail-block-title">The Key Principle</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{p.keyPrinciple}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      )}

      {/* ───────── ANTICIPATION ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Anticipating Resistance Before It Appears</h2>
          <p className="article-section-desc">The most effective resistance management happens before anyone resists. Anticipation is not about predicting the future. It is about understanding the present well enough to know where pressure will build when the change begins. Most resistance is predictable if you ask the right questions early enough.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={anticipationItems} />
        </ScrollReveal>
      </section>

      {/* ───────── MONITORING ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Monitoring Resistance During Delivery</h2>
          <p className="article-section-desc">Monitoring is not surveillance. It is a sensing system that tells you where your plan is working and where it is not. Without structured monitoring, you will not know resistance is building until it has already crystallised into behaviours that are much harder to address.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={monitoringItems} />
        </ScrollReveal>
      </section>

      {/* ───────── RESPONDING ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Responding to Resistance Without Suppressing It</h2>
          <p className="article-section-desc">The instinct when resistance appears is to overcome it. Push harder. Communicate more. Escalate to leadership. These responses share a common assumption: that resistance is the problem and the plan is fine. Often, the resistance is the intelligence and the plan is the problem. The way you respond to resistance determines whether it becomes a resource or a roadblock.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandableList items={responseItems} />
        </ScrollReveal>
      </section>

      {/* ───────── HEALTHY vs DESTRUCTIVE ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Distinguishing Healthy Challenge from Destructive Resistance</h2>
          <p className="article-section-desc">Not all resistance is equal, and treating it as if it were is one of the most common mistakes in change management. Healthy challenge makes the change better. Destructive resistance makes the change harder. Conflating the two means you either suppress valuable feedback or tolerate behaviour that undermines the programme. Click any dimension to compare the two.</p>
        </ScrollReveal>

        <div className="phase-list">
          {resistanceComparisons.map((rc, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeComparison === i ? " phase-card-active" : ""}`}
                onClick={() => setActiveComparison(activeComparison === i ? null : i)}
              >
                <span className="phase-card-pillar">{rc.dimension}</span>
                <span className="phase-card-name">How does {rc.dimension.toLowerCase()} differ between healthy challenge and destructive resistance?</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeComparison !== null && (
          <ScrollReveal direction="up">
            <div className="phase-compare" style={{ marginTop: "4px" }}>
              <div className="phase-compare-col">
                <span className="phase-compare-label">Healthy Challenge</span>
                <p className="phase-compare-text">{resistanceComparisons[activeComparison].healthyChallenge}</p>
              </div>
              <div className="phase-compare-col phase-compare-leader">
                <span className="phase-compare-label">Destructive Resistance</span>
                <p className="phase-compare-text">{resistanceComparisons[activeComparison].destructiveResistance}</p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ───────── CHECKLIST ───────── */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Resistance Management Plan Complete?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your resistance management plan covers anticipation, monitoring, response, and sustainment. A plan that only addresses one dimension will leave gaps that resistance exploits.</p>
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
                  <span className="check-complete"> &mdash; Your resistance management plan covers all four dimensions. You are well-positioned to anticipate, detect, and respond to resistance throughout the change lifecycle.</span>
                )}
                {checkedCount >= 9 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong coverage. Address the remaining gaps to ensure your plan does not have blind spots.</span>
                )}
                {checkedCount >= 5 && checkedCount < 9 && (
                  <span className="check-partial"> &mdash; Partial coverage. Your plan likely addresses some dimensions well but leaves others exposed. Review which of anticipation, monitoring, response, and sustainment is weakest.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant gaps. Without structured coverage across all four dimensions, resistance will find the gaps in your plan before you do.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Engagement</strong>, the second pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ───────── SIDEBAR ───────── */}
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

      {/* ───────── CASE STUDY MODAL ───────── */}
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

/* ───────────────── sub-component for resistance types in lifecycle tracker ───────────────── */

function ResistanceTypeItem({ resistanceType }: { resistanceType: ResistanceType }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="detail-list-item" onClick={() => setOpen(!open)}>
      <div className="detail-list-item-head">
        <strong>{resistanceType.name}</strong>: {resistanceType.description}
        <span className={`detail-list-item-toggle${open ? " open" : ""}`}>&rsaquo;</span>
      </div>
      {open && (
        <div className="detail-list-item-body">
          <strong>Recommended response:</strong> {resistanceType.response}
        </div>
      )}
    </li>
  );
}
