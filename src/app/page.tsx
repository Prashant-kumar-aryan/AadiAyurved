"use client";

import { useEffect, useState } from "react";
import { AutoCarousel } from "@/components/Carousel";
import { ProductCard } from "@/components/products/product-card";
import {
  Leaf,
  MessageCircle,
  Instagram,
  Facebook,
  ShoppingCart,
  Truck,
  Phone,
} from "lucide-react";
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
      <section className="w-full bg-gradient-to-b from-emerald-50 to-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/ayur-bg-texture.png')] bg-cover"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-emerald-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
              Whether you have questions or want to explore our Ayurvedic
              products, we're here to help
            </p>
          </motion.div>

          {/* Two-column layout for different contact purposes */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* General Inquiries */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-emerald-900">
                  General Inquiries
                </h3>
              </div>
              <p className="text-emerald-700 mb-8 leading-relaxed">
                Have questions about our products or looking for personalized
                Ayurvedic guidance? Our wellness experts are ready to assist you
                with ancient wisdom.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/7488931899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-emerald-50">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-emerald-900">
                    WhatsApp
                  </span>
                  <span className="ml-auto text-emerald-600 text-sm">
                    +91 74889 31899
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aadiayurved?igsh=dzh3MGVkYnV6MDl5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-pink-50">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="font-semibold text-emerald-900">
                    Instagram
                  </span>
                  <span className="ml-auto text-pink-600 text-sm">
                    Follow Us
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/177cgLV8F4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-50">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-emerald-900">
                    Facebook
                  </span>
                  <span className="ml-auto text-blue-600 text-sm">Connect</span>
                </a>
              </div>
            </motion.div>

            {/* Purchasing & Orders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-xl text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold">
                  Orders & Purchasing
                </h3>
              </div>
              <p className="text-emerald-50 mb-8 leading-relaxed">
                Ready to experience premium Ayurvedic products? Contact our
                sales team for orders, bulk purchases, and delivery information.
              </p>

              <div className="space-y-4">
                {/* Orders WhatsApp */}
                <a
                  href="https://wa.me/7488931899?text=Hi%20I%20am%20interested%20in%20purchasing%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/15 hover:bg-white/25 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Place Order</span>
                  <span className="ml-auto text-emerald-100 text-sm">
                    WhatsApp
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+91 74889 31899"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/15 hover:bg-white/25 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Call Us</span>
                  <span className="ml-auto text-emerald-100 text-sm">
                    +91 74889 31899
                  </span>
                </a>

                {/* Delivery Info */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/15">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold block">
                      Delivery Available
                    </span>
                    <span className="text-emerald-100 text-sm">
                      Nationwide shipping
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-6 bg-white text-emerald-700 font-bold py-3 px-6 rounded-lg hover:bg-emerald-50 transition-colors">
                Contact Us +91 74889 31899
              </button>
            </motion.div>
          </div>

          {/* Additional info section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-emerald-50 rounded-xl p-8 text-center border border-emerald-200"
          >
            <p className="text-emerald-900 font-semibold mb-2">
              🌿 Timings: Monday - Saturday, 9 AM - 6 PM IST
            </p>
            <p className="text-emerald-700">
              We typically respond within 2 hours during business hours. Thank
              you for choosing authentic Ayurveda!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
