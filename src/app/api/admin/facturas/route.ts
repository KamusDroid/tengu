import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

const CreateSchema = z.object({
  clienteId: z.string().min(1),
  descripcion: z.string().optional().nullable(),
  items: z.string().optional().nullable(),
  subtotalCents: z.number().int().nonnegative(),
  tasaIva: z.number(),
  moneda: z.string().default('ARS'),
  venceEn: z.string().min(1),
  estado: z.enum(['draft', 'sent']).default('draft'),
  notas: z.string().optional().nullable(),
  datosPago: z.string().optional().nullable(),
})

const UpdateSchema = z.object({
  id: z.string().min(1),
  estado: z.enum(['draft', 'sent', 'paid', 'overdue']).optional(),
  descripcion: z.string().optional().nullable(),
  items: z.string().optional().nullable(),
  subtotalCents: z.number().int().nonnegative().optional(),
  tasaIva: z.number().optional(),
  venceEn: z.string().optional(),
  notas: z.string().optional().nullable(),
  datosPago: z.string().optional().nullable(),
})

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const facturas = await crmDb.invoice.findMany({
    where: { estado: { not: 'cancelled' } },
    orderBy: { emitidaEn: 'desc' },
    include: { cliente: true },
  })
  return NextResponse.json(facturas)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = CreateSchema.parse(body)

  const count = await crmDb.invoice.count()
  const now = new Date()
  const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  const seq = String(count + 1).padStart(3, '0')
  const numero = `FAC-${yyyymm}-${seq}`

  const montoIva = Math.round(data.subtotalCents * (data.tasaIva / 100))
  const total = data.subtotalCents + montoIva

  const factura = await crmDb.invoice.create({
    data: {
      numero,
      clienteId: data.clienteId,
      descripcion: data.descripcion ?? null,
      items: data.items ?? null,
      subtotal: data.subtotalCents,
      tasaIva: data.tasaIva,
      montoIva,
      total,
      moneda: data.moneda,
      estado: data.estado,
      venceEn: new Date(data.venceEn),
      notas: data.notas ?? null,
      datosPago: data.datosPago ?? null,
    },
  })

  return NextResponse.json(factura)
}

export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = UpdateSchema.parse(body)
  const { id, ...rest } = data

  let montoIva: number | undefined
  let total: number | undefined
  if (rest.subtotalCents !== undefined) {
    const existing = await crmDb.invoice.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
    const tasaIva = rest.tasaIva ?? existing.tasaIva
    montoIva = Math.round(rest.subtotalCents * (tasaIva / 100))
    total = rest.subtotalCents + montoIva
  }

  const factura = await crmDb.invoice.update({
    where: { id },
    data: {
      ...(rest.estado !== undefined ? { estado: rest.estado } : {}),
      ...(rest.descripcion !== undefined ? { descripcion: rest.descripcion } : {}),
      ...(rest.items !== undefined ? { items: rest.items } : {}),
      ...(rest.subtotalCents !== undefined ? { subtotal: rest.subtotalCents, montoIva, total } : {}),
      ...(rest.tasaIva !== undefined ? { tasaIva: rest.tasaIva } : {}),
      ...(rest.venceEn !== undefined ? { venceEn: new Date(rest.venceEn) } : {}),
      ...(rest.notas !== undefined ? { notas: rest.notas } : {}),
      ...(rest.datosPago !== undefined ? { datosPago: rest.datosPago } : {}),
      ...(rest.estado === 'paid' ? { pagadaEn: new Date() } : {}),
    },
  })

  return NextResponse.json(factura)
}
