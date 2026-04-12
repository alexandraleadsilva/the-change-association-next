import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Bites",
  description: "Sharp thinking on change, leadership, and people. Short, direct articles on the questions change professionals are actually asking.",
  alternates: { canonical: "https://thechangeassociation.com/change-bites" },
};

export default function ChangeBitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
