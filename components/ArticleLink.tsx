"use client";

import { useState } from "react";

export function ArticleLink({ title, tag, href = "#" }: { title: string; tag: string; href?: string }) {
  const [hovered, setHovered] = useState(false);
  const isDisabled = href === "#";

  return (
    <a
      href={href}
      className={`article-link${isDisabled ? " link-disabled" : ""}`}
      onClick={isDisabled ? (e) => e.preventDefault() : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div className="article-link-title">{title}</div>
        <div className="article-tag">{tag}</div>
      </div>
      <span className="article-link-arrow">
        {isDisabled ? (
          hovered ? (
            <span className="coming-soon-label" style={{ display: "inline-block" }}>Coming soon</span>
          ) : (
            <span className="read-more-label">Read more &rarr;</span>
          )
        ) : (
          <span>&rarr;</span>
        )}
      </span>
    </a>
  );
}
