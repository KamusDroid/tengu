import { NextResponse } from 'next/server'
import { shopDb } from '@/lib/dbShop'

export async function GET() {
  const products = await shopDb.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(products)
}
