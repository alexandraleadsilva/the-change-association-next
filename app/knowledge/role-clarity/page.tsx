"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type RoleKey = "hr" | "cm" | "pm" | "lm" | "ec";

interface RACIActivity {
  id: string;
  activity: string;
  summary: string;
  roles: Record<RoleKey, { level: "R" | "A" | "C" | "I"; guidance: string }>;
}

interface DecisionScenario {
  id: string;
  title: string;
  signal: string;
  recommendation: "internal" | "external" | "hybrid";
  reasoning: string;
  watchOuts: string;
}

interface RoleDefinitionItem {
  text: string;
  detail: string;
}

/* ------------------------------------------------------------------ */
/*  Role labels                                                        */
/* ------------------------------------------------------------------ */

const roleLabels: Record<RoleKey, string> = {
  hr: "HR",
  cm: "Change Manager",
  pm: "Project Manager",
  lm: "Line Manager",
  ec: "External Consultant",
};

const raciLabels: Record<string, string> = {
  R: "Responsible",
  A: "Accountable",
  C: "Consulted",
  I: "Informed",
};

/* ------------------------------------------------------------------ */
/*  RACI-style role clarity data                                       */
/* ------------------------------------------------------------------ */

const raciActivities: RACIActivity[] = [
  {
    id: "sponsor-comms",
    activity: "Sponsor Communication",
    summary: "Ensuring the executive sponsor delivers consistent, visible messaging about the change and its purpose across the organisation.",
    roles: {
      hr: {
        level: "C",
        guidance: "HR advises on tone, audience segmentation by employee group, and alignment with existing internal communication cadence. HR does not own the message itself, but ensures it reaches people in a way that respects their context and existing workload.",
      },
      cm: {
        level: "R",
        guidance: "The change manager drafts communication plans, prepares briefing materials for the sponsor, coaches them on delivery, and sequences messaging across the change timeline. They are the operational engine behind sponsor visibility.",
      },
      pm: {
        level: "I",
        guidance: "The project manager needs to know what is being communicated and when so they can align project milestones and stakeholder expectations. They do not shape the message but depend on its consistency.",
      },
      lm: {
        level: "C",
        guidance: "Line managers are consulted because they translate executive messaging into team-level relevance. They know what their people care about and what questions will surface. Without their input, sponsor communications land as generic corporate messaging.",
      },
      ec: {
        level: "C",
        guidance: "An external consultant may advise on communication strategy, particularly if the organisation has limited experience with large-scale change. However, the sponsor's voice must remain authentic. Consultants who write the sponsor's words often undermine credibility.",
      },
    },
  },
  {
    id: "stakeholder-engagement",
    activity: "Stakeholder Engagement",
    summary: "Identifying, mapping, and actively engaging the people whose support, resistance, or indifference will determine whether the change succeeds.",
    roles: {
      hr: {
        level: "C",
        guidance: "HR provides intelligence on organisational dynamics, team structures, union relationships, and historical context that shapes stakeholder positions. They are invaluable for identifying informal influencers that programme teams would miss.",
      },
      cm: {
        level: "R",
        guidance: "The change manager owns the stakeholder map, designs engagement strategies for each group, tracks sentiment over time, and adapts the approach as the change progresses. This is core change management work.",
      },
      pm: {
        level: "C",
        guidance: "The project manager is consulted on stakeholder engagement because project decisions often create or resolve stakeholder concerns. Scope changes, timeline shifts, and resource decisions all have stakeholder implications.",
      },
      lm: {
        level: "R",
        guidance: "Line managers are co-responsible for stakeholder engagement within their teams. They are the day-to-day relationship holders. A stakeholder strategy that bypasses line managers is a stakeholder strategy that will fail at the team level.",
      },
      ec: {
        level: "I",
        guidance: "External consultants may design stakeholder engagement frameworks and coach the team, but the relationships must be owned internally. When consultants own the relationships, the organisation loses them when the engagement ends.",
      },
    },
  },
  {
    id: "training-delivery",
    activity: "Training Delivery",
    summary: "Equipping impacted people with the knowledge, skills, and confidence to work effectively in the changed environment.",
    roles: {
      hr: {
        level: "A",
        guidance: "HR is accountable for training infrastructure, learning management systems, and integration with broader capability development. They ensure training is not a one-off event but connects to career development and performance management.",
      },
      cm: {
        level: "R",
        guidance: "The change manager defines what training is needed based on the change impact assessment, identifies who needs what level of support, and works with HR and subject matter experts to design learning that addresses both capability and confidence gaps.",
      },
      pm: {
        level: "C",
        guidance: "The project manager is consulted on training timelines because they control the delivery schedule. Training that arrives too early is forgotten. Training that arrives too late creates anxiety. The PM and CM must align on sequencing.",
      },
      lm: {
        level: "R",
        guidance: "Line managers are responsible for creating space for training, reinforcing learning on the job, and identifying team members who need additional support. Without line manager reinforcement, formal training decays within weeks.",
      },
      ec: {
        level: "C",
        guidance: "External consultants may design specialist training content, deliver technical sessions, or provide train-the-trainer support. This is one of the areas where external expertise adds clear value, particularly for new systems, processes, or regulatory requirements.",
      },
    },
  },
  {
    id: "resistance-management",
    activity: "Resistance Management",
    summary: "Understanding, diagnosing, and addressing the root causes of resistance rather than treating symptoms or labelling people as blockers.",
    roles: {
      hr: {
        level: "C",
        guidance: "HR provides context on employment relations, individual performance history, and cultural factors. They also advise on when resistance signals a legitimate grievance that needs a formal channel rather than a change management intervention.",
      },
      cm: {
        level: "R",
        guidance: "The change manager leads resistance diagnosis, distinguishing between resistance caused by poor communication, lack of capability, loss of status, genuine disagreement with the direction, or simply bad timing. Each cause requires a different response.",
      },
      pm: {
        level: "I",
        guidance: "The project manager needs to understand where resistance is concentrated because it affects adoption timelines and risk profiles. They do not manage resistance directly but must factor it into planning.",
      },
      lm: {
        level: "R",
        guidance: "Line managers are the frontline of resistance management. They hear concerns first, observe behaviour changes first, and have the relationship to explore what is really going on. A change manager who bypasses line managers to address resistance directly often makes it worse.",
      },
      ec: {
        level: "I",
        guidance: "External consultants can provide objective perspective on resistance patterns, particularly when the organisation is too close to the problem to see it clearly. However, resistance is resolved through relationships, not frameworks. Consultants inform the approach. Internal people do the work.",
      },
    },
  },
  {
    id: "benefits-realisation",
    activity: "Benefits Realisation",
    summary: "Tracking and demonstrating that the change is delivering the outcomes it promised, both for the organisation and for the people within it.",
    roles: {
      hr: {
        level: "C",
        guidance: "HR is consulted on people-related benefits including employee engagement, retention, capability uplift, and workforce productivity. They own the data that proves whether the change made work better or just made work different.",
      },
      cm: {
        level: "R",
        guidance: "The change manager ensures that benefits realisation includes adoption and usage metrics, not just financial outcomes. They track whether people are actually working differently, not just whether the system went live. A change that is technically complete but behaviourally unchanged has not realised its benefits.",
      },
      pm: {
        level: "A",
        guidance: "The project manager is accountable for benefits realisation because they own the business case. They track financial and operational benefits, report to governance, and escalate when benefits are not materialising as planned.",
      },
      lm: {
        level: "C",
        guidance: "Line managers provide ground-truth data on whether benefits are real. They can tell you whether the new process is actually faster, whether the new tool is actually being used, and whether the promised efficiency gains are showing up in their team's experience.",
      },
      ec: {
        level: "I",
        guidance: "External consultants are typically disengaged by the time benefits realisation matters most. This is one of the structural weaknesses of using external support: consultants optimise for delivery milestones, not sustained outcomes. If you use external support, build an explicit handover of benefits tracking to internal teams.",
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Decision framework: internal vs external                           */
/* ------------------------------------------------------------------ */

const decisionScenarios: DecisionScenario[] = [
  {
    id: "no-internal-capability",
    title: "Your organisation has never managed a transformation of this scale",
    signal: "No internal change management function exists. Previous changes were managed informally by project managers or HR generalists. Leadership recognises the need for structured change management but has no one to lead it.",
    recommendation: "external",
    reasoning: "This is the strongest case for external support. An experienced external change manager brings methodology, tools, and pattern recognition that would take years to build internally. The key is to structure the engagement so that capability transfers to the organisation. An external change manager who leaves without building internal capability has not succeeded, regardless of how well the change landed.",
    watchOuts: "Ensure the external consultant works alongside an internal sponsor and a nominated internal change lead, even if that person is learning as they go. The goal is partnership, not dependency. Set an explicit expectation that part of the deliverable is a more capable internal team.",
  },
  {
    id: "politically-complex",
    title: "The change is politically sensitive and internal teams are conflicted",
    signal: "The transformation involves restructuring, redundancies, or shifts in power between departments. Internal change and HR teams are themselves impacted by the change. There is no neutral internal party who can lead the process credibly.",
    recommendation: "external",
    reasoning: "When the people who would normally lead change are themselves affected by it, objectivity and credibility are compromised. An external change manager can hold the process with neutrality that internal teams cannot. They can name dynamics that internal people cannot name without career risk. This is not about competence. It is about position.",
    watchOuts: "External neutrality has a shelf life. If the consultant stays too long, they become associated with one faction or another. Define the scope tightly: facilitate the transition, establish the new structure, then hand over to internal leadership. Do not let the engagement drift into ongoing advisory because it is comfortable.",
  },
  {
    id: "pace-and-scale",
    title: "The timeline is aggressive and the internal team is already at capacity",
    signal: "The organisation has capable change professionals, but they are already allocated to existing programmes. The new transformation cannot wait, and pulling people from current work would create unacceptable risk.",
    recommendation: "hybrid",
    reasoning: "This is a resourcing problem, not a capability problem. Bringing in external change managers as additional capacity, working within the internal methodology and reporting structure, preserves internal ownership while meeting the timeline. The external team extends the internal team rather than replacing it.",
    watchOuts: "Hybrid models fail when external and internal teams operate in parallel rather than together. The external team must work within the internal team's governance, use their templates, and report through their channels. Two change approaches running simultaneously will confuse stakeholders and undermine both.",
  },
  {
    id: "strong-internal-team",
    title: "You have a mature internal change function and the change is within their experience",
    signal: "The organisation has dedicated change management professionals with relevant experience. The transformation is significant but within the range of what the team has successfully delivered before. Leadership trusts the internal team.",
    recommendation: "internal",
    reasoning: "This is the clearest case for keeping change management internal. The team has the relationships, the organisational knowledge, the credibility, and the track record. Bringing in an external consultant would signal a lack of confidence in the internal team and create unnecessary friction. Use the budget for additional support, training, or tools instead.",
    watchOuts: "Even strong internal teams benefit from external perspective at key moments. Consider engaging an external advisor for a specific intervention, such as a readiness assessment, a design review, or a coaching engagement for senior leaders, without handing over ownership of the programme.",
  },
  {
    id: "culture-change",
    title: "The transformation is primarily cultural rather than structural or technical",
    signal: "The change is about how people work together, how decisions are made, or how the organisation thinks about itself. It is not primarily driven by a new system, a restructure, or a regulatory requirement.",
    recommendation: "internal",
    reasoning: "Culture change cannot be outsourced. It requires sustained, daily reinforcement by people who are part of the culture. An external consultant can diagnose cultural patterns, design interventions, and coach leaders, but the actual work of changing culture happens in thousands of small interactions between people who will still be there when the consultant leaves.",
    watchOuts: "The risk with keeping culture change entirely internal is that the organisation may be too embedded in its own culture to see it clearly. Consider external support for the diagnostic phase, helping the organisation see itself accurately, while keeping the change leadership and delivery firmly internal.",
  },
  {
    id: "regulatory-specialist",
    title: "The transformation requires specialist regulatory or technical knowledge",
    signal: "The change involves compliance with new regulations, adoption of specialist technology, or entry into a new market with unfamiliar requirements. The knowledge gap is specific and bounded, not a general lack of change capability.",
    recommendation: "hybrid",
    reasoning: "This is a knowledge problem. External consultants bring the specialist expertise needed to navigate the specific domain while the internal change team manages the organisational adoption. The external consultant advises on what needs to change. The internal team manages how the change lands with people.",
    watchOuts: "Specialist consultants sometimes conflate their technical expertise with change management expertise. A regulatory expert can tell you what the new process must look like. That does not mean they know how to get two thousand people to adopt it. Keep the roles distinct.",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 3: Defining new roles without confusion                      */
/* ------------------------------------------------------------------ */

const roleDefinitionItems: RoleDefinitionItem[] = [
  {
    text: "Start with decisions, not job descriptions",
    detail: "Most role definition exercises begin with updating job descriptions. This is backwards. Start by mapping the decisions that need to be made in the new operating model. Who decides what? Who needs to be consulted before that decision is made? Who is informed after? Once the decision map is clear, roles become obvious. A job description is just a summary of the decisions a person is authorised to make and the outcomes they are accountable for. When you start with the decisions, you avoid the most common failure mode: creating roles that look clear on paper but overlap in practice because two people both believe the same decision is theirs.",
  },
  {
    text: "Name what is being lost, not just what is being created",
    detail: "Every role change involves loss. Someone who was previously the expert is now a generalist. Someone who had authority over a team now shares it. Someone whose identity was tied to a specific function is being asked to become something different. If you only communicate the new structure without acknowledging what is being given up, you will generate resistance that looks irrational but is actually grief. Name the losses explicitly. Say: we know this role had authority over X, and in the new model that authority sits elsewhere. We know that is a real change and we want to talk about what the new role offers in its place.",
  },
  {
    text: "Co-design the boundaries before you announce them",
    detail: "The fastest way to create role confusion is to announce new roles and then ask people to work out the boundaries themselves. The fastest way to create role resistance is to announce new roles with rigid boundaries that people had no input into. The middle path is co-design. Bring together the people who will hold the new roles and facilitate a session where they negotiate the boundaries. Where does my role end and yours begin? What happens in the grey areas? Who escalates what to whom? This is not a one-time exercise. The boundaries will need to be revisited as the operating model matures. But starting with a shared conversation rather than a top-down diagram builds ownership from day one.",
  },
  {
    text: "Use the first ninety days to test and adjust, not to enforce",
    detail: "New role definitions are hypotheses, not facts. No matter how well designed, they will encounter reality. A process that looked clean on the RACI chart will have gaps. Two roles that seemed distinct will have a grey area that nobody anticipated. A decision right that was assigned to one person will turn out to require input from three others. Treat the first ninety days as a structured experiment. Set up fortnightly check-ins where people in new roles can flag what is working and what is not. Give explicit permission to adjust. The goal is not compliance with the new structure. The goal is a structure that actually works.",
  },
  {
    text: "Invest in the managers who have to explain the changes to their teams",
    detail: "Line managers are the people who will be asked the hardest questions about role changes. Their team members will ask: what does this mean for me? Am I at risk? Why was this person given that responsibility instead of me? If line managers are not equipped to answer these questions honestly and confidently, they will either avoid the conversations, which creates anxiety, or make things up, which creates confusion. Before you announce any role changes, brief your line managers thoroughly. Give them the narrative, the rationale, the specific impact on their team, and the answers to the ten questions they are most likely to be asked. Then give them permission to say they do not know, and a clear channel to get answers when they need them.",
  },
  {
    text: "Separate structural change from identity change and address both",
    detail: "Structural change is about reporting lines, decision rights, and accountabilities. Identity change is about how people see themselves and their place in the organisation. A structural change that also triggers identity change is exponentially harder. If someone has been the Head of Digital for five years and you are now making digital a shared capability rather than a standalone function, you have not just changed their role. You have changed who they are at work. Address both layers explicitly. The structural change needs a clear rationale and a clean design. The identity change needs empathy, conversation, and time. Treating an identity change as though it is merely structural is one of the most common causes of seemingly disproportionate resistance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Case studies                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Unilever",
    headline: "How Unilever's CHRO made HR the engine of transformation rather than a support function",
    hook: "By partnering HR with finance and embedding people strategy into business strategy, Unilever achieved a 20% productivity increase in year one.",
    dimension: "HR as Strategic Partner",
    body: [
      "When Leena Nair became CHRO of Unilever, she faced a challenge familiar to HR leaders in large organisations: HR was seen as a support function, not a strategic partner. The business was undergoing significant transformation, moving from a product-centric model to a purpose-driven, digitally enabled operating model. HR needed to be at the centre of that shift, not on the periphery.",
      "Nair restructured the HR function around what she called the People, Place, and Performance framework. Rather than waiting for the business to define its strategy and then asking HR to execute the people implications, she positioned HR as a co-author of the strategy itself. The CHRO and CFO developed a close partnership, placing key finance and HR leaders on each other's leadership teams.",
      "The organisation reduced the number of business units, layers, and roles, introducing a more agile and flexible way of working. Critically, this restructuring was not something done to HR from the outside. HR led it, modelling the very change it was asking the rest of the organisation to adopt. Unilever launched the FLEX Experiences platform, allowing employees to access short-term assignments and projects across the organisation, breaking down the rigidity that traditional role definitions create.",
      "The results were measurable. Unilever reported a 20% increase in employee productivity within the first year. Ninety-two percent of employees reported being proud to work for Unilever, with engagement scores higher than any peer or benchmark company. The transformation demonstrated that HR's role in change is not to administer the people consequences of decisions made elsewhere. It is to shape the decisions themselves.",
    ],
    lesson: "Unilever's experience demonstrates that HR's most powerful role in transformation is not implementation support but strategic co-ownership. When HR leads the redesign of how work is structured and how people experience change, the organisation gains both capability and credibility. The key was that HR transformed itself first, proving the model before asking others to adopt it.",
    source: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/talent-management-as-a-business-discipline-a-conversation-with-unilever-chro-leena-nair",
    sourceLabel: "McKinsey",
  },
  {
    label: "NHS England",
    headline: "How over-reliance on external consultants eroded transformation capability in the NHS",
    hook: "NHS consulting spend doubled to over 570 million pounds in four years. The capability stayed with the consultants.",
    dimension: "External Consultant Dependency",
    body: [
      "Between 2019 and 2024, NHS England's spending on external management consultants nearly doubled, growing from approximately 310 million pounds to over 570 million pounds. Firms including McKinsey, Deloitte, Boston Consulting Group, KPMG, and PricewaterhouseCoopers were each engaged on contracts worth millions to help the 42 Integrated Care Boards draft plans for reducing waiting lists, redesigning services, and implementing digital transformation.",
      "The criticism was not that external consultants were brought in. Large-scale healthcare transformation is genuinely complex, and specialist expertise has a legitimate role. The criticism was that the NHS became structurally dependent on external support without building equivalent internal capability. Each new transformation initiative required a new consulting engagement because the knowledge from the previous one left when the consultants did.",
      "Campaigners and healthcare analysts raised concerns about accountability. When transformation is designed and led by external consultants, who is accountable when it fails to deliver? The consultants have moved on to the next engagement. The internal teams who inherit the recommendations often lack the context, capability, or authority to sustain them. As one analyst noted, nobody has presented any value-for-money analysis of the work actually done by management consultants.",
      "The NHS case illustrates a structural failure in how external consulting engagements are designed. The engagements were structured around deliverables, reports, frameworks, and recommendations, rather than around capability transfer. The question was never how do we build internal teams who can lead the next transformation without external support. It was how do we get through this transformation with external support. The result was a cycle of dependency rather than a pathway to self-sufficiency.",
    ],
    lesson: "The NHS experience demonstrates the critical distinction between using external consultants as a bridge to internal capability and using them as a permanent substitute for it. Every external engagement should have an explicit capability transfer objective. If the organisation is not measurably more capable of managing change at the end of the engagement than at the beginning, the engagement has failed regardless of what it delivered.",
    source: "https://www.opendemocracy.net/en/nhs-consultants-spending-millions-2022-covid/",
    sourceLabel: "openDemocracy",
  },
  {
    label: "Universal Credit",
    headline: "How unclear roles and constant leadership changes derailed the UK's largest welfare transformation",
    hook: "Six project managers and six senior responsible owners in five years. Nobody owned the change, so nobody could lead it.",
    dimension: "Role Confusion at Scale",
    body: [
      "The Universal Credit programme, launched by the UK Department for Work and Pensions in 2010, was intended to be the most significant reform of the welfare system in a generation. It aimed to merge six separate benefits into a single payment, simplifying the system for claimants and reducing administrative costs. The ambition was clear. The execution was catastrophic.",
      "In the first five years, the programme went through six project managers and six senior responsible owners. Each transition brought a new leadership style, new priorities, and a new interpretation of what the programme was trying to achieve. The constant turnover meant that institutional knowledge was repeatedly lost, relationships with stakeholders had to be rebuilt, and the programme lurched from one approach to another without completing any of them.",
      "The role confusion extended beyond leadership. Officials were increasingly placed in managerial roles while policy advice became politicised. The result was that officials had less responsibility in designing policy but took more blame when things went wrong. The DWP attempted to adopt agile methodology, then switched to a hybrid approach it called Agile 2.0, then abandoned that for a phased approach. Each methodology shift required new role definitions, new governance structures, and new accountability frameworks, none of which had time to mature before the next change arrived.",
      "The National Audit Office found that the Department did not have adequate measures of progress and lacked effective controls. Given the tight timescale, unfamiliar project management approach, and absence of a detailed plan, these gaps were critical. The programme was eventually delivered, years late and significantly over budget, but the human cost was substantial, both for the claimants who experienced a chaotic transition and for the civil servants who bore the pressure of an unmanageable programme.",
    ],
    lesson: "Universal Credit is a case study in what happens when role clarity is treated as an administrative detail rather than a strategic necessity. When nobody owns the change consistently, accountability dissolves. When roles are redefined with every leadership transition, people stop investing in their responsibilities because they expect the next reorganisation to take them away. Stable, clearly defined roles are not bureaucracy. They are the foundation that makes agility possible.",
    source: "https://www.nao.org.uk/reports/universal-credit-early-progress-2/",
    sourceLabel: "National Audit Office",
  },
];

/* ------------------------------------------------------------------ */
/*  Self-check items                                                   */
/* ------------------------------------------------------------------ */

const checkItems = [
  { key: "hr-role", label: "We have explicitly defined what HR owns, what HR advises on, and what HR does not do in this transformation" },
  { key: "cm-role", label: "There is a named change manager with a clear mandate, whether internal or external, and everyone knows who they are" },
  { key: "lm-role", label: "Line managers have been briefed on their specific role in the change and given the tools to fulfil it" },
  { key: "raci", label: "Key change activities have clear ownership and the RACI has been validated with the people in it, not just drafted by the programme team" },
  { key: "external", label: "If we are using external consultants, we have defined what capability they are transferring and when their engagement ends" },
  { key: "boundaries", label: "People in new or changed roles have had the opportunity to negotiate boundaries with adjacent roles" },
  { key: "loss", label: "We have acknowledged what people are losing in role changes, not just what they are gaining" },
  { key: "ninety", label: "There is a structured process for reviewing and adjusting role definitions in the first ninety days" },
  { key: "identity", label: "We have identified where role changes also involve identity changes and have a plan to address both" },
  { key: "escalation", label: "There is a clear escalation path for when role boundaries are unclear or contested" },
];

/* ------------------------------------------------------------------ */
/*  Expandable list component                                          */
/* ------------------------------------------------------------------ */

function ExpandableList({
  items,
  openIndex,
  setOpenIndex,
}: {
  items: RoleDefinitionItem[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  return (
    <ul className="detail-list" style={{ listStyle: "none", padding: 0 }}>
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

export default function RoleClarity() {
  const [expandedRaci, setExpandedRaci] = useState<string | null>(null);
  const [expandedRole, setExpandedRole] = useState<{ activityId: string; roleKey: RoleKey } | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const [roleDefOpen, setRoleDefOpen] = useState<number | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const recommendationColours: Record<string, string> = {
    internal: "#2E6B4F",
    external: "#8B2E2E",
    hybrid: "#B8860B",
  };

  const recommendationLabels: Record<string, string> = {
    internal: "Keep it internal",
    external: "Bring in external support",
    hybrid: "Hybrid approach",
  };

  return (
    <>
      <Nav />

      {/* ---- HEADER ---- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Enablement &middot; Role Clarity &amp; Capability</span>
          <h1 className="article-title">Who actually does what in a transformation? HR, change managers, external consultants, and the role confusion that derails change.</h1>
          <p className="article-intro">
            One of the most common and least discussed causes of failed transformation is that nobody is clear on who does what. HR assumes the change manager is handling resistance. The change manager assumes line managers are reinforcing new behaviours. Line managers assume someone in the programme team is managing stakeholders. The project manager assumes HR is leading the people side. Everyone assumes someone else is doing the critical work, and the gaps only become visible when adoption stalls. This article provides practical clarity on three connected questions: what is HR's actual role in transformation, when should you bring in external change management support, and how do you define new roles without creating the confusion and resistance that undermines everything else.
          </p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
        <div className="article-main">

          {/* ================================================================ */}
          {/* SECTION 1: RACI-STYLE ROLE CLARITY TOOL                         */}
          {/* ================================================================ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">What is HR's actual role in an organisational transformation?</h2>
              <p className="article-section-desc">
                The question is not whether HR has a role in transformation. It does. The question is what that role actually is, and equally important, what it is not. HR's value in change is enormous when it focuses on what only HR can do: providing organisational intelligence, connecting change to people systems, and ensuring the human consequences of decisions are understood before those decisions are made. HR's value collapses when it tries to own the entire people side of change, because the people side of change belongs to everyone.
              </p>
              <p className="article-section-desc">
                Use the tool below to explore who typically owns each key activity in a transformation. Click any activity to see the full RACI breakdown, then expand individual roles for practical guidance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="phase-list">
                {raciActivities.map((activity, i) => (
                  <div key={activity.id} style={{ marginBottom: "8px" }}>
                    <button
                      className={`phase-card${expandedRaci === activity.id ? " phase-card-active" : ""}`}
                      onClick={() => {
                        setExpandedRaci(expandedRaci === activity.id ? null : activity.id);
                        setExpandedRole(null);
                      }}
                      style={{ width: "100%" }}
                    >
                      <span className="phase-card-pillar">Activity {String(i + 1).padStart(2, "0")}</span>
                      <span className="phase-card-name">{activity.activity}</span>
                    </button>

                    {expandedRaci === activity.id && (
                      <div style={{ marginTop: "4px" }}>
                        <div className="detail-block" style={{ marginBottom: "16px" }}>
                          <p className="detail-body" style={{ marginBottom: 0 }}>{activity.summary}</p>
                        </div>

                        {/* RACI grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px", marginBottom: "8px" }}>
                          {(Object.keys(activity.roles) as RoleKey[]).map((roleKey) => {
                            const role = activity.roles[roleKey];
                            const isExpanded =
                              expandedRole?.activityId === activity.id &&
                              expandedRole?.roleKey === roleKey;
                            return (
                              <button
                                key={roleKey}
                                onClick={() =>
                                  setExpandedRole(
                                    isExpanded
                                      ? null
                                      : { activityId: activity.id, roleKey }
                                  )
                                }
                                style={{
                                  background: isExpanded ? "#0A1628" : "#F5F3EF",
                                  color: isExpanded ? "#F5F3EF" : "#0A1628",
                                  border: "1px solid #0A1628",
                                  borderRadius: "8px",
                                  padding: "14px 16px",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <span style={{ display: "block", fontSize: "0.8rem", opacity: 0.7, marginBottom: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                                  {roleLabels[roleKey]}
                                </span>
                                <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 700, marginBottom: "2px" }}>
                                  {role.level} &mdash; {raciLabels[role.level]}
                                </span>
                                <span style={{ display: "block", fontSize: "0.78rem", opacity: 0.6 }}>
                                  {isExpanded ? "Click to collapse" : "Click for guidance"}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Expanded guidance */}
                        {expandedRole && expandedRole.activityId === activity.id && (
                          <div className="detail-block detail-block-warning" style={{ marginTop: "8px" }}>
                            <h3 className="detail-block-title">
                              {roleLabels[expandedRole.roleKey]} &mdash; {raciLabels[activity.roles[expandedRole.roleKey].level]}
                            </h3>
                            <p className="detail-body" style={{ marginBottom: 0 }}>
                              {activity.roles[expandedRole.roleKey].guidance}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* ================================================================ */}
          {/* SECTION 2: INTERNAL VS EXTERNAL DECISION FRAMEWORK              */}
          {/* ================================================================ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">When should you bring in an external change manager, and when should you not?</h2>
              <p className="article-section-desc">
                The decision to bring in external change management support is one of the most consequential choices in a transformation. Get it right and you accelerate the change with expertise and objectivity your organisation lacks. Get it wrong and you create dependency, erode internal confidence, and spend significant money on capability that walks out the door when the engagement ends. The answer is never a blanket yes or no. It depends on your specific situation. Use the framework below to find your scenario and explore the recommendation.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="phase-list">
                {decisionScenarios.map((scenario) => (
                  <div key={scenario.id} style={{ marginBottom: "8px" }}>
                    <button
                      className={`phase-card${expandedScenario === scenario.id ? " phase-card-active" : ""}`}
                      onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                      style={{ width: "100%" }}
                    >
                      <span className="phase-card-pillar" style={{ color: recommendationColours[scenario.recommendation] }}>
                        {recommendationLabels[scenario.recommendation]}
                      </span>
                      <span className="phase-card-name">{scenario.title}</span>
                    </button>

                    {expandedScenario === scenario.id && (
                      <div style={{ marginTop: "4px" }}>
                        <div className="detail-block" style={{ marginBottom: "12px" }}>
                          <h3 className="detail-block-title">The signal</h3>
                          <p className="detail-body" style={{ marginBottom: 0 }}>{scenario.signal}</p>
                        </div>

                        <div className="phase-compare">
                          <div className="phase-compare-col phase-compare-leader">
                            <span className="phase-compare-label">Recommendation</span>
                            <p className="phase-compare-text">{scenario.reasoning}</p>
                          </div>
                        </div>

                        <div className="detail-block detail-block-warning" style={{ marginTop: "12px" }}>
                          <h3 className="detail-block-title">Watch out for</h3>
                          <p className="detail-body" style={{ marginBottom: 0 }}>{scenario.watchOuts}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* ================================================================ */}
          {/* SECTION 3: DEFINING NEW ROLES                                   */}
          {/* ================================================================ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">How to define new roles and responsibilities without creating confusion or resistance</h2>
              <p className="article-section-desc">
                Restructuring roles is one of the highest-stakes activities in any transformation. It touches people's identity, status, expertise, and sense of security simultaneously. The technical act of drawing new boxes on an org chart is straightforward. The human act of helping people navigate what those new boxes mean for them is where most organisations fail. Below are six principles for defining new roles in a way that creates clarity rather than confusion, and ownership rather than resistance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <ExpandableList
                items={roleDefinitionItems}
                openIndex={roleDefOpen}
                setOpenIndex={setRoleDefOpen}
              />
            </ScrollReveal>
          </section>

          {/* ================================================================ */}
          {/* SELF-CHECK                                                       */}
          {/* ================================================================ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Role Clarity Self-Check</h2>
              <p className="article-section-desc">Use this checklist to assess whether your transformation has the role clarity it needs to succeed. Each item represents a common gap that, left unaddressed, creates confusion, duplication, or accountability vacuums.</p>
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
                      <span className="check-complete"> &mdash; Your transformation has strong role clarity. Maintain it through regular reviews and open channels for boundary questions.</span>
                    )}
                    {checkedCount >= 7 && checkedCount < checkItems.length && (
                      <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps before the next phase of delivery.</span>
                    )}
                    {checkedCount >= 4 && checkedCount < 7 && (
                      <span className="check-partial"> &mdash; Significant gaps in role clarity. These will create friction as the transformation scales. Prioritise the unchecked items.</span>
                    )}
                    {checkedCount > 0 && checkedCount < 4 && (
                      <span className="check-partial"> &mdash; Critical role clarity gaps. Your transformation is at risk of the accountability vacuum that derails most change programmes. Address these urgently.</span>
                    )}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ================================================================ */}
          {/* CTA                                                              */}
          {/* ================================================================ */}
          <section className="article-section article-cta">
            <ScrollReveal direction="up">
              <p className="article-cta-text">This topic is part of <strong>Enablement</strong>, the third pillar of the TCA Change Model.</p>
              <Link href="/knowledge" className="btn">Explore the Full Model</Link>
            </ScrollReveal>
          </section>

        </div>

        {/* ================================================================ */}
        {/* SIDEBAR                                                          */}
        {/* ================================================================ */}
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

      {/* ================================================================ */}
      {/* CASE STUDY MODAL                                                 */}
      {/* ================================================================ */}
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
