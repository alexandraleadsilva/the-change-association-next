"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.get("first_name"),
        lastName: data.get("last_name"),
        email: data.get("email"),
        topic: data.get("topic"),
        message: data.get("message"),
      }),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  }

  return (
    <>
      <Nav />

      <div className="contact-wrap">
        <div className="contact-left">
          <ScrollReveal direction="left">
          <span>Get in Touch</span>
          <h1>We&apos;d love to hear from you</h1>
          <p>Whether you&apos;re interested in our upcoming certifications, want to contribute to the knowledge hub, or have a general enquiry, reach out and we&apos;ll get back to you promptly.</p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-item-label">Email</span>
              <span className="contact-item-value"><a href="mailto:hello@thechangeassociation.com">hello@thechangeassociation.com</a></span>
            </div>
            <div className="contact-item">
              <span className="contact-item-label">Follow Us</span>
              <span className="contact-item-value"><a href="#">LinkedIn | The Change Association</a></span>
            </div>
            <div className="contact-item">
              <span className="contact-item-label">Certifications</span>
              <span className="contact-item-value">Coming soon. Register your interest via the form</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
        <div className="contact-right">
          <ScrollReveal direction="right" delay={200}>
          {!submitted ? (
            <>
              <h2>Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label>First Name</label><input type="text" name="first_name" placeholder="Jane" required /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" name="last_name" placeholder="Smith" required /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="jane@organisation.com" required /></div>
                <div className="form-group">
                  <label>I am enquiring about</label>
                  <select name="topic">
                    <option value="">Select a topic...</option>
                    <option>Upcoming Certifications</option>
                    <option>Membership</option>
                    <option>Contributing to the Knowledge Hub</option>
                    <option>General Enquiry</option>
                    <option>Partnerships &amp; Speaking</option>
                  </select>
                </div>
                <div className="form-group"><label>Message</label><textarea name="message" placeholder="Tell us what's on your mind..." required></textarea></div>
                <button type="submit" className="btn contact-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <p className="form-note">We aim to respond within 2 business days.</p>
              </form>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <h2>Thank you</h2>
              <p style={{ fontFamily: "var(--ui)", fontSize: "14.5px", color: "var(--text-mid)", lineHeight: "1.8", marginTop: "12px" }}>
                Your message has been sent. We will get back to you within 2 business days.
              </p>
            </div>
          )}
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </>
  );
}
