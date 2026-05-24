'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

type Post = { id: string; titulo: string; slug: string; categoria: string | null; publicado: boolean; publishedAt: string | null; createdAt: string }
type Form = { titulo: string; slug: string; categoria: string; extracto: string; contenido: string; imagenUrl: string; publicado: boolean }

const EMPTY: Form = { titulo: '', slug: '', categoria: '', extracto: '', contenido: '', imagenUrl: '', publicado: false }

function toSlug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<Form>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/blog')
    if (res.ok) setPosts(await res.json())
  }

  function openNew() { setEditId(null); setForm(EMPTY); setError(''); setPanelOpen(true) }
  function openEdit(p: Post & { extracto?: string; contenido?: string; imagenUrl?: string }) {
    setEditId(p.id)
    setForm({ titulo: p.titulo, slug: p.slug, categoria: p.categoria ?? '', extracto: '', contenido: '', imagenUrl: '', publicado: p.publicado })
    setError(''); setPanelOpen(true)
  }
  function field<K extends keyof Form>(k: K, v: Form[K]) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/admin/blog', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...(editId ? { id: editId } : {}), ...form }),
      })
      if (!res.ok) { setError(await res.text()); return }
      await load(); setPanelOpen(false)
    } catch { setError('Error al guardar') }
    finally { setSaving(false) }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar artículo?')) return
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' })
    await load()
  }

  const inp: React.CSSProperties = { width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`, color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box' }
  const lbl: React.CSSProperties = { fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px' }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Blog</h1>
        <button onClick={openNew} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}>+ Nuevo artículo</button>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Título', 'Categoría', 'Estado', 'Publicado', ''].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '11px 14px', fontSize: '13px', color: S.text, maxWidth: '280px' }}>{p.titulo}</td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>{p.categoria ?? '—'}</td>
                <td style={{ padding: '11px 14px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: p.publicado ? 'rgba(93,200,122,0.12)' : 'rgba(240,237,230,0.06)', color: p.publicado ? S.green : S.muted2 }}>
                    {p.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>
                  {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('es-AR') : '—'}
                </td>
                <td style={{ padding: '11px 14px', display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(p)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => del(p.id)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '24px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin artículos todavía.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {panelOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setPanelOpen(false)} />
          <div style={{ width: '400px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: S.text }}>{editId ? 'Editar artículo' : 'Nuevo artículo'}</span>
              <button onClick={() => setPanelOpen(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px' }}>{error}</div>}
              <div>
                <label style={lbl}>Título</label>
                <input style={inp} value={form.titulo} onChange={(e) => { field('titulo', e.target.value); if (!editId) field('slug', toSlug(e.target.value)) }} />
              </div>
              <div><label style={lbl}>Slug</label><input style={inp} value={form.slug} onChange={(e) => field('slug', e.target.value)} /></div>
              <div><label style={lbl}>Categoría</label><input style={inp} value={form.categoria} onChange={(e) => field('categoria', e.target.value)} /></div>
              <div><label style={lbl}>Extracto (máx 200 chars)</label><textarea style={{ ...inp, resize: 'vertical', minHeight: '60px' }} maxLength={200} value={form.extracto} onChange={(e) => field('extracto', e.target.value)} /></div>
              <div><label style={lbl}>Contenido</label><textarea style={{ ...inp, resize: 'vertical', minHeight: '300px' }} value={form.contenido} onChange={(e) => field('contenido', e.target.value)} /></div>
              <div><label style={lbl}>URL imagen destacada</label><input style={inp} value={form.imagenUrl} onChange={(e) => field('imagenUrl', e.target.value)} placeholder="https://..." /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => field('publicado', !form.publicado)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: form.publicado ? S.red : 'rgba(240,237,230,0.12)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: '3px', left: form.publicado ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
                <label style={{ fontSize: '12px', color: S.muted }}>Publicado</label>
              </div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: `0.5px solid ${S.border}` }}>
              <button onClick={save} disabled={saving} style={{ width: '100%', background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear artículo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
