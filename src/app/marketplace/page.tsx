import { shopDb } from '@/lib/dbShop'
import MarketplaceClient from './MarketplaceClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Marketplace — TENGU',
  description: 'Productos y servicios digitales. Herramientas, templates y soluciones listas para usar.',
}

export default async function MarketplacePage() {
  const products = await shopDb.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  return <MarketplaceClient products={products} />
}
