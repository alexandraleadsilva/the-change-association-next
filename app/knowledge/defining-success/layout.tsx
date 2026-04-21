import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "How to Define Change Success Before Delivery Begins",
  description:
    "An interactive guide to defining meaningful success criteria for organisational change. Build a four-layer success definition across Outcomes, Behaviours, Evidence, and Timeline. Includes real enterprise examples and a readiness checklist.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/defining-success" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="How to Define Change Success Before Delivery Begins" description="An interactive guide to defining meaningful success criteria for organisational change. Build a four-layer success definition across Outcomes, Behaviours, Evidence, and Timeline. Includes real enterprise examples and a readiness checklist." url="https://thechangeassociation.com/knowledge/defining-success" />{children}</>;
}
