import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Does a Meaningful Gap Analysis Look Like",
  description:
    "A practical guide to conducting gap analysis that drives real change. Covers the five lenses of gap analysis: Strategic, Operational, Capability, Cultural, and Structural, with interactive tools and enterprise case studies.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/gap-analysis" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
