import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { TagsMarquee } from "@/components/TagsMarquee";
import { EventsTeaser } from "@/components/Sponsors";
import { Footer } from "@/components/Footer";
import { StarLoader } from "@/components/StarLoader";
import { siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.fullName,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: "TantraFiesta",
    url: siteConfig.url,
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.linkedin],
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology Nagpur",
      url: "https://iiitn.ac.in",
    },
  },
};

export default function Home() {
  return (
    <main className="relative flex-1 bg-zinc-950 text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <StarLoader />
      <Hero />
      <AboutSection />
      <PhotoGallery />
      <TagsMarquee />
      <EventsTeaser />
      <Footer />
    </main>
  );
}
