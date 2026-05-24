import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { crmDb } from '@/lib/dbCrm'

const schema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().max(30).optional(),
  mensaje: z.string().min(5).max(2000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await crmDb.customer.create({
      data: {
        fullName: data.nombre,
        email: data.email,
        phone: data.telefono ?? null,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
