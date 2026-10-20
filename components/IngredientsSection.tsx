// components/IngredientsSection.tsx
"use client";

import { easeOut, motion } from "framer-motion";
import { ArrowRight, Heart, Leaf, Shield, Sparkles } from "lucide-react";
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
    desc: "CNC cutting and honed, polished, or leathered finishes to match your specifications.",
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
    <section
      id="about"
      className="pb-24 pt-24 bg-obsidian text-marble relative overflow-hidden grain"
    >
      <div className="vein-glow" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-bronze" />
            <span className="eyebrow">The GFive Standard</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 tracking-tight leading-[0.98]">
            Elevated natural stone for{" "}
            <span className="italic text-vein">signature spaces.</span>
          </h2>
          <p className="text-marble-dim text-lg leading-relaxed max-w-2xl">
            From premium marble slabs to robust granite blocks, GFive Mines &amp;
            Minerals supplies quarry-direct stone with consistent quality,
            reliable dimensions, and precision cutting capabilities for buyers
            worldwide.
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
              className="group relative bg-graphite border border-hairline rounded-3xl p-8 hover:border-bronze/40 hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* number watermark */}
              <span className="absolute top-6 right-7 font-display text-5xl text-white/5 group-hover:text-bronze/15 transition-colors duration-500 select-none">
                0{index + 1}
              </span>

              <div className="w-14 h-14 bg-white/5 border border-hairline rounded-2xl flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:border-bronze transition-colors duration-500">
                <item.icon className="w-6 h-6 text-bronze-light group-hover:text-obsidian transition-colors duration-500" />
              </div>

              <h3 className="text-xl font-medium text-marble mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-marble-dim leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/marble-stones" className="group inline-flex">
            <span className="inline-flex items-center gap-3 bg-bronze text-obsidian px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-bronze-light transition-colors duration-300">
              Browse Stone Inventory
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
