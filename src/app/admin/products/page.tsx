// src/app/admin/products/page.tsx
import { redirect } from 'next/navigation'
import { getUserFromCookie, isAdmin } from '@/lib/auth'

export default async function AdminProductsPage() {
  const user = await getUserFromCookie()

  if (!user || !isAdmin(user)) {
    // Si no eres admin, volvemos al home
    redirect('/')
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Panel de productos (admin)</h1>
      <p>Si ves este texto, la ruta /admin/products está funcionando.</p>
    </div>
  )
}
