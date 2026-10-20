"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Ruler,
  ArrowRightLeft,
  MoveVertical,
  CircleDashed,
  HelpCircle,
} from "lucide-react";

// --- DATA ---
const sizeData = {
  slabs: {
    columns: ["Type", "Length", "Width", "Thickness", "Area", "Weight"],
    data: [
      {
        size: "Small Slab",
        in: ["120\"", "80\"", "20\"", "~75 sqft", "~500kg"],
        mm: ["3048mm", "2032mm", "508mm", "~75 sqft", "~500kg"],
      },
      {
        size: "Medium Slab",
        in: ["240\"", "120\"", "25\"", "~200 sqft", "~1200kg"],
        mm: ["6096mm", "3048mm", "635mm", "~200 sqft", "~1200kg"],
      },
      {
        size: "Large Slab",
        in: ["300\"", "150\"", "30\"", "~312 sqft", "~1800kg"],
        mm: ["7620mm", "3810mm", "762mm", "~312 sqft", "~1800kg"],
      },
    ],
  },
  blocks: {
    columns: ["Type", "Length", "Width", "Height", "Area", "Weight"],
    data: [
      {
        size: "Marble Block",
        in: ["200\"", "100\"", "80\"", "~139 sqft", "~900kg"],
        mm: ["5080mm", "2540mm", "2032mm", "~139 sqft", "~900kg"],
      },
      {
        size: "Granite Block",
        in: ["250\"", "120\"", "100\"", "~208 sqft", "~1500kg"],
        mm: ["6350mm", "3048mm", "2540mm", "~208 sqft", "~1500kg"],
      },
      {
        size: "Mineral Block",
        in: ["180\"", "90\"", "70\"", "~113 sqft", "~750kg"],
        mm: ["4572mm", "2286mm", "1778mm", "~113 sqft", "~750kg"],
      },
    ],
  },
};

export default function SizeGuide() {
  const [activeCategory, setActiveCategory] = useState<"slabs" | "blocks">(
    "slabs"
  );
  const [unit, setUnit] = useState<"in" | "mm">("in");

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-obsidian text-marble selection:bg-bronze selection:text-obsidian">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden grain">
        <div className="vein-glow" />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-graphite/30 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-graphite-light rounded-full blur-[100px] -z-10 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-graphite eyebrow mb-8 shadow-sm">
              <Ruler className="w-3 h-3" />
              <span>Stone Dimensions</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light text-marble mb-8 tracking-tight leading-[0.9]">
              Marble & Stone{" "}
              <span className="italic text-vein font-medium">Dimensions.</span>
            </h1>

            <p className="text-xl text-marble-dim max-w-2xl mx-auto leading-relaxed font-light">
              Our premium marble, granite, and mineral stones are available in standard and custom sizes. Browse dimensions for cutting and processing specifications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE CHART --- */}
      <section className="py-12 bg-obsidian">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Controls Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-graphite/50 p-4 rounded-[2rem] border border-hairline">
            {/* Category Switcher */}
            <div className="flex bg-graphite rounded-full p-1 shadow-sm border border-hairline">
              <button
                onClick={() => setActiveCategory("slabs")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === "slabs"
                  ? "bg-bronze text-obsidian shadow-md"
                  : "text-marble-dim hover:text-marble"
                  }`}
              >
                Slabs
              </button>
              <button
                onClick={() => setActiveCategory("blocks")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === "blocks"
                  ? "bg-bronze text-obsidian shadow-md"
                  : "text-marble-dim hover:text-marble"
                  }`}
              >
                Blocks
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${unit === "in" ? "text-marble" : "text-marble-faint"
                  }`}
              >
                Inches
              </span>
              <button
                onClick={() => setUnit(unit === "in" ? "mm" : "in")}
                className="w-12 h-6 bg-hairline-strong rounded-full relative transition-colors duration-300 focus:outline-none"
              >
                <motion.div
                  layout
                  className="w-5 h-5 bg-bronze rounded-full shadow-md absolute top-0.5 left-0.5"
                  animate={{ x: unit === "in" ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-sm font-medium ${unit === "mm" ? "text-marble" : "text-marble-faint"
                  }`}
              >
                Millimeters
              </span>
            </div>
          </div>

          {/* The Table */}
          <div className="bg-graphite rounded-[2.5rem] border border-hairline shadow-xl shadow-black/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-graphite-light/50">
                    {sizeData[activeCategory].columns.map((col, i) => (
                      <th
                        key={col}
                        className="p-6 text-xs font-bold uppercase tracking-[0.15em] text-marble-faint"
                      >
                        {col}{" "}
                        {i > 0 && (
                          <span className="text-[10px] font-normal normal-case opacity-50">
                            ({unit})
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {sizeData[activeCategory].data.map((row, i) => (
                      <motion.tr
                        key={`${activeCategory}-${row.size}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: i * 0.1 }}
                        className="group hover:bg-graphite-light transition-colors border-b border-hairline last:border-none"
                      >
                        <td className="p-6">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-bronze text-obsidian text-xs font-bold uppercase tracking-wider group-hover:bg-bronze-light transition-colors">
                            {row.size}
                          </span>
                        </td>
                        {/* Dynamic Data Cells */}
                        {(unit === "in" ? row.in : row.mm).map((val: string, idx: number) => (
                          <td
                            key={idx}
                            className="p-6 text-marble-dim font-medium group-hover:text-marble transition-colors"
                          >
                            {val}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Note */}
          <div className="mt-6 flex items-start gap-3 bg-graphite p-4 rounded-2xl border border-hairline">
            <HelpCircle className="w-5 h-5 text-bronze mt-0.5" />
            <p className="text-sm text-marble-dim leading-relaxed">
              <strong className="text-marble">Stone Availability Note:</strong> All dimensions are standard sizes. Custom dimensions and finishes are available upon request. Please contact our sales team for specific requirements and bulk orders.
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW TO MEASURE --- */}
      <section className="py-24 bg-graphite/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-light mb-4 text-marble">Stone Specifications</h2>
            <div className="rule-bronze w-20 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MeasureCard
              title="Length"
              desc="The longest horizontal dimension of the stone slab or block."
              icon={ArrowRightLeft}
            />
            <MeasureCard
              title="Width"
              desc="The secondary horizontal dimension perpendicular to length."
              icon={CircleDashed}
            />
            <MeasureCard
              title="Thickness"
              desc="The vertical measurement from top to bottom of the stone."
              icon={MoveVertical}
            />
            <MeasureCard
              title="Weight"
              desc="Approximate weight varies based on stone type and moisture content."
              icon={Ruler}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Measure Card ---
function MeasureCard({ title, desc, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-graphite p-8 rounded-[2rem] border border-hairline shadow-sm hover:shadow-xl hover:border-bronze/40 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-graphite-light rounded-full flex items-center justify-center mb-6 text-bronze">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-medium mb-3 text-marble">{title}</h3>
      <p className="text-sm text-marble-dim leading-relaxed">{desc}</p>
    </motion.div>
  );
}
