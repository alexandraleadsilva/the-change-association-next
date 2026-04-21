import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Roadmap | TCA Tool",
  description:
    "Build a visual change roadmap with milestones across foundation, pilot, rollout, stabilise, and sustain phases. Track status, ownership, and timelines for your change initiative.",
  alternates: { canonical: "https://thechangeassociation.com/tools/change-roadmap" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
