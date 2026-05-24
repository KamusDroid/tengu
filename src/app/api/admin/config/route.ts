import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const registros = await crmDb.configuracionSitio.findMany()
  const config = Object.fromEntries(registros.map((r) => [r.clave, r.valor]))
  return NextResponse.json(config)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const campos: Record<string, string> = body.campos ?? {}

  await Promise.all(
    Object.entries(campos).map(([clave, valor]) =>
      crmDb.configuracionSitio.upsert({
        where: { clave },
        update: { valor },
        create: { clave, valor },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
