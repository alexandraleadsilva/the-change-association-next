import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Impact Matrix | TCA Tool",
  description:
    "Map and visualise change impact across stakeholder groups. Score role, process, system, skill, and location changes on a 1–5 scale, auto-calculate overall impact, and identify the groups that need the most support.",
  alternates: { canonical: "https://thechangeassociation.com/tools/impact-matrix" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
