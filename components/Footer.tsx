"use client";

import {
  ArrowUp,
  Facebook,
  Heart,
  Instagram,
  Send,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Marble & Stone Dimensions", href: "/size-charts" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden border-t border-gray-900">
      {/* Background Watermark (Subtle Gray) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-0">
        <h1 className="text-[20vw] font-bold text-center leading-none tracking-tighter text-white select-none">
          Gfivemines&minerals
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Grid */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          {/* Brand Column (Wider) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex flex-col md:flex-row items-center gap-4 group">
              <Image
                src="/images/gfivelogo.png"
                alt="GFive Mines & Minerals"
                height={120}
                width={380}
                className="h-32 md:h-40 w-auto object-contain"
              />
              <Image
                src="/images/smartlife.png"
                alt="SMARTLife"
                height={70}
                width={200}
                className="h-16 md:h-24 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-500 leading-relaxed max-w-sm text-base font-light">
              Premium marble, granite, and mineral blocks sourced directly from
              quarries worldwide. Precision cutting and processing for buyers,
              retailers, and stone professionals.
            </p>

            <div className="flex gap-2.5 pt-2">
              <SocialIcon
                icon={Instagram}
                href="https://instagram.com"
                label="Instagram"
              />
              <SocialIcon
                icon={Facebook}
                href="https://facebook.com"
                label="Facebook"
              />
              <SocialIcon
                icon={Send}
                href="https://tiktok.com"
                label="TikTok"
              />
              <SocialIcon
                icon={Twitter}
                href="https://twitter.com"
                label="Twitter"
              />
            </div>
          </div>

          {/* Spacer Column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links Columns (Rebalanced) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-500">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  label={link.name}
                />
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-500">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  label={link.name}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2026 SMARTLIFE GENERAL TRADING CO LLC. ALL RIGHTS RESERVED
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold text-white hover:text-gray-300 transition-colors px-5 py-2.5 rounded-full hover:bg-gray-900 md:mr-24"
          >
            Back to Top
            <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center group-hover:-translate-y-1 group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-300">
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
        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit"
      >
        <span className="relative overflow-hidden">
          {label}
          <span className="absolute left-0 bottom-0 w-full h-px bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
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
      className="group relative w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white overflow-hidden transition-all duration-300 hover:border-white"
    >
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <Icon className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-300" />
    </a>
  );
}
