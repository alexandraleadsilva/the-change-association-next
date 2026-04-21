import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "What Does a Phased Approach to Change Actually Look Like in Practice",
  description:
    "A practical guide to phasing organisational change. Includes an interactive phase planner, common phasing mistakes, and enterprise examples from Spotify, John Lewis, and McKinsey research.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/phased-approach" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="What Does a Phased Approach to Change Actually Look Like in Practice" description="A practical guide to phasing organisational change. Includes an interactive phase planner, common phasing mistakes, and enterprise examples from Spotify, John Lewis, and McKinsey research." url="https://thechangeassociation.com/knowledge/phased-approach" />{children}</>;
}
