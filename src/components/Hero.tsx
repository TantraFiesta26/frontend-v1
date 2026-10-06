import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { CrimeSceneTape } from "@/components/CrimeSceneTape";

export function Hero() {
  return (
    <section id="home" className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#241A4C] bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <Navbar />

      <div className="relative min-h-0 w-full flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-[24%] z-20 flex h-[38%] items-center justify-center px-4 drop-shadow-2xl">
          <Image
            src="/assets/tf_hero.png"
            alt="Tantra Fiesta"
            width={800}
            height={400}
            draggable={false}
            className="h-full w-full max-w-3xl object-contain"
            priority
          />

        </div>

        <CrimeSceneTape
          text="DO NOT ENTER"
          angle={-2.5}
          speed="45s"
          className="top-[12%]"
        />

        <CrimeSceneTape
          text="CONFIDENTIAL"
          angle={2}
          speed="35s"
          className="top-[50%]"
        />

        <p className="absolute inset-x-0 top-[78%] z-20 px-4 text-center font-tantra text-4xl uppercase tracking-wide text-white drop-shadow-md sm:text-5xl md:text-7xl">
          On its way...
        </p>

        <CrimeSceneTape
          text="AUTHORIZED PERSONNEL ONLY"
          angle={1.5}
          direction="reverse"
          speed="40s"
          className="top-[88%]"
        />
      </div>
    </section>
  );
}
