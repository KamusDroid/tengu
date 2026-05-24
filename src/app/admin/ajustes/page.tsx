'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

type Campo = { clave: string; label: string; type?: string; placeholder?: string }

const SECCIONES: { titulo: string; campos: Campo[] }[] = [
  {
    titulo: 'Datos del negocio',
    campos: [
      { clave: 'negocio.nombre',    label: 'Nombre del negocio', placeholder: 'TENGU' },
      { clave: 'negocio.email',     label: 'Email de contacto',  placeholder: 'ventas@tengu.com.ar' },
      { clave: 'negocio.whatsapp',  label: 'WhatsApp (con código de país)', placeholder: '+54 9 11 5138 3860' },
      { clave: 'negocio.direccion', label: 'Dirección',          placeholder: 'Castelar, Buenos Aires' },
    ],
  },
  {
    titulo: 'Página de inicio',
    campos: [
      { clave: 'hero.video_url',   label: 'Hero — URL del video de fondo', placeholder: '/videos/hero-bg.mp4' },
      { clave: 'hero.imagen_url',  label: 'Hero — URL imagen (fallback)',  placeholder: '/uploads/marca/hero.jpg' },
    ],
  },
  {
    titulo: 'Tienda',
    campos: [
      { clave: 'tienda.moneda',          label: 'Moneda por defecto', placeholder: 'ARS' },
      { clave: 'tienda.mp_access_token', label: 'MercadoPago Access Token', type: 'password' },
      { clave: 'tienda.mp_public_key',   label: 'MercadoPago Public Key',   type: 'password' },
    ],
  },
  {
    titulo: 'SEO',
    campos: [
      { clave: 'seo.titulo',       label: 'Título del sitio',       placeholder: 'TENGU — Desarrollo, IA y Automatización' },
      { clave: 'seo.descripcion',  label: 'Meta descripción',       placeholder: 'Construimos sistemas que trabajan por vos.' },
      { clave: 'seo.og_imagen',    label: 'Imagen Open Graph (URL)', placeholder: '/uploads/marca/og.jpg' },
    ],
  },
]

export default function AjustesPage() {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSection, setSavedSection] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/config')
      .then((r) => r.json())
      .then((d) => { setConfig(d ?? {}); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function handleChange(clave: string, valor: string) {
    setConfig((c) => ({ ...c, [clave]: valor }))
  }

  async function handleSave(claves: string[], titulo: string) {
    setSaving(true); setError(null); setSavedSection(null)
    const campos = Object.fromEntries(claves.map((k) => [k, config[k] ?? '']))
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campos }),
      })
      if (!res.ok) { setError(await res.text()); return }
      setSavedSection(titulo)
      setTimeout(() => setSavedSection(null), 2500)
    } catch { setError('Error de conexión.') }
    finally { setSaving(false) }
  }

  const inp: React.CSSProperties = { width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`, color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box' }
  const lbl: React.CSSProperties = { fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px' }

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '24px' }}>Ajustes</h1>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: S.muted2, fontSize: 13 }}>Cargando configuración...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {SECCIONES.map((seccion) => (
            <div key={seccion.titulo} style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '20px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '16px' }}>{seccion.titulo}</div>

              {seccion.campos.map((campo) => (
                <div key={campo.clave} style={{ marginBottom: '12px' }}>
                  <label style={lbl}>{campo.label}</label>
                  <input
                    style={inp}
                    type={campo.type ?? 'text'}
                    value={config[campo.clave] ?? ''}
                    placeholder={campo.placeholder}
                    onChange={(e) => handleChange(campo.clave, e.target.value)}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <button
                  onClick={() => handleSave(seccion.campos.map((c) => c.clave), seccion.titulo)}
                  disabled={saving}
                  style={{ background: S.red, color: '#fff', padding: '7px 16px', fontSize: '11px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? 'Guardando...' : 'Guardar sección'}
                </button>
                {savedSection === seccion.titulo && (
                  <span style={{ fontSize: '11px', color: S.green }}>Guardado</span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div style={{ background: 'rgba(230,57,70,0.08)', border: `0.5px solid rgba(230,57,70,0.2)`, borderRadius: '2px', padding: '12px 16px', fontSize: '12px', color: S.red }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
