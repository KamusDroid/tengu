'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import type { Product, CartItem } from '@/types/cart'

export default function MarketplaceClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) {
          throw new Error(await res.text())
        }
        const data = (await res.json()) as Product[]
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  async function checkout() {
    if (!items.length) return
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      setItems([])
      alert('Pedido realizado correctamente')
    } catch (err) {
      console.error(err)
      setError('Error al procesar el pedido')
    }
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-sm text-muted-foreground">
          Elige uno o más servicios y agrégalos al carrito para iniciar tu proyecto.
        </p>
      </header>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Todavía no hay productos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={(prod) =>
                setItems((prev) => [
                  ...prev,
                  { ...prod, quantity: 1 },
                ])
              }
            />
          ))}
        </div>
      )}

      <CartDrawer items={items} setItems={setItems} onCheckout={checkout} />
    </main>
  )
}
