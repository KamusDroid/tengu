'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import type { Product, CartItem } from '@/types/cart'

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .finally(() => setLoading(false))
  }, [])

  async function checkout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })

    if (!res.ok) {
      // acá podrías mostrar un mensaje de error al usuario
      return
    }

    const data = (await res.json()) as { url: string }
    window.location.href = data.url
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Marketplace</h1>

      {loading ? (
        <p>Cargando…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={(prod) => setItems([...items, prod])}
            />
          ))}
        </div>
      )}

      <CartDrawer items={items} setItems={setItems} onCheckout={checkout} />
    </main>
  )
}
