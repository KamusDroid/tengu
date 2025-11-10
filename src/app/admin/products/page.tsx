import { redirect } from 'next/navigation'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { shopDb } from '@/lib/dbShop'
import { AdminProductsManager } from '@/app/admin/AdminProductsManager'

export default async function AdminProductsPage() {
  const user = await getUserFromCookie()

  // Solo admins pueden entrar
  if (!user || !isAdmin(user)) {
    redirect('/')
  }

  // Traemos todos los productos (activos e inactivos) para poder gestionarlos
  const products = await shopDb.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Administrar productos</h1>
      <AdminProductsManager initialProducts={products} />
    </div>
  )
}
