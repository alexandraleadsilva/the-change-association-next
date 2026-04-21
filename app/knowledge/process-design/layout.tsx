import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Process Design: How to Redesign Processes That Reinforce the Future State and Sequence People and Process Change",
  description:
    "An interactive guide to redesigning processes that reinforce the future state rather than the old one, and sequencing process change in relation to people change. Includes a sequencing decision tool, practical frameworks, and real enterprise examples from NUMMI, NHS, and DBS Bank.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/process-design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Process Design: How to Redesign Processes That Reinforce the Future State and Sequence People and Process Change" description="An interactive guide to redesigning processes that reinforce the future state rather than the old one, and sequencing process change in relation to people change. Includes a sequencing decision tool, practical frameworks, and real enterprise examples from NUMMI, NHS, and DBS Bank." url="https://thechangeassociation.com/knowledge/process-design" />{children}</>;
}
