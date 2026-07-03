import { redirect } from 'next/navigation'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'
import { EditarFacturaClient } from './editar-factura-client'

export const dynamic = 'force-dynamic'

export default async function EditarFacturaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await getUserFromCookie()
  if (!isAdmin(user)) redirect('/')

  const factura = await crmDb.invoice.findUnique({
    where: { id },
    include: { cliente: true },
  })
  if (!factura) redirect('/admin/facturacion')

  const clientes = await crmDb.billingClient.findMany({
    where: { estado: { in: ['active', 'prospect'] } },
    orderBy: { nombre: 'asc' },
    select: { id: true, nombre: true },
  })

  let items: Array<{ descripcion: string; cantidad: number; precio: number }> = []
  try {
    items = JSON.parse(factura.items ?? '[]')
  } catch {
    items = []
  }

  return (
    <EditarFacturaClient
      factura={{
        id: factura.id,
        numero: factura.numero,
        clienteId: factura.clienteId,
        descripcion: factura.descripcion,
        moneda: factura.moneda,
        tasaIva: factura.tasaIva,
        venceEn: factura.venceEn.toISOString(),
        estado: factura.estado as 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled',
        notas: factura.notas,
        datosPago: factura.datosPago,
      }}
      items={items}
      clientes={clientes}
    />
  )
}
