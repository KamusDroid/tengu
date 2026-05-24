'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

type Cupon = {
  id: string; codigo: string; tipo: string; valor: number; minimo: number | null
  usos: number; usosMaximos: number | null; activo: boolean
  fechaExpira: string | null; createdAt: string
}

const EMPTY = { codigo: '', tipo: 'porcentaje', valor: '', minimo: '', usosMaximos: '', fechaExpira: '', activo: true }

export default function CuponesPage() {
  const [cupones, setCupones] = useState<Cupon[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/cupones')
    if (res.ok) setCupones(await res.json())
  }

  function field(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function save() {
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/admin/cupones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: form.codigo,
          tipo: form.tipo,
          valor: Number(form.valor),
          minimo: form.minimo ? Number(form.minimo) : null,
          usosMaximos: form.usosMaximos ? Number(form.usosMaximos) : null,
          fechaExpira: form.fechaExpira || null,
          activo: form.activo,
        }),
      })
      if (!res.ok) { setError(await res.text()); return }
      await load(); setPanelOpen(false); setForm(EMPTY)
    } catch { setError('Error al guardar') }
    finally { setSaving(false) }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar cupón?')) return
    await fetch(`/api/admin/cupones?id=${id}`, { method: 'DELETE' })
    await load()
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = { fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px' }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Cupones</h1>
        <button onClick={() => setPanelOpen(true)} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}>
          + Nuevo cupón
        </button>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Código', 'Tipo', 'Valor', 'Mínimo', 'Usos', 'Activo', 'Expira', ''].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cupones.map((c) => (
              <tr key={c.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '11px 14px', fontFamily: 'monospace', fontSize: '12px', color: S.red, fontWeight: 500 }}>{c.codigo}</td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{c.tipo}</td>
                <td style={{ padding: '11px 14px', fontSize: '12px', color: S.text }}>{c.tipo === 'porcentaje' ? `${c.valor}%` : `$${c.valor}`}</td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{c.minimo ? `$${c.minimo}` : '—'}</td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{c.usos}{c.usosMaximos ? `/${c.usosMaximos}` : ''}</td>
                <td style={{ padding: '11px 14px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: c.activo ? 'rgba(93,200,122,0.12)' : 'rgba(240,237,230,0.06)', color: c.activo ? S.green : S.muted2 }}>
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>
                  {c.fechaExpira ? new Date(c.fechaExpira).toLocaleDateString('es-AR') : '—'}
                </td>
                <td style={{ padding: '11px 14px' }}>
                  <button onClick={() => del(c.id)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {cupones.length === 0 && (
              <tr><td colSpan={8} style={{ padding: '24px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin cupones.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Panel lateral */}
      {panelOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setPanelOpen(false)} />
          <div style={{ width: '380px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: S.text }}>Nuevo cupón</span>
              <button onClick={() => setPanelOpen(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px' }}>{error}</div>}
              <div><label style={lbl}>Código</label><input style={inp} value={form.codigo} onChange={(e) => field('codigo', e.target.value.toUpperCase())} placeholder="DESCUENTO20" /></div>
              <div><label style={lbl}>Tipo</label>
                <select style={inp} value={form.tipo} onChange={(e) => field('tipo', e.target.value)}>
                  <option value="porcentaje">Porcentaje</option>
                  <option value="monto_fijo">Monto fijo</option>
                </select>
              </div>
              <div><label style={lbl}>Valor ({form.tipo === 'porcentaje' ? '%' : '$'})</label><input style={inp} type="number" value={form.valor} onChange={(e) => field('valor', e.target.value)} /></div>
              <div><label style={lbl}>Mínimo de compra (opcional)</label><input style={inp} type="number" value={form.minimo} onChange={(e) => field('minimo', e.target.value)} /></div>
              <div><label style={lbl}>Usos máximos (opcional)</label><input style={inp} type="number" value={form.usosMaximos} onChange={(e) => field('usosMaximos', e.target.value)} /></div>
              <div><label style={lbl}>Fecha de expiración (opcional)</label><input style={inp} type="date" value={form.fechaExpira} onChange={(e) => field('fechaExpira', e.target.value)} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => field('activo', !form.activo)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: form.activo ? S.red : 'rgba(240,237,230,0.12)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: '3px', left: form.activo ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
                <label style={{ fontSize: '12px', color: S.muted }}>Activo</label>
              </div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: `0.5px solid ${S.border}` }}>
              <button onClick={save} disabled={saving} style={{ width: '100%', background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Guardando...' : 'Crear cupón'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
