import { ProductCarousel } from "@/components/products/product-carousel";
import type { ProductDetailResponse } from "@/types/product";
import { PurchaseBox } from "@/components/products/purchase-box";
import { Truck, ShieldCheck, Clock, Factory } from "lucide-react";

async function getProduct(id: string): Promise<ProductDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL || ""}/api/products/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch product.");
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* LEFT: IMAGE CAROUSEL */}
        <div>
          <ProductCarousel images={product.images} />
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div>
          {/* NAME & CATEGORY */}
          <header className="mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="mt-1 text-sm text-gray-500">
              {product.category} → {product.subcategory}
              {product.microcategory && ` → ${product.microcategory}`}
            </div>
          </header>

          {/* SHORT DESCRIPTION */}
          {product.shortDescription && (
            <p className="text-gray-700 mb-4">{product.shortDescription}</p>
          )}

          {/* PRICE & SIZE SELECTOR */}
          <PurchaseBox product={product} />

          {/* KEY INFO BOX */}
          <section className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
            {product.manufacturer && (
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-gray-500" />
                <span>By {product.manufacturer}</span>
              </div>
            )}
            {product.countryOfOrigin && (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-500" />
                <span>Made in {product.countryOfOrigin}</span>
              </div>
            )}
            {product.expiryDate && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Expiry: {product.expiryDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>Free Delivery Available on purchase above 500</span>
            </div>
          </section>

          {/* FEATURES */}
          {product.features && product.features?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {/* BENEFITS */}
          {product.benefits && product.benefits?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Benefits</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}

          {/* HOW TO USE */}
          {product.howToUse && product.howToUse && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold mb-2">How to Use</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {product.howToUse}
              </p>
            </section>
          )}

          {/* INGREDIENTS */}
          {product.keyIngredients && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Key Ingredients</h2>
              <p className="list-disc list-inside text-gray-700 space-y-1">
                {product.keyIngredients}
              </p>
            </section>
          )}

          {/* FAQ SECTION */}
          {product.faqs && product.faqs?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold mb-3">FAQs</h2>
              <div className="divide-y divide-gray-200 border rounded-lg">
                {product.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <summary className="font-medium">{faq.question}</summary>
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* LONG DESCRIPTION / EXTRA DETAILS */}
      {product.longDescription && (
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Product Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.longDescription}
          </p>
        </section>
      )}
    </main>
  );
}
