export type ProductListItem = {
  _id: string
  image: string
  type: "product" | "kit"
  price: number
  category: string
  size:string
  name: string
}

export type ProductListResponse = {
  total: number
  page: number
  limit: number
  products: ProductListItem[]
}

export type SizePriceDisplay = {
  size?: string
  price: number
  quantity?: number
  display: {
    original: number
    sale: number
    percentOff: number
  }
}

export type ProductDetailResponse = {
  _id: string
  name: string
  shortDescription?: string
  longDescription?: string
  category: string
  subcategory: string
  microcategory?: string
  productType: "product" | "kit"
  images: string[] // hero + gallery
  heroImageUrl: string
  productImageUrls: string[]
  sizePrices?: SizePriceDisplay[]
  kitPrice?: {
    price: number
    display: { original: number; sale: number; percentOff: number }
  }
  // include any other fields for completeness
}
