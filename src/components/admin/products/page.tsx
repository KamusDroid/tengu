import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { AdminProductsManager } from '@/components/admin/AdminProductsManager'

export default async function AdminProductsPage() {
  const user = await getUserFromCookie()

  if (!user || !isAdmin(user)) {
    redirect('/')
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Administrar productos</h1>
      <AdminProductsManager initialProducts={products} />
    </div>
  )
}
