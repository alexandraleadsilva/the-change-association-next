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

interface KpiItem {
  id: string;
  kpi: string;
  context: string;
}

type KpiRating = "reinforces" | "neutral" | "contradicts";

/* ------------------------------------------------------------------ */
/*  Data: KPI Alignment Audit                                          */
/* ------------------------------------------------------------------ */

const kpiItems: KpiItem[] = [
  {
    id: "k1",
    kpi: "Individual output volume or units processed per person",
    context: "If the transformation asks people to collaborate more, share knowledge, or spend time coaching others, rewarding individual output volume directly contradicts the new way of working. People will protect their own numbers at the expense of helping colleagues.",
  },
  {
    id: "k2",
    kpi: "Customer satisfaction or Net Promoter Score",
    context: "Customer satisfaction metrics often align well with transformation goals, especially when the change is designed to improve service quality, responsiveness, or the end-to-end experience. However, if the new process temporarily slows response times during transition, holding people to pre-change targets creates unfair pressure.",
  },
  {
    id: "k3",
    kpi: "Speed of task completion or average handling time",
    context: "Speed metrics frequently contradict transformations that require more thoughtful engagement, deeper problem-solving, or cross-functional collaboration. If the new way of working asks people to spend more time understanding root causes rather than processing quickly, a speed KPI punishes the desired behaviour.",
  },
  {
    id: "k4",
    kpi: "Revenue generated per employee or team",
    context: "Revenue-per-head can reinforce a transformation if the change is explicitly about commercial growth. But if the transformation is about quality, risk management, compliance, or cultural change, revenue metrics pull attention away from the behaviours the change actually requires.",
  },
  {
    id: "k5",
    kpi: "Error rates or quality scores",
    context: "Quality metrics are often neutral or reinforcing during transformation, depending on whether the new process is designed to improve accuracy. The risk is that during transition, error rates naturally spike as people learn new systems. If the KPI does not account for a learning curve, it penalises the people who are trying hardest to adopt the change.",
  },
  {
    id: "k6",
    kpi: "Cross-functional collaboration or knowledge-sharing frequency",
    context: "If the transformation explicitly requires more collaboration, this KPI directly reinforces the new way of working. The challenge is measurement: self-reported collaboration is unreliable, and tracking it through system data can feel surveillant. The metric must be designed carefully to encourage genuine collaboration rather than performative box-ticking.",
  },
  {
    id: "k7",
    kpi: "Adherence to existing process or standard operating procedure compliance",
    context: "If the transformation is replacing old processes with new ones, a KPI that rewards adherence to the existing process directly contradicts the change. People are being told to work differently while being measured on how well they follow the old rules. This is one of the most common and most damaging misalignments.",
  },
  {
    id: "k8",
    kpi: "Manager span of control or headcount efficiency ratios",
    context: "Efficiency ratios can contradict transformations that deliberately create smaller teams, add new coordination roles, or invest in capability building. If the new model requires more management time per person, measuring managers on span of control penalises exactly what the change needs them to do.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: When Should KPIs Change                                      */
/* ------------------------------------------------------------------ */

const timingGuidance: ActionItem[] = [
  {
    text: "Before go-live: audit every KPI against the future state",
    detail: "The audit should happen during the design phase, not after rollout. For each existing KPI, ask whether it reinforces, is neutral to, or contradicts the new way of working. Any KPI that contradicts the change must be flagged for revision before people are asked to work differently. If this is not done before go-live, people receive conflicting signals from day one.",
  },
  {
    text: "At go-live: introduce transitional KPIs with explicit protection periods",
    detail: "When people are learning new systems and processes, their performance will temporarily dip. This is expected and well-documented. Transitional KPIs acknowledge this reality by adjusting targets for a defined period, typically 60 to 90 days. The protection period should be communicated clearly so that people know they will not be penalised for the learning curve. Without this, fear of performance consequences becomes the primary barrier to adoption.",
  },
  {
    text: "At 30 days: check whether any KPI is actively driving workarounds",
    detail: "Within the first month, patterns emerge. If people are finding ways to game the metrics, reverting to old processes to protect their scores, or spending time on metric-visible activities rather than genuinely valuable work, the KPIs are misaligned. The 30-day check should involve frontline managers who can see these behaviours directly, not just the data the dashboard shows.",
  },
  {
    text: "At 90 days: formally replace contradicting KPIs with new measures",
    detail: "By 90 days, you have enough data to know what is working and what is not. This is the point to formally retire any KPI that has been identified as contradicting the change and replace it with metrics that reinforce the new way of working. The replacement should be developed with the people who are measured by it, not imposed from above. Involvement creates ownership.",
  },
  {
    text: "At 180 days: align the full performance cycle to the new operating model",
    detail: "At six months, the transitional period is over. The full performance management cycle, including annual reviews, bonus criteria, promotion standards, and development plans, should now reflect the new way of working. If any element of the performance system still rewards old behaviours at this point, it will anchor those behaviours permanently. This is the last opportunity to align the system before the old patterns become re-entrenched.",
  },
  {
    text: "Ongoing: build a regular cadence for KPI relevance reviews",
    detail: "KPIs are not permanent. As the organisation continues to evolve, metrics that were once aligned will drift out of relevance. Establish a quarterly or biannual review where each KPI is assessed against current strategic priorities. The question is always the same: does this metric still drive the behaviour we actually need? If not, change it before it starts driving the wrong behaviour.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Avoiding Backlash                                            */
/* ------------------------------------------------------------------ */

const backlashPrinciples: ActionItem[] = [
  {
    text: "Explain the why before the what: people need to understand the reason for the change in how they are measured before they see the new metrics",
    detail: "When people learn that their KPIs are changing, the first reaction is almost always anxiety. They wonder whether this is a precursor to job cuts, whether their past performance will be devalued, or whether the new measures will be harder to achieve. If the first thing they hear is the new metric, they interpret it through this lens of fear. If the first thing they hear is the strategic reason for the shift and how it connects to the broader transformation, they have a frame for understanding rather than resisting.",
  },
  {
    text: "Involve people in the design of new metrics rather than imposing them",
    detail: "The most effective way to prevent backlash is to involve the people who will be measured in designing the new measurement system. This does not mean asking them to set their own targets. It means consulting them on what good performance looks like in the new model, what is within their control, and what is not. When people have contributed to the design, they are more likely to see the result as fair even if it is more demanding.",
  },
  {
    text: "Protect people during the transition with explicit grace periods and adjusted targets",
    detail: "Performance naturally dips during change. New systems are unfamiliar. New processes take longer. New team structures need time to gel. If people are held to pre-change targets during this period, they face a choice between adopting the change and protecting their performance rating. Most will choose to protect their rating. Grace periods remove this conflict by explicitly acknowledging the learning curve and adjusting expectations accordingly.",
  },
  {
    text: "Ensure managers are equipped to have honest conversations about changing expectations",
    detail: "The performance conversation is where alignment either succeeds or fails. If managers cannot articulate why the KPIs are changing, what the new expectations look like, and how performance will be evaluated during transition, then every conversation becomes a source of confusion and frustration. Manager readiness is not optional. It is the mechanism through which the performance system reaches every individual.",
  },
  {
    text: "Make the connection between new KPIs and career progression explicit and credible",
    detail: "People will not take new KPIs seriously if they believe that promotion decisions and bonus allocations still follow the old criteria. The connection between the new metrics and tangible career outcomes must be made explicit and then demonstrated through actual decisions. The first promotion cycle after the change is the real test: if the people promoted are those who excelled under the new measures, credibility is established. If they are the people who excelled under the old ones, the new system is dead on arrival.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: What Happens When KPIs Lag Behind                            */
/* ------------------------------------------------------------------ */

const lagConsequences: ActionItem[] = [
  {
    text: "People receive contradictory signals and default to the one that affects their pay",
    detail: "When the change program says one thing and the performance system says another, the performance system wins every time. People are rational actors. They will prioritise the behaviours that are rewarded, regardless of what the transformation communications tell them. This is not resistance. It is a perfectly logical response to a contradictory environment. The fault lies with the system, not the person.",
  },
  {
    text: "Managers lose credibility when they cannot reconcile what they are asking with how people are measured",
    detail: "Frontline managers are the bridge between strategy and execution. When they ask their teams to work in the new way while knowing the performance system still rewards the old way, they lose credibility. Some will openly acknowledge the contradiction, undermining the change. Others will try to paper over it, eroding trust. Either way, the manager becomes the casualty of a misalignment they did not create.",
  },
  {
    text: "Early adopters are penalised and become cautionary tales for the rest of the organisation",
    detail: "The people who adopt the change earliest and most enthusiastically are the ones most affected by lagging KPIs. They change their behaviour, their metrics dip because the measurement system has not caught up, and their performance rating suffers. The rest of the organisation watches this happen and draws an obvious conclusion: adopting the change is career-limiting. Once this narrative takes hold, it is extraordinarily difficult to reverse.",
  },
  {
    text: "Workarounds become embedded as the unofficial way of working",
    detail: "When KPIs contradict the change, people develop workarounds that satisfy both. They find ways to appear compliant with the new process while optimising for the old metrics. Over time, these workarounds become the actual way of working, neither the old model nor the new one, but a dysfunctional hybrid that serves nobody well. By the time leadership realises what has happened, the workarounds are deeply embedded and harder to remove than the original old behaviours.",
  },
  {
    text: "The transformation is declared a failure when the real failure was measurement",
    detail: "Perhaps the most damaging consequence is misdiagnosis. Leadership looks at the metrics, sees that the numbers have not improved or have worsened, and concludes that the transformation has failed. In reality, the transformation may have been adopted but the metrics were never updated to capture the new value being created. Measuring the new way of working with old metrics produces data that says the old way was better, regardless of the reality.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: Case Studies                                                 */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Microsoft",
    headline: "How Microsoft dismantled stack ranking to unlock a growth mindset culture",
    hook: "The system that once rewarded internal competition was replaced with one that rewarded collaboration and learning.",
    dimension: "Performance System Overhaul",
    body: [
      "Under Steve Ballmer, Microsoft used a stack-ranking performance system that forced managers to rank employees against each other on a bell curve. Top performers were rewarded and bottom performers were managed out, regardless of the team's absolute performance. The system incentivised internal competition over collaboration: employees reported avoiding helping colleagues because doing so could raise a competitor's ranking at their own expense.",
      "When Satya Nadella became CEO in 2014, one of his earliest and most consequential decisions was to dismantle stack ranking entirely. The replacement system evaluated employees on three dimensions: their individual contribution, how they leveraged the work of others, and how they contributed to the success of their colleagues. Collaboration was no longer a nice-to-have. It was a measured behaviour.",
      "Critically, the transition was not instantaneous. Microsoft introduced the Perspectives tool, which invited peers to offer feedback in two categories: what a colleague should keep doing, and what they should rethink. This created a feedback culture that was forward-looking rather than backward-judging. Managers met with employees at least every two months to discuss performance, replacing the annual review cycle.",
      "The results were substantial. Employee engagement scores improved by 20 percent across multiple departments after the transition. The cultural shift from what Nadella described as a know-it-all culture to a learn-it-all culture was directly enabled by a performance system that rewarded curiosity and collaboration rather than individual dominance.",
    ],
    lesson: "Microsoft demonstrates that performance system alignment is not a secondary concern during transformation. It is a primary enabler. The cultural shift Nadella sought was impossible under the old measurement system because the system actively rewarded the opposite behaviours. Changing what was measured changed what people did.",
    source: "https://www.deel.com/blog/employee-performance-reviews-at-microsoft/",
    sourceLabel: "Deel",
  },
  {
    label: "Adobe",
    headline: "Adobe abolished annual reviews and replaced them with continuous check-ins to match its agile transformation",
    hook: "80,000 hours per year consumed by annual reviews. The system was not just outdated. It was actively undermining the culture Adobe needed.",
    dimension: "KPI Timing Alignment",
    body: [
      "In 2012, Adobe's senior vice president of People and Places, Donna Morris, publicly committed to abolishing the company's annual performance review system. The existing process consumed approximately 80,000 manager hours per year, the equivalent of 40 full-time employees doing nothing but administering reviews. But the cost was not just time. The system relied on stack ranking and annual ratings that employees found demoralising, and it was fundamentally misaligned with Adobe's shift toward agile, iterative product development.",
      "The replacement system, called Check-in, was designed around three principles: setting and tracking expectations continuously, providing real-time feedback and coaching, and identifying growth opportunities in the moment rather than once per year. Managers and employees were expected to have regular one-to-one conversations with no prescribed format and no paperwork. The emphasis was on the quality and frequency of the conversation, not the documentation.",
      "Adobe recognised that changing the system alone was insufficient. They established the Employee Resource Centre to provide managers with coaching, tools, and just-in-time support for having effective Check-in conversations. They invested heavily in manager capability because they understood that the performance system is only as good as the conversations it produces.",
      "The impact was measurable: voluntary attrition dropped significantly after Check-in was implemented. Managers reported spending less time on administrative process and more time on genuine performance development. The alignment between how Adobe worked, in iterative sprints with rapid feedback, and how Adobe measured performance was finally coherent.",
    ],
    lesson: "Adobe demonstrates what happens when a company recognises that its performance system has lagged behind its operating model. The annual review was designed for a waterfall world. Adobe had moved to agile. The lag between the two was costing 80,000 hours per year in wasted administration and an unmeasurable amount in employee frustration and misaligned behaviour.",
    source: "https://www.gsb.stanford.edu/faculty-research/case-studies/adobe-building-momentum-abandoning-annual-performance-reviews-check",
    sourceLabel: "Stanford GSB",
  },
  {
    label: "Deloitte",
    headline: "Deloitte scrapped 360-degree reviews after discovering they consumed 2 million hours and failed to predict performance",
    hook: "The firm's own research showed its performance system measured the rater more than the ratee.",
    dimension: "Measurement Validity",
    body: [
      "In a widely cited 2015 Harvard Business Review article, Deloitte disclosed that its existing performance management system consumed approximately 2 million hours per year across the firm. The process included cascading objectives, annual 360-degree feedback, and calibration sessions. Leadership concluded that the system was not only expensive but fundamentally flawed: it was better at measuring the idiosyncratic rating patterns of the evaluator than the actual performance of the person being evaluated.",
      "Deloitte's internal research team studied 60 high-performing teams to understand what differentiated them. The critical finding was that members of high-performing teams reported having the opportunity to use their strengths every day. This shifted the design philosophy from identifying and correcting weaknesses to recognising and deploying strengths.",
      "The new system eliminated cascading objectives, annual reviews, and 360-degree feedback entirely. Instead, team leaders answered four future-focused questions about each team member at the end of every project or quarterly: whether they would award the person the highest compensation, whether they would always want the person on their team, whether the person was at risk of low performance, and whether the person was ready for promotion. These four questions, focused on the leader's own intended actions rather than abstract ratings, proved to be more predictive and less biased.",
      "The frequency of performance conversations increased dramatically. Deloitte recommended weekly check-ins between managers and team members, replacing the annual cycle with a continuous rhythm. The focus moved from assessing the past to shaping the future, which aligned with the firm's broader transformation toward more agile, project-based working.",
    ],
    lesson: "Deloitte's case is a powerful demonstration of what happens when an organisation rigorously examines whether its performance metrics actually measure what they claim to measure. The firm discovered that its own system was generating noise rather than signal, consuming millions of hours to produce data that was more about the rater than the rated. Alignment starts with validity: if the metric does not measure what you think it measures, changing the target is meaningless.",
    source: "https://hbr.org/2015/04/reinventing-performance-management",
    sourceLabel: "Harvard Business Review",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared: ExpandableList                                             */
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
/*  Component: KPI Alignment Audit                                     */
/* ------------------------------------------------------------------ */

function KpiAlignmentAudit() {
  const [ratings, setRatings] = useState<Record<string, KpiRating>>({});
  const [showResults, setShowResults] = useState(false);

  const ratedCount = Object.keys(ratings).length;
  const total = kpiItems.length;
  const allRated = ratedCount === total;

  const reinforcesCount = Object.values(ratings).filter((r) => r === "reinforces").length;
  const neutralCount = Object.values(ratings).filter((r) => r === "neutral").length;
  const contradictsCount = Object.values(ratings).filter((r) => r === "contradicts").length;

  const reinforcesPct = total > 0 ? Math.round((reinforcesCount / total) * 100) : 0;
  const neutralPct = total > 0 ? Math.round((neutralCount / total) * 100) : 0;
  const contradictsPct = total > 0 ? Math.round((contradictsCount / total) * 100) : 0;

  function handleRate(id: string, rating: KpiRating) {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  }

  function getResultMessage(): string {
    if (contradictsCount === 0 && reinforcesCount >= neutralCount) {
      return "Your KPIs are well aligned. None of your current metrics actively contradict the change. Continue to monitor them as the transformation evolves.";
    }
    if (contradictsCount <= 1 && reinforcesCount > contradictsCount) {
      return "Mostly aligned with minor gaps. Address the contradicting metric before it becomes a barrier to adoption. The neutral metrics should be reviewed for opportunities to better reinforce the new way of working.";
    }
    if (contradictsCount <= 3) {
      return "Significant misalignment detected. Multiple KPIs are pulling people toward old behaviours while the change asks them to work differently. Prioritise replacing the contradicting metrics within the next 90 days or you risk undermining the entire transformation.";
    }
    return "Critical misalignment. More than half of the KPIs you assessed are actively contradicting the change. People are receiving a clear signal that the old way of working is still what matters. This must be addressed immediately or the transformation will fail regardless of how well everything else is executed.";
  }

  return (
    <div>
      <div className="audit-items">
        {kpiItems.map((item) => (
          <div key={item.id} className="audit-item" style={{
            background: "var(--bg-card)",
            borderRadius: "8px",
            padding: "20px 24px",
            marginBottom: "12px",
            border: ratings[item.id] === "reinforces"
              ? "1.5px solid #2E6B4F"
              : ratings[item.id] === "contradicts"
              ? "1.5px solid #8B2E2E"
              : ratings[item.id] === "neutral"
              ? "1.5px solid #B8860B"
              : "1.5px solid var(--border)",
            transition: "border-color 0.25s ease",
          }}>
            <p style={{
              fontFamily: "var(--body)",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--ink)",
              marginBottom: "14px",
            }}>
              {item.kpi}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["reinforces", "neutral", "contradicts"] as KpiRating[]).map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRate(item.id, rating)}
                  style={{
                    fontFamily: "var(--ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    padding: "7px 16px",
                    borderRadius: "4px",
                    border: "1.5px solid",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    borderColor:
                      rating === "reinforces" ? "#2E6B4F"
                      : rating === "contradicts" ? "#8B2E2E"
                      : "#B8860B",
                    background:
                      ratings[item.id] === rating
                        ? rating === "reinforces" ? "#2E6B4F"
                          : rating === "contradicts" ? "#8B2E2E"
                          : "#B8860B"
                        : "transparent",
                    color:
                      ratings[item.id] === rating
                        ? "#fff"
                        : rating === "reinforces" ? "#2E6B4F"
                        : rating === "contradicts" ? "#8B2E2E"
                        : "#B8860B",
                  }}
                >
                  {rating === "reinforces" ? "Reinforces" : rating === "neutral" ? "Neutral" : "Contradicts"}
                </button>
              ))}
            </div>
            {ratings[item.id] && (
              <p style={{
                fontFamily: "var(--body)",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--ink-light)",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border)",
              }}>
                {item.context}
              </p>
            )}
          </div>
        ))}
      </div>

      {allRated && !showResults && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            className="btn"
            onClick={() => setShowResults(true)}
          >
            See Your KPI Alignment Results
          </button>
        </div>
      )}

      {!allRated && (
        <p style={{
          fontFamily: "var(--ui)",
          fontSize: "12px",
          color: "var(--ink-light)",
          textAlign: "center",
          marginTop: "16px",
          letterSpacing: "0.04em",
        }}>
          {ratedCount} of {total} KPIs assessed. Rate all to see your results.
        </p>
      )}

      {showResults && (
        <ScrollReveal direction="up">
          <div style={{
            background: "var(--navy)",
            borderRadius: "12px",
            padding: "32px",
            marginTop: "24px",
            color: "#fff",
          }}>
            <h3 style={{
              fontFamily: "var(--heading)",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "24px",
            }}>
              Your KPI Alignment Breakdown
            </h3>

            {/* Visual bar breakdown */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "flex",
                width: "100%",
                height: "32px",
                borderRadius: "6px",
                overflow: "hidden",
                marginBottom: "16px",
              }}>
                {reinforcesPct > 0 && (
                  <div style={{
                    width: `${reinforcesPct}%`,
                    background: "#2E6B4F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "width 0.5s ease",
                  }}>
                    <span style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                      {reinforcesPct}%
                    </span>
                  </div>
                )}
                {neutralPct > 0 && (
                  <div style={{
                    width: `${neutralPct}%`,
                    background: "#B8860B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "width 0.5s ease",
                  }}>
                    <span style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                      {neutralPct}%
                    </span>
                  </div>
                )}
                {contradictsPct > 0 && (
                  <div style={{
                    width: `${contradictsPct}%`,
                    background: "#8B2E2E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "width 0.5s ease",
                  }}>
                    <span style={{ fontFamily: "var(--ui)", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                      {contradictsPct}%
                    </span>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#2E6B4F" }} />
                  <span style={{ fontFamily: "var(--ui)", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                    Reinforces ({reinforcesCount})
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#B8860B" }} />
                  <span style={{ fontFamily: "var(--ui)", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                    Neutral ({neutralCount})
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#8B2E2E" }} />
                  <span style={{ fontFamily: "var(--ui)", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                    Contradicts ({contradictsCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Individual KPI summary */}
            <div style={{ marginBottom: "24px" }}>
              {kpiItems.map((item) => (
                <div key={item.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      ratings[item.id] === "reinforces" ? "#2E6B4F"
                      : ratings[item.id] === "contradicts" ? "#8B2E2E"
                      : "#B8860B",
                  }} />
                  <span style={{
                    fontFamily: "var(--body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.5,
                  }}>
                    {item.kpi}
                  </span>
                </div>
              ))}
            </div>

            {/* Interpretation */}
            <div style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "20px",
              borderLeft: "3px solid var(--gold)",
            }}>
              <p style={{
                fontFamily: "var(--ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--gold)",
                marginBottom: "8px",
              }}>
                Assessment
              </p>
              <p style={{
                fontFamily: "var(--body)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}>
                {getResultMessage()}
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => { setRatings({}); setShowResults(false); }}
                style={{
                  fontFamily: "var(--ui)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "var(--gold)",
                  background: "none",
                  border: "1px solid var(--gold)",
                  borderRadius: "4px",
                  padding: "8px 20px",
                  cursor: "pointer",
                }}
              >
                Reset Audit
              </button>
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function PerformanceAlignment() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const checkItems = [
    { key: "audit", label: "We have audited every existing KPI against the future state before go-live" },
    { key: "contradictions", label: "KPIs that contradict the new way of working have been identified and flagged for replacement" },
    { key: "transitional", label: "Transitional targets or grace periods are in place for the first 60 to 90 days" },
    { key: "managers", label: "Managers have been equipped to explain why performance measures are changing" },
    { key: "involvement", label: "The people being measured were involved in designing or validating the new metrics" },
    { key: "career", label: "The link between new KPIs and career progression, bonuses, and promotion is explicit" },
    { key: "workarounds", label: "We are actively monitoring for workarounds driven by misaligned metrics" },
    { key: "reviews", label: "Formal KPI reviews are scheduled at 30, 90, and 180 days post-change" },
    { key: "recognition", label: "Recognition and reward systems have been updated to reinforce new behaviours" },
    { key: "cadence", label: "An ongoing cadence exists for reviewing KPI relevance as the organisation continues to evolve" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <>
      <Nav />

      <div className="article-header">
        <Link href="/knowledge" className="article-back">&larr; Back to Knowledge Hub</Link>
        <ScrollReveal direction="up">
          <span className="article-label">Sustainment &middot; Performance Alignment</span>
          <h1 className="article-title">How to align performance management to the new way of working without creating a backlash</h1>
          <p className="article-intro">Every transformation has a moment where the change program says one thing and the performance system says another. People are told to collaborate, but rewarded for individual output. They are asked to take risks, but measured on error rates. They are encouraged to adopt new processes, but their KPIs still track the old ones. This is the single most common reason that change fails to stick. Not because people resist the new way of working, but because the measurement system actively punishes it. This article covers both sides of the problem: how to align performance management without provoking backlash, and when KPIs should change so they do not lag behind the transformation they are supposed to support.</p>
        </ScrollReveal>
      </div>

      <div className="article-with-sidebar">
      <div className="article-main">

      {/* SECTION 1: THE CORE PROBLEM */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Why Performance Alignment Is the Hidden Failure Point</h2>
          <p className="article-section-desc">Most change programs invest heavily in communication, training, and leadership engagement. These are necessary but insufficient. If the performance management system still rewards the old way of working, people will default to whatever protects their rating, their bonus, and their career progression. This is not resistance. It is rationality. The system tells them what really matters, and they listen.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">What Happens When KPIs Lag Behind the Transformation</h3>
            <ExpandableList items={lagConsequences} />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 2: KPI ALIGNMENT AUDIT */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">KPI Alignment Audit</h2>
          <p className="article-section-desc">Assess your current KPIs against the change you are implementing. For each metric below, consider whether it reinforces the new way of working, is neutral, or actively contradicts it. Rate all eight to see a visual breakdown of your alignment position.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <KpiAlignmentAudit />
        </ScrollReveal>
      </section>

      {/* SECTION 3: AVOIDING BACKLASH */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">How to Change Performance Measures Without Creating a Backlash</h2>
          <p className="article-section-desc">Changing how people are measured is one of the most sensitive actions in any transformation. Done well, it signals that the organisation is serious about the new way of working. Done poorly, it creates fear, resentment, and active resistance. The difference lies in how the change is communicated, who is involved in the design, and whether people are protected during the transition.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">Five Principles for Backlash-Free KPI Transition</h3>
            <ExpandableList items={backlashPrinciples} />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 4: WHEN SHOULD KPIs CHANGE */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">When Should KPIs Change?</h2>
          <p className="article-section-desc">The timing of KPI changes is as important as the changes themselves. Move too early and you are measuring behaviours people have not yet learned. Move too late and the old metrics have already anchored old behaviours. The following timeline provides a practical sequence for aligning performance metrics across the lifecycle of a transformation.</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="detail-block">
            <h3 className="detail-block-title">The KPI Alignment Timeline</h3>
            <ExpandableList items={timingGuidance} />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 5: SELF-CHECK */}
      <section className="article-section">
        <ScrollReveal direction="up">
          <h2 className="article-section-title">Is Your Performance System Aligned to the Change?</h2>
          <p className="article-section-desc">Use this checklist to assess whether your performance management system supports or undermines the transformation. Each unchecked item represents a potential point of failure where the measurement system could pull people back toward old behaviours.</p>
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
                  <span className="check-complete"> &mdash; Your performance system is well aligned. Continue monitoring as the transformation evolves.</span>
                )}
                {checkedCount >= 7 && checkedCount < checkItems.length && (
                  <span className="check-partial"> &mdash; Strong alignment with minor gaps. Address the remaining items before the next performance cycle.</span>
                )}
                {checkedCount >= 4 && checkedCount < 7 && (
                  <span className="check-partial"> &mdash; Partial alignment. The gaps are significant enough to undermine adoption if not addressed within 90 days.</span>
                )}
                {checkedCount > 0 && checkedCount < 4 && (
                  <span className="check-partial"> &mdash; Critical misalignment. Your performance system is likely working against the transformation. Prioritise this immediately.</span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="article-section article-cta">
        <ScrollReveal direction="up">
          <p className="article-cta-text">This topic is part of <strong>Sustainment</strong>, the fifth pillar of the TCA Change Model.</p>
          <Link href="/knowledge" className="btn">Explore the Full Model</Link>
        </ScrollReveal>
      </section>

      </div>

      {/* SIDEBAR */}
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

      {/* CASE STUDY MODAL */}
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
