import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Bites | The Change Association",
  description:
    "Short, direct articles on the questions change professionals are actually asking. New posts published regularly.",
};

export default function ChangeBitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
