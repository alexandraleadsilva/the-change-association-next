import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Stakeholder Strategy: How to Map, Engage, and Activate the People Who Determine Whether Change Lands",
  description:
    "An interactive guide to stakeholder strategy in organisational change. Includes a stakeholder mapping tool with concentric influence rings, practical approaches for engaging busy operational teams, and methods for identifying the informal influencers who shape adoption. Features enterprise examples from ING Bank, Cleveland Clinic, and General Motors.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/stakeholder-strategy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Stakeholder Strategy: How to Map, Engage, and Activate the People Who Determine Whether Change Lands" description="An interactive guide to stakeholder strategy in organisational change. Includes a stakeholder mapping tool with concentric influence rings, practical approaches for engaging busy operational teams, and methods for identifying the informal influencers who shape adoption. Features enterprise examples from ING Bank, Cleveland Clinic, and General Motors." url="https://thechangeassociation.com/knowledge/stakeholder-strategy" />{children}</>;
}
