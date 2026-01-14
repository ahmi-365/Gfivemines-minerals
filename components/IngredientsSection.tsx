// components/IngredientsSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { easeOut, motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    Heart,
    Leaf,
    Shield,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

interface IngredientsSectionProps {
  visibleSections: { [key: string]: boolean };
}

const features = [
  {
    icon: Leaf,
    title: "Source-to-Slab",
    desc: "Direct quarry sourcing with full traceability from block to slab so every lot is consistent and project-ready.",
  },
  {
    icon: Sparkles,
    title: "Precision Finishing",
    desc: "CNC cutting and honed, polished, or leathered finishes to match your installation requirements.",
  },
  {
    icon: Shield,
    title: "Structural Integrity",
    desc: "Strength-graded slabs and blocks tested for compressive performance on demanding construction sites.",
  },
  {
    icon: Heart,
    title: "Consciously Quarried",
    desc: "Responsible extraction with minimized waste and water reuse across quarry and finishing operations.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function IngredientsSection({
  visibleSections,
}: IngredientsSectionProps) {
  return (
    // UPDATED: Changed py-24 to pt-8 pb-24 to remove top spacing
    <section id="about" className=" pb-24 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gray-50/50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16" // Reduced margin-bottom from 20 to 16
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-6 shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-gray-900" />
            <span>The Gfivemines&minerals Standard</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
            Elevated stone for signature spaces
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            From marble feature walls to granite flooring, Gfivemines&minerals
            supplies curated stone with predictable performance, consistent
            tones, and finishes that make installations effortless.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500 cursor-default"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-500">
                <item.icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:tracking-wide transition-all duration-300">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L18 18M18 2L2 18"
                    stroke="black"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/shop">
            <Button className="bg-gray-900 text-white px-10 py-6 rounded-full font-medium text-base hover:bg-black transition-all hover:shadow-lg hover:shadow-gray-200 group">
              Browse Stone Inventory
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
