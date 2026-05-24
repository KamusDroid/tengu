'use client'

import { useI18n } from '@/lib/i18n'

export default function MetricasBar() {
  const { t } = useI18n()

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(192,57,43,0.04) 0%, #050507 100%)' }}>
      <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: '0.5px', background: 'rgba(192,57,43,0.18)' }}>
        {t.metricas.map((m, i) => (
          <div
            key={m.label}
            className={i === t.metricas.length - 1 ? 'col-span-2 md:col-span-1' : ''}
            style={{ background: '#050507', padding: 'clamp(16px,3vw,22px) clamp(16px,3vw,24px)' }}
          >
            <div style={{ lineHeight: 1, marginBottom: '6px' }}>
              <span style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 500, color: '#f0ede6' }}>{m.valor}</span>
              <span style={{ fontSize: 'clamp(14px,2.5vw,18px)', color: '#e63946' }}>{m.sufijo}</span>
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(240,237,230,0.22)' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
