import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

const CreateSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().optional().nullable(),
  telefono: z.string().optional().nullable(),
  industria: z.string().optional().nullable(),
  cuit: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  valorMensualCents: z.number().int().nonnegative().default(0),
  moneda: z.string().default('ARS'),
  inicioContrato: z.string().optional().nullable(),
  renovacionContrato: z.string().optional().nullable(),
  datosPago: z.string().optional().nullable(),
  notas: z.string().optional().nullable(),
  estado: z.string().default('active'),
})

const UpdateSchema = CreateSchema.partial().extend({ id: z.string().min(1) })

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const clientes = await crmDb.billingClient.findMany({ orderBy: { nombre: 'asc' } })
  return NextResponse.json(clientes)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = CreateSchema.parse(body)

  const cliente = await crmDb.billingClient.create({
    data: {
      nombre: data.nombre,
      email: data.email ?? null,
      telefono: data.telefono ?? null,
      industria: data.industria ?? null,
      cuit: data.cuit ?? null,
      direccion: data.direccion ?? null,
      valorMensual: data.valorMensualCents,
      moneda: data.moneda,
      inicioContrato: data.inicioContrato ? new Date(data.inicioContrato) : null,
      renovacionContrato: data.renovacionContrato ? new Date(data.renovacionContrato) : null,
      datosPago: data.datosPago ?? null,
      notas: data.notas ?? null,
      estado: data.estado,
    },
  })

  return NextResponse.json(cliente)
}

export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const data = UpdateSchema.parse(body)
  const { id, ...rest } = data

  const cliente = await crmDb.billingClient.update({
    where: { id },
    data: {
      ...(rest.nombre !== undefined ? { nombre: rest.nombre } : {}),
      ...(rest.email !== undefined ? { email: rest.email } : {}),
      ...(rest.telefono !== undefined ? { telefono: rest.telefono } : {}),
      ...(rest.industria !== undefined ? { industria: rest.industria } : {}),
      ...(rest.cuit !== undefined ? { cuit: rest.cuit } : {}),
      ...(rest.direccion !== undefined ? { direccion: rest.direccion } : {}),
      ...(rest.valorMensualCents !== undefined ? { valorMensual: rest.valorMensualCents } : {}),
      ...(rest.moneda !== undefined ? { moneda: rest.moneda } : {}),
      ...(rest.inicioContrato !== undefined ? { inicioContrato: rest.inicioContrato ? new Date(rest.inicioContrato) : null } : {}),
      ...(rest.renovacionContrato !== undefined ? { renovacionContrato: rest.renovacionContrato ? new Date(rest.renovacionContrato) : null } : {}),
      ...(rest.datosPago !== undefined ? { datosPago: rest.datosPago } : {}),
      ...(rest.notas !== undefined ? { notas: rest.notas } : {}),
      ...(rest.estado !== undefined ? { estado: rest.estado } : {}),
    },
  })

  return NextResponse.json(cliente)
}
