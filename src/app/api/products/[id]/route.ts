import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import Product from "@/models/Product"

// 🧮 Utility function for "10% OFF" display
function computeTenPercentOff(price: number) {
  const percentOff = 10
  const original = Math.round(price * (1 + percentOff / 100))
  const sale = price
  return { original, sale, percentOff }
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const { id } = params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      )
    }

    const doc = await Product.findById(id);
    
    if (!doc) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      )
    }

    // 🖼️ Combine hero + product images
    const images: string[] = [
      ...(doc.heroImageUrl ? [doc.heroImageUrl] : []),
      ...(Array.isArray(doc.productImageUrls) ? doc.productImageUrls : []),
    ]

    // 💰 Handle size-based prices (for "product" type)
    const sizePrices =
      Array.isArray(doc.sizePrices) && doc.sizePrices.length > 0
        ? doc.sizePrices.map((sp: any) => {
            const price = typeof sp.price === "number" ? sp.price : 0
            return {
              size: sp.size,
              quantity: sp.quantity,
              price,
              display: computeTenPercentOff(price),
            }
          })
        : undefined

    // 💸 Handle kit price (for "kit" type)
    let kitPrice:
      | {
          price: number
          display: { original: number; sale: number; percentOff: number }
        }
      | undefined = undefined

    if (doc.productType === "kit") {
      const price = typeof doc.price === "number" ? doc.price : 0
      kitPrice = { price, display: computeTenPercentOff(price) }
    }

    // 🧾 Prepare final response
    const response = {
      _id: String(doc._id),
      name: doc.productName,
      shortDescription: doc.shortDescription,
      longDescription: doc.longDescription,
      category: doc.category,
      subcategory: doc.subcategory,
      microcategory: doc.microcategory,
      productType: doc.productType,
      images,
      sizePrices,
      kitPrice,
      heroImageUrl: doc.heroImageUrl,
      productImageUrls: Array.isArray(doc.productImageUrls)
        ? doc.productImageUrls
        : [],
      features: doc.features,
      benefits: doc.benefits,
      manufacturer: doc.manufacturer,
      countryOfOrigin: doc.countryOfOrigin,
      expiryDate: doc.expiryDate,
      howToUse: doc.howToUse,
      keyIngredients: doc.keyIngredients,
      faqs: doc.faqs,
      // optional raw field for debugging
      raw: process.env.NODE_ENV === "development" ? doc : undefined,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (err: any) {
    console.error("[GET /api/products/:id] Error:", err?.message || err)
    return NextResponse.json(
      { error: "Failed to fetch product details." },
      { status: 500 }
    )
  }
}
