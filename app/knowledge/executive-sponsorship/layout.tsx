import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Get Executives on Board When They Say Yes But Act No",
  description:
    "An interactive guide to executive sponsorship in organisational change. Assess your sponsor's level, understand what each level looks like in practice, and learn how to move sponsors from passive approval to genuine commitment.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/executive-sponsorship" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
