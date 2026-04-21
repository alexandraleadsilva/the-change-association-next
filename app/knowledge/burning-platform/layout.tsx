import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "How to Build a Burning Platform That Motivates Action Without Creating Fear",
  description:
    "An interactive guide to creating urgency in change without resorting to fear. Includes a Fear vs Purpose diagnostic, the anatomy of a compelling change narrative, and real enterprise examples from Nokia, CVS Health, and Patagonia.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/burning-platform" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="How to Build a Burning Platform That Motivates Action Without Creating Fear" description="An interactive guide to creating urgency in change without resorting to fear. Includes a Fear vs Purpose diagnostic, the anatomy of a compelling change narrative, and real enterprise examples from Nokia, CVS Health, and Patagonia." url="https://thechangeassociation.com/knowledge/burning-platform" />{children}</>;
}
