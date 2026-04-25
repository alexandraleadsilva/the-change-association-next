"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ActionItem {
  text: string;
  detail: string;
}

/* ------------------------------------------------------------------ */
/*  TOPIC 1 – BUILDING A COMMUNICATION PLAN THAT DOES MORE THAN INFORM */
/* ------------------------------------------------------------------ */

const planElements = [
  {
    id: "purpose",
    num: "01",
    name: "Define the Purpose Beyond Informing",
    summary: "Most communication plans start with 'what do people need to know?' The better question is 'what do people need to do, feel, and believe?'",
    items: [
      { text: "Shift from awareness objectives to behaviour objectives", detail: "Awareness is the lowest bar a communication plan can set. When your objective is 'ensure all employees are aware of the new process', you are planning for information transfer, not for change. Rewrite every communication objective to describe a behaviour or a decision. Instead of 'inform the sales team about the new CRM', write 'enable the sales team to log customer interactions in the new CRM within five business days of go-live'. This forces the plan to design for action, not just delivery." },
      { text: "Map the emotional journey, not just the information journey", detail: "People moving through change experience a predictable emotional arc: from uncertainty to anxiety to cautious engagement to confidence. Your communication plan needs to map to this emotional reality. Early communications should acknowledge uncertainty and validate concerns. Mid-journey communications should build confidence through evidence and stories. Late-stage communications should celebrate progress and reinforce new behaviours. If your plan only addresses what people need to know, it misses what people need to feel." },
      { text: "Design for dialogue, not broadcast", detail: "A communication plan built entirely around one-way channels (emails, town halls, intranet posts) is a broadcast plan, not a change communication plan. Every significant communication moment should include a mechanism for response: a facilitated discussion, a feedback loop, a Q&A session, or a manager-led team conversation. When people can ask questions and hear honest answers, they process the change. When they can only receive information, they accumulate anxiety." },
      { text: "Define what silence communicates", detail: "Your communication plan has gaps. Every plan does. The question is whether those gaps are intentional or accidental. Silence during change is never neutral. It is interpreted as bad news, indifference, or incompetence. For every period where no formal communication is planned, your plan should state what is happening behind the scenes and how you will signal that the change is still on track. A holding message is always better than silence." },
    ] as ActionItem[],
  },
  {
    id: "audience",
    num: "02",
    name: "Segment Your Audience by Impact, Not by Org Chart",
    summary: "Standard communication plans segment by department or level. Effective plans segment by how much the change affects people and what they need to do differently.",
    items: [
      { text: "Create impact-based audience segments", detail: "The org chart is a poor proxy for communication needs. A senior director in a function that is barely affected by the change needs less communication than a team leader whose entire process is being redesigned. Segment your audience into groups based on the degree of change they experience: high impact (role, process, or tools fundamentally change), moderate impact (some aspects of work change), low impact (mostly aware, minimally affected), and influencers (people whose opinion shapes how others interpret the change, regardless of their own level of impact)." },
      { text: "Tailor messages to each segment's primary concern", detail: "High-impact groups are asking 'what happens to my job?' Moderate-impact groups are asking 'how much of my work changes?' Low-impact groups are asking 'does this affect me at all?' Influencers are asking 'should I support this or resist it?' A single message sent to all four groups will answer one question well and three badly. Write segment-specific messages that address the primary concern first, then layer in the broader context." },
      { text: "Identify the informal network, not just the formal hierarchy", detail: "In every organisation, there are people whose opinions carry disproportionate weight. They are not always senior. They are the person everyone asks before they form their own view. Your communication plan should identify these informal influencers and engage them early, directly, and honestly. If they understand and support the change, they amplify your message more effectively than any email campaign. If they are sceptical, they undermine it faster than any resistance group." },
      { text: "Plan for managers as translators, not relay stations", detail: "Cascade communication fails when managers are expected to simply pass on a message they received an hour ago. Managers need to be briefed before the wider communication, given context they can use to answer questions, and supported with a conversation guide rather than a script. The most effective communication plans treat managers as the primary communication channel for their teams and invest in equipping them accordingly." },
    ] as ActionItem[],
  },
  {
    id: "channels",
    num: "03",
    name: "Choose Channels for Understanding, Not Just Reach",
    summary: "Email reaches everyone. It changes no one. The channel you choose determines whether people receive information or process it.",
    items: [
      { text: "Match channel richness to message complexity", detail: "Simple, factual updates (dates, logistics, resources) can travel through lean channels: email, intranet, messaging platforms. Complex messages that require interpretation, emotional processing, or behaviour change need rich channels: face-to-face conversations, facilitated workshops, manager-led team sessions, or interactive webinars. The most common mistake in change communication is sending complex messages through lean channels because it is faster. Speed of delivery is meaningless if the message is not understood." },
      { text: "Use multiple channels in sequence, not simultaneously", detail: "The impulse is to blast the same message through every channel at once for maximum reach. This creates noise, not understanding. Design a sequenced approach: the sponsor delivers the message in person or via video to set the tone, managers then facilitate team conversations to translate the message, an email follows as a reference document, and the intranet hosts a detailed FAQ for ongoing questions. Each channel serves a different purpose in the same communication moment." },
      { text: "Create spaces for questions people will not ask publicly", detail: "Town halls and all-hands meetings are useful for signalling leadership commitment. They are terrible for honest questions. People will not ask about job security, personal impact, or leadership competence in front of 500 colleagues. Your plan needs private or small-group channels where vulnerable questions can be asked safely: anonymous Q&A tools, manager one-to-ones, dedicated Slack channels with moderators, or drop-in sessions with change leads." },
      { text: "Measure engagement, not distribution", detail: "Most communication plans track distribution metrics: emails sent, town hall attendance, intranet page views. These tell you nothing about whether people understood the message, believe it, or know what to do next. Measure engagement: what questions are being asked? Can people describe the change in their own words? Do managers feel equipped to support their teams? Are people taking the actions the communication was designed to enable? If your only metric is 'message delivered', you are measuring the plan, not the change." },
    ] as ActionItem[],
  },
  {
    id: "feedback",
    num: "04",
    name: "Build Feedback Loops That Actually Inform Decisions",
    summary: "A communication plan without feedback loops is a broadcast schedule. Feedback is how you know whether the plan is working and what needs to change.",
    items: [
      { text: "Distinguish between sentiment data and decision-useful data", detail: "Pulse surveys that ask 'how do you feel about the change on a scale of 1 to 5?' produce sentiment data. It tells you the temperature but not the diagnosis. Decision-useful feedback tells you specifically what people do not understand, what concerns are unaddressed, and where the communication has failed to land. Design feedback mechanisms that ask specific questions: 'Can you describe what is changing for your role?' 'What is your biggest unanswered question?' 'What would help you feel more prepared?' These answers tell you exactly what to communicate next." },
      { text: "Close the feedback loop visibly", detail: "The fastest way to kill honest feedback is to ask for it and then do nothing visible with it. Every feedback mechanism in your communication plan should have a corresponding action: 'You told us X, so we are doing Y.' This does not mean acting on every piece of feedback. It means acknowledging what you heard and explaining what you did or did not change and why. Closing the loop publicly builds trust and encourages more honest feedback in the next round." },
      { text: "Use managers as a real-time feedback channel", detail: "Managers hear things that surveys never capture: the break room conversations, the side-channel messages, the quiet disengagement. Your plan should include regular, structured check-ins with managers specifically about what they are hearing from their teams. Not a formal report, but a brief conversation: what questions are coming up? What concerns are you hearing? What are people confused about? This gives the change team real-time intelligence that no survey can match." },
      { text: "Adjust the plan based on what you learn, not just what you planned", detail: "The most common failure in communication planning is rigidity. The plan was written three months ago, so the plan is followed regardless of what has changed. Build explicit review points into your plan: after every major communication moment, assess what landed, what did not, and what needs to change. A communication plan that never changes is a plan that stopped listening." },
    ] as ActionItem[],
  },
];

/* ------------------------------------------------------------------ */
/*  TOPIC 2 – COMMUNICATION TIMING                                     */
/* ------------------------------------------------------------------ */

interface TimingMoment {
  id: string;
  phase: string;
  moment: string;
  when: string;
  what: string;
  who: string;
  channel: string;
  risk: string;
  colour: string;
}

const timingMoments: TimingMoment[] = [
  {
    id: "pre-announcement",
    phase: "Pre-Announcement",
    moment: "Leadership alignment and preparation",
    when: "4 to 6 weeks before the change is announced to the wider organisation",
    what: "Brief the senior leadership team on the change rationale, expected impact, timeline, and their specific role in the communication. Align on the narrative: what is changing, why, and what success looks like. Give leaders time to process their own reactions before asking them to support others.",
    who: "Executive sponsor, senior leadership team, HR business partners, and communication leads. This is a small, closed group. The goal is alignment, not broad awareness.",
    channel: "In-person or video leadership meetings, followed by a written summary for reference. Do not use email for the initial brief. The message needs to be discussed, questioned, and refined before it is documented.",
    risk: "If leadership hears about the change at the same time as everyone else, they cannot answer questions, they appear uninformed, and they lose credibility. If alignment is not achieved at this stage, mixed messages will cascade through the organisation from day one.",
    colour: "#0A1628",
  },
  {
    id: "manager-briefing",
    phase: "Manager Briefing",
    moment: "Equipping managers to translate and support",
    when: "1 to 2 weeks before the wider announcement. Managers must have time to process the change themselves before being expected to support their teams.",
    what: "Provide managers with the full context: the strategic rationale, the specific impact on their teams, a conversation guide for team discussions, answers to anticipated questions, and clarity on what is known and what is still being decided. Acknowledge that they may have concerns of their own.",
    who: "People managers at all levels whose teams will be affected. Include team leaders and supervisors, not just directors and heads of function. The closer a manager is to the frontline, the more they need this briefing.",
    channel: "Interactive workshops or facilitated sessions where managers can ask questions and practise the conversation. Not a webinar where they watch a presentation. They need to rehearse, not just receive.",
    risk: "If managers are not briefed before the wider organisation, they will be asked questions they cannot answer. They will either improvise (creating inconsistency) or deflect (creating distrust). Uninformed managers are the single most common cause of communication breakdown during change.",
    colour: "#2E6B4F",
  },
  {
    id: "initial-announcement",
    phase: "Initial Announcement",
    moment: "The first time the wider organisation hears about the change",
    when: "A single, coordinated moment. Not staggered across days or weeks. Everyone who is affected should hear the same message at the same time, through the same channel.",
    what: "Communicate the why (the case for change in human terms), the what (what is specifically changing), the who (who is affected and how), the timeline (what happens next and when), and the support (how people will be helped through the transition). Be honest about what is not yet decided.",
    who: "All employees affected by the change, delivered by the executive sponsor in person or via live broadcast. Not delegated to middle management or sent as an email.",
    channel: "A live, leader-led event (town hall, all-hands, or live video) followed immediately by a written summary, FAQ document, and information about how to ask questions. The live event creates the emotional tone. The written material provides the reference.",
    risk: "If the announcement leaks before the planned moment, you lose control of the narrative. If the announcement is too vague, people will fill the gap with worst-case assumptions. If it is too corporate, people will not feel seen. If the sponsor does not deliver it personally, people will question how important it really is.",
    colour: "#B8860B",
  },
  {
    id: "first-week",
    phase: "First Week Response",
    moment: "Processing, questions, and initial reactions",
    when: "The three to five business days immediately following the initial announcement. This is the highest-anxiety window.",
    what: "Manager-led team conversations to translate the announcement into specific implications for each group. Open Q&A sessions for broader questions. Published FAQ that is updated daily based on questions received. A visible feedback channel so people know they can be heard.",
    who: "Managers lead conversations with their direct teams. Change leads and HR business partners run drop-in sessions. The executive sponsor publishes a follow-up message acknowledging the questions and themes they are hearing.",
    channel: "Small-group team meetings (not email), open Q&A sessions (virtual or in-person), anonymous question tools, and a visible response channel where answers are published. The key is two-way communication in small, safe settings.",
    risk: "If the first week is silent after the announcement, anxiety escalates rapidly. People assume the worst. Rumours fill the vacuum. Silence in the first week is interpreted as either incompetence or indifference. The communication plan must be most active in the days immediately following the announcement, not before it.",
    colour: "#6B7280",
  },
  {
    id: "ongoing-updates",
    phase: "Regular Cadence",
    moment: "Sustained communication through the transition",
    when: "Weekly or fortnightly updates throughout the active change period. The cadence should be predictable so people know when to expect information.",
    what: "Progress updates that are honest about what is on track and what is not. Decisions that have been made since the last update. Questions that have been answered. Stories from teams who are making the transition. Upcoming milestones and what people should expect. Continued acknowledgement of what is difficult.",
    who: "A combination of the change team (for operational updates), the executive sponsor (for strategic reinforcement at key moments), and peers (for stories and social proof). Rotating the voice keeps the communication fresh and credible.",
    channel: "A predictable, consistent channel: a weekly email or newsletter, a dedicated Teams or Slack channel, a brief video update, or a combination. The format matters less than the consistency. People need to know where to find information and when to expect it.",
    risk: "If updates stop or become irregular, people assume the change has stalled or that leadership has lost interest. If updates only contain good news, people lose trust. If updates are too long or too corporate, people stop reading. The ongoing cadence is the hardest part of the plan to sustain, and it is the part that matters most for maintaining trust.",
    colour: "#0A1628",
  },
  {
    id: "milestone-moments",
    phase: "Milestone Moments",
    moment: "Key decision points, go-lives, and transitions",
    when: "At every significant milestone: pilot launches, go-live dates, structural changes, role transitions, system switches. These are high-anxiety moments that require dedicated communication.",
    what: "Specific, practical information about what is happening, when, and what people need to do. Acknowledgement that milestones can be stressful. Clear support information: who to contact, where to find help, what to do if something goes wrong. A realistic assessment of what to expect in the first days and weeks.",
    who: "The people directly affected by the milestone, communicated to by both the change team (for logistics) and their manager (for support and context). The executive sponsor should be visible at the most significant milestones.",
    channel: "Direct, personal communication for high-impact groups. Practical guides and reference materials. Dedicated support channels (help desks, floor walkers, chat support). Milestone moments need the richest channels and the most accessible support.",
    risk: "If milestone communication is too late, people are unprepared. If it is too early, the details may change and trust erodes. If it focuses only on logistics and ignores the emotional reality, people feel processed rather than supported. Every major milestone should be communicated with the same care as the initial announcement.",
    colour: "#2E6B4F",
  },
  {
    id: "post-change",
    phase: "Post-Change Reinforcement",
    moment: "Embedding the new way of working",
    when: "The three to six months after the primary change has been implemented. This is when most communication plans end, and it is exactly when they should not.",
    what: "Recognition of what people have achieved. Honest assessment of what is working and what needs adjustment. Stories from teams who have successfully transitioned. Continued support information. Connection between the change and measurable outcomes. Acknowledgement of what was lost and what has been gained.",
    who: "The executive sponsor (for strategic reinforcement and recognition), managers (for ongoing team-level support), and peers (for social proof and shared learning). The change team should be transitioning ownership of communication to the business at this stage.",
    channel: "Integration into existing business communication channels rather than separate change channels. The goal is for the change to become part of normal business conversation, not a separate program with its own newsletter. Leadership meetings, team stand-ups, and performance conversations should reference the change naturally.",
    risk: "If communication stops abruptly after go-live, people interpret the silence as 'the project is done, we are on our own now'. If the post-change period is not supported, reversion to old behaviours accelerates. The organisation quietly drifts back to the way things were, not because people resist the change but because the reinforcement stopped.",
    colour: "#B8860B",
  },
];

const timingFailures = [
  {
    id: "too-early",
    name: "Communicating too early",
    consequence: "When you communicate before decisions are made, the details inevitably change. Each revision erodes trust. People start to discount future communications because experience has taught them that the information is unreliable. Early communication feels transparent in theory but creates confusion in practice when the message keeps shifting.",
    items: [
      { text: "The credibility tax of changing your message", detail: "Every time you revise a previously communicated decision, you pay a credibility tax. People remember that you told them one thing and then changed it. Even if the revision is an improvement, the perception is inconsistency. After two or three revisions, people stop believing new information until they see it happen. This is not cynicism. It is a rational response to unreliable communication." },
      { text: "Premature specificity creates premature anxiety", detail: "Sharing specific details (restructured teams, new reporting lines, changed roles) before those details are final forces people to react to a scenario that may not happen. They begin grieving a loss that has not occurred, resisting a change that may not materialise, or planning around information that will change. The anxiety is real even if the information is not final." },
      { text: "When early communication is appropriate", detail: "Early communication works when it is clearly framed as directional, not definitive. Saying 'we are exploring a change to how our supply chain operates and we will share specifics as decisions are made' is honest and useful. Saying 'we are restructuring the supply chain team and moving to a shared service model' when the decision has not been finalised is premature and damaging." },
    ] as ActionItem[],
  },
  {
    id: "too-late",
    name: "Communicating too late",
    consequence: "When you communicate after people have already heard through informal channels, you lose control of the narrative. The rumour mill is faster than any communication plan. People who learn about a change through gossip rather than official channels feel disrespected, and the emotional response to feeling disrespected is far harder to manage than the response to the change itself.",
    items: [
      { text: "The rumour mill fills every vacuum", detail: "In the absence of official communication, people create their own narrative. They share fragments of information, speculate about implications, and anchor on worst-case scenarios. By the time the official communication arrives, it is competing with an established narrative that people have already emotionally processed. You are not informing people. You are trying to correct an existing belief, which is exponentially harder." },
      { text: "Late communication signals that people were not a priority", detail: "When employees learn about a change that affects their jobs from a news article, a leaked email, or a colleague in a different department, the message they receive is not about the change. The message is: you were not important enough to tell first. This perception of disrespect produces anger and disengagement that is disproportionate to the change itself. People can forgive difficult news. They struggle to forgive being the last to know." },
      { text: "The compounding cost of playing catch-up", detail: "Once you are behind the narrative, every subsequent communication is reactive. You are answering questions you should have anticipated, correcting misinformation you could have prevented, and managing emotions you could have prepared people for. The change team spends its time on damage control rather than building understanding. Late communication does not just delay the plan. It fundamentally changes the nature of every communication that follows." },
    ] as ActionItem[],
  },
  {
    id: "wrong-sequence",
    name: "Communicating in the wrong sequence",
    consequence: "When frontline staff hear about a change before their managers do, the organisational hierarchy of trust is broken. When external stakeholders learn before internal ones, employees feel betrayed. Sequence communicates respect. Getting it wrong damages relationships that take months to rebuild.",
    items: [
      { text: "When managers learn at the same time as their teams", detail: "If a manager sits in a town hall and hears about a major change at the same moment as their team, they cannot answer questions, they cannot offer reassurance, and they cannot demonstrate the calm competence that their team needs. They are visibly caught off guard. Their authority is undermined, and their team's confidence in them drops. Every subsequent conversation between that manager and their team starts from a deficit." },
      { text: "When external audiences know before internal ones", detail: "Nothing damages employee trust faster than learning about their own company's change from a newspaper, a client, or a social media post. The implicit message is that external perception mattered more than internal trust. Even if the external communication was unintentional, the impact is the same. Employees feel like the last people the organisation thought to inform." },
      { text: "The correct sequence for change communication", detail: "The sequence should follow impact and influence: executive sponsor and senior leadership first (to align), then managers (to equip), then directly affected employees (to inform and support), then the broader organisation (for context), and finally external stakeholders. Each group needs time to process before the next group is informed. Compressing the sequence to save time creates problems that cost far more time to fix." },
    ] as ActionItem[],
  },
  {
    id: "wrong-tone",
    name: "Getting the tone wrong",
    consequence: "When the tone of a communication does not match the emotional reality of the audience, people feel unseen. Overly positive messaging during a painful restructuring feels dismissive. Overly corporate language during a deeply personal change feels cold. Tone is not about word choice. It is about whether people feel that the communicator understands their experience.",
    items: [
      { text: "Toxic positivity in change communication", detail: "Messages like 'this is an exciting opportunity for growth' or 'we are building something amazing together' ring hollow when people are worried about their jobs, losing colleagues, or facing months of uncertainty. Positivity is appropriate when it is earned and specific. Generic enthusiasm during genuine difficulty is not inspiring. It is dismissive. It tells people that leadership either does not understand or does not care about what they are going through." },
      { text: "Corporate distance in personal moments", detail: "When someone's role is being eliminated, their team is being restructured, or their daily work is fundamentally changing, a corporate-toned email is the worst possible channel and register. Personal impact requires personal communication. The tone should be human, specific, and empathetic. It should acknowledge difficulty, offer specific support, and demonstrate that the person behind the communication understands the weight of what is being asked." },
      { text: "How to calibrate tone to context", detail: "Before drafting any significant change communication, ask: if I were receiving this message and it affected my job, how would I want to be spoken to? Read the draft from the perspective of the most affected person, not the least affected. If the tone feels appropriate for someone whose role is unchanged, it is almost certainly wrong for someone whose role is being eliminated. Write for the person with the most to lose, then adjust for the broader audience." },
    ] as ActionItem[],
  },
];

/* ------------------------------------------------------------------ */
/*  CASE STUDIES                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "GE",
    headline: "Jeff Immelt's strategy announcement that employees learned about from CNBC",
    hook: "When your own workforce learns about their future from a cable news ticker, no internal memo can undo the damage.",
    dimension: "Timing Failure",
    body: [
      "In 2017, General Electric announced a sweeping restructuring under CEO John Flannery, who had just succeeded Jeff Immelt. The plan involved divesting major business units, cutting over 12,000 jobs, and fundamentally reshaping the company's portfolio. The problem was not the strategy. It was the communication sequence.",
      "Details of the restructuring were shared with analysts and financial media before many GE employees understood what was happening to their divisions. Workers in the affected units learned about potential divestitures and layoffs from news coverage and analyst reports rather than from their own leadership. The information was technically public, but the emotional experience of learning about your job's future from CNBC rather than your manager created a deep breach of trust.",
      "The internal communication that followed was corporate and defensive. It explained the strategic rationale in financial terms but failed to address the human reality: people were scared, angry, and felt disposable. The tone was calibrated for shareholders, not for the workforce that needed to execute the transformation.",
      "GE's share price continued to decline. Employee engagement plummeted. Key talent left voluntarily. The restructuring that was designed to save the company became associated with a leadership team that prioritised Wall Street over its own people. By 2018, GE was removed from the Dow Jones Industrial Average after more than a century of inclusion.",
    ],
    lesson: "GE's communication failure was not about content. The strategy was defensible. It was about sequence and audience priority. When employees learn about their future from external sources, the internal narrative is already dead. No amount of subsequent communication can rebuild the trust that was lost by communicating outward before communicating inward.",
    source: "https://www.reuters.com/article/world/ge-to-cut-12000-jobs-in-power-business-restructuring-idUSKBN1E10DM/",
    sourceLabel: "Reuters",
  },
  {
    label: "Target",
    headline: "Target's failed expansion into Canada: when communication skipped the people who mattered most",
    hook: "They opened 124 stores in two years. They closed all of them in two more. Frontline staff were the last to know at every stage.",
    dimension: "Sequence Failure",
    body: [
      "In 2013, Target opened 124 stores across Canada in a single year, the most ambitious international retail expansion in Canadian history. By 2015, every single store was closed, 17,600 employees were laid off, and the company wrote off $5.4 billion. The failure was multi-dimensional, but communication played a central and devastating role.",
      "Target's communication during the expansion was relentlessly optimistic, directed almost entirely at investors, media, and Canadian consumers. Internal communication to frontline store employees was minimal and reactive. Staff were hired rapidly, trained minimally, and given almost no context about the supply chain problems, inventory systems failures, and pricing issues that plagued the launch from day one.",
      "When stores opened with empty shelves, incorrect pricing, and disappointed customers, frontline employees had no narrative to fall back on. They had not been told about the challenges. They could not explain to customers why the Canadian experience was nothing like the American one. They were left exposed, visibly struggling, with no communication from leadership that acknowledged the reality they were living.",
      "When the decision to close all Canadian operations was made in January 2015, many employees learned about it from news reports before they heard from their own managers. The closure announcement was handled through a corporate press release. The human cost of 17,600 lost jobs was communicated in the language of quarterly earnings.",
    ],
    lesson: "Target's Canadian failure illustrates what happens when communication is designed for external audiences and neglects internal ones at every stage. Frontline employees were the last to know during the launch, the last to understand during the struggles, and the last to learn during the closure. At no point did the communication plan prioritise the people who were living the change every day.",
    source: "https://www.canadianbusiness.com/ideas/the-last-days-of-target-canada/",
    sourceLabel: "Canadian Business",
  },
  {
    label: "NHS England",
    headline: "The NHS Long Term Plan: how sustained, multi-channel communication built public and staff support for transformation",
    hook: "They spent a year listening before they announced. Then they kept listening after.",
    dimension: "Timing Success",
    body: [
      "When NHS England developed its Long Term Plan in 2019, it faced an extraordinary communication challenge: how to communicate a fundamental transformation of the world's fifth-largest employer to 1.3 million staff, thousands of partner organisations, and 56 million patients, while maintaining trust and operational continuity.",
      "The approach was built on communication timing principles that stand in direct contrast to the typical corporate announcement. Before any formal plan was published, NHS England conducted over 200 engagement events across the country, involving patients, staff, local government, and community organisations. The listening phase lasted almost a year. The plan that emerged was shaped by what was heard, and the people who contributed could see their input reflected in the final document.",
      "When the plan was published in January 2019, the communication was sequenced carefully. NHS staff received briefings through their own leadership structures before the media launch. Local NHS organisations received tailored summaries showing what the plan meant for their area specifically. Patient groups received accessible versions in plain language. The communication was not one message blasted to everyone. It was the same story told in different languages for different audiences.",
      "Critically, the communication did not stop at the announcement. NHS England established ongoing channels for feedback, published regular implementation updates, and continued to engage local organisations in translating the national plan into local action. The communication plan was designed as a sustained conversation, not a one-time event.",
    ],
    lesson: "The NHS Long Term Plan demonstrates that the most effective communication timing is not about finding the perfect moment to announce. It is about building understanding over time through listening first, sequencing carefully, tailoring for each audience, and sustaining the conversation long after the announcement. The year of listening before the plan was published built the credibility that made the announcement land.",
    source: "https://www.longtermplan.nhs.uk/",
    sourceLabel: "NHS England",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPANDABLE COMPONENT                                               */
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
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function CommunicationPlanning() {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeTimingMoment, setActiveTimingMoment] = useState<string | null>(null);
  const [activeTimingFailure, setActiveTimingFailure] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "behaviour", label: "Our communication objectives describe behaviours and actions, not just awareness" },
    { key: "segments", label: "We have segmented audiences by impact level, not just by department or seniority" },
    { key: "managers", label: "Managers are briefed before the wider organisation and equipped to lead conversations" },
    { key: "sequence", label: "We have a defined communication sequence: leadership, then managers, then affected staff, then the broader organisation" },
    { key: "dialogue", label: "Every major communication moment includes a mechanism for two-way dialogue" },
    { key: "silence", label: "We have planned for what silence communicates during gaps in the schedule" },
    { key: "channels", label: "Channel choices match message complexity: rich channels for complex messages, lean channels for updates" },
    { key: "feedback", label: "We have feedback loops that produce decision-useful data, not just sentiment scores" },
    { key: "tone", label: "Communication tone has been tested against the perspective of the most affected person" },
    { key: "cadence", label: "We have a predictable ongoing cadence that people can rely on throughout the transition" },
    { key: "postchange", label: "The communication plan extends into the post-change period, not just up to go-live" },
    { key: "closedloop", label: "We visibly close feedback loops: people can see that their input influenced decisions" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Engagement &middot; Communication &amp; Narrative</span>
          <h1 className="article-title">How to build a change communication plan that does more than inform, and when to get the timing right</h1>
          <p className="article-intro">Most change communication plans are broadcast schedules disguised as engagement strategies. They list messages, channels, and dates. They ensure people are informed. Then they are surprised when informed people do not change. Effective change communication does more than inform. It builds understanding, creates space for dialogue, and enables action. And timing is not a logistical detail. It is a strategic decision that determines whether your message builds trust or destroys it.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ============================================================ */}
      {/*  TOPIC 1: BUILDING A COMMUNICATION PLAN                      */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Building a Communication Plan That Does More Than Inform</h2>
          <p className="article-section-desc">A communication plan that only delivers information is solving the wrong problem. The problem in most change programs is not that people lack information. It is that people lack understanding, confidence, and trust. These four elements transform a broadcast schedule into a genuine communication strategy.</p>
        </ScrollReveal>

        <div className="phase-list">
          {planElements.map((el, i) => (
            <ScrollReveal key={el.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeElement === el.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveElement(activeElement === el.id ? null : el.id)}
              >
                <span className="phase-card-pillar">{el.num}</span>
                <span className="phase-card-name">{el.name}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeElement && (
          <section className="dimension-detail" style={{ marginTop: "4px" }}>
            {planElements.filter(el => el.id === activeElement).map(el => (
              <div key={el.id}>
                <ScrollReveal direction="up">
                  <div className="detail-header">
                    <span className="dimension-num-lg">{el.num}</span>
                    <h2 className="detail-title">{el.name}</h2>
                  </div>
                  <p className="detail-body">{el.summary}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Practical Guidance</h3>
                    <ExpandableList items={el.items} />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </section>
        )}
      </section>

      {/* ============================================================ */}
      {/*  TOPIC 2: COMMUNICATION TIMING TOOL                          */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">When to Communicate: The Change Communication Timeline</h2>
          <p className="article-section-desc">Timing is not a scheduling decision. It is a trust decision. Every change journey has critical moments where communication must happen. Miss the moment, and trust erodes. Hit it too early with unconfirmed information, and credibility suffers. This timeline maps the key communication moments across a change journey. Click any moment to see what to communicate, to whom, and through which channel.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div style={{ position: "relative", padding: "24px 0 12px" }}>
            {/* Timeline track */}
            <div style={{ position: "absolute", left: "20px", top: "44px", bottom: "32px", width: "3px", background: "linear-gradient(to bottom, #0A1628, #B8860B, #2E6B4F, #6B7280, #0A1628, #2E6B4F, #B8860B)", borderRadius: "2px" }} />

            {timingMoments.map((tm, i) => (
              <div key={tm.id} style={{ position: "relative", paddingLeft: "52px", marginBottom: "8px" }}>
                {/* Node dot */}
                <div style={{
                  position: "absolute",
                  left: "12px",
                  top: "18px",
                  width: "19px",
                  height: "19px",
                  borderRadius: "50%",
                  background: activeTimingMoment === tm.id ? tm.colour : "var(--bg)",
                  border: `3px solid ${tm.colour}`,
                  zIndex: 1,
                  transition: "background 0.2s",
                }} />

                <button
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: activeTimingMoment === tm.id ? "var(--navy)" : "var(--bg)",
                    border: activeTimingMoment === tm.id ? "1px solid var(--gold)" : "1px solid var(--rule)",
                    borderRadius: "8px",
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    color: activeTimingMoment === tm.id ? "#fff" : "var(--fg)",
                  }}
                  onClick={() => setActiveTimingMoment(activeTimingMoment === tm.id ? null : tm.id)}
                >
                  <span style={{
                    display: "block",
                    fontFamily: "var(--ui)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: activeTimingMoment === tm.id ? "var(--gold)" : "var(--gold)",
                    marginBottom: "4px",
                  }}>{tm.phase}</span>
                  <span style={{
                    display: "block",
                    fontFamily: "var(--head)",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: 1.35,
                    marginBottom: "4px",
                  }}>{tm.moment}</span>
                  <span style={{
                    display: "block",
                    fontFamily: "var(--ui)",
                    fontSize: "12px",
                    opacity: 0.7,
                  }}>{tm.when}</span>
                </button>

                {activeTimingMoment === tm.id && (
                  <div style={{
                    margin: "8px 0 16px",
                    padding: "20px 24px",
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    borderLeft: `3px solid ${tm.colour}`,
                    borderRadius: "0 8px 8px 0",
                  }}>
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "6px" }}>What to Communicate</span>
                      <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{tm.what}</p>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "6px" }}>To Whom</span>
                      <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{tm.who}</p>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "6px" }}>Through Which Channel</span>
                      <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{tm.channel}</p>
                    </div>
                    <div style={{
                      padding: "14px 18px",
                      background: "rgba(184, 134, 11, 0.08)",
                      borderRadius: "6px",
                      borderLeft: "3px solid var(--gold)",
                    }}>
                      <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "6px" }}>What Happens If You Get This Wrong</span>
                      <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{tm.risk}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  TOPIC 2 CONTINUED: TIMING FAILURES                          */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">What Happens When You Get the Timing Wrong</h2>
          <p className="article-section-desc">Communication timing failures fall into four patterns. Each one damages trust in a different way, and each one is preventable. Click any pattern to understand the consequences and how to avoid them.</p>
        </ScrollReveal>

        <div className="phase-list">
          {timingFailures.map((tf, i) => (
            <ScrollReveal key={tf.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeTimingFailure === tf.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveTimingFailure(activeTimingFailure === tf.id ? null : tf.id)}
              >
                <span className="phase-card-pillar">Pattern {String(i + 1).padStart(2, "0")}</span>
                <span className="phase-card-name">{tf.name}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeTimingFailure && (
          <section className="dimension-detail" style={{ marginTop: "4px" }}>
            {timingFailures.filter(tf => tf.id === activeTimingFailure).map(tf => (
              <div key={tf.id}>
                <ScrollReveal direction="up">
                  <div className="detail-block detail-block-warning">
                    <h3 className="detail-block-title">The Consequence</h3>
                    <p className="detail-body" style={{ marginBottom: 0 }}>{tf.consequence}</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Understanding the Pattern</h3>
                    <ExpandableList items={tf.items} />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </section>
        )}
      </section>

      {/* ============================================================ */}
      {/*  SELF-CHECK CHECKLIST                                        */}
      {/* ============================================================ */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Communication Plan Ready?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your change communication plan is designed for understanding and action, not just information delivery.</p>
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
                  <span className="check-complete"> &mdash; Your communication plan is designed to drive understanding and action, not just awareness.</span>
                )}
                {checkedCount >= 9 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong plan. Close the remaining gaps before the next major communication moment.</span>
                )}
                {checkedCount >= 6 && checkedCount < 9 && (
                  <span className="check-partial"> &mdash; Good foundation but significant gaps remain. Focus on dialogue, feedback, and timing before going wider.</span>
                )}
                {checkedCount >= 3 && checkedCount < 6 && (
                  <span className="check-partial"> &mdash; Your plan is likely a broadcast schedule. Redesign for two-way communication and impact-based segmentation.</span>
                )}
                {checkedCount > 0 && checkedCount < 3 && (
                  <span className="check-partial"> &mdash; Your communication plan needs fundamental rethinking. Start with audience segmentation and dialogue design.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Engagement</strong>, the second pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* ============================================================ */}
      {/*  SIDEBAR – ENTERPRISE EXAMPLES                               */}
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
