import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | The Change Association",
  description: "Track your change program progress across all TCA tools. View status by project, see which tools have been completed, and identify gaps.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Force dynamic rendering by reading headers
  await headers();
  return <>{children}</>;
}
