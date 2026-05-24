import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '18px clamp(16px,5vw,40px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        background: '#050507',
        borderTop: '0.5px solid rgba(192,57,43,0.18)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Image
          src="/tomoe.png"
          width={18}
          height={18}
          alt=""
          aria-hidden
          style={{ opacity: 0.3, animation: 'spin 12s linear infinite' }}
        />
        <span style={{ fontSize: '11px', color: 'rgba(240,237,230,0.55)' }}>
          © 2026 TENGU · Walter Matías Amengual · tengu.com.ar
        </span>
      </div>
      <span
        style={{
          fontSize: '11px',
          color: 'rgba(240,237,230,0.38)',
          textAlign: 'right',
        }}
      >
        Desarrollo software a medida Argentina · IA para empresas · Buenos Aires
      </span>
    </footer>
  )
}
