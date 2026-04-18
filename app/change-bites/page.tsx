"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SubscribeModal } from "@/components/SubscribeModal";

type Category =
  | "all"
  | "leadership"
  | "change-adoption"
  | "hr-people"
  | "culture"
  | "digital-transformation"
  | "tools";

const filterTabs: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Leadership", value: "leadership" },
  { label: "Culture", value: "culture" },
  { label: "HR & People", value: "hr-people" },
  { label: "Digital Transformation", value: "digital-transformation" },
  { label: "Change Adoption", value: "change-adoption" },
];

interface ChangeBite {
  title: string;
  body: string[];
  takeaway: string;
  relatedLabel: string;
  relatedTitle: string;
  relatedHref: string;
}

const changeBites: ChangeBite[] = [
  {
    title: "The 70% failure stat is misleading. Here is what actually kills change.",
    body: [
      "You have heard it a thousand times. 70% of change initiatives fail. It gets quoted in every business case, every steering committee, and every change management pitch deck. But the stat is misleading, and relying on it is doing your organisation a disservice.",
      "The number comes from a 1993 paper by Michael Hammer and James Champy about reengineering. It was about a very specific type of change in a very specific era. It has since been generalised, rounded, and repeated so often that it has become an unexamined truth.",
      "The real question is not whether 70% of changes fail. It is why the ones that fail, fail. And the answer is almost never the framework, the plan, or the technology. It is the human factors: unclear sponsorship, poor engagement, capability gaps that were never closed, and organisations that measured project delivery but not behaviour change.",
      "When you dig into the data, the pattern is consistent. The changes that fail are the ones where leadership approved but did not lead. Where communication happened but connection did not. Where training was delivered but capability was not built. Where the system went live but the people did not.",
      "The 70% stat is not wrong. It is incomplete. It tells you that change is hard. It does not tell you why. And if you do not understand why, you cannot fix it. The TCA Change Model exists to address the specific failure points that research consistently identifies: Direction without alignment, Engagement without depth, Enablement without confidence, Execution without governance, and Sustainment without reinforcement.",
    ],
    takeaway: "Stop quoting the stat. Start understanding the specific failure points. That is where the real work begins.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "The TCA Change Model: A structured framework for leading change that lasts",
    relatedHref: "/knowledge",
  },
  {
    title: "Your change plan is not a change strategy. Here is the difference.",
    body: [
      "Every change programme has a plan. A Gantt chart with milestones. A communication schedule. A training calendar. A stakeholder matrix. A RAID log. These are the artefacts of change management. They are necessary. They are not sufficient.",
      "A change plan tells you what activities will happen and when. A change strategy tells you why those activities matter, how they connect to the outcome you are trying to achieve, and what you will do when the plan meets reality and breaks.",
      "The difference matters because plans are rigid and strategies are adaptive. A plan assumes the world will behave as predicted. A strategy assumes it will not. A plan tracks completion. A strategy tracks impact.",
      "Here is a simple test. Look at your change plan and ask: if we completed every activity on time and on budget, would we know whether people are actually working differently? If the answer is no, you have a plan without a strategy.",
      "A change strategy starts with diagnosis: where is the organisation today, and how far is that from where it needs to be? It defines success in terms of behaviour and outcomes, not activities and deliverables. It identifies the specific human barriers, capability gaps, cultural resistances, and structural obstacles, and designs the approach around them.",
      "The plan is the vehicle. The strategy is the navigation. You need both. But if you only have the plan, you are driving without knowing where you are going.",
    ],
    takeaway: "If your change plan could be completed perfectly without anyone actually changing how they work, it is a plan, not a strategy.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "What is the difference between project success and change success, and why it matters",
    relatedHref: "/knowledge/project-vs-change-success",
  },
  {
    title: "Stop calling it resistance. It is feedback.",
    body: [
      "The language of change management has a problem. It calls disagreement 'resistance'. It labels people who push back as 'blockers'. It treats questions as obstacles and scepticism as a deficiency that needs to be overcome.",
      "This framing is not just unhelpful. It is dangerous. When you label someone's response to change as resistance, you stop listening to what they are actually telling you. And what they are telling you is almost always more valuable than the change plan they are resisting.",
      "When someone says 'this will not work', they might be telling you that the process was designed without understanding how the work actually gets done. When someone says 'we tried this before', they might be telling you that the organisation has unresolved trauma from a previous failed change. When someone goes quiet, they might be telling you that they do not feel safe enough to speak up.",
      "Resistance is the organisation's immune system. It activates when something feels threatening. And just like a physical immune response, the answer is not to suppress it. It is to understand what triggered it.",
      "The best change practitioners do not manage resistance. They decode it. They ask: what is this response telling me about the gap between where people are and where we are asking them to go? They treat every act of resistance as data about the quality of the change approach.",
      "The next time someone pushes back, do not reach for your stakeholder engagement plan. Reach for curiosity. Ask what is driving their response. Listen to the answer. Then decide whether the change needs to adapt, not whether the person needs to be managed.",
    ],
    takeaway: "Resistance is not a character flaw. It is a diagnostic signal. The question is not how to overcome it. The question is what it is telling you.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Change Impact Assessment: readiness, impact, and the real reason employees resist change",
    relatedHref: "/knowledge/change-impact-assessment",
  },
  {
    title: "Culture is not what is on the wall. It is what happens when no one is watching.",
    body: [
      "Every organisation has values on the wall. Integrity. Collaboration. Innovation. Customer focus. They are printed on lanyards, featured in onboarding decks, and recited in town halls. And most of the time, they bear little resemblance to how the organisation actually operates.",
      "Culture is not what an organisation says it values. It is what it rewards, tolerates, and punishes in practice. It is the behaviour that gets someone promoted, the behaviour that gets someone ignored, and the behaviour that everyone knows is unacceptable but nobody addresses.",
      "If the values say collaboration but the incentive structure rewards individual performance, the culture is competitive. If the values say innovation but the response to failure is blame, the culture is risk-averse. If the values say transparency but bad news never reaches the top, the culture is one of concealment.",
      "This matters for change because culture is the environment in which every change initiative either takes root or dies. You can design the perfect change programme, but if the culture is working against it, the programme will lose.",
      "The most common mistake organisations make is trying to change culture by changing the values statement. Culture does not change because you write new words. It changes when you change what gets rewarded, what gets measured, and what leaders do when they think no one is watching.",
    ],
    takeaway: "If you want to know the real culture, ignore the posters. Watch what happens in the meeting after the meeting.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "How to embed change into culture, and how to know when it has happened",
    relatedHref: "/knowledge/culture-integration",
  },
  {
    title: "HR is not the change management department. Stop treating it like one.",
    body: [
      "There is a pattern that plays out in almost every large transformation. The programme team builds the plan. Leadership approves it. And then someone asks: who is going to handle the people side? The answer, almost invariably, is HR.",
      "This is a mistake. Not because HR does not care about people. They do. But because dumping the people side of change onto HR without clarity about what that means creates a function that is simultaneously over-relied upon and under-empowered.",
      "HR is expected to manage communications, handle resistance, deliver training, support affected employees, redesign roles, update policies, and maintain engagement, all while continuing their day job. No function can do all of that well. And when they inevitably cannot, they become the scapegoat for the programme's failure to manage change properly.",
      "The real question is not whether HR should be involved. Of course they should. The question is what HR should own versus what the programme should own versus what line managers should own. Without that clarity, everyone assumes someone else is doing it, and the critical work falls through the gaps.",
      "HR's strongest contribution to a transformation is not being the change management team. It is being the expert on the people systems that need to align with the change: performance management, reward and recognition, role design, capability development, and workforce planning. These are strategic enablers, not administrative tasks.",
    ],
    takeaway: "HR should enable the people systems that sustain change. They should not be the default owner of everything the programme team does not want to do.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Role Clarity: what HR, change managers, project managers, and line managers each own",
    relatedHref: "/knowledge/role-clarity",
  },
  {
    title: "Your system went live. Your people did not.",
    body: [
      "Go-live is the most dangerous moment in any technology-driven transformation. Not because of technical risk. Most organisations manage the technical cutover competently. The danger is in the assumption that go-live equals change.",
      "On go-live day, the system is in production. The old system is switched off. The project team celebrates. The steering committee reports success. And then Monday comes, and the people who are supposed to use the new system discover that it does not work the way they expected, the training they received three weeks ago has already faded, and their manager cannot answer their questions because nobody trained the managers.",
      "This is the moment where the gap between project success and change success becomes visible. The project delivered. The change did not. And the tragedy is that this was predictable. It happens in the majority of technology implementations, and it happens for the same reasons every time.",
      "The system was configured based on documented processes, not actual ones. The training was designed for knowledge transfer, not behaviour change. The go-live date was set by the project timeline, not by organisational readiness. And the people who would use the system daily were the last to be consulted about how it should work.",
      "The fix is not better technology. It is better change management. It is understanding that a system going live is the beginning of the change, not the end. It is measuring adoption at 30, 60, and 90 days, not just at launch. And it is keeping support in place long after the project team has moved on.",
    ],
    takeaway: "Go-live is not the finish line. It is the starting line. The real change begins when people have to use the system on a Monday morning.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Why digital transformations keep failing the people they are supposed to help",
    relatedHref: "/knowledge/tools-and-systems",
  },
  {
    title: "Training completion is not adoption. Here is how to tell the difference.",
    body: [
      "There is a number that change programmes love to report: training completion rates. 95% of staff completed the training. It sounds impressive. It means almost nothing.",
      "Training completion tells you that people sat in a room, or clicked through an online module, or watched a video. It does not tell you that they understood what they learned. It does not tell you that they can apply it under pressure. And it certainly does not tell you that they will do anything differently tomorrow.",
      "Adoption is a behaviour, not an event. It is not measured by whether someone attended the training. It is measured by whether they changed how they work. And the distance between attending and adopting is where most enablement programmes fail.",
      "The signs of genuine adoption are observable. People are using the new system without being reminded. They are following the new process without reverting to the old one. They are making decisions using the new framework. They are asking questions that show they are engaging with the change, not just complying with it.",
      "The signs of training without adoption are equally observable. People completed the course but still use spreadsheets instead of the new system. They attended the workshop but still escalate decisions they should now make themselves. They passed the assessment but still ask their colleague to do it for them.",
      "If you want to measure adoption, stop counting completions. Start observing behaviours. Go to the place where the work happens and watch whether anything is different. That is your adoption metric.",
    ],
    takeaway: "Completion is an input. Adoption is an outcome. Measure the outcome, not the input.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "How to measure change adoption when the metrics are hard to pin down",
    relatedHref: "/knowledge/adoption-metrics",
  },
  {
    title: "Why your best people leave during transformation.",
    body: [
      "There is an uncomfortable pattern in organisational transformation. The people you most need to keep are often the first to leave. Not because they cannot handle change. Because they can. They have options. And when the change feels poorly managed, they exercise them.",
      "Your highest performers are the ones who are most attuned to whether the organisation is serious about its stated direction. They watch leadership behaviour more closely than anyone. When they see leaders saying one thing and doing another, they do not complain. They update their LinkedIn profile.",
      "They also have the lowest tolerance for dysfunction. If the transformation creates ambiguity about their role, increases their workload without acknowledgement, or removes the autonomy they valued, they will not wait to see if it gets better. They will find somewhere that already is better.",
      "The irony is that most retention strategies during transformation focus on the wrong people. They focus on the people who are visibly unhappy, the ones raising concerns, pushing back, or disengaging. Meanwhile, the quiet departure of a high performer, the person who simply stops contributing their discretionary effort before handing in their notice, goes unnoticed until it is too late.",
      "The solution is not a retention bonus. It is genuine engagement. It is involving your best people in shaping the change rather than subjecting them to it. It is having honest conversations about what is changing and what is not. It is ensuring that the transformation does not accidentally destroy the things that made the organisation worth staying at.",
    ],
    takeaway: "The people who leave first are not the ones who cannot adapt. They are the ones who have the most options. Treat your best people as partners in the change, not passengers.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "How to engage operational teams who are too busy for another initiative",
    relatedHref: "/knowledge/stakeholder-strategy",
  },
  {
    title: "Are you actually leading change or just managing tasks through a change plan?",
    body: [
      "There is a test you can run right now. Look at your calendar for the last two weeks. Count the hours you spent on status reports, RAID logs, governance decks, and stakeholder trackers. Now count the hours you spent in genuine conversation with the people affected by the change. Listening to their concerns. Understanding their experience. Shaping their understanding of why this matters.",
      "If the first number dwarfs the second, you are managing change. You are not leading it.",
      "Change management is necessary. Someone needs to track the milestones, manage the risks, and keep the governance structure informed. But management without leadership produces activity without adoption. Things get done. People do not change.",
      "Change leadership is about judgement, not process. It is about knowing when to push and when to pause. When to follow the plan and when to throw it out. When to present and when to listen. It is about taking ownership of whether the change actually lands, not just whether the activities were completed.",
      "The uncomfortable truth is that most change professionals are trained in management and rewarded for management. The plans, the reports, the frameworks. Leadership is harder to teach, harder to measure, and harder to recognise. But it is the difference between a change that gets delivered and a change that gets adopted.",
    ],
    takeaway: "If you completed every task on your change plan and nobody worked differently, you managed the project. You did not lead the change.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "An interactive self-assessment: are you leading change or managing it?",
    relatedHref: "/knowledge/leading-vs-managing-change",
  },
  {
    title: "Why does change fail when people understand the process but not the experience?",
    body: [
      "You have explained the change clearly. The communication was crisp. The process documentation was thorough. The training covered every step. People can describe what is changing. And yet nothing is different.",
      "This is one of the most common and least understood failure patterns in organisational change. People understand the process but have not experienced the change. They know what they are supposed to do. They do not know what it feels like to do it.",
      "Understanding is cognitive. Experience is emotional. And the gap between the two is where most changes die. You can inform someone about a new process in a 30-minute briefing. But the first time they try to use it under pressure, with a customer waiting and their manager watching, the old way of doing things will feel safer, faster, and more reliable.",
      "The change experience is not a soft extra. It is the mechanism through which adoption happens. People do not change because they received a communication. They change because they went through a transition: from the familiar to the unfamiliar, from competence to uncertainty, and eventually to a new competence that feels natural.",
      "If your change approach focuses on informing people but not on supporting them through the emotional and practical experience of working differently, you are building a bridge that stops halfway across.",
    ],
    takeaway: "Information tells people what to do. Experience teaches them what it feels like. You need both, but most change programmes only deliver the first.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "The emotional journey of change and how to design touchpoints that build trust",
    relatedHref: "/knowledge/change-experience",
  },
  {
    title: "How to get executives on board when they say yes but act no.",
    body: [
      "The meeting went well. The executive nodded along. They said the right things. They approved the budget. They signed the business case. And then nothing happened.",
      "This is passive sponsorship. It looks like support. It is not. It is permission without commitment. Approval without action. Agreement without ownership.",
      "The gap between saying yes and acting yes is one of the most dangerous in any transformation. Because everyone below the executive interprets their behaviour, not their words. When middle managers see that the sponsor approved the change but did not attend the launch, did not reference it in their own meetings, and did not make any trade-offs to support it, they conclude that the change is optional.",
      "Active sponsorship is visible, consistent, and personal. It means the executive communicates about the change in their own words. It means they intervene when blockers arise rather than waiting for an escalation. It means they make difficult trade-offs when the change competes with other priorities. And it means they change their own behaviour to model what the change requires.",
      "If your sponsor is passive, it is not because they do not care. It is usually because they do not know what active sponsorship looks like in practice. Your job is to show them, specifically and tactfully, what the organisation needs to see from them and when.",
    ],
    takeaway: "An executive who approved the change but is not visibly leading it is not a sponsor. They are a signature on a document.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "The five levels of executive sponsorship and how to move your sponsor up",
    relatedHref: "/knowledge/executive-sponsorship",
  },
  {
    title: "What is HR's actual role in a transformation, and why does it keep getting confused?",
    body: [
      "Ask five people in a transformation programme what HR's role is and you will get five different answers. HR supports the people side. HR handles the comms. HR manages the training. HR deals with the restructure. HR looks after the affected employees.",
      "The confusion is not HR's fault. It is a design failure in how organisations set up their change programmes. When nobody explicitly defines who owns what, HR becomes the default owner of everything that is not technical delivery. And because HR professionals genuinely care about people, they accept the work even when it is not theirs to carry.",
      "The result is a function that is stretched across too many responsibilities, empowered in none of them, and blamed when the people side does not land. HR ends up doing change management, communication, training coordination, and stakeholder engagement while also maintaining their core responsibilities in talent, performance, and employee relations.",
      "The fix is role clarity. Before the programme starts, define explicitly what HR owns, what the change management function owns, what line managers own, and what the programme team owns. Write it down. Test it with each group. And revisit it when the boundaries get blurred, because they will.",
      "HR's most powerful contribution to a transformation is not doing everything. It is owning the systems that sustain change: performance management, reward and recognition, capability development, and workforce planning. These are the levers that determine whether the change sticks after the programme team leaves.",
    ],
    takeaway: "HR's role is not to be the change management team. It is to own the people systems that make change permanent.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Role clarity: what HR, change managers, and line managers each own in transformation",
    relatedHref: "/knowledge/role-clarity",
  },
  {
    title: "How do you change culture when you cannot see it, touch it, or measure it easily?",
    body: [
      "Culture is the most important and most misunderstood dimension of organisational change. Everyone agrees it matters. Almost nobody agrees on what it is. And the approaches most organisations take to changing it, new values statements, culture workshops, engagement surveys, are almost always insufficient.",
      "Culture is not a thing. It is a pattern. It is the accumulated weight of thousands of decisions about what gets rewarded, what gets tolerated, and what gets punished. It is the behaviour that people adopt when they are not being watched. It is the story people tell new starters about how things really work here.",
      "You cannot change culture by declaring new values. You change it by changing the systems that reinforce the current ones. If you want a culture of collaboration, you need to stop rewarding individual heroics. If you want a culture of innovation, you need to stop punishing failure. If you want a culture of transparency, leaders need to share information they would rather keep to themselves.",
      "The test of whether culture has actually changed is simple. Watch what happens when someone new joins. Do they learn the new way of working naturally, through observation and imitation? Or do a veteran colleague quietly teach them how things really work, overriding everything in the onboarding deck?",
      "Culture change is slow, it is hard, and it cannot be delegated to a programme team. It requires leaders to change their own behaviour first, then to redesign the systems that shape everyone else's behaviour. There are no shortcuts.",
    ],
    takeaway: "Culture is not changed by posters. It is changed by what leaders reward, what systems reinforce, and what happens when no one is looking.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Culture Integration: embedding change into organisational DNA",
    relatedHref: "/knowledge/culture-integration",
  },
  {
    title: "Why digital transformations keep failing the people they are supposed to help.",
    body: [
      "The technology works. It always works. The system is configured. The data is migrated. The APIs are connected. The testing is complete. And then the people who are supposed to use it do not use it, or they use it badly, or they find workarounds that bypass it entirely.",
      "Digital transformation is not a technology problem. It is a people problem wrapped in technology. The system is the easy part. The hard part is changing how people work, what they trust, and what they are willing to let go of.",
      "The pattern is remarkably consistent. The technology team builds the system based on documented processes. But the documented processes do not reflect how work actually gets done. The training team schedules courses. But the courses teach features, not behaviours. The go-live date is set by the project timeline. But the people are not ready by that date.",
      "Then the system goes live and the problems begin. Workarounds appear within the first week. Support tickets flood in. Managers cannot answer questions because no one trained them differently from their teams. And the dashboard shows adoption rates that bear no resemblance to the business case.",
      "The fix is not more technology or better technology. It is better change management applied earlier. It is understanding how people actually work before designing the system. It is building training around behaviours, not features. It is measuring adoption, not go-live. And it is keeping support in place long after the project team has declared success and moved on.",
    ],
    takeaway: "The technology is never the problem. The problem is the distance between how the system was designed and how people actually need to work.",
    relatedLabel: "Go deeper on this topic",
    relatedTitle: "Tools & Systems: why digital transformations fail and how to prevent it",
    relatedHref: "/knowledge/tools-and-systems",
  },
];

export default function ChangeBites() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [activeBite, setActiveBite] = useState<number | null>(null);

  const isVisible = (category: Category) =>
    activeFilter === "all" || activeFilter === category;

  return (
    <>
      <Nav />

      <div className="page-header">
        <span>Change Bites</span>
        <h1>Sharp thinking on change, leadership & people</h1>
        <p>
          Short, direct articles on the questions change professionals are
          actually asking. New posts published regularly, also available on
          LinkedIn.
        </p>
      </div>

      <div className="blog-layout">
        <main className="blog-main">
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                className={`filter-tab${activeFilter === tab.value ? " active" : ""}`}
                onClick={() => setActiveFilter(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FEATURED */}
          {isVisible("leadership") && (
            <div className="featured-post" data-category="leadership">
              <span className="featured-label">Featured</span>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(8); }}>
                  Are you actually leading change or just managing tasks through
                  a change plan?
                </a>
              </h2>
              <p>
                Change plans can create a sense of control, but control is not
                the same as leadership. Many professionals find themselves
                focused on activities, timelines, and deliverables without fully
                engaging with how people are experiencing the change. Real
                leadership goes beyond execution. It shapes understanding,
                belief, and commitment.
              </p>
              <button className="btn-gold" onClick={() => setActiveBite(8)}>
                Read Article
              </button>
            </div>
          )}

          {/* CHANGE BITE 1 - POPUP */}
          {isVisible("leadership") && (
            <div className="blog-post" data-category="leadership">
              <div className="post-meta">
                <span className="post-tag">Leadership</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">April 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(0); }}>
                  {changeBites[0].title}
                </a>
              </h2>
              <p>{changeBites[0].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(0)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE 2 - POPUP */}
          {isVisible("leadership") && (
            <div className="blog-post" data-category="leadership">
              <div className="post-meta">
                <span className="post-tag">Leadership</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">April 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(1); }}>
                  {changeBites[1].title}
                </a>
              </h2>
              <p>{changeBites[1].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(1)}>Read More</button>
            </div>
          )}

          {/* POST: Change Experience */}
          {isVisible("change-adoption") && (
            <div className="blog-post" data-category="change-adoption">
              <div className="post-meta">
                <span className="post-tag">Change Adoption</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">April 2025</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(9); }}>
                  Why does change fail when people understand the process but not the experience?
                </a>
              </h2>
              <p>{changeBites[9].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(9)}>Read More</button>
            </div>
          )}

          {/* POST: Executive Sponsorship */}
          {isVisible("leadership") && (
            <div className="blog-post" data-category="leadership">
              <div className="post-meta">
                <span className="post-tag">Leadership</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(10); }}>
                  How to get executives on board when they say yes but act no
                </a>
              </h2>
              <p>{changeBites[10].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(10)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE 3 - POPUP */}
          {isVisible("change-adoption") && (
            <div className="blog-post" data-category="change-adoption">
              <div className="post-meta">
                <span className="post-tag">Change Adoption</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(2); }}>
                  {changeBites[2].title}
                </a>
              </h2>
              <p>{changeBites[2].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(2)}>Read More</button>
            </div>
          )}

          {/* POST: HR Role */}
          {isVisible("hr-people") && (
            <div className="blog-post" data-category="hr-people">
              <div className="post-meta">
                <span className="post-tag">HR & People</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(11); }}>
                  What is HR&apos;s actual role in a transformation, and why does it keep getting confused?
                </a>
              </h2>
              <p>{changeBites[11].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(11)}>Read More</button>
            </div>
          )}

          {/* POST: Culture */}
          {isVisible("culture") && (
            <div className="blog-post" data-category="culture">
              <div className="post-meta">
                <span className="post-tag">Culture</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(12); }}>
                  How do you change culture when you cannot see it, touch it, or measure it easily?
                </a>
              </h2>
              <p>{changeBites[12].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(12)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE: Culture */}
          {isVisible("culture") && (
            <div className="blog-post" data-category="culture">
              <div className="post-meta">
                <span className="post-tag">Culture</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(3); }}>
                  {changeBites[3].title}
                </a>
              </h2>
              <p>{changeBites[3].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(3)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE: HR & People */}
          {isVisible("hr-people") && (
            <div className="blog-post" data-category="hr-people">
              <div className="post-meta">
                <span className="post-tag">HR & People</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(4); }}>
                  {changeBites[4].title}
                </a>
              </h2>
              <p>{changeBites[4].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(4)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE: Digital Transformation */}
          {isVisible("digital-transformation") && (
            <div className="blog-post" data-category="digital-transformation">
              <div className="post-meta">
                <span className="post-tag">Digital Transformation</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(5); }}>
                  {changeBites[5].title}
                </a>
              </h2>
              <p>{changeBites[5].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(5)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE: Change Adoption */}
          {isVisible("change-adoption") && (
            <div className="blog-post" data-category="change-adoption">
              <div className="post-meta">
                <span className="post-tag">Change Adoption</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(6); }}>
                  {changeBites[6].title}
                </a>
              </h2>
              <p>{changeBites[6].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(6)}>Read More</button>
            </div>
          )}

          {/* CHANGE BITE: HR & People - Retention */}
          {isVisible("hr-people") && (
            <div className="blog-post" data-category="hr-people">
              <div className="post-meta">
                <span className="post-tag">HR & People</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">January 2026</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(7); }}>
                  {changeBites[7].title}
                </a>
              </h2>
              <p>{changeBites[7].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(7)}>Read More</button>
            </div>
          )}

          {/* POST: Digital Transformation */}
          {isVisible("digital-transformation") && (
            <div className="blog-post" data-category="digital-transformation">
              <div className="post-meta">
                <span className="post-tag">Digital Transformation</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(13); }}>
                  Why digital transformations keep failing the people they are supposed to help
                </a>
              </h2>
              <p>{changeBites[13].body[0].slice(0, 200)}...</p>
              <button className="btn" onClick={() => setActiveBite(13)}>Read More</button>
            </div>
          )}
        </main>

        <aside className="blog-sidebar">
          <div className="sidebar-section">
            <span className="sidebar-heading">Stay in the Loop</span>
            <SubscribeModal />
          </div>

          <div className="sidebar-section">
            <span className="sidebar-heading">Topics</span>
            <ul className="topic-list">
              <li><Link href="/knowledge">Change Leadership <span className="topic-count">10</span></Link></li>
              <li><Link href="/knowledge">HR & People Teams <span className="topic-count">3</span></Link></li>
              <li><Link href="/knowledge">Culture <span className="topic-count">3</span></Link></li>
              <li><Link href="/knowledge">Digital Transformation <span className="topic-count">2</span></Link></li>
              <li><Link href="/knowledge">Change Adoption <span className="topic-count">4</span></Link></li>
              <li><Link href="/knowledge">Stakeholder Engagement <span className="topic-count">4</span></Link></li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-heading">Recent Articles</span>
            <div className="recent-list">
              <div className="recent-item">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(0); }}>
                  The 70% failure stat is misleading
                </a>
                <span>April 2026</span>
              </div>
              <div className="recent-item">
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveBite(2); }}>
                  Stop calling it resistance
                </a>
                <span>March 2026</span>
              </div>
              <div className="recent-item">
                <Link href="/knowledge/leading-vs-managing-change">
                  Are you leading change or managing a plan?
                </Link>
                <span>April 2025</span>
              </div>
              <div className="recent-item">
                <Link href="/knowledge/executive-sponsorship">
                  Getting executives truly on board
                </Link>
                <span>March 2025</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* CHANGE BITE MODAL */}
      {activeBite !== null && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setActiveBite(null)}>
          <div className="modal case-study-modal">
            <button className="modal-close" onClick={() => setActiveBite(null)}>&times;</button>
            <span className="case-study-label">Change Bite</span>
            <h2 className="case-study-modal-title">{changeBites[activeBite].title}</h2>
            {changeBites[activeBite].body.map((p, i) => (
              <p key={i} className="case-study-modal-body">{p}</p>
            ))}
            <div className="case-study-lesson">
              <span className="case-study-lesson-label">The Takeaway</span>
              <p>{changeBites[activeBite].takeaway}</p>
            </div>
            <div style={{ marginTop: "24px", padding: "20px 24px", background: "rgba(10, 22, 40, 0.03)", border: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--ui)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold)", display: "block", marginBottom: "8px" }}>{changeBites[activeBite].relatedLabel}</span>
              <Link
                href={changeBites[activeBite].relatedHref}
                style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "var(--navy)", textDecoration: "none", lineHeight: "1.3", display: "block", marginBottom: "8px" }}
                onClick={() => setActiveBite(null)}
              >
                {changeBites[activeBite].relatedTitle}
              </Link>
              <Link
                href={changeBites[activeBite].relatedHref}
                className="case-study-source"
                onClick={() => setActiveBite(null)}
              >
                Read the full article &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
