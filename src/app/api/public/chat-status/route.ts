import { NextResponse } from 'next/server'
import { crmDb } from '@/lib/dbCrm'

export async function GET() {
  try {
    const configs = await crmDb.configuracionSitio.findMany({
      where: { clave: { in: ['chat.activo', 'chat.modo_mantenimiento'] } },
    })
    const map = Object.fromEntries(configs.map((c) => [c.clave, c.valor]))
    return NextResponse.json({
      activo: map['chat.activo'] !== 'false',
      modoMantenimiento: map['chat.modo_mantenimiento'] === 'true',
    })
  } catch {
    return NextResponse.json({ activo: true, modoMantenimiento: false })
  }
}
