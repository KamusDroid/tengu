import { authDb } from '@/lib/dbAuth'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

const ROL_COLORS = {
  admin:   { bg: 'rgba(230,57,70,0.12)',  color: '#e63946',  border: 'rgba(230,57,70,0.2)' },
  usuario: { bg: 'rgba(240,237,230,0.06)', color: 'rgba(240,237,230,0.45)', border: 'rgba(192,57,43,0.18)' },
}

const PERMISOS = {
  admin:   ['Acceder al dashboard', 'Gestionar productos', 'Ver pedidos', 'Ver usuarios', 'Ver analítica', 'Gestionar cupones', 'Editar contenido', 'Configurar Chat IA'],
  usuario: ['Ver sus propios pedidos', 'Completar checkout', 'Acceder al marketplace'],
}

export default async function RolesPage() {
  const usuarios = await authDb.user.findMany({ select: { email: true } })
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim()).filter(Boolean)

  const admins = usuarios.filter((u) => adminEmails.includes(u.email)).length
  const usuariosReg = usuarios.length - admins
  const total = usuarios.length

  const conteo = { admin: admins, usuario: usuariosReg }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '6px' }}>Roles y Permisos</h1>
      <p style={{ fontSize: '12px', color: S.muted2, marginBottom: '24px' }}>
        Los admins se definen con la variable de entorno <code style={{ fontFamily: 'monospace', fontSize: '11px', color: S.muted }}>ADMIN_EMAILS</code>
      </p>

      {/* Cards de rol */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '24px' }}>
        {(['admin', 'usuario'] as const).map((rol) => {
          const rc = ROL_COLORS[rol]
          const cant = conteo[rol]
          const pct = total > 0 ? Math.round((cant / total) * 100) : 0
          return (
            <div key={rol} style={{ background: S.bg1, border: `0.5px solid ${rc.border}`, borderRadius: '2px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: 9, padding: '2px 10px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: 2, background: rc.bg, color: rc.color }}>{rol}</span>
                <span style={{ fontSize: 22, fontWeight: 500, color: rc.color }}>{cant}</span>
              </div>
              <div style={{ fontSize: 11, color: S.muted2, marginBottom: '12px' }}>{cant} usuario{cant !== 1 ? 's' : ''} · {pct}% del total</div>
              <div style={{ height: 4, background: 'rgba(240,237,230,0.06)', borderRadius: '2px', marginBottom: '14px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: rc.color, borderRadius: '2px', transition: 'width .4s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {PERMISOS[rol].map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: S.muted2 }}>
                    <span style={{ color: rc.color, fontSize: 8 }}>◆</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info ADMIN_EMAILS */}
      <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '16px 20px' }}>
        <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: S.muted2, marginBottom: '10px' }}>Emails con acceso admin</div>
        {adminEmails.length === 0 ? (
          <div style={{ fontSize: 12, color: S.amber }}>No hay emails configurados en ADMIN_EMAILS</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {adminEmails.map((email) => (
              <div key={email} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.red, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: S.muted, fontFamily: 'monospace' }}>{email}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: '12px', fontSize: 11, color: S.muted2, lineHeight: 1.6 }}>
          Para agregar un admin, añadí el email a <code style={{ fontFamily: 'monospace', color: S.muted }}>ADMIN_EMAILS</code> en el .env y reiniciá el servidor.
        </div>
      </div>
    </div>
  )
}
