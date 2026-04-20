import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits Register | TCA Tool",
  description:
    "Track, measure, and manage the benefits of your change initiative. Define baselines, targets, owners, and measurement methods. Monitor realisation status with an interactive dashboard aligned to benefits realisation best practice.",
  alternates: { canonical: "https://thechangeassociation.com/tools/benefits-register" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
