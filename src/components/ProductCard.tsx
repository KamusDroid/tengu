'use client'
import { useState } from 'react'
export default function ProductCard({ product, onAdd }: { product: any, onAdd: (p:any)=>void }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="rounded-2xl border p-4 space-y-2">
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-xl" />}
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm opacity-80">{product.description}</p>
      <p className="font-mono">{(product.priceCents/100).toFixed(2)} {product.currency?.toUpperCase?.() || 'USD'}</p>
      <div className="flex items-center gap-2">
        <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value||'1'))} className="w-20 rounded border p-2" />
        <button onClick={()=>onAdd({...product, quantity: qty})} className="rounded bg-black text-white px-3 py-2">Agregar</button>
      </div>
    </div>
  )
}