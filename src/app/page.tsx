"use client";

import { useEffect, useState } from "react";
import { AutoCarousel } from "@/components/Carousel";
import { ProductCard } from "@/components/products/product-card";
import { Facebook, Instagram, MessageCircle, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  image?: string;
  type: "product" | "kit" | string;
  category?: string;
  price: number;
  size?: string;
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products/featured");
        const data = await res.json();
        if (res.ok) setProducts(data.products);
      } catch (err) {
        console.error("Error loading featured products:", err);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 via-emerald-50 to-white min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Hero Carousel */}
      <AutoCarousel />

      {/* Featured Products */}
      <section className="max-w-7xl w-full px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            <Leaf className="text-emerald-600 w-6 h-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-800">
              Featured Ayurvedic Products
            </h2>
            <Leaf className="text-emerald-600 w-6 h-6 rotate-180" />
          </div>
          <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
            Curated with care from ancient Ayurvedic wisdom — discover
            nature-powered remedies and daily wellness essentials trusted by
            thousands.
          </p>
        </motion.div>

        {/* Product List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {products.length > 0 ? (
            products.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard
                  image={p.image || "/placeholder.svg"}
                  type={p.type as "product" | "kit"}
                  category={p.category || "General"}
                  size={p.size || ""}
                  price={p.price}
                  name={p.name}
                  onView={() => router.push(`/product/${p._id}`)}
                />
              </motion.div>
            ))
          ) : (
            <div className="w-full flex justify-center py-10">
              <Loader />
            </div>
          )}
        </motion.div>

        {/* Soft Decorative Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/leaf-pattern.svg')] bg-repeat"></div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full bg-gradient-to-r from-emerald-700 to-green-600 py-20 mt-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/ayur-bg-texture.png')] bg-cover"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto text-center text-white px-6"
        >
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Connect With Our Ayurveda Experts 💬
          </h3>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Have questions, or looking for personalized Ayurvedic suggestions?
            Our team is here to guide you with love and ancient wisdom.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/7250412245"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-emerald-700 px-8 py-3 rounded-full shadow-xl hover:bg-emerald-100 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold tracking-wide">WhatsApp Us</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-pink-600 px-8 py-3 rounded-full shadow-xl hover:bg-pink-100 transition-all"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-semibold tracking-wide">
                Follow on Instagram
              </span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-blue-600 px-8 py-3 rounded-full shadow-xl hover:bg-blue-100 transition-all"
            >
              <Facebook className="w-6 h-6" />
              <span className="font-semibold tracking-wide">
                Join on Facebook
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
