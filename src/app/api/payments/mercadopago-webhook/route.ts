import { NextResponse } from 'next/server'
import { shopDb } from '@/lib/dbShop'

function getMpAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) {
    throw new Error('MP_ACCESS_TOKEN no está definido')
  }
  return token
}

type MpWebhookBody = {
  action?: string
  type?: string
  data?: { id?: string }
  id?: string
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)

    // 1) Intentar leer de query params (formato clásico: ?type=payment&data.id=123...)
    let type =
      url.searchParams.get('type') ?? url.searchParams.get('topic') ?? undefined
    let resourceId =
      url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? undefined

    // 2) Intentar leer del body (formato JSON que usaste en la prueba)
    let body: MpWebhookBody | null = null
    try {
      body = (await req.json()) as MpWebhookBody
    } catch {
      // Si no hay body o no es JSON, seguimos solo con los query params
    }

    if (body) {
      type = body.type ?? body.action ?? type
      resourceId = body.data?.id ?? body.id ?? resourceId
    }

    // Si no es un evento de pago o no hay id, simplemente respondemos OK
    if (!type || type !== 'payment' || !resourceId) {
      return NextResponse.json({ ok: true })
    }

    const mpAccessToken = getMpAccessToken()

    // 3) Consultar el pago en la API de MP
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${resourceId}`,
      {
        headers: {
          Authorization: `Bearer ${mpAccessToken}`,
        },
      }
    )

    // Si MP no reconoce el pago (como en la prueba con id 123456), no rompemos el webhook
    if (!paymentRes.ok) {
      // Podrías loguear esto en algún lado; aquí solo lo ignoramos para que MP reciba 200
      return NextResponse.json({ ok: true })
    }

    const paymentData = (await paymentRes.json()) as {
      id: number
      status: string
      status_detail: string
      external_reference: string | null
    }

    const orderId = paymentData.external_reference
    if (!orderId) {
      return NextResponse.json({ ok: true })
    }

    const mpStatus = paymentData.status
    const mpStatusDetail = paymentData.status_detail

    let internalStatus: string = 'pending'
    if (mpStatus === 'approved') {
      internalStatus = 'paid'
    } else if (mpStatus === 'rejected' || mpStatus === 'cancelled') {
      internalStatus = 'failed'
    }

    await shopDb.order.update({
      where: { id: orderId },
      data: {
        mpPaymentId: String(paymentData.id),
        mpStatus,
        mpStatusDetail,
        status: internalStatus,
      },
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Nunca devolvemos 500 a Mercado Pago, para que no quede como fallo
    return NextResponse.json({ ok: true })
  }
}
