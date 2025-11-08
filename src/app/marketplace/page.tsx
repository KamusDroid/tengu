'use client'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'

export default function MarketplacePage(){
  const [products, setProducts] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/api/products').then(r=>r.json()).then(setProducts).finally(()=>setLoading(false))
  }, [])

  async function checkout(){
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ items })
    })
    if (!res.ok){ alert(await res.text()); return }
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Marketplace</h1>
      {loading ? <p>Cargando…</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onAdd={(prod)=> setItems([...items, prod])} />
          ))}
        </div>
      )}
      <CartDrawer items={items} setItems={setItems} onCheckout={checkout} />
    </main>
  )
}