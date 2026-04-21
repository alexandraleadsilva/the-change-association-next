import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "How to Manage Change Across Multiple Sites Without Losing Consistency",
  description:
    "A practical guide to rolling out organisational change across multiple locations. Includes a consistency vs adaptation framework, site readiness assessment, and enterprise examples from Nestle GLOBE, Hershey, and ING Bank.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/multi-site-change" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="How to Manage Change Across Multiple Sites Without Losing Consistency" description="A practical guide to rolling out organisational change across multiple locations. Includes a consistency vs adaptation framework, site readiness assessment, and enterprise examples from Nestle GLOBE, Hershey, and ING Bank." url="https://thechangeassociation.com/knowledge/multi-site-change" />{children}</>;
}
