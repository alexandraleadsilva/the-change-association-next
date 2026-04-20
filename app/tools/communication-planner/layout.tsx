import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communication Planner | TCA Tool",
  description:
    "Plan and track communications across every phase of your change initiative. Map audiences, channels, key messages, and ownership to ensure the right people hear the right thing at the right time.",
  alternates: { canonical: "https://thechangeassociation.com/tools/communication-planner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
