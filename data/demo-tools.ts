export function getDemoTools() {
  return [
    { tool_type: "readiness-assessment", project_name: "Sample", data: { dimensions: { people: { score: 3.8 }, process: { score: 2.4 }, culture: { score: 3.2 }, capability: { score: 2.8 }, systems: { score: 4.1 } } }, updated_at: "2026-04-20" },
    { tool_type: "stakeholder-map", project_name: "Sample", data: { stakeholders: [{ currentPosition: "champion" }, { currentPosition: "supporter" }, { currentPosition: "supporter" }, { currentPosition: "neutral" }, { currentPosition: "neutral" }, { currentPosition: "resistant" }, { currentPosition: "blocker" }] }, updated_at: "2026-04-19" },
    { tool_type: "charter-builder", project_name: "Sample", data: { sections: { strategicContext: "Done", caseForChange: "Done", scopeBoundaries: "Done", approachPhasing: "Done", governanceRoles: "", successCriteria: "", risksDependencies: "" } }, updated_at: "2026-04-18" },
    { tool_type: "communication-planner", project_name: "Sample", data: { entries: [{ status: "complete" }, { status: "in-progress" }, { status: "planned" }, { status: "planned" }] }, updated_at: "2026-04-17" },
    { tool_type: "sponsor-roadmap", project_name: "Sample", data: { phases: { direction: { actions: [{ status: "complete" }] }, engagement: { actions: [{ status: "in-progress" }] }, enablement: { actions: [{ status: "not-started" }] }, execution: { actions: [{ status: "not-started" }] }, sustainment: { actions: [{ status: "not-started" }] } } }, updated_at: "2026-04-16" },
    { tool_type: "resistance-tracker", project_name: "Sample", data: { signals: [{ severity: "high", status: "investigating" }, { severity: "medium", status: "new" }, { severity: "low", status: "resolved" }] }, updated_at: "2026-04-15" },
    { tool_type: "benefits-register", project_name: "Sample", data: { benefits: [{ status: "on-track" }, { status: "at-risk" }, { status: "not-started" }] }, updated_at: "2026-04-14" },
    { tool_type: "adoption-scorecard", project_name: "Sample", data: { stages: { awareness: { score: 4.2 }, understanding: { score: 3.5 }, trial: { score: 2.8 }, adoption: { score: 1.6 }, proficiency: { score: 0 } } }, updated_at: "2026-04-13" },
    { tool_type: "culture-tracker", project_name: "Sample", data: { indicators: { language: { level: "emerging" }, behaviours: { level: "not-yet" }, oldWays: { level: "not-yet" }, newStarters: { level: "emerging" }, leadershipChange: { level: "not-yet" } } }, updated_at: "2026-04-12" },
  ];
}
