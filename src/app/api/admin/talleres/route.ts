import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

const TallerSchema = z.object({
  titulo: z.string().min(1),
  nivel: z.string().optional().nullable(),
  modalidad: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  precio: z.number().int().optional().nullable(),
  fecha: z.string().optional().nullable(),
  cupoMaximo: z.number().int().optional().nullable(),
  activo: z.boolean().default(true),
})

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const talleres = await crmDb.taller.findMany({
    orderBy: { fecha: 'asc' },
    include: { inscripciones: true },
  })
  return NextResponse.json(talleres)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = TallerSchema.parse(body)

  const taller = await crmDb.taller.create({
    data: {
      ...data,
      fecha: data.fecha ? new Date(data.fecha) : null,
    },
  })
  return NextResponse.json(taller)
}

export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const { id, ...rest } = body
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  const data = TallerSchema.parse(rest)
  const taller = await crmDb.taller.update({
    where: { id },
    data: { ...data, fecha: data.fecha ? new Date(data.fecha) : null },
  })
  return NextResponse.json(taller)
}

export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  await crmDb.taller.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
