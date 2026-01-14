"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
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

  const renderHeroStars = () => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 text-white fill-white" />
      );
    }
    stars.push(
      <div key="half" className="relative w-4 h-4">
        <Star className="w-4 h-4 text-white" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-white text-white" />
        </div>
      </div>
    );
    return stars;
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: isMobile ? "none" : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* NEW IMAGE LINK HERE */}
        <img
          src="https://images.unsplash.com/photo-1659362549741-c32157cc71f4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyYmxlJTIwcXVhcnJ5fGVufDB8fDB8fHww"
          alt="Premium Black Marble Texture"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 pb-8 pt-12 px-4 bg-gradient-to-t from-black/90 to-transparent">
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <div className="text-center md:text-left space-y-3 text-white max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Premium marble, granite, and minerals
            </p>
            <h1 className="text-3xl md:text-5xl font-light leading-tight">
              Premium marble and stone quarried and cut to perfection
            </h1>
            <p className="text-sm md:text-base text-white/80">
              GFive Mines & Minerals sources world-class stone blocks, slabs, and finishes.
            </p>
          </div>

          <Link href="/shop" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 border-none px-8 py-6 text-base font-bold uppercase tracking-widest rounded-none transition-all">
              View Stone Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <div className="hidden md:block w-px h-8 bg-white/30"></div>

          {/* <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-1">
              {renderHeroStars()}
            </div>
            <span className="text-sm font-medium tracking-wide border-b border-white/30 pb-0.5">
              500+ Mining & Cutting Projects
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}