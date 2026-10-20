// components/BenefitsSection.tsx
"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Crown, RefreshCcw, ShieldCheck, Star } from "lucide-react";
import { useEffect, useRef } from "react";

interface BenefitsSectionProps {
  scrollY: number;
}

// 1. Counter Component (Updated for Re-animation)
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="flex">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function BenefitsSection({ scrollY }: BenefitsSectionProps) {
  const stats = [
    {
      id: 1,
      value: 10,
      suffix: "+",
      label: "Cutting Projects",
      icon: Star,
      desc: "Marble slabs, granite blocks, and specialty minerals.",
    },
    {
      id: 2,
      value: 4,
      suffix: "+",
      label: "Stone Variants",
      icon: Crown,
      desc: "Marble, granite, onyx, and mineral blocks.",
    },
    {
      id: 3,
      value: 72,
      suffix: " hrs",
      label: "Processing",
      icon: RefreshCcw,
      desc: "Quick turnaround on cutting and bulk orders.",
    },
  ];

  return (
    <section className="py-24 bg-graphite text-marble relative overflow-hidden">
      {/* Dynamic bronze glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${50 + scrollY * 0.05
            }%, rgba(176,141,87,0.18) 0%, transparent 50%)`,
        }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-bronze/40 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 border border-hairline bg-white/5 px-4 py-1.5 rounded-full mb-6">
              <ShieldCheck className="w-3 h-3 text-bronze" />
              <span className="eyebrow">The GFive Promise</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-light mb-4 tracking-tight leading-[0.98]">
              Why choose{" "}
              <span className="italic text-vein">GFive Mines &amp; Minerals?</span>
            </h2>
            <p className="text-base text-marble-dim font-light leading-relaxed max-w-2xl mx-auto">
              We source, cut, and finish natural stone engineered for durability,
              consistent quality, and reliable delivery schedules — so your bulk
              orders stay on time.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-2xl bg-obsidian/60 border border-hairline hover:border-bronze/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-hairline flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:border-bronze transition-all duration-500">
                <stat.icon className="w-5 h-5 text-bronze-light group-hover:text-obsidian transition-colors duration-500" />
              </div>

              {/* Counter */}
              <div className="font-display text-5xl font-light mb-1 tracking-tight flex items-baseline text-vein">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className="text-base font-medium text-marble mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-marble-faint">{stat.desc}</p>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bronze/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
