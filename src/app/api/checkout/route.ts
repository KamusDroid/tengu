import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { appendOrderRow } from '@/lib/sheets'
import { getUserFromCookie } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const items = body.items as { id:string, name:string, priceCents:number, currency:string, quantity:number }[]
  if (!items?.length) return new NextResponse('No hay items', { status: 400 })

  const user = getUserFromCookie()
  if (!user) return new NextResponse('No autenticado', { status: 401 })

  const totalCents = items.reduce((s,i)=> s + i.priceCents * i.quantity, 0)

  const order = await prisma.order.create({
    data: {
      userId: user.sub,
      totalCents,
      currency: items[0].currency || 'usd',
      status: 'pending',
      items: {
        create: items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          priceCents: i.priceCents,
          currency: i.currency || 'usd',
        }))
      }
    },
    include: { items: true }
  })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' })
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map(i => ({
      price_data: {
        currency: i.currency || 'usd',
        product_data: { name: i.name },
        unit_amount: i.priceCents,
      },
      quantity: i.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/marketplace?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/marketplace?status=cancel`,
    metadata: { orderId: order.id, userId: user.sub },
  })

  await prisma.order.update({ where: { id: order.id }, data: { stripeId: session.id } })

  try {
    await appendOrderRow([
      new Date().toISOString(), order.id, user.email || '', totalCents/100, order.currency, 'created'
    ])
  } catch (e) {
    console.error('Sheets append error', e)
  }

  return NextResponse.json({ url: session.url })
}