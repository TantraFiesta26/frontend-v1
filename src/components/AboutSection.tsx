import React from "react";
import Image from "next/image";
import { FloatingArt } from "@/components/FloatingArt";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-[#241A4C] bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat py-12 md:py-20 px-4 sm:px-6 lg:px-12 text-black overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="relative bg-[#FFFF1A] rounded-2xl md:rounded-[28px] p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-black/10">
          {/* Character Illustration */}
          <FloatingArt className="absolute -right-6 -top-12 z-20 hidden w-80 lg:block xl:-right-10 xl:-top-16 xl:w-96">
            <Image
              src="/assets/gurl.png"
              alt="TantraFiesta Mascot"
              width={450}
              height={550}
              draggable={false}
              className="w-full h-auto object-contain drop-shadow-xl"
              priority
            />
          </FloatingArt>

          <div className="relative z-10 lg:max-w-[65%] xl:max-w-[70%]">
            <h2 className="font-tantra text-3xl sm:text-5xl md:text-6xl text-black uppercase tracking-tight mb-6">
              ABOUT TANTRAFIESTA
            </h2>

            <div className="space-y-4 text-sm font-medium leading-relaxed text-black sm:text-base md:text-lg">
              <p>
                TantraFiesta is the National-Level Annual Technical Fest of the Indian Institute of Information Technology, Nagpur. It is conceived as a platform where technology is explored beyond the classroom—through experimentation, problem-solving, and original thinking.
              </p>
              <p>
                The fest brings together students with different technical interests and encourages them to question established approaches, work with emerging ideas, and apply knowledge in meaningful ways. With every edition, TantraFiesta reflects the evolving nature of technology while staying rooted in its core purpose: to promote technical curiosity, creativity, and a culture of building beyond the obvious.
              </p>
              <p>
                The 2026 edition carries that spirit forward from previous editions, including TantraFiesta 2024 and 2025. Its next chapter is on its way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
