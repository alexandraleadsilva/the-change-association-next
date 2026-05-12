import Link from "next/link";
import { Logo } from "./Logo";

export function Footer({ showAbout = false }: { showAbout?: boolean }) {
  return (
    <footer>
      <Link href="/" className="footer-logo">
        <Logo />
      </Link>
      {showAbout && (
        <div>
          <p className="footer-about-label">About Us</p>
          <p className="footer-about-text">Equipping professionals to lead change that drives real, lasting impact.</p>
        </div>
      )}
      <ul className="footer-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/knowledge">Knowledge</Link></li>
        <li><Link href="/tools">Tools</Link></li>
        <li><Link href="/change-bites">Change Bites</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <p className="footer-copy">&copy; 2020 The Change Association</p>
    </footer>
  );
}
