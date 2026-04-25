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
    id: "people",
    num: "01",
    name: "People",
    summary: "The gap between how people feel and operate today and what the future state demands of them.",
    what: "A people gap analysis goes beyond headcount. It examines the distance between how people currently experience their work, their trust in leadership, their emotional readiness, and what the future state will ask of them. It includes engagement levels, resistance patterns, and the informal dynamics that determine whether people will move towards the change or away from it.",
    questions: [
      { text: "How far is the current level of trust from what this change requires?", detail: "Every change asks people to take a leap of faith. If trust is already low, the gap between where people are emotionally and where they need to be is wider than most plans account for. Measure trust explicitly, because it determines how every message will land." },
      { text: "What is the gap between how people responded to past change and what this one needs?", detail: "If previous changes left people feeling unheard or let down, the emotional starting point for this change is not neutral. It is negative. The gap includes the residue of past experiences that has not been acknowledged or addressed." },
      { text: "Are the right people in the right roles to deliver this change?", detail: "Sometimes the gap is not about skills or attitudes. It is about whether the people who need to lead this change at every level are actually in position to do so. A people gap analysis asks whether the current workforce configuration matches what the future state requires." },
      { text: "Where are the informal influencers, and are they on board?", detail: "Formal authority is not enough. The people who shape how others feel about change often have no formal role in the program. If the gap between their current stance and active support is wide, the change will struggle regardless of what leadership says." },
    ] as ListItem[],
    methods: [
      { text: "Sentiment analysis comparing current engagement data to future state requirements", detail: "Look at engagement scores, exit interview themes, and pulse survey data. Then define what engagement level the change requires. The distance between the two is your people gap." },
      { text: "Stakeholder readiness mapping across levels and functions", detail: "For each key stakeholder group, assess their current awareness, understanding, and willingness to change. Map this against what the program needs from them. The gaps tell you where to focus engagement effort." },
      { text: "One-to-one interviews with informal influencers to gauge the real mood", detail: "Find the people whose opinions shape others. Sit down with them, not to sell the change, but to listen. Their perspective reveals the actual distance between the current mood and what the change needs." },
    ] as ListItem[],
    blindSpots: [
      { text: "Assuming people will come around once they understand the rationale", detail: "Understanding is not the same as acceptance. People can fully understand why a change is happening and still resist it because of how it affects them personally. The gap between intellectual understanding and emotional readiness is often the widest." },
      { text: "Overlooking the impact on people who are not directly in scope", detail: "Change affects more people than the scope document suggests. Teams upstream, downstream, and adjacent to the change will feel its effects. If the gap analysis only covers the directly impacted, it misses the ripple effects." },
      { text: "Treating all resistance as a problem rather than a signal", detail: "Resistance is information. It tells you where the gap between the current state and the future state is most acutely felt. A gap analysis that dismisses resistance rather than investigating it is missing its most valuable data source." },
    ] as ListItem[],
  },
  {
    id: "process",
    num: "02",
    name: "Process",
    summary: "The gap between how work flows today and how it needs to flow in the future state.",
    what: "A process gap analysis compares actual workflows, handoffs, and decision points against what the future state requires. It identifies where current processes will break, where workarounds mask deeper problems, and where the distance between today and tomorrow is greatest. The focus is not just on what changes, but on how much change each process area needs to absorb.",
    questions: [
      { text: "Which processes need minor adjustments and which need fundamental redesign?", detail: "Not all process gaps are equal. Some require a tweak. Others require starting from scratch. A meaningful gap analysis categorises each process change by scale, because a minor adjustment and a fundamental redesign require completely different approaches." },
      { text: "Where are the handoffs that will break under the new operating model?", detail: "Handoffs between teams are where most process failures occur. If the future state changes how work moves between teams, every handoff point is a potential gap. Map them and assess how each one will be affected." },
      { text: "What workarounds exist today that will not survive the transition?", detail: "Workarounds are informal solutions to formal failures. If the change removes the conditions that made those workarounds possible, people will lose tools they depend on. The gap is not just about new processes. It is about what gets taken away." },
      { text: "How different is the day-to-day experience of work in the future state compared to today?", detail: "Zoom in to the task level. What does a typical Monday morning look like now, and what will it look like after the change? The greater the difference, the wider the gap, and the more support people will need to cross it." },
    ] as ListItem[],
    methods: [
      { text: "Side-by-side process mapping: current state vs future state", detail: "Create two maps and lay them next to each other. Highlight every difference. The volume and severity of differences is your process gap. Areas with the most differences need the most change management attention." },
      { text: "Workaround audit to identify informal processes at risk", detail: "Document every workaround people use today. For each one, assess whether the future state preserves, replaces, or eliminates it. Where workarounds are eliminated without a replacement, you have found a gap that will cause real pain." },
      { text: "Impact heat mapping by team and process area", detail: "Create a matrix of teams vs processes. Rate each cell by the scale of change required. This gives you a visual map of where process gaps are concentrated, and which teams are facing the most disruption simultaneously." },
    ] as ListItem[],
    blindSpots: [
      { text: "Mapping the future state process without validating the current state first", detail: "If your current state map is based on documentation rather than observation, your gap analysis is comparing a wish to a wish. Validate the current state through walk-throughs and shadowing before measuring the distance to the future." },
      { text: "Underestimating the number of processes affected", detail: "Change programs often scope narrowly. But processes are connected. A change in one area cascades into adjacent processes through handoffs, data flows, and dependencies. A gap analysis that does not follow these connections will undercount the gaps." },
      { text: "Assuming the future state process design is complete and correct", detail: "The future state process may itself have gaps, assumptions, or design flaws. A good process gap analysis questions both sides of the comparison, not just the current state." },
    ] as ListItem[],
  },
  {
    id: "culture",
    num: "03",
    name: "Culture",
    summary: "The gap between the culture that exists today and the culture the future state requires.",
    what: "A cultural gap analysis examines the behaviours, norms, values, and power dynamics that define how the organisation actually operates, and compares them against what the change demands. It asks: will the current culture support the change, resist it, or actively undermine it? This is the gap most often ignored and most often responsible for transformation failure.",
    questions: [
      { text: "What does the current culture reward, and does the change require different behaviours?", detail: "If the culture rewards individual performance and the change requires collaboration, there is a cultural gap. If the culture rewards caution and the change requires innovation, there is a cultural gap. The wider this gap, the more resistance you should expect." },
      { text: "How does the organisation handle disagreement and challenge today vs what the change needs?", detail: "If people cannot safely challenge decisions today, and the change requires open feedback and iteration, the gap is about psychological safety. This is not something that changes with a new process. It changes with leadership behaviour." },
      { text: "What is the emotional legacy of previous changes, and how far is it from the trust this change needs?", detail: "Organisational memory is long. If the last transformation was painful, poorly managed, or ultimately reversed, people will carry that into this one. The cultural gap includes the distance between that memory and the openness this change requires." },
      { text: "How aligned are the informal power structures with the direction of this change?", detail: "Formal authority says who makes decisions. Informal influence determines whether those decisions are adopted. If the informal power structures are misaligned with the change, the cultural gap is wider than the org chart suggests." },
    ] as ListItem[],
    methods: [
      { text: "Behavioural observation in meetings and decision-making forums", detail: "Culture is visible in how meetings are run, how decisions are made in practice, and how conflict is handled. Observe the current behaviours, then define what the future state requires. The difference is your cultural gap." },
      { text: "Story collection from people at different levels", detail: "Ask people to tell stories about the organisation. The themes across these stories reveal the lived culture. Then ask what stories the future state needs people to tell. The distance between the two is your gap." },
      { text: "Reward and recognition analysis: what gets reinforced today vs what needs to be reinforced tomorrow", detail: "Map the current KPIs, promotion criteria, and informal recognition patterns. Then define what the future state needs to reward. Where they contradict each other, you have found a cultural gap that the change program must address." },
    ] as ListItem[],
    blindSpots: [
      { text: "Assuming culture will shift once the new processes are in place", detail: "Culture does not follow process. It follows behaviour, reinforcement, and leadership example. If the gap analysis assumes culture will catch up, the change will be technically complete but behaviourally unchanged." },
      { text: "Treating culture as uniform across the organisation", detail: "Culture varies by team, by location, by function, and by level. A cultural gap analysis that treats the organisation as a monolith will miss the local variations that determine whether change lands or fails in specific areas." },
      { text: "Ignoring the culture of the change team itself", detail: "The team leading the change has its own culture, assumptions, and biases. If the change team operates in a way that is disconnected from the wider organisation, it will design solutions that make sense to them but not to the people who need to adopt them." },
    ] as ListItem[],
  },
  {
    id: "capability",
    num: "04",
    name: "Capability",
    summary: "The gap between what people can do today and what the future state requires them to do.",
    what: "A capability gap analysis identifies the specific skills, knowledge, behaviours, and confidence that people will need in the future state that they do not have today. This is not a training needs analysis. It is a deeper assessment of whether the workforce, including managers and leaders, is equipped to operate in a fundamentally different way.",
    questions: [
      { text: "What specific skills does the future state require that do not exist at scale today?", detail: "Be precise. Not just 'digital skills' or 'leadership capability'. What exactly do people need to be able to do? In what context? To what standard? Vague capability gaps lead to vague training programs that change nothing." },
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
    id: "systems",
    num: "05",
    name: "Systems",
    summary: "The gap between the technology and infrastructure that exists today and what the future state requires.",
    what: "A systems gap analysis examines the distance between the current technology landscape and what the future state demands. It looks at tools, data, integrations, and infrastructure, and asks whether the systems environment is ready to support the new way of working. Systems that are not ready will undermine adoption regardless of how well the people side is managed.",
    questions: [
      { text: "Which systems will be directly impacted, and what is the scale of change for each?", detail: "Create a complete inventory of affected systems. For each one, assess whether the change requires configuration, customisation, replacement, or retirement. The scale of change per system determines the complexity of the gap." },
      { text: "Where are people using workarounds because the current systems do not support them?", detail: "Shadow IT and manual workarounds tell you where the current systems fail. If the future state does not address these gaps, people will create new workarounds. If it removes old workarounds without replacing them, people will lose tools they depend on." },
      { text: "How ready is the data, not just the technology?", detail: "Systems run on data. If the data is inaccurate, incomplete, or siloed, a new system will amplify those problems. The gap between current data quality and what the future state needs is often the most underestimated systems gap." },
      { text: "What is the organisation's track record with technology change, and what does that tell you about this gap?", detail: "Past technology implementations leave a legacy. If the last one was painful, people will approach this one with scepticism. The gap includes not just the technical distance but the emotional and credibility distance created by history." },
    ] as ListItem[],
    methods: [
      { text: "End-user experience audit of current systems", detail: "Interview the people who use the systems daily, not the people who built them. Their experience reveals the real gaps between what the systems are designed to do and what people actually need them to do." },
      { text: "Data readiness assessment mapped against future state requirements", detail: "For each data set the future state depends on, assess accuracy, completeness, accessibility, and ownership. Where any of these fall short, you have found a systems gap that will affect adoption." },
      { text: "Integration and dependency mapping across affected systems", detail: "Map how systems connect to each other. If the change affects one system, follow the data flows and integrations to identify every other system that will be affected. The gap is often wider than the initial scope suggests." },
    ] as ListItem[],
    blindSpots: [
      { text: "Letting the technology team define the gap without end-user input", detail: "The technology team sees the architecture. End users see the experience. A systems gap analysis that only includes the technical perspective will miss the human factors that determine whether a system is actually adopted." },
      { text: "Assuming a new system will close a process gap", detail: "Technology amplifies whatever it is applied to. If you automate a broken process, you get a faster broken process. The systems gap analysis must account for process readiness, not just technical readiness." },
      { text: "Underestimating the emotional attachment people have to familiar tools", detail: "People build their routines, shortcuts, and sense of competence around the tools they use daily. Replacing those tools is not just a technical change. It is a personal change. The gap includes the distance between familiarity and the unknown." },
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
    { key: "people", label: "We have assessed the gap between how people feel today and what this change needs from them" },
    { key: "process", label: "We have mapped the gap between actual workflows and what the future state requires" },
    { key: "culture", label: "We have examined the gap between current behaviours and the culture the change demands" },
    { key: "capability", label: "We know specifically what people need to do differently, not just that they need training" },
    { key: "systems", label: "We have assessed the gap between current systems and what the future state depends on" },
    { key: "specific", label: "Our gaps are specific and measurable, not vague observations" },
    { key: "owners", label: "Each gap has a clear owner and a plan to close it before or during delivery" },
    { key: "linked", label: "Our gap analysis builds directly on our current state assessment" },
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
