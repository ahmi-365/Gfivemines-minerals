// components/ProductCategories.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCategories() {
  const collections = [
    {
      title: "Marble Slabs",
      desc: "Signature veining for lobbies, counters, and feature walls",
      image: "/images/luxury-collection.jpg",
      color: "from-teal-500",
      href: "/shop",
      available: true,
    },
    {
      title: "Granite & Mineral Blocks",
      desc: "Load-bearing strength for exterior cladding and heavy-duty floors",
      image: "/images/modern-skincare.jpg",
      color: "from-amber-500",
      href: "/shop",
      available: true,
    },
  ];

  return (
    <section id="shop" className="py-20 bg-white relative overflow-hidden" data-scroll-reveal>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">Featured Natural Stone Collections</h2>
          <p className="section-subtitle">Direct from quarry: Premium marble slabs and stone blocks for cutting and processing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {collections.map((collection, index) => (
            <div key={index} className="relative">
              {collection.available ? (
                <Link href={collection.href}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transform transition-all duration-500 hover:scale-105">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${collection.color}/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-2xl font-medium mb-2">{collection.title}</h3>
                      <p className="text-sm text-white/90">{collection.desc}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] transform transition-all duration-500 hover:scale-105">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gray-600/30"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${collection.color}/40 to-transparent`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-2xl font-medium mb-2">{collection.title}</h3>
                    <p className="text-sm text-white/90 mb-2">{collection.desc}</p>
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button className="btn-primary group">
              VIEW ALL PRODUCTS
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}