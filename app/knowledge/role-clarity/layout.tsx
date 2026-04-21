import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata: Metadata = {
  title: "Role Clarity and Capability in Organisational Change: HR, External Consultants, and Defining New Responsibilities",
  description:
    "An interactive guide to defining who does what in organisational transformation. Covers HR's actual role, when to bring in external change managers, and how to define new roles without creating confusion. Includes a RACI-style role clarity tool, decision frameworks, and real enterprise examples from Unilever, the NHS, and Universal Credit.",
  alternates: { canonical: "https://thechangeassociation.com/knowledge/role-clarity" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><ArticleSchema title="Role Clarity and Capability in Organisational Change: HR, External Consultants, and Defining New Responsibilities" description="An interactive guide to defining who does what in organisational transformation. Covers HR's actual role, when to bring in external change managers, and how to define new roles without creating confusion. Includes a RACI-style role clarity tool, decision frameworks, and real enterprise examples from Unilever, the NHS, and Universal Credit." url="https://thechangeassociation.com/knowledge/role-clarity" />{children}</>;
}
