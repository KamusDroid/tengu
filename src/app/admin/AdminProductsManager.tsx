'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import type { Product, CartItem } from '@/types/cart'
import { z } from 'zod'

type Props = {
  initialProducts: Product[]
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  priceCents: z
    .number({
      required_error: 'El precio es obligatorio',
      invalid_type_error: 'El precio debe ser un número',
    })
    .int()
    .positive('Debe ser mayor a 0'),
  currency: z.string().min(1, 'La moneda es obligatoria'),
  active: z.boolean().default(true),
})

export function AdminProductsManager({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [items, setItems] = useState<CartItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    price: '', // en UI usamos 50.00 y lo convertimos a cents
    currency: 'usd',
    active: true,
  })

  function resetForm() {
    setEditingId(null)
    setForm({
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      currency: 'usd',
      active: true,
    })
    setError(null)
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      imageUrl: product.imageUrl ?? '',
      price: (product.priceCents / 100).toString(),
      currency: product.currency,
      active: true, // si tenés el campo en el modelo, acá lo podrías leer
    })
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const priceNumber = Number(form.price.replace(',', '.'))
    if (Number.isNaN(priceNumber)) {
      setError('El precio no es válido')
      return
    }

    const parsed = formSchema.safeParse({
      id: editingId ?? undefined,
      name: form.name,
      description: form.description || undefined,
      imageUrl: form.imageUrl || undefined,
      priceCents: Math.round(priceNumber * 100),
      currency: form.currency,
      active: form.active,
    })

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Error en el formulario')
      return
    }

    const payload = parsed.data
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      const saved = (await res.json()) as Product

      if (editingId) {
        setProducts((prev) =>
          prev.map((p) => (p.id === saved.id ? saved : p)),
        )
      } else {
        setProducts((prev) => [saved, ...prev])
      }

      resetForm()
        } catch (err) {
        if (err instanceof Error) {
        setError(err.message)
        } else {
        setError('Error al guardar el producto')
        }
        } finally {
  
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok && res.status !== 204) {
        throw new Error(await res.text())
      }

      setProducts((prev) => prev.filter((p) => p.id !== id))
      if (editingId === id) resetForm()
      } catch (err) {
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('Error al eliminar el producto')
    }
  } finally {

      setLoading(false)
    }
  }

  async function checkout() {
    if (!items.length) return
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      const data = (await res.json()) as {
        id: string
        mpInitPoint?: string | null
      }

      if (data.mpInitPoint) {
        window.location.href = data.mpInitPoint
      } else {
        setItems([])
        alert('Pedido registrado, pero no se pudo abrir el checkout de pago.')
      }
    } catch (err) {
      console.error(err)
      setError('Error en el checkout')
    } finally {
      setLoading(false)
    }
  }

  function handleAddToCart(item: CartItem) {
    setItems((prev) => [...prev, item])
  }

  return (
    <div className="space-y-8">
      {/* FORMULARIO CREAR / EDITAR */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border bg-card p-4 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nombre</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Precio</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Descripción</label>
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">URL de imagen</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Moneda</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={form.currency}
              onChange={(e) =>
                setForm((f) => ({ ...f, currency: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <input
              id="active"
              type="checkbox"
              className="h-4 w-4"
              checked={form.active}
              onChange={(e) =>
                setForm((f) => ({ ...f, active: e.target.checked }))
              }
            />
            <label htmlFor="active" className="text-sm">
              Activo
            </label>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {editingId ? 'Guardar cambios' : 'Crear producto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA DE PRODUCTOS EN CARDS + BOTONES ADMIN */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard product={product} onAdd={handleAddToCart} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(product)}
                className="rounded-md border px-3 py-1.5 text-xs"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="rounded-md border border-red-500 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {!products.length && (
          <p className="text-sm text-muted-foreground">
            Todavía no hay productos.
          </p>
        )}
      </div>

      {/* CARRITO DE ADMIN (misma UX que marketplace) */}
      <CartDrawer items={items} setItems={setItems} onCheckout={checkout} />
    </div>
  )
}
