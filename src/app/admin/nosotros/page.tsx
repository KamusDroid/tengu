'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default function NosotrosPage() {
  const [campos, setCampos] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/config')
    if (res.ok) setCampos(await res.json())
  }

  function field(k: string, v: string) {
    setCampos((c) => ({ ...c, [k]: v }))
    setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campos }),
      })
      if (!res.ok) { setError(await res.text()); return }
      setSaved(true)
    } catch { setError('Error al guardar') }
    finally { setSaving(false) }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = {
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
    color: S.muted2, display: 'block', marginBottom: '4px',
  }
  const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: '90px' }

  const v = (k: string) => campos[k] ?? ''

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Sobre Nosotros</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {saved && <span style={{ fontSize: '11px', color: S.green }}>Guardado</span>}
          <button onClick={save} disabled={saving} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '16px' }}>{error}</div>}

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '12px' }}>Encabezado</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div><label style={lbl}>Título</label><input style={inp} value={v('nosotros.titulo')} onChange={(e) => field('nosotros.titulo', e.target.value)} placeholder="Sobre nosotros" /></div>
            <div><label style={lbl}>Subtítulo</label><input style={inp} value={v('nosotros.subtitulo')} onChange={(e) => field('nosotros.subtitulo', e.target.value)} placeholder="Una línea descriptiva" /></div>
          </div>
        </div>

        <div style={{ borderTop: `0.5px solid ${S.border}`, paddingTop: '16px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '12px' }}>Contenido</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div><label style={lbl}>Historia</label><textarea style={ta} value={v('nosotros.historia')} onChange={(e) => field('nosotros.historia', e.target.value)} /></div>
            <div><label style={lbl}>Misión</label><textarea style={ta} value={v('nosotros.mision')} onChange={(e) => field('nosotros.mision', e.target.value)} /></div>
            <div><label style={lbl}>URL imagen principal</label><input style={inp} value={v('nosotros.imagen_url')} onChange={(e) => field('nosotros.imagen_url', e.target.value)} placeholder="https://... o /uploads/..." /></div>
          </div>
        </div>

        <div style={{ borderTop: `0.5px solid ${S.border}`, paddingTop: '16px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '12px' }}>Equipo (JSON array)</div>
          <div><label style={lbl}>Miembros del equipo</label>
            <textarea
              style={{ ...ta, minHeight: '120px', fontFamily: 'monospace', fontSize: '11px' }}
              value={v('nosotros.equipo')}
              onChange={(e) => field('nosotros.equipo', e.target.value)}
              placeholder={`[{"nombre":"Juan","rol":"Director","imagen":"/uploads/equipo/juan.jpg"}]`}
            />
          </div>
        </div>

        <div style={{ borderTop: `0.5px solid ${S.border}`, paddingTop: '16px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '12px' }}>Stack / Tecnologías (JSON array)</div>
          <div><label style={lbl}>Stack</label>
            <textarea
              style={{ ...ta, fontFamily: 'monospace', fontSize: '11px' }}
              value={v('nosotros.stack')}
              onChange={(e) => field('nosotros.stack', e.target.value)}
              placeholder={`["React","Next.js","Prisma","PostgreSQL"]`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
