import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture Embedding Tracker | TCA Tool",
  description:
    "Assess how deeply change has embedded into organisational culture. Track five key indicators — language, behaviours, old ways, new starters, and leadership change — to understand whether change is truly sticking.",
  alternates: { canonical: "https://thechangeassociation.com/tools/culture-tracker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
