"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const spectrumItems = [
  {
    theme: "Framing the Problem",
    fear: "If we do not change, we will fail. Competitors will overtake us. Jobs will be at risk.",
    purpose: "The world is shifting. We have an opportunity to lead that shift rather than react to it.",
  },
  {
    theme: "Describing the Future",
    fear: "We cannot afford to stay where we are. The cost of inaction is too high.",
    purpose: "Here is what we are building together, and here is why it matters for you and for the people we serve.",
  },
  {
    theme: "Addressing People",
    fear: "Everyone needs to get on board. There is no room for resistance.",
    purpose: "We know this is difficult. We know what you are giving up. We will support you through it.",
  },
  {
    theme: "Creating Urgency",
    fear: "We are running out of time. If we do not act now, the window closes.",
    purpose: "The conditions are right for this change now. Waiting will not make it easier, it will make it harder.",
  },
  {
    theme: "Handling Doubt",
    fear: "This has been decided. We need commitment, not questions.",
    purpose: "Your concerns are legitimate. We would rather hear them now than discover them later.",
  },
  {
    theme: "Measuring Progress",
    fear: "We will be tracking who is on board and who is not.",
    purpose: "We will be measuring whether people feel equipped and supported, not just whether they have complied.",
  },
];

interface NarrativeElement {
  id: string;
  name: string;
  question: string;
  description: string;
  fearVersion: string;
  purposeVersion: string;
  guidance: string;
}

const narrativeElements: NarrativeElement[] = [
  {
    id: "why",
    name: "The Why",
    question: "Why are we changing?",
    description: "The honest, human reason for the change. Not the business case. Not the strategic rationale. The reason that connects to what people care about.",
    fearVersion: "We are losing market share. If we do not transform, we risk becoming irrelevant.",
    purposeVersion: "Our customers are changing. The way they need us to show up is different from how we have been showing up. This is about staying useful to the people we exist to serve.",
    guidance: "The 'why' should pass a simple test: would a frontline employee find this meaningful? If it only resonates in a boardroom, it is not a narrative. It is a strategy slide.",
  },
  {
    id: "what",
    name: "The What",
    question: "What is actually changing?",
    description: "A specific, honest description of what will be different. Not corporate language. Concrete changes that people can picture in their daily work.",
    fearVersion: "We are implementing a new operating model. All teams will be restructured by Q3.",
    purposeVersion: "The way we work together will change. Teams that currently operate separately will need to collaborate on shared goals. Your daily interactions, decision-making processes, and measures of success will shift.",
    guidance: "People need to picture what Monday morning looks like after the change. If the 'what' is abstract, they will fill the gap with their worst fears.",
  },
  {
    id: "who",
    name: "The Who",
    question: "Who is affected, and who is leading this?",
    description: "Clarity on who the change impacts, who is responsible for making it happen, and who people can turn to when they need support.",
    fearVersion: "This affects everyone. Leadership expects full commitment across the organisation.",
    purposeVersion: "These are the teams most directly affected, and here is what the change means for each of them specifically. Here is who is leading this, and here is how you can reach them.",
    guidance: "Vague language like 'this affects everyone' creates anxiety. Specificity creates clarity. Name the groups, name the leaders, and be clear about what support looks like.",
  },
  {
    id: "loss",
    name: "The Loss",
    question: "What are we giving up?",
    description: "Every change involves loss. Acknowledging it honestly builds more trust than any amount of positive messaging.",
    fearVersion: "(Not mentioned. The narrative focuses exclusively on the future.)",
    purposeVersion: "We know this means letting go of things that work well today. We know some of you have built your expertise around the current way of doing things. That experience is valued, and it will not be wasted.",
    guidance: "When leaders refuse to acknowledge loss, people feel unseen. When they acknowledge it directly, people feel respected. This is one of the highest-leverage elements of a change narrative.",
  },
  {
    id: "support",
    name: "The Support",
    question: "How will we be supported through this?",
    description: "Concrete commitments to how the organisation will equip and support people, not vague promises.",
    fearVersion: "Training will be provided. Resources are available on the intranet.",
    purposeVersion: "Your managers have been briefed on what this change means for your team specifically. There will be dedicated time to learn. There will be space to ask questions, raise concerns, and tell us if something is not working.",
    guidance: "People do not need to know every detail of the enablement plan. They need to know that one exists, that it is specific to them, and that someone is responsible for making it work.",
  },
];

const caseStudies = [
  {
    label: "Nokia",
    headline: "The burning platform memo that burned the platform",
    hook: "Stephen Elop told Nokia it was standing on a burning platform. Then he jumped to Microsoft.",
    dimension: "Fear-Based Urgency",
    body: [
      "In February 2011, Nokia CEO Stephen Elop issued his now-famous 'Burning Platform' memo. He described Nokia as a man standing on a burning oil platform in the North Sea, forced to jump into freezing water. The metaphor was vivid. The message was clear: Nokia was in crisis and must change or die.",
      "The memo acknowledged real problems: Nokia was losing smartphone market share to Apple and Android. Its Symbian operating system could not compete. The diagnosis was accurate. But the narrative was pure fear. There was no compelling vision of where Nokia was going, only a declaration that where it stood was on fire.",
      "The response within Nokia was demoralisation, not mobilisation. Developers began leaving for competitors. Partners lost confidence. The fear-based narrative closed off options rather than opening them. Elop announced a partnership with Microsoft to adopt Windows Phone, a decision made with little internal consensus-building.",
      "Windows Phone failed to gain meaningful market share. Nokia's mobile division was sold to Microsoft in 2014 for $7.2 billion. Microsoft subsequently wrote off most of the acquisition. The burning platform did not motivate action. It created paralysis, then resignation.",
    ],
    lesson: "Elop's burning platform memo is the textbook case of fear-based urgency backfiring. The diagnosis was correct, but the narrative offered no purpose, no vision of the future, and no invitation to contribute. Fear without purpose produces flight, not commitment.",
    source: "https://www.lightreading.com/business-management/nokia-s-burning-platform-memo",
    sourceLabel: "Light Reading",
  },
  {
    label: "CVS Health",
    headline: "CVS dropped $2 billion in tobacco revenue to build a narrative that changed healthcare",
    hook: "They killed their most profitable product line. Then told everyone exactly why.",
    dimension: "Purpose-Based Urgency",
    body: [
      "In 2014, CVS Health made a decision that stunned the retail industry: it stopped selling tobacco products across all its stores. Tobacco was a $2 billion annual business. The decision was not forced by regulation. It was a strategic choice.",
      "The narrative was not built on fear. It was built on purpose. CVS was transforming from a retail pharmacy into an integrated healthcare company. The leadership team concluded that selling cigarettes was fundamentally incompatible with a company that wanted to be trusted as a healthcare provider. The narrative was simple: we cannot help people get healthy while selling them products that kill them.",
      "CEO Larry Merlo communicated the decision directly and personally. The message connected the business strategy to a human purpose that every employee and customer could understand. The narrative acknowledged the financial cost openly, which built credibility.",
      "The result was transformational. CVS rebranded to CVS Health, acquired Aetna for $69 billion, launched MinuteClinic, and repositioned itself as a healthcare company rather than a retailer. The purpose-driven narrative gave employees a reason to believe in the direction and customers a reason to trust the brand.",
    ],
    lesson: "CVS demonstrates that the most powerful urgency is not fear of what you might lose, but clarity about what you are becoming. By making a visible sacrifice that aligned with the narrative, leadership proved their commitment in a way that no memo could.",
    source: "https://www.salesfully.com/single-post/case-study-the-transformation-of-cvs-health",
    sourceLabel: "Salesfully",
  },
  {
    label: "Patagonia",
    headline: "'Don't Buy This Jacket': how Patagonia built the most counterintuitive change narrative in business",
    hook: "They told customers to stop buying their products. Sales went up 30%.",
    dimension: "Narrative as Identity",
    body: [
      "On Black Friday 2011, Patagonia ran a full-page ad in the New York Times with a picture of one of their jackets and the headline: 'Don't Buy This Jacket.' The ad explained the environmental cost of producing the jacket and asked consumers to think twice before purchasing anything, including from Patagonia.",
      "The narrative was radical, honest, and completely aligned with the company's purpose. Patagonia was not trying to create urgency through fear. It was inviting its community into a shared commitment to environmental responsibility. The 'burning platform' was the planet, but the response was not panic. It was purpose.",
      "Sales increased 30% following the campaign. Not because people ignored the message, but because they respected it. The narrative built trust by prioritising honesty over short-term revenue. In 2022, founder Yvon Chouinard transferred ownership of the entire company to a trust dedicated to fighting climate change, declaring 'Earth is now our only shareholder.'",
      "Patagonia, now valued at $3 billion, demonstrates that the most compelling change narratives do not tell people what to fear. They tell people what to stand for.",
    ],
    lesson: "Patagonia proves that urgency does not require fear. The most motivating narratives give people something to believe in, an identity to adopt, and a purpose to rally around. When people see themselves in the narrative, they do not need to be pushed. They move.",
    source: "https://www.mckinsey.com/industries/agriculture/our-insights/patagonia-shows-how-turning-a-profit-doesnt-have-to-cost-the-earth",
    sourceLabel: "McKinsey",
  },
];

export default function BurningPlatform() {
  const [spectrumAnswers, setSpectrumAnswers] = useState<Record<number, "fear" | "purpose">>({});
  const [showSpectrumResult, setShowSpectrumResult] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const allSpectrumAnswered = Object.keys(spectrumAnswers).length === spectrumItems.length;
  const purposeCount = Object.values(spectrumAnswers).filter(a => a === "purpose").length;
  const fearCount = Object.values(spectrumAnswers).filter(a => a === "fear").length;
  const purposePercent = allSpectrumAnswered ? Math.round((purposeCount / spectrumItems.length) * 100) : 0;

  function getSpectrumResult() {
    if (purposePercent >= 84) return { title: "Purpose-Driven", desc: "Your narrative is grounded in meaning and direction. People will move towards it because they understand why it matters and what they are building together." };
    if (purposePercent >= 50) return { title: "Leaning Purpose", desc: "Your narrative has a strong foundation but still relies on fear in some areas. Review where you chose the left column. Those are the areas where you can replace threat with meaning." };
    if (purposePercent >= 17) return { title: "Leaning Fear", desc: "Your narrative relies more on what could go wrong than on what you are building. This may create short-term compliance but will struggle to sustain commitment. Reframe the urgency around purpose." };
    return { title: "Fear-Driven", desc: "Your narrative is built on threat. People may comply, but they will not commit. The urgency is real, but the way you are communicating it is producing anxiety rather than action. Start with why this change matters, not why the status quo is dangerous." };
  }

  const checkItems = [
    { key: "why", label: "Our narrative explains why the change matters in human terms, not just business terms" },
    { key: "specific", label: "People can describe what will actually change for them in their daily work" },
    { key: "loss", label: "We have explicitly acknowledged what people are giving up, not just what they are gaining" },
    { key: "leader", label: "A senior leader has delivered the narrative in their own words, not from a script" },
    { key: "listened", label: "We have tested the narrative with impacted people and adjusted based on their feedback" },
    { key: "support", label: "The narrative includes specific commitments to support, not just vague promises" },
    { key: "consistent", label: "The narrative is consistent across channels, leaders, and levels of the organisation" },
    { key: "honest", label: "The narrative is honest about uncertainty rather than pretending everything is planned" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Direction &middot; Strategic Narrative</span>
          <h1 className="article-title">How to build a burning platform that motivates action without creating fear</h1>
          <p className="article-intro">The burning platform is one of the most overused metaphors in change management. The idea is simple: create enough urgency that people feel compelled to move. The problem is that urgency built on fear produces compliance, not commitment. People jump because they are afraid, not because they know where they are going. A compelling change narrative does something different. It creates urgency through purpose.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* FEAR VS PURPOSE SPECTRUM */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Fear or Purpose?</h2>
          <p className="article-section-desc">For each pair, choose the statement that sounds more like your current change narrative. This will show you whether your approach leans towards fear or purpose.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="assessment-pairs">
            {spectrumItems.map((item, i) => (
              <div key={i} className="pair-row">
                <span className="pair-theme">{item.theme}</span>
                <div className="pair-options">
                  <button
                    className={`pair-option pair-option-manager${spectrumAnswers[i] === "fear" ? " pair-selected" : ""}`}
                    onClick={() => setSpectrumAnswers(prev => ({ ...prev, [i]: "fear" }))}
                  >
                    {item.fear}
                  </button>
                  <span className="pair-vs">or</span>
                  <button
                    className={`pair-option pair-option-leader${spectrumAnswers[i] === "purpose" ? " pair-selected" : ""}`}
                    onClick={() => setSpectrumAnswers(prev => ({ ...prev, [i]: "purpose" }))}
                  >
                    {item.purpose}
                  </button>
                </div>
              </div>
            ))}

            {allSpectrumAnswered && !showSpectrumResult && (
              <button className="btn" style={{ marginTop: "28px" }} onClick={() => setShowSpectrumResult(true)}>
                See My Result
              </button>
            )}

            {showSpectrumResult && (
              <div className="assessment-result">
                <div className="assessment-bar">
                  <div className="assessment-bar-manager" style={{ width: `${100 - purposePercent}%` }}>
                    <span>Fear {fearCount}/{spectrumItems.length}</span>
                  </div>
                  <div className="assessment-bar-leader" style={{ width: `${purposePercent}%` }}>
                    <span>Purpose {purposeCount}/{spectrumItems.length}</span>
                  </div>
                </div>
                <h3 className="assessment-result-title">{getSpectrumResult().title}</h3>
                <p className="assessment-result-desc">{getSpectrumResult().desc}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ANATOMY OF A NARRATIVE */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">The Anatomy of a Compelling Change Narrative</h2>
          <p className="article-section-desc">A strong narrative has five elements. Each one can be framed through fear or through purpose. Click any element to see the difference and get practical guidance.</p>
        </ScrollReveal>

        <div className="phase-list">
          {narrativeElements.map((el, i) => (
            <ScrollReveal key={el.id} direction="up" delay={i * 60}>
              <button
                className={`phase-card${activeElement === el.id ? " phase-card-active" : ""}`}
                onClick={() => setActiveElement(activeElement === el.id ? null : el.id)}
              >
                <span className="phase-card-pillar">{el.name}</span>
                <span className="phase-card-name">{el.question}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {activeElement && (
          <ScrollReveal direction="up">
            {narrativeElements.filter(el => el.id === activeElement).map(el => (
              <div key={el.id} style={{ marginTop: "4px" }}>
                <div className="detail-block" style={{ marginBottom: "16px" }}>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{el.description}</p>
                </div>
                <div className="phase-compare">
                  <div className="phase-compare-col">
                    <span className="phase-compare-label">Fear-Based Version</span>
                    <p className="phase-compare-text">{el.fearVersion}</p>
                  </div>
                  <div className="phase-compare-col phase-compare-leader">
                    <span className="phase-compare-label">Purpose-Based Version</span>
                    <p className="phase-compare-text">{el.purposeVersion}</p>
                  </div>
                </div>
                <div className="detail-block detail-block-warning" style={{ marginTop: "16px" }}>
                  <h3 className="detail-block-title">Guidance</h3>
                  <p className="detail-body" style={{ marginBottom: 0 }}>{el.guidance}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        )}
      </section>

      {/* NARRATIVE CHECKLIST */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Narrative Landing?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your change narrative has the elements it needs to motivate action rather than create anxiety.</p>
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
                  <span className="check-complete"> &mdash; Your narrative has the depth and honesty it needs.</span>
                )}
                {checkedCount >= 5 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Address the gaps before going wider.</span>
                )}
                {checkedCount > 0 && checkedCount < 5 && (
                  <span className="check-partial"> &mdash; Significant gaps. Your narrative may not land as intended.</span>
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
