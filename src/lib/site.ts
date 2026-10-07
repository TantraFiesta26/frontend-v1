export const siteConfig = {
  name: "TantraFiesta",
  fullName: "TantraFiesta 2026",
  institute: "IIIT Nagpur",
  tagline: "Annual National Technical Festival",
  description:
    "TantraFiesta 2026, IIIT Nagpur's national technical festival, is on its way. Explore the festival, revisit previous editions, and watch for the 2026 event reveal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tantrafiesta.in",
  ogImage: "/opengraph-image",
  locale: "en_US",
  socials: {
    twitter: "https://twitter.com/tantrafiesta",
    instagram: "https://instagram.com/tantrafiesta",
    linkedin: "https://www.linkedin.com/company/tantrafiesta-iiitn/",
    github: "https://github.com/tantrafiesta",
  },
} as const;

export type SiteConfig = typeof siteConfig;
