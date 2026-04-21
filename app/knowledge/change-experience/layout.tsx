import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "The Change Experience: Why Understanding the Process Is Not Enough",
  description:
    "An interactive guide to understanding the emotional journey of change, designing trust-building touchpoints, and leading with empathy. Includes an emotional journey map, touchpoint trust diagnostic, and enterprise examples from Satya Nadella's Microsoft, Ford's EV transition, and Unilever's organisational redesign.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/change-experience" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="The Change Experience: Why Understanding the Process Is Not Enough" description="An interactive guide to understanding the emotional journey of change, designing trust-building touchpoints, and leading with empathy. Includes an emotional journey map, touchpoint trust diagnostic, and enterprise examples from Satya Nadella's Microsoft, Ford's EV transition, and Unilever's organisational redesign." url="https://thechangeassociation.com/knowledge/change-experience" />{children}</>;
}
