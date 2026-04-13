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

const lenses = [
  {
    id: "strategic",
    num: "01",
    name: "Strategic",
    summary: "The gap between where the organisation says it is going and what it is actually set up to achieve.",
    what: "A strategic gap analysis examines the distance between the stated vision, goals, or transformation ambitions and the organisation's current strategic positioning. It asks: is the organisation genuinely configured to achieve what leadership has committed to? This is not about whether the strategy document is well written. It is about whether the strategy is grounded in reality.",
    questions: [
      { text: "Is there a clearly articulated future state that people can describe in their own words?", detail: "If the future state only exists in a slide deck that leadership presented once, it is not real yet. Test whether people at different levels can articulate where the organisation is heading. If they cannot, the strategic gap starts with communication, not execution." },
      { text: "Does the strategy account for what the organisation is actually capable of today?", detail: "Ambitious strategies often assume capabilities that do not yet exist. A meaningful gap analysis asks whether the organisation has the people, processes, systems, and culture to deliver what the strategy demands. If not, the gap is not a delivery problem. It is a design problem." },
      { text: "Are there competing priorities that will undermine this change before it starts?", detail: "Most organisations are running multiple change initiatives simultaneously. If three programmes are competing for the same leaders, the same teams, and the same budget, the strategic gap is not about ambition. It is about capacity." },
      { text: "Is there genuine leadership alignment, or just agreement in the room?", detail: "Leaders may nod along in a steering committee and then return to their divisions with different priorities. The gap between public agreement and private commitment is one of the most dangerous in any transformation." },
      { text: "What has to stop for this change to succeed?", detail: "Every new initiative consumes attention and energy. If nothing is deprioritised to make room, the organisation will try to absorb the change on top of everything else. That is how strategies die quietly." },
    ] as ListItem[],
    methods: [
      { text: "Strategy alignment workshops with cross-functional leadership teams", detail: "Bring leaders from different functions into the same room and ask them to describe the future state independently. The differences between their descriptions reveal the real strategic gap." },
      { text: "Priority mapping to identify conflicts and resource contention", detail: "Map every active initiative against the same resources: people, budget, leadership attention. Where there is overlap, there is contention. Where there is contention, something will fail." },
      { text: "Backward planning from the desired outcome to identify missing preconditions", detail: "Start with the end state and work backwards. What needs to be true for this to work? At each step, ask whether that precondition exists today. Where it does not, you have found a gap." },
    ] as ListItem[],
    blindSpots: [
      { text: "Treating the strategy document as evidence that alignment exists", detail: "A strategy document is an intention, not a reality. The gap between what is written and what is understood, believed, and acted upon is where most strategic failures originate." },
      { text: "Ignoring the initiatives that will compete for the same resources", detail: "Leaders often treat each initiative as if it exists in isolation. A gap analysis that does not account for competing demands on the same people and budgets will overestimate the organisation's capacity to deliver." },
      { text: "Confusing leadership approval with leadership commitment", detail: "Approval is passive. Commitment is active. A leader who has approved the change but is not prepared to make difficult trade-offs to support it has not closed the strategic gap." },
    ] as ListItem[],
  },
  {
    id: "operational",
    num: "02",
    name: "Operational",
    summary: "The gap between how work is designed to flow and how it actually happens day to day.",
    what: "An operational gap analysis looks at the processes, workflows, handoffs, and decision points that define how work gets done. The goal is to identify where the current operating model will resist or fail to support the future state. This is where documented processes meet reality, and reality usually wins.",
    questions: [
      { text: "Which processes will need to change, and which are already broken?", detail: "Some processes need to change because the future state demands it. Others are already failing today. The distinction matters because fixing broken processes is different from redesigning functional ones. A gap analysis needs to distinguish between the two." },
      { text: "Where are the handoffs that lose time, information, or accountability?", detail: "The most common operational gaps live at the boundaries between teams. A task finishes in one team and starts in another, and somewhere in between, context is lost, ownership becomes unclear, or the work sits in a queue. These handoffs are where change most often breaks down." },
      { text: "What workarounds exist, and what do they tell you about the gap?", detail: "Every workaround is a patch over a gap that was never closed. If people have built manual processes, spreadsheets, or informal agreements to compensate for system or process failures, those workarounds are your most honest data source." },
      { text: "How will the change affect the daily experience of frontline staff?", detail: "Operational gaps are not abstract. They show up in whether someone can do their job on a Monday morning. If the gap analysis does not get specific about what changes for people at the task level, it is not detailed enough." },
    ] as ListItem[],
    methods: [
      { text: "Process walk-throughs with frontline staff, not process owners", detail: "The people who designed the process often have a different understanding of it than the people who run it every day. Walk the process with the people who actually do the work. Their version is the real one." },
      { text: "Current state vs future state process mapping, side by side", detail: "Create two maps: how work flows today and how it needs to flow tomorrow. Lay them side by side. The differences between them are your operational gaps. The larger the difference, the more change management support that process will need." },
      { text: "Cycle time analysis to identify where delays accumulate", detail: "Measure how long each step in a process actually takes versus how long it should take. The gaps between actual and expected cycle times reveal where the operational model is failing, often at decision points and handoffs." },
    ] as ListItem[],
    blindSpots: [
      { text: "Designing the future state process without understanding the current one", detail: "You cannot close a gap you have not measured. If the future state process is designed in a workshop without first understanding how work actually flows today, the gap analysis is based on assumptions, not evidence." },
      { text: "Assuming technology will close operational gaps automatically", detail: "A new system does not fix a broken handoff. It automates it. If the operational gap is about unclear accountability, missing information, or poor communication between teams, technology will amplify the problem, not solve it." },
      { text: "Focusing on efficiency rather than effectiveness", detail: "Gap analysis often focuses on making things faster. But speed is not always the issue. Sometimes the gap is that the process is doing the wrong thing efficiently. Ask whether the process is delivering the right outcome before asking whether it is delivering it quickly enough." },
    ] as ListItem[],
  },
  {
    id: "capability",
    num: "03",
    name: "Capability",
    summary: "The gap between what people can do today and what the future state requires them to do.",
    what: "A capability gap analysis identifies the skills, knowledge, behaviours, and confidence that people will need in the future state that they do not have today. This is not a training needs analysis. It is a deeper assessment of whether the workforce, including managers and leaders, is equipped to operate in a fundamentally different way.",
    questions: [
      { text: "What specific skills does the future state require that do not exist at scale today?", detail: "Be precise. Not just 'digital skills' or 'leadership capability'. What exactly do people need to be able to do? In what context? To what standard? Vague capability gaps lead to vague training programmes that change nothing." },
      { text: "Is the gap about knowledge, skill, confidence, or all three?", detail: "Someone might know what to do but lack the skill to do it well. They might have the skill but lack the confidence to apply it under pressure. Or they might lack all three. The intervention is different in each case. A meaningful gap analysis distinguishes between them." },
      { text: "Are managers equipped to coach their teams through the transition?", detail: "This is the most commonly underestimated capability gap in organisational change. Managers are expected to lead their teams through uncertainty while going through the change themselves. If they are not specifically supported, they become the bottleneck." },
      { text: "What capabilities already exist in the organisation that are being underused?", detail: "Not every gap requires building something new. Sometimes the capability exists in a different part of the organisation, or in individuals whose expertise has not been leveraged. A good gap analysis looks for hidden strengths as well as missing ones." },
    ] as ListItem[],
    methods: [
      { text: "Role-based capability mapping against future state requirements", detail: "For each role that will change, define what the person in that role needs to be able to do in the future state. Then assess where they are today. The distance between the two is your capability gap, specific to each role." },
      { text: "Confidence assessments alongside competence assessments", detail: "Ask people not just whether they know how to do something, but how confident they feel doing it. Self-reported confidence is a strong predictor of whether someone will actually adopt new ways of working when the pressure is on." },
      { text: "Manager readiness interviews focused on their ability to support change", detail: "Interview managers specifically about their understanding of the change, their confidence in explaining it to their teams, and what support they feel they need. Their answers will tell you how ready the organisation's middle layer is." },
    ] as ListItem[],
    blindSpots: [
      { text: "Equating a training plan with a closed capability gap", detail: "Scheduling training does not close a capability gap. People need practice, feedback, coaching, and time to build confidence. If the gap analysis leads only to a training calendar, it has not gone far enough." },
      { text: "Ignoring behavioural capabilities in favour of technical ones", detail: "Many transformations require people to collaborate differently, make decisions differently, or communicate differently. These behavioural shifts are often harder to develop than technical skills, and they are frequently overlooked." },
      { text: "Assuming leaders already have the capabilities they need", detail: "Leaders are often excluded from capability gap assessments because they are assumed to be competent by virtue of their position. In practice, leaders may need as much development as their teams, particularly around leading through ambiguity." },
    ] as ListItem[],
  },
  {
    id: "cultural",
    num: "04",
    name: "Cultural",
    summary: "The gap between the culture the future state requires and the culture that exists today.",
    what: "A cultural gap analysis examines the behaviours, norms, values, and power dynamics that define how the organisation actually operates. It asks: will the current culture support the change, resist it, or actively undermine it? This is the gap most often ignored and most often responsible for transformation failure.",
    questions: [
      { text: "What does the current culture reward, and will the change require different behaviours?", detail: "If the culture rewards individual performance and the change requires collaboration, there is a cultural gap. If the culture rewards caution and the change requires innovation, there is a cultural gap. The wider this gap, the more resistance you should expect." },
      { text: "How does the organisation handle disagreement and challenge?", detail: "If people cannot safely challenge decisions, raise concerns, or offer alternative perspectives, the organisation will not surface the problems that emerge during change. Psychological safety is not a nice to have. It is a prerequisite for successful transformation." },
      { text: "What happened the last time the organisation tried something like this?", detail: "Organisational memory is long. If the last transformation was painful, poorly managed, or ultimately reversed, people will carry that into this one. The cultural gap includes the emotional legacy of previous changes." },
      { text: "Do the informal power structures support or resist this change?", detail: "Formal authority is not the only power in an organisation. Informal influence, relationships, and networks determine how change messages are received and whether people actually adopt new ways of working. A cultural gap analysis must map the informal as well as the formal." },
    ] as ListItem[],
    methods: [
      { text: "Behavioural observation in meetings, not just interviews", detail: "Culture is visible in how meetings are run, how decisions are made in practice, and how conflict is handled. Sit in on real meetings and observe. What you see will tell you more about the culture than what people say in interviews." },
      { text: "Story collection from people at different levels of the organisation", detail: "Ask people to tell stories about the organisation. Stories about successes, failures, frustrations, and moments of pride. The themes across these stories reveal the lived culture far more accurately than a survey." },
      { text: "Analysis of what gets measured, rewarded, and tolerated", detail: "Culture is reinforced by systems. Look at the KPIs, the promotion criteria, the behaviours that are celebrated, and the behaviours that are tolerated even when they should not be. These systems either align with or contradict the change you are trying to make." },
    ] as ListItem[],
    blindSpots: [
      { text: "Assuming culture will shift once the new processes are in place", detail: "Culture does not follow process. It follows behaviour, reinforcement, and leadership example. If the gap analysis assumes culture will catch up, the change will be technically complete but behaviourally unchanged." },
      { text: "Treating culture as a single, uniform thing across the organisation", detail: "Culture varies by team, by location, by function, and by level. A cultural gap analysis that treats the organisation as a monolith will miss the local variations that determine whether change lands or fails in specific areas." },
      { text: "Ignoring the culture of the change team itself", detail: "The team leading the change has its own culture, assumptions, and biases. If the change team operates in a way that is disconnected from the wider organisation, it will design solutions that make sense to them but not to the people who need to adopt them." },
    ] as ListItem[],
  },
  {
    id: "structural",
    num: "05",
    name: "Structural",
    summary: "The gap between how the organisation is structured today and how it needs to be structured to support the change.",
    what: "A structural gap analysis looks at reporting lines, decision rights, governance, team design, and organisational architecture. It asks: does the structure of the organisation enable or obstruct the change? Many transformations fail not because people resist the change, but because the structure makes it impossible to deliver.",
    questions: [
      { text: "Does the current reporting structure support the way work needs to flow in the future?", detail: "If the change requires cross-functional collaboration but the organisation is structured in silos with separate reporting lines, the structure is working against the change. People will default to the priorities set by their line manager, not the transformation programme." },
      { text: "Are decision rights clear, and are they in the right places?", detail: "In many organisations, decisions that should be made quickly are escalated through multiple layers. If the change requires faster decision-making, the structural gap is not about people. It is about where authority sits." },
      { text: "Does the governance model enable delivery or create bottlenecks?", detail: "Governance should provide oversight and remove blockers. If it adds layers of approval, creates reporting burden, or delays decisions, it is a structural gap that will slow the transformation regardless of how committed people are." },
      { text: "Are teams designed for the current state or the future state?", detail: "Team structures often reflect historical decisions rather than current needs. If the change requires new ways of working, the team design may need to change as well. A structural gap analysis asks whether the current team architecture supports what comes next." },
    ] as ListItem[],
    methods: [
      { text: "Decision rights mapping across the programme and the business", detail: "For the key decisions that need to be made during and after the change, map who currently has authority, who should have authority, and where the gaps or conflicts are. This reveals structural bottlenecks before they cause delays." },
      { text: "Governance review focused on speed and clarity, not just control", detail: "Review every governance forum, steering committee, and approval process that the change will need to pass through. Ask whether each one adds value or adds delay. Simplify where possible." },
      { text: "Organisational network analysis to identify real collaboration patterns", detail: "Formal structure shows who reports to whom. Network analysis shows who actually works with whom. The difference reveals where the structure supports collaboration and where it obstructs it." },
    ] as ListItem[],
    blindSpots: [
      { text: "Assuming the change can succeed within the existing structure", detail: "If the current structure is designed for a different operating model, it will resist the change by default. Sometimes the structure itself is what needs to change first. A gap analysis that takes the structure as given may miss the biggest gap of all." },
      { text: "Overlooking the governance burden the transformation itself creates", detail: "Transformation programmes add governance on top of business as usual. If the combined burden is too heavy, people will deprioritise one or the other. The structural gap includes the additional load the change itself creates." },
      { text: "Focusing only on the org chart and ignoring informal networks", detail: "The org chart is the formal structure. The real structure is the network of relationships, favours, and influence that determines how things actually get done. A gap analysis that only looks at the chart will miss how the organisation actually operates." },
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

export default function GapAnalysis() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const caseStudies = [
    {
      label: "General Electric",
      headline: "GE's $1 billion digital transformation that ignored its own cultural gaps",
      hook: "They had the strategy, the budget, and the technology. They never closed the gap between vision and culture.",
      dimension: "Cultural",
      body: [
        "In 2011, General Electric launched GE Digital with the ambition of becoming a 'digital industrial company'. The initiative centred on Predix, an Industrial Internet of Things platform. Billions were invested over several years.",
        "The strategic vision was clear at the top, but a meaningful gap analysis of the organisation's culture was never conducted. GE's traditional culture, shaped by decades of financial engineering under Jack Welch, rewarded short-term results and operational efficiency. The digital transformation required experimentation, tolerance for failure, and long-term thinking.",
        "Managers would attend innovation workshops at GE's Crotonville campus and return to divisions still operating under legacy metrics and expectations. The gap between the stated digital ambition and the lived cultural reality was never closed. By 2018, GE was selling off the assets of GE Digital to offset billions in losses.",
      ],
      lesson: "The cultural gap between GE's legacy operating culture and the behaviours required for digital innovation was never formally assessed or addressed. A cultural gap analysis would have revealed that the incentive structures, leadership behaviours, and risk appetite of the organisation were fundamentally misaligned with the transformation ambition.",
      source: "https://www.cnbc.com/2019/10/30/heres-why-ge-fords-digital-transformation-programs-failed-last-year.html",
      sourceLabel: "CNBC",
    },
    {
      label: "Marks & Spencer",
      headline: "M&S spent 150 million on a website that forgot how its customers actually shop",
      hook: "They redesigned the digital experience without mapping the gap between how customers behaved online and what the new platform assumed.",
      dimension: "Operational",
      body: [
        "In 2019, Marks and Spencer launched a completely redesigned eCommerce platform at a cost of around 150 million pounds. The goal was to modernise the digital shopping experience and drive online sales.",
        "The new site was designed around assumptions about how customers should shop, not how they actually did. Existing customers were forced to re-register, losing their purchase history and saved details. The familiar 'add to basket' was replaced with 'your bag', confusing loyal shoppers. The path to checkout malfunctioned at launch.",
        "The operational gap between the current customer experience and the new platform's design had never been properly mapped. No one had conducted a detailed analysis of how existing customers navigated the site, what they valued in the experience, and what would break if those patterns were disrupted.",
      ],
      lesson: "The operational gap analysis focused on the technology platform rather than the customer journey. A meaningful gap analysis would have mapped actual customer behaviour against the proposed changes and identified the friction points before they went live.",
      source: "https://blog.contactpigeon.com/marks-n-spencer-ecommerce/",
      sourceLabel: "ContactPigeon",
    },
    {
      label: "Nokia",
      headline: "Nokia knew the future but could not close the gap between knowing and doing",
      hook: "The strategy was right. The structure, culture, and capability gaps made it impossible to execute.",
      dimension: "Structural",
      body: [
        "By 2007, Nokia's leadership understood that the future of mobile was in software and ecosystems, not hardware. Internally, they could see the threat posed by Apple and later Android. The strategic diagnosis was sound.",
        "But the organisation was structured around hardware divisions with competing priorities. Decision-making was slow, fragmented across business units, and optimised for the existing product portfolio. The cultural gap was equally severe: a climate of internal competition and fear of delivering bad news meant that critical feedback never reached the top.",
        "Nokia's structural gap, the distance between its siloed hardware organisation and the integrated software company it needed to become, was never formally assessed or addressed. By the time Microsoft acquired Nokia's mobile division in 2014, the company had lost the smartphone market entirely. Microsoft subsequently wrote off the majority of the $7.2 billion acquisition.",
      ],
      lesson: "Nokia's failure was not a failure of strategy or intelligence. It was a failure to assess and close the structural and cultural gaps that prevented the organisation from executing a strategy everyone knew was right.",
      source: "https://theconversation.com/microsoft-nokia-culture-clash-will-be-tough-to-overcome-17798",
      sourceLabel: "The Conversation",
    },
  ];

  const checkItems = [
    { key: "strategic", label: "We have assessed whether leadership is genuinely aligned, not just publicly agreeing" },
    { key: "operational", label: "We have mapped how work actually flows today, including workarounds and handoffs" },
    { key: "capability", label: "We know specifically what people need to do differently, not just that they need training" },
    { key: "cultural", label: "We have examined the behaviours, norms, and power dynamics that could resist this change" },
    { key: "structural", label: "We have assessed whether the organisational structure supports or obstructs the future state" },
    { key: "competing", label: "We have identified competing priorities that could starve this change of resources" },
    { key: "specific", label: "Our gaps are specific and measurable, not vague observations" },
    { key: "action", label: "Each gap has a clear owner and a plan to close it before or during delivery" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  function toggle(id: string) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Change Diagnosis</span>
          <h1 className="article-title">What does a meaningful gap analysis look like, and how do you avoid making it a tick-box exercise?</h1>
          <p className="article-intro">Most gap analyses tell you what you already know. They compare a current state document to a future state document and produce a list of differences. A meaningful gap analysis does something harder. It reveals the real distance between where the organisation is and where it needs to be, across strategy, operations, capability, culture, and structure. And it makes that distance specific enough to act on.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Five Lenses</h2>
          <p className="article-section-desc">A thorough gap analysis examines the organisation through five lenses. Each one reveals gaps the others miss. Click any lens to explore it in depth.</p>
        </ScrollReveal>

        <div className="dimension-grid">
          {lenses.map((l, i) => (
            <ScrollReveal key={l.id} direction="up" delay={i * 80}>
              <button
                className={`dimension-card${expanded === l.id ? " dimension-card-active" : ""}`}
                onClick={() => toggle(l.id)}
              >
                <span className="dimension-num">{l.num}</span>
                <span className="dimension-name">{l.name}</span>
                <span className="dimension-summary">{l.summary}</span>
                <span className="dimension-expand">{expanded === l.id ? "Close" : "Explore"} &darr;</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {expanded && (
        <section className="article-section dimension-detail" id={`detail-${expanded}`}>
          {lenses
            .filter((l) => l.id === expanded)
            .map((l) => (
              <div key={l.id}>
                <ScrollReveal direction="up">
                  <div className="detail-header">
                    <span className="dimension-num-lg">{l.num}</span>
                    <h2 className="detail-title">{l.name}</h2>
                  </div>
                  <p className="detail-body">{l.what}</p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Key Questions to Ask</h3>
                    <ExpandableList items={l.questions} type="questions" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={200}>
                  <div className="detail-block">
                    <h3 className="detail-block-title">Methods That Go Beyond the Obvious</h3>
                    <ExpandableList items={l.methods} type="methods" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300}>
                  <div className="detail-block detail-block-warning">
                    <h3 className="detail-block-title">Common Blind Spots</h3>
                    <ExpandableList items={l.blindSpots} type="blindSpots" />
                  </div>
                </ScrollReveal>
              </div>
            ))}
        </section>
      )}

      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Gap Analysis Meaningful?</h2>
          <p className="article-section-desc">Use this checklist to evaluate whether your gap analysis has the depth and specificity it needs to drive real action.</p>
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
                  <span className="check-complete"> &mdash; Your gap analysis has real depth.</span>
                )}
                {checkedCount > 0 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; There may be lenses you have not fully explored.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Direction</strong>, the first pillar of the TCA Change Model.</p>
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
