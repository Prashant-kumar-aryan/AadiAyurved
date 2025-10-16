export type DiscountDisplay = {
  original: number // strikethrough MRP
  sale: number // actual/current price
  percentOff: number // e.g., 10
}

/**
 * Compute a 10% OFF display given a sale price.
 * To keep the math honest to "10% OFF", we set original = round(sale * 1.1).
 */
export function computeTenPercentOff(salePrice: number): DiscountDisplay {
  const sale = Math.max(0, Math.round(salePrice))
  const original = Math.max(sale + 1, Math.round(salePrice * 1.1))
  return { original, sale, percentOff: 10 }
}

/**
 * Determine the list price for a product item based on type and available fields.
 * - 'kit': use 'price' as kit price
 * - 'product': prefer sizePrices[0].price, fallback to 'price'
 */
export function resolveListPrice(input: {
  productType?: string
  price?: number | null
  sizePrices?: Array<{ price?: number | null }> | null
}) {
  const type = input.productType
  if (type === "kit") {
    return input.price ?? 0
  }
  // product
  const firstSizePrice = input.sizePrices && input.sizePrices.length > 0 ? (input.sizePrices[0]?.price ?? null) : null

  return firstSizePrice ?? input.price ?? 0
}
