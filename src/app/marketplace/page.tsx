import { redirect } from 'next/navigation'
import { getUserFromCookie } from '@/lib/auth'
import MarketplaceClient from './MarketplaceClient'

export default async function MarketplacePage() {
  const user = await getUserFromCookie()

  if (!user) {
    redirect('/login')
  }

  return <MarketplaceClient />
}
