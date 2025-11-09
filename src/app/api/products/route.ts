import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { getUserFromCookie, isAdmin } from '@/lib/auth'

const baseProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal(''))
    .nullable(),
  priceCents: z.number().int().positive(),
  currency: z.string().min(1),
  active: z.boolean().optional().default(true),
})

const createSchema = baseProductSchema
const updateSchema = baseProductSchema.extend({
  id: z.string(),
})

// GET → público (para marketplace)
export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(products)
}

// POST → crear producto (solo admin)
export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) {
    return new NextResponse('No autorizado', { status: 403 })
  }

  const body = await req.json()
  const data = createSchema.parse(body)

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl || null,
      priceCents: data.priceCents,
      currency: data.currency,
      active: data.active ?? true,
    },
  })

  return NextResponse.json(product)
}

// PUT → actualizar producto (solo admin)
export async function PUT(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) {
    return new NextResponse('No autorizado', { status: 403 })
  }

  const body = await req.json()
  const data = updateSchema.parse(body)

  const product = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl || null,
      priceCents: data.priceCents,
      currency: data.currency,
      active: data.active ?? true,
    },
  })

  return NextResponse.json(product)
}

// DELETE → eliminar producto (solo admin)
export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) {
    return new NextResponse('No autorizado', { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return new NextResponse('Falta id', { status: 400 })
  }

  await prisma.product.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
