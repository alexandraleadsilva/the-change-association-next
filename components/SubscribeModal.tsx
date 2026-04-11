"use client";

import { useState } from "react";

export function SubscribeModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.get("first_name"),
        lastName: data.get("last_name"),
        email: data.get("email"),
      }),
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
  }

  return (
    <>
      <button className="btn" onClick={() => { setOpen(true); setSubmitted(false); }}>
        Subscribe
      </button>

      {open && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setOpen(false)}>&times;</button>

            {!submitted ? (
              <>
                <h2 className="modal-title">Stay in the loop</h2>
                <p className="modal-desc">Subscribe to receive exclusive change management insights directly to your inbox.</p>
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" name="first_name" placeholder="Jane" required />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" name="last_name" placeholder="Smith" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="jane@organisation.com" required />
                  </div>
                  <button type="submit" className="btn modal-submit" disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="modal-title">Thank you</h2>
                <p className="modal-desc">You have been subscribed. We will be in touch soon.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
