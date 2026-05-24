import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { shopDb } from '@/lib/dbShop'

const CuponSchema = z.object({
  codigo: z.string().min(1).max(50),
  tipo: z.enum(['porcentaje', 'monto_fijo']).default('porcentaje'),
  valor: z.number().int().positive(),
  minimo: z.number().int().optional().nullable(),
  usosMaximos: z.number().int().optional().nullable(),
  fechaExpira: z.string().optional().nullable(),
  activo: z.boolean().default(true),
})

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const cupones = await shopDb.cupon.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(cupones)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = CuponSchema.parse({ ...body, codigo: body.codigo?.toUpperCase() })

  const cupon = await shopDb.cupon.create({
    data: {
      codigo: data.codigo,
      tipo: data.tipo,
      valor: data.valor,
      minimo: data.minimo ?? null,
      usosMaximos: data.usosMaximos ?? null,
      fechaExpira: data.fechaExpira ? new Date(data.fechaExpira) : null,
      activo: data.activo,
    },
  })

  return NextResponse.json(cupon)
}

export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  await shopDb.cupon.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
