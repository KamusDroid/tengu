import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { appendOrderRow } from '@/lib/sheets'

const itemSchema = z.object({
  id: z.string(), // id del producto
  quantity: z.number().int().min(1),
  priceCents: z.number().int(),
  currency: z.string(),
})

const schema = z.object({
  items: z.array(itemSchema),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items } = schema.parse(body)

    if (!items.length) {
      return new NextResponse('No hay items en el carrito', { status: 400 })
    }

    const user = await getUserFromCookie()
    if (!user?.userId) {
      return new NextResponse('Debes iniciar sesión para comprar', {
        status: 401,
      })
    }

    const totalCents = items.reduce(
      (sum, item) => sum + item.priceCents * item.quantity,
      0
    )

    const currency = items[0].currency || 'usd'

    // Creamos los datos comunes de items
    const itemsData = {
      create: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        priceCents: item.priceCents,
        currency: item.currency,
      })),
    }

    const order = await prisma.order.create({
      data: {
        totalCents,
        currency,
        status: 'pending',
        user: {
          connect: { id: user.userId },
        },
        items: itemsData,
      },
    })

    // Opcional: log a Google Sheets si está configurado
    try {
      if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
        await appendOrderRow([
          order.id,
          user?.email ?? 'anon',
          new Date().toISOString(),
          totalCents,
          currency,
          JSON.stringify(items),
        ])
      }
    } catch (err) {
      console.error('Error al escribir en Google Sheets', err)
    }

    return NextResponse.json({ id: order.id })
  } catch (err) {
    console.error(err)
    return new NextResponse('Error en checkout', { status: 500 })
  }
}
