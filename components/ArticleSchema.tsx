export function ArticleSchema({
  title,
  description,
  url,
  datePublished = "2026-04-01",
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "The Change Association",
      url: "https://thechangeassociation.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Change Association",
      url: "https://thechangeassociation.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "The Change Association",
      url: "https://thechangeassociation.com",
    },
    about: {
      "@type": "Thing",
      name: "Change Management",
    },
    educationalLevel: "Professional",
    learningResourceType: "Article",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
