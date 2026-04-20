import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Roadmap | TCA Tool",
  description:
    "Plan and track executive sponsorship actions across the five TCA pillars. Map sponsor activities from Direction through Sustainment, monitor progress, and ensure visible, genuine sponsorship at every phase of your change journey.",
  alternates: { canonical: "https://thechangeassociation.com/tools/sponsor-roadmap" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
