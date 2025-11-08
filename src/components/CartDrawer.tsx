'use client'
import { useState } from 'react'
export default function CartDrawer({items, setItems, onCheckout}:{items:any[], setItems:(i:any[])=>void, onCheckout:()=>void}){
  const [open, setOpen] = useState(false)
  const total = items.reduce((s, it)=> s + it.priceCents*it.quantity, 0)
  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={()=>setOpen(!open)} className="rounded-full shadow px-4 py-2 bg-black text-white">
        Carrito ({items.length}) — {(total/100).toFixed(2)}
      </button>
      {open && (
        <div className="mt-2 w-80 rounded-2xl border bg-white p-4 space-y-2">
          <h4 className="font-semibold">Tu carrito</h4>
          {items.length===0 && <p className="text-sm opacity-70">Vacío</p>}
          {items.map((it, idx)=> (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div className="mr-2 truncate">{it.name} × {it.quantity}</div>
              <div className="ml-auto font-mono">{(it.priceCents*it.quantity/100).toFixed(2)}</div>
              <button className="ml-2 text-red-600" onClick={()=>setItems(items.filter((_,i)=>i!==idx))}>x</button>
            </div>
          ))}
          <button disabled={!items.length} onClick={onCheckout} className="w-full rounded bg-black text-white py-2">Pagar</button>
        </div>
      )}
    </div>
  )
}