"use client";

import { useState } from "react";

export function AuthModal({
  open,
  onClose,
  onAuthenticated,
}: {
  open: boolean;
  onClose: () => void;
  onAuthenticated: (email: string) => void;
}) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendCode() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.ok) {
      setStep("code");
    } else {
      setError("Failed to send code. Please try again.");
    }
  }

  async function verifyCode() {
    if (!code || code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    setLoading(false);
    if (res.ok) {
      onAuthenticated(email);
      onClose();
      setStep("email");
      setEmail("");
      setCode("");
    } else {
      setError("Invalid or expired code. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        {step === "email" ? (
          <>
            <h2 className="modal-title">Sign in to TCA</h2>
            <p className="modal-desc">
              Enter your email address. We will send you a one-time code to sign in.
            </p>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@organisation.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendCode()}
                autoFocus
              />
            </div>
            {error && (
              <p style={{ color: "#C62828", fontFamily: "var(--ui)", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}
            <button className="btn" style={{ width: "100%", textAlign: "center" }} onClick={sendCode} disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </button>
          </>
        ) : (
          <>
            <h2 className="modal-title">Check your email</h2>
            <p className="modal-desc">
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
            </p>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Verification Code</label>
              <input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && verifyCode()}
                style={{ letterSpacing: "8px", textAlign: "center", fontSize: 24, fontWeight: 600 }}
                autoFocus
              />
            </div>
            {error && (
              <p style={{ color: "#C62828", fontFamily: "var(--ui)", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}
            <button className="btn" style={{ width: "100%", textAlign: "center" }} onClick={verifyCode} disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <button
              onClick={() => { setStep("email"); setCode(""); setError(""); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-mid)",
                marginTop: 12, display: "block", width: "100%", textAlign: "center",
              }}
            >
              Use a different email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
