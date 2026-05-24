import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { crmDb } from '@/lib/dbCrm'

const schema = z.object({
  tallerId: z.string().uuid(),
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().max(30).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const taller = await crmDb.taller.findUnique({ where: { id: data.tallerId } })
    if (!taller || !taller.activo) {
      return NextResponse.json({ error: 'Taller no disponible' }, { status: 404 })
    }

    if (taller.cupoMaximo) {
      const count = await crmDb.inscripcion.count({ where: { tallerId: data.tallerId } })
      if (count >= taller.cupoMaximo) {
        return NextResponse.json({ error: 'El taller no tiene cupos disponibles' }, { status: 409 })
      }
    }

    const existente = await crmDb.inscripcion.findFirst({
      where: { tallerId: data.tallerId, email: data.email },
    })
    if (existente) {
      return NextResponse.json({ error: 'Ya estás inscripto en este taller' }, { status: 409 })
    }

    const inscripcion = await crmDb.inscripcion.create({
      data: {
        tallerId: data.tallerId,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono ?? null,
        estado: 'pendiente',
      },
    })

    return NextResponse.json({ ok: true, id: inscripcion.id })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
