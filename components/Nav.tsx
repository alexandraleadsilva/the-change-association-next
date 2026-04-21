"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { AuthModal } from "./AuthModal";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) setUser({ email: data.email });
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    "sep",
    { href: "/knowledge", label: "Knowledge" },
    "sep",
    { href: "/tools", label: "Tools" },
    "sep",
    { href: "/change-bites", label: "Change Bites" },
  ] as const;

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          <Logo />
        </Link>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {links.map((item, i) =>
            item === "sep" ? (
              <li key={`sep-${i}`} className="nav-sep"></li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
          {user && (
            <>
              <li className="nav-sep"></li>
              <li>
                <Link
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
          <li className="nav-sep"></li>
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "var(--text-mid)",
                  padding: "10px 24px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                style={{
                  background: "var(--navy)",
                  border: "none",
                  fontFamily: "var(--ui)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "#fff",
                  padding: "10px 24px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthenticated={(email) => setUser({ email })}
      />
    </>
  );
}
