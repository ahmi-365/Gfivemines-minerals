"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function ShippingGuide() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-obsidian text-marble selection:bg-bronze selection:text-obsidian">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden grain">
        <div className="vein-glow" />
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-graphite/40 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-[15%] w-[500px] h-[500px] bg-bronze/10 rounded-full blur-[120px] -z-10 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-graphite mb-8">
              <Truck className="w-3 h-3" />
              <span>Worldwide Delivery</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light text-marble mb-8 tracking-tight leading-[0.9]">
              Shipping &{" "}
              <span className="italic text-vein">Delivery.</span>
            </h1>

            <p className="text-xl text-marble-dim max-w-2xl mx-auto leading-relaxed font-light">
              From quarry to site. We ensure your natural stone
              arrive safely, timely, and beautifully packaged.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VISUAL PROCESS TIMELINE --- */}
      <section className="py-16 border-y border-hairline bg-obsidian overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="eyebrow">
              The Journey
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-hairline -z-10" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Order Placed",
                  desc: "Confirmation email sent immediately.",
                  icon: CheckCircle2,
                },
                {
                  step: "02",
                  title: "Processing",
                  desc: "1-2 business days for preparation.",
                  icon: Package,
                },
                {
                  step: "03",
                  title: "Shipped",
                  desc: "Handed to courier with tracking.",
                  icon: Truck,
                },
                {
                  step: "04",
                  title: "Delivered",
                  desc: "Arrives at your doorstep.",
                  icon: MapPin,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 bg-graphite border border-hairline rounded-full flex items-center justify-center mb-6 group-hover:border-bronze/40 transition-all duration-500">
                    <item.icon className="w-8 h-8 text-marble-faint group-hover:text-bronze transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-medium text-marble mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-marble-dim">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SHIPPING OPTIONS --- */}
      <section className="py-24 bg-graphite/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4 text-marble">
                Shipping Methods
              </h2>
              <p className="text-marble-dim font-light">
                Choose the speed that suits your needs. We partner with reliable
                couriers to ensure the safety of your garments.
              </p>
            </div>
            {/* Visual decoration */}
            <div className="hidden md:block w-32 h-px bg-hairline mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Card */}
            <ShippingCard
              title="Standard Delivery"
              price="Free"
              time="3-5 Business Days"
              desc="Perfect for non-urgent orders. Available nationwide across Pakistan."
              features={[
                "Free on orders over Rs. 5000",
                "Full Tracking",
                "SMS Notifications",
              ]}
              icon={Truck}
              recommended
            />

            {/* Express Card */}
            <ShippingCard
              title="Express Delivery"
              price="Rs. 250"
              time="1-2 Business Days"
              desc="For when you need your look ready for the weekend."
              features={[
                "Priority Processing",
                "Next Day Dispatch",
                "Premium Handling",
              ]}
              icon={Clock}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ / ADDITIONAL INFO --- */}
      <section className="py-24 bg-obsidian">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* International Shipping */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-bronze text-obsidian rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-light mb-4 text-marble">
                  International Shipping
                </h3>
                <p className="text-marble-dim leading-relaxed mb-4">
                  Yes, we ship globally! International shipping rates are
                  calculated at checkout based on your location and the weight
                  of your order.
                </p>
                <ul className="space-y-2 text-sm text-marble-dim">
                  <li>• USA & Canada: 7-10 Business Days</li>
                  <li>• UK & Europe: 6-8 Business Days</li>
                  <li>• Middle East: 4-6 Business Days</li>
                </ul>
              </div>
            </div>

            <div className="w-full h-px bg-hairline" />

            {/* Tracking */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-graphite text-bronze rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-light mb-4 text-marble">Order Tracking</h3>
                <p className="text-marble-dim leading-relaxed mb-6">
                  Once your order is dispatched, you will receive an email and
                  SMS containing your tracking number and a link to trace your
                  package in real-time.
                </p>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bronze border-b border-bronze pb-1 hover:text-bronze-light hover:border-bronze-light transition-all"
                >
                  Track Your Order <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full h-px bg-hairline" />

            {/* Delays */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-graphite text-bronze rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-light mb-4 text-marble">Potential Delays</h3>
                <p className="text-marble-dim leading-relaxed">
                  During sale periods, holidays, or unforeseen weather
                  conditions, dispatch may take an extra 1-2 business days. We
                  appreciate your patience and promise it will be worth the
                  wait.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Shipping Card ---
function ShippingCard({
  title,
  price,
  time,
  desc,
  features,
  icon: Icon,
  recommended,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 group ${recommended
        ? "bg-graphite-light text-marble border-bronze/40"
        : "bg-graphite text-marble border-hairline hover:border-bronze/40"
        }`}
    >
      {recommended && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-bronze/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-bronze-light border border-bronze/30">
          Recommended
        </div>
      )}

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${recommended ? "bg-bronze text-obsidian" : "bg-graphite-light text-bronze"
          }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-2xl font-medium mb-2 text-marble">{title}</h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-light text-marble">{price}</span>
      </div>

      <div
        className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-6 ${recommended ? "bg-bronze text-obsidian" : "bg-graphite-light text-bronze"
          }`}
      >
        {time}
      </div>

      <p className="mb-8 leading-relaxed text-marble-dim">
        {desc}
      </p>

      <ul className="space-y-3">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-4 h-4 text-bronze" />
            <span className="text-marble-dim">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
