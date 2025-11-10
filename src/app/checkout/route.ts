import { NextResponse } from 'next/server'
import { z } from 'zod'
import { shopDb } from '@/lib/dbShop'
import { getUserFromCookie } from '@/lib/auth'
import { appendOrderRow } from '@/lib/sheets'

const itemSchema = z.object({
  id: z.string(), // id del producto
  quantity: z.number().int().min(1),
  // priceCents y currency pueden venir, pero NO los vamos a confiar
  priceCents: z.number().int().optional(),
  currency: z.string().optional(),
})

const schema = z.object({
  items: z.array(itemSchema),
})

function getMpAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) {
    throw new Error('MP_ACCESS_TOKEN no está definido')
  }
  return token
}

function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL
  if (!url) {
    throw new Error('NEXT_PUBLIC_APP_URL no está definido')
  }
  return url.replace(/\/$/, '')
}

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

    // 1) Traemos los productos desde la DB para evitar que el cliente manipule precios
    const productIds = items.map((i) => i.id)
    const products = await shopDb.product.findMany({
      where: { id: { in: productIds }, active: true },
    })

    if (products.length !== items.length) {
      return new NextResponse(
        'Algunos productos no existen o están inactivos',
        { status: 400 }
      )
    }

    // Mapear producto por id para lookup rápido
    const productMap = new Map(products.map((p) => [p.id, p]))

    // 2) Calcular total y preparar datos de items coherentes
    let totalCents = 0
    const orderItemsData = items.map((item) => {
      const product = productMap.get(item.id)
      if (!product) {
        throw new Error(`Producto no encontrado: ${item.id}`)
      }

      const lineTotal = product.priceCents * item.quantity
      totalCents += lineTotal

      return {
        productId: product.id,
        quantity: item.quantity,
        priceCents: product.priceCents,
        currency: product.currency,
      }
    })

    const currency = products[0]?.currency ?? 'ars'

    // 3) Crear la orden en la DB (status pending, sin MP aún)
    const order = await shopDb.order.create({
      data: {
        userId: user.userId,
        totalCents,
        currency,
        status: 'pending',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    })

    // 4) Crear preferencia de pago en Mercado Pago
    const appUrl = getAppUrl()
    const mpAccessToken = getMpAccessToken()

    const mpItems = order.items.map((item) => {
      const product = productMap.get(item.productId)!
      return {
        title: product.name,
        quantity: item.quantity,
        currency_id: product.currency.toUpperCase(), // ARS, USD, etc
        unit_price: product.priceCents / 100,
      }
    })

    const preferenceBody = {
      items: mpItems,
      payer: {
        email: user.email,
      },
      external_reference: order.id, // para poder mapear el pago a la orden
      back_urls: {
        success: `${appUrl}/checkout/success`,
        pending: `${appUrl}/checkout/pending`,
        failure: `${appUrl}/checkout/failure`,
      },
      auto_return: 'approved',
      notification_url: `${appUrl}/api/payments/mercadopago-webhook`,
    }

    const prefRes = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mpAccessToken}`,
        },
        body: JSON.stringify(preferenceBody),
      }
    )

    if (!prefRes.ok) {
      const text = await prefRes.text()
      console.error('Error al crear preferencia MP', text)
      return new NextResponse('Error al crear la preferencia de pago', {
        status: 502,
      })
    }

    const prefData = (await prefRes.json()) as {
      id: string
      init_point?: string
      sandbox_init_point?: string
    }

    // 5) Guardar id de preferencia en la orden
    await shopDb.order.update({
      where: { id: order.id },
      data: {
        mpPreferenceId: prefData.id,
      },
    })

    // 6) Log opcional en Google Sheets
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
    } catch (err) {
      console.error('Error al escribir en Google Sheets', err)
    }

    const redirectUrl =
      prefData.init_point ?? prefData.sandbox_init_point ?? null

    return NextResponse.json({
      id: order.id,
      mpPreferenceId: prefData.id,
      mpInitPoint: redirectUrl,
    })
  } catch (err) {
    console.error(err)
    return new NextResponse('Error en checkout', { status: 500 })
  }
}
