"use client";

import { useState } from "react";
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
  { label: "Tools", value: "tools" },
];

export default function ChangeBites() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

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
                data-filter={tab.value}
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
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
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
              <a
                href="#"
                className="btn-gold link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
            </div>
          )}

          {/* POST 1 */}
          {isVisible("change-adoption") && (
            <div className="blog-post" data-category="change-adoption">
              <div className="post-meta">
                <span className="post-tag">Change Adoption</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">April 2025</span>
              </div>
              <h2>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Why does change fail when people understand the process but not
                  the experience?
                </a>
              </h2>
              <p>
                Even when communication is clear and processes are well defined,
                change can still struggle to take hold. Understanding what needs
                to happen is not the same as experiencing what it feels like to
                change. Without addressing the human side of transition, clarity
                alone is not enough to drive lasting adoption.
              </p>
              <a
                href="#"
                className="btn link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
            </div>
          )}

          {/* POST 2 */}
          {isVisible("leadership") && (
            <div className="blog-post" data-category="leadership">
              <div className="post-meta">
                <span className="post-tag">Leadership</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  How to get executives on board when they say yes but act no
                </a>
              </h2>
              <p>
                Executive sponsorship is cited as the number one driver of change
                success, yet it is also the most frequently misunderstood. There
                is a significant difference between an executive who approves a
                change and one who actively sponsors it. Understanding that gap
                is where most change efforts either accelerate or stall.
              </p>
              <a
                href="#"
                className="btn link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
            </div>
          )}

          {/* POST 3 */}
          {isVisible("hr-people") && (
            <div className="blog-post" data-category="hr-people">
              <div className="post-meta">
                <span className="post-tag">HR & People</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">March 2025</span>
              </div>
              <h2>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  What is HR's actual role in a transformation, and why does it
                  keep getting confused?
                </a>
              </h2>
              <p>
                HR is often called upon to "support" change without clear
                boundaries around what that means in practice. The result is a
                function that is simultaneously over-relied upon and
                under-empowered. Getting this right requires both clarity of role
                and intentional collaboration with change leadership from day
                one.
              </p>
              <a
                href="#"
                className="btn link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
            </div>
          )}

          {/* POST 4 */}
          {isVisible("culture") && (
            <div className="blog-post" data-category="culture">
              <div className="post-meta">
                <span className="post-tag">Culture</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  How do you change culture when you cannot see it, touch it, or
                  measure it easily?
                </a>
              </h2>
              <p>
                Culture change is simultaneously the most important and most
                misunderstood dimension of organisational transformation. It is
                shaped through decisions, behaviours, and systems, not through
                values statements pinned to a wall. This article unpacks what
                culture actually is and how to shift it intentionally.
              </p>
              <a
                href="#"
                className="btn link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
            </div>
          )}

          {/* POST 5 */}
          {isVisible("digital-transformation") && (
            <div className="blog-post" data-category="digital-transformation">
              <div className="post-meta">
                <span className="post-tag">Digital Transformation</span>
                <span className="post-meta-sep"></span>
                <span className="post-date">February 2025</span>
              </div>
              <h2>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Why digital transformations keep failing the people they are
                  supposed to help
                </a>
              </h2>
              <p>
                Technology implementations consistently underperform not because
                of the technology itself, but because the human change wrapped
                around it is treated as an afterthought. The system goes live,
                but the people do not. Understanding why this happens, and how to
                prevent it, is one of the most commercially valuable things a
                change professional can master.
              </p>
              <a
                href="#"
                className="btn link-disabled"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </a>
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
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Change Leadership <span className="topic-count">8</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  HR & People Teams <span className="topic-count">6</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Culture <span className="topic-count">5</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Digital Transformation{" "}
                  <span className="topic-count">5</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Tools & Techniques <span className="topic-count">4</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Change Adoption <span className="topic-count">7</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Stakeholder Engagement{" "}
                  <span className="topic-count">4</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-heading">Recent Articles</span>
            <div className="recent-list">
              <div className="recent-item">
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Are you leading change or managing a plan?
                </a>
                <span>April 2025</span>
              </div>
              <div className="recent-item">
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Why process clarity is not enough
                </a>
                <span>March 2025</span>
              </div>
              <div className="recent-item">
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  Getting executives truly on board
                </a>
                <span>March 2025</span>
              </div>
              <div className="recent-item">
                <a
                  href="#"
                  className="link-disabled"
                  onClick={(e) => e.preventDefault()}
                >
                  HR's real role in transformation
                </a>
                <span>February 2025</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}
