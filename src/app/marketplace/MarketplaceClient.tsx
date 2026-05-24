'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart, type CartItem } from '@/hooks/useCart'

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

export default function MarketplaceClient({ products }: { products: Product[] }) {
  const { items, add, remove, updateQty, clear, total, count, currency } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [checkError, setCheckError] = useState('')

  async function checkout() {
    setChecking(true); setCheckError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.id, quantity: i.quantity })) }),
      })
      if (res.status === 401) { window.location.href = '/login'; return }
      if (!res.ok) { const d = await res.json(); setCheckError(d.error ?? 'Error al procesar'); return }
      const data = await res.json() as { mpInitPoint?: string | null }
      if (data.mpInitPoint) { clear(); window.location.href = data.mpInitPoint }
      else setCheckError('No se pudo iniciar el pago')
    } catch { setCheckError('Error de conexión') }
    finally { setChecking(false) }
  }

  return (
    <main style={{ background: S.bg0, minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(40px,6vw,60px) clamp(16px,5vw,40px) 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)', marginBottom: '12px' }}>
          Marketplace TENGU
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 500, color: S.text, lineHeight: 1.1, marginBottom: '12px' }}>
              Herramientas.<br />Listas para usar.
            </h1>
            <p style={{ fontSize: '14px', color: S.muted, lineHeight: 1.8, maxWidth: '440px' }}>
              Productos digitales, templates y soluciones de TENGU. Licencia directa, sin intermediarios.
            </p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: count > 0 ? S.red : 'rgba(192,57,43,0.1)',
              border: `0.5px solid ${count > 0 ? S.red : S.border}`,
              color: count > 0 ? '#fff' : S.muted,
              padding: '10px 20px', fontSize: '12px', borderRadius: '2px',
              cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase',
              transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <span>◈ Carrito{count > 0 ? ` (${count})` : ''}</span>
            {count > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>
                {fmtPrice(total, currency)}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.55) 30%, rgba(230,57,70,0.7) 50%, rgba(192,57,43,0.55) 70%, transparent)', margin: '0 0 48px' }} />

      {/* Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: `0 clamp(16px,5vw,40px) 80px` }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: S.muted2, fontSize: '14px' }}>
            Próximamente. Los productos están en preparación.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: S.border }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={add} />
            ))}
          </div>
        )}
      </section>

      {/* Cart Overlay */}
      {cartOpen && (
        <>
          <div
            onClick={() => setCartOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          />
          <aside style={{
            position: 'fixed', top: 0, right: 0, width: '380px', maxWidth: '100vw',
            height: '100vh', background: S.bg1, borderLeft: `0.5px solid ${S.border}`,
            zIndex: 50, display: 'flex', flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: S.muted2 }}>Carrito</span>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: S.muted, fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: S.muted2, fontSize: '13px' }}>
                  El carrito está vacío
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: S.border }}>
                  {items.map((item) => (
                    <CartRow key={item.id} item={item} onRemove={remove} onQty={updateQty} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 24px', borderTop: `0.5px solid ${S.border}` }}>
              {checkError && (
                <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>
                  {checkError}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Total</span>
                <span style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>{fmtPrice(total, currency)}</span>
              </div>
              <button
                disabled={!items.length || checking}
                onClick={checkout}
                style={{
                  width: '100%', background: items.length ? S.red : 'rgba(192,57,43,0.15)',
                  color: items.length ? '#fff' : S.muted2, padding: '12px', fontSize: '11px',
                  borderRadius: '2px', border: 'none', cursor: items.length && !checking ? 'pointer' : 'default',
                  letterSpacing: '2px', textTransform: 'uppercase', opacity: checking ? 0.6 : 1,
                }}
              >
                {checking ? 'Procesando...' : 'Ir al checkout →'}
              </button>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  style={{ width: '100%', background: 'none', border: 'none', color: S.muted2, fontSize: '11px', marginTop: '10px', cursor: 'pointer', padding: '4px', letterSpacing: '1px' }}
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </main>
  )
}

// ─── Sub-components ──────────────────────────────────────────────

function ProductCard({ product, onAdd }: { product: Product; onAdd: (item: Omit<CartItem, 'quantity'>) => void }) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAdd({ id: product.id, name: product.name, priceCents: product.priceCents, currency: product.currency, imageUrl: product.imageUrl })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article style={{ background: S.bg1, display: 'flex', flexDirection: 'column' }}>
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '100%', height: '100px', background: 'rgba(192,57,43,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(192,57,43,0.25)', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase' }}>
          TENGU
        </div>
      )}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 500, color: S.text, margin: 0, lineHeight: 1.3 }}>{product.name}</h2>
        {product.description && (
          <p style={{
            fontSize: '12px', color: S.muted, lineHeight: 1.65, margin: 0, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.description}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: `0.5px solid ${S.border}`, marginTop: 'auto', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>{fmtPrice(product.priceCents, product.currency)}</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Link
              href={`/marketplace/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '11px', color: S.muted2, textDecoration: 'none', padding: '7px 12px', border: `0.5px solid ${S.border}`, borderRadius: '2px', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            >
              Ver detalle ↗
            </Link>
            <button
              onClick={handleAdd}
              style={{
                fontSize: '11px', background: added ? S.green : S.red, color: '#fff',
                border: 'none', padding: '7px 14px', borderRadius: '2px', cursor: 'pointer',
                letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'background 0.2s',
              }}
            >
              {added ? '✓ Agregado' : '+ Carrito'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function CartRow({
  item, onRemove, onQty,
}: {
  item: CartItem
  onRemove: (id: string) => void
  onQty: (id: string, qty: number) => void
}) {
  const btnStyle: React.CSSProperties = {
    width: '24px', height: '24px', background: 'rgba(192,57,43,0.1)',
    border: `0.5px solid ${S.border}`, color: S.muted, borderRadius: '2px',
    cursor: 'pointer', fontSize: '15px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  }

  return (
    <div style={{ background: S.bg0, padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
      {item.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.imageUrl} alt={item.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', color: S.text, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
        <div style={{ fontSize: '12px', color: S.muted2 }}>{fmtPrice(item.priceCents * item.quantity, item.currency)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <button style={btnStyle} onClick={() => onQty(item.id, item.quantity - 1)}>−</button>
        <span style={{ fontSize: '13px', color: S.text, minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
        <button style={btnStyle} onClick={() => onQty(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: 'rgba(230,57,70,0.45)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, marginLeft: '4px', padding: '0 2px' }}>×</button>
      </div>
    </div>
  )
}
