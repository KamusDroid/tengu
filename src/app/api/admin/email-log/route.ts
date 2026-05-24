import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { shopDb } from '@/lib/dbShop'
import { authDb } from '@/lib/dbAuth'

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const orders = await shopDb.order.findMany({
    where: { status: 'paid' },
    orderBy: { updatedAt: 'desc' },
    take: 10,
    select: { id: true, userId: true, totalCents: true, currency: true, updatedAt: true },
  })

  const userIds = [...new Set(orders.map((o) => o.userId))]
  const users = await authDb.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true },
  })
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.email]))

  const result = orders.map((o) => ({
    orderId: o.id,
    email: userMap[o.userId] ?? 'Desconocido',
    totalCents: o.totalCents,
    currency: o.currency,
    fecha: o.updatedAt,
    tipoEmail: 'Confirmación de pago',
  }))

  return NextResponse.json(result)
}
