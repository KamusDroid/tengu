'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

type EmailLog = { id: string; userId: string; email: string; amount: number; currency: string; createdAt: string }
type SmtpStatus = { smtp_host: boolean; smtp_port: boolean; smtp_user: boolean; smtp_pass: boolean; smtp_from: boolean; admin_email: boolean }

const TRANSACCIONALES = [
  { id: 'welcome', label: 'Bienvenida', desc: 'Se envía cuando un usuario se registra' },
  { id: 'order_paid', label: 'Pago confirmado', desc: 'Se envía cuando se confirma un pago' },
  { id: 'inscripcion', label: 'Inscripción a taller', desc: 'Se envía cuando alguien se inscribe a un taller' },
]

export default function EmailPage() {
  const [smtp, setSmtp] = useState<SmtpStatus | null>(null)
  const [log, setLog] = useState<EmailLog[]>([])
  const [testEmail, setTestEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [testResult, setTestResult] = useState('')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [s, l] = await Promise.all([fetch('/api/admin/email-status'), fetch('/api/admin/email-log')])
    if (s.ok) setSmtp(await s.json())
    if (l.ok) setLog(await l.json())
  }

  async function sendTest() {
    if (!testEmail) return
    setSending(true); setTestResult('')
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail }),
      })
      setTestResult(res.ok ? 'Enviado correctamente' : await res.text())
    } catch { setTestResult('Error al enviar') }
    finally { setSending(false) }
  }

  const allOk = smtp && Object.values(smtp).every(Boolean)

  const inp: React.CSSProperties = {
    background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px',
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '24px' }}>Email</h1>

      {/* SMTP Status */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Estado SMTP</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{
            fontSize: '10px', padding: '2px 10px', borderRadius: '2px',
            background: allOk ? 'rgba(93,200,122,0.12)' : 'rgba(200,168,75,0.12)',
            color: allOk ? S.green : S.amber,
          }}>
            {allOk ? 'Configurado' : 'Incompleto'}
          </span>
        </div>
        {smtp && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {(Object.entries(smtp) as [string, boolean][]).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: v ? S.green : S.muted2 }}>{v ? '●' : '○'}</span>
                <span style={{ fontSize: '10px', color: v ? S.muted : S.muted2, fontFamily: 'monospace' }}>{k.toUpperCase()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emails transaccionales */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Emails transaccionales</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', marginBottom: '24px' }}>
        {TRANSACCIONALES.map((t, i) => (
          <div key={t.id} style={{ padding: '14px 20px', borderBottom: i < TRANSACCIONALES.length - 1 ? `0.5px solid ${S.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', color: S.text, marginBottom: '2px' }}>{t.label}</div>
              <div style={{ fontSize: '11px', color: S.muted2 }}>{t.desc}</div>
            </div>
            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(93,200,122,0.12)', color: S.green }}>Activo</span>
          </div>
        ))}
      </div>

      {/* Test email */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Email de prueba</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <input
            style={{ ...inp, flex: 1 }}
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
          <button onClick={sendTest} disabled={sending || !testEmail} style={{ background: S.red, color: '#fff', padding: '8px 16px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: sending ? 'default' : 'pointer', opacity: sending || !testEmail ? 0.6 : 1, whiteSpace: 'nowrap' }}>
            {sending ? 'Enviando...' : 'Enviar test'}
          </button>
        </div>
        {testResult && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: testResult === 'Enviado correctamente' ? S.green : S.red }}>{testResult}</div>
        )}
      </div>

      {/* Log reciente */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Últimas órdenes (log de pagos)</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Email', 'Monto', 'Fecha'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {log.map((l) => (
              <tr key={l.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '11px 14px', fontSize: '12px', color: S.muted }}>{l.email}</td>
                <td style={{ padding: '11px 14px', fontSize: '12px', color: S.text }}>
                  {(l.amount / 100).toLocaleString('es-AR', { style: 'currency', currency: l.currency.toUpperCase() })}
                </td>
                <td style={{ padding: '11px 14px', fontSize: '11px', color: S.muted2 }}>
                  {new Date(l.createdAt).toLocaleDateString('es-AR')}
                </td>
              </tr>
            ))}
            {log.length === 0 && (
              <tr><td colSpan={3} style={{ padding: '20px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin registros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
