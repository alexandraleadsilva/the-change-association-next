"use client";

import { useState } from "react";
import Link from "next/link";

export function ArticleLink({ title, tag, href = "#" }: { title: string; tag: string; href?: string }) {
  const [hovered, setHovered] = useState(false);
  const isDisabled = href === "#";

  if (!isDisabled) {
    return (
      <Link href={href} className="article-link">
        <div>
          <div className="article-link-title">{title}</div>
          <div className="article-tag">{tag}</div>
        </div>
        <span className="article-link-arrow">
          <span className="read-more-label">Read more &rarr;</span>
        </span>
      </Link>
    );
  }

  return (
    <a
      href="#"
      className="article-link link-disabled"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div className="article-link-title">{title}</div>
        <div className="article-tag">{tag}</div>
      </div>
      <span className="article-link-arrow">
        <span className="read-more-label">Read more &rarr;</span>
      </span>
    </a>
  );
}
