import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Align Performance Management to the New Way of Working Without Creating a Backlash",
  description:
    "A practical guide to aligning performance management and KPIs with organisational transformation. Includes an interactive KPI alignment audit, guidance on when KPIs should change, and enterprise case studies from Microsoft, Adobe, and Deloitte.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/performance-alignment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
