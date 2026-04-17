import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Impact Assessment: Readiness, Stakeholder Impact, and the Real Reasons Employees Resist Change",
  description:
    "An interactive guide to change readiness assessments, stakeholder impact analysis, and reframing employee resistance as organisational feedback. Includes a resistance decoder tool, expandable frameworks, and enterprise examples from Nokia, ING Bank, and Target Canada.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/change-impact-assessment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
