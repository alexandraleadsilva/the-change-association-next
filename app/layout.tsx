import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Change Association | Leading Change That Lasts",
    template: "%s | The Change Association",
  },
  description:
    "The professional body for change leadership. Equipping and certifying professionals who lead organisational change that delivers real, lasting impact.",
  keywords: [
    "change management",
    "change management certification",
    "change management framework",
    "organisational change",
    "change leadership",
    "TCA Change Model",
    "Prosci",
    "ADKAR",
    "ADKAR model",
    "Prosci certification",
    "Prosci alternative",
    "ACMP",
    "CCMP certification",
    "change management professional",
    "Kotter 8 steps",
    "Lewin change model",
    "Bridges transition model",
    "digital transformation",
    "leadership development",
    "HR transformation",
    "change adoption",
    "change readiness",
    "stakeholder engagement",
    "change impact assessment",
  ],
  authors: [{ name: "The Change Association" }],
  metadataBase: new URL("https://thechangeassociation.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://thechangeassociation.com",
    siteName: "The Change Association",
    title: "The Change Association | Leading Change That Lasts",
    description:
      "The professional body for change leadership. A five-pillar framework for leading organisational change that delivers real, lasting impact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Change Association",
    description:
      "Equipping professionals to lead organisational change that delivers real, lasting impact.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thechangeassociation.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "The Change Association",
      url: "https://thechangeassociation.com",
      description:
        "The professional body for change leadership. Equipping and certifying professionals who lead organisational change that delivers real, lasting impact.",
      sameAs: ["https://www.linkedin.com/company/thechangeassociation/"],
    },
    {
      "@type": "WebSite",
      name: "The Change Association",
      url: "https://thechangeassociation.com",
      description:
        "Knowledge, frameworks, and certification for change professionals.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://thechangeassociation.com/knowledge",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body><PageTransition>{children}</PageTransition></body>
    </html>
  );
}
