'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'

const S = {
  bg0: '#050507', bg1: '#0d0d10',
  border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6',
  muted: 'rgba(240,237,230,0.45)', muted2: 'rgba(240,237,230,0.22)',
  green: '#5dc87a',
}

type Product = {
  id: string
  name: string
  description?: string | null
  imageUrl?: string | null
  priceCents: number
  currency: string
}

function fmtPrice(cents: number, currency: string) {
  const amount = cents / 100
  if (currency.toLowerCase() === 'ars') {
    return `$${amount.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }
  return `U$D ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add, count, total, currency: cartCurrency } = useCart()
  const [added, setAdded] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  function handleAdd() {
    add({ id: product.id, name: product.name, priceCents: product.priceCents, currency: product.currency, imageUrl: product.imageUrl })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main style={{ background: S.bg0, minHeight: '100vh', paddingTop: '80px' }}>
      <article style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(16px,5vw,40px) 80px' }}>
        {/* Back + cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            href="/marketplace"
            style={{ fontSize: '11px', color: S.muted2, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase' }}
          >
            ← Marketplace
          </Link>
          {count > 0 && (
            <button
              onClick={() => setCartOpen(true)}
              style={{ fontSize: '11px', background: S.red, color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '2px', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}
            >
              ◈ Carrito ({count}) — {fmtPrice(total, cartCurrency)}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>
          {/* Left: image */}
          <div>
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '100%', borderRadius: '2px', border: `0.5px solid ${S.border}`, display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(192,57,43,0.05)', border: `0.5px solid ${S.border}`, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,57,43,0.25)', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase' }}>
                TENGU
              </div>
            )}
          </div>

          {/* Right: info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)', marginBottom: '10px' }}>
                Marketplace TENGU
              </div>
              <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 500, color: S.text, lineHeight: 1.2, margin: 0 }}>
                {product.name}
              </h1>
            </div>

            <div style={{ fontSize: '32px', fontWeight: 500, color: S.text }}>
              {fmtPrice(product.priceCents, product.currency)}
            </div>

            <div style={{ height: '0.5px', background: S.border }} />

            <button
              onClick={handleAdd}
              style={{
                background: added ? S.green : S.red,
                color: '#fff', border: 'none', padding: '14px 24px',
                fontSize: '12px', borderRadius: '2px', cursor: 'pointer',
                letterSpacing: '2px', textTransform: 'uppercase',
                transition: 'background 0.25s', fontWeight: 500,
              }}
            >
              {added ? '✓ Agregado al carrito' : '+ Agregar al carrito'}
            </button>

            <div style={{ fontSize: '11px', color: S.muted2, lineHeight: 1.6 }}>
              Licencia digital · Entrega inmediata · Soporte incluido
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <>
            <div style={{ height: '0.5px', background: S.border, margin: '48px 0 32px' }} />
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '16px' }}>
                Descripción
              </div>
              <div style={{ fontSize: '14px', color: S.muted, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
                {product.description}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/marketplace" style={{ fontSize: '12px', color: S.red, textDecoration: 'none' }}>
            ← Ver todos los productos
          </Link>
          <span style={{ fontSize: '11px', color: S.muted2 }}>TENGU</span>
        </div>
      </article>

      {/* Cart mini-modal (ir al marketplace para gestionar) */}
      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '32px', zIndex: 50, maxWidth: '360px', width: '90vw', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>◈</div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: S.text, marginBottom: '8px' }}>Tenés {count} {count === 1 ? 'producto' : 'productos'} en el carrito</div>
            <div style={{ fontSize: '13px', color: S.muted2, marginBottom: '24px' }}>Total: {fmtPrice(total, cartCurrency)}</div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <Link href="/marketplace" style={{ display: 'block', background: S.red, color: '#fff', padding: '11px', borderRadius: '2px', textDecoration: 'none', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Ir al marketplace → checkout
              </Link>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '10px', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Seguir viendo
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
