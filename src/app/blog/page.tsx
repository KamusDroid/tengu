import { crmDb } from '@/lib/dbCrm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)',
}

export const metadata = {
  title: 'Blog — TENGU',
  description: 'Artículos sobre desarrollo, inteligencia artificial y automatización.',
}

export default async function BlogPage() {
  const posts = await crmDb.blogPost.findMany({
    where: { publicado: true },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, titulo: true, slug: true, categoria: true, extracto: true, imagenUrl: true, publishedAt: true },
  })

  return (
    <main style={{ background: '#050507', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(40px,6vw,60px) clamp(16px,5vw,40px) 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)', marginBottom: '12px' }}>
          Blog TENGU
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 500, color: S.text, lineHeight: 1.1, marginBottom: '16px' }}>
          Ideas, técnica<br />y perspectiva.
        </h1>
        <p style={{ fontSize: '14px', color: S.muted, lineHeight: 1.8, maxWidth: '480px' }}>
          Artículos sobre desarrollo de software, inteligencia artificial, automatización y estrategia tecnológica.
        </p>
      </section>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.55) 30%, rgba(230,57,70,0.7) 50%, rgba(192,57,43,0.55) 70%, transparent)', margin: '0 0 48px' }} />

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: `0 clamp(16px,5vw,40px) 80px` }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: S.muted2, fontSize: '14px' }}>
            Próximamente. El blog está en construcción.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: S.border }}>
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: S.bg1, padding: '24px', height: '100%', cursor: 'pointer', transition: 'background 0.15s', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {p.imagenUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imagenUrl} alt={p.titulo} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '2px', marginBottom: '4px' }} />
                  )}
                  {p.categoria && (
                    <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)' }}>
                      {p.categoria}
                    </div>
                  )}
                  <h2 style={{ fontSize: '16px', fontWeight: 500, color: S.text, lineHeight: 1.3, margin: 0 }}>{p.titulo}</h2>
                  {p.extracto && (
                    <p style={{ fontSize: '12px', color: S.muted, lineHeight: 1.65, margin: 0, flex: 1 }}>{p.extracto}</p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: `0.5px solid ${S.border}` }}>
                    <span style={{ fontSize: '11px', color: S.muted2 }}>
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </span>
                    <span style={{ fontSize: '11px', color: S.red }}>Leer →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
