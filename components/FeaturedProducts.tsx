"use client";

import { useCart } from "@/lib/cart-context";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Interfaces ---
interface ProductImage {
  id: number;
  product_id: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  is_featured: number;
  image: string;
  category_id: number;
  brand_id: number;
  sale?: number;
  note?: string;
  selling_price: number;
  category: { id: number; name: string };
  brand: { id: number; name: string };
  unit: { id: number; name: string } | null;
  images: ProductImage[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasFeaturedProducts, setHasFeaturedProducts] = useState(false);

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetch Data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://backend.majesticsofts.com/api/all-products"
        );
        const data = await response.json();
        if (data.status === "success") {
          // Filter ONLY Featured Items
          const featured = data.data.filter(
            (p: Product) => p.is_featured === 1
          );
          setProducts(featured);
          setHasFeaturedProducts(featured.length > 0);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Derived Data
  const categories = ["All", ...new Set(products.map((p) => p.category.name))];

  // Helper: Price Calculation
  const getPrice = (p: Product) => {
    if (!p.sale || p.sale === 0) return p.selling_price;
    return p.selling_price - (p.selling_price * p.sale) / 100;
  };

  const getImageUrl = (img: string) =>
    `https://backend.majesticsofts.com/public/assets/images/product/${img}`;

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    return selectedCategory === "All" || p.category.name === selectedCategory;
  });

  // Modal Actions
  const openModal = (p: Product) => {
    setSelectedProduct(p);
    setSelectedImage(getImageUrl(p.image));
    setQuantity(1);
  };
  const closeModal = () => setSelectedProduct(null);

  // Cart Actions
  const handleAddToCart = (
    p: Product,
    qty: number = 1,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    addToCart({
      id: p.id,
      name: p.name,
      price: getPrice(p),
      quantity: qty,
      image: getImageUrl(p.image),
      category: p.category.name,
      brand: p.brand.name,
      unit: p.unit?.name || "N/A",
    });
    setShowSuccess(true);
    if (selectedProduct) closeModal();
    setTimeout(() => setShowSuccess(false), 2500);
  };

  if (!loading && !hasFeaturedProducts) return null;

  return (
    <section className="relative bg-obsidian text-marble py-24 md:py-32 overflow-hidden grain">
      <div className="vein-glow" />

      {/* --- SECTION HEADER --- */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-bronze" />
            <span className="eyebrow">Editor&apos;s Choice</span>
          </div>
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.95] mb-6">
            Featured <span className="italic text-vein">marble &amp; stone.</span>
          </h2>
          <p className="text-marble-dim text-lg max-w-xl leading-relaxed">
            Handpicked natural-stone slabs and mineral blocks that define
            architectural excellence. Explore curated lots for your next project.
          </p>
        </motion.div>

        {/* --- CATEGORY FILTER RAIL --- */}
        <div className="mb-14">
          <div className="inline-flex max-w-full overflow-x-auto no-scrollbar border border-hairline rounded-full p-1.5 bg-graphite/60 backdrop-blur">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                  ? "bg-bronze text-obsidian shadow-md"
                  : "text-marble-dim hover:text-marble hover:bg-white/5"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-hairline border-t-bronze rounded-full animate-spin mb-4" />
            <p className="text-marble-faint text-sm">Loading featured items...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-graphite/40 rounded-3xl border border-dashed border-hairline-strong">
            <div className="w-16 h-16 bg-graphite-light rounded-full flex items-center justify-center mx-auto mb-4 border border-hairline">
              <ShoppingBag className="w-6 h-6 text-bronze" />
            </div>
            <h3 className="text-lg font-medium text-marble">No items found</h3>
            <p className="text-marble-dim mt-1">
              Try selecting a different category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onClick={() => openModal(product)}
                  getImageUrl={getImageUrl}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- CTA --- */}
        <div className="text-center mt-20">
          <Link href="/marble-stones" className="group inline-flex">
            <span className="inline-flex items-center gap-3 border border-bronze text-bronze-light px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-bronze hover:text-obsidian transition-colors duration-300">
              Browse Full Inventory
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-graphite w-full max-w-5xl rounded-[2rem] shadow-2xl shadow-black/60 border border-hairline-strong overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-obsidian p-8 flex flex-col gap-4 overflow-y-auto">
                <div className="aspect-square rounded-2xl overflow-hidden bg-graphite-light shadow-sm relative border border-hairline">
                  <img
                    src={selectedImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.sale && selectedProduct.sale > 0 && (
                    <span className="absolute top-4 left-4 bg-bronze text-obsidian text-xs font-bold px-3 py-1 rounded-full">
                      -{selectedProduct.sale}%
                    </span>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    selectedProduct.image,
                    ...(selectedProduct.images?.map((i) => i.image) || []),
                  ].map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(getImageUrl(img))}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${selectedImage === getImageUrl(img)
                        ? "border-bronze"
                        : "border-hairline"
                        }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="self-end p-2 hover:bg-white/5 rounded-full mb-4 text-marble-dim hover:text-marble"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-auto">
                  <span className="eyebrow">{selectedProduct.category.name}</span>
                  <h2 className="font-display text-4xl font-light text-marble mt-3 mb-5 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="rule-bronze mb-6" />
                  <p className="text-marble-dim leading-relaxed text-sm">
                    {selectedProduct.note ||
                      "Quarry-direct natural stone, selected for consistent veining and structural integrity. Available for cutting, finishing, and bulk supply."}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-10 inline-flex items-center justify-center gap-2 bg-bronze text-obsidian h-12 px-6 rounded-full font-bold text-sm uppercase tracking-[0.12em] hover:bg-bronze-light transition-colors"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-graphite border border-hairline-strong text-marble px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
              <div className="bg-bronze rounded-full p-0.5">
                <Check className="w-3 h-3 text-obsidian" />
              </div>
              <span className="text-sm font-medium">Added to your selection</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- SUB COMPONENTS ---

const ProductCard = ({ product, index, onClick, getImageUrl }: any) => {
  const [currentImage, setCurrentImage] = useState(getImageUrl(product.image));
  const [isHovered, setIsHovered] = useState(false);

  // Combine main image with additional images
  const allImages = [
    getImageUrl(product.image),
    ...(product.images?.map((img: any) => getImageUrl(img.image)) || []),
  ];

  // Logic to change image on hover
  useEffect(() => {
    if (isHovered && allImages.length > 1) {
      const randomIndex =
        Math.floor(Math.random() * (allImages.length - 1)) + 1;
      setCurrentImage(allImages[randomIndex]);
    } else {
      setCurrentImage(allImages[0]);
    }
  }, [isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-graphite isolate border border-hairline group-hover:border-bronze/50 transition-colors duration-500 shadow-lg shadow-black/30">
        {/* Animated Image */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={product.name}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </AnimatePresence>

        {/* Permanent bottom gradient for caption legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent pointer-events-none" />
        {/* Extra darken on hover */}
        <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/25 transition-colors duration-500 pointer-events-none" />

        {/* Serif index watermark */}
        <span className="absolute top-2 left-4 font-display text-4xl leading-none text-marble/20 group-hover:text-bronze/40 transition-colors duration-500 select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Sale Badge */}
        {product.sale && product.sale > 0 && (
          <span className="absolute top-5 right-5 bg-bronze text-obsidian px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full z-10">
            -{product.sale}%
          </span>
        )}

        {/* Bronze corner accent on hover */}
        <span className="absolute top-4 right-4 w-9 h-9 rounded-tr-xl border-t border-r border-bronze/0 group-hover:border-bronze/70 transition-colors duration-500 pointer-events-none" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-10">
          <p className="eyebrow mb-1.5">{product.category.name}</p>
          <h3 className="font-display text-lg font-light text-marble leading-tight">
            {product.name}
          </h3>

          {/* Hover CTA reveal */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mt-0 group-hover:mt-3">
            <div className="overflow-hidden">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-bronze-light">
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
