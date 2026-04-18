import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Charter Builder | TCA Tool",
  description:
    "Build your change charter interactively, section by section. Define strategic context, business case, scope, approach, governance, success criteria, and risks in a structured, reusable format aligned to best practice.",
  alternates: { canonical: "https://thechangeassociation.com/tools/charter-builder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
