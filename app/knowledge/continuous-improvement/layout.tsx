import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback Loops and Post-Implementation Reviews: Keeping Change Alive After the Programme Ends",
  description:
    "A practical guide to building feedback loops that sustain change and running post-implementation reviews that surface real lessons. Includes an interactive PIR planner, feedback loop cards, and enterprise examples from Adobe, Toyota, and Microsoft.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/continuous-improvement" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
