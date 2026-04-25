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

interface Ritual {
  name: string;
  frequency: string;
  purpose: string;
  covers: string[];
  warning: string;
}

/* ------------------------------------------------------------------ */
/*  Cadence Builder Data                                               */
/* ------------------------------------------------------------------ */

type Pace = "fast" | "moderate" | "slow";
type Complexity = "high" | "medium" | "low";
type TeamSize = "large" | "medium" | "small";

interface CadenceOption {
  label: string;
  value: string;
}

const paceOptions: CadenceOption[] = [
  { label: "Fast-moving", value: "fast" },
  { label: "Moderate", value: "moderate" },
  { label: "Steady / slow", value: "slow" },
];

const complexityOptions: CadenceOption[] = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const teamSizeOptions: CadenceOption[] = [
  { label: "Large (250+)", value: "large" },
  { label: "Medium (50-250)", value: "medium" },
  { label: "Small (<50)", value: "small" },
];

function buildRituals(pace: Pace, complexity: Complexity, teamSize: TeamSize): Ritual[] {
  const rituals: Ritual[] = [];

  /* ------ DAILY / WEEKLY STANDUP ------ */
  if (pace === "fast" || complexity === "high") {
    rituals.push({
      name: "Weekly Change Standup",
      frequency: "Weekly, 20 minutes",
      purpose: "Keep delivery teams aligned on what has shifted, what is blocked, and what needs to flex this week.",
      covers: [
        "What changed in the business context since last week",
        "Which workstreams are on track and which need intervention",
        "Emerging risks or resistance patterns",
        "Decisions needed before the next standup",
      ],
      warning: "If standups become status reporting rather than problem-solving, they lose value within two weeks. Keep the format tight: what shifted, what is stuck, what do we need.",
    });
  } else {
    rituals.push({
      name: "Fortnightly Change Standup",
      frequency: "Every two weeks, 30 minutes",
      purpose: "Maintain connection between delivery teams and the evolving business context without creating meeting fatigue.",
      covers: [
        "Summary of business context changes since last meeting",
        "Progress against the current delivery wave",
        "Stakeholder sentiment and engagement levels",
        "Adjustments to the next two-week plan",
      ],
      warning: "In slower-paced environments, fortnightly is sufficient. But if you find yourself needing ad-hoc calls between standups, your cadence is too slow for your context.",
    });
  }

  /* ------ FORTNIGHTLY REVIEW ------ */
  rituals.push({
    name: "Fortnightly Delivery Review",
    frequency: "Every two weeks, 60 minutes",
    purpose: "Review what has been delivered, what the impact has been, and whether the approach needs to adapt based on evidence.",
    covers: [
      "Adoption data and leading indicators from the last two weeks",
      "Feedback themes from the people experiencing the change",
      "Comparison of planned versus actual impact",
      "Specific adjustments to the approach, communications, or support for the next cycle",
    ],
    warning: "This is not a project status meeting. It is a change effectiveness review. If the conversation is about tasks completed rather than impact created, refocus it.",
  });

  /* ------ MONTHLY STEERING ------ */
  if (teamSize === "large" || complexity === "high") {
    rituals.push({
      name: "Monthly Steering Committee",
      frequency: "Monthly, 90 minutes",
      purpose: "Bring together senior sponsors and program leadership to review strategic alignment, resource allocation, and cross-program dependencies.",
      covers: [
        "Strategic context update: has anything changed that affects the change rationale",
        "Program health across all dimensions: delivery, adoption, sentiment, capability",
        "Resource and budget decisions that need senior authority",
        "Escalated risks and the recommended response",
        "Decisions on whether to continue, adjust, pause, or accelerate specific workstreams",
      ],
      warning: "Monthly steering only works if the attendees have decision-making authority and use it. A steering committee that defers every decision is worse than no steering committee at all.",
    });
  } else {
    rituals.push({
      name: "Monthly Sponsor Check-in",
      frequency: "Monthly, 45 minutes",
      purpose: "Keep the executive sponsor informed, engaged, and making the decisions that only they can make.",
      covers: [
        "Program progress and health summary",
        "Key risks and the proposed response",
        "Decisions that require sponsor authority",
        "Upcoming milestones and what success looks like for each",
      ],
      warning: "For smaller or less complex changes, a full steering committee adds overhead without proportionate value. A focused sponsor check-in is more effective.",
    });
  }

  /* ------ QUARTERLY HEALTH CHECK ------ */
  rituals.push({
    name: "Quarterly Change Health Check",
    frequency: "Every 12 weeks, half day",
    purpose: "Step back from delivery and honestly assess whether the change is landing, sticking, and creating the intended outcomes. This is the ritual that prevents drift.",
    covers: [
      "Outcome tracking: are the benefits being realised on the planned trajectory",
      "Adoption depth: are people genuinely working differently or just complying",
      "Change fatigue assessment: is the organisation showing signs of overload",
      "Capability review: do people have the skills and confidence to sustain the change",
      "Forward look: what needs to shift in the next quarter based on what we have learned",
    ],
    warning: "The quarterly health check is the most important ritual and the one most often skipped when delivery pressure increases. Protect it. It is the mechanism that turns a change program into a learning system.",
  });

  /* ------ ADAPTIVE EXTRAS ------ */
  if (pace === "fast" && complexity === "high") {
    rituals.push({
      name: "Rapid Adaptation Session",
      frequency: "Triggered when significant business context shift occurs",
      purpose: "When the business changes direction, restructures priorities, or introduces a new constraint, this session brings together the change team to rapidly reassess and adapt the approach.",
      covers: [
        "What has changed and why",
        "Impact assessment: which parts of the change plan are affected",
        "Options for adapting the approach with trade-off analysis",
        "Communication to stakeholders about what is shifting and why",
        "Updated timeline and resource implications",
      ],
      warning: "This should be triggered by genuine context shifts, not by every minor adjustment. If you are running these more than once a month, either your environment is genuinely volatile or your planning horizon is too long for your context.",
    });
  }

  if (teamSize === "large") {
    rituals.push({
      name: "Change Network Sync",
      frequency: pace === "fast" ? "Weekly, 30 minutes" : "Fortnightly, 45 minutes",
      purpose: "Connect the network of change champions, change agents, and local leaders who are translating the program into reality on the ground.",
      covers: [
        "What the network is hearing from their teams",
        "Patterns of resistance, confusion, or enthusiasm",
        "Support or materials the network needs from the central team",
        "Recognition of what the network is doing well",
      ],
      warning: "Change networks lose energy fast if they feel like information recipients rather than genuine partners. This session should be a dialogue, not a broadcast.",
    });
  }

  return rituals;
}

/* ------------------------------------------------------------------ */
/*  Adapting When Business Keeps Shifting                              */
/* ------------------------------------------------------------------ */

const adaptationStrategies: ActionItem[] = [
  {
    text: "Shorten your planning horizon without shortening your vision",
    detail: "When the business is shifting frequently, the instinct is to keep replanning the entire program. Instead, hold the long-term vision steady and shorten the planning detail to the next four to six weeks. Plan in detail for the near term, in outline for the medium term, and in direction for the long term. This means each shift in business context only requires you to adjust the near-term plan, not redesign everything.",
  },
  {
    text: "Build flex points into your delivery plan from the start",
    detail: "A rigid plan in a shifting environment is not a plan. It is a source of frustration. Design your delivery approach with explicit flex points: moments where the team pauses, reviews the current context, and decides whether to continue as planned, adjust, or pivot. These are not signs of failure. They are signs of a plan designed for reality.",
  },
  {
    text: "Distinguish between noise and signal in business changes",
    detail: "Not every business shift requires a change to your approach. Some are noise: temporary adjustments, leadership opinions that do not translate to decisions, market fluctuations that do not affect the program. Develop a simple filter: does this shift change the rationale for the change, the people affected, the timeline, or the resources available? If none of those, acknowledge it and continue.",
  },
  {
    text: "Communicate what is stable, not just what is changing",
    detail: "When the business keeps shifting, people need to hear what is not changing as much as what is. Every adaptation communication should lead with what remains the same: the purpose, the direction, the commitment. Then explain what is adjusting and why. This prevents the corrosive sense that everything is up in the air.",
  },
  {
    text: "Use your cadence rituals as stabilising anchors",
    detail: "When everything else is moving, the regularity of your cadence rituals provides psychological stability. People know that every two weeks there will be a review, every month the steering group will meet, every quarter the health check will happen. These rituals become the fixed points in a shifting landscape. Do not cancel them when things get busy. That is precisely when they are most needed.",
  },
  {
    text: "Protect the core, flex the periphery",
    detail: "Identify the non-negotiable elements of your change: the outcomes that must be achieved, the behaviours that must shift, the capabilities that must be built. These are the core. Everything else, including the sequence, the timing, the methods, and the communication channels, is the periphery. When the business shifts, flex the periphery to maintain the core. If you find yourself flexing the core, you may need to have a different conversation about whether the change is still viable.",
  },
];

/* ------------------------------------------------------------------ */
/*  Momentum Without Burnout                                           */
/* ------------------------------------------------------------------ */

const momentumPrinciples: ActionItem[] = [
  {
    text: "Pace the change to human absorption, not project timelines",
    detail: "Project timelines are set by business deadlines, budget cycles, and executive expectations. Human absorption happens at its own speed. When these two are misaligned, you get compliance without commitment: people go through the motions but do not genuinely change how they work. The delivery cadence should respect both. Deliver in waves that give people time to absorb before the next wave arrives.",
  },
  {
    text: "Build recovery time into the cadence deliberately",
    detail: "After every major milestone, delivery push, or go-live event, build in a deliberate pause. Not a full stop, but a reduced intensity period where the focus shifts from delivery to consolidation. This is when people catch up, process what has changed, and build confidence in the new way of working. Without these pauses, the change feels relentless and people burn out.",
  },
  {
    text: "Monitor energy as seriously as you monitor progress",
    detail: "Most change programs track milestones, adoption rates, and budget. Very few track the energy levels of the people delivering and receiving the change. Add a simple energy question to your fortnightly reviews: on a scale of 1 to 5, how sustainable does this pace feel? If the number drops below 3 for two consecutive reviews, something needs to change before burnout becomes the dominant issue.",
  },
  {
    text: "Rotate intensity across teams rather than sustaining it everywhere",
    detail: "Not every team needs to be at peak intensity at the same time. Design your cadence so that when one team is in a high-intensity delivery phase, others are in consolidation or preparation. This rotation means the overall program maintains momentum without requiring sustained maximum effort from everyone simultaneously.",
  },
  {
    text: "Celebrate progress at every cadence interval, not just at milestones",
    detail: "If people only hear about progress at major milestones, the gaps between them feel like a grind. Use each cadence ritual to name what has been achieved, however small. The weekly standup acknowledges this week's wins. The fortnightly review celebrates adoption progress. The monthly steering recognises the teams making it happen. Momentum comes from visible progress, and visible progress comes from looking for it deliberately.",
  },
  {
    text: "Make the cadence lighter when it needs to be, not just tighter",
    detail: "The instinct when things are not going well is to increase the meeting frequency: more standups, more reviews, more steering. Sometimes the opposite is needed. If the team is exhausted and over-processed, reducing the cadence and giving people space to do the work rather than report on the work can restore momentum faster than any additional meeting.",
  },
];

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "ING Bank",
    headline: "ING replaced annual planning with two-week sprints and quarterly business reviews across 350 squads",
    hook: "The bank moved from five or six big launches per year to continuous delivery. The cadence made the transformation sustainable.",
    dimension: "Cadence That Scales",
    body: [
      "When ING Netherlands transformed its operating model in 2015, shifting 3,500 people into 350 nine-person squads across 13 tribes, the challenge was not just structural. It was rhythmic. The old model relied on long planning cycles with five or six major releases per year. The new model needed a delivery cadence that could sustain continuous change without overwhelming people.",
      "ING adopted a layered cadence. Squads worked in two-week sprints with daily standups and fortnightly reviews. At the tribe level, portfolio wall planning sessions kept squads aligned without requiring heavyweight coordination. Most meetings were kept deliberately informal, with formal ceremonies kept to a minimum to avoid bureaucratic overhead.",
      "The most distinctive element was the Quarterly Business Review. Each tribe documented what it had achieved, its biggest learning from both successes and failures, its objectives for the next quarter, and what it needed from other tribes. Critically, these QBR documents were shared openly across the entire bank, creating transparency and enabling cross-tribe feedback.",
      "The result was a cadence that maintained momentum at the squad level through short sprints, alignment at the tribe level through regular but lightweight sync rituals, and strategic coherence at the organisation level through quarterly reviews. Time to market improved, employee engagement increased, and the transformation sustained itself because the rhythm made continuous adaptation feel natural rather than exhausting.",
    ],
    lesson: "ING demonstrates that cadence is not about how many meetings you have. It is about layering the right rhythms at the right levels: fast at the team level, moderate at the coordination level, and deliberate at the strategic level. Each layer serves a different purpose and operates at a different speed.",
    source: "https://www.mckinsey.com/industries/financial-services/our-insights/ings-agile-transformation",
    sourceLabel: "McKinsey",
  },
  {
    label: "Spotify",
    headline: "Spotify gave squads control of their own cadence and used health checks to prevent burnout",
    hook: "Autonomy over delivery rhythm turned out to be as important as autonomy over code.",
    dimension: "Autonomous Cadence",
    body: [
      "Spotify's squad model is often cited for its structure: squads, tribes, chapters, and guilds. But the less discussed innovation was giving each squad control over its own delivery cadence. Rather than imposing a uniform sprint length or ceremony schedule across the organisation, Spotify allowed each squad to choose the rhythm that suited its work.",
      "Some squads ran one-week sprints because their work was highly iterative. Others ran two-week or even four-week cycles because their work required longer focus periods. The principle was that the team closest to the work was best placed to determine the right delivery rhythm. This autonomy over cadence was a deliberate design choice, not a lack of standardisation.",
      "To prevent this autonomy from creating drift or burnout, Spotify developed the Squad Health Check model. Periodically, each squad assessed itself across multiple dimensions including ease of releasing, teamwork, support, and whether the pace felt sustainable. The health check included an explicit question about whether the team's current pace was something they could maintain long-term, directly surfacing burnout risk before it became a crisis.",
      "The health check results were visualised across tribes using traffic-light dashboards, making it immediately visible where teams were thriving and where they were struggling. Leadership could see patterns: if multiple squads in a tribe were flagging on the sustainability dimension, it signalled a systemic problem with the tribe's workload, not an individual team issue.",
    ],
    lesson: "Spotify shows that the best delivery cadence is not the fastest one. It is the one that a team can sustain. By giving squads autonomy over their rhythm and building a health check system that explicitly measured sustainability, Spotify created a delivery model that maintained momentum without normalising exhaustion.",
    source: "https://www.atlassian.com/agile/agile-at-scale/spotify",
    sourceLabel: "Atlassian",
  },
  {
    label: "NHS England",
    headline: "Repetitive reorganisations without recovery cadence created systemic change fatigue across the NHS",
    hook: "Reform arrived faster than the system could absorb. The result was fatigue, not transformation.",
    dimension: "Cadence Failure",
    body: [
      "The NHS in England provides a cautionary case study of what happens when change is delivered without a sustainable cadence. Research published in Public Money and Management documented how repetitive reorganisations created systemic change fatigue across the healthcare system, with staff becoming resistant to further change not because they opposed improvement, but because they were exhausted.",
      "The pattern was consistent: a new policy direction would be announced, implementation would begin before the previous reorganisation had stabilised, and staff would find themselves adapting to change while simultaneously being told to prepare for the next one. There was no recovery period built into the delivery rhythm. The cadence was relentless because it was driven by political cycles rather than organisational absorption capacity.",
      "The King's Fund reported that NHS staff were 50 per cent more likely to experience chronic stress than the general working population. Change fatigue manifested as raised cortisol levels, steep decline in drive and motivation, and in serious cases, burnout and sickness absences. Crucially, researchers found that the fatigue was not caused by any single change but by the cumulative effect of changes delivered without adequate spacing or stabilisation time.",
      "A parliamentary inquiry into workforce burnout identified that system-level factors, rather than individual resilience, were the primary drivers. The delivery rhythm of continuous top-down reorganisation, without pauses for absorption, feedback, or recovery, created a workforce that was too exhausted to engage meaningfully with any individual change, regardless of its merit.",
    ],
    lesson: "The NHS experience demonstrates that delivery cadence is not just an efficiency question. It is a wellbeing question. When change is delivered at a pace that exceeds the organisation's absorption capacity, with no built-in recovery periods, the result is not faster transformation. It is systemic fatigue that undermines every change that follows.",
    source: "https://www.tandfonline.com/doi/full/10.1080/09540962.2021.1905258",
    sourceLabel: "Public Money & Management",
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable List Component                                          */
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
/*  Ritual Card Component                                              */
/* ------------------------------------------------------------------ */

function RitualCard({ ritual, index }: { ritual: Ritual; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="detail-block" style={{ marginBottom: "16px" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
          <div>
            <h4 className="detail-block-title" style={{ marginBottom: "4px" }}>{ritual.name}</h4>
            <p style={{
              fontFamily: "var(--ui)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--gold)",
              marginBottom: "8px",
            }}>
              {ritual.frequency}
            </p>
            <p className="detail-body" style={{ marginBottom: 0 }}>{ritual.purpose}</p>
          </div>
          <span className={`detail-list-item-toggle${expanded ? " open" : ""}`} style={{ flexShrink: 0, marginTop: "4px" }}>&rsaquo;</span>
        </div>
      </button>
      {expanded && (
        <div style={{ marginTop: "16px" }}>
          <p style={{
            fontFamily: "var(--ui)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: "var(--navy)",
            marginBottom: "8px",
          }}>
            What this ritual should cover
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {ritual.covers.map((item, i) => (
              <li key={i} className="detail-body" style={{ marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
          <div className="detail-block detail-block-warning" style={{ marginTop: "16px" }}>
            <h5 className="detail-block-title" style={{ fontSize: "13px" }}>Watch out</h5>
            <p className="detail-body" style={{ marginBottom: 0 }}>{ritual.warning}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function DeliveryCadence() {
  const [pace, setPace] = useState<Pace | null>(null);
  const [complexity, setComplexity] = useState<Complexity | null>(null);
  const [teamSize, setTeamSize] = useState<TeamSize | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const allSelected = pace !== null && complexity !== null && teamSize !== null;
  const rituals = allSelected ? buildRituals(pace, complexity, teamSize) : [];

  const checkItems = [
    { key: "rhythm", label: "We have a defined delivery cadence with rituals at different levels: team, program, and strategic" },
    { key: "flex", label: "Our delivery plan has explicit flex points where we reassess and adapt based on the current context" },
    { key: "horizon", label: "We plan in detail for the near term and in direction for the long term, not the other way around" },
    { key: "recovery", label: "We build recovery periods into the cadence after major milestones or go-live events" },
    { key: "energy", label: "We actively monitor energy and sustainability, not just progress and milestones" },
    { key: "signal", label: "We have a clear filter for distinguishing business noise from genuine signals that require a change in approach" },
    { key: "stable", label: "When the business shifts, we communicate what is staying the same, not just what is changing" },
    { key: "celebrate", label: "We celebrate progress at every cadence interval, not just at major milestones" },
    { key: "lighter", label: "We are willing to make the cadence lighter when the team is overloaded, not just tighter" },
    { key: "health", label: "We conduct quarterly health checks that honestly assess change fatigue and adoption depth" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      {/* ---- HEADER ---- */}
      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Execution &middot; Change Delivery Cadence</span>
          <h1 className="article-title">How to build a change delivery rhythm that keeps momentum without burning people out</h1>
          <p className="article-intro">Every change program needs a heartbeat. Too fast and people burn out. Too slow and momentum dies. The right cadence is not a fixed formula: it depends on your pace of business change, the complexity of what you are delivering, and the capacity of the people experiencing it. This guide covers both sides of the cadence challenge: how to adapt your change approach when the business keeps shifting, and how to set up a delivery rhythm that sustains momentum without exhausting the organisation. The two are inseparable. A good cadence is both responsive and sustainable.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* ---- SECTION 1: ADAPTING WHEN BUSINESS SHIFTS ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Adapting When the Business Keeps Shifting</h2>
          <p className="article-section-desc">Business context rarely stays still long enough for a change plan to survive intact. Strategy pivots, leadership changes, market disruptions, and reorganisations all affect the environment in which your change is landing. The question is not whether the business will shift. It is whether your change approach is designed to absorb those shifts without losing direction. These six strategies make the difference between a change program that bends and one that breaks.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Strategies for Adaptive Delivery</h3>
            <ExpandableList items={adaptationStrategies} />
          </div>
        </ScrollReveal>
      </section>

      {/* ---- SECTION 2: CADENCE BUILDER ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Build Your Delivery Cadence</h2>
          <p className="article-section-desc">There is no universal cadence that works for every change. The right rhythm depends on three factors: how fast your business context is moving, how complex the change is, and how many people are affected. Select your context below and get a recommended set of delivery rituals tailored to your situation.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}>
            {/* Pace selector */}
            <div>
              <p style={{
                fontFamily: "var(--ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--navy)",
                marginBottom: "12px",
              }}>
                Pace of Business Change
              </p>
              <div className="phase-list" style={{ gap: "8px" }}>
                {paceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`phase-card${pace === opt.value ? " phase-card-active" : ""}`}
                    onClick={() => { setPace(opt.value as Pace); setShowResult(false); }}
                    style={{ padding: "12px 16px" }}
                  >
                    <span className="phase-card-name">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity selector */}
            <div>
              <p style={{
                fontFamily: "var(--ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--navy)",
                marginBottom: "12px",
              }}>
                Change Complexity
              </p>
              <div className="phase-list" style={{ gap: "8px" }}>
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`phase-card${complexity === opt.value ? " phase-card-active" : ""}`}
                    onClick={() => { setComplexity(opt.value as Complexity); setShowResult(false); }}
                    style={{ padding: "12px 16px" }}
                  >
                    <span className="phase-card-name">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Team size selector */}
            <div>
              <p style={{
                fontFamily: "var(--ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--navy)",
                marginBottom: "12px",
              }}>
                Affected Team Size
              </p>
              <div className="phase-list" style={{ gap: "8px" }}>
                {teamSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`phase-card${teamSize === opt.value ? " phase-card-active" : ""}`}
                    onClick={() => { setTeamSize(opt.value as TeamSize); setShowResult(false); }}
                    style={{ padding: "12px 16px" }}
                  >
                    <span className="phase-card-name">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {allSelected && !showResult && (
          <ScrollReveal direction="up">
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <button className="btn" onClick={() => setShowResult(true)}>
                Build My Cadence
              </button>
            </div>
          </ScrollReveal>
        )}

        {showResult && rituals.length > 0 && (
          <ScrollReveal direction="up">
            <div style={{ marginBottom: "16px" }}>
              <p style={{
                fontFamily: "var(--ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--gold)",
                marginBottom: "8px",
              }}>
                Your Recommended Cadence &mdash; {rituals.length} rituals
              </p>
              <p className="detail-body" style={{ marginBottom: "24px" }}>
                Based on a {pace}-paced environment with {complexity} complexity affecting a {teamSize} team, here is the delivery rhythm we recommend. Click any ritual to see what it should cover and what to watch out for.
              </p>
            </div>
            {rituals.map((ritual, i) => (
              <RitualCard key={i} ritual={ritual} index={i} />
            ))}
          </ScrollReveal>
        )}
      </section>

      {/* ---- SECTION 3: MOMENTUM WITHOUT BURNOUT ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Sustaining Momentum Without Burning People Out</h2>
          <p className="article-section-desc">The hardest balance in change delivery is maintaining enough momentum to achieve outcomes while respecting the limits of human energy. Burnout does not announce itself. It accumulates silently until it manifests as disengagement, resistance, or attrition. These principles help you design a cadence that sustains energy over the long arc of a transformation.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Principles for Sustainable Pace</h3>
            <ExpandableList items={momentumPrinciples} />
          </div>
        </ScrollReveal>
      </section>

      {/* ---- SECTION 4: THE CADENCE ANTI-PATTERNS ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Five Cadence Anti-Patterns</h2>
          <p className="article-section-desc">Most delivery cadences fail not because the rituals are wrong but because they drift into patterns that look productive but are not. Recognising these anti-patterns early is the difference between a cadence that drives change and one that drives people away.</p>
        </ScrollReveal>

        <div className="phase-list">
          {[
            {
              name: "The Status Theatre",
              desc: "Every ritual becomes a status update where people report what they have done rather than solving what is stuck. The cadence feels busy but nothing actually gets decided or unblocked.",
            },
            {
              name: "The Escalation Spiral",
              desc: "When problems arise, the response is always to add another meeting or escalation layer. Within months the cadence has doubled in weight and people spend more time in change meetings than doing change work.",
            },
            {
              name: "The Phantom Pause",
              desc: "Recovery time is built into the plan on paper but consistently overridden when delivery pressure increases. People see the pause on the schedule but never experience it.",
            },
            {
              name: "The One-Speed Cadence",
              desc: "The same rhythm is applied to every phase of the change regardless of what the phase requires. A weekly standup makes sense during active rollout but becomes pointless during a stabilisation phase when the focus should be on embedding.",
            },
            {
              name: "The Lonely Health Check",
              desc: "A quarterly health check is conducted but the results do not connect to decisions. The team fills in the survey, the dashboard gets updated, and nothing changes. Within two cycles, people stop engaging honestly.",
            },
          ].map((ap, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <div className="detail-block" style={{ marginBottom: "12px" }}>
                <h4 className="detail-block-title">{ap.name}</h4>
                <p className="detail-body" style={{ marginBottom: 0 }}>{ap.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---- CHECKLIST ---- */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Cadence Working?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your delivery cadence is designed for both momentum and sustainability, or whether it has drifted into one of the anti-patterns above.</p>
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
                  <span className="check-complete"> &mdash; Your cadence is designed for both momentum and sustainability. Protect it.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong foundation. Address the remaining gaps before they become habits.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Your cadence has elements of good practice but may not be sustainable under pressure.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Significant gaps. Your cadence may be driving activity without driving sustainable change.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ---- CTA ---- */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Execution</strong>, the fourth pillar of the TCA Change Model.</p>
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
