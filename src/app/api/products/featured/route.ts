import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";
import { resolveListPrice } from "@/lib/pricing";

interface SizePrice {
  size: string;
  quantity: number;
  price: number;
}

interface ProductDoc {
  _id: string;
  productName: string;
  productType: "product" | "kit" | string;
  category?: string;
  price?: number;
  sizePrices?: SizePrice[];
  heroImageUrl?: string;
  createdAt?: Date;
}

export async function GET() {
  try {
    await connectDB();

    // ✅ Only fetch featured products
    const featuredProducts = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .lean<ProductDoc[]>();

    const products = featuredProducts.map((p) => {
      const priceResolved = resolveListPrice({
        productType: p.productType,
        price: p.price,
        sizePrices: p.sizePrices,
      });

      return {
        _id: String(p._id),
        image: p.heroImageUrl,
        type: p.productType,
        price: priceResolved.price,
        size: priceResolved.size,
        category: p.category,
        name: p.productName,
      };
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/products/featured] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch featured products." },
      { status: 500 }
    );
  }
}
