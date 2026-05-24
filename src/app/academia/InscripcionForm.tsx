'use client'

import { useState } from 'react'

const S = {
  bg0: '#050507', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default function InscripcionForm({ tallerId, tallerTitulo }: { tallerId: string; tallerTitulo: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function field(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/public/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tallerId, ...form }),
      })
      if (res.ok) { setDone(true) }
      else { const d = await res.json(); setError(d.error ?? 'Error al inscribirse') }
    } catch { setError('Error de conexión') }
    finally { setSending(false) }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '9px 12px', fontSize: '13px', borderRadius: '2px',
    boxSizing: 'border-box', outline: 'none',
  }
  const lbl: React.CSSProperties = {
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
    color: S.muted2, display: 'block', marginBottom: '5px',
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ background: S.red, color: '#fff', padding: '10px 22px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer', letterSpacing: '1px' }}
      >
        Inscribirme
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)' }} onClick={() => !sending && setOpen(false)}>
          <div style={{ background: '#0d0d10', border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '28px', width: '380px', maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px', color: S.green }}>◆</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: S.text, marginBottom: '6px' }}>¡Inscripción recibida!</div>
                <div style={{ fontSize: '12px', color: S.muted2, marginBottom: '20px' }}>Te contactaremos para confirmar tu lugar en <strong style={{ color: S.text }}>{tallerTitulo}</strong>.</div>
                <button onClick={() => { setOpen(false); setDone(false); setForm({ nombre: '', email: '', telefono: '' }) }} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '8px 18px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: S.text, marginBottom: '4px' }}>Inscripción</div>
                  <div style={{ fontSize: '12px', color: S.muted2 }}>{tallerTitulo}</div>
                </div>
                {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>{error}</div>}
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                  <div><label style={lbl}>Nombre completo</label><input style={inp} required value={form.nombre} onChange={(e) => field('nombre', e.target.value)} /></div>
                  <div><label style={lbl}>Email</label><input style={inp} type="email" required value={form.email} onChange={(e) => field('email', e.target.value)} /></div>
                  <div><label style={lbl}>Teléfono (opcional)</label><input style={inp} value={form.telefono} onChange={(e) => field('telefono', e.target.value)} placeholder="+54 9 11..." /></div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button type="submit" disabled={sending} style={{ flex: 1, background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.6 : 1 }}>
                      {sending ? 'Enviando...' : 'Confirmar inscripción'}
                    </button>
                    <button type="button" onClick={() => setOpen(false)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '10px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
