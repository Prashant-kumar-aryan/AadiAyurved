"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import type { ProductListResponse } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { ProductsFilters } from "@/components/products/filters";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";

export default function ProductsPage() {
  const router = useRouter();
  const { addItem } = useCart(); // ✅ FIX: useCart destructure
  const [productType, setProductType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 12;

  // ✅ Build query string
  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (productType) params.set("productType", productType);
    if (search) params.set("search", search);
    params.set("page", String(page));
    params.set("limit", String(limit));
    return `/api/products?${params.toString()}`;
  }, [productType, search, page]);

  // ✅ Fetch products
  const { data, error, isLoading } = useSWR<ProductListResponse>(
    query,
    fetcher
  );

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <main className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <header className="mb-4 md:mb-6">
        <h1 className="text-pretty text-2xl md:text-3xl font-bold">Products</h1>
        <p className="opacity-80">Browse all Ayurvedic products and kits.</p>
      </header>

      {/* ✅ Filters */}
      <ProductsFilters
        productType={productType}
        onProductTypeChange={(v) => {
          setProductType(v);
          setPage(1);
        }}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />

      {/* ✅ Products Grid */}
      <section className="mt-6 min-h-[200px]">
        {isLoading && <div className="opacity-80">Loading products…</div>}
        {error && (
          <div className="text-destructive">
            Failed to load products: {error.message}
          </div>
        )}
        {data && data.products.length === 0 && (
          <div className="opacity-80">No products found.</div>
        )}

        {data && data.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.products.map((p) => (
              <ProductCard
                key={p._id}
                image={p.image}
                type={p.type}
                category={p.category}
                price={p.price}
                name={p.name}
                size={p.size}
                onView={() => router.push(`/products/${p._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ✅ Pagination */}
      <nav
        className="mt-8 flex items-center justify-center gap-2"
        role="navigation"
        aria-label="Pagination"
      >
        <button
          className="px-3 py-2 rounded-md border disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="px-3 py-2 rounded-md bg-muted">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-2 rounded-md border disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </nav>
    </main>
  );
}
