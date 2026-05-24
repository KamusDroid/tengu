import { shopDb } from '@/lib/dbShop'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await shopDb.product.findUnique({ where: { id }, select: { name: true, description: true } })
  if (!product) return {}
  return {
    title: `${product.name} — TENGU Marketplace`,
    description: product.description ?? 'Producto digital de TENGU.',
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await shopDb.product.findUnique({ where: { id, active: true } })
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
