'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n'

const badgeStyles: Record<string, { background: string; color: string }> = {
  red: { background: 'rgba(192,57,43,0.12)', color: 'rgba(192,57,43,0.8)' },
  blue: { background: 'rgba(12,68,124,0.18)', color: 'rgba(133,183,235,0.8)' },
  green: { background: 'rgba(39,80,10,0.2)', color: 'rgba(151,196,89,0.85)' },
}

export default function Proyectos() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { t } = useI18n()

  return (
    <section id="proyectos" style={{ padding: 'clamp(32px,6vw,56px) clamp(16px,5vw,40px)', background: '#050507' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', overflow: 'hidden' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(240,237,230,0.22)', flexShrink: 0 }}>
          Proyectos — ecosistema
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(192,57,43,0.18)', minWidth: '12px' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '10px' }}>
        {t.projects.map((project, index) => {
          const isHovered = hoveredId === project.nombre
          return (
            <div
              key={project.nombre}
              className="animate-fade-in-up"
              style={{
                background: '#111115', border: '0.5px solid rgba(192,57,43,0.18)', borderLeft: '2px solid #c0392b',
                padding: '18px', borderRadius: '1px', display: 'flex', flexDirection: 'column', gap: '8px',
                position: 'relative', overflow: 'hidden', cursor: 'default',
                animationDelay: `${index * 0.06}s`,
                transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 8px 32px rgba(192,57,43,0.18), 0 2px 8px rgba(192,57,43,0.1)' : 'none',
              }}
              onMouseEnter={() => setHoveredId(project.nombre)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.4), transparent)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.22s ease', pointerEvents: 'none' }} />
              {project.badge && project.badgeColor && (
                <span style={{ display: 'inline-flex', alignSelf: 'flex-start', fontSize: '10px', padding: '2px 8px', borderRadius: '1px', ...badgeStyles[project.badgeColor] }}>
                  {project.badge}
                </span>
              )}
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#f0ede6', lineHeight: 1.2 }}>{project.nombre}</div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(192,57,43,0.6)' }}>{project.categoria}</div>
              <div style={{ fontSize: '12px', color: 'rgba(240,237,230,0.38)', lineHeight: 1.55, flex: 1 }}>{project.descripcion}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {project.stack.map((tech) => (
                  <span key={tech} style={{ fontSize: '10px', color: 'rgba(240,237,230,0.24)', border: '0.5px solid rgba(240,237,230,0.09)', padding: '2px 5px', borderRadius: '1px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
