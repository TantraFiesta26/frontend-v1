import Image from "next/image";

interface NavbarProps {
  variant?: "default" | "events";
  currentPath?: string;
  registrationHref?: string;
}

export function Navbar({}: NavbarProps = {}) {
  return (
    <header className="relative z-30 mx-auto flex w-full items-center justify-between gap-4 px-6 pb-4 pt-8 text-white md:pb-5 md:pt-10 lg:px-12">
      <div className="flex shrink-0 items-center gap-3" aria-label="TantraFiesta">
        <Image src="/assets/tf_logo.png" alt="" width={48} height={48} draggable={false} className="h-10 w-10 object-contain" />
        <Image src="/assets/tf_nav.png" alt="TantraFiesta" width={320} height={40} draggable={false} className="hidden h-6 w-auto object-contain sm:block md:h-7" />
      </div>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:text-xs">
        IIIT Nagpur / 2026
      </span>
    </header>
  );
}
