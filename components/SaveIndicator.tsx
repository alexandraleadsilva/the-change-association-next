"use client";

export function SaveIndicator({
  isAuthenticated,
  isSaving,
  lastSaved,
}: {
  isAuthenticated: boolean;
  isSaving: boolean;
  lastSaved: string | null;
}) {
  if (!isAuthenticated) {
    return (
      <div style={{
        fontFamily: "var(--ui)",
        fontSize: 11,
        color: "var(--text-mid)",
        padding: "8px 16px",
        background: "rgba(10,22,40,0.03)",
        border: "1px solid var(--border)",
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{ color: "var(--gold)" }}>Sign in to save your progress.</span>
        <span>Your data will be lost when you leave this page.</span>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "var(--ui)",
      fontSize: 11,
      color: "var(--text-mid)",
      padding: "8px 16px",
      background: "rgba(10,22,40,0.03)",
      border: "1px solid var(--border)",
      marginBottom: 24,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      {isSaving ? (
        <span style={{ color: "var(--gold)" }}>Saving...</span>
      ) : lastSaved ? (
        <span style={{ color: "#2E7D32" }}>Saved</span>
      ) : (
        <span>Your progress will auto-save</span>
      )}
    </div>
  );
}
