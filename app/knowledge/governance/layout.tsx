import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Design Change Governance That Enables Decisions, Not Delays Them",
  description:
    "A practical guide to designing change governance and decision rights that accelerate delivery. Includes a governance health check, ownership frameworks, and enterprise case studies from NHS, Boeing, and Spotify.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/governance" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
