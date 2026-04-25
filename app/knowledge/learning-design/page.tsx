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
/*  Compliance vs Adoption Comparison Tool — Learning Journey Phases   */
/* ------------------------------------------------------------------ */

interface JourneyPhase {
  id: string;
  num: string;
  name: string;
  description: string;
  compliance: {
    title: string;
    actions: string[];
    outcome: string;
  };
  adoption: {
    title: string;
    actions: string[];
    outcome: string;
  };
}

const journeyPhases: JourneyPhase[] = [
  {
    id: "before",
    num: "01",
    name: "Before",
    description:
      "What happens before learners enter the training experience. This phase determines whether people arrive curious or resentful, prepared or blindsided.",
    compliance: {
      title: "Compliance Training Approach",
      actions: [
        "Mandatory enrolment email sent with a deadline and escalation warning",
        "No context provided about why the training matters or how it connects to daily work",
        "Pre-work is a policy document to read, with a confirmation checkbox",
        "Manager involvement is limited to chasing completions",
        "Success is defined as 100% attendance or course completion by the deadline",
      ],
      outcome:
        "People arrive with low motivation, viewing the session as an interruption. They plan to complete it as quickly as possible and return to real work.",
    },
    adoption: {
      title: "Adoption Training Approach",
      actions: [
        "Context-setting communication explains what is changing and why it matters to the learner's specific role",
        "Managers have a pre-brief conversation with their team about what the training enables them to do differently",
        "Pre-work is a short reflection exercise: 'Describe one situation in the last month where this skill would have helped you'",
        "Learners arrive having already connected the training to their own experience",
        "Success is defined as people entering the session with a specific problem they want to solve",
      ],
      outcome:
        "People arrive curious and primed. They have already started thinking about how this applies to their work because someone helped them make the connection before the session began.",
    },
  },
  {
    id: "during",
    num: "02",
    name: "During",
    description:
      "What happens inside the learning experience itself. This phase determines whether people acquire information or practise new behaviour.",
    compliance: {
      title: "Compliance Training Approach",
      actions: [
        "Content is delivered as a presentation: slides, narration, and a knowledge check at the end",
        "The focus is on transferring information: rules, processes, policies, features",
        "Interaction is limited to multiple-choice questions that test recall",
        "Examples are generic and hypothetical, designed to cover all possible audiences",
        "The pace is uniform, and everyone moves through the same content regardless of prior knowledge",
      ],
      outcome:
        "People can pass the assessment immediately after the session but struggle to apply anything in context. Knowledge decays within days because it was never connected to practice.",
    },
    adoption: {
      title: "Adoption Training Approach",
      actions: [
        "Content is structured around scenarios that mirror real work situations the learner faces",
        "The focus is on practising new behaviours: role plays, simulations, decision exercises, and peer coaching",
        "Interaction requires applying judgement, not just recognising correct answers",
        "Examples are drawn from the learner's actual environment, using real tools and realistic constraints",
        "The pace adapts: people who already have the knowledge move to application; people who need foundations get them first",
      ],
      outcome:
        "People leave having practised the new behaviour in a safe environment. They have muscle memory, not just head knowledge. They can describe what they will do differently on Monday.",
    },
  },
  {
    id: "after",
    num: "03",
    name: "After",
    description:
      "What happens in the days and weeks following the training. This phase determines whether new behaviour sticks or whether people revert to old habits within a fortnight.",
    compliance: {
      title: "Compliance Training Approach",
      actions: [
        "A certificate of completion is issued and logged in the LMS",
        "No follow-up activity is planned or required",
        "Managers are not briefed on what was taught or what behaviour to look for",
        "The learning environment is disconnected from the work environment",
        "Refresher training is scheduled in twelve months with the same content",
      ],
      outcome:
        "The forgetting curve takes hold immediately. Within two weeks, most of the content is forgotten. The organisation has a record of completion but no evidence of behaviour change.",
    },
    adoption: {
      title: "Adoption Training Approach",
      actions: [
        "Learners leave with a specific commitment: one thing they will do differently this week",
        "Managers are equipped with a brief guide on what to observe, coach, and reinforce",
        "Peer learning groups or buddy pairs meet within two weeks to share experiences and troubleshoot",
        "Short reinforcement nudges arrive over the following weeks, spaced to combat the forgetting curve",
        "The work environment is adjusted to support the new behaviour: job aids at the point of need, updated templates, simplified processes",
      ],
      outcome:
        "The new behaviour is reinforced through practice, social accountability, and environmental support. People do not just remember the training. They integrate it into how they work.",
    },
  },
  {
    id: "measurement",
    num: "04",
    name: "Measurement",
    description:
      "How the organisation determines whether the training achieved its purpose. This phase reveals whether the organisation values evidence of learning or evidence of compliance.",
    compliance: {
      title: "Compliance Training Approach",
      actions: [
        "Completion rates are tracked and reported: percentage of staff who finished the course",
        "Assessment scores are recorded: average pass rate on the knowledge check",
        "Satisfaction surveys capture whether people liked the training",
        "Reports focus on coverage: how many people were trained, how quickly",
        "No link is made between training data and operational performance data",
      ],
      outcome:
        "The organisation can prove that training happened. It cannot prove that anything changed. The dashboard looks green, but the behaviours on the ground are the same as before.",
    },
    adoption: {
      title: "Adoption Training Approach",
      actions: [
        "Behaviour metrics are tracked: are people doing the thing the training was designed to change?",
        "Manager observations provide qualitative evidence of new behaviour in context",
        "Operational metrics are correlated with training: did error rates drop, did customer satisfaction improve, did process adherence increase?",
        "Learner confidence is measured over time, not just immediately after the session",
        "The data feeds back into design: content that does not change behaviour is redesigned, not just repeated",
      ],
      outcome:
        "The organisation has evidence that behaviour changed and that the change produced results. Training is treated as a performance intervention, not an event to be completed.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 1 — Designing training that drives behaviour change          */
/* ------------------------------------------------------------------ */

const behaviourDesignActions: ActionItem[] = [
  {
    text: "Start with the behaviour, not the content",
    detail:
      "The most common mistake in training design is starting with the content: what do people need to know? This produces information-transfer sessions that feel productive to designers but change nothing in practice. Instead, start with the behaviour: what do people need to do differently after this training? Define the observable behaviour first, then work backwards to determine what knowledge, skill, and confidence people need to perform that behaviour. If you cannot describe the specific behaviour the training is designed to produce, you do not have a training objective. You have a content outline.",
  },
  {
    text: "Design for practice, not presentation",
    detail:
      "Adults learn by doing, not by listening. Yet the majority of corporate training is still structured as a presentation with a quiz at the end. This approach transfers information efficiently but builds no capability. Redesign every training session around practice: role plays, scenario-based exercises, simulation, peer coaching, and real-world application tasks. The ratio should be at least 60% practice to 40% input. If learners spend most of their time listening to someone talk, they are being informed, not trained. Information and behaviour change are different outcomes that require different designs.",
  },
  {
    text: "Build in realistic friction and consequence",
    detail:
      "Real work involves ambiguity, competing priorities, time pressure, and imperfect information. Training that removes all of these conditions produces learners who perform perfectly in the classroom and fail in the field. Build realistic friction into your learning design: time-limited exercises where they cannot review every detail, scenarios where the right answer is unclear, role plays where the other party pushes back. The goal is not to frustrate learners but to prepare them for the conditions they will actually face. Training that feels too easy is training that has not prepared anyone for reality.",
  },
  {
    text: "Make the manager the most important part of the learning system",
    detail:
      "Research consistently shows that the single biggest determinant of whether training transfers to the workplace is the behaviour of the learner's direct manager. If the manager does not know what was taught, does not create opportunities to practise, and does not reinforce the new behaviour, the training will not stick regardless of how well it was designed. Equip managers before the training, not after. Give them a one-page brief on what their team will learn, three things to look for, and two questions to ask in the week after training. The manager is not a training administrator. They are the reinforcement mechanism.",
  },
  {
    text: "Space the learning over time instead of compressing it into a single event",
    detail:
      "The forgetting curve is one of the most replicated findings in learning science. People forget approximately 70% of new information within 24 hours and approximately 90% within a week if it is not reinforced. Yet organisations continue to design training as single-day events and then wonder why behaviour does not change. Space your learning across multiple shorter sessions with practice between them. A three-hour workshop spread across three weeks with application tasks between sessions will produce more behaviour change than a full-day workshop with no follow-up. Compression feels efficient. Spacing produces results.",
  },
  {
    text: "Design for the emotional journey, not just the knowledge journey",
    detail:
      "Behaviour change is not purely cognitive. It involves identity, confidence, social belonging, and the emotional weight of letting go of old ways of working. Training that ignores the emotional dimension treats adults as information-processing machines. Acknowledge in the design that learning something new often means admitting that the old way was not good enough. Create space for people to voice concerns, share frustrations, and support each other. Build confidence progressively by starting with low-stakes practice and increasing complexity. The goal is not just competence. It is the confidence to use new competence when it matters.",
  },
];

/* ------------------------------------------------------------------ */
/*  Topic 2 — Compliance vs Adoption training                          */
/* ------------------------------------------------------------------ */

const complianceVsAdoptionActions: ActionItem[] = [
  {
    text: "Understand when compliance training is genuinely appropriate and when it is a shortcut",
    detail:
      "Compliance training has a legitimate purpose: ensuring that people understand legal obligations, safety requirements, and regulatory standards. When the goal is awareness of rules that must be followed regardless of personal agreement, compliance-style training is appropriate. The problem arises when organisations use compliance-style design for training that requires adoption: new ways of working, cultural change, technology transitions, process improvements. These require people to choose a new behaviour, not just acknowledge a rule. Using compliance design for adoption goals is like using a screwdriver to hammer a nail. The tool is not wrong. It is wrong for the job.",
  },
  {
    text: "Recognise the five signs that your adoption training has become compliance training in disguise",
    detail:
      "Sign one: the primary metric is completion rate, not behaviour change. Sign two: the content is the same for everyone regardless of role, experience, or context. Sign three: there is no practice component, only information delivery and a knowledge check. Sign four: managers are involved only as escalation points for non-completion, not as coaches for application. Sign five: the training is a one-time event with no reinforcement plan. If three or more of these are true, you have compliance training wearing an adoption label. The design will produce awareness at best and resentment at worst, but it will not produce the behaviour change you need.",
  },
  {
    text: "Redesign adoption training around the workflow, not the classroom",
    detail:
      "The most effective adoption training does not happen in a training room. It happens at the point of need: embedded guidance in the tool, a job aid on the desk, a two-minute video accessible from the system, a coach available when the learner gets stuck. Workflow-integrated learning respects the reality that adults learn best when they are trying to do something real, not when they are sitting in a hypothetical exercise. This does not mean eliminating structured learning entirely. It means positioning structured learning as preparation for workflow learning, and designing the workflow environment to continue the learning process after the formal session ends.",
  },
  {
    text: "Shift the success metric from coverage to capability",
    detail:
      "Compliance training measures coverage: how many people completed the training? Adoption training measures capability: how many people can perform the new behaviour in context? This is a fundamental shift that affects everything from design to delivery to measurement. Coverage metrics are easy to collect but tell you nothing about impact. Capability metrics require observation, assessment, and correlation with performance data, but they tell you whether the training actually worked. When you present training results to stakeholders, lead with capability data. If you can only report completion rates, you are measuring the wrong thing.",
  },
  {
    text: "Build the business case for adoption-quality training by quantifying the cost of compliance-only approaches",
    detail:
      "Adoption-quality training costs more per learner than compliance training. It requires more design time, more facilitation skill, more manager involvement, and more measurement effort. But compliance-only training for adoption goals produces a predictable pattern: high completion rates, low behaviour change, repeated retraining, continued performance gaps, and eventually a conclusion that the problem is the people rather than the training. Quantify this cost. Calculate the cost of retraining, the cost of delayed adoption, the cost of errors made by people who completed training but cannot perform, and the cost of manager time spent dealing with the consequences. In almost every case, the total cost of compliance-only approaches exceeds the investment required for adoption-quality design.",
  },
  {
    text: "Create a training design standard that distinguishes compliance from adoption objectives",
    detail:
      "Every training request should be classified at the outset: is this a compliance objective or an adoption objective? Compliance objectives require awareness and acknowledgement. Adoption objectives require behaviour change. Each classification triggers a different design standard. Compliance objectives can use efficient, scalable formats: e-learning, policy acknowledgement, knowledge checks. Adoption objectives require practice-based, reinforced, manager-supported design. Making this distinction explicit prevents the default pattern where every training request is met with the same e-learning template regardless of whether the goal is awareness or behaviour change. The classification also helps manage stakeholder expectations: if the goal is adoption, the timeline, cost, and measurement approach will be different from compliance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Enterprise Case Studies                                            */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    label: "Walmart",
    headline:
      "Walmart used immersive VR training to move 1 million associates from compliance-style learning to behaviour-first skill building",
    hook:
      "They replaced an 8-hour classroom session with 15 minutes of VR. Associates performed better, not worse.",
    dimension: "Behaviour-First Design",
    body: [
      "Walmart faced a training challenge at a scale that few organisations encounter: how do you train over 1 million associates across thousands of stores in a way that actually changes how they behave with customers, not just what they know about policies? Traditional training was classroom-based, compliance-oriented, and measured by completion. Associates attended, passed the test, and returned to the floor with limited transfer to daily interactions.",
      "In partnership with Strivr, Walmart deployed VR-based immersive learning across all US stores. The design principle was fundamentally different from their previous approach. Rather than presenting information and testing recall, the VR modules placed associates inside realistic scenarios: a Black Friday rush, a customer de-escalation, an active safety incident. Associates had to make decisions under pressure, experience the consequences, and reflect on their choices.",
      "The results were striking. Associates who completed VR training outperformed non-VR learners on post-training skills assessments 70% of the time, achieving 10 to 15 percent higher scores. Pickup Tower training time dropped from 8 hours to 15 minutes without sacrificing effectiveness. Employee satisfaction with training increased by 30%. More importantly, Walmart reported a 10% increase in employee retention rates at stores using VR training, suggesting that the training experience itself was building engagement, not just capability.",
      "Walmart deployed over 60 immersive experiences covering customer service, empathy, de-escalation, operations, and safety preparedness. The shift was not just technological. It was philosophical: from training as information delivery to training as behaviour rehearsal. The VR was the medium. The real change was the design principle: practise the behaviour, do not just learn about it.",
    ],
    lesson:
      "Walmart demonstrated that behaviour-first training design, even at massive scale, produces measurably better outcomes than compliance-style information transfer. The key was not the VR technology itself but the design shift from knowledge delivery to behaviour practice. When associates rehearsed real scenarios rather than watching presentations, performance, retention, and satisfaction all improved.",
    source: "https://www.strivr.com/customers/walmart",
    sourceLabel: "Strivr",
  },
  {
    label: "Novartis",
    headline:
      "Novartis invested $100 million in unbossed leadership training that measured behaviour change, not course completion",
    hook:
      "They trained 350 senior leaders for a full year. Then they measured whether their teams actually felt the difference.",
    dimension: "Adoption Measurement",
    body: [
      "When Vasant Narasimhan became CEO of Novartis, he identified a cultural challenge that training alone could not solve: the organisation needed leaders who inspired and empowered rather than commanded and controlled. The concept was called 'unbossed' leadership. But Novartis did not treat this as a communication exercise or a compliance tick-box. They designed it as a behaviour change program with rigorous measurement.",
      "In 2019, 350 senior leaders entered a year-long leadership development program. This was not a two-day workshop. It was sustained, intensive, and designed around practice and feedback rather than content delivery. Leaders worked through real leadership challenges, received coaching, practised new behaviours in their actual teams, and were held accountable not for completing modules but for demonstrable shifts in how they led.",
      "The measurement approach was the critical differentiator. Rather than tracking completion or satisfaction, Novartis measured the impact of the training on the teams that reported to the trained leaders. Teams whose leaders completed the program showed 3.8 percentage points higher engagement, 2.9 percentage points higher empowerment, and 3.6 percentage points higher psychological safety compared to control groups. The data proved not that leaders liked the training, but that their teams experienced a tangible difference in leadership behaviour.",
      "Novartis committed $100 million over five years on top of their existing $200 million annual training budget to sustain the program. They planned to cascade key elements to 10,000 leaders over three years. The investment reflected a conviction that cultural change requires sustained, well-designed, behaviour-focused learning, not a one-off compliance exercise. Learning became self-initiated rather than mandated, with employees pursuing development because the culture rewarded growth, not because the LMS sent a reminder.",
    ],
    lesson:
      "Novartis showed that the difference between compliance training and adoption training is not the topic. It is the design and the measurement. By designing a year-long program around practice, coaching, and real-world application, and by measuring team-level behaviour change rather than individual completion, Novartis built evidence that training can change culture when it is designed to change behaviour.",
    source:
      "https://www.humanresourcesonline.net/case-study-how-an-unbossed-leadership-approach-drives-novartis-employer-branding-journey",
    sourceLabel: "Human Resources Online",
  },
  {
    label: "AT&T",
    headline:
      "AT&T spent $1 billion retraining 100,000 employees for jobs that did not yet exist, and proved that adoption-quality learning design works at enterprise scale",
    hook:
      "Half their workforce needed new skills. They did not outsource the problem. They built a system that made learning a career strategy.",
    dimension: "Workflow-Integrated Learning",
    body: [
      "By 2012, AT&T's internal analysis revealed a stark reality: approximately 100,000 of their employees were in roles tied to hardware functions that would not exist within a decade. The telecommunications industry was shifting from hardware to software, from networks to cloud, and the workforce was not ready. CEO Randall Stephenson called it the biggest logistical challenge AT&T had ever faced.",
      "The response, branded internally as Future Ready, was a $1 billion investment in reskilling that rejected the compliance training model entirely. Rather than mandating courses and tracking completion, AT&T built a career-integrated learning system. Employees could see which roles the company would need in the future, assess their current skills against those requirements, and build a personalised learning pathway using resources from Coursera, Udacity, Georgia Tech, and internal programs.",
      "The design was built around adoption principles. Learning was voluntary but consequential: employees who reskilled became eligible for emerging roles. Managers were trained to have career development conversations, not just performance reviews. The learning was spaced over months and years, not compressed into single events. And critically, the company adjusted its internal mobility and hiring practices to reward people who invested in their own development, creating a reinforcement loop between learning and career progression.",
      "Leadership adoption was the catalyst. Stephenson and CTO John Donovan made Future Ready a centrepiece of every town hall and leadership meeting. As one leader noted, this would have been nothing more than an HR exercise that sat on a shelf if leadership had not become its biggest advocates. By 2020, more than 100,000 employees had completed retraining programs. AT&T filled critical roles internally rather than through external hiring, saving recruitment costs while retaining institutional knowledge.",
    ],
    lesson:
      "AT&T proved that adoption-quality learning design can operate at enterprise scale when three conditions are met: the learning is connected to real career consequences, managers are activated as part of the learning system, and leadership treats the program as a strategic priority rather than an HR initiative. The $1 billion investment was not in content. It was in a system that made learning a rational, rewarded behaviour.",
    source:
      "https://hbr.org/2016/10/atts-talent-overhaul",
    sourceLabel: "Harvard Business Review",
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

export default function LearningDesign() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  /* ---- Self-check items ---- */
  const checkItems = [
    { key: "behaviour", label: "Every training program has a defined target behaviour, not just a content outline" },
    { key: "practice", label: "At least 60% of training time is spent on practice, not presentation" },
    { key: "manager", label: "Managers are briefed before training and equipped to reinforce new behaviours afterwards" },
    { key: "spaced", label: "Learning is spaced across multiple sessions with application tasks between them" },
    { key: "workflow", label: "Job aids and support are available at the point of need, not just in the training session" },
    { key: "classified", label: "Training requests are classified as compliance or adoption objectives before design begins" },
    { key: "scenarios", label: "Training scenarios are drawn from the learner's real work context, not generic examples" },
    { key: "reinforcement", label: "A reinforcement plan exists for every adoption training program, not just the initial session" },
    { key: "metrics", label: "Training success is measured by behaviour change and performance impact, not completion rates" },
    { key: "emotional", label: "The design acknowledges the emotional dimension of learning, not just the cognitive" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

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
          <span className="article-label">Enablement &middot; Learning Design &amp; Delivery</span>
          <h1 className="article-title">
            How to design training that drives behaviour change, not just knowledge transfer
          </h1>
          <p className="article-intro">
            Most corporate training is designed to transfer knowledge. Slides are presented, policies
            are explained, knowledge checks are passed, and completion certificates are issued. The
            problem is that knowledge transfer is not the same as behaviour change. People can pass
            every assessment and still return to their desks doing exactly what they did before. The
            gap between knowing and doing is where most training programs fail. This guide covers
            two connected problems: how to design learning that genuinely changes behaviour, and how
            to distinguish between training for compliance and training for adoption, because the two
            require fundamentally different design approaches.
          </p>
        </ScrollReveal>
      </div>

      {/* ================================================================ */}
      {/*  BODY — sidebar layout                                           */}
      {/* ================================================================ */}
      <div className="article-with-sidebar">
        <div className="article-main">

          {/* -------------------------------------------------------------- */}
          {/*  INTERACTIVE ELEMENT — Compliance vs Adoption Comparison Tool   */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Compliance vs Adoption: The Same Journey, Two Different Designs</h2>
              <p className="article-section-desc">
                Every learning program moves through the same four phases: Before, During, After,
                and Measurement. But compliance training and adoption training handle each phase
                completely differently. Click any phase below to see the same training scenario
                through two lenses: one designed for compliance, one designed for adoption.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="phase-list">
                {journeyPhases.map((phase, i) => (
                  <ScrollReveal key={phase.id} direction="up" delay={i * 60}>
                    <button
                      className={`phase-card${activePhase === phase.id ? " phase-card-active" : ""}`}
                      onClick={() =>
                        setActivePhase(activePhase === phase.id ? null : phase.id)
                      }
                    >
                      <span className="phase-card-pillar">{phase.num}</span>
                      <span className="phase-card-name">{phase.name}</span>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            {activePhase && (
              <ScrollReveal direction="up">
                {journeyPhases
                  .filter((p) => p.id === activePhase)
                  .map((p) => (
                    <div key={p.id} style={{ marginTop: "4px" }}>
                      <div className="detail-block" style={{ marginBottom: "16px" }}>
                        <p className="detail-body" style={{ marginBottom: 0 }}>
                          {p.description}
                        </p>
                      </div>
                      <div className="phase-compare">
                        <div className="phase-compare-col">
                          <span className="phase-compare-label">{p.compliance.title}</span>
                          <ul
                            style={{
                              margin: "12px 0 12px 0",
                              paddingLeft: "18px",
                              listStyle: "disc",
                            }}
                          >
                            {p.compliance.actions.map((a, idx) => (
                              <li
                                key={idx}
                                className="phase-compare-text"
                                style={{ marginBottom: "8px" }}
                              >
                                {a}
                              </li>
                            ))}
                          </ul>
                          <p
                            className="phase-compare-text"
                            style={{
                              fontStyle: "italic",
                              opacity: 0.85,
                              marginTop: "8px",
                              borderTop: "1px solid rgba(255,255,255,0.1)",
                              paddingTop: "10px",
                            }}
                          >
                            <strong>Outcome:</strong> {p.compliance.outcome}
                          </p>
                        </div>
                        <div className="phase-compare-col phase-compare-leader">
                          <span className="phase-compare-label">{p.adoption.title}</span>
                          <ul
                            style={{
                              margin: "12px 0 12px 0",
                              paddingLeft: "18px",
                              listStyle: "disc",
                            }}
                          >
                            {p.adoption.actions.map((a, idx) => (
                              <li
                                key={idx}
                                className="phase-compare-text"
                                style={{ marginBottom: "8px" }}
                              >
                                {a}
                              </li>
                            ))}
                          </ul>
                          <p
                            className="phase-compare-text"
                            style={{
                              fontStyle: "italic",
                              opacity: 0.85,
                              marginTop: "8px",
                              borderTop: "1px solid rgba(255,255,255,0.15)",
                              paddingTop: "10px",
                            }}
                          >
                            <strong>Outcome:</strong> {p.adoption.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </ScrollReveal>
            )}
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 1 — Designing training that drives behaviour change      */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Six Principles for Designing Training That Drives Behaviour Change
              </h2>
              <p className="article-section-desc">
                Knowledge transfer is the easy part. The hard part is designing learning experiences
                that change what people actually do when they return to their desks. These six
                principles form the foundation of behaviour-first learning design. Each one addresses
                a specific failure mode in traditional corporate training. Click any principle to
                explore it in depth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Behaviour-First Design Principles</h3>
                <ExpandableList items={behaviourDesignActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  TOPIC 2 — Compliance vs Adoption training                     */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">
                Training for Compliance vs Training for Adoption: Why the Distinction Matters
              </h2>
              <p className="article-section-desc">
                Compliance training and adoption training serve different purposes, require different
                designs, and produce different outcomes. The problem is that most organisations use
                compliance-style design for everything, including objectives that require genuine
                adoption. Understanding when each approach is appropriate, and what happens when you
                use the wrong one, is one of the most important distinctions in learning design.
                Click any point to explore it in depth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="detail-block">
                <h3 className="detail-block-title">Making the Distinction</h3>
                <ExpandableList items={complianceVsAdoptionActions} />
              </div>
            </ScrollReveal>
          </section>

          {/* -------------------------------------------------------------- */}
          {/*  SELF-CHECK                                                     */}
          {/* -------------------------------------------------------------- */}
          <section className="article-section">
            <ScrollReveal direction="up">
              <h2 className="article-section-title">Learning Design Self-Check</h2>
              <p className="article-section-desc">
                Use this checklist to assess whether your training programs are designed for
                behaviour change or whether they have drifted into compliance-style delivery. Be
                honest. A partial score tells you where to focus.
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
                        &mdash; Your learning design is built for behaviour change. Maintain this
                        standard and keep measuring impact.
                      </span>
                    )}
                    {checkedCount >= 8 && checkedCount < checkItems.length && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Strong foundation. Close the remaining gaps to move from good
                        practice to best practice.
                      </span>
                    )}
                    {checkedCount >= 5 && checkedCount < 8 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Mixed approach. Some programs are designed for behaviour change
                        but the compliance-style default is still present. Focus on manager
                        activation and measurement.
                      </span>
                    )}
                    {checkedCount >= 3 && checkedCount < 5 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Your training programs are primarily compliance-oriented. Start by
                        classifying objectives and redesigning one program using behaviour-first
                        principles.
                      </span>
                    )}
                    {checkedCount > 0 && checkedCount < 3 && (
                      <span className="check-partial">
                        {" "}
                        &mdash; Significant gaps in behaviour-focused design. Use the principles
                        above to audit your highest-priority training program.
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
                This topic is part of <strong>Enablement</strong>, the third pillar of the TCA
                Change Model.
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
