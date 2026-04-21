import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Change Management Frameworks Compared | Prosci, ADKAR, Kotter, ACMP and the TCA Model",
  description:
    "An honest comparison of the most widely used change management frameworks: Prosci ADKAR, Kotter's 8 Steps, Lewin's Change Model, Bridges' Transition Model, ACMP Standard, and the TCA Change Model. Which one should you use, and does it even matter?",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/change-frameworks" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Change Management Frameworks Compared | Prosci, ADKAR, Kotter, ACMP and the TCA Model" description="An honest comparison of the most widely used change management frameworks: Prosci ADKAR, Kotter's 8 Steps, Lewin's Change Model, Bridges' Transition Model, ACMP Standard, and the TCA Change Model. Which one should you use, and does it even matter?" url="https://thechangeassociation.com/knowledge/change-frameworks" />{children}</>;
}
