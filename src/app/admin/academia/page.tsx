'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

type Inscripcion = { id: string; nombre: string; email: string; telefono: string | null; estado: string; createdAt: string; taller: { titulo: string } }
type Taller = { id: string; titulo: string; nivel: string | null; modalidad: string | null; precio: number | null; fecha: string | null; cupoMaximo: number | null; activo: boolean; inscripciones: Inscripcion[] }

const EMPTY_T = { titulo: '', nivel: '', modalidad: '', descripcion: '', precio: '', fecha: '', cupoMaximo: '', activo: true }

export default function AcademiaPage() {
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_T)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [t, i] = await Promise.all([fetch('/api/admin/talleres'), fetch('/api/admin/inscripciones')])
    if (t.ok) setTalleres(await t.json())
    if (i.ok) setInscripciones(await i.json())
  }

  function openNew() { setEditId(null); setForm(EMPTY_T); setError(''); setPanelOpen(true) }
  function openEdit(t: Taller) {
    setEditId(t.id)
    setForm({ titulo: t.titulo, nivel: t.nivel ?? '', modalidad: t.modalidad ?? '', descripcion: '', precio: t.precio?.toString() ?? '', fecha: t.fecha ? new Date(t.fecha).toISOString().slice(0, 16) : '', cupoMaximo: t.cupoMaximo?.toString() ?? '', activo: t.activo })
    setError(''); setPanelOpen(true)
  }
  function field(k: string, v: string | boolean) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/admin/talleres', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editId ? { id: editId } : {}),
          titulo: form.titulo, nivel: form.nivel || null, modalidad: form.modalidad || null,
          precio: form.precio ? Number(form.precio) : null, fecha: form.fecha || null,
          cupoMaximo: form.cupoMaximo ? Number(form.cupoMaximo) : null, activo: form.activo,
        }),
      })
      if (!res.ok) { setError(await res.text()); return }
      await loadAll(); setPanelOpen(false)
    } catch { setError('Error') }
    finally { setSaving(false) }
  }

  async function delTaller(id: string) {
    if (!confirm('¿Eliminar taller?')) return
    await fetch(`/api/admin/talleres?id=${id}`, { method: 'DELETE' })
    await loadAll()
  }

  async function cambiarEstado(id: string, estado: string) {
    await fetch('/api/admin/inscripciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, estado }) })
    await loadAll()
  }

  const inp: React.CSSProperties = { width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`, color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box' }
  const lbl: React.CSSProperties = { fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px' }
  const estadoColor: Record<string, string> = { pendiente: S.amber, confirmado: S.green, cancelado: 'rgba(230,57,70,0.7)' }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Academia</h1>
        <button onClick={openNew} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}>+ Nuevo taller</button>
      </div>

      {/* Talleres */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Talleres</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Título', 'Nivel', 'Modalidad', 'Precio', 'Fecha', 'Cupo', 'Activo', ''].map((h) => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talleres.map((t) => (
              <tr key={t.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: S.text }}>{t.titulo}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{t.nivel ?? '—'}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{t.modalidad ?? '—'}</td>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: S.text }}>{t.precio != null ? `$${t.precio}` : 'Gratis'}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{t.fecha ? new Date(t.fecha).toLocaleDateString('es-AR') : '—'}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{t.inscripciones.length}{t.cupoMaximo ? `/${t.cupoMaximo}` : ''}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '2px', background: t.activo ? 'rgba(93,200,122,0.12)' : 'rgba(240,237,230,0.06)', color: t.activo ? S.green : S.muted2 }}>
                    {t.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(t)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 8px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => delTaller(t.id)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '4px 8px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
            {talleres.length === 0 && <tr><td colSpan={8} style={{ padding: '20px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin talleres.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Inscripciones */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Inscripciones</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Nombre', 'Email', 'Teléfono', 'Taller', 'Estado', 'Fecha'].map((h) => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((i) => (
              <tr key={i.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '10px 12px', fontSize: '13px', color: S.text }}>{i.nombre}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted }}>{i.email}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{i.telefono ?? '—'}</td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{i.taller.titulo}</td>
                <td style={{ padding: '10px 12px' }}>
                  <select
                    value={i.estado}
                    onChange={(e) => cambiarEstado(i.id, e.target.value)}
                    style={{ background: S.bg0, border: `0.5px solid ${S.border}`, color: estadoColor[i.estado] ?? S.muted, fontSize: '11px', padding: '3px 6px', borderRadius: '2px' }}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </td>
                <td style={{ padding: '10px 12px', fontSize: '11px', color: S.muted2 }}>{new Date(i.createdAt).toLocaleDateString('es-AR')}</td>
              </tr>
            ))}
            {inscripciones.length === 0 && <tr><td colSpan={6} style={{ padding: '20px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin inscripciones.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Panel taller */}
      {panelOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setPanelOpen(false)} />
          <div style={{ width: '380px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: S.text }}>{editId ? 'Editar taller' : 'Nuevo taller'}</span>
              <button onClick={() => setPanelOpen(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px' }}>{error}</div>}
              <div><label style={lbl}>Título</label><input style={inp} value={form.titulo} onChange={(e) => field('titulo', e.target.value)} /></div>
              <div><label style={lbl}>Nivel</label><input style={inp} value={form.nivel} onChange={(e) => field('nivel', e.target.value)} placeholder="Inicial / Intermedio / Avanzado" /></div>
              <div><label style={lbl}>Modalidad</label><input style={inp} value={form.modalidad} onChange={(e) => field('modalidad', e.target.value)} placeholder="Presencial / Online" /></div>
              <div><label style={lbl}>Precio (vacío = gratis)</label><input style={inp} type="number" value={form.precio} onChange={(e) => field('precio', e.target.value)} /></div>
              <div><label style={lbl}>Fecha</label><input style={inp} type="datetime-local" value={form.fecha} onChange={(e) => field('fecha', e.target.value)} /></div>
              <div><label style={lbl}>Cupo máximo</label><input style={inp} type="number" value={form.cupoMaximo} onChange={(e) => field('cupoMaximo', e.target.value)} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => field('activo', !form.activo)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: form.activo ? S.red : 'rgba(240,237,230,0.12)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: '3px', left: form.activo ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
                <label style={{ fontSize: '12px', color: S.muted }}>Activo</label>
              </div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: `0.5px solid ${S.border}` }}>
              <button onClick={save} disabled={saving} style={{ width: '100%', background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear taller'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
