import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Measure Change Adoption and What Leading Indicators Actually Predict Success",
  description:
    "A practical guide to measuring change adoption when the metrics are hard to pin down. Includes an interactive metrics classifier, the adoption measurement curve, and enterprise case studies from Microsoft, Nationwide Building Society, and Prosci research.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/adoption-metrics" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
