import { redirect } from 'next/navigation'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { shopDb } from '@/lib/dbShop'
import { authDb } from '@/lib/dbAuth'
import { crmDb } from '@/lib/dbCrm'

const S = {
  bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

export default async function AdminDashboard() {
  const user = await getUserFromCookie()
  if (!user || !isAdmin(user)) redirect('/')

  const [productos, ordenes, usuarios, clientes] = await Promise.all([
    shopDb.product.count(),
    shopDb.order.count({ where: { status: 'paid' } }),
    authDb.user.count(),
    crmDb.customer.count(),
  ])

  const ordenesRecientes = await shopDb.order.findMany({
    where: { status: 'paid' },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, totalCents: true, currency: true, updatedAt: true },
  })

  const metrics = [
    { label: 'Productos activos', value: productos, color: S.red },
    { label: 'Órdenes pagadas', value: ordenes, color: S.green },
    { label: 'Usuarios registrados', value: usuarios, color: S.amber },
    { label: 'Clientes CRM', value: clientes, color: '#4a9abb' },
  ]

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '4px' }}>Dashboard</h1>
        <p style={{ fontSize: '12px', color: S.muted2 }}>Bienvenido, {user.email}</p>
      </div>

      {/* Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: S.border, marginBottom: '24px' }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: S.bg2, padding: '20px 16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 500, color: m.color, lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2, marginTop: '6px' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Órdenes recientes */}
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <div style={{ padding: '14px 18px', borderBottom: `0.5px solid ${S.border}`, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }}>
          Órdenes recientes
        </div>
        {ordenesRecientes.length === 0 ? (
          <div style={{ padding: '20px 18px', fontSize: '12px', color: S.muted2 }}>Sin órdenes aún.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
                {['ID', 'Total', 'Fecha'].map((h) => (
                  <th key={h} style={{ padding: '8px 18px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordenesRecientes.map((o) => (
                <tr key={o.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                  <td style={{ padding: '10px 18px', fontSize: '11px', color: S.muted, fontFamily: 'monospace' }}>{o.id.slice(0, 8)}...</td>
                  <td style={{ padding: '10px 18px', fontSize: '12px', color: S.text }}>
                    {(o.totalCents / 100).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                  </td>
                  <td style={{ padding: '10px 18px', fontSize: '11px', color: S.muted2 }}>
                    {new Date(o.updatedAt).toLocaleDateString('es-AR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
