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
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gray-50/30 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[100px] -z-10 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 shadow-sm">
              <Ruler className="w-3 h-3" />
              <span>Stone Dimensions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[0.9]">
              Marble & Stone{" "}
              <span className="font-serif italic font-medium">Dimensions.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Our premium marble, granite, and mineral stones are available in standard and custom sizes. Browse dimensions for cutting and processing specifications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE CHART --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Controls Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100">
            {/* Category Switcher */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
              <button
                onClick={() => setActiveCategory("slabs")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === "slabs"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                Slabs
              </button>
              <button
                onClick={() => setActiveCategory("blocks")}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === "blocks"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                Blocks
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${unit === "in" ? "text-black" : "text-gray-400"
                  }`}
              >
                Inches
              </span>
              <button
                onClick={() => setUnit(unit === "in" ? "mm" : "in")}
                className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors duration-300 focus:outline-none"
              >
                <motion.div
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5"
                  animate={{ x: unit === "in" ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-sm font-medium ${unit === "mm" ? "text-black" : "text-gray-400"
                  }`}
              >
                Millimeters
              </span>
            </div>
          </div>

          {/* The Table */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {sizeData[activeCategory].columns.map((col, i) => (
                      <th
                        key={col}
                        className="p-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400"
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
                        className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                      >
                        <td className="p-6">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-wider group-hover:bg-black transition-colors">
                            {row.size}
                          </span>
                        </td>
                        {/* Dynamic Data Cells */}
                        {(unit === "in" ? row.in : row.mm).map((val: string, idx: number) => (
                          <td
                            key={idx}
                            className="p-6 text-gray-600 font-medium group-hover:text-black transition-colors"
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
          <div className="mt-6 flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
            <HelpCircle className="w-5 h-5 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-gray-900">Stone Availability Note:</strong> All dimensions are standard sizes. Custom dimensions and finishes are available upon request. Please contact our sales team for specific requirements and bulk orders.
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW TO MEASURE --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Stone Specifications</h2>
            <div className="w-20 h-px bg-black mx-auto" />
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
      className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-900">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
