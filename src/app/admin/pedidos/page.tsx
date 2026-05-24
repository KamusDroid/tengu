import { shopDb } from '@/lib/dbShop'
import { authDb } from '@/lib/dbAuth'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  text: '#f0ede6', muted: 'rgba(240,237,230,0.45)', muted2: 'rgba(240,237,230,0.22)',
  green: '#5dc87a', amber: '#c8a84b', red: '#e63946',
}

const ESTADO: Record<string, { bg: string; color: string }> = {
  paid:    { bg: 'rgba(93,200,122,0.12)',  color: '#5dc87a' },
  pending: { bg: 'rgba(200,168,75,0.12)',  color: '#c8a84b' },
  failed:  { bg: 'rgba(230,57,70,0.12)',   color: '#e63946' },
}

export default async function PedidosPage() {
  const orders = await shopDb.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: { select: { name: true } } } } },
  })

  const userIds = [...new Set(orders.map((o) => o.userId))]
  const users = await authDb.user.findMany({ where: { id: { in: userIds } }, select: { id: true, email: true } })
  const emailMap = Object.fromEntries(users.map((u) => [u.id, u.email]))

  const thStyle: React.CSSProperties = { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: S.muted2, padding: '10px 14px', textAlign: 'left', borderBottom: `0.5px solid ${S.border}` }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', fontSize: 12, borderBottom: `0.5px solid ${S.border}` }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Pedidos</h1>
        <span style={{ fontSize: '12px', color: S.muted2 }}>{orders.length} pedidos en total</span>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
        {orders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: S.muted2, fontSize: 13 }}>No hay pedidos aún</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Email', 'Productos', 'Estado', 'Total', 'MP ID', 'Fecha'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const ec = ESTADO[o.status] ?? ESTADO.pending
                const email = emailMap[o.userId] ?? o.userId.slice(0, 8) + '…'
                const productos = o.items.map((i) => i.product.name).join(', ')
                return (
                  <tr key={o.id}>
                    <td style={{ ...tdStyle, color: S.muted2, fontFamily: 'monospace', fontSize: 11 }}>{o.id.slice(0, 8)}…</td>
                    <td style={{ ...tdStyle, color: S.muted }}>{email}</td>
                    <td style={{ ...tdStyle, color: S.muted2, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{productos || '—'}</td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: '2px', textTransform: 'uppercase', background: ec.bg, color: ec.color }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: S.text, fontWeight: 500 }}>
                      {(o.totalCents / 100).toLocaleString('es-AR', { style: 'currency', currency: o.currency.toUpperCase() })}
                    </td>
                    <td style={{ ...tdStyle, color: S.muted2, fontFamily: 'monospace', fontSize: 10 }}>{o.mpPaymentId ?? '—'}</td>
                    <td style={{ ...tdStyle, color: S.muted2 }}>{new Date(o.createdAt).toLocaleDateString('es-AR')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
