'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', error: '#e05252',
}

type EstadoFactura = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

type Factura = {
  id: string
  numero: string
  clienteId: string
  descripcion: string | null
  moneda: string
  tasaIva: number
  descuento: number
  venceEn: string
  estado: EstadoFactura
  notas: string | null
  datosPago: string | null
}

type ItemRow = { descripcion: string; cantidad: string; precio: string }
type ProductoRow = { id: string; nombre: string; precioCents: number; moneda: string }

export function EditarFacturaClient({
  factura,
  items: initialItems,
  clientes,
  productos,
}: {
  factura: Factura
  items: Array<{ descripcion: string; cantidad: number; precio: number }>
  clientes: Array<{ id: string; nombre: string }>
  productos: ProductoRow[]
}) {
  const router = useRouter()
  const [clienteId, setClienteId] = useState(factura.clienteId)
  const [descripcion, setDescripcion] = useState(factura.descripcion ?? '')
  const [moneda, setMoneda] = useState(factura.moneda)
  const [tasaIva, setTasaIva] = useState(String(factura.tasaIva))
  const [descuento, setDescuento] = useState(factura.descuento ? String(factura.descuento / 100) : '')
  const [venceEn, setVenceEn] = useState(factura.venceEn.slice(0, 10))
  const [estado, setEstado] = useState<EstadoFactura>(factura.estado)
  const [notas, setNotas] = useState(factura.notas ?? '')
  const [datosPago, setDatosPago] = useState(factura.datosPago ?? '')
  const [items, setItems] = useState<ItemRow[]>(
    initialItems.length > 0
      ? initialItems.map((it) => ({ descripcion: it.descripcion, cantidad: String(it.cantidad), precio: String(it.precio) }))
      : [{ descripcion: '', cantidad: '1', precio: '' }]
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function itemField(i: number, k: keyof ItemRow, v: string) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)))
  }
  function addItem() { setItems((arr) => [...arr, { descripcion: '', cantidad: '1', precio: '' }]) }
  function removeItem(i: number) { setItems((arr) => (arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr)) }
  function selectProducto(i: number, productoId: string) {
    const p = productos.find((prod) => prod.id === productoId)
    if (!p) return
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, descripcion: p.nombre, precio: String(p.precioCents / 100) } : it)))
  }

  const subtotalCents = items.reduce((s, it) => {
    const cant = parseFloat(it.cantidad) || 0
    const precio = parseFloat(it.precio) || 0
    return s + Math.round(cant * precio * 100)
  }, 0)
  const tasaIvaNum = parseFloat(tasaIva) || 0
  const ivaCents = Math.round(subtotalCents * (tasaIvaNum / 100))
  const descuentoCents = Math.round((parseFloat(descuento) || 0) * 100)
  const totalCents = subtotalCents + ivaCents - descuentoCents

  function fmtMoney(cents: number) {
    const n = cents / 100
    return moneda === 'USD' ? 'U$S ' + n.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
  }

  async function guardar() {
    if (!clienteId) { setError('Seleccioná un cliente'); return }
    if (!venceEn) { setError('Ingresá la fecha de vencimiento'); return }
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/admin/facturas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: factura.id,
          clienteId,
          descripcion: descripcion || null,
          items: JSON.stringify(items.filter((it) => it.descripcion.trim() !== '').map((it) => ({
            descripcion: it.descripcion,
            cantidad: parseFloat(it.cantidad) || 0,
            precio: parseFloat(it.precio) || 0,
          }))),
          subtotalCents,
          tasaIva: tasaIvaNum,
          descuentoCents,
          venceEn,
          estado,
          notas: notas || null,
          datosPago: datosPago || null,
        }),
      })
      if (!res.ok) { setError(await res.text()); return }
      router.push('/admin/facturacion')
      router.refresh()
    } catch {
      setError('Error al guardar la factura')
    } finally {
      setSaving(false)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = {
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px',
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Editar factura</h1>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: S.muted2, marginTop: '2px' }}>{factura.numero}</div>
        </div>
        <button onClick={() => window.open(`/admin/facturacion/${factura.id}/print`, '_blank')} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '8px 16px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
          Ver / Imprimir
        </button>
      </div>

      {error && <div style={{ fontSize: '12px', color: S.error, background: 'rgba(224,82,82,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>{error}</div>}

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={lbl}>Cliente *</label>
          <select style={inp} value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
            <option value="">Seleccionar...</option>
            {clientes.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>Descripción</label>
          <input style={inp} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={lbl}>Moneda</label>
            <select style={inp} value={moneda} onChange={(e) => setMoneda(e.target.value)}>
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label style={lbl}>IVA</label>
            <select style={inp} value={tasaIva} onChange={(e) => setTasaIva(e.target.value)}>
              <option value="21">21%</option>
              <option value="10.5">10.5%</option>
              <option value="0">0%</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={lbl}>Vencimiento *</label>
            <input type="date" style={inp} value={venceEn} onChange={(e) => setVenceEn(e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Estado</label>
            <select style={inp} value={estado} onChange={(e) => setEstado(e.target.value as EstadoFactura)}>
              <option value="draft">Borrador</option>
              <option value="sent">Enviada</option>
              <option value="paid">Pagada</option>
              <option value="overdue">Vencida</option>
            </select>
          </div>
        </div>

        <div>
          <label style={lbl}>Ítems</label>
          <div style={{ border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 70px 70px 20px', gap: '4px', padding: '6px 8px', borderBottom: `0.5px solid ${S.border}` }}>
              {['Descripción', 'Cant.', 'Precio', 'Total', ''].map((h) => (
                <div key={h} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: S.muted2 }}>{h}</div>
              ))}
            </div>
            {items.map((it, i) => {
              const cant = parseFloat(it.cantidad) || 0
              const precio = parseFloat(it.precio) || 0
              return (
                <div key={i} style={{ padding: '6px 8px', borderBottom: i < items.length - 1 ? `0.5px solid ${S.border}` : 'none' }}>
                  {productos.length > 0 && (
                    <select
                      style={{ ...inp, padding: '5px 6px', fontSize: '11px', marginBottom: '4px' }}
                      value=""
                      onChange={(e) => { if (e.target.value) selectProducto(i, e.target.value) }}
                    >
                      <option value="">Producto existente (opcional)...</option>
                      {productos.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} — {p.moneda === 'USD' ? 'U$S ' : '$ '}{(p.precioCents / 100).toLocaleString('es-AR')}
                        </option>
                      ))}
                    </select>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 70px 70px 20px', gap: '4px', alignItems: 'center' }}>
                    <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} value={it.descripcion} onChange={(e) => itemField(i, 'descripcion', e.target.value)} placeholder="Servicio" />
                    <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} type="number" value={it.cantidad} onChange={(e) => itemField(i, 'cantidad', e.target.value)} />
                    <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} type="number" value={it.precio} onChange={(e) => itemField(i, 'precio', e.target.value)} />
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: S.muted }}>{(cant * precio).toLocaleString('es-AR')}</div>
                    <button onClick={() => removeItem(i)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={addItem} style={{ marginTop: '8px', background: 'transparent', border: `1px dashed ${S.border}`, color: S.muted, fontSize: '11px', padding: '6px 10px', borderRadius: '2px', cursor: 'pointer', width: '100%' }}>
            + Agregar ítem
          </button>

          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: S.muted }}>
              <span>Subtotal</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(subtotalCents)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: S.muted }}>
              <span>IVA ({tasaIvaNum}%)</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(ivaCents)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: S.muted }}>
              <span>Descuento</span>
              <input
                style={{ ...inp, width: '90px', padding: '4px 6px', fontSize: '11px', fontFamily: 'monospace', textAlign: 'right' }}
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                placeholder="0"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: S.text, fontWeight: 500, fontSize: '13px', marginTop: '4px' }}>
              <span>Total</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(totalCents)}</span>
            </div>
          </div>
        </div>

        <div>
          <label style={lbl}>Datos de pago</label>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: '60px' }} value={datosPago} onChange={(e) => setDatosPago(e.target.value)} />
        </div>
        <div>
          <label style={lbl}>Notas</label>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: '50px' }} value={notas} onChange={(e) => setNotas(e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <button onClick={guardar} disabled={saving} style={{ flex: 1, background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button onClick={() => router.push('/admin/facturacion')} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '10px 20px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
