import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Delivery Cadence: Building a Rhythm That Sustains Momentum Without Burning People Out",
  description:
    "A practical guide to setting up change delivery cadence. Includes an interactive cadence builder, strategies for adapting when business context shifts, and enterprise examples from ING Bank, Spotify, and the NHS.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/delivery-cadence" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
