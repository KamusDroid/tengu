import { NextResponse } from 'next/server'
import { z } from 'zod'
import { shopDb } from '@/lib/dbShop'
import { getUserFromCookie } from '@/lib/auth'
import { appendOrderRow } from '@/lib/sheets'

// Tipos mínimos para que TS esté contento
type DbProduct = {
  id: string
  name: string
  priceCents: number
  currency: string
}
type DbOrderItem = {
  productId: string
  quantity: number
}

const itemSchema = z.object({
  id: z.string(), // id del producto
  quantity: z.number().int().min(1),
  // del cliente pueden venir priceCents/currency, pero no confiamos en ellos
  priceCents: z.number().int().optional(),
  currency: z.string().optional(),
})
const schema = z.object({ items: z.array(itemSchema) })

function getMpAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) throw new Error('MP_ACCESS_TOKEN no está definido')
  return token
}
function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL
  if (!url) throw new Error('NEXT_PUBLIC_APP_URL no está definido')
  return url.replace(/\/$/, '')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.parse(body)
    const items = parsed.items

    if (!items.length) {
      return new NextResponse('No hay items en el carrito', { status: 400 })
    }

    const user = await getUserFromCookie()
    if (!user?.userId) {
      return new NextResponse('Debes iniciar sesión para comprar', { status: 401 })
    }

    // 1) Traer productos de la DB (no confiamos en precios del cliente)
    const productIds = items.map((i) => i.id)
    const products = (await shopDb.product.findMany({
      where: { id: { in: productIds }, active: true },
    })) as DbProduct[]

    if (products.length !== items.length) {
      return new NextResponse('Algunos productos no existen o están inactivos', { status: 400 })
    }

    const getProductById = (id: string): DbProduct => {
      const p = products.find((x) => x.id === id)
      if (!p) throw new Error(`Producto no encontrado: ${id}`)
      return p
    }

    // 2) Calcular total y preparar items de la orden
    let totalCents = 0
    const orderItemsData = items.map((i) => {
      const p = getProductById(i.id)
      totalCents += p.priceCents * i.quantity
      return {
        productId: p.id,
        quantity: i.quantity,
        priceCents: p.priceCents,
        currency: p.currency,
      }
    })
    const currency = products[0]?.currency ?? 'ars'

    // 3) Crear la orden en la DB
    const order = await shopDb.order.create({
      data: {
        userId: user.userId,
        totalCents,
        currency,
        status: 'pending',
        items: { create: orderItemsData },
      },
      include: { items: true },
    })

    // 4) Crear preferencia en Mercado Pago
    const appUrl = getAppUrl()
    const token = getMpAccessToken()
    const isTest = token.startsWith('TEST-')

    const mpItems = order.items.map((item: DbOrderItem) => {
      const p = getProductById(item.productId)
      return {
        title: p.name,
        quantity: item.quantity,
        currency_id: p.currency.toUpperCase(), // ARS, USD, etc
        unit_price: p.priceCents / 100,
      }
    })

    const preferenceBody = {
      items: mpItems,
      payer: { email: user.email },
      external_reference: order.id,
      back_urls: {
        success: `${appUrl}/checkout/success`,
        pending: `${appUrl}/checkout/pending`,
        failure: `${appUrl}/checkout/failure`,
      },
      auto_return: 'approved' as const,
      notification_url: `${appUrl}/api/payments/mercadopago-webhook`,
    }

    const prefRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferenceBody),
    })

    if (!prefRes.ok) {
      return new NextResponse('Error al crear la preferencia de pago', { status: 502 })
    }

    const prefData = (await prefRes.json()) as {
      id: string
      init_point?: string
      sandbox_init_point?: string
    }

    // Guardar id de preferencia
    await shopDb.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: prefData.id },
    })

    // Log opcional en Google Sheets (no bloquea el checkout si falla)
    try {
      if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
        await appendOrderRow([
          order.id,
          user.email,
          new Date().toISOString(),
          totalCents,
          currency,
          JSON.stringify(orderItemsData),
        ])
      }
    } catch {
      /* noop */
    }

    // URL correcta según entorno: init_point (PROD) / sandbox_init_point (TEST)
    const redirectUrl = isTest
      ? prefData.sandbox_init_point ?? prefData.init_point ?? null
      : prefData.init_point ?? prefData.sandbox_init_point ?? null

    return NextResponse.json({
      id: order.id,
      mpPreferenceId: prefData.id,
      mpInitPoint: redirectUrl,
    })
  } catch {
    return new NextResponse('Error en checkout', { status: 500 })
  }
}
