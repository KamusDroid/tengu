import { crmDb } from '@/lib/dbCrm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const S = {
  border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await crmDb.blogPost.findUnique({ where: { slug }, select: { titulo: true, extracto: true } })
  if (!post) return {}
  return { title: `${post.titulo} — TENGU`, description: post.extracto ?? undefined }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await crmDb.blogPost.findUnique({ where: { slug } })
  if (!post || !post.publicado) notFound()

  return (
    <main style={{ background: '#050507', minHeight: '100vh', paddingTop: '80px' }}>
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(16px,5vw,40px) 80px' }}>
        {/* Back */}
        <Link href="/blog" style={{ fontSize: '11px', color: S.muted2, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '32px' }}>
          ← Blog
        </Link>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          {post.categoria && (
            <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)' }}>
              {post.categoria}
            </span>
          )}
          {post.publishedAt && (
            <span style={{ fontSize: '11px', color: S.muted2 }}>
              {new Date(post.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Título */}
        <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 500, color: S.text, lineHeight: 1.15, marginBottom: '20px' }}>
          {post.titulo}
        </h1>

        {/* Extracto */}
        {post.extracto && (
          <p style={{ fontSize: '15px', color: S.muted, lineHeight: 1.7, marginBottom: '32px', borderLeft: `2px solid ${S.red}`, paddingLeft: '16px', fontStyle: 'italic' }}>
            {post.extracto}
          </p>
        )}

        {/* Imagen */}
        {post.imagenUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.imagenUrl} alt={post.titulo} style={{ width: '100%', borderRadius: '2px', marginBottom: '32px', border: `0.5px solid ${S.border}` }} />
        )}

        {/* Divisor */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(192,57,43,0.55), transparent)', marginBottom: '32px' }} />

        {/* Contenido */}
        <div style={{ fontSize: '14px', color: S.muted, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
          {post.contenido}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ fontSize: '12px', color: S.red, textDecoration: 'none' }}>← Volver al blog</Link>
          <span style={{ fontSize: '11px', color: S.muted2 }}>TENGU</span>
        </div>
      </article>
    </main>
  )
}
