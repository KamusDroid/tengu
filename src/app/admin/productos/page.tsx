'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

type Product = { id: string; name: string; description: string | null; imageUrl: string | null; priceCents: number; currency: string; active: boolean; createdAt: string }
const EMPTY = { name: '', description: '', imageUrl: '', priceCents: '', currency: 'ars', active: true }

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/products')
    if (res.ok) setProducts(await res.json())
  }

  function openNew() { setEditId(null); setForm(EMPTY); setError(''); setPanelOpen(true) }
  function openEdit(p: Product) {
    setEditId(p.id)
    setForm({ name: p.name, description: p.description ?? '', imageUrl: p.imageUrl ?? '', priceCents: String(p.priceCents / 100), currency: p.currency, active: p.active })
    setError(''); setPanelOpen(true)
  }
  function field(k: string, v: string | boolean) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const body = {
        ...(editId ? { id: editId } : {}),
        name: form.name,
        description: form.description || null,
        imageUrl: form.imageUrl || null,
        priceCents: Math.round(Number(form.priceCents) * 100),
        currency: form.currency,
        active: form.active,
      }
      const res = await fetch('/api/products', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { setError(await res.text()); return }
      await load(); setPanelOpen(false)
    } catch { setError('Error al guardar') }
    finally { setSaving(false) }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar producto?')) return
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    await load()
  }

  const inp: React.CSSProperties = { width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`, color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box' }
  const lbl: React.CSSProperties = { fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px' }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Productos</h1>
        <button onClick={openNew} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}>+ Nuevo producto</button>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Nombre', 'Precio', 'Moneda', 'Activo', 'Creado', ''].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '11px 14px', fontSize: '13px', color: S.text }}>{p.name}</td>
                <td style={{ padding: '11px 14px', fontSize: '12px', color: S.muted }}>
                  {(p.priceCents / 100).toLocaleString('es-AR', { style: 'currency', currency: p.currency.toUpperCase() })}
                </td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{p.currency.toUpperCase()}</td>
                <td style={{ padding: '11px 14px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: p.active ? 'rgba(93,200,122,0.12)' : 'rgba(240,237,230,0.06)', color: p.active ? S.green : S.muted2 }}>
                    {p.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{new Date(p.createdAt).toLocaleDateString('es-AR')}</td>
                <td style={{ padding: '11px 14px', display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(p)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => del(p.id)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '32px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin productos todavía.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {panelOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setPanelOpen(false)} />
          <div style={{ width: '400px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: S.text }}>{editId ? 'Editar producto' : 'Nuevo producto'}</span>
              <button onClick={() => setPanelOpen(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px' }}>{error}</div>}
              <div><label style={lbl}>Nombre</label><input style={inp} value={form.name} onChange={(e) => field('name', e.target.value)} /></div>
              <div><label style={lbl}>Descripción</label><textarea style={{ ...inp, resize: 'vertical', minHeight: '60px' }} value={form.description} onChange={(e) => field('description', e.target.value)} /></div>
              <div><label style={lbl}>URL imagen</label><input style={inp} value={form.imageUrl} onChange={(e) => field('imageUrl', e.target.value)} placeholder="/uploads/productos/..." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><label style={lbl}>Precio</label><input style={inp} type="number" step="0.01" value={form.priceCents} onChange={(e) => field('priceCents', e.target.value)} /></div>
                <div><label style={lbl}>Moneda</label>
                  <select style={inp} value={form.currency} onChange={(e) => field('currency', e.target.value)}>
                    <option value="ars">ARS</option>
                    <option value="usd">USD</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => field('active', !form.active)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: form.active ? S.red : 'rgba(240,237,230,0.12)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: '3px', left: form.active ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
                <label style={{ fontSize: '12px', color: S.muted }}>Activo</label>
              </div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: `0.5px solid ${S.border}` }}>
              <button onClick={save} disabled={saving} style={{ width: '100%', background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
