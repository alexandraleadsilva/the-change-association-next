import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Project Success vs Change Success: Why It Matters",
  description:
    "An interactive guide to understanding the difference between project success and change success. Includes a metric diagnostic, side-by-side comparisons at every phase, and enterprise case studies from Hershey, SAP research, and McKinsey.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/project-vs-change-success" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Project Success vs Change Success: Why It Matters" description="An interactive guide to understanding the difference between project success and change success. Includes a metric diagnostic, side-by-side comparisons at every phase, and enterprise case studies from Hershey, SAP research, and McKinsey." url="https://thechangeassociation.com/knowledge/project-vs-change-success" />{children}</>;
}
