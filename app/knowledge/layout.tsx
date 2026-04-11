import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub | The Change Association",
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
