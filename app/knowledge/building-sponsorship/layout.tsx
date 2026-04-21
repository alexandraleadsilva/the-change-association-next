import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "What Does Genuine Executive Sponsorship Look Like in Practice",
  description:
    "A practical playbook for building executive sponsorship across every phase of change. Includes specific actions sponsors should take at each stage, a readiness checklist, and real enterprise examples from Microsoft, Unilever, and Ford.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/building-sponsorship" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="What Does Genuine Executive Sponsorship Look Like in Practice" description="A practical playbook for building executive sponsorship across every phase of change. Includes specific actions sponsors should take at each stage, a readiness checklist, and real enterprise examples from Microsoft, Unilever, and Ford." url="https://thechangeassociation.com/knowledge/building-sponsorship" />{children}</>;
}
