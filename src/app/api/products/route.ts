import { NextResponse } from "next/server"
import connectDB from "@/lib/connectDB"
import Product from "@/models/Product"
import { resolveListPrice } from "@/lib/pricing"

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url)
    const productTypeParam = (searchParams.get("productType") || "all").toLowerCase()
    const search = (searchParams.get("search") || "").trim()
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.max(1, Math.min(50, Number.parseInt(searchParams.get("limit") || "10", 10)))

    const query: any = {}
    if (productTypeParam === "product" || productTypeParam === "kit") {
      query.productType = productTypeParam
    }
    if (search) {
      query.productName = { $regex: search, $options: "i" }
    }

    const skip = (page - 1) * limit

    const [total, docs] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ])

    const products = docs.map((p: any) => {
      const price = resolveListPrice({
        productType: p.productType,
        price: p.price,
        sizePrices: p.sizePrices,
      })

      return {
        _id: String(p._id),
        image: p.heroImageUrl,
        type: p.productType,
        price,
        category: p.category,
        name: p.productName,
      }
    })

    return NextResponse.json({ total, page, limit, products }, { status: 200 })
  } catch (err: any) {
    console.error("[GET /api/products] Error:", err?.message || err)
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 })
  }
}
