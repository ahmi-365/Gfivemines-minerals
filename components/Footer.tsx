"use client";

import {
  ArrowUp,
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const explore = [
    { name: "Marble & Stones", href: "/marble-stones" },
    { name: "Contact Us", href: "/contact" },
    { name: "Stone Dimensions", href: "/size-charts" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Shipping", href: "/shipping" },
    { name: "Return Policy", href: "/return-policy" },
  ];

  const offices = [
    { region: "China (Head Office)", city: "Shenzhen" },
    { region: "Hong Kong", city: "Kowloon" },
    { region: "United States", city: "Virginia" },
    { region: "United Arab Emirates", city: "Dubai" },
  ];

  return (
    <footer className="bg-obsidian text-marble relative overflow-hidden border-t border-hairline grain">
      <div className="vein-glow" />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- CTA BAND --- */}
        <div className="py-16 border-b border-hairline flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Start a project</span>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[0.98] mt-4">
              Let&apos;s source your{" "}
              <span className="italic text-vein">perfect stone.</span>
            </h2>
          </div>
          <Link href="/contact" className="group inline-flex flex-shrink-0">
            <span className="inline-flex items-center gap-3 bg-bronze text-obsidian px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-bronze-light transition-colors duration-300">
              Request a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid md:grid-cols-12 gap-10 lg:gap-8 py-16">
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex flex-col items-start gap-5">
              <Link href="/" className="flex items-center group w-fit">
                <Image
                  src="/images/gfivelogo.png"
                  alt="GFive Mines & Minerals"
                  height={100}
                  width={300}
                  className="h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* SMARTLife logo */}
              <div className="bg-white rounded-lg px-4 py-3 flex items-center w-fit">
                <Image
                  src="/images/smartlife.png"
                  alt="SMARTLife General Trading Co. LLC"
                  height={48}
                  width={160}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-marble-dim leading-relaxed max-w-sm text-sm font-light">
              Premium marble, granite, and mineral blocks sourced directly from
              quarries worldwide. Precision cutting and processing for buyers,
              retailers, and stone professionals.
            </p>

            <div className="flex gap-2.5 pt-2">
              <SocialIcon icon={Instagram} href="https://instagram.com" label="Instagram" />
              <SocialIcon icon={Facebook} href="https://facebook.com" label="Facebook" />
              <SocialIcon icon={Send} href="https://tiktok.com" label="TikTok" />
              <SocialIcon icon={Twitter} href="https://twitter.com" label="Twitter" />
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-6">Explore</h4>
            <ul className="space-y-3">
              {explore.map((link) => (
                <FooterLink key={link.name} href={link.href} label={link.name} />
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-6">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <FooterLink key={link.name} href={link.href} label={link.name} />
              ))}
            </ul>
          </div>

          {/* Reach / Offices */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h4 className="eyebrow mb-6">Reach Us</h4>
              <div className="space-y-3">
                <a
                  href="mailto:President.Gfive@hotmail.com"
                  className="flex items-center gap-3 text-sm text-marble-dim hover:text-bronze-light transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center group-hover:border-bronze transition-colors">
                    <Mail className="w-4 h-4 text-bronze-light" />
                  </span>
                  President.Gfive@hotmail.com
                </a>
                <a
                  href="tel:+8613760113545"
                  className="flex items-center gap-3 text-sm text-marble-dim hover:text-bronze-light transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center group-hover:border-bronze transition-colors">
                    <Phone className="w-4 h-4 text-bronze-light" />
                  </span>
                  +86 137 6011 3545 · +852 6060 2415
                </a>
              </div>
            </div>

            <div>
              <h4 className="eyebrow mb-4">Global Offices</h4>
              <div className="grid grid-cols-2 gap-3">
                {offices.map((o) => (
                  <div
                    key={o.region}
                    className="flex items-start gap-2 text-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-bronze mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-marble">{o.region}</p>
                      <p className="text-marble-faint">{o.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="py-8 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-marble-faint text-xs tracking-wide text-center md:text-left">
            © 2026 SMARTLIFE GENERAL TRADING CO LLC. ALL RIGHTS RESERVED
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold text-marble hover:text-bronze-light transition-colors px-5 py-2.5 rounded-full hover:bg-white/5"
          >
            Back to Top
            <div className="w-6 h-6 rounded-full border border-hairline-strong flex items-center justify-center group-hover:-translate-y-1 group-hover:bg-bronze group-hover:border-bronze group-hover:text-obsidian transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

// --- Sub Components ---

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm text-marble-dim hover:text-bronze-light transition-colors w-fit"
      >
        <span className="relative overflow-hidden">
          {label}
          <span className="absolute left-0 bottom-0 w-full h-px bg-bronze -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </span>
      </Link>
    </li>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative w-10 h-10 rounded-full border border-hairline-strong flex items-center justify-center text-marble overflow-hidden transition-all duration-300 hover:border-bronze"
    >
      <div className="absolute inset-0 bg-bronze translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <Icon className="w-4 h-4 relative z-10 group-hover:text-obsidian transition-colors duration-300" />
    </a>
  );
}
