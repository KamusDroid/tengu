import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { shopDb } from '@/lib/dbShop'
import StockToggle from './StockToggle'

const S = {
  bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default async function StockPage() {
  const user = await getUserFromCookie()
  if (!user || !isAdmin(user)) redirect('/')

  const products = await shopDb.product.findMany({ orderBy: { name: 'asc' } })
  const activos = products.filter((p) => p.active).length
  const inactivos = products.length - activos

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '4px' }}>Stock</h1>
          <p style={{ fontSize: '12px', color: S.muted2 }}>
            <span style={{ color: S.green }}>{activos} activos</span>
            {' / '}
            <span style={{ color: S.muted2 }}>{inactivos} inactivos</span>
          </p>
        </div>
        <Link href="/admin/productos" style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', textDecoration: 'none' }}>
          + Nuevo producto
        </Link>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
              {['Nombre', 'Precio', 'Moneda', 'Activo', 'Creado'].map((h) => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: S.text }}>{p.name}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: S.muted }}>
                  {(p.priceCents / 100).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '11px', color: S.muted2 }}>{p.currency.toUpperCase()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <StockToggle id={p.id} active={p.active} />
                </td>
                <td style={{ padding: '12px 16px', fontSize: '11px', color: S.muted2 }}>
                  {new Date(p.createdAt).toLocaleDateString('es-AR')}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '24px 16px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>
                  Sin productos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
