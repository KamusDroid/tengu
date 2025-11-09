'use client'

import { useState } from 'react'
import type { CartItem } from '@/types/cart'

type Props = {
  items: CartItem[]
  setItems: (items: CartItem[]) => void
  onCheckout: () => void
}

export default function CartDrawer({ items, setItems, onCheckout }: Props) {
  const [open, setOpen] = useState(false)

  const total = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  )

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full shadow px-4 py-2 bg-black text-white"
      >
        Carrito ({items.length}) — {(total / 100).toFixed(2)}
      </button>

      {open && (
        <div className="mt-2 w-80 rounded-2xl border bg-white p-4 space-y-2">
          <h4 className="font-semibold">Tu carrito</h4>

          {items.length === 0 && (
            <p className="text-sm opacity-70">Vacío</p>
          )}

          {items.map((item, idx) => (
            <div
              key={item.id + idx}
              className="flex justify-between items-center text-sm"
            >
              <div className="mr-2 truncate">
                {item.name} × {item.quantity}
              </div>
              <div className="ml-auto font-mono">
                {((item.priceCents * item.quantity) / 100).toFixed(2)}
              </div>
              <button
                className="ml-2 text-red-600"
                onClick={() =>
                  setItems(items.filter((_, i) => i !== idx))
                }
              >
                x
              </button>
            </div>
          ))}

          <button
            disabled={!items.length}
            onClick={onCheckout}
            className="w-full rounded bg-black text-white py-2 disabled:opacity-60"
          >
            Pagar
          </button>
        </div>
      )}
    </div>
  )
}
