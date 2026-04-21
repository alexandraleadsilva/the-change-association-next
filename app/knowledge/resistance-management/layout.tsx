import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Building a Resistance Management Plan: Anticipate, Monitor, and Respond Throughout the Change Lifecycle",
  description:
    "A practical guide to building a structured resistance management plan. Includes an interactive resistance lifecycle tracker across five change phases, expandable response frameworks, and enterprise case studies from Microsoft, Ford, and the NHS.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/resistance-management" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Building a Resistance Management Plan: Anticipate, Monitor, and Respond Throughout the Change Lifecycle" description="A practical guide to building a structured resistance management plan. Includes an interactive resistance lifecycle tracker across five change phases, expandable response frameworks, and enterprise case studies from Microsoft, Ford, and the NHS." url="https://thechangeassociation.com/knowledge/resistance-management" />{children}</>;
}
