import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resistance Tracker | TCA Tool",
  description:
    "Track, interpret, and respond to resistance signals across your change initiative. Log observations, assess severity, plan responses, and monitor resolution to turn resistance into engagement.",
  alternates: { canonical: "https://thechangeassociation.com/tools/resistance-tracker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
