import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} | ${siteConfig.institute} Tech Fest`,
    template: `%s | ${siteConfig.fullName} | ${siteConfig.institute}`,
  },
  description: siteConfig.description,
  keywords: [
    "TantraFiesta",
    "TantraFiesta 2026",
    "IIIT Nagpur",
    "technical fest",
    "TantraFiesta 2026 events",
    "TantraFiesta previous editions",
  ],
  authors: [{ name: "TantraFiesta Team" }],
  creator: "IIIT Nagpur",
  publisher: "TantraFiesta",
  applicationName: "TantraFiesta 2026",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName} — The Next Edition | ${siteConfig.institute}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} — The Next Edition | ${siteConfig.institute}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
