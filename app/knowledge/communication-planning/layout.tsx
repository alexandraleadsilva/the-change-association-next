import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Build a Change Communication Plan That Does More Than Inform, and When to Communicate Change",
  description:
    "An interactive guide to building change communication plans that drive understanding and action, not just awareness. Includes a communication timing tool, expandable guidance on planning and sequencing, and enterprise examples from GE, Target, and the NHS.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/communication-planning" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
