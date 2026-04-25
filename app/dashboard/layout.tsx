import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | The Change Association",
  description: "Track your change program progress across all TCA tools.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
