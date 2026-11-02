"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { HoverTilt } from "@/components/HoverTilt";
import {
  titleSponsor,
  mainSponsors,
  partnerCategories,
  getSponsorsByCategory,
  type Sponsor,
  partnerSponsors,
} from "@/data/sponsors";

interface SponsorsPageContentProps {
  headingTag?: "h1" | "h2";
  className?: string;
}

/**
 * Distributes items evenly across N columns in round-robin order
 */
function distributeToColumns<T>(items: T[], numCols: number): T[][] {
  const cols: T[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => {
    cols[i % numCols].push(item);
  });
  return cols;
}

export function SponsorsPageContent({
  headingTag = "h1",
  className = "",
}: SponsorsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const HeadingTag = headingTag;

  // Distribute 4 main sponsors into 2 or 4 staggered columns
  const mainColumns = distributeToColumns(mainSponsors, 4);

  return (
    <section
      id="sponsors-section"
      className={`relative w-full pt-12 md:pt-20 flex flex-col items-center px-3 sm:px-6 md:px-8 ${className}`}
      aria-label="TantraFiesta 2026 Sponsors"
    >
      <div className="w-full max-w-[1600px] bg-[#FFFF1A] rounded-t-[32px] md:rounded-t-[48px] px-4 sm:px-8 md:px-14 lg:px-16 pt-16 md:pt-24 pb-20 md:pb-32 relative shadow-2xl text-black">
        {/* ============================================================
            1. EXISTING SPONSORS PAGE HEADING & HOVERCAR
            ============================================================ */}
        <Reveal
          variant="left"
          className="absolute -top-12 md:-top-20 left-4 md:left-12 w-44 sm:w-56 md:w-80 z-20 pointer-events-none sm:pointer-events-auto"
        >
          <HoverTilt className="w-full" rotationIntensity={10} scaleIntensity={1.03}>
            <Image
              src="/assets/hovercar.webp"
              alt="TantraFiesta 2026 Hovercar"
              width={320}
              height={240}
              className="w-full h-auto object-contain drop-shadow-xl"
              priority
            />
          </HoverTilt>
        </Reveal>

        <Reveal variant="scale" delay={100}>
          <div className="text-center mt-6 md:mt-2 mb-12 md:mb-16 relative z-10">
            <HeadingTag className="font-regular font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black uppercase tracking-normal">
              SP<span className="ml-[0.02em]">O</span>
              <span className="ml-[0.02em]">N</span>SORS
            </HeadingTag>
            <p className="text-zinc-800 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium mt-3 px-4">
              Celebrating the visionary industry leaders, corporate partners, and technology enterprises
              fueling TantraFiesta 2026 at IIIT Nagpur.
            </p>
          </div>
        </Reveal>

        {/* ============================================================
            2. PRIMARY TITLE SPONSOR SECTION (HERO JIGSAW PIECE)
            ============================================================ */}
        <section
          aria-labelledby="title-sponsor-heading"
          className="w-full max-w-4xl mx-auto mb-16 md:mb-24 flex flex-col items-center relative z-10"
        >
          <Reveal variant="rise" delay={150} className="w-full flex flex-col items-center">
            {/* Title Sponsor Pill */}
            <div className="flex items-center gap-2 mb-6">
              <span
                id="title-sponsor-heading"
                className="px-5 py-2 rounded-full bg-black text-[#FFFF1A] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFFF1A] animate-pulse" />
                TITLE SPONSOR
              </span>
            </div>

            {/* Grand Hero Jigsaw Card */}
            <HoverTilt
              rotationIntensity={8}
              scaleIntensity={1.03}
              className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px]"
            >
              <div className="relative aspect-[4/5] w-full group transition-transform duration-300">
                {/* Jigsaw SVG Silhouette */}
                <svg
                  className="absolute inset-0 w-full h-full drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                  viewBox="0 0 100 125"
                  preserveAspectRatio="none"
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                >
                  <path
                    fill={titleSponsor.bgColor}
                    d="
                      M 4 4 
                      L 96 4 
                      L 96 90 
                      Q 96 93 93 93 
                      L 73 93 
                      Q 70 93 67 96 
                      L 57 119 
                      Q 55 121 52 121 
                      L 4 121 
                      Z
                    "
                  />
                </svg>

                {/* Corner Tech Accents */}
                <div className="absolute top-[6%] left-[8%] z-10 px-3 py-1 rounded bg-black/90 text-[#FFFF1A] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                  OFFICIAL TITLE SPONSOR
                </div>

                {/* Centered SBI Logo */}
                <div className="absolute z-10 top-[18%] left-[12%] right-[12%] bottom-[24%] flex items-center justify-center p-2">
                  <Image
                    src={titleSponsor.logo}
                    alt={`${titleSponsor.name} — ${titleSponsor.officialTitle}`}
                    fill
                    className="object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    priority
                    sizes="(max-width: 640px) 90vw, 480px"
                  />
                </div>

                {/* Subtitle in bottom jigsaw notch tab */}
                <div className="absolute z-10 bottom-[5%] left-[8%] right-[24%] text-left">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 truncate block">
                    {titleSponsor.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium block truncate">
                    State Bank of India
                  </span>
                </div>
              </div>
            </HoverTilt>
          </Reveal>
        </section>

        {/* ============================================================
            3. OTHER MAIN SPONSORS (STAGGERED JIGSAW GRID)
            ============================================================ */}
        <section
          aria-label="Main Sponsors Tier"
          className="w-full max-w-6xl mx-auto mb-20 md:mb-28 relative z-10"
        >
          <Reveal variant="rise" delay={200}>
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
              <div className="h-px w-12 sm:w-24 bg-black/20" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black/75">
                MAIN SPONSORSHIP TIER
              </span>
              <div className="h-px w-12 sm:w-24 bg-black/20" />
            </div>

            {/* 4 Staggered Jigsaw Columns for Main Sponsors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {mainColumns.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className={`flex flex-col gap-4 md:gap-6 ${
                    colIdx % 2 === 1 ? "mt-6 md:mt-16" : ""
                  }`}
                >
                  {col.map((sponsor, idx) => (
                    <Reveal
                      key={sponsor.id}
                      variant={(colIdx + idx) % 2 === 0 ? "sponsor-left" : "sponsor-right"}
                      delay={colIdx * 65}
                    >
                      <JigsawSponsorCard
                        sponsor={sponsor}
                        variant={colIdx % 2 === 0 ? "left" : "right"}
                        isMainSponsor
                      />
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============================================================
            4. CLEARLY SEPARATED "OUR PARTNERS" SECTION
            ============================================================ */}
        <section
          id="our-partners"
          aria-labelledby="our-partners-heading"
          className="w-full max-w-6xl mx-auto relative z-10"
        >
          {/* Section Divider & Header */}
          <Reveal variant="rise" delay={250}>
            <div className="pt-10 border-t-2 border-black/15 text-center mb-10 md:mb-14">
              <h2
                id="our-partners-heading"
                className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black"
              >
                OUR PARTNERS
              </h2>
              <p className="text-zinc-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-2 font-medium">
                Domain-specific partners powering events, infrastructure, participant experiences, and tech challenges.
              </p>

              {/* Category Quick Filter Pills (without partner count badges) */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-black text-[#FFFF1A] shadow-md ring-2 ring-black"
                      : "bg-white/80 text-black hover:bg-white border border-black/15"
                  }`}
                >
                  All Partners
                </button>
                {partnerCategories.map((cat) => {
                  const isActive = selectedCategory === cat.title;
                  return (
                    <button
                      key={cat.title}
                      type="button"
                      onClick={() => setSelectedCategory(cat.title)}
                      className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                        isActive
                          ? "bg-black text-[#FFFF1A] shadow-md ring-2 ring-black"
                          : "bg-white/80 text-black hover:bg-white border border-black/15"
                      }`}
                    >
                      {cat.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ============================================================
              5. CATEGORIZED PARTNER GROUPS IN STAGGERED JIGSAW GRIDS
              ============================================================ */}
          <div className="space-y-16 md:space-y-24">
            {partnerCategories.map((cat) => {
              const sponsors = getSponsorsByCategory(cat.title);
              const isVisible = selectedCategory === "all" || selectedCategory === cat.title;

              if (!isVisible) return null;

              // Distribute sponsors of this category into 4 columns (2 columns on mobile)
              const partnerCols = distributeToColumns(sponsors, 4);

              return (
                <div key={cat.title} className="flex flex-col">
                  {/* Category Header (clean without badge) */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-8 pb-3 border-b border-black/15">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-black">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-700 font-medium">
                      {cat.description}
                    </p>
                  </div>

                  {/* 4 Staggered Jigsaw Columns */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                    {partnerCols.map((col, colIndex) => (
                      <div
                        key={colIndex}
                        className={`flex flex-col gap-4 md:gap-6 ${
                          colIndex % 2 === 1 ? "mt-6 md:mt-16" : ""
                        }`}
                      >
                        {col.map((sponsor, idx) => (
                          <Reveal
                            key={sponsor.id}
                            variant={(colIndex + idx) % 2 === 0 ? "sponsor-left" : "sponsor-right"}
                            delay={colIndex * 50}
                          >
                            <JigsawSponsorCard
                              sponsor={sponsor}
                              variant={colIndex % 2 === 0 ? "left" : "right"}
                            />
                          </Reveal>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

/**
 * Jigsaw Sponsor Card (Used for Main Sponsors and Partner Sponsors)
 */
function JigsawSponsorCard({
  sponsor,
  variant = "left",
  isMainSponsor = false,
}: {
  sponsor: Sponsor;
  variant?: "left" | "right";
  isMainSponsor?: boolean;
}) {
  const isDark =
    sponsor.bgColor.toLowerCase() === "#0b0b0e" ||
    sponsor.bgColor.toLowerCase() === "#1b1a18" ||
    sponsor.bgColor.toLowerCase() === "#0f172a" ||
    sponsor.bgColor.toLowerCase() === "#000000";

  return (
    <div className="relative aspect-[4/5] w-full group hover:scale-105 transition-transform duration-300">
      {/* SVG Background Jigsaw Cut Frame */}
      <svg
        className="absolute inset-0 w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all"
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {variant === "left" ? (
          // Notch cut on bottom-right
          <path
            fill={sponsor.bgColor}
            d="
              M 4 4 
              L 96 4 
              L 96 90 
              Q 96 93 93 93 
              L 73 93 
              Q 70 93 67 96 
              L 57 119 
              Q 55 121 52 121 
              L 4 121 
              Z
            "
          />
        ) : (
          // Mirrored: Notch cut on bottom-left
          <path
            fill={sponsor.bgColor}
            d="
              M 96 4 
              L 4 4 
              L 4 90 
              Q 4 93 7 93 
              L 27 93 
              Q 30 93 33 96 
              L 43 119 
              Q 45 121 48 121 
              L 96 121 
              Z
            "
          />
        )}
      </svg>

      {/* Official Sponsorship Title Badge (For Main Sponsors) */}
      {isMainSponsor && sponsor.officialTitle && (
        <div
          className={`absolute top-[6%] z-20 ${
            variant === "left" ? "left-[8%]" : "right-[8%]"
          }`}
        >
          <span className="px-2.5 py-0.5 rounded bg-black text-[#FFFF1A] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs">
            {sponsor.officialTitle}
          </span>
        </div>
      )}

      {/* Centered Logo with object-contain */}
      <div
        className={`absolute z-10 flex items-center justify-center ${
          isMainSponsor ? "top-[18%] bottom-[20%]" : "top-[12%] bottom-[22%]"
        } ${variant === "left" ? "left-[10%] right-[14%]" : "left-[14%] right-[10%]"}`}
      >
        <Image
          src={sponsor.logo}
          alt={
            isMainSponsor && sponsor.officialTitle
              ? `${sponsor.name} — ${sponsor.officialTitle}`
              : sponsor.name
          }
          fill
          className="object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>

      {/* Sponsor Name in Notch Tab */}
      <div
        className={`absolute z-10 bottom-[4%] ${
          variant === "left" ? "left-[8%] right-[24%]" : "left-[24%] right-[8%]"
        } text-center`}
      >
        <span
          className={`text-[10px] sm:text-xs font-bold tracking-tight truncate block ${
            isDark ? "text-zinc-200" : "text-zinc-900"
          }`}
          title={sponsor.name}
        >
          {sponsor.name}
        </span>
      </div>
    </div>
  );
}
