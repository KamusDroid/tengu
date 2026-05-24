import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

const BlogSchema = z.object({
  titulo: z.string().min(1),
  slug: z.string().min(1),
  categoria: z.string().optional().nullable(),
  extracto: z.string().max(200).optional().nullable(),
  contenido: z.string().min(1),
  imagenUrl: z.string().optional().nullable(),
  publicado: z.boolean().default(false),
})

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const posts = await crmDb.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = BlogSchema.parse(body)

  const post = await crmDb.blogPost.create({
    data: {
      ...data,
      publishedAt: data.publicado ? new Date() : null,
    },
  })

  return NextResponse.json(post)
}

export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const { id, ...rest } = body
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  const data = BlogSchema.parse(rest)
  const existing = await crmDb.blogPost.findUnique({ where: { id } })

  const post = await crmDb.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.publicado && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null,
    },
  })

  return NextResponse.json(post)
}

export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  await crmDb.blogPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
