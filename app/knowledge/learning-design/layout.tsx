import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Design Training That Drives Behaviour Change, Not Just Knowledge Transfer",
  description:
    "An interactive guide to designing learning that drives adoption, not just compliance. Includes a compliance vs adoption comparison tool, practical frameworks for behaviour-first learning design, and real enterprise case studies from Walmart, Novartis, and AT&T.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/learning-design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
