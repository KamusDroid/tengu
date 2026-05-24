import { crmDb } from '@/lib/dbCrm'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default async function LeadsPage() {
  const leads = await crmDb.customer.findMany({ orderBy: { createdAt: 'desc' } })

  const thStyle: React.CSSProperties = { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: S.muted2, padding: '10px 14px', textAlign: 'left', borderBottom: `0.5px solid ${S.border}` }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', fontSize: 12, borderBottom: `0.5px solid ${S.border}` }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Leads / Clientes</h1>
        <span style={{ fontSize: '12px', color: S.muted2 }}>{leads.length} contactos</span>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: S.muted2, fontSize: 13 }}>
            <div style={{ fontSize: 13, marginBottom: '8px', color: S.muted2 }}>Sin contactos registrados</div>
            <div style={{ fontSize: 11, color: S.muted2 }}>Los clientes que realicen una compra aparecerán aquí.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Nombre', 'Email', 'Teléfono', 'Usuario vinculado', 'Registrado'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td style={{ ...tdStyle, color: S.text, fontWeight: 500 }}>{l.fullName}</td>
                  <td style={{ ...tdStyle, color: S.muted }}>{l.email}</td>
                  <td style={{ ...tdStyle, color: S.muted2 }}>{l.phone ?? '—'}</td>
                  <td style={{ ...tdStyle, color: S.muted2, fontFamily: 'monospace', fontSize: 10 }}>
                    {l.userId ? l.userId.slice(0, 12) + '…' : '—'}
                  </td>
                  <td style={{ ...tdStyle, color: S.muted2 }}>{new Date(l.createdAt).toLocaleDateString('es-AR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
