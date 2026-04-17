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

interface EmbeddingSign {
  id: string;
  num: string;
  title: string;
  description: string;
  question: string;
  notYet: string;
  emerging: string;
  embedded: string;
}

interface MergerPhase {
  id: string;
  num: string;
  name: string;
  duration: string;
  focus: string;
  what: string;
  activities: ActionItem[];
  commonMistake: string;
}

/* ------------------------------------------------------------------ */
/*  Data: Culture Embedding Indicator                                  */
/* ------------------------------------------------------------------ */

const embeddingSigns: EmbeddingSign[] = [
  {
    id: "language",
    num: "01",
    title: "Language Has Changed",
    description:
      "People use new terminology naturally, not because they were told to but because it reflects how they now think. The old language sounds dated. When someone reverts to the old terms, others notice.",
    question: "In your organisation, has the language people use day-to-day shifted to reflect the change?",
    notYet: "People still use the old terms. The new language only appears in official communications.",
    emerging: "Some teams use the new language naturally. Others still default to old terms unless reminded.",
    embedded: "The new language is the default across the organisation. Old terms sound strange when someone uses them.",
  },
  {
    id: "behaviours",
    num: "02",
    title: "New Behaviours Are the Default",
    description:
      "People do things the new way without thinking about it. They are not following the new process because they were trained on it. They follow it because it is how things are done here now. The behaviour is automatic, not effortful.",
    question: "Are the new ways of working now the unconscious default, or do people still have to think about them?",
    notYet: "People revert to old behaviours when under pressure or when nobody is watching.",
    emerging: "Most people follow the new way most of the time, but it still requires conscious effort.",
    embedded: "The new behaviours are automatic. People do not think about it. It is simply how things work.",
  },
  {
    id: "old-ways",
    num: "03",
    title: "Old Ways Feel Strange",
    description:
      "When someone suggests reverting to the old approach, the reaction is not resistance but genuine confusion. Why would we go back to that? The old way is not remembered fondly. It is remembered as something that did not work as well.",
    question: "If someone suggested going back to the old way, how would people react?",
    notYet: "Many people would welcome going back. Some actively wish for it.",
    emerging: "Most people would not want to go back, but they could see why someone might suggest it.",
    embedded: "The idea of going back feels absurd. People cannot imagine doing it the old way again.",
  },
  {
    id: "new-starters",
    num: "04",
    title: "New Starters Learn It Naturally",
    description:
      "People who join the organisation after the change learn the new way as the way. They do not know there was an old way. They are not taught the change; they are taught the culture. The change has become invisible because it is now the norm.",
    question: "Do new starters learn the new ways as the norm, or are they told about a change that happened?",
    notYet: "New starters are explicitly taught the new way as a change from the old way. The history is still present.",
    emerging: "New starters mostly learn the new way as the norm, but some legacy language and processes persist.",
    embedded: "New starters have no idea there was ever a different way. The change is invisible to them.",
  },
  {
    id: "leadership-change",
    num: "05",
    title: "It Survives Leadership Change",
    description:
      "When the leaders who drove the change move on, the culture they built remains. This is the ultimate test. If the change was embedded in systems, processes, language, and behaviour, it survives the departure of its sponsors. If it was only sustained by leadership willpower, it evaporates.",
    question: "If the leaders who drove this change left tomorrow, would the change survive?",
    notYet: "The change depends heavily on specific leaders. If they left, the old culture would return quickly.",
    emerging: "The change would mostly survive, but some elements would drift without the original leaders.",
    embedded: "The change is in the walls. Leadership could turn over entirely and the culture would persist.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Culture Integration Framework for Mergers                    */
/* ------------------------------------------------------------------ */

const mergerPhases: MergerPhase[] = [
  {
    id: "discover",
    num: "01",
    name: "Cultural Discovery",
    duration: "Pre-deal to Day 1",
    focus: "Understand both cultures before trying to combine them",
    what: "Most mergers begin cultural integration after the deal closes. The ones that succeed begin before. Cultural discovery means mapping the values, assumptions, decision-making styles, and unwritten rules of both organisations. Not the values on the website. The values people actually live by. The gap between stated and lived culture is where merger risk hides.",
    activities: [
      { text: "Map the lived culture of both organisations across six dimensions", detail: "Decision-making speed, risk tolerance, hierarchy and authority, collaboration patterns, performance expectations, and conflict resolution. Use interviews, observation, and structured diagnostics. Do not rely on engagement surveys or values statements. They tell you what the culture aspires to be, not what it is." },
      { text: "Identify cultural overlaps and genuine incompatibilities", detail: "Not all cultural differences are problems. Some are complementary. An engineering-led culture combining with a customer-led culture can be powerful if managed well. The dangerous differences are those where one culture's core assumption directly contradicts the other's. Those must be surfaced and addressed, not ignored." },
      { text: "Assess which cultural elements are load-bearing", detail: "Every organisation has cultural elements that drive its success. These are non-negotiable. For a creative company, it might be autonomy. For a safety-critical organisation, it might be process discipline. Identify these before deciding what the combined culture should look like." },
    ],
    commonMistake: "Skipping cultural discovery entirely because the strategic rationale for the merger is so compelling that culture seems like a secondary concern. The majority of merger failures are attributed to cultural incompatibility, not strategic misalignment.",
  },
  {
    id: "design",
    num: "02",
    name: "Cultural Design",
    duration: "Day 1 to Month 3",
    focus: "Define what the combined culture should be and why",
    what: "Cultural design is the deliberate act of deciding what the combined organisation's culture will be. This is not about picking the best bits from each side, which is what most integration plans claim. It is about defining the cultural principles that will drive the combined entity's success, then designing the systems, structures, and leadership behaviours that will bring those principles to life.",
    activities: [
      { text: "Define three to five cultural principles for the combined organisation", detail: "These must be specific enough to guide decisions. Not just innovation but we pursue bold ideas and accept that many will fail. Not just accountability but every decision has a named owner who is empowered to act. Vague principles produce vague culture." },
      { text: "Design structural decisions to reinforce the desired culture", detail: "Culture is not created by memos. It is created by structures. If you want collaboration, design shared goals and cross-functional teams. If you want speed, reduce approval layers. If you want innovation, protect time and resources for experimentation. Every structural decision either reinforces or undermines the culture you are trying to build." },
      { text: "Establish cultural integration teams with members from both organisations", detail: "The combined culture cannot be designed by one side and imposed on the other. Both organisations must be represented in the design process. This is not about fairness, although that matters. It is about legitimacy. People will only adopt a culture they feel they had a hand in creating." },
    ],
    commonMistake: "Allowing the acquiring company's culture to dominate by default. The acquiring company assumes its culture is superior because it won the deal. This destroys the cultural assets of the acquired organisation and alienates its people, who are often the reason the acquisition happened in the first place.",
  },
  {
    id: "integrate",
    num: "03",
    name: "Cultural Integration",
    duration: "Month 3 to Month 12",
    focus: "Align systems, behaviours, and rituals to the new culture",
    what: "Integration is where the designed culture meets reality. It is the messy, difficult process of aligning two sets of processes, two sets of rituals, two sets of assumptions, and two sets of power structures into one coherent way of working. This is where most merger cultures are won or lost, because this is where people experience the real change.",
    activities: [
      { text: "Align performance management to reinforce the desired culture", detail: "What gets measured gets managed. If you want collaboration but still measure individual performance in isolation, you will get competition. If you want innovation but punish failure, you will get risk aversion. The performance system must reflect the culture, not contradict it." },
      { text: "Redesign rituals and routines to express the combined culture", detail: "Rituals are culture made visible. How meetings are run, how decisions are escalated, how success is celebrated, how conflicts are resolved. Each of these is a cultural statement. Design them deliberately for the combined organisation rather than letting them default to whichever side has more power." },
      { text: "Address cultural grievances openly rather than suppressing them", detail: "People from the acquired organisation will feel loss. People from the acquiring organisation will feel threatened. Both are valid. Creating safe spaces for these feelings to be expressed and acknowledged does not slow integration down. It speeds it up by preventing resentment from going underground." },
    ],
    commonMistake: "Declaring cultural integration complete after the org chart is finalised and the new systems are live. Systems integration is not cultural integration. People can use the same email system and still operate in completely different cultures.",
  },
  {
    id: "embed",
    num: "04",
    name: "Cultural Embedding",
    duration: "Month 12 to Month 36",
    focus: "Sustain the new culture until it becomes self-reinforcing",
    what: "Embedding is the long game. It is the period where the designed culture either takes root or withers. Most organisations lose patience during this phase because the visible integration work is done, the leadership team has moved on to the next priority, and the assumption is that culture will sort itself out. It will not. Culture that is not actively sustained reverts to whichever legacy culture had deeper roots.",
    activities: [
      { text: "Track cultural indicators at 6, 12, 18, and 24 months post-merger", detail: "Measure whether the designed cultural principles are showing up in behaviour, not just in surveys. Are decisions being made the new way? Are meetings running the new way? Are conflicts being resolved the new way? Behavioural evidence is the only reliable cultural indicator." },
      { text: "Invest in cultural onboarding for every new hire", detail: "New hires are the lifeblood of cultural embedding. If they learn the culture from people who are still carrying legacy assumptions, the new culture cannot establish itself. Design a cultural onboarding programme that teaches the combined culture, not as history but as how we do things here." },
      { text: "Celebrate and recognise behaviours that exemplify the combined culture", detail: "Stories are how culture spreads. Identify moments where people demonstrate the new cultural principles and make those moments visible. Not through a newsletter that nobody reads, but through leadership behaviour and peer recognition that people experience directly." },
    ],
    commonMistake: "Assuming that because the merger happened two years ago, cultural integration is complete. Research consistently shows that cultural embedding after a merger takes three to five years. Organisations that declare victory after one year often find legacy cultures reasserting themselves three years later.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Expandable Sections for the Three Topics                     */
/* ------------------------------------------------------------------ */

const invisibleCultureItems: ActionItem[] = [
  {
    text: "Culture is the collection of unwritten rules that people follow without being told",
    detail: "It is how decisions actually get made, not how the process says they should be made. It is what happens when the manager leaves the room. It is the gap between the values on the wall and the behaviours in the corridor. You cannot change culture by rewriting the values statement. You change it by changing the systems, incentives, and leadership behaviours that produce the culture.",
  },
  {
    text: "You make culture visible by observing behaviour, not by surveying attitudes",
    detail: "Surveys tell you what people think they should say about the culture. Observation tells you what the culture actually is. Watch how meetings start. Watch who speaks and who stays silent. Watch what happens when someone makes a mistake. Watch how information travels. These behaviours are the culture. They are visible if you know where to look.",
  },
  {
    text: "You measure culture through proxy indicators that track behaviour over time",
    detail: "Direct measurement of culture is impossible because culture is not a thing; it is a pattern. But you can measure its proxies: decision speed, escalation frequency, cross-functional collaboration rates, voluntary turnover by team, innovation pipeline activity, and the ratio of internal promotions to external hires. Changes in these indicators over time tell you whether the culture is shifting.",
  },
  {
    text: "Culture change requires changing the systems that produce the culture, not just the people within them",
    detail: "Training people to behave differently within the same system produces temporary compliance at best. If the reward system still promotes individual competition, no amount of teamwork training will create a collaborative culture. Culture is an output of systems. Change the systems and the culture follows. Change the people without changing the systems and the old culture absorbs the new people.",
  },
  {
    text: "The biggest risk in culture change is the assumption that declaring new values is the same as creating new culture",
    detail: "Organisations announce culture changes constantly. New values, new behaviours, new ways of working. The announcement creates an expectation. If the systems, structures, and leadership behaviours do not change to match, the gap between the announcement and reality does more damage than if the announcement had never been made. People become cynical, and cynicism is the most difficult cultural trait to reverse.",
  },
];

const embeddingMeaningItems: ActionItem[] = [
  {
    text: "Embedding means the change has moved from conscious effort to unconscious habit",
    detail: "When a change is first introduced, people have to think about doing things differently. They have to remember the new process, choose the new behaviour, use the new language. Embedding is complete when thinking is no longer required. The new way has become the default way. This transition from effortful to automatic is the essence of cultural embedding.",
  },
  {
    text: "You know change is embedded when it survives stress",
    detail: "Under pressure, people revert to their deepest habits. If the new way of working collapses when the quarter-end crunch hits, it was not embedded. It was merely adopted. Genuine embedding means the new behaviours hold even when people are busy, stressed, and distracted. Stress is the most reliable test of whether change has reached the cultural level.",
  },
  {
    text: "Embedding requires sustained reinforcement for far longer than most programmes plan for",
    detail: "Research on habit formation suggests that embedding a new behaviour takes anywhere from two months to over eight months, depending on complexity. Organisational culture change involves hundreds of interconnected behaviours across thousands of people. The idea that a culture change can be embedded in a single programme cycle is unrealistic. Most successful culture changes are sustained over three to five years.",
  },
  {
    text: "The systems must make the new way easier than the old way",
    detail: "If the new way of working requires more effort, more steps, or more approvals than the old way, it will not embed. People optimise for ease, not for compliance. The most effective cultural embedding happens when the systems, tools, and processes are designed so that the new behaviour is the path of least resistance. Make the right thing the easy thing.",
  },
  {
    text: "Leaders must model the embedded culture consistently, not just during the programme",
    detail: "Culture takes its cue from leadership behaviour, particularly leadership behaviour under pressure. A leader who espouses the new values in town halls but reverts to the old style in private meetings sends a clear signal: the new culture is performance, not reality. Embedding requires leaders to live the culture in every interaction, not just the visible ones.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Case Studies                                                 */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Disney-Pixar",
    headline: "How Disney preserved Pixar's culture and revitalised its own animation in the process",
    hook: "A $7.4 billion acquisition that succeeded because the buyer protected what it was buying.",
    dimension: "Merger Culture Success",
    body: [
      "When Disney acquired Pixar in 2006 for $7.4 billion, the conventional wisdom was that Disney's corporate machinery would crush Pixar's creative culture. The history of acquisitions destroying creative companies was long and well-documented. Disney did the opposite.",
      "The critical decision was structural separation. Ed Catmull and John Lasseter, Pixar's leaders, were retained and given authority over both Pixar and Disney Animation Studios. Pixar's Emeryville campus remained independent. Its creative processes, its flat hierarchy, its Braintrust review system where directors receive candid feedback from peers, were all preserved. Disney did not import its own management practices into Pixar.",
      "Instead, Disney studied what made Pixar's culture work and selectively applied those principles to its own struggling animation division. The Braintrust model was adapted for Disney Animation. The emphasis on story over technology was reinforced. The willingness to restart a film that was not working, something Pixar had done with Toy Story 2 and Ratatouille, was adopted by Disney.",
      "The result was a revitalisation of Disney Animation that produced Tangled, Frozen, Moana, and Encanto. Pixar continued to produce critically acclaimed work. The merger succeeded where most fail because Disney recognised that the culture was the asset, and destroying it to achieve integration would destroy the value they had paid $7.4 billion for.",
    ],
    lesson: "The Disney-Pixar case demonstrates that cultural integration does not always mean cultural unification. Sometimes the right approach is to protect the acquired culture, learn from it, and let both cultures strengthen each other while maintaining their distinct identities.",
    source: "https://mnacommunity.com/insights/disney-and-pixar-merger/",
    sourceLabel: "M&A Community",
  },
  {
    label: "Daimler-Chrysler",
    headline: "The $36 billion merger that collapsed because nobody addressed the cultural divide",
    hook: "A merger of equals that was neither equal nor a merger. It was a cultural collision.",
    dimension: "Merger Culture Failure",
    body: [
      "In 1998, Daimler-Benz and Chrysler merged in a deal valued at $36 billion, presented as a merger of equals that would create a global automotive powerhouse. Within a decade, Daimler sold Chrysler for $7.4 billion, a loss that represented one of the most expensive cultural failures in corporate history.",
      "The cultural divide was fundamental and went unaddressed from the start. Daimler-Benz operated with German precision: hierarchical decision-making, methodical engineering processes, formal communication, and conservative risk management. Chrysler was American entrepreneurial: flat structures, rapid decision-making, informal collaboration, and creative risk-taking. These were not complementary differences. They were incompatible operating assumptions.",
      "The merger of equals framing made things worse. In practice, Daimler was the dominant party, but the pretence of equality meant that cultural conflicts were not addressed openly. German executives expected deference to hierarchy. American executives expected collaborative debate. Meetings became battlegrounds of style rather than substance. Decision-making stalled as both sides tried to impose their approach without acknowledging the conflict.",
      "The human cost was severe. Chrysler lost many of its most talented executives and engineers within the first two years, taking with them the entrepreneurial culture that had made Chrysler innovative. By the time Daimler acknowledged the cultural failure, the damage was irreversible. The people who carried Chrysler's culture had left, and no structural integration could replace what had been lost.",
    ],
    lesson: "Daimler-Chrysler demonstrates that cultural incompatibility is not a soft issue. It is a structural risk that can destroy billions in value. The failure was not that the cultures were different. It was that the differences were never honestly assessed, openly discussed, or deliberately managed.",
    source: "https://www.crossculture.com/cross-cultural-issues-at-the-daimlerchrysler-merge-case-study/",
    sourceLabel: "Cross Culture",
  },
  {
    label: "Microsoft",
    headline: "How Satya Nadella turned a know-it-all culture into a learn-it-all culture",
    hook: "Microsoft's market value grew from $300 billion to over $2.5 trillion. The first thing Nadella changed was the culture.",
    dimension: "Culture Transformation",
    body: [
      "When Satya Nadella became CEO of Microsoft in 2014, the company was technically profitable but culturally stagnant. Internal competition was fierce. The stack ranking system pitted employees against each other. Teams operated in silos, guarding their products and budgets rather than collaborating. The dominant cultural assumption was that being right mattered more than learning, and protecting your territory mattered more than serving customers.",
      "Nadella's diagnosis was that Microsoft had a know-it-all culture when it needed a learn-it-all culture. This was not a slogan. It was an operating principle that he embedded into every system he could reach. He eliminated stack ranking. He restructured leadership teams to promote collaboration. He reframed failure as learning. He made growth mindset, borrowed from psychologist Carol Dweck, the foundation of the company's cultural identity.",
      "Critically, Nadella changed the systems, not just the language. The performance management system was rebuilt to reward collaboration and learning. The product strategy shifted from protecting Windows to embracing cloud and open source, a strategic move that was only possible because the culture now supported it. He made Microsoft Teams and Azure the focal points, requiring cross-organisational collaboration that the old culture would have blocked.",
      "The cultural transformation took years, not quarters. Nadella was consistent and patient. He modelled the culture he wanted. He told personal stories about learning and vulnerability. He made cultural alignment a criterion for leadership appointments. By the time Microsoft's market capitalisation had tripled, the culture change was not just a programme. It was the company's identity.",
    ],
    lesson: "Microsoft demonstrates that culture change at scale is possible but requires a leader who is willing to change the systems, not just the messaging. Nadella did not ask people to change their mindset. He changed the structures, incentives, and leadership expectations that had produced the old mindset, and the new culture followed.",
    source: "https://www.harvardbusiness.org/wp-content/uploads/2023/11/Session-3_Microsoft-Case_HK_Caslin-Liu.pdf",
    sourceLabel: "Harvard Business",
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable: ExpandableList                                           */
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
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CultureIntegration() {
  const [embeddingAssessments, setEmbeddingAssessments] = useState<Record<string, string>>({});
  const [activeMergerPhase, setActiveMergerPhase] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  /* Culture Embedding Indicator scoring */
  const assessedCount = Object.keys(embeddingAssessments).length;
  const embeddedCount = Object.values(embeddingAssessments).filter((v) => v === "embedded").length;
  const emergingCount = Object.values(embeddingAssessments).filter((v) => v === "emerging").length;
  const notYetCount = Object.values(embeddingAssessments).filter((v) => v === "notYet").length;

  /* Checklist items */
  const checkItems = [
    { key: "mapped", label: "We have mapped our current culture through observation and behaviour, not just surveys" },
    { key: "systems", label: "We are changing the systems that produce culture, not just asking people to behave differently" },
    { key: "proxies", label: "We have defined cultural proxy indicators and are tracking them over time" },
    { key: "leadership", label: "Leaders are modelling the desired culture consistently, including under pressure" },
    { key: "rituals", label: "We have deliberately redesigned rituals and routines to express the new culture" },
    { key: "performance", label: "Our performance management system reinforces the cultural shift, not the old culture" },
    { key: "onboarding", label: "New starters learn the new culture as the norm, not as a change from something else" },
    { key: "stress-test", label: "The new behaviours hold even when people are busy, stressed, or under pressure" },
    { key: "timeline", label: "We have planned for cultural embedding over years, not months" },
    { key: "survive", label: "The culture change would survive if the leaders who initiated it moved on tomorrow" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const mergerPhaseColours = ["#6B7280", "#B8860B", "#2E6B4F", "#0A1628"];

  return (
    <>
      <Nav />

      {/* ---------------------------------------------------------------- */}
      {/*  HEADER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Sustainment &middot; Culture Integration</span>
          <h1 className="article-title">How do you embed change into culture when culture is the hardest thing to see, measure, or shift?</h1>
          <p className="article-intro">
            Culture is the invisible architecture of every organisation. It determines how decisions are really made, what behaviours are really rewarded, and whether change sticks or slides. Yet most change programmes treat culture as an afterthought, something that will follow once the systems and structures are in place. It will not. Culture must be understood, designed for, and deliberately sustained. This article covers three questions that sit at the heart of sustainable change: how you change something you cannot easily see, how mergers succeed by putting culture first, and what it actually means for change to become culturally embedded.
          </p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
        <div className="article-main">

          {/* ------------------------------------------------------------ */}
          {/*  TOPIC 1: Changing culture you cannot see                     */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">How Do You Change Culture When You Cannot See It, Touch It, or Measure It Easily?</h2>
              <p className="article-section-desc">
                Culture is not a thing you can point at. It is a pattern of shared assumptions, behaviours, and unwritten rules that people follow without being explicitly told. You cannot put it on a spreadsheet. You cannot install it like software. And you certainly cannot change it by sending an email announcing new values. But you can make it visible, you can understand what produces it, and you can change the conditions that sustain it. The difficulty is not that culture is unchangeable. It is that most organisations try to change the symptoms rather than the systems.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Making the Invisible Visible</h3>
                <ExpandableList items={invisibleCultureItems} />
              </div>
            </ScrollReveal>
          </section>

          {/* ------------------------------------------------------------ */}
          {/*  TOPIC 2: Merger Culture Integration Framework                */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">How Did a Merger Succeed Where Most Fail, by Focusing on Culture First?</h2>
              <p className="article-section-desc">
                Between 70 and 90 percent of mergers fail to deliver their intended value, and the most frequently cited reason is cultural incompatibility. Not strategic misalignment. Not financial modelling errors. Culture. The mergers that succeed are the ones that treat culture as a first-order integration challenge, not as something that will sort itself out once the org charts are drawn and the systems are connected. Below is a framework for cultural integration during a merger, drawn from the patterns that distinguish successful integrations from expensive failures.
              </p>
            </ScrollReveal>

            <div className="staircase">
              {mergerPhases.map((p, i) => (
                <ScrollReveal key={p.id} direction="up" delay={i * 80}>
                  <button
                    className={`stair${activeMergerPhase === p.id ? " stair-active" : ""}`}
                    style={{
                      "--stair-colour": mergerPhaseColours[i],
                      marginLeft: `${i * 48}px`,
                    } as React.CSSProperties}
                    onClick={() => setActiveMergerPhase(activeMergerPhase === p.id ? null : p.id)}
                  >
                    <span className="stair-level">{p.num}</span>
                    <span className="stair-name">{p.name}</span>
                    <span className="stair-tagline">{p.duration}: {p.focus}</span>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {activeMergerPhase && (
            <section className="article-section dimension-detail">
              {mergerPhases.filter((p) => p.id === activeMergerPhase).map((p) => (
                <div key={p.id}>
                  <ScrollReveal direction="up">
                    <div className="detail-header">
                      <span className="dimension-num-lg">{p.num}</span>
                      <h2 className="detail-title">{p.name}</h2>
                    </div>
                    <p style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "16px" }}>{p.duration}</p>
                    <p className="detail-body">{p.what}</p>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={100}>
                    <div className="detail-block">
                      <h3 className="detail-block-title">Key Activities</h3>
                      <ExpandableList items={p.activities} />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={200}>
                    <div className="detail-block detail-block-warning">
                      <h3 className="detail-block-title">The Most Common Mistake</h3>
                      <p className="detail-body" style={{ marginBottom: 0 }}>{p.commonMistake}</p>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </section>
          )}

          {/* ------------------------------------------------------------ */}
          {/*  TOPIC 3: Embedding Change Into Culture                       */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">What Does It Actually Mean to Embed Change into Culture, and How Do You Know When It Has Happened?</h2>
              <p className="article-section-desc">
                Embedding is the word everyone uses and few define. It is the difference between a change that was implemented and a change that became part of who the organisation is. Implementation puts new systems in place. Embedding makes those systems the way things are done here. The gap between the two is where most change programmes fail, not because the implementation was poor, but because nobody planned for what comes after.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">What Embedding Means in Practice</h3>
                <ExpandableList items={embeddingMeaningItems} />
              </div>
            </ScrollReveal>
          </section>

          {/* ------------------------------------------------------------ */}
          {/*  INTERACTIVE: Culture Embedding Indicator                     */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Culture Embedding Indicator</h2>
              <p className="article-section-desc">
                Five signs that a change is culturally embedded. For each one, assess where your organisation stands right now. This is not a score to optimise. It is a diagnostic to show you where embedding is happening and where it is not.
              </p>
            </ScrollReveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {embeddingSigns.map((sign, i) => (
                <ScrollReveal key={sign.id} direction="up" delay={i * 80}>
                  <div
                    style={{
                      background: "var(--navy-light, #0f1f38)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "32px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--ui)", fontSize: "12px", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.08em" }}>{sign.num}</span>
                      <h3 style={{ fontFamily: "var(--head)", fontSize: "20px", fontWeight: 600, color: "#fff", margin: 0 }}>{sign.title}</h3>
                    </div>
                    <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "20px" }}>{sign.description}</p>
                    <p style={{ fontFamily: "var(--ui)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.9)", marginBottom: "16px" }}>{sign.question}</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { value: "notYet", label: "Not Yet", description: sign.notYet, colour: "#dc2626" },
                        { value: "emerging", label: "Emerging", description: sign.emerging, colour: "#B8860B" },
                        { value: "embedded", label: "Embedded", description: sign.embedded, colour: "#2E6B4F" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            setEmbeddingAssessments((prev) => ({
                              ...prev,
                              [sign.id]: prev[sign.id] === option.value ? "" : option.value,
                            }))
                          }
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            border: embeddingAssessments[sign.id] === option.value ? `2px solid ${option.colour}` : "1px solid rgba(255,255,255,0.1)",
                            background: embeddingAssessments[sign.id] === option.value ? `${option.colour}18` : "transparent",
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "18px",
                              height: "18px",
                              minWidth: "18px",
                              borderRadius: "50%",
                              border: embeddingAssessments[sign.id] === option.value ? `2px solid ${option.colour}` : "2px solid rgba(255,255,255,0.25)",
                              background: embeddingAssessments[sign.id] === option.value ? option.colour : "transparent",
                              marginTop: "2px",
                              transition: "all 0.2s ease",
                            }}
                          />
                          <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontFamily: "var(--ui)", fontSize: "13px", fontWeight: 600, color: embeddingAssessments[sign.id] === option.value ? option.colour : "rgba(255,255,255,0.7)" }}>{option.label}</span>
                            <span style={{ fontFamily: "var(--body)", fontSize: "13px", lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}>{option.description}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Embedding Indicator Summary */}
            {assessedCount > 0 && (
              <ScrollReveal direction="up" delay={100}>
                <div
                  style={{
                    marginTop: "32px",
                    background: "var(--navy-light, #0f1f38)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "32px",
                  }}
                >
                  <h3 style={{ fontFamily: "var(--head)", fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "20px" }}>Your Culture Embedding Assessment</h3>

                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: "#2E6B4F" }} />
                      <span style={{ fontFamily: "var(--ui)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Embedded: {embeddedCount}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: "#B8860B" }} />
                      <span style={{ fontFamily: "var(--ui)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Emerging: {emergingCount}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: "#dc2626" }} />
                      <span style={{ fontFamily: "var(--ui)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Not Yet: {notYetCount}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", background: "rgba(255,255,255,0.06)", marginBottom: "20px" }}>
                    {embeddedCount > 0 && (
                      <div style={{ width: `${(embeddedCount / 5) * 100}%`, background: "#2E6B4F", transition: "width 0.4s ease" }} />
                    )}
                    {emergingCount > 0 && (
                      <div style={{ width: `${(emergingCount / 5) * 100}%`, background: "#B8860B", transition: "width 0.4s ease" }} />
                    )}
                    {notYetCount > 0 && (
                      <div style={{ width: `${(notYetCount / 5) * 100}%`, background: "#dc2626", transition: "width 0.4s ease" }} />
                    )}
                  </div>

                  <p style={{ fontFamily: "var(--body)", fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: 0 }}>
                    {assessedCount < 5 && (
                      <>You have assessed {assessedCount} of 5 signs. Complete the remaining assessments to get a full picture of your cultural embedding.</>
                    )}
                    {assessedCount === 5 && embeddedCount === 5 && (
                      <>All five signs indicate full cultural embedding. The change has become part of how your organisation thinks and operates. This is rare and worth protecting.</>
                    )}
                    {assessedCount === 5 && embeddedCount >= 3 && embeddedCount < 5 && (
                      <>Strong cultural embedding with some areas still developing. Focus on the signs marked as emerging or not yet. These are the areas where the change is most vulnerable to reversal.</>
                    )}
                    {assessedCount === 5 && embeddedCount >= 1 && embeddedCount < 3 && (
                      <>The change is partially embedded. Some signs are present, but the culture has not fully shifted. Continue reinforcing through systems, leadership behaviour, and sustained attention. This is the phase where most organisations lose patience.</>
                    )}
                    {assessedCount === 5 && embeddedCount === 0 && emergingCount > 0 && (
                      <>The change is emerging but not yet embedded. This is normal and it takes time. Focus on the systems and structures that produce the behaviours you want, not on asking people to try harder.</>
                    )}
                    {assessedCount === 5 && embeddedCount === 0 && emergingCount === 0 && (
                      <>None of the five signs of cultural embedding are present. The change may have been implemented but has not reached the cultural level. This requires a fundamental reassessment of the approach, starting with the systems and incentives that are sustaining the old culture.</>
                    )}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </section>

          {/* ------------------------------------------------------------ */}
          {/*  SELF-CHECK CHECKLIST                                         */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Is Your Culture Change Designed to Last?</h2>
              <p className="article-section-desc">
                Use this checklist to assess whether your culture change programme is addressing the conditions for genuine embedding, or whether it is focused on the visible surface while leaving the underlying systems unchanged.
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
                      <span className="check-complete"> &mdash; Your culture change is designed for genuine, lasting embedding. Sustain the discipline.</span>
                    )}
                    {checkedCount >= 7 && checkedCount < checkItems.length && (
                      <span className="check-partial"> &mdash; Strong foundations. Address the remaining gaps before they become the places where the old culture reasserts itself.</span>
                    )}
                    {checkedCount >= 4 && checkedCount < 7 && (
                      <span className="check-partial"> &mdash; Some elements are in place, but significant gaps remain. The culture change may stick in some areas and fail in others.</span>
                    )}
                    {checkedCount > 0 && checkedCount < 4 && (
                      <span className="check-partial"> &mdash; The culture change is at risk. Most of the conditions for embedding are not yet in place. Focus on systems and leadership behaviour first.</span>
                    )}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ------------------------------------------------------------ */}
          {/*  CTA                                                          */}
          {/* ------------------------------------------------------------ */}
          <section className="article-section article-cta">
            <ScrollReveal direction="up">
              <p className="article-cta-text">This topic is part of <strong>Sustainment</strong>, the fifth pillar of the TCA Change Model.</p>
              <Link href="/knowledge" className="btn">Explore the Full Model</Link>
            </ScrollReveal>
          </section>

        </div>

        {/* -------------------------------------------------------------- */}
        {/*  SIDEBAR: Enterprise Examples                                   */}
        {/* -------------------------------------------------------------- */}
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

      {/* ---------------------------------------------------------------- */}
      {/*  CASE STUDY MODAL                                                */}
      {/* ---------------------------------------------------------------- */}
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
