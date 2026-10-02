import type { Metadata } from "next";

// Both domains share one canonical origin. Change SITE_URL when migrating,
// then rebuild so metadata, robots.txt and sitemap.xml change together.
export const SITE_URL = new URL(process.env.SITE_URL || "https://arifian.dev").origin;
export const SITE_NAME = "Arifian Saputra";
export const HOME_TITLE = "Arifian Saputra | AI Technical Mentor";
export const HOME_DESCRIPTION = "AI Technical Mentor at Infinite Learning Indonesia. Explore Arifian Saputra's AI, machine learning, and full stack web development projects.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = path === "/" ? HOME_TITLE : `${title} | ${SITE_NAME}`;
  const url = new URL(path, SITE_URL).href;

  return {
    title: path === "/" ? { absolute: HOME_TITLE } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url,
      images: [{ url: "/og.jpg", width: 1024, height: 1024, alt: HOME_TITLE }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.jpg"],
      creator: "@ArifianSaputra0",
    },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "AI Technical Mentor",
      sameAs: [
        "https://github.com/arifian853",
        "https://linkedin.com/in/arifiansaputra",
        "https://instagram.com/arifiansaputra_",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};
