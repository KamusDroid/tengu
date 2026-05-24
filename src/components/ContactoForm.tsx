'use client'

import { useState } from 'react'

const S = {
  bg0: '#050507', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default function ContactoForm() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function field(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/public/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setDone(true)
      else { const d = await res.json(); setError(d.error ?? 'Error al enviar') }
    } catch { setError('Error de conexión') }
    finally { setSending(false) }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '9px 12px', fontSize: '12px', borderRadius: '2px',
    boxSizing: 'border-box', outline: 'none',
  }
  const lbl: React.CSSProperties = {
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
    color: S.muted2, display: 'block', marginBottom: '5px',
  }

  if (done) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', color: S.green, marginBottom: '10px' }}>◆</div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: S.text, marginBottom: '6px' }}>Mensaje recibido</div>
        <div style={{ fontSize: '12px', color: S.muted2 }}>Te contactamos a la brevedad.</div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {error && (
        <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px' }}>{error}</div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div><label style={lbl}>Nombre</label><input style={inp} required value={form.nombre} onChange={(e) => field('nombre', e.target.value)} /></div>
        <div><label style={lbl}>Teléfono</label><input style={inp} value={form.telefono} onChange={(e) => field('telefono', e.target.value)} placeholder="+54 9 11..." /></div>
      </div>
      <div><label style={lbl}>Email</label><input style={inp} type="email" required value={form.email} onChange={(e) => field('email', e.target.value)} /></div>
      <div>
        <label style={lbl}>Mensaje (opcional)</label>
        <textarea style={{ ...inp, resize: 'vertical', minHeight: '80px' }} value={form.mensaje} onChange={(e) => field('mensaje', e.target.value)} placeholder="Contanos qué necesitás..." />
      </div>
      <button type="submit" disabled={sending} style={{ background: S.red, color: '#fff', padding: '10px 20px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.6 : 1, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {sending ? 'Enviando...' : 'Enviar consulta'}
      </button>
    </form>
  )
}
