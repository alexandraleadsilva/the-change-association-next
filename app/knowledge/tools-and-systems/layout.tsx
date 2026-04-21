import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Why Digital Transformations Keep Failing the People They Are Supposed to Help",
  description:
    "An interactive guide exploring why digital and ERP transformations fail when they prioritise technology over people. Includes a Technology vs People Readiness diagnostic, expandable analysis of common failure patterns, and real enterprise case studies from Lidl, Hershey, and Target Canada.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/tools-and-systems" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Why Digital Transformations Keep Failing the People They Are Supposed to Help" description="An interactive guide exploring why digital and ERP transformations fail when they prioritise technology over people. Includes a Technology vs People Readiness diagnostic, expandable analysis of common failure patterns, and real enterprise case studies from Lidl, Hershey, and Target Canada." url="https://thechangeassociation.com/knowledge/tools-and-systems" />{children}</>;
}
