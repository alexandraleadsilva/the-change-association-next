import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reinforcement Planning: Designing Mechanisms That Sustain Change and Equipping Managers to Lead It",
  description:
    "How to design reinforcement mechanisms that make new behaviours the path of least resistance, and what role managers play in sustaining change. Includes an interactive reinforcement designer, manager readiness assessment, and enterprise case studies from Microsoft, Toyota, and Cleveland Clinic.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/reinforcement-planning" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
