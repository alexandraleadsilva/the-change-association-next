"use client";

import { useEffect, useState } from "react";

const pillars = [
  { id: "pillar-1", num: "01", name: "Direction", focus: "Why + where + who leads" },
  { id: "pillar-2", num: "02", name: "Engagement", focus: "Winning hearts & minds" },
  { id: "pillar-3", num: "03", name: "Enablement", focus: "Equipping people to change" },
  { id: "pillar-4", num: "04", name: "Execution", focus: "Making change happen" },
  { id: "pillar-5", num: "05", name: "Sustainment", focus: "Making change stick" },
];

export function TCAModelDiagram() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  }

  return (
    <div className="tca-diagram">
      <div className="tca-diagram-track">
        {pillars.map((p, i) => (
          <div key={p.id} className="tca-diagram-step">
            <button
              className="tca-card"
              onClick={() => scrollTo(p.id)}
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms, box-shadow 0.2s, border-color 0.2s`,
              }}
            >
              <span className="tca-card-num">{p.num}</span>
              <span className="tca-card-name">{p.name}</span>
              <span className="tca-card-focus">{p.focus}</span>
            </button>
            {i < pillars.length - 1 && (
              <div
                className="tca-connector"
                style={{
                  opacity: animated ? 1 : 0,
                  transition: `opacity 0.4s ease ${i * 120 + 200}ms`,
                }}
              >
                <svg width="32" height="12" viewBox="0 0 32 12">
                  <line x1="0" y1="6" x2="24" y2="6" stroke="#C4943A" strokeWidth="1.5" />
                  <polygon points="24,2 32,6 24,10" fill="#C4943A" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
