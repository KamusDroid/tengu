'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

const REDES = [
  { clave: 'social.instagram', label: 'Instagram', placeholder: 'https://instagram.com/tengu' },
  { clave: 'social.facebook', label: 'Facebook', placeholder: 'https://facebook.com/tengu' },
  { clave: 'social.linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/tengu' },
  { clave: 'social.whatsapp', label: 'WhatsApp', placeholder: '+5491112345678' },
  { clave: 'social.twitter', label: 'X / Twitter', placeholder: 'https://twitter.com/tengu' },
]

export default function RedesPage() {
  const [campos, setCampos] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [igToken] = useState(!!process.env.NEXT_PUBLIC_IG_TOKEN)

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

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Redes Sociales</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {saved && <span style={{ fontSize: '11px', color: S.green }}>Guardado</span>}
          <button onClick={save} disabled={saving} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '16px' }}>{error}</div>}

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {REDES.map((r) => (
          <div key={r.clave}>
            <label style={lbl}>{r.label}</label>
            <input style={inp} value={campos[r.clave] ?? ''} onChange={(e) => field(r.clave, e.target.value)} placeholder={r.placeholder} />
          </div>
        ))}
      </div>

      {/* Instagram Graph API */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Instagram Graph API</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px' }}>
        {igToken ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(93,200,122,0.12)', color: S.green }}>Conectado</span>
              <span style={{ fontSize: '11px', color: S.muted2 }}>Token de acceso configurado</span>
            </div>
            <p style={{ fontSize: '12px', color: S.muted2, lineHeight: '1.6' }}>
              El token de Instagram Graph API está activo. Las publicaciones recientes pueden integrarse en el sitio a través de la variable de entorno <code style={{ fontFamily: 'monospace', fontSize: '11px', color: S.muted }}>NEXT_PUBLIC_IG_TOKEN</code>.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(240,237,230,0.06)', color: S.muted2 }}>No configurado</span>
            </div>
            <p style={{ fontSize: '12px', color: S.muted2, lineHeight: '1.6' }}>
              Para integrar el feed de Instagram, configurá la variable de entorno <code style={{ fontFamily: 'monospace', fontSize: '11px', color: S.muted }}>NEXT_PUBLIC_IG_TOKEN</code> con un token de larga duración de Instagram Graph API.
            </p>
            <div style={{ marginTop: '10px', padding: '10px 12px', background: 'rgba(240,237,230,0.03)', borderRadius: '2px', fontFamily: 'monospace', fontSize: '11px', color: S.muted2 }}>
              NEXT_PUBLIC_IG_TOKEN=EAAxxxxxxxx...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
