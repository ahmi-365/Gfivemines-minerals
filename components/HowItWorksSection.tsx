// components/HowItWorksSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HowItWorksSectionProps {
  visibleSections?: { [key: string]: boolean };
}

const steps = [
  {
    id: 1,
    title: "Discover",
    desc: "Explore quarry-direct marble, granite, and minerals.",
    icon: Search,
    link: "/marble-stones",
    linkText: "Browse Marble & Stone",
  },
  {
    id: 2,
    title: "Specify",
    desc: "Select dimensions, finish, and application requirements.",
    icon: MousePointerClick,
    link: "/marble-stones",
    linkText: "Choose Finish",
  },
  {
    id: 3,
    title: "Schedule",
    desc: "Coordinate crating, loading, and delivery to site.",
    icon: ShoppingBag,
    link: "/cart",
    linkText: "Plan Logistics",
  },
  {
    id: 4,
    title: "Deliver",
    desc: "Precision cutting and finishing for bulk orders and custom specifications.",
    icon: Sparkles,
    link: "/marble-stones",
    linkText: "View Inventory",
  },
];

export function HowItWorksSection({ visibleSections }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 md:py-32 bg-obsidian text-marble relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-white/5 mb-6">
            <ArrowRight className="w-3 h-3 text-bronze" />
            <span className="eyebrow">The Process</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[0.98]">
            From quarry to cutting
            <span className="italic text-vein"> made simple.</span>
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* DESKTOP: Connecting Line Background */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-hairline -z-10" />

          {/* DESKTOP: Interactive Progress Line (Bronze) */}
          <motion.div
            className="hidden lg:block absolute top-10 left-[10%] h-px bg-bronze -z-10 origin-left"
            initial={{ width: "0%" }}
            animate={{ width: `${(Math.max(0, activeStep - 1) / 3) * 80}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.id * 0.1 }}
                onMouseEnter={() => setActiveStep(item.id)}
                onMouseLeave={() => setActiveStep(0)}
                className={`relative flex flex-col items-center text-center p-6 rounded-3xl transition-all duration-300 ${activeStep === item.id
                  ? "bg-graphite border border-hairline-strong shadow-2xl shadow-black/40 scale-105"
                  : "border border-transparent hover:bg-graphite/50"
                  }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 border-2 relative z-10 ${activeStep >= item.id
                    ? "bg-bronze border-bronze text-obsidian"
                    : "bg-graphite border-hairline text-marble-faint"
                    }`}
                >
                  <item.icon className="w-8 h-8" />

                  {activeStep > item.id && (
                    <div className="absolute -right-1 -top-1 bg-bronze rounded-full p-1 border-2 border-obsidian">
                      <CheckCircle2 className="w-3 h-3 text-obsidian" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="eyebrow">Step 0{item.id}</span>
                  <h3
                    className={`text-lg font-medium transition-colors ${activeStep >= item.id ? "text-marble" : "text-marble-dim"
                      }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-marble-dim leading-relaxed px-2">
                    {item.desc}
                  </p>
                </div>

                {/* Interactive Link (Appears on Hover) */}
                <div
                  className={`mt-6 overflow-hidden transition-all duration-300 ${activeStep === item.id
                    ? "h-10 opacity-100"
                    : "h-0 opacity-0"
                    }`}
                >
                  <Link
                    href={item.link}
                    className="text-xs font-bold uppercase tracking-wider text-bronze-light border-b border-bronze pb-0.5 hover:text-marble hover:border-marble transition-colors"
                  >
                    {item.linkText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Connector (Vertical Line) */}
        <div className="lg:hidden absolute left-1/2 top-[300px] bottom-[100px] w-px bg-hairline -z-10 -translate-x-1/2" />
      </div>
    </section>
  );
}
