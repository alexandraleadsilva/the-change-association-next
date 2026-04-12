import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Conduct a Current State Assessment",
  description: "An interactive guide to assessing where your organisation is today across five dimensions: People, Process, Culture, Capability, and Systems. Includes key questions, methods, blind spots, and real enterprise case studies.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/current-state-assessment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
