import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Readiness Assessment | TCA Tool",
  description:
    "An interactive change readiness assessment tool. Rate your organisation across five dimensions — People, Process, Culture, Capability, and Systems — and receive targeted recommendations for improving readiness before go-live.",
  alternates: { canonical: "https://thechangeassociation.com/tools/readiness-assessment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
