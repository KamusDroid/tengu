'use client'

import { useI18n } from '@/lib/i18n'

export default function Servicios() {
  const { t } = useI18n()

  return (
    <section id="servicios" style={{ padding: 'clamp(32px,6vw,56px) clamp(16px,5vw,40px)', background: '#050507' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', overflow: 'hidden' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(240,237,230,0.22)', flexShrink: 0 }}>
          Servicios — 6 disciplinas
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(192,57,43,0.18)', minWidth: '12px' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1px', background: 'rgba(192,57,43,0.18)' }}>
        {t.services.map((s) => (
          <div key={s.numero} style={{ background: '#050507', padding: '24px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: '10px', color: 'rgba(192,57,43,0.5)', marginBottom: '6px' }}>{s.numero}</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#f0ede6', marginBottom: '8px' }}>{s.titulo}</div>
            <div style={{ fontSize: '12px', color: 'rgba(240,237,230,0.38)', lineHeight: 1.55 }}>{s.descripcion}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '10px' }}>
              {s.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '10px', color: 'rgba(240,237,230,0.24)', border: '0.5px solid rgba(240,237,230,0.09)', padding: '2px 6px', borderRadius: '1px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
