"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Loader2,
  Menu,
  Search,
  Twitter,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// --- INTERFACES ---
interface Product {
  id: number;
  name: string;
  image: string;
  category_id: number;
  brand_id: number;
  selling_price: number;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  unit: {
    id: number;
    name: string;
  };
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Search Logic States
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { scrollY } = useScroll();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // --- SOCIAL LINKS DATA ---
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ];

  // --- 1. FETCH PRODUCTS ON MOUNT ---
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://backend.majesticsofts.com/api/all-products"
        );
        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredProducts = query.trim()
    ? products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
    : [];

  const getImageUrl = (imageName: string) => {
    return `https://backend.majesticsofts.com/public/assets/images/product/${imageName}`;
  };

  // --- SMART SCROLL LOGIC ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Handle "Enter" key redirect
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        setSearchOpen(false);
        router.push(`/marble-stones?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Marble & Stones", href: "/marble-stones" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 bg-obsidian/85 backdrop-blur-xl border-b transition-all duration-300 ${searchOpen
          ? "border-hairline-strong"
          : "border-hairline"
          }`}
      >
        {/* --- SLIM UTILITY BAR (desktop) --- */}
        <div className="hidden md:block border-b border-hairline/60">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-9 text-[11px] tracking-wide">
              <p className="text-marble-faint">
                Quarry-direct natural stone ·{" "}
                <span className="text-marble-dim">
                  China · Hong Kong · USA · UAE
                </span>
              </p>
              <div className="flex items-center gap-5 text-marble-dim">
                <a
                  href="mailto:President.Gfive@hotmail.com"
                  className="hover:text-bronze-light transition-colors"
                >
                  President.Gfive@hotmail.com
                </a>
                <span className="h-3 w-px bg-hairline-strong" />
                <a
                  href="tel:+8613760113545"
                  className="hover:text-bronze-light transition-colors"
                >
                  +86 137 6011 3545
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bronze hairline under the bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/40 to-transparent" />

        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between relative">
            {/* --- LEFT: LOGO --- */}
            <Link
              href="/"
              className={`flex items-center gap-2 group relative z-50 transition-opacity duration-300 ${searchOpen
                ? "opacity-0 pointer-events-none md:opacity-100"
                : "opacity-100"
                }`}
            >
              <Image
                src="/images/gfivelogo.png"
                alt="Gfivemines & Minerals"
                height={80}
                width={300}
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* --- CENTER: DESKTOP MENU --- */}
            <div
              className={`hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${searchOpen
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100"
                }`}
            >
              {navLinks.map((link) => (
                <InteractiveLink
                  key={link.name}
                  href={link.href}
                  text={link.name}
                />
              ))}
            </div>

            {/* --- RIGHT: ICONS --- */}
            <div className="flex items-center gap-3 relative z-50">
              {/* EXPANDABLE SEARCH BAR CONTAINER */}
              <div
                className={`flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${searchOpen ? "w-[calc(100vw-48px)] absolute right-0" : "w-10"
                  }`}
              >
                <div className="w-full relative">
                  <motion.div
                    layout
                    className={`relative flex items-center h-10 z-50 ${searchOpen
                      ? "w-full bg-graphite border border-hairline-strong rounded-full px-4"
                      : "w-10 bg-transparent"
                      }`}
                  >
                    <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors z-10 ${searchOpen
                        ? "text-bronze-light"
                        : "hover:bg-white/5 text-marble-dim hover:text-marble"
                        }`}
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search marble, granite, minerals..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`bg-transparent border-none outline-none text-sm text-marble placeholder:text-marble-faint h-full transition-all duration-300 ${searchOpen ? "flex-1 ml-2 opacity-100" : "w-0 opacity-0"
                        }`}
                    />

                    {searchOpen && (
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery(""); // Clear query on close
                        }}
                        className="p-2 text-marble-faint hover:text-bronze-light transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>

                  {/* --- LIVE SEARCH DROPDOWN RESULTS --- */}
                  <AnimatePresence>
                    {searchOpen && query.trim() && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-12 left-0 right-0 bg-graphite border border-hairline-strong rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-40"
                      >
                        {loading ? (
                          <div className="p-6 text-center text-marble-faint">
                            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-bronze" />
                            <span className="text-xs">Searching...</span>
                          </div>
                        ) : filteredProducts.length > 0 ? (
                          <div className="divide-y divide-hairline">
                            {filteredProducts.map((product) => (
                              <Link
                                key={product.id}
                                href={`/marble-stones?search=${encodeURIComponent(
                                  product.name
                                )}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setQuery("");
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group"
                              >
                                <div className="w-10 h-12 bg-graphite-light rounded-md overflow-hidden flex-shrink-0 relative border border-hairline">
                                  <Image
                                    src={getImageUrl(product.image)}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-marble truncate group-hover:text-bronze-light transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-marble-faint uppercase tracking-wide">
                                    {product.category.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={`/marble-stones?search=${encodeURIComponent(query)}`}
                              onClick={() => setSearchOpen(false)}
                              className="block p-3 text-center text-xs font-bold uppercase tracking-widest text-bronze-light hover:text-marble hover:bg-white/5 transition-colors"
                            >
                              View all results
                            </Link>
                          </div>
                        ) : (
                          <div className="p-6 text-center text-marble-faint text-sm">
                            No products found.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ICONS (Hidden on Search) */}
              <div
                className={`flex items-center gap-3 transition-all duration-300 ${searchOpen
                  ? "opacity-0 translate-x-10 pointer-events-none"
                  : "opacity-100"
                  }`}
              >
                {/* Desktop CTA */}
                <Link
                  href="/contact"
                  className="hidden md:inline-flex items-center gap-2 bg-bronze text-obsidian px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-bronze-light transition-colors"
                >
                  Request a Quote
                </Link>

                <div className="md:hidden">
                  <MagneticButton>
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="p-2.5 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <Menu className="w-6 h-6 text-marble" />
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-obsidian text-marble flex flex-col p-8 md:hidden grain overflow-hidden"
          >
            <div className="vein-glow" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-16">
                <Image
                  src="/images/gfivelogo.png"
                  alt="Gfivemines & Minerals"
                  height={80}
                  width={300}
                  className="h-20 w-auto object-contain"
                  priority
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-white/5 border border-hairline rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-4xl font-display font-light tracking-tight hover:pl-4 hover:text-bronze-light transition-all duration-300 group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-6 h-6 text-bronze opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-bronze text-obsidian w-full py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-bronze-light transition-colors"
                >
                  Request a Quote
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <div className="mt-auto pt-10">
                <p className="eyebrow mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 border border-hairline rounded-full flex items-center justify-center text-marble-dim hover:bg-bronze hover:text-obsidian hover:border-bronze transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENT: INTERACTIVE LINK ---
function InteractiveLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="font-display italic font-medium text-2xl leading-none text-marble hover:text-bronze-light transition-colors duration-300"
    >
      {text}
    </Link>
  );
}

// --- SUB-COMPONENT: MAGNETIC BUTTON ---
function MagneticButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
