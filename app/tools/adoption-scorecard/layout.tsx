import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adoption Scorecard | TCA Tool",
  description:
    "Assess adoption maturity across five stages of the adoption curve: Awareness, Understanding, Trial, Adoption, and Proficiency. Score each stage, capture evidence, and identify gaps in your change adoption strategy.",
  alternates: { canonical: "https://thechangeassociation.com/tools/adoption-scorecard" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
