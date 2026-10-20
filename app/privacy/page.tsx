"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cookie,
  CreditCard,
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  Share2,
  Shield,
} from "lucide-react";

export default function PrivacyPolicy() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen bg-obsidian text-marble selection:bg-bronze selection:text-obsidian">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden grain">
        <div className="vein-glow" />
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-graphite/30 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-bronze/10 rounded-full blur-[100px] -z-10 opacity-60"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[120px] -z-10 opacity-40"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-graphite eyebrow mb-8">
              <Lock className="w-3 h-3" />
              <span>Your Data is Secure</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light text-marble mb-8 tracking-tight leading-[0.9]">
              Privacy &{" "}
              <span className="italic text-vein">Protection.</span>
            </h1>

            <p className="text-xl text-marble-dim max-w-2xl mx-auto leading-relaxed font-light mb-8">
              At GFive Mines & Minerals, we believe transparency is essential. Here
              is how we collect, use, and protect your personal information.
            </p>

            <div className="inline-block text-xs font-medium text-marble-faint border-b border-hairline pb-1">
              Last Updated: December 23, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID CONTENT --- */}
      <section className="py-20 bg-obsidian border-t border-hairline">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1. Introduction (Span 2) */}
            <PolicyCard
              className="md:col-span-2"
              icon={Shield}
              title="Our Commitment"
              delay={0.1}
            >
              <p className="text-marble-dim leading-relaxed">
                We respect your privacy and are committed to protecting it
                through our compliance with this policy. This policy describes
                the types of information we may collect from you or that you may
                provide when you visit the website <strong className="text-marble">GFive Mines & Minerals.com</strong>{" "}
                and our practices for collecting, using, maintaining,
                protecting, and disclosing that information.
              </p>
            </PolicyCard>

            {/* 2. Data Collection */}
            <PolicyCard icon={Database} title="What We Collect" delay={0.2}>
              <ul className="space-y-3 text-sm text-marble-dim">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-bronze rounded-full mt-2" />{" "}
                  Name & Contact Details
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-bronze rounded-full mt-2" />{" "}
                  Shipping & Billing Address
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-bronze rounded-full mt-2" />{" "}
                  Order History
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-bronze rounded-full mt-2" />{" "}
                  Device Information
                </li>
              </ul>
            </PolicyCard>

            {/* 3. Usage */}
            <PolicyCard icon={FileText} title="How We Use It" delay={0.3}>
              <p className="text-sm text-marble-dim leading-relaxed">
                We use your data to process orders, manage accounts, and improve
                our store. We may also send you promotional emails about new
                products or special offers if you have opted in.
              </p>
            </PolicyCard>

            {/* 4. Payment Security (Span 2) */}
            <PolicyCard
              className="md:col-span-2"
              icon={CreditCard}
              title="Payment Security"
              delay={0.4}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <p className="text-marble-dim leading-relaxed mb-4">
                    We do not store your credit card information on our servers.
                    All transactions are processed through secure payment
                    gateways (PostEx, Stripe, etc.) that adhere to the standards
                    set by PCI-DSS as managed by the PCI Security Standards
                    Council.
                  </p>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 bg-graphite-light rounded-md text-xs font-bold text-marble-dim">
                      SSL Encrypted
                    </span>
                    <span className="px-3 py-1 bg-graphite-light rounded-md text-xs font-bold text-marble-dim">
                      PCI Compliant
                    </span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-bronze/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-8 h-8 text-bronze" />
                </div>
              </div>
            </PolicyCard>

            {/* 5. Cookies */}
            <PolicyCard icon={Cookie} title="Cookies" delay={0.5}>
              <p className="text-sm text-marble-dim leading-relaxed mb-4">
                We use cookies to enhance your shopping experience, remember
                your cart, and analyze site traffic.
              </p>
              <a
                href="#"
                className="text-xs font-bold uppercase underline text-bronze hover:text-bronze-light"
              >
                Cookie Preferences
              </a>
            </PolicyCard>

            {/* 6. Third Party */}
            <PolicyCard icon={Share2} title="Third Parties" delay={0.6}>
              <p className="text-sm text-marble-dim leading-relaxed">
                We share data with trusted partners solely for operational
                purposes: couriers (PostEx) for delivery and payment processors
                for transactions. We never sell your data.
              </p>
            </PolicyCard>

            {/* 7. Your Rights */}
            <PolicyCard icon={Eye} title="Your Rights" delay={0.7}>
              <p className="text-sm text-marble-dim leading-relaxed">
                You have the right to access, correct, or delete your personal
                information at any time. Contact us to exercise these rights.
              </p>
            </PolicyCard>
          </div>
        </div>
      </section>

      {/* --- CONTACT FOR PRIVACY --- */}
      <section className="py-24 bg-graphite text-marble relative overflow-hidden grain">
        <div className="vein-glow" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-display text-3xl md:text-4xl font-light text-marble">
              Questions about Privacy?
            </h2>
            <p className="text-marble-dim font-light">
              If you have any questions about this Privacy Policy, please
              contact our Data Protection Officer.
            </p>

            <div className="flex justify-center pt-4">
              <a
                href="mailto:privacy@Gfivemines&minerals.com"
                className="group flex items-center gap-3 text-lg font-medium text-marble hover:text-bronze-light transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-bronze/10 flex items-center justify-center group-hover:bg-bronze group-hover:text-obsidian transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                privacy@Gfivemines&minerals.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Policy Card ---
function PolicyCard({ icon: Icon, title, children, className, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-graphite rounded-[2rem] p-8 border border-hairline hover:bg-graphite-light hover:shadow-xl hover:shadow-black/40 hover:border-bronze/40 transition-all duration-500 group ${className}`}
    >
      <div className="w-10 h-10 bg-graphite-light rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-5 h-5 text-bronze" />
      </div>

      <h3 className="text-xl font-medium text-marble mb-4">{title}</h3>

      <div className="text-marble-dim">{children}</div>
    </motion.div>
  );
}
