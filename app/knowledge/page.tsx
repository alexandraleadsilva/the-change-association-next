"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleLink } from "@/components/ArticleLink";
import { TCAModelDiagram } from "@/components/TCAModelDiagram";

const sidebarItems = [
  { id: "pillar-1", label: "01 · Direction" },
  { id: "pillar-2", label: "02 · Engagement" },
  { id: "pillar-3", label: "03 · Enablement" },
  { id: "pillar-4", label: "04 · Execution" },
  { id: "pillar-5", label: "05 · Sustainment" },
];

export default function Knowledge() {
  const [activeId, setActiveId] = useState("pillar-1");
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    let current = "";
    pillarRefs.current.forEach((el) => {
      if (el && window.scrollY >= el.offsetTop - 120) {
        current = el.id;
      }
    });
    if (current) setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  return (
    <>
      <Nav />

      <div className="page-header">
        <span>The TCA Change Model</span>
        <h1>A structured framework for leading change that lasts</h1>
        <p>The TCA Change Model is a sequential framework for organisational change. Each pillar builds on the last. Direction sets the conditions, Engagement creates the will, Enablement closes the capability gap, Execution delivers in a disciplined way, and Sustainment makes it permanent.</p>
      </div>

      <TCAModelDiagram />

      <div className="hub-layout">
        <aside className="hub-sidebar">
          {sidebarItems.map((item) => (
            <div className="sidebar-item" key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </aside>

        <main className="hub-content">

          {/* PILLAR 1: DIRECTION */}
          <div
            className="pillar"
            id="pillar-1"
            ref={(el) => { pillarRefs.current[0] = el; }}
          >
            <span className="pillar-num">Pillar 01</span>
            <h2>Direction</h2>
            <p className="pillar-intro">Direction establishes the foundational conditions for change. Leaders must understand and articulate both the current state, where the organisation is today, and the future state: where it needs to go. Without this diagnostic clarity, no amount of communication or engagement will create lasting alignment.</p>
            <div className="pillar-divider"></div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Change Diagnosis</h3>
              <p className="sub-pillar-desc">Current state assessment, future state definition, and gap analysis. The foundational diagnostic work leaders must complete before leading others.</p>
              <div className="article-list">
                <ArticleLink
                  title="Which change framework should you use, and does it even matter?"
                  tag="Frameworks & Methodology"
                  href="/knowledge/change-frameworks"
                />
                <ArticleLink
                  title="How to conduct a current state assessment that reveals what surveys miss"
                  tag="Diagnostic Methods"
                  href="/knowledge/current-state-assessment"
                />
                <ArticleLink
                  title="What does a meaningful gap analysis look like, and how do you avoid making it a tick-box exercise?"
                  tag="Gap Analysis"
                  href="/knowledge/gap-analysis"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Leadership Alignment</h3>
              <p className="sub-pillar-desc">Leaders have completed the diagnostic work and are genuinely committed, not just informed. Active sponsorship, not passive endorsement.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to get executives on board when they say yes but act no"
                  tag="Leadership & Sponsorship"
                  href="/knowledge/executive-sponsorship"
                />
                <ArticleLink
                  title="Are you actually leading change or just managing tasks through a change plan?"
                  tag="Change Leadership"
                  href="/knowledge/leading-vs-managing-change"
                />
                <ArticleLink
                  title="What does genuine executive sponsorship look like in practice, and how do you build it?"
                  tag="Sponsorship"
                  href="/knowledge/building-sponsorship"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Strategic Narrative</h3>
              <p className="sub-pillar-desc">The story that connects diagnosis to destination. Why us, why now, why this. Translates strategy into a compelling human case.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to build a burning platform that motivates action without creating fear"
                  tag="Communication"
                  href="/knowledge/burning-platform"
                />
                <ArticleLink
                  title="How to craft a change narrative that connects strategy to individual meaning"
                  tag="Narrative Design"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Success Definition</h3>
              <p className="sub-pillar-desc">How the organisation will know change has been achieved. Clear, measurable outcomes defined before delivery begins.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to define change success before delivery begins, and why most organisations skip this"
                  tag="Success Criteria"
                />
                <ArticleLink
                  title="What is the difference between project success and change success, and why it matters"
                  tag="Outcomes & Measurement"
                />
              </div>
            </div>
          </div>

          {/* PILLAR 2: ENGAGEMENT */}
          <div
            className="pillar"
            id="pillar-2"
            ref={(el) => { pillarRefs.current[1] = el; }}
          >
            <span className="pillar-num">Pillar 02</span>
            <h2>Engagement</h2>
            <p className="pillar-intro">Engagement is the sustained work of bringing people on the journey. It treats resistance not as a problem to manage, but as feedback to understand. A signal about what people need in order to move forward. Effective engagement builds trust, surfaces concerns early, and creates genuine desire for change.</p>
            <div className="pillar-divider"></div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Stakeholder Strategy</h3>
              <p className="sub-pillar-desc">Identifying, analysing, and prioritising stakeholders. Understanding who influences what, and designing tailored engagement approaches.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to engage operational teams who are too busy for another initiative"
                  tag="Stakeholder Engagement"
                />
                <ArticleLink
                  title="How to build a stakeholder map that actually drives your engagement approach"
                  tag="Stakeholder Mapping"
                />
                <ArticleLink
                  title="How to identify and activate the informal influencers who shape adoption"
                  tag="Influence & Networks"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Communication & Narrative</h3>
              <p className="sub-pillar-desc">Delivering the strategic narrative through the right channels, at the right time, for the right audiences. Two-way, not broadcast.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to build a change communication plan that does more than inform"
                  tag="Communication Planning"
                />
                <ArticleLink
                  title="When should you communicate change, and what happens when you get the timing wrong?"
                  tag="Communication Timing"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Change Impact Assessment</h3>
              <p className="sub-pillar-desc">Understanding what the change means for people day-to-day: roles, processes, behaviours, workloads. The foundation for targeted support.</p>
              <div className="article-list">
                <ArticleLink
                  title="What does a good change readiness assessment actually tell you?"
                  tag="Readiness & Assessment"
                />
                <ArticleLink
                  title="How to run a stakeholder impact assessment that people actually use"
                  tag="Impact Analysis"
                />
                <ArticleLink
                  title="The real reason employees resist change, and it is not what you think"
                  tag="People & Resistance"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Change Experience</h3>
              <p className="sub-pillar-desc">Designing the end-to-end human experience of change. Emotional transitions, touchpoints, and moments that build or erode commitment.</p>
              <div className="article-list">
                <ArticleLink
                  title="Why change fails when people understand the process but not the experience"
                  tag="Change Adoption"
                />
                <ArticleLink
                  title="What does the emotional journey of change actually look like for the people going through it?"
                  tag="Transition & Emotion"
                />
                <ArticleLink
                  title="How to design change touchpoints that build trust instead of eroding it"
                  tag="Experience Design"
                />
              </div>
            </div>
          </div>

          {/* PILLAR 3: ENABLEMENT */}
          <div
            className="pillar"
            id="pillar-3"
            ref={(el) => { pillarRefs.current[2] = el; }}
          >
            <span className="pillar-num">Pillar 03</span>
            <h2>Enablement</h2>
            <p className="pillar-intro">Enablement is the practical work of closing the capability gap. It answers the question: do people have what they need to actually perform in the new way? This is the pillar most often underinvested in and the most commonly cited root cause of failed adoption.</p>
            <div className="pillar-divider"></div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Learning Design & Delivery</h3>
              <p className="sub-pillar-desc">Designing training and learning interventions matched to the nature of the change, not just scheduling courses.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to design training that drives behaviour change, not just knowledge transfer"
                  tag="Training Design"
                />
                <ArticleLink
                  title="What is the difference between training for compliance and training for adoption?"
                  tag="Learning Strategy"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Process Design</h3>
              <p className="sub-pillar-desc">Redesigning or confirming processes so they reflect and reinforce the desired future state, not the current one.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to redesign processes so they reinforce the future state, not the old one"
                  tag="Process Redesign"
                />
                <ArticleLink
                  title="When should process change happen in relation to people change?"
                  tag="Sequencing"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Tools & Systems</h3>
              <p className="sub-pillar-desc">Ensuring the technology, infrastructure, and digital environment support the new way of working from day one.</p>
              <div className="article-list">
                <ArticleLink
                  title="Why digital transformations keep failing the people they are supposed to help"
                  tag="Digital Transformation"
                />
                <ArticleLink
                  title="What went wrong when a well-planned ERP rollout lost the workforce halfway through?"
                  tag="Digital Transformation"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Role Clarity & Capability</h3>
              <p className="sub-pillar-desc">Ensuring every individual understands their new role, responsibilities, and the behaviours expected of them.</p>
              <div className="article-list">
                <ArticleLink
                  title="What is HR's actual role in an organisational transformation?"
                  tag="HR & People Teams"
                />
                <ArticleLink
                  title="When should you bring in an external change manager, and when should you not?"
                  tag="Change Management"
                />
                <ArticleLink
                  title="How to define new roles and responsibilities without creating confusion or resistance"
                  tag="Role Design"
                />
              </div>
            </div>
          </div>

          {/* PILLAR 4: EXECUTION */}
          <div
            className="pillar"
            id="pillar-4"
            ref={(el) => { pillarRefs.current[3] = el; }}
          >
            <span className="pillar-num">Pillar 04</span>
            <h2>Execution</h2>
            <p className="pillar-intro">Execution is where intention becomes action. It encompasses the planning, governance and delivery mechanisms that translate a change strategy into coordinated, measurable progress. Without rigorous execution, even the best strategy dissolves into a series of disconnected activities.</p>
            <div className="pillar-divider"></div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Roadmap & Planning</h3>
              <p className="sub-pillar-desc">A phased, sequenced plan for delivering change that connects workstreams, resources, and milestones in an integrated view.</p>
              <div className="article-list">
                <ArticleLink
                  title="What does a phased approach to change actually look like in practice?"
                  tag="Planning & Phasing"
                />
                <ArticleLink
                  title="How to manage change across multiple sites without losing consistency"
                  tag="Complex Change"
                />
                <ArticleLink
                  title="What can a failed restructure teach us about the timing of change?"
                  tag="Restructure & Timing"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Change Delivery Cadence</h3>
              <p className="sub-pillar-desc">The rhythm of change: sprint cycles, check-ins, steering reviews. It keeps delivery on track and responsive to emerging issues.</p>
              <div className="article-list">
                <ArticleLink
                  title="How do you adapt your change approach when the business keeps shifting?"
                  tag="Adaptive Change"
                />
                <ArticleLink
                  title="How to set up a change delivery rhythm that keeps momentum without burning people out"
                  tag="Delivery Rhythm"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Governance & Decision Rights</h3>
              <p className="sub-pillar-desc">Clear structures for how change decisions are made, escalated, and communicated across the programme.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to design change governance that enables decisions, not delays them"
                  tag="Governance Design"
                />
                <ArticleLink
                  title="Who should own what in a change programme, and how do you make that clear?"
                  tag="Decision Rights"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Adoption Metrics</h3>
              <p className="sub-pillar-desc">Leading and lagging indicators that measure actual behaviour change, not just training completion or comms reach.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to measure change adoption when the metrics are hard to pin down"
                  tag="Measurement & Tracking"
                />
                <ArticleLink
                  title="What leading indicators actually predict successful change adoption?"
                  tag="Leading Indicators"
                />
              </div>
            </div>
          </div>

          {/* PILLAR 5: SUSTAINMENT */}
          <div
            className="pillar"
            id="pillar-5"
            ref={(el) => { pillarRefs.current[4] = el; }}
          >
            <span className="pillar-num">Pillar 05</span>
            <h2>Sustainment</h2>
            <p className="pillar-intro">Sustainment is the work that begins where most change programmes end. It is the systematic effort to reinforce new behaviours, integrate them into culture, and prevent regression to old ways of working. Sustainment is not passive. It requires deliberate design and ongoing attention.</p>
            <div className="pillar-divider"></div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Reinforcement Planning</h3>
              <p className="sub-pillar-desc">Deliberate mechanisms: recognition, feedback loops, performance signals. These reward and cement the new way of working.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to design reinforcement mechanisms that make new behaviours the path of least resistance"
                  tag="Reinforcement Design"
                />
                <ArticleLink
                  title="What role do managers play in sustaining change, and how do you equip them for it?"
                  tag="Manager Enablement"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Performance Alignment</h3>
              <p className="sub-pillar-desc">Aligning KPIs, role profiles, and performance conversations to the new behaviours and outcomes.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to align performance management to the new way of working without creating a backlash"
                  tag="Performance Management"
                />
                <ArticleLink
                  title="When should KPIs change, and what happens when they lag behind the transformation?"
                  tag="KPI Alignment"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Culture Integration</h3>
              <p className="sub-pillar-desc">Embedding change into organisational values, norms, rituals, and leadership behaviours so it becomes 'how we work here'.</p>
              <div className="article-list">
                <ArticleLink
                  title="How do you change culture when you cannot see it, touch it, or measure it easily?"
                  tag="Culture"
                />
                <ArticleLink
                  title="How did a merger succeed where most fail, by focusing on culture first?"
                  tag="Culture & Mergers"
                />
                <ArticleLink
                  title="What does it actually mean to embed change into culture, and how do you know when it has happened?"
                  tag="Cultural Embedding"
                />
              </div>
            </div>

            <div className="sub-pillar">
              <h3 className="sub-pillar-title">Continuous Improvement</h3>
              <p className="sub-pillar-desc">Establishing feedback loops and review cycles that identify what's working, what isn't, and what needs to adapt.</p>
              <div className="article-list">
                <ArticleLink
                  title="How to build feedback loops that keep change alive after the programme ends"
                  tag="Feedback Loops"
                />
                <ArticleLink
                  title="What does a post-implementation review actually need to cover, and who should be in the room?"
                  tag="Post-Implementation Review"
                />
              </div>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </>
  );
}
