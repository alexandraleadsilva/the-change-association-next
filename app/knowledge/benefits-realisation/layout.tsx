import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits Realisation Planning: How to Track Whether Change Delivers Its Intended Value",
  description:
    "A practical guide to benefits realisation planning for organisational change. Includes an interactive maturity assessment, the difference between outputs, outcomes and benefits, and enterprise case studies from the NHS, Symcor, and the UK National Audit Office.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/benefits-realisation" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
