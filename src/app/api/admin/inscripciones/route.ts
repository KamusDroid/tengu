import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const inscripciones = await crmDb.inscripcion.findMany({
    orderBy: { createdAt: 'desc' },
    include: { taller: { select: { titulo: true } } },
  })
  return NextResponse.json(inscripciones)
}

export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { id, estado } = await req.json()
  if (!id || !estado) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })

  const updated = await crmDb.inscripcion.update({
    where: { id },
    data: { estado },
  })
  return NextResponse.json(updated)
}
