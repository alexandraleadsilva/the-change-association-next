import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Needs Matrix | TCA Tool",
  description:
    "Identify skill gaps across roles and prioritise training for your change initiative. Map current vs required competency levels to build a targeted learning plan.",
  alternates: { canonical: "https://thechangeassociation.com/tools/training-matrix" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
