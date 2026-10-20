"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  scrollY?: number;
  isVisible?: boolean;
}

export function HeroSection({ scrollY = 0, isVisible = true }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-obsidian grain">
      {/* Parallax stone backdrop */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: isMobile ? "none" : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1551458601-14e8150ece4b?fm=jpg&q=70&w=2400&fit=crop"
          alt="Marble quarry — terraced stone extraction"
          className="w-full h-full object-cover opacity-70"
        />
        {/* Obsidian wash */}
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />
      </div>

      {/* Headline block, bottom-aligned */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-14 pt-24 px-6 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent">
        <div
          className={`max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <div className="space-y-6 max-w-3xl">
            {/* Eyebrow sits directly above the headline */}
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bronze" />
              <p className="eyebrow">Quarry-Direct · Marble · Granite · Minerals</p>
            </div>

            <h1 className="font-display font-light text-marble text-4xl sm:text-5xl md:text-7xl xl:text-8xl leading-[0.95] md:leading-[0.92] tracking-tight">
              Stone, quarried and cut
              <br />
              to <span className="italic text-vein">perfection.</span>
            </h1>
            <p className="text-marble-dim text-base md:text-lg max-w-xl leading-relaxed">
              GFive Mines &amp; Minerals sources world-class marble slabs, granite
              blocks, and specialty minerals — traceable from quarry to finished
              cut.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link href="/marble-stones" className="group inline-flex">
              <span className="inline-flex items-center gap-3 bg-bronze text-obsidian px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-bronze-light transition-colors duration-300">
                View Stone Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
