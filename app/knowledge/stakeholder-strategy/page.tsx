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

/* ------------------------------------------------------------------ */
/*  Interactive Stakeholder Map, concentric rings                     */
/* ------------------------------------------------------------------ */

const stakeholderRings = [
  {
    id: "power",
    num: "01",
    name: "Power",
    colour: "#0A1628",
    radius: "outer",
    tagline: "Who can stop this or make it happen?",
    description:
      "The outermost ring of your stakeholder map contains the people with formal authority over the change. These are the executives, board members, and senior leaders whose decisions determine whether the change is funded, prioritised, and protected. Power stakeholders do not need to be convinced that the change is a good idea. They need to be convinced that it is their priority, and that it will not embarrass them if it fails.",
    who: [
      "Executive sponsor and their direct reports",
      "Budget holders whose funding the change depends on",
      "Senior leaders whose strategic priorities the change either supports or competes with",
      "Governance bodies and steering committees with formal decision rights",
      "External regulators or board members whose approval is required",
    ],
    engagement:
      "Power stakeholders require structured, high-touch engagement. They need the narrative, the business case, and the risk profile. But they also need to feel that their concerns have been heard and that their reputation is safe. The biggest mistake change teams make with power stakeholders is treating them as an audience to be informed rather than a constituency to be consulted. When a power stakeholder feels consulted, they become an advocate. When they feel informed after the fact, they become a threat.",
    pitfall:
      "Do not confuse seniority with homogeneity. Two executives at the same level may have completely different concerns about the same change. One may worry about cost, another about capability, another about timing. Map power stakeholders individually, not as a group.",
  },
  {
    id: "influence",
    num: "02",
    name: "Influence",
    colour: "#B8860B",
    radius: "middle",
    tagline: "Who shapes what other people think and do?",
    description:
      "The middle ring contains the people who may not have formal authority but whose opinions disproportionately shape what others think about the change. These are the informal influencers: the respected technical experts, the long-tenured team leads, the people others go to for advice before they make up their minds. Influence stakeholders are the most underestimated and the most powerful group in your map.",
    who: [
      "Middle managers who translate strategy into daily work",
      "Technical experts and subject matter authorities whose opinion others trust",
      "Long-tenured staff who embody the institutional memory of the organisation",
      "Union representatives and staff council members",
      "Cross-functional connectors who bridge teams and departments informally",
    ],
    engagement:
      "Influence stakeholders need early, honest engagement. They need to hear about the change before it is announced widely, not because they are more important, but because they will be the first people others turn to for their reaction. If their first encounter with the change is the same town hall as everyone else, you have lost the opportunity to shape their response. Give them context, give them a voice, and give them time to process before the organisation looks to them for a signal.",
    pitfall:
      "Influence is not always positive. Some influencers will resist the change, and their resistance will carry more weight than anyone else's. Do not avoid them. Engage them directly, understand their concerns, and address them honestly. An influencer who feels heard may not agree, but they are less likely to actively undermine.",
  },
  {
    id: "impact",
    num: "03",
    name: "Impact",
    colour: "#2E6B4F",
    radius: "inner",
    tagline: "Whose daily work is actually changing?",
    description:
      "The innermost ring contains the people whose daily experience will be most directly altered by the change. These are the operational teams, the frontline staff, the people who will need to stop doing something one way and start doing it another way. Impact stakeholders are often the last to be engaged and the first to be blamed when adoption falters. In reality, they hold the keys to whether the change lands or not.",
    who: [
      "Frontline teams whose processes, tools, or workflows are changing",
      "Customer-facing staff whose interactions will be affected",
      "Support functions whose workload will shift during transition",
      "New hires who will be onboarded into a changed environment",
      "Teams in adjacent functions who depend on the outputs of changing teams",
    ],
    engagement:
      "Impact stakeholders need engagement that respects their time, acknowledges their expertise, and addresses their specific concerns. Generic communications about strategic vision will not land here. These people need to know: what exactly is changing for me, when is it happening, will I be supported, and does anyone understand how busy I already am? The single most effective engagement approach for impact stakeholders is involving them in designing the change that affects them. When people co-create the solution, they do not need to be sold on it.",
    pitfall:
      "Do not treat impact stakeholders as passive recipients of change. They know more about how the work actually gets done than anyone in the programme team. If you design the change without their input and then ask for their buy-in, you will get compliance at best and sabotage at worst.",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 1, Engaging busy operational teams                          */
/* ------------------------------------------------------------------ */

const busyTeamsActions: ActionItem[] = [
  {
    text: "Start by earning the right to their attention, not demanding it",
    detail:
      "Operational teams have heard it before. Another initiative, another set of workshops, another request to attend something that takes them away from the work they are measured on. Before you ask for their time, demonstrate that you understand their world. Spend time observing their work, reading their performance dashboards, and talking to their managers about current pressures. When you eventually ask for their engagement, frame it in terms of their priorities, not yours. The question is not 'how do we get operations engaged in the change programme?' It is 'how does this change solve a problem operations already has?'",
  },
  {
    text: "Design engagement around their workflow, not your programme plan",
    detail:
      "If your engagement plan requires operational staff to leave their desks, attend workshops, and complete pre-reading, you have already lost. The most effective engagement with busy teams happens inside their existing routines: a ten-minute slot in their team meeting, a brief conversation during a shift handover, a short feedback loop built into a tool they already use. Design engagement that fits into their day rather than competing with it. This requires the change team to adapt to operations, not the other way around.",
  },
  {
    text: "Give them a genuine voice in how the change is implemented, not just whether they accept it",
    detail:
      "Operational teams are experts in their own work. They know where the bottlenecks are, which workarounds exist, and what will break if you change the process without understanding the dependencies. The most powerful form of engagement is co-design: bring operational staff into the design of the solution that affects them. This does not mean asking them to validate a solution that has already been built. It means involving them early enough that their expertise shapes the design. When people help build the solution, resistance evaporates because they own the outcome.",
  },
  {
    text: "Protect their capacity by negotiating what stops, not just what starts",
    detail:
      "Every change initiative adds to the workload of operational teams. If you do not negotiate what is being paused, deprioritised, or removed to make room for the change, you are asking people to absorb the new on top of everything they already do. This is where executive sponsorship becomes critical. The change team needs to work with sponsors to create genuine capacity: reducing reporting requirements during transition, pausing non-essential projects, or temporarily adjusting performance targets. Without capacity protection, engagement becomes extraction.",
  },
  {
    text: "Measure engagement by behaviour change, not attendance",
    detail:
      "Attendance at workshops is not engagement. Completion of e-learning modules is not engagement. Engagement is when an operational team starts doing something differently because they believe it is better. Measure what people do after the engagement activity, not whether they showed up. Track whether teams are using the new process, asking questions, raising issues, or adapting the change to their context. These are signs of genuine engagement. A full room of people checking their phones is not.",
  },
  {
    text: "Use their language, not yours",
    detail:
      "Change management jargon alienates operational teams faster than almost anything else. If your communications reference 'change readiness', 'adoption curves', or 'stakeholder engagement', you have lost the room. Translate everything into the language of their work: production targets, customer service levels, system uptime, process efficiency. The change needs to make sense in operational terms. If you cannot explain the change without using a single change management term, your messaging is not ready for this audience.",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 2, Building a stakeholder map that drives engagement        */
/* ------------------------------------------------------------------ */

const stakeholderMapActions: ActionItem[] = [
  {
    text: "Map individuals, not roles or departments",
    detail:
      "The most common stakeholder mapping mistake is mapping roles: 'Head of Operations', 'Finance Director', 'IT Lead'. This produces a generic list that tells you nothing about the actual people involved. A stakeholder map that drives engagement maps individuals: Sarah Chen, who has been Head of Operations for twelve years and is sceptical of technology-led change. David Okoro, who joined as Finance Director six months ago and is looking for quick wins to establish credibility. The map needs to capture the person, not the position, because people with the same role title can have completely different dispositions, concerns, and influence patterns.",
  },
  {
    text: "Assess disposition honestly, including your own blind spots",
    detail:
      "For each stakeholder, assess their current disposition toward the change on a simple scale: active supporter, passive supporter, neutral, passive resister, or active resister. Be honest. Change teams have a tendency to overestimate support and underestimate resistance because they are emotionally invested in the change succeeding. Test your assessments with people who know the stakeholders well. Ask their managers, their peers, and their direct reports. A stakeholder map built on optimistic assumptions will produce an engagement plan that misses the people who matter most.",
  },
  {
    text: "Map influence networks, not just reporting lines",
    detail:
      "The formal organisation chart tells you who reports to whom. It does not tell you who influences whom. In every organisation, there are people whose opinion carries disproportionate weight regardless of their title. They are the ones others consult before making up their minds. They are the ones whose reaction to the change will set the tone for their entire team. Map these influence relationships explicitly. Ask: who do people go to for advice? Whose opinion would change someone's mind about this? Who are the informal connectors between teams? Your stakeholder map needs a second layer that shows how influence actually flows, not just how authority is structured.",
  },
  {
    text: "Identify what each stakeholder cares about most, and map the change to that concern",
    detail:
      "Every stakeholder has a primary concern that shapes their response to the change. For some, it is their team's workload. For others, it is their personal career trajectory. For others, it is whether the change threatens their expertise or their autonomy. A stakeholder map that drives engagement captures this primary concern for each person and then maps the change to it. This is not manipulation. It is the basic principle of communication: if you want someone to hear your message, frame it in terms of what they already care about. A single change can be framed as a cost reduction for the CFO, a capability upgrade for the CTO, and a workload simplification for the operations manager. All three frames are true. Each one resonates with a different person.",
  },
  {
    text: "Define the engagement approach for each stakeholder, not a one-size-fits-all plan",
    detail:
      "The stakeholder map should directly produce the engagement plan. For each stakeholder, define: what is their current disposition, what disposition do we need them to reach, what is their primary concern, and what engagement approach will move them? This produces a differentiated plan where active resisters get direct, one-on-one conversations with senior leaders; passive supporters get early involvement in design; and neutral stakeholders get targeted information that addresses their specific concerns. A single town hall for all stakeholders is not a strategy. It is a broadcast.",
  },
  {
    text: "Treat the map as a living document that evolves weekly, not a one-time exercise",
    detail:
      "Stakeholder dispositions change. A supporter who gets blindsided by a decision they were not consulted on becomes a resister overnight. A resister who is genuinely listened to can become your strongest advocate. The stakeholder map needs to be reviewed and updated at least weekly during active change. Assign ownership of key stakeholder relationships to specific members of the change team and hold them accountable for keeping the map current. A stakeholder map that was accurate three months ago and has not been updated since is worse than no map at all, because it creates false confidence.",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 3, Identifying and activating informal influencers          */
/* ------------------------------------------------------------------ */

const influencerActions: ActionItem[] = [
  {
    text: "Understand why informal influencers matter more than formal authority in driving adoption",
    detail:
      "Research consistently shows that people's decisions about whether to adopt a change are more influenced by their peers than by their leaders. When someone is uncertain about a new process, they do not re-read the CEO's email. They walk to the desk of the person they trust and ask: 'what do you think of this?' That person is an informal influencer. They may be a team lead, a senior individual contributor, or someone with no formal authority at all. But their opinion carries weight because it has been earned through competence, consistency, and genuine relationships. If you win the informal influencers, adoption follows. If you ignore them, no amount of executive communication will close the gap.",
  },
  {
    text: "Use five practical methods to identify who the informal influencers actually are",
    detail:
      "Method one: ask managers 'who do people on your team go to for advice before they make a decision?' Method two: observe meeting dynamics and note who people look at when an important point is made, and whose comments shift the energy in the room. Method three: use a simple network survey asking each person to name the three colleagues they most trust for professional advice. Method four: look at communication patterns in collaboration tools like Slack or Teams to see who is most frequently mentioned or consulted across team boundaries. Method five: ask the question 'if we could only brief ten people before the wider announcement, whose reactions would most shape how the rest of the organisation responds?' The people who appear on that list are your informal influencers.",
  },
  {
    text: "Brief influencers before the wider organisation, and give them genuine information",
    detail:
      "The single most important thing you can do with informal influencers is brief them early. Not at the same time as everyone else, and certainly not after. Before. Give them the real story: what is changing, why, what is uncertain, and what the potential impact will be. Do not give them a sanitised version or a set of talking points. Influencers have credibility because they are authentic. If you give them a script, they will either ignore it or lose credibility by using it. Give them the truth, let them react, address their concerns, and then let them form their own view. When they go back to their teams with an informed perspective, the change has its most credible advocates.",
  },
  {
    text: "Give influencers a role, not just information",
    detail:
      "Information without a role creates informed bystanders, not advocates. Give your informal influencers a genuine role in the change: invite them to be part of the design process, ask them to pilot the new way of working, give them a direct line to the change team for feedback, or make them the first point of contact for questions from their peers. The role needs to be real, not ceremonial. If influencers feel they are being used as a communication channel rather than a genuine participant, they will disengage. The best influencer activation programmes give influencers the ability to shape the change, not just sell it.",
  },
  {
    text: "Support influencers without co-opting them",
    detail:
      "The moment an informal influencer is perceived by their peers as 'working for the programme', their influence evaporates. Their power comes from being seen as independent, honest, and trustworthy. Your job is to support them without co-opting them. This means giving them information and access, but not turning them into an extension of the change team. Do not give them branded materials to distribute. Do not ask them to 'cascade messages'. Do not put them in a formal change champion network with a name badge and a Teams channel. Instead, maintain a quiet, respectful relationship where they have access to the information they need and the freedom to form and share their own views.",
  },
  {
    text: "Monitor the influence network throughout the change, not just at the start",
    detail:
      "Influence is not static. The person who was the most trusted voice in the team six months ago may have moved roles, become disillusioned, or lost credibility for reasons unrelated to the change. New influencers emerge as the change progresses, particularly people who adopt the change early and become visible examples of success. Your influencer map needs to be as dynamic as your stakeholder map. Check in regularly: who are people listening to now? Whose adoption of the change is being watched by others? Who has become sceptical and whose scepticism is spreading? The influence network is a living system, and your engagement with it needs to evolve continuously.",
  },
];

/* ------------------------------------------------------------------ */
/*  Enterprise Case Studies                                            */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "ING Bank",
    headline: "ING used informal networks and squad-based engagement to transform 3,500 staff in the Netherlands without losing operational momentum",
    hook: "They gave up traditional hierarchy and formal meetings. Then they asked every employee to spend a week answering customer calls.",
    dimension: "Engaging Busy Teams",
    body: [
      "In 2015, ING Netherlands embarked on one of the most ambitious agile transformations in European banking. The challenge was immense: restructure 3,500 people from traditional departments into 350 nine-person squads organised into thirteen tribes, all while maintaining uninterrupted banking operations for millions of customers.",
      "ING understood that operational teams could not be pulled out of their work for months of workshops and training. Instead, they designed engagement around the work itself. Every employee, regardless of role, spent a week in the call centre taking real customer calls. This was not a symbolic exercise. It was a deliberate strategy to build shared understanding of the customer experience that the transformation was designed to improve. Operational staff did not need to be told why the change mattered. They experienced it.",
      "The transformation deliberately replaced formal hierarchies and scheduled meetings with informal networks and output-based steering. Squads were empowered to self-organise, and engagement happened through the daily rhythm of stand-ups, retrospectives, and sprint reviews rather than through separate change management activities layered on top of existing work.",
      "Critically, ING dedicated small, focused teams to lead mindset change within each tribe. One tribe of sixty people had just six staff leading the transition, moving from concept to implementation in forty-five days. The engagement model was lightweight, embedded, and respectful of operational constraints. The result was improved time to market, higher employee engagement scores, and increased productivity across the transformed units.",
    ],
    lesson:
      "ING demonstrated that engaging busy operational teams does not require extracting them from their work. By embedding engagement into operational rhythms, replacing formal hierarchy with informal networks, and giving every employee a direct experience of the customer problem, ING achieved transformation without sacrificing operational performance.",
    source: "https://www.mckinsey.com/industries/financial-services/our-insights/ings-agile-transformation",
    sourceLabel: "McKinsey & Company",
  },
  {
    label: "Cleveland Clinic",
    headline: "Cleveland Clinic engaged 10,000 caregivers by reframing every employee's identity and building engagement into the clinical workflow",
    hook: "They stopped calling anyone an employee. Everyone became a caregiver. Then they changed what that word meant in practice.",
    dimension: "Stakeholder Mapping",
    body: [
      "In 2008, Cleveland Clinic launched a transformation to fundamentally change how every person in the organisation thought about their role in patient care. The challenge was engaging over 50,000 staff, most of whom were clinicians and operational teams running one of the world's busiest healthcare systems, with no capacity for additional programmes or initiatives.",
      "The foundation of their approach was a radical stakeholder reframe. Cleveland Clinic stopped using the word 'employee' entirely and replaced it with 'caregiver' for everyone, from surgeons to security guards, from nurses to cafeteria staff. This was not a branding exercise. It was a deliberate stakeholder strategy that redefined how every person understood their relationship to the change. When a janitor is called a caregiver, the conversation about patient experience becomes personally relevant to them in a way that a strategic memo about 'patient-centric care models' never could.",
      "The engagement approach was mapped to each stakeholder group's specific reality. Cleveland Clinic restructured into more than twenty institutes, each bringing together all medical specialties related to a particular set of conditions. This meant that stakeholder engagement was not generic. It was specific to each institute, each specialty, and each team's relationship to the patient experience they were trying to improve.",
      "Using the Gallup Q12 framework, they established baseline engagement metrics and tracked progress at the team level, not just the organisational level. Over five years, they engaged more than 10,000 caregivers across clinical and non-clinical areas. The approach succeeded because it mapped stakeholders by their actual impact on patient experience, not by their position in the hierarchy, and designed engagement that was specific, measurable, and embedded in daily clinical work.",
    ],
    lesson:
      "Cleveland Clinic showed that effective stakeholder mapping goes beyond plotting people on a power-interest grid. By redefining every person's identity in relation to the change, mapping engagement to specific team-level realities, and measuring progress at the granular level, they engaged tens of thousands of busy healthcare professionals without adding burden to an already-stretched workforce.",
    source: "https://theirf.org/research_post/engaged-in-what-part-5-cleveland-clinic-case-study/",
    sourceLabel: "Incentive Research Foundation",
  },
  {
    label: "General Motors",
    headline: "General Motors used organisational network analysis to identify hidden influencers and accelerate cultural transformation across 160,000 employees",
    hook: "They stopped looking at the org chart. They started mapping who people actually listened to. That changed everything.",
    dimension: "Informal Influencers",
    body: [
      "When General Motors set out to transform its culture in the mid-2010s, Chief Talent Officer Michael Arena faced a fundamental challenge: how do you change the culture of an organisation with 160,000 employees spread across manufacturing plants, engineering centres, and corporate offices worldwide? Traditional top-down communication had failed repeatedly. Arena, working with researcher Rob Cross, turned to organisational network analysis to find a different path.",
      "Using network analysis techniques, Arena's team mapped the informal influence networks across GM. They were not looking at the organisation chart. They were looking at who people actually went to for advice, who bridged disconnected groups, and who energised others in conversations about the company's future. The analysis revealed that the most influential people in the network were often not the most senior. They were the connectors, the brokers who bridged different teams, and the energisers whose enthusiasm was contagious.",
      "GM identified these hidden influencers and brought them into the transformation process early. Rather than asking them to cascade messages from leadership, Arena gave them genuine roles: they were invited to help design new ways of working, to pilot initiatives in their areas, and to provide unfiltered feedback directly to the transformation team. The approach was described by Arena as creating 'adaptive space', the conditions in which ideas could flow between the formal hierarchy and the informal network.",
      "The results were striking. Change initiatives that engaged network influencers spread four times faster than those that relied solely on formal communication channels. Adoption rates in teams connected to activated influencers were significantly higher than in control groups. GM's experience validated what the research had suggested: informal influence networks are the hidden infrastructure of organisational change, and leaders who learn to see and activate them gain a decisive advantage.",
    ],
    lesson:
      "General Motors demonstrated that the most powerful lever for cultural change is not the executive communication plan. It is the informal influence network that exists beneath the organisation chart. By using network analysis to identify connectors, brokers, and energisers, and by giving those people genuine roles in the transformation, GM accelerated adoption in ways that formal authority alone could never achieve.",
    source: "https://www.robcross.org/drive-organizational-change-through-network-influencers/",
    sourceLabel: "Rob Cross Research",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 4, Building a Change Champion Network                       */
/* ------------------------------------------------------------------ */

const championNetworkActions: ActionItem[] = [
  {
    text: "Understand what a champion network is and why it matters",
    detail:
      "A change champion network is a formally recruited group of people from across the organisation who are given an explicit role in supporting the adoption of a change. Champions are not the same as informal influencers. Influencers are identified because of their existing social capital and engaged through relationships. Champions are selected, briefed, equipped, and given ongoing responsibilities. They serve as the connective tissue between the central change team and the rest of the organisation. They translate corporate messaging into local context, surface resistance before it hardens, and model new behaviours in their teams. Without a champion network, the change team is trying to reach hundreds or thousands of people through a handful of communications. With one, you have a distributed sensing and support system embedded in every part of the organisation that matters.",
  },
  {
    text: "Design the network with intention: selection criteria, coverage, commitment, and reporting",
    detail:
      "A champion network fails when it is assembled hastily from whoever volunteers. Design it deliberately. Start with selection criteria: champions should be respected by their peers, open to the change (though not necessarily enthusiastic), and willing to invest time. They do not need to be managers, but they need credibility in their local context. Next, map coverage: ensure every geography, function, and level that the change touches has at least one champion. Gaps in coverage become blind spots where resistance grows unseen. Be explicit about the time commitment. Champions typically need two to four hours per week during peak change periods. If you do not protect that time with their line manager, the role becomes an unfunded mandate that collapses under workload pressure. Finally, define the reporting line: champions should report into the change team, not their local management chain, to ensure they can share honest feedback without fear of local consequences.",
  },
  {
    text: "Equip champions so they can succeed: briefings, materials, access, and recognition",
    detail:
      "Recruiting champions and then leaving them to figure out their role is the fastest way to kill the network. Equip them properly. Hold regular briefings, ideally fortnightly, where the change team shares upcoming milestones, anticipated concerns, and key messages. Provide materials they can use in their teams: not polished corporate slides, but practical talking points, FAQs, and one-page summaries written in plain language. Give champions direct access to the change team so they can ask questions and escalate issues without going through layers of hierarchy. And recognise their contribution visibly. Champions are doing extra work on top of their day job. If leadership never acknowledges that, the best champions will quietly step back. Recognition can be as simple as a senior leader thanking champions by name in a town hall, or as structured as including champion contributions in performance reviews.",
  },
  {
    text: "Keep the network active: check-ins, feedback loops, and celebrating contributions",
    detail:
      "Champion networks have a half-life. Without deliberate maintenance, energy declines after the first few weeks. Keep the network alive through regular check-ins where champions share what they are hearing, what is working, and what is not. Make these sessions genuinely two-way: if champions feel they are just being talked at, they stop attending. Create a feedback loop where the intelligence champions provide visibly influences the change approach. When a champion reports that a particular team is struggling, and the change team responds by adjusting the rollout plan, that demonstrates that the network has real impact. Celebrate contributions regularly. Share specific stories of how individual champions made a difference. Create a community identity for the network with a name, a communication channel, and periodic events that bring champions together. The network should feel like a valued community, not a task force.",
  },
  {
    text: "Avoid the common mistakes that undermine champion networks",
    detail:
      "Five mistakes kill most champion networks. First, over-relying on volunteers. Volunteers are enthusiastic but may not have the credibility or coverage you need. Supplement volunteers with deliberately recruited champions from underrepresented areas. Second, not protecting their time. If a champion's manager does not know about the role or does not support it, the champion will deprioritise it the moment workload increases. Get explicit line manager agreement before someone becomes a champion. Third, treating champions as a communication channel. If all you do is ask champions to cascade messages, you are using them as a distribution list, not a network. Champions should be listening, sensing, supporting, and feeding back, not just broadcasting. Fourth, failing to refresh the network. As the change progresses, some champions will lose energy or move roles. Plan for rotation and recruitment of new champions at regular intervals. Fifth, not closing the loop on feedback. If champions report issues and nothing visibly changes, they learn that the feedback mechanism is performative and stop contributing honest intelligence.",
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable expandable list component                                 */
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
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function StakeholderStrategy() {
  const [activeRing, setActiveRing] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  /* ---- Self-check items ---- */
  const checkItems = [
    { key: "individuals", label: "Our stakeholder map identifies specific individuals, not just roles or departments" },
    { key: "disposition", label: "We have honestly assessed each stakeholder's current disposition toward the change" },
    { key: "influence", label: "We have mapped informal influence networks, not just formal reporting lines" },
    { key: "concerns", label: "We know each key stakeholder's primary concern and have framed the change in those terms" },
    { key: "operational", label: "Our engagement approach for operational teams fits into their workflow, not around it" },
    { key: "capacity", label: "We have negotiated what stops or pauses to create capacity for change" },
    { key: "influencers", label: "We have identified the informal influencers and briefed them before the wider organisation" },
    { key: "roles", label: "Informal influencers have genuine roles in the change, not just information" },
    { key: "codesign", label: "Impact stakeholders have been involved in designing the change that affects them" },
    { key: "living", label: "Our stakeholder map is updated at least weekly and reflects current dispositions" },
    { key: "behaviour", label: "We measure engagement by behaviour change, not attendance or completion rates" },
    { key: "language", label: "Our communications use operational language, not change management jargon" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  /* ---- Concentric circle sizing ---- */
  const ringOrder = ["power", "influence", "impact"];

  return (
    <>
      <Nav />

      {/* ================================================================ */}
      {/*  HEADER                                                          */}
      {/* ================================================================ */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">
          &larr; Back to Knowledge Hub
        </Link>
        <ScrollReveal direction="up">
          <span className="article-label">Engagement &middot; Stakeholder Strategy</span>
          <h1 className="article-title">
            How to map, engage, and activate the people who determine whether change lands
          </h1>
          <p className="article-intro">
            Most stakeholder strategies fail because they treat engagement as communication. They produce a list of names, assign them to a grid, and then send the same message to everyone. Genuine stakeholder strategy is more demanding than that. It requires understanding who holds power, who holds influence, and whose daily work is actually changing. It means engaging operational teams who are too busy for another initiative, building a stakeholder map that drives differentiated action, and identifying the informal influencers whose reactions shape adoption more than any executive email ever will. This guide covers all three.
          </p>
        </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/*  BODY, sidebar layout                                           */}
      {/* ================================================================ */}
      <div className="article-with-sidebar">
        <div className="article-main">

          {/* -------------------------------------------------------------- */}
          {/*  INTERACTIVE STAKEHOLDER MAP                                    */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">The Stakeholder Map: Three Concentric Rings</h2>
              <p className="article-section-desc">
                A stakeholder map that actually drives engagement is organised around three dimensions: Power, Influence, and Impact. Each ring represents a different relationship to the change and requires a fundamentally different engagement approach. Click any ring to explore it.
              </p>
            </ScrollReveal>

            {/* Concentric circles visualisation */}
            <ScrollReveal direction="up" delay={100}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 0",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "min(100%, 420px)",
                    aspectRatio: "1",
                  }}
                >
                  {/* Outer ring, Power */}
                  <button
                    onClick={() => setActiveRing(activeRing === "power" ? null : "power")}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: activeRing === "power" ? "#0A1628" : "#0A1628CC",
                      border: activeRing === "power" ? "3px solid var(--gold)" : "2px solid rgba(255,255,255,0.15)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      paddingTop: "clamp(16px, 6%, 32px)",
                      transition: "all 0.3s ease",
                      color: "#fff",
                    }}
                    aria-label="Explore the Power ring"
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase" as const,
                        opacity: 0.7,
                      }}
                    >
                      01
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--head)",
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      POWER
                    </span>
                  </button>

                  {/* Middle ring, Influence */}
                  <button
                    onClick={() => setActiveRing(activeRing === "influence" ? null : "influence")}
                    style={{
                      position: "absolute",
                      top: "17%",
                      left: "17%",
                      width: "66%",
                      height: "66%",
                      borderRadius: "50%",
                      background: activeRing === "influence" ? "#B8860B" : "#B8860BCC",
                      border: activeRing === "influence" ? "3px solid #fff" : "2px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      paddingTop: "clamp(12px, 5%, 24px)",
                      transition: "all 0.3s ease",
                      color: "#fff",
                      zIndex: 1,
                    }}
                    aria-label="Explore the Influence ring"
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase" as const,
                        opacity: 0.7,
                      }}
                    >
                      02
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--head)",
                        fontSize: "clamp(13px, 2.2vw, 16px)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      INFLUENCE
                    </span>
                  </button>

                  {/* Inner ring, Impact */}
                  <button
                    onClick={() => setActiveRing(activeRing === "impact" ? null : "impact")}
                    style={{
                      position: "absolute",
                      top: "33%",
                      left: "33%",
                      width: "34%",
                      height: "34%",
                      borderRadius: "50%",
                      background: activeRing === "impact" ? "#2E6B4F" : "#2E6B4FCC",
                      border: activeRing === "impact" ? "3px solid var(--gold)" : "2px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      color: "#fff",
                      zIndex: 2,
                    }}
                    aria-label="Explore the Impact ring"
                  >
                    <span
                      style={{
                        fontFamily: "var(--ui)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase" as const,
                        opacity: 0.7,
                      }}
                    >
                      03
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--head)",
                        fontSize: "clamp(12px, 2vw, 15px)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      IMPACT
                    </span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Ring detail panel */}
            {activeRing && (
              <section className="article-section dimension-detail" style={{ marginTop: 0 }}>
                {stakeholderRings
                  .filter((r) => r.id === activeRing)
                  .map((r) => (
                    <div key={r.id}>
                      <ScrollReveal direction="up">
                        <div className="detail-header">
                          <span className="dimension-num-lg">{r.num}</span>
                          <h2 className="detail-title">{r.name}</h2>
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--ui)",
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase" as const,
                            color: "var(--gold)",
                            marginBottom: "16px",
                          }}
                        >
                          {r.tagline}
                        </p>
                        <p className="detail-body">{r.description}</p>
                      </ScrollReveal>

                      <ScrollReveal direction="up" delay={100}>
                        <div className="detail-block" style={{ borderLeft: "3px solid var(--gold)" }}>
                          <h3 className="detail-block-title">Who Belongs in This Ring</h3>
                          <ul style={{ margin: 0, paddingLeft: "20px" }}>
                            {r.who.map((w, i) => (
                              <li key={i} className="detail-body" style={{ marginBottom: "6px" }}>
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal direction="up" delay={200}>
                        <div className="detail-block">
                          <h3 className="detail-block-title">Engagement Approach</h3>
                          <p className="detail-body" style={{ marginBottom: 0 }}>
                            {r.engagement}
                          </p>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal direction="up" delay={300}>
                        <div className="detail-block detail-block-warning">
                          <h3 className="detail-block-title">The Pitfall</h3>
                          <p className="detail-body" style={{ marginBottom: 0 }}>
                            {r.pitfall}
                          </p>
                        </div>
                      </ScrollReveal>
                    </div>
                  ))}
              </section>
            )}
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 1, Engaging busy operational teams                      */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                How to Engage Operational Teams Who Are Too Busy for Another Initiative
              </h2>
              <p className="article-section-desc">
                Operational teams are the backbone of every organisation. They run production lines, serve customers, manage systems, and deliver the work that keeps the business functioning. They are also, almost universally, at or beyond capacity. When a change programme asks for their time and attention, it is competing with every other demand on their already-full day. The standard approach of workshops, communications, and training sessions does not work for these teams. What works is engagement that respects their reality, fits into their workflow, and gives them a genuine voice. Click any point to explore it in depth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Practical Approaches</h3>
                <ExpandableList items={busyTeamsActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 2, Building a stakeholder map that drives engagement    */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                How to Build a Stakeholder Map That Actually Drives Your Engagement Approach
              </h2>
              <p className="article-section-desc">
                Most stakeholder maps are completed once, filed in a project folder, and never looked at again. They contain a list of names plotted on a two-by-two grid of power and interest, and they produce a generic engagement plan that treats everyone in the same quadrant identically. A stakeholder map that drives genuine engagement is fundamentally different. It maps individuals, captures their specific concerns, charts the informal influence relationships between them, and produces a differentiated engagement approach for each person. It is a living tool, not a one-time deliverable.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Building the Map</h3>
                <ExpandableList items={stakeholderMapActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 3, Identifying and activating informal influencers      */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                How to Identify and Activate the Informal Influencers Who Shape Adoption
              </h2>
              <p className="article-section-desc">
                Every organisation has two structures: the formal hierarchy that appears on the organisation chart, and the informal network through which information, opinions, and trust actually flow. Change programmes that only engage the formal hierarchy miss the infrastructure that determines whether people adopt or resist. Informal influencers are the people whose opinions carry disproportionate weight, not because of their title but because of their relationships, their expertise, and the trust they have built over time. Finding them, engaging them authentically, and giving them a genuine role in the change is one of the highest-leverage activities in any stakeholder strategy.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Finding and Activating Influencers</h3>
                <ExpandableList items={influencerActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 4, Building a Change Champion Network                   */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Building a Change Champion Network
              </h2>
              <p className="article-section-desc">
                Informal influencers shape opinion. But a champion network gives you something different: a formally recruited, deliberately designed, and actively maintained group of people who bridge the gap between the change team and the organisation. Champions are not volunteers who happen to be enthusiastic. They are selected, equipped, and supported to play a defined role throughout the life of the change. When built well, a champion network is the single most effective mechanism for scaling engagement, surfacing resistance early, and sustaining adoption after the programme team has moved on.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Building a Change Champion Network</h3>
                <ExpandableList items={championNetworkActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  SELF-CHECK                                                     */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Stakeholder Strategy Self-Check</h2>
              <p className="article-section-desc">
                Use this checklist to assess whether your stakeholder strategy has the depth to drive genuine engagement across all three dimensions: power, influence, and impact. Be honest. A partial score is more useful than a perfect one.
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
                        &mdash; Your stakeholder strategy is comprehensive and differentiated. Maintain the discipline of keeping it current.
                      </span>
                    )}
                    {checkedCount >= 9 && checkedCount < checkItems.length && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Strong foundation. Close the remaining gaps to move from good to exceptional.
                      </span>
                    )}
                    {checkedCount >= 6 && checkedCount < 9 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Solid start but key dimensions are missing. Focus on the informal influence network and operational team engagement.
                      </span>
                    )}
                    {checkedCount >= 3 && checkedCount < 6 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Your strategy is likely focused on formal stakeholders. The informal and impact dimensions need significant attention.
                      </span>
                    )}
                    {checkedCount > 0 && checkedCount < 3 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Your stakeholder approach is at an early stage. Use the three-ring model above to build a more comprehensive strategy.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  CTA                                                            */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section article-cta">
            <ScrollReveal direction="up">
              <p className="article-cta-text">
                This topic is part of <strong>Engagement</strong>, the second pillar of the TCA Change Model.
              </p>
              <Link href="/knowledge" className="btn">
                Explore the Full Model
              </Link>
            </ScrollReveal>
          </section>
        </div>

        {/* ================================================================ */}
        {/*  SIDEBAR                                                         */}
        {/* ================================================================ */}
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

      {/* ================================================================ */}
      {/*  CASE STUDY MODAL                                                */}
      {/* ================================================================ */}
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
