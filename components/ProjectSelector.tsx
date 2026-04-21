"use client";

import { useState, useEffect } from "react";

export function ProjectSelector({
  value,
  onChange,
  isAuthenticated,
}: {
  value: string;
  onChange: (name: string) => void;
  isAuthenticated: boolean;
}) {
  const [projects, setProjects] = useState<string[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => {});
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          placeholder="e.g. ERP Rollout Phase 2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (showNew) {
    return (
      <div className="form-group">
        <label>New Project Name</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Enter project name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newName.trim()) {
                onChange(newName.trim());
                setProjects((prev) => [...prev, newName.trim()]);
                setShowNew(false);
                setNewName("");
              }
            }}
            autoFocus
            style={{ flex: 1 }}
          />
          <button
            className="btn"
            style={{ padding: "10px 18px", fontSize: 12 }}
            onClick={() => {
              if (newName.trim()) {
                onChange(newName.trim());
                setProjects((prev) => [...prev, newName.trim()]);
                setShowNew(false);
                setNewName("");
              }
            }}
          >
            Create
          </button>
          <button
            className="btn-outline"
            style={{ padding: "10px 14px", fontSize: 12 }}
            onClick={() => {
              setShowNew(false);
              setNewName("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label>Project</label>
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value === "__new__") {
            setShowNew(true);
          } else {
            onChange(e.target.value);
          }
        }}
      >
        <option value="">Select a project...</option>
        {projects.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
        <option value="__new__">+ New Project</option>
      </select>
    </div>
  );
}
