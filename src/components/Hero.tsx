'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n'
import AudioRing from '@/components/AudioRing'
import { subscribeAudioFrame, pulseLevel, PULSE_GAIN, PULSE_AMOUNT } from '@/lib/audioReactive'

export default function Hero() {
  const { t } = useI18n()
  const heroContent = t.heroContent
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return subscribeAudioFrame((data) => {
      const level = pulseLevel(data, PULSE_GAIN)
      if (pulseRef.current) {
        pulseRef.current.style.transform = `scale(${1 + level * PULSE_AMOUNT})`
      }
    })
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* CAPA -1 — Fondo base: oscuro con glows rojos tenues. Se ve solo (sin video) en mobile. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 55% 45% at 25% 20%, rgba(230,57,70,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 75%, rgba(192,57,43,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 60% 15%, rgba(230,57,70,0.06) 0%, transparent 55%),
            #050507
          `,
        }}
      />

      {/* CAPA 0 — Video de fondo (solo desktop: el <source> con media query hace que en mobile
          el navegador ni siquiera lo descargue/decodifique, evitando el lag) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.99,
        }}
      >
        <source media="(min-width: 769px)" src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* CAPA 1 — Overlay oscuro + glow radial sobre el video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse 60% 80% at 72% 50%, rgba(192,57,43,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 72% 50%, rgba(230,57,70,0.10) 0%, transparent 55%),
            rgba(5,5,7,0.45)
          `,
        }}
      />

      {/* CAPA 2 — Glow difuso detrás del Tomoe */}
      <div
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(192,57,43,0.3) 0%, rgba(192,57,43,0.08) 45%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* CAPA 3 — Tomoe girando + aro de luz neon separado, reacciona a --audio-level (seteado por MusicPlayer) */}
      <div
        style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '420px',
          height: '420px',
          zIndex: 3,
        }}
      >
        {/* Aro neon ondulante, separado del tomoe por espacio, se deforma con el audio */}
        <AudioRing />
        {/* Wrapper que pulsa (escala uniforme) con el audio, separado del giro para no deformar la imagen */}
        <div
          ref={pulseRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
            transition: 'transform 0.08s ease-out',
          }}
        >
          <Image
            src="/tomoe.png"
            alt=""
            fill
            priority
            sizes="420px"
            style={{
              objectFit: 'contain',
              animation: 'spin 18s linear infinite',
              transformOrigin: 'center center',
              filter:
                'drop-shadow(0 0 28px rgba(192,57,43,0.6)) drop-shadow(0 0 70px rgba(192,57,43,0.22))',
              opacity: 0.85,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* CAPA 4 — Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          padding: '56px 40px',
          maxWidth: '580px',
        }}
      >
        {/* Kicker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ width: '28px', height: '1px', background: 'rgba(240,237,230,0.55)', flexShrink: 0 }} />
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: 'rgba(240,237,230,0.55)',
            }}
          >
            {heroContent.kicker}
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(35px, 5vw, 50px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f0ede6',
            marginBottom: '20px',
          }}
        >
          {heroContent.headingLine1}
          <br />
          {heroContent.headingMiddle}{' '}
          <em
            style={{
              fontStyle: 'normal',
              color: '#e63946',
              textShadow:
                '0 0 30px rgba(230,57,70,0.5), 0 0 60px rgba(192,57,43,0.22)',
            }}
          >
            {heroContent.headingWord}
          </em>
          <br />
          {heroContent.headingLine2}
        </h1>

        {/* Párrafo */}
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(240,237,230,0.45)',
            lineHeight: 1.8,
            maxWidth: '440px',
            marginBottom: '32px',
          }}
        >
          {heroContent.description}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href={heroContent.cta.href}
            style={{
              background: '#e63946',
              color: '#fff',
              padding: '12px 26px',
              fontSize: '13px',
              borderRadius: '1px',
              boxShadow: '0 0 24px rgba(192,57,43,0.4)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {heroContent.cta.label}
          </a>
          <a
            href={heroContent.ctaSecundario.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '0.5px solid rgba(192,57,43,0.3)',
              color: '#e63946',
              background: 'transparent',
              padding: '12px 26px',
              fontSize: '13px',
              borderRadius: '1px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {heroContent.ctaSecundario.label}
          </a>
        </div>
      </div>
    </section>
  )
}
