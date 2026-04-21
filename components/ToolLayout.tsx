"use client";

import { ReactNode } from "react";
import { ProjectSelector } from "./ProjectSelector";

export function ToolLayout({
  projectName,
  onProjectChange,
  createdBy,
  onCreatedByChange,
  isAuthenticated,
  children,
  extraFields,
}: {
  projectName: string;
  onProjectChange: (name: string) => void;
  createdBy: string;
  onCreatedByChange: (name: string) => void;
  isAuthenticated: boolean;
  children: ReactNode;
  extraFields?: ReactNode;
}) {
  return (
    <div className="tool-grid">
      {/* Left sidebar - Project info */}
      <aside className="tool-sidebar">
        <span style={{
          fontFamily: "var(--ui)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "#9A9080",
          display: "block",
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: "1px solid var(--border)",
        }}>
          Project Details
        </span>

        <div style={{ marginBottom: 20 }}>
          <ProjectSelector
            value={projectName}
            onChange={onProjectChange}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label>Created By</label>
          <input
            type="text"
            placeholder="Your name"
            value={createdBy}
            onChange={(e) => onCreatedByChange(e.target.value)}
          />
        </div>

        {extraFields}
      </aside>

      {/* Right - Main tool content */}
      <main className="tool-main">
        {children}
      </main>
    </div>
  );
}
