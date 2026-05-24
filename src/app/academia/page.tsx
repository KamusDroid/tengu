import { crmDb } from '@/lib/dbCrm'
import InscripcionForm from './InscripcionForm'

export const dynamic = 'force-dynamic'

const S = {
  bg1: '#0d0d10', bg2: '#111115', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a', amber: '#c8a84b',
}

const NIVEL_COLOR: Record<string, string> = {
  inicial: '#4a9abb', intermedio: '#c8a84b', avanzado: '#e63946',
}

export const metadata = {
  title: 'Academia — TENGU',
  description: 'Talleres y formación en tecnología, IA y desarrollo. Inscribite a nuestros cursos.',
}

export default async function AcademiaPage() {
  const talleres = await crmDb.taller.findMany({
    where: { activo: true },
    orderBy: { fecha: 'asc' },
    include: { inscripciones: { select: { id: true } } },
  })

  const proximos = talleres.filter((t) => !t.fecha || new Date(t.fecha) >= new Date())
  const pasados = talleres.filter((t) => t.fecha && new Date(t.fecha) < new Date())

  return (
    <main style={{ background: '#050507', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(40px,6vw,60px) clamp(16px,5vw,40px) 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(192,57,43,0.7)', marginBottom: '12px' }}>
          Academia TENGU
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 500, color: S.text, lineHeight: 1.1, marginBottom: '16px' }}>
          Formación técnica<br />sin vueltas.
        </h1>
        <p style={{ fontSize: '14px', color: S.muted, lineHeight: 1.8, maxWidth: '500px' }}>
          Talleres prácticos en desarrollo, inteligencia artificial y automatización. Presencial y online. Todos los niveles.
        </p>
      </section>

      {/* Divisor */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.55) 30%, rgba(230,57,70,0.7) 50%, rgba(192,57,43,0.55) 70%, transparent)', margin: '0 0 48px' }} />

      {/* Talleres próximos */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: `0 clamp(16px,5vw,40px) 60px` }}>
        {proximos.length === 0 && pasados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: S.muted2, fontSize: '14px' }}>
            No hay talleres disponibles por el momento.<br />
            <span style={{ fontSize: '12px' }}>Seguinos en redes para enterarte de los próximos.</span>
          </div>
        )}

        {proximos.length > 0 && (
          <>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '20px' }}>
              Próximos talleres
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: S.border, marginBottom: '48px' }}>
              {proximos.map((t) => {
                const nivelColor = t.nivel ? (NIVEL_COLOR[t.nivel.toLowerCase()] ?? S.muted2) : S.muted2
                const cupoLibre = t.cupoMaximo ? t.cupoMaximo - t.inscripciones.length : null
                const sinCupo = cupoLibre !== null && cupoLibre <= 0
                return (
                  <div key={t.id} style={{ background: S.bg1, padding: 'clamp(16px,3vw,24px) clamp(16px,4vw,28px)', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                        {t.nivel && (
                          <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: `${nivelColor}22`, color: nivelColor, letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {t.nivel}
                          </span>
                        )}
                        {t.modalidad && (
                          <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(240,237,230,0.06)', color: S.muted2, letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {t.modalidad}
                          </span>
                        )}
                        {sinCupo && (
                          <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(230,57,70,0.1)', color: S.red, letterSpacing: '1px', textTransform: 'uppercase' }}>
                            Sin cupo
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize: '18px', fontWeight: 500, color: S.text, marginBottom: '6px' }}>{t.titulo}</h2>
                      {t.descripcion && (
                        <p style={{ fontSize: '13px', color: S.muted, lineHeight: 1.6, marginBottom: '10px' }}>{t.descripcion}</p>
                      )}
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {t.fecha && (
                          <span style={{ fontSize: '12px', color: S.muted2 }}>
                            {new Date(t.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                        {t.cupoMaximo && (
                          <span style={{ fontSize: '12px', color: cupoLibre !== null && cupoLibre <= 3 ? S.amber : S.muted2 }}>
                            {cupoLibre !== null ? `${cupoLibre} cupos libres` : `${t.inscripciones.length} inscriptos`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '140px' }}>
                      <div style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>
                        {t.precio != null ? `$${t.precio.toLocaleString('es-AR')}` : 'Gratis'}
                      </div>
                      {!sinCupo ? (
                        <InscripcionForm tallerId={t.id} tallerTitulo={t.titulo} />
                      ) : (
                        <span style={{ fontSize: '11px', color: S.muted2 }}>Cupo completo</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {pasados.length > 0 && (
          <>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '16px' }}>
              Talleres anteriores
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: S.border }}>
              {pasados.map((t) => (
                <div key={t.id} style={{ background: S.bg2, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6 }}>
                  <div>
                    <div style={{ fontSize: '14px', color: S.muted, marginBottom: '4px' }}>{t.titulo}</div>
                    {t.fecha && <div style={{ fontSize: '11px', color: S.muted2 }}>{new Date(t.fecha).toLocaleDateString('es-AR')}</div>}
                  </div>
                  <div style={{ fontSize: '11px', color: S.muted2 }}>{t.inscripciones.length} asistentes</div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
