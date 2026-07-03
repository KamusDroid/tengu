import { redirect } from 'next/navigation'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'
import { FinanzasClient } from './finanzas-client'

export const dynamic = 'force-dynamic'

export default async function FacturacionPage() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) redirect('/')

  const [facturas, contratos, clientes] = await Promise.all([
    crmDb.invoice.findMany({
      where: { estado: { not: 'cancelled' } },
      orderBy: { emitidaEn: 'desc' },
      take: 100,
      include: { cliente: true },
    }),
    crmDb.billingClient.findMany({
      where: { estado: 'active', renovacionContrato: { not: null } },
      orderBy: { renovacionContrato: 'asc' },
    }),
    crmDb.billingClient.findMany({
      where: { estado: { in: ['active', 'prospect'] } },
      orderBy: { nombre: 'asc' },
    }),
  ])

  return (
    <FinanzasClient
      facturas={facturas.map((f) => ({
        id: f.id,
        numero: f.numero,
        clienteId: f.clienteId,
        clienteNombre: f.cliente.nombre,
        clienteEmail: f.cliente.email,
        subtotal: f.subtotal,
        tasaIva: f.tasaIva,
        total: f.total,
        moneda: f.moneda,
        estado: f.estado as 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled',
        emitidaEn: f.emitidaEn.toISOString(),
        venceEn: f.venceEn.toISOString(),
        descripcion: f.descripcion,
        items: f.items,
        notas: f.notas,
        datosPago: f.datosPago,
      }))}
      contratos={contratos.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        valorMensual: c.valorMensual,
        moneda: c.moneda,
        inicioContrato: c.inicioContrato ? c.inicioContrato.toISOString() : null,
        renovacionContrato: c.renovacionContrato ? c.renovacionContrato.toISOString() : null,
      }))}
      clientes={clientes.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        email: c.email,
        telefono: c.telefono,
        industria: c.industria,
        cuit: c.cuit,
        valorMensual: c.valorMensual,
        moneda: c.moneda,
        inicioContrato: c.inicioContrato ? c.inicioContrato.toISOString() : null,
        renovacionContrato: c.renovacionContrato ? c.renovacionContrato.toISOString() : null,
        estado: c.estado,
        datosPago: c.datosPago,
        notas: c.notas,
      }))}
    />
  )
}
