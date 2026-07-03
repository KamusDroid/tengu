'use client'

import { useEffect, useRef, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

const CARPETAS = ['productos', 'blog', 'academia', 'marca', 'equipo']

type Archivo = { name: string; url: string; size: number }

export default function MediosPage() {
  const [carpeta, setCarpeta] = useState('productos')
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [carpeta])

  async function load() {
    const res = await fetch(`/api/admin/medios?folder=${carpeta}`)
    if (res.ok) setArchivos(await res.json())
  }

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true); setError('')
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', carpeta)
      try {
        const res = await fetch('/api/admin/medios', { method: 'POST', body: fd })
        if (!res.ok) { setError(await res.text()); break }
      } catch { setError('Error al subir'); break }
    }
    setUploading(false)
    await load()
  }

  async function del(nombre: string) {
    if (!confirm(`¿Eliminar ${nombre}?`)) return
    await fetch('/api/admin/medios', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: `public/uploads/${carpeta}/${nombre}` }),
    })
    await load()
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(''), 2000)
  }

  function isImage(nombre: string) {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(nombre)
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Medios</h1>
        <button onClick={() => inputRef.current?.click()} disabled={uploading} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: uploading ? 'default' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
          {uploading ? 'Subiendo...' : '+ Subir archivo'}
        </button>
        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => upload(e.target.files)} />
      </div>

      {/* Selector de carpeta */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {CARPETAS.map((c) => (
          <button
            key={c}
            onClick={() => setCarpeta(c)}
            style={{
              padding: '6px 14px', fontSize: '11px', borderRadius: '2px', border: `0.5px solid ${S.border}`, cursor: 'pointer',
              background: carpeta === c ? S.red : 'transparent',
              color: carpeta === c ? '#fff' : S.muted,
              textTransform: 'capitalize',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {error && <div style={{ fontSize: '12px', color: S.red, background: 'rgba(230,57,70,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '16px' }}>{error}</div>}

      {/* Zona de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files) }}
        style={{
          border: `1px dashed ${dragging ? S.red : S.border}`,
          borderRadius: '2px', padding: '24px', textAlign: 'center',
          background: dragging ? 'rgba(230,57,70,0.04)' : 'transparent',
          marginBottom: '20px', transition: 'all 0.2s', cursor: 'pointer',
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div style={{ fontSize: '12px', color: S.muted2 }}>
          {dragging ? 'Soltar para subir' : 'Arrastrá archivos aquí o hacé clic para seleccionar'}
        </div>
        <div style={{ fontSize: '10px', color: S.muted2, marginTop: '4px' }}>Máx. 5 MB por archivo</div>
      </div>

      {/* Grid de archivos */}
      {archivos.length === 0 ? (
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '32px', textAlign: 'center', fontSize: '12px', color: S.muted2 }}>
          Sin archivos en /{carpeta}.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
          {archivos.map((a) => (
            <div key={a.name} style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              {isImage(a.name) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.url} alt={a.name} style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(240,237,230,0.03)', fontSize: '28px' }}>
                  📄
                </div>
              )}
              <div style={{ padding: '8px' }}>
                <div style={{ fontSize: '10px', color: S.muted2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>{a.name}</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => copyUrl(a.url)}
                    style={{ flex: 1, background: copied === a.url ? 'rgba(93,200,122,0.12)' : 'transparent', border: `0.5px solid ${S.border}`, color: copied === a.url ? S.green : S.muted2, padding: '3px 6px', fontSize: '9px', borderRadius: '2px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    {copied === a.url ? '✓ Copiado' : 'Copiar URL'}
                  </button>
                  <button
                    onClick={() => del(a.name)}
                    style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted2, padding: '3px 6px', fontSize: '9px', borderRadius: '2px', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
