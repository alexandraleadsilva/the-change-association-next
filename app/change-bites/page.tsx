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
                <Link href="/knowledge/leading-vs-managing-change">
                  Are you actually leading change or just managing tasks through
                  a change plan?
                </Link>
              </h2>
              <p>
                Change plans can create a sense of control, but control is not
                the same as leadership. Many professionals find themselves
                focused on activities, timelines, and deliverables without fully
                engaging with how people are experiencing the change. Real
                leadership goes beyond execution. It shapes understanding,
                belief, and commitment.
              </p>
              <Link href="/knowledge/leading-vs-managing-change" className="btn-gold">
                Read Article
              </Link>
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

          {/* POST: Change Experience - KNOWLEDGE HUB LINK */}
          {isVisible("change-adoption") && (
            <div className="blog-post" data-category="change-adoption">
              <div className="post-meta">
                <span className="post-tag">Change Adoption</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">April 2025</span>
              </div>
              <h2>
                <Link href="/knowledge/change-experience">
                  Why does change fail when people understand the process but not
                  the experience?
                </Link>
              </h2>
              <p>
                Even when communication is clear and processes are well defined,
                change can still struggle to take hold. Understanding what needs
                to happen is not the same as experiencing what it feels like to
                change. Without addressing the human side of transition, clarity
                alone is not enough to drive lasting adoption.
              </p>
              <Link href="/knowledge/change-experience" className="btn">Read More</Link>
            </div>
          )}

          {/* POST: Executive Sponsorship - KNOWLEDGE HUB LINK */}
          {isVisible("leadership") && (
            <div className="blog-post" data-category="leadership">
              <div className="post-meta">
                <span className="post-tag">Leadership</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <Link href="/knowledge/executive-sponsorship">
                  How to get executives on board when they say yes but act no
                </Link>
              </h2>
              <p>
                Executive sponsorship is cited as the number one driver of change
                success, yet it is also the most frequently misunderstood. There
                is a significant difference between an executive who approves a
                change and one who actively sponsors it. Understanding that gap
                is where most change efforts either accelerate or stall.
              </p>
              <Link href="/knowledge/executive-sponsorship" className="btn">Read More</Link>
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

          {/* POST: HR Role - KNOWLEDGE HUB LINK */}
          {isVisible("hr-people") && (
            <div className="blog-post" data-category="hr-people">
              <div className="post-meta">
                <span className="post-tag">HR & People</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <Link href="/knowledge/role-clarity">
                  What is HR&apos;s actual role in a transformation, and why does it
                  keep getting confused?
                </Link>
              </h2>
              <p>
                HR is often called upon to &ldquo;support&rdquo; change without clear
                boundaries around what that means in practice. The result is a
                function that is simultaneously over-relied upon and
                under-empowered. Getting this right requires both clarity of role
                and intentional collaboration with change leadership from day
                one.
              </p>
              <Link href="/knowledge/role-clarity" className="btn">Read More</Link>
            </div>
          )}

          {/* POST: Culture - KNOWLEDGE HUB LINK */}
          {isVisible("culture") && (
            <div className="blog-post" data-category="culture">
              <div className="post-meta">
                <span className="post-tag">Culture</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <Link href="/knowledge/culture-integration">
                  How do you change culture when you cannot see it, touch it, or
                  measure it easily?
                </Link>
              </h2>
              <p>
                Culture change is simultaneously the most important and most
                misunderstood dimension of organisational transformation. It is
                shaped through decisions, behaviours, and systems, not through
                values statements pinned to a wall. This article unpacks what
                culture actually is and how to shift it intentionally.
              </p>
              <Link href="/knowledge/culture-integration" className="btn">Read More</Link>
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

          {/* POST: Digital Transformation - KNOWLEDGE HUB LINK */}
          {isVisible("digital-transformation") && (
            <div className="blog-post" data-category="digital-transformation">
              <div className="post-meta">
                <span className="post-tag">Digital Transformation</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <Link href="/knowledge/tools-and-systems">
                  Why digital transformations keep failing the people they are
                  supposed to help
                </Link>
              </h2>
              <p>
                Technology implementations consistently underperform not because
                of the technology itself, but because the human change wrapped
                around it is treated as an afterthought. The system goes live,
                but the people do not. Understanding why this happens, and how to
                prevent it, is one of the most commercially valuable things a
                change professional can master.
              </p>
              <Link href="/knowledge/tools-and-systems" className="btn">Read More</Link>
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
