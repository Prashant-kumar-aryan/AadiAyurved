import { ProductCarousel } from "@/components/products/product-carousel";
import type { ProductDetailResponse } from "@/types/product";
import { PurchaseBox } from "@/components/products/purchase-box";

async function getProduct(id: string): Promise<ProductDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL || ""}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product.");
  }
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <ProductCarousel images={product.images} />
        </div>

        <div>
          <header className="mb-4">
            <h1 className="text-pretty text-2xl md:text-3xl font-bold">
              {product.name}
            </h1>
            <div className="mt-1 opacity-80 text-sm">
              <span className="capitalize">{product.productType}</span> •{" "}
              <span>{product.category}</span>
            </div>
          </header>

          {product.shortDescription && (
            <p className="opacity-90">{product.shortDescription}</p>
          )}

          <section className="mt-6 space-y-4">
            <PurchaseBox product={product} />
          </section>

          {product.longDescription && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="opacity-90">{product.longDescription}</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
