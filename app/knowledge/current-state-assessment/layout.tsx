import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Conduct a Current State Assessment | The Change Association",
  description:
    "A holistic framework for assessing where your organisation is today across five dimensions: People, Process, Culture, Capability, and Systems.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
