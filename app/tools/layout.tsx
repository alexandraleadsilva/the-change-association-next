import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools | The Change Association",
  description:
    "Interactive change management tools built for practitioners. Readiness assessments, stakeholder maps, charter builders, and more. Use them on-screen, no downloads required.",
  alternates: { canonical: "https://thechangeassociation.com/tools" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
