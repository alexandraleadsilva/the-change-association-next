import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "What Can a Failed Restructure Teach Us About the Timing of Change",
  description:
    "A practical guide to understanding why the timing of organisational restructures matters more than the design. Includes a timing decision matrix, self-check checklist, and enterprise case studies from Yahoo, Vodafone, and GE.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/restructure-timing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="What Can a Failed Restructure Teach Us About the Timing of Change" description="A practical guide to understanding why the timing of organisational restructures matters more than the design. Includes a timing decision matrix, self-check checklist, and enterprise case studies from Yahoo, Vodafone, and GE." url="https://thechangeassociation.com/knowledge/restructure-timing" />{children}</>;
}
