import { shopDb } from '@/lib/dbShop'
import { authDb } from '@/lib/dbAuth'

export const dynamic = 'force-dynamic'

const S = {
  bg0: '#050507', bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

function fmt(cents: number) {
  return (cents / 100).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{
            width: '100%', borderRadius: '2px 2px 0 0', minHeight: 2,
            background: d.value > 0 ? `linear-gradient(to top, rgba(192,57,43,0.8), rgba(230,57,70,0.4))` : 'rgba(240,237,230,0.04)',
            height: `${Math.max((d.value / max) * 100, d.value > 0 ? 4 : 2)}%`,
            transition: 'height .3s',
          }} />
          {data.length <= 14 && (
            <span style={{ fontSize: 7, color: S.muted2, transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>{d.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}

const ESTADO_COLOR: Record<string, string> = {
  paid: S.green, pending: S.amber, failed: 'rgba(230,57,70,0.7)',
}

export default async function AnaliticaPage() {
  const now = new Date()
  const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1)
  const primerDiaMesAnt = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const hace30dias = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [
    ordenesMes,
    ordenesAnt,
    ordenes30dias,
    totalUsuarios,
    productos30dias,
  ] = await Promise.all([
    shopDb.order.findMany({ where: { status: 'paid', createdAt: { gte: primerDiaMes } }, select: { totalCents: true, createdAt: true } }),
    shopDb.order.findMany({ where: { status: 'paid', createdAt: { gte: primerDiaMesAnt, lt: primerDiaMes } }, select: { totalCents: true } }),
    shopDb.order.findMany({ where: { createdAt: { gte: hace30dias } }, select: { totalCents: true, status: true, createdAt: true } }),
    authDb.user.count(),
    shopDb.orderItem.findMany({ where: { createdAt: { gte: hace30dias } }, include: { product: { select: { name: true } } } }),
  ])

  const ingresosMes = ordenesMes.reduce((s, o) => s + o.totalCents, 0)
  const ingresosAnt = ordenesAnt.reduce((s, o) => s + o.totalCents, 0)
  const delta = ingresosAnt > 0 ? Math.round(((ingresosMes - ingresosAnt) / ingresosAnt) * 100) : null
  const ticket = ordenesMes.length > 0 ? Math.round(ingresosMes / ordenesMes.length) : 0

  // Ingresos por día
  const diasMap: Record<string, number> = {}
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    diasMap[d.toISOString().slice(5, 10)] = 0
  }
  for (const o of ordenes30dias) {
    if (o.status === 'paid') {
      const key = new Date(o.createdAt).toISOString().slice(5, 10)
      if (key in diasMap) diasMap[key] += o.totalCents
    }
  }
  const chartData = Object.entries(diasMap).map(([label, value]) => ({ label, value }))

  // Por estado
  const estadoCount: Record<string, number> = {}
  for (const o of ordenes30dias) {
    estadoCount[o.status] = (estadoCount[o.status] ?? 0) + 1
  }

  // Top productos
  const prodMap: Record<string, { cantidad: number; ingresos: number }> = {}
  for (const it of productos30dias) {
    const nombre = it.product.name
    if (!prodMap[nombre]) prodMap[nombre] = { cantidad: 0, ingresos: 0 }
    prodMap[nombre].cantidad += it.quantity
    prodMap[nombre].ingresos += it.priceCents * it.quantity
  }
  const topProductos = Object.entries(prodMap).sort((a, b) => b[1].ingresos - a[1].ingresos).slice(0, 5)

  const thStyle: React.CSSProperties = { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: S.muted2, padding: '10px 14px', textAlign: 'left', borderBottom: `0.5px solid ${S.border}` }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', fontSize: 12, borderBottom: `0.5px solid ${S.border}` }

  const metrics = [
    { label: 'Ingresos del mes', valor: fmt(ingresosMes), sub: delta !== null ? `${delta > 0 ? '+' : ''}${delta}% vs mes anterior` : 'Primer mes' },
    { label: 'Pedidos del mes', valor: String(ordenesMes.length), sub: 'pedidos pagados' },
    { label: 'Ticket promedio', valor: ticket > 0 ? fmt(ticket) : '—', sub: 'por pedido pagado' },
    { label: 'Usuarios registrados', valor: String(totalUsuarios), sub: 'total acumulado' },
  ]

  return (
    <div style={{ maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '24px' }}>Analítica</h1>

      {/* Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: '24px' }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px' }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: S.muted2, marginBottom: '8px' }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: S.text, marginBottom: '4px' }}>{m.valor}</div>
            <div style={{ fontSize: 11, color: S.muted2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', marginBottom: '16px' }}>
        <div style={{ padding: '12px 16px', borderBottom: `0.5px solid ${S.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: S.text }}>Ingresos — últimos 30 días</span>
          <span style={{ fontSize: 11, color: S.muted2 }}>solo pedidos pagados</span>
        </div>
        <div style={{ padding: '16px' }}>
          <BarChart data={chartData} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Por estado */}
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `0.5px solid ${S.border}` }}>
            <span style={{ fontSize: 13, color: S.text }}>Pedidos por estado — 30 días</span>
          </div>
          {Object.keys(estadoCount).length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: S.muted2, fontSize: 12 }}>Sin pedidos en los últimos 30 días</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Estado', 'Cantidad'].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
              <tbody>
                {Object.entries(estadoCount).sort((a, b) => b[1] - a[1]).map(([estado, cant]) => (
                  <tr key={estado}>
                    <td style={tdStyle}>
                      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: '2px', textTransform: 'uppercase', color: ESTADO_COLOR[estado] ?? S.muted2, background: `${ESTADO_COLOR[estado] ?? S.muted2}18` }}>
                        {estado}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500, color: S.text }}>{cant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Top productos */}
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `0.5px solid ${S.border}` }}>
            <span style={{ fontSize: 13, color: S.text }}>Top productos — 30 días</span>
          </div>
          {topProductos.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: S.muted2, fontSize: 12 }}>Sin ventas en los últimos 30 días</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Producto', 'Uds.', 'Ingresos'].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
              <tbody>
                {topProductos.map(([nombre, data]) => (
                  <tr key={nombre}>
                    <td style={{ ...tdStyle, color: S.text, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nombre}</td>
                    <td style={{ ...tdStyle, color: S.muted }}>{data.cantidad}</td>
                    <td style={{ ...tdStyle, color: S.red }}>{fmt(data.ingresos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
