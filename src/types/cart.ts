export interface Product {
  id: string
  name: string
  description?: string | null
  imageUrl?: string | null
  priceCents: number
  currency: string
}

export interface CartItem extends Product {
  quantity: number
}
