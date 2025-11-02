export type CartItem = {
  key: string
  id: string
  name: string
  image: string
  type: "product" | "kit"
  category: string
  unitPrice: number
  size?: string
  quantity: number
}

export type AddToCartInput = {
  id: string
  name: string
  image: string
  type: "product" | "kit"
  category: string
  unitPrice: number
  size?: string | null
  quantity: number
}

export type CartContextValue = {
  items: CartItem[]
  addItem: (input: AddToCartInput) => void
  updateQty: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
}
