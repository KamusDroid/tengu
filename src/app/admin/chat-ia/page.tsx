'use client'

import { useEffect, useRef, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

type Config = {
  activo: boolean
  modoMantenimiento: boolean
  systemPrompt: string
  defaultSystemPrompt: string
  modeloActual: string
  groqConfigured: boolean
}

type ChatMsg = { role: 'user' | 'assistant'; content: string }

export default function ChatIAPage() {
  const [config, setConfig] = useState<Config | null>(null)
  const [prompt, setPrompt] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [showRestore, setShowRestore] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { load() }, [])
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMsgs])

  async function load() {
    const res = await fetch('/api/admin/chat-config')
    if (res.ok) {
      const data: Config = await res.json()
      setConfig(data)
      setPrompt(data.systemPrompt || data.defaultSystemPrompt)
    }
  }

  async function toggle(key: 'activo' | 'modoMantenimiento') {
    if (!config) return
    const newVal = !config[key]
    setConfig((c) => c ? { ...c, [key]: newVal } : c)
    await fetch('/api/admin/chat-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: newVal }),
    })
  }

  async function savePrompt() {
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch('/api/admin/chat-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: prompt }),
      })
      if (!res.ok) { setError(await res.text()); return }
      setSaved(true)
    } catch { setError('Error al guardar') }
    finally { setSaving(false) }
  }

  async function restoreDefault() {
    setSaving(true)
    try {
      await fetch('/api/admin/chat-config?key=chat.system_prompt', { method: 'DELETE' })
      if (config) setPrompt(config.defaultSystemPrompt)
      setSaved(false)
      setShowRestore(false)
    } finally { setSaving(false) }
  }

  async function sendChat() {
    if (!chatInput.trim()) return
    const userMsg: ChatMsg = { role: 'user', content: chatInput }
    setChatMsgs((m) => [...m, userMsg])
    setChatInput('')
    setChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMsgs, userMsg] }),
      })
      if (res.ok) {
        const data = await res.json()
        setChatMsgs((m) => [...m, { role: 'assistant', content: data.reply ?? data.message ?? '' }])
      }
    } catch { /* silencio */ }
    finally { setChatLoading(false) }
  }

  const tokenEstimate = Math.round(prompt.length / 4)

  const inp: React.CSSProperties = {
    background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px',
  }

  if (!config) return <div style={{ padding: '2rem', color: S.muted2, fontSize: 13 }}>Cargando...</div>

  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '24px' }}>Chat IA</h1>

      {/* Sección 1 — Estado */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Estado del servicio</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.activo ? S.green : S.muted2, display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: config.activo ? S.text : S.muted2 }}>
              Chat {config.activo ? 'activo' : 'desactivado'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.groqConfigured ? S.green : S.amber, display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: S.muted }}>
              GROQ_API_KEY {config.groqConfigured ? 'configurada' : 'no configurada'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(240,237,230,0.06)', color: S.muted2, fontFamily: 'monospace' }}>
              {config.modeloActual || 'llama-4-scout-17b-16e-instruct'}
            </span>
          </div>
        </div>
      </div>

      {/* Sección 2 — Toggles */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Configuración</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <ToggleRow
            label="Chat activo"
            desc="Muestra u oculta el widget de chat en el sitio"
            on={config.activo}
            onChange={() => toggle('activo')}
          />
          <ToggleRow
            label="Modo mantenimiento"
            desc="Muestra mensaje de mantenimiento en lugar del chat"
            on={config.modoMantenimiento}
            onChange={() => toggle('modoMantenimiento')}
          />
        </div>
      </div>

      {/* Sección 3 — Editor system prompt */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>System Prompt</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '12px' }}>{error}</div>}

        <textarea
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); setSaved(false) }}
          style={{
            ...inp, width: '100%', minHeight: '400px', resize: 'vertical',
            fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', color: S.muted2 }}>
            ~{tokenEstimate} tokens estimados ({prompt.length} caracteres)
          </span>
          {saved && <span style={{ fontSize: '11px', color: S.green }}>Guardado</span>}
        </div>
        <div style={{ fontSize: '11px', color: S.muted2, marginBottom: '14px', lineHeight: 1.5 }}>
          Este prompt define la personalidad y conocimiento del asistente TENGU. Los cambios se aplican en el próximo mensaje enviado.
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={savePrompt} disabled={saving} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : 'Guardar prompt'}
          </button>
          <button onClick={() => setShowPreview(true)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '8px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
            Vista previa
          </button>
          <button onClick={() => setShowRestore(true)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '8px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
            Restaurar default
          </button>
        </div>
      </div>

      {/* Sección 4 — Historial */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Historial de conversaciones</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontSize: '12px', color: S.muted2, marginBottom: '10px', lineHeight: 1.6 }}>
          El historial de conversaciones no está habilitado. Para activarlo, agregar una tabla <code style={{ fontFamily: 'monospace', fontSize: '11px', color: S.muted }}>ChatLog</code> al schema de crmDb.
        </p>
        <details style={{ cursor: 'pointer' }}>
          <summary style={{ fontSize: '11px', color: S.muted2, userSelect: 'none' }}>Ver schema SQL necesario</summary>
          <pre style={{ marginTop: '10px', padding: '12px', background: S.bg0, borderRadius: '2px', fontSize: '11px', color: S.muted, fontFamily: 'monospace', overflowX: 'auto' }}>
{`model ChatLog {
  id        String   @id @default(uuid())
  sessionId String
  role      String
  content   String
  createdAt DateTime @default(now())

  @@index([sessionId])
}`}
          </pre>
        </details>
      </div>

      {/* Sección 5 — Test del chat */}
      <div style={{ marginBottom: '10px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>Test del chat</div>
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ minHeight: '220px', maxHeight: '340px', overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {chatMsgs.length === 0 && (
            <div style={{ fontSize: '12px', color: S.muted2, textAlign: 'center', marginTop: '40px' }}>
              Escribí un mensaje para probar el chat con el prompt actual.
            </div>
          )}
          {chatMsgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '8px 12px', borderRadius: '2px', fontSize: '12px', lineHeight: 1.55,
                background: m.role === 'user' ? S.red : 'rgba(240,237,230,0.06)',
                color: m.role === 'user' ? '#fff' : S.muted,
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '8px 12px', background: 'rgba(240,237,230,0.06)', borderRadius: '2px', fontSize: '12px', color: S.muted2 }}>...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div style={{ borderTop: `0.5px solid ${S.border}`, padding: '10px 12px', display: 'flex', gap: '8px' }}>
          <input
            style={{ ...inp, flex: 1 }}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChat()}
            placeholder="Escribí un mensaje..."
            disabled={chatLoading}
          />
          <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} style={{ background: S.red, color: '#fff', padding: '8px 14px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: chatLoading ? 'default' : 'pointer', opacity: chatLoading || !chatInput.trim() ? 0.5 : 1 }}>
            Enviar
          </button>
        </div>
      </div>

      {/* Modal restaurar */}
      {showRestore && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }}>
          <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '24px', width: '380px' }}>
            <div style={{ fontSize: '14px', color: S.text, marginBottom: '10px', fontWeight: 500 }}>¿Restaurar prompt por defecto?</div>
            <p style={{ fontSize: '12px', color: S.muted2, marginBottom: '20px', lineHeight: 1.6 }}>
              El prompt personalizado guardado en la base de datos será eliminado y se usará el hardcodeado en groq.ts.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={restoreDefault} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}>Restaurar</button>
              <button onClick={() => setShowRestore(false)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '8px 14px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal vista previa */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowPreview(false)}>
          <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '24px', width: '600px', maxHeight: '70vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: S.text }}>Vista previa del prompt</span>
              <button onClick={() => setShowPreview(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <pre style={{ fontSize: '12px', color: S.muted, fontFamily: 'monospace', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
              {prompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

function ToggleRow({ label, desc, on, onChange }: { label: string; desc: string; on: boolean; onChange: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
      <div>
        <div style={{ fontSize: '13px', color: S.text, marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '11px', color: S.muted2 }}>{desc}</div>
      </div>
      <button onClick={onChange} style={{ width: '36px', height: '20px', borderRadius: '10px', border: 'none', background: on ? S.red : 'rgba(240,237,230,0.12)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: '3px', left: on ? '18px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
      </button>
    </div>
  )
}
