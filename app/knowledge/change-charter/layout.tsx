import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "The Change Charter: How to Define Scope, Rationale, and Governance Before Delivery Begins",
  description:
    "A practical guide to writing a change charter that combines strategy, business case, and governance into one founding document. Includes an interactive charter builder, quality tests for each section, and enterprise case studies from the NHS, Nokia, and Unilever.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/change-charter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="The Change Charter: How to Define Scope, Rationale, and Governance Before Delivery Begins" description="A practical guide to writing a change charter that combines strategy, business case, and governance into one founding document. Includes an interactive charter builder, quality tests for each section, and enterprise case studies from the NHS, Nokia, and Unilever." url="https://thechangeassociation.com/knowledge/change-charter" />{children}</>;
}
