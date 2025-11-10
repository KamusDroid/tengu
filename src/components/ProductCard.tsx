'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, CartItem } from '@/types/cart'

type Props = {
  product: Product
  onAdd: (item: CartItem) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  const [qty, setQty] = useState(1)

  return (
    <div className="rounded-2xl border p-4 space-y-2">
      {product.imageUrl && (
        <div className="relative w-full h-40">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover rounded-xl"
          />
        </div>
      )}

      <h3 className="font-semibold">{product.name}</h3>

      {product.description && (
        <p className="text-md opacity-90">{product.description}</p>
      )}

      <p className="font-mono">
        {(product.priceCents / 100).toFixed(2)}{' '}
        {product.currency?.toUpperCase?.() || 'USD'}
      </p>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value || '1'))}
          className="w-20 rounded border p-2"
        />
        <button
          onClick={() => onAdd({ ...product, quantity: qty })}
          className="rounded bg-black text-white px-3 py-2"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
