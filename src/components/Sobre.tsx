'use client'

import { useI18n } from '@/lib/i18n'
import ContactoForm from './ContactoForm'

export default function Sobre() {
  const { t } = useI18n()
  const { aboutContent } = t

  const contactItems = [
    { icon: '✆', label: 'WhatsApp', value: aboutContent.contacto.whatsapp },
    { icon: '@', label: 'Email', value: aboutContent.contacto.email },
    { icon: '◈', label: 'Instagram', value: aboutContent.contacto.instagram },
    { icon: 'in', label: 'LinkedIn', value: aboutContent.contacto.linkedin },
    { icon: '▲', label: 'Ubicación', value: aboutContent.contacto.ubicacion },
  ]

  return (
    <section id="sobre" style={{ borderBottom: '0.5px solid rgba(192,57,43,0.18)' }}>
      <style>{`
        @media (max-width: 767px) {
          #contacto { border-left: none !important; border-top: 0.5px solid rgba(192,57,43,0.18) !important; }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div style={{ padding: 'clamp(24px,5vw,40px)', background: 'linear-gradient(135deg, rgba(192,57,43,0.04) 0%, transparent 50%)' }}>
          <h2 style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 500, marginBottom: '14px', color: '#f0ede6' }}>
            {aboutContent.heading}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '13px', color: 'rgba(240,237,230,0.45)', lineHeight: 1.75, margin: 0 }}>{p}</p>
            ))}
          </div>
          <blockquote style={{ fontSize: '13px', fontWeight: 500, color: '#e63946', borderLeft: '2px solid #e63946', paddingLeft: '14px', marginTop: '16px', marginBottom: 0, lineHeight: 1.55, textShadow: '0 0 20px rgba(192,57,43,0.22)' }}>
            {aboutContent.highlight}
          </blockquote>
        </div>

        <div id="contacto" style={{ padding: 'clamp(24px,5vw,40px)', background: '#0d0d10', borderLeft: '0.5px solid rgba(192,57,43,0.18)' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(240,237,230,0.22)', marginBottom: '24px' }}>
            Contacto
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ width: '30px', height: '30px', background: 'rgba(192,57,43,0.1)', border: '0.5px solid rgba(192,57,43,0.18)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e63946', fontSize: '12px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(240,237,230,0.3)' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: '#f0ede6', fontWeight: 500 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '0.5px solid rgba(192,57,43,0.18)', paddingTop: '24px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(240,237,230,0.22)', marginBottom: '16px' }}>
              Envianos un mensaje
            </div>
            <ContactoForm />
          </div>
        </div>
      </div>
    </section>
  )
}
