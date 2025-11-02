"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import type { ProductListResponse } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { ProductsFilters } from "@/components/products/filters";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();

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
      <header className="mb-4 md:mb-6 text-center">
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

      {/* ✅ Products Section */}
      <section className="mt-8 min-h-[250px] flex flex-wrap justify-center gap-6">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center w-full h-40">
            <LoaderCircle className="w-10 h-10 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-destructive text-center w-full">
            Failed to load products: {error.message}
          </div>
        )}

        {/* No products */}
        {data && data.products.length === 0 && (
          <div className="opacity-80 text-center w-full">
            No products found.
          </div>
        )}

        {/* Product Cards */}
        {data &&
          data.products.length > 0 &&
          data.products.map((p) => (
            <div key={p._id} className="flex justify-center">
              <ProductCard
                image={p.image}
                type={p.type}
                category={p.category}
                price={p.price}
                name={p.name}
                size={p.size}
                onView={() => router.push(`/products/${p._id}`)}
              />
            </div>
          ))}
      </section>

      {/* ✅ Pagination */}
      <nav
        className="mt-10 flex items-center justify-center gap-2"
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
