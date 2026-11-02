/**
 * TantraFiesta 2026 Consolidated Sponsor Data
 *
 * Centralized, type-safe data structure organizing all confirmed sponsors by
 * official sponsorship tier and domain category.
 */

export type SponsorTier = "title" | "main" | "partner";

export type SponsorCategory =
  | "Technology & Digital"
  | "Lifestyle & Consumer"
  | "Travel & Experiences"
  | "Education, Engineering & Community";

export interface Sponsor {
  id: string;
  name: string;
  officialTitle?: string;
  tier: SponsorTier;
  category?: SponsorCategory;
  logo: string;
  bgColor: string;
  verifiedName?: string;
  description?: string;
  href?: string;
}

/**
 * Tier 1 — Primary Title Sponsor
 */
export const titleSponsor: Sponsor = {
  id: "sbi",
  name: "SBI",
  officialTitle: "Title Sponsor",
  tier: "title",
  logo: "/assets/sponsors/Title_Sponsor.webp",
  bgColor: "#FFFFFF",
  verifiedName: "State Bank of India",
  description: "Official Title Sponsor for TantraFiesta 2026",
};

/**
 * Tier 1 — Main Sponsors arranged in official sponsorship hierarchy
 */
export const mainSponsors: Sponsor[] = [
  {
    id: "vivo",
    name: "vivo",
    officialTitle: "Imperial Sponsor",
    tier: "main",
    logo: "/assets/sponsors/Vivo logo.webp",
    bgColor: "#FFFFFF",
    description: "Official Imperial Sponsor",
  },
  {
    id: "plum",
    name: "Plum",
    officialTitle: "Co-Sponsor",
    tier: "main",
    logo: "/assets/sponsors/Plum_Purple Logo.webp",
    bgColor: "#FFFFFF",
    description: "Official Co-Sponsor",
  },
  {
    id: "aarya-chanakya",
    name: "Aarya Chanakya Investment Services",
    officialTitle: "Powered By",
    tier: "main",
    logo: "/assets/sponsors/Arya_chanakya.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Arya Chanakya",
    description: "Powered By Partner",
  },
  {
    id: "kreyto-ai",
    name: "Kreyto AI",
    officialTitle: "Associate Sponsor",
    tier: "main",
    logo: "/assets/sponsors/Kreyato.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Kreyato",
    description: "Official Associate Sponsor",
  },
];

/**
 * Tier 2 — Partner Sponsors categorized by domain
 */
export const partnerSponsors: Sponsor[] = [
  // Technology & Digital
  {
    id: "hp",
    name: "HP",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/Hp_logo.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "hp-gaming",
    name: "HP Gaming",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/Hp_logo.webp",
    bgColor: "#FFFFFF",
    description: "Official Gaming Hardware Partner",
  },
  {
    id: "render",
    name: "Render",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/Render.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/HackerEarth.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "fueler",
    name: "Fueler",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/FuelerLogo.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "interview-buddy",
    name: "Interview Buddy",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/InterviewBuddy.webp",
    bgColor: "#FFFFFF",
    verifiedName: "InterviewBuddy",
  },
  {
    id: "truscholar",
    name: "TruScholar",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/truscholar_logo.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "gdai",
    name: "GDAI",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/gdai-icon.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "vlsi-for-all",
    name: "VLSI For All",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/VLSI for ALL.webp",
    bgColor: "#0B0B0E",
  },
  {
    id: "krafton",
    name: "Krafton",
    tier: "partner",
    category: "Technology & Digital",
    logo: "/assets/sponsors/Krafton_Logo.webp",
    bgColor: "#0B0B0E",
    description: "Official Gaming & Esports Partner (NODWIN Network)",
  },

  // Lifestyle & Consumer
  {
    id: "denver",
    name: "Denver",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/Denver.webp",
    bgColor: "#1B1A18",
  },
  {
    id: "rubabmen",
    name: "Rubabmen",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/RubabMen(white).webp",
    bgColor: "#FFFFFF",
    verifiedName: "RubabMen",
  },
  {
    id: "hell",
    name: "Hell",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/Hell.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Hell Energy",
  },
  {
    id: "curozip",
    name: "Curozip",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/Curozip.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "me-organic",
    name: "Me&Organic",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/me-and-organic-logo.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "gamedora",
    name: "GameDora",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/Gamedoora.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Gamedoora",
  },
  {
    id: "otakus-paradise",
    name: "Otaku's Paradise",
    tier: "partner",
    category: "Lifestyle & Consumer",
    logo: "/assets/sponsors/Otaku_Paradise.webp",
    bgColor: "#FFFFFF",
    description: "Official Anime & Lifestyle Merchandise Partner (Consumer & FirstCry Network)",
  },

  // Travel & Experiences
  {
    id: "abhibus",
    name: "AbhiBus",
    tier: "partner",
    category: "Travel & Experiences",
    logo: "/assets/past_sponsors/abhibus-Iuz0rWX0.webp",
    bgColor: "#FFFFFF",
    description: "Official Travel Partner",
  },
  {
    id: "trip-24-7",
    name: "Trip24/7",
    tier: "partner",
    category: "Travel & Experiences",
    logo: "/assets/sponsors/Trip_24_7.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Trip 24x7",
  },

  // Education, Engineering & Community
  {
    id: "shivaay-engineering",
    name: "Shivaay Engineering",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Shivay Engineering.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Shivay Engineering",
  },
  {
    id: "aman-engineering",
    name: "Aman Engineering",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Aman Engineering Technology.webp",
    bgColor: "#0F172A",
    verifiedName: "Aman Engineering Technology",
  },
  {
    id: "enrichmenters",
    name: "Enrichmenters",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Enrichmentors.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Enrichmentors",
  },
  {
    id: "blue-aero",
    name: "Blue Aero",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Blue Aurea.webp",
    bgColor: "#FFFFFF",
    verifiedName: "Blue Aurea",
  },
  {
    id: "the-trading-mitra",
    name: "The Trading Mitra",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/the_trading_mitra_logo.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "tithi",
    name: "Tithi",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Tithi.webp",
    bgColor: "#FFFFFF",
  },
  {
    id: "alta-school",
    name: "Alta School of Technology",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Alta SCHOOL OF TECHNOLOGY.webp",
    bgColor: "#0F172A",
  },
  {
    id: "evoltica-energy",
    name: "Evoltica Energy",
    tier: "partner",
    category: "Education, Engineering & Community",
    logo: "/assets/sponsors/Evoltica_Energy.webp",
    bgColor: "#FFFFFF",
  },
];

/**
 * Category metadata for section rendering
 */
export interface CategoryMeta {
  title: SponsorCategory;
  shortLabel: string;
  description: string;
}

export const partnerCategories: CategoryMeta[] = [
  {
    title: "Technology & Digital",
    shortLabel: "Tech & Digital",
    description: "Cloud computing, hardware, coding platforms, esports (NODWIN), hosting (XYZ Hosting), and digital developer tools.",
  },
  {
    title: "Lifestyle & Consumer",
    shortLabel: "Lifestyle",
    description: "Youth brands, personal care, energy drinks, gaming merch, and retail consumer partners (FirstCry).",
  },
  {
    title: "Travel & Experiences",
    shortLabel: "Travel",
    description: "Official mobility, booking, and campus travel experience partners.",
  },
  {
    title: "Education, Engineering & Community",
    shortLabel: "Engineering & Community",
    description: "Precision manufacturing, engineering solutions, finance, and educational community.",
  },
];

/**
 * Helper to get sponsors by category
 */
export function getSponsorsByCategory(category: SponsorCategory): Sponsor[] {
  return partnerSponsors.filter((s) => s.category === category);
}

/**
 * Consolidated flat list of all confirmed sponsors
 */
export const allConfirmedSponsors: Sponsor[] = [
  titleSponsor,
  ...mainSponsors,
  ...partnerSponsors,
];
