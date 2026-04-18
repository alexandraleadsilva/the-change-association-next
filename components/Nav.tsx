"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    "sep",
    { href: "/knowledge", label: "Knowledge" },
    { href: "/tools", label: "Tools" },
    "sep",
    { href: "/change-bites", label: "Change Bites" },
  ] as const;

  return (
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
      </ul>
    </nav>
  );
}
