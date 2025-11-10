import { NextResponse } from 'next/server'
import { shopDb } from '@/lib/dbShop'

function getMpAccessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) {
    throw new Error('MP_ACCESS_TOKEN no está definido')
  }
  return token
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const type = url.searchParams.get('type') ?? url.searchParams.get('topic')
    const id = url.searchParams.get('data.id') ?? url.searchParams.get('id')

    if (type !== 'payment' || !id) {
      // No nos interesa otro tipo de notificación
      return NextResponse.json({ ok: true })
    }

    const mpAccessToken = getMpAccessToken()

    // Consultar el pago en MP para obtener external_reference y status
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${mpAccessToken}`,
        },
      }
    )

    if (!paymentRes.ok) {
      console.error('No se pudo obtener el pago de MP', await paymentRes.text())
      return new NextResponse('Error consultando pago', { status: 500 })
    }

    const paymentData = (await paymentRes.json()) as {
      id: number
      status: string
      status_detail: string
      external_reference: string | null
    }

    const orderId = paymentData.external_reference
    if (!orderId) {
      console.error('Pago sin external_reference')
      return NextResponse.json({ ok: true })
    }

    const mpStatus = paymentData.status
    const mpStatusDetail = paymentData.status_detail

    // Mapear status de MP a status interno
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
  } catch (err) {
    console.error('Error en webhook de MP', err)
    return new NextResponse('Error en webhook', { status: 500 })
  }
}
