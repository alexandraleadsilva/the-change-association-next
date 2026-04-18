import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stakeholder Map Builder | TCA Tool",
  description:
    "Build an interactive stakeholder map for your change initiative. Identify decision-makers, influencers, and impacted groups. Track current positions, target positions, and engagement actions to move stakeholders toward support.",
  alternates: { canonical: "https://thechangeassociation.com/tools/stakeholder-map" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
