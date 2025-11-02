export interface DisplayPrice {
  original: number;
  sale: number;
  percentOff: number;
}

export interface SizePrice {
  size: string;
  quantity: number;
  price: number;
  display: DisplayPrice;
}

export interface KitPrice {
  price: number;
  display: DisplayPrice;
}

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Response shape returned from GET /api/products/[id]
 */
export interface ProductDetailResponse {
  _id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  subcategory?: string;
  microcategory?: string;
  productType?: "product" | "kit"

  // Images
  images: string[];
  heroImageUrl?: string;
  productImageUrls: string[];

  // Pricing
  sizePrices?: SizePrice[];
  kitPrice?: KitPrice;

  // Additional Info
  features?: string[];
  benefits?: string[];
  manufacturer?: string;
  countryOfOrigin?: string;
  expiryDate?: string;
  howToUse?: string;
  keyIngredients?: string[];
  faqs?: FAQ[];

}

export type ProductListResponse = {
  total: number
  page: number
  limit: number
  products: ProductListItem[]
}

export type ProductListItem = {
  _id: string
  image: string
  type: "product" | "kit"
  price: number
  category: string
  size:string
  name: string
}
