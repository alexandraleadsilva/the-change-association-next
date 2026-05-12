"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function VerifyPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState<any>(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/verify/${id}`)
      .then(r => r.json())
      .then(data => {
        setFound(data.found);
        if (data.found) setCert(data.certification);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  const isActive = cert?.status === "active" && (!cert?.expiry_date || new Date(cert.expiry_date) > new Date());

  return (
    <>
      <Nav />
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
        {loading ? (
          <p style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--text-mid)" }}>Verifying...</p>
        ) : !found ? (
          <div style={{ textAlign: "center", maxWidth: 500 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#C0392B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <span style={{ color: "#fff", fontSize: 32, fontWeight: 600 }}>&times;</span>
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--navy)", marginBottom: 12 }}>Credential Not Found</h1>
            <p style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7 }}>
              No certification was found for ID <strong>{id}</strong>. Please check the link and try again, or contact us at general@thechangeassociation.com.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
            {/* Shield icon */}
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: isActive ? "#27AE60" : "#9E9E9E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <p style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: isActive ? "#27AE60" : "#9E9E9E", marginBottom: 12 }}>
              {isActive ? "Verification Successful" : "Credential Expired"}
            </p>

            <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>
              {cert.full_name}
            </h1>

            <p style={{ fontFamily: "var(--ui)", fontSize: 15, color: "var(--text-mid)", marginBottom: 32 }}>
              {cert.credential}
            </p>

            {/* Certificate card */}
            <div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "32px 28px", textAlign: "left", background: "var(--cream)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Credential ID</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 14, fontWeight: 500, color: "var(--navy)" }}>{cert.id}</span>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Status</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 14, fontWeight: 500, color: isActive ? "#27AE60" : "#9E9E9E" }}>{isActive ? "Active" : "Expired"}</span>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Date Issued</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--navy)" }}>{formatDate(cert.issued_date)}</span>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9A9080", display: "block", marginBottom: 4 }}>Expiry</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 14, color: "var(--navy)" }}>{cert.expiry_date ? formatDate(cert.expiry_date) : "No expiry"}</span>
                </div>
              </div>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 33" width="32" height="26">
                  <rect x="0" y="0" width="40" height="3.5" fill="#0A1628"/>
                  <rect x="2" y="3.5" width="36" height="2.5" fill="#0A1628"/>
                  <rect x="3.5" y="6" width="4" height="21" fill="#0A1628"/>
                  <rect x="18" y="6" width="4" height="21" fill="#0A1628"/>
                  <rect x="32.5" y="6" width="4" height="21" fill="#0A1628"/>
                  <rect x="2" y="27" width="36" height="2.5" fill="#0A1628"/>
                  <rect x="0" y="29.5" width="40" height="3.5" fill="#0A1628"/>
                </svg>
                <div>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 500, color: "var(--navy)", display: "block" }}>The Change Association</span>
                  <span style={{ fontFamily: "var(--ui)", fontSize: 11, color: "#9A9080" }}>thechangeassociation.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
