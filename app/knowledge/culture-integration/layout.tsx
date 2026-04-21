import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Culture Integration: Embedding Change into the Way an Organisation Thinks and Behaves",
  description:
    "How do you change culture when you cannot see it or measure it easily? A practical guide to culture integration during change, mergers, and transformation. Includes a culture embedding indicator, merger integration framework, and real case studies from Disney-Pixar, Daimler-Chrysler, and Microsoft.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/culture-integration" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Culture Integration: Embedding Change into the Way an Organisation Thinks and Behaves" description="How do you change culture when you cannot see it or measure it easily? A practical guide to culture integration during change, mergers, and transformation. Includes a culture embedding indicator, merger integration framework, and real case studies from Disney-Pixar, Daimler-Chrysler, and Microsoft." url="https://thechangeassociation.com/knowledge/culture-integration" />{children}</>;
}
