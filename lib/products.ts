export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Carrara White Marble Slab",
    price: 4599.99,
    image: "/images/hero-products.jpg",
    category: "Marble Slabs",
    description: "Premium Italian Carrara marble with consistent veining for cutting and processing",
  },
  {
    id: "2",
    name: "Black Galaxy Granite Block",
    price: 3299.99,
    image: "/images/product-flat-lay.jpg",
    category: "Granite Blocks",
    description: "High-polish black granite with golden speckling for cutting and bulk processing",
  },
  {
    id: "3",
    name: "Statuario Marble Premium",
    price: 8999.99,
    image: "/images/luxury-collection.jpg",
    category: "Marble Slabs",
    description: "Luxury grade Statuario marble with bold veining for high-end cutting and finishing",
  },
  {
    id: "4",
    name: "Onyx Translucent Panel",
    price: 6799.99,
    image: "/images/pink-collection.jpg",
    category: "Specialty Minerals",
    description: "Backlit-ready onyx with natural amber tones for specialty stone cutting applications",
  },
  {
    id: "5",
    name: "Emperador Brown Marble",
    price: 5299.99,
    image: "/images/modern-skincare.jpg",
    category: "Marble Slabs",
    description: "Rich brown marble with warm tones for cutting and processing",
  },
  {
    id: "6",
    name: "Absolute Black Granite",
    price: 3899.99,
    image: "/images/hero-products.jpg",
    category: "Granite Blocks",
    description: "Jet black granite with consistent tone for stone cutting and bulk orders",
  },
  {
    id: "7",
    name: "Calacatta Gold Marble",
    price: 7499.99,
    image: "/images/product-flat-lay.jpg",
    category: "Marble Slabs",
    description: "Luxurious Calacatta with gold and gray veining for premium cutting applications",
  },
  {
    id: "8",
    name: "Rajasthan Sandstone Block",
    price: 2899.99,
    image: "/images/luxury-collection.jpg",
    category: "Specialty Minerals",
    description: "Warm honey-toned sandstone with natural texture for stone cutting and finishing",
  },
]
