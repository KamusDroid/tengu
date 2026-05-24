'use client'
import { useState, useEffect, useCallback } from 'react'

export type CartItem = {
  id: string
  name: string
  priceCents: number
  currency: string
  quantity: number
  imageUrl?: string | null
}

const CART_KEY = 'tengu_cart'

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') } catch { return [] }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('tengu_cart_update'))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(readCart())
    const sync = () => setItems(readCart())
    window.addEventListener('tengu_cart_update', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('tengu_cart_update', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const add = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const current = readCart()
    const existing = current.find((i) => i.id === item.id)
    const next = existing
      ? current.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...current, { ...item, quantity: 1 }]
    writeCart(next)
    setItems(next)
  }, [])

  const remove = useCallback((id: string) => {
    const next = readCart().filter((i) => i.id !== id)
    writeCart(next)
    setItems(next)
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { remove(id); return }
    const next = readCart().map((i) => i.id === id ? { ...i, quantity: qty } : i)
    writeCart(next)
    setItems(next)
  }, [remove])

  const clear = useCallback(() => { writeCart([]); setItems([]) }, [])

  const total = items.reduce((acc, i) => acc + i.priceCents * i.quantity, 0)
  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const currency = items[0]?.currency ?? 'ars'

  return { items, add, remove, updateQty, clear, total, count, currency }
}
