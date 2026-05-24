import { authDb } from '@/lib/dbAuth'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

export default async function UsuariosPage() {
  const usuarios = await authDb.user.findMany({ orderBy: { createdAt: 'desc' } })
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim())

  const thStyle: React.CSSProperties = { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: S.muted2, padding: '10px 14px', textAlign: 'left', borderBottom: `0.5px solid ${S.border}` }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', fontSize: 12, borderBottom: `0.5px solid ${S.border}` }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Usuarios</h1>
        <span style={{ fontSize: '12px', color: S.muted2 }}>{usuarios.length} usuarios registrados</span>
      </div>

      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
        {usuarios.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: S.muted2, fontSize: 13 }}>Sin usuarios registrados.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Nombre', 'Email', 'Rol', 'Registrado'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => {
                const isAdmin = adminEmails.includes(u.email)
                return (
                  <tr key={u.id}>
                    <td style={{ ...tdStyle, color: S.text, fontWeight: 500 }}>{u.name ?? '—'}</td>
                    <td style={{ ...tdStyle, color: S.muted }}>{u.email}</td>
                    <td style={tdStyle}>
                      <span style={{
                        fontSize: 9, padding: '2px 8px', borderRadius: '2px', textTransform: 'uppercase',
                        background: isAdmin ? 'rgba(230,57,70,0.12)' : 'rgba(240,237,230,0.06)',
                        color: isAdmin ? S.red : S.muted2,
                      }}>
                        {isAdmin ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: S.muted2 }}>{new Date(u.createdAt).toLocaleDateString('es-AR')}</td>
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
