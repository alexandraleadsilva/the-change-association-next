import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Are You Leading Change or Just Managing Tasks Through a Change Plan",
  description:
    "An interactive self-assessment to discover whether you are leading change or managing it. Understand the difference between change leadership and change management, and learn what leadership looks like at each phase of transformation.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/leading-vs-managing-change" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
