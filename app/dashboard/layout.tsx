import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | The Change Association",
  description: "Track your change programme progress across all TCA tools. View status by project, see which tools have been completed, and identify gaps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
