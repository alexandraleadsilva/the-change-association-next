import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The TCA Change Model | Knowledge Hub",
  description: "A structured framework for leading organisational change across five pillars: Direction, Engagement, Enablement, Execution, and Sustainment.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge" },
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
