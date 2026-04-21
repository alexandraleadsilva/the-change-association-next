import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "How to Craft a Change Narrative That Connects Strategy to Individual Meaning",
  description:
    "An interactive guide to translating strategic change into a narrative that resonates at every level of the organisation. Includes a narrative cascade tool, audience translation framework, and enterprise examples from Starbucks, Microsoft, and Gallup research.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/crafting-narrative" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="How to Craft a Change Narrative That Connects Strategy to Individual Meaning" description="An interactive guide to translating strategic change into a narrative that resonates at every level of the organisation. Includes a narrative cascade tool, audience translation framework, and enterprise examples from Starbucks, Microsoft, and Gallup research." url="https://thechangeassociation.com/knowledge/crafting-narrative" />{children}</>;
}
