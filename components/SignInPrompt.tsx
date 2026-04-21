"use client";

import { useState, useEffect } from "react";

export function SignInPrompt() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already signed in
    const cached = localStorage.getItem("tca_user");
    if (cached) return;

    // Check if already dismissed this session
    const wasDismissed = sessionStorage.getItem("tca_signin_dismissed");
    if (wasDismissed) return;

    setShow(true);
  }, []);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem("tca_signin_dismissed", "true");
    setTimeout(() => setShow(false), 300);
  }

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 70,
        right: 24,
        maxWidth: 340,
        background: "var(--navy)",
        padding: "20px 24px",
        zIndex: 150,
        boxShadow: "0 8px 32px rgba(10,22,40,0.25)",
        opacity: dismissed ? 0 : 1,
        transform: dismissed ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          top: 8,
          right: 12,
          background: "none",
          border: "none",
          color: "rgba(234,228,213,0.4)",
          fontSize: 18,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        &times;
      </button>
      <p style={{
        fontFamily: "var(--serif)",
        fontSize: 17,
        fontWeight: 500,
        color: "var(--cream)",
        lineHeight: 1.3,
        marginBottom: 8,
      }}>
        Sign in to save your progress
      </p>
      <p style={{
        fontFamily: "var(--ui)",
        fontSize: 12,
        color: "rgba(234,228,213,0.6)",
        lineHeight: 1.5,
        marginBottom: 14,
      }}>
        Your tool data will be lost when you leave this page. Sign in to save your work across sessions.
      </p>
      <button
        onClick={() => {
          dismiss();
          // Trigger the nav sign-in modal by dispatching a custom event
          window.dispatchEvent(new CustomEvent("tca-open-signin"));
        }}
        style={{
          background: "var(--gold)",
          border: "none",
          fontFamily: "var(--ui)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: "var(--navy)",
          padding: "10px 20px",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Sign In
      </button>
    </div>
  );
}
