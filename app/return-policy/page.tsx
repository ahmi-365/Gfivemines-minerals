"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  XCircle
} from "lucide-react";
import Link from "next/link";

export default function ReturnPolicy() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen bg-obsidian text-marble selection:bg-bronze selection:text-obsidian">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden grain">
        <div className="vein-glow" />
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-graphite/40 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-[10%] w-96 h-96 bg-bronze/10 rounded-full blur-[100px] -z-10 opacity-60"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-[10%] w-72 h-72 bg-bronze/10 rounded-full blur-[80px] -z-10 opacity-40"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-graphite mb-8">
              <ShieldCheck className="w-3 h-3" />
              <span>The GFive Mines & Minerals Guarantee</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light text-marble mb-8 tracking-tight leading-[0.9]">
              Returns &{" "}
              <span className="italic text-vein">Exchanges.</span>
            </h1>

            <p className="text-xl text-marble-dim max-w-2xl mx-auto leading-relaxed font-light">
              Your satisfaction is our priority. We've crafted a seamless return
              process so you can shop with absolute confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- QUICK STATS --- */}
      <section className="py-12 border-y border-hairline bg-obsidian">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {[
              {
                icon: Clock,
                title: "15-Day Window",
                desc: "Time to decide if it's perfect.",
              },
              {
                icon: RefreshCw,
                title: "Easy Process",
                desc: "Hassle-free online portal.",
              },
              {
                icon: CheckCircle2,
                title: "Quality Promise",
                desc: "Guaranteed satisfaction.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center px-4 py-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-graphite rounded-full mb-4">
                  <item.icon className="w-5 h-5 text-bronze" />
                </div>
                <h3 className="text-lg font-medium text-marble mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-marble-dim">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MAIN POLICY CONTENT --- */}
      <section className="py-24 bg-obsidian relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 1. Overview Card */}
            <PolicyCard icon={Clock} title="Return Window" delay={0.1}>
              <p className="text-marble-dim leading-relaxed mb-4">
                You have <strong className="text-marble">15 days</strong> from
                the delivery date to return your natural stone. To be eligible
                for a full refund, items must be unworn, unwashed, and in their
                original packaging with all tags attached.
              </p>
              <p className="text-marble-dim leading-relaxed text-sm">
                *For hygiene reasons, certain intimate apparel cannot be
                returned once the seal is broken.
              </p>
            </PolicyCard>

            {/* 2. Eligibility Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <PolicyCard
                icon={CheckCircle2}
                title="Eligible Items"
                delay={0.2}
              >
                <ul className="space-y-3">
                  {[
                    "Unopened products in original packaging",
                    "Products with tags intact",
                    "Manufacturing defects or damage",
                    "Incorrect items received",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-marble-dim"
                    >
                      <CheckCircle2 className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </PolicyCard>

              <PolicyCard icon={XCircle} title="Not Eligible" delay={0.3}>
                <ul className="space-y-3">
                  {[
                    "Worn, washed, or altered items",
                    "Missing original tags or packaging",
                    "Final sale or clearance items",
                    "Returns initiated after 15 days",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-marble-dim"
                    >
                      <XCircle className="w-4 h-4 text-marble-faint mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </PolicyCard>
            </div>

            {/* 3. Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-graphite rounded-[2rem] p-8 md:p-12 border border-hairline"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-bronze text-obsidian rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-light text-marble">How to Return</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Contact",
                    desc: "Email or call our support team.",
                  },
                  {
                    step: "02",
                    title: "Approve",
                    desc: "Receive your return authorization.",
                  },
                  {
                    step: "03",
                    title: "Ship",
                    desc: "Pack items and ship back to us.",
                  },
                  {
                    step: "04",
                    title: "Refund",
                    desc: "Money back within 7-10 days.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <span className="font-display text-4xl italic text-bronze/40">
                      {item.step}
                    </span>
                    <h3 className="font-medium text-marble">{item.title}</h3>
                    <p className="text-xs text-marble-dim leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-24 bg-graphite text-marble relative overflow-hidden grain">
        <div className="vein-glow" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-marble">
              Need Assistance?
            </h2>
            <p className="text-marble-dim text-lg font-light">
              Our support team is available Monday through Friday to guide you
              through the process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="group flex items-center gap-4 bg-bronze text-obsidian border border-bronze rounded-full px-8 py-4 hover:bg-bronze-light transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email Support</span>
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-4 bg-transparent border border-hairline-strong rounded-full px-8 py-4 hover:border-bronze/40 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper Component for Cards
function PolicyCard({ icon: Icon, title, children, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-graphite rounded-[2rem] p-8 md:p-10 border border-hairline hover:border-bronze/40 transition-all duration-500"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-graphite-light rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-bronze" />
        </div>
        <h2 className="text-xl font-medium text-marble">{title}</h2>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}
