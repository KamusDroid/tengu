'use client'

import { useEffect, useState } from 'react'

const S = {
  bg0: '#050507', bg1: '#0d0d10', border: 'rgba(192,57,43,0.18)',
  red: '#e63946', text: '#f0ede6', muted: 'rgba(240,237,230,0.45)',
  muted2: 'rgba(240,237,230,0.22)', green: '#5dc87a',
}

const NIVEL_COLOR: Record<string, string> = {
  inicial: '#4a9abb',
  intermedio: '#c8a84b',
  avanzado: '#e63946',
}

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

type Inscripcion = { id: string; nombre: string; email: string; telefono: string | null; estado: string; createdAt: string; taller: { titulo: string } }
type Taller = { id: string; titulo: string; nivel: string | null; modalidad: string | null; precio: number | null; fecha: string | null; cupoMaximo: number | null; activo: boolean; inscripciones: Inscripcion[] }

export default function CalendarioPage() {
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [today] = useState(new Date())
  const [current, setCurrent] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [panelTaller, setPanelTaller] = useState<Taller | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/talleres')
    if (res.ok) setTalleres(await res.json())
  }

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function talleresOfDay(day: number) {
    return talleres.filter((t) => {
      if (!t.fecha) return false
      const d = new Date(t.fecha)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  function isToday(day: number) {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  function prevMonth() { setCurrent(new Date(year, month - 1, 1)); setSelectedDay(null); setPanelTaller(null) }
  function nextMonth() { setCurrent(new Date(year, month + 1, 1)); setSelectedDay(null); setPanelTaller(null) }

  function selectDay(day: number) {
    setSelectedDay(day)
    setPanelTaller(null)
    const ts = talleresOfDay(day)
    if (ts.length === 1) setPanelTaller(ts[0])
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedTalleres = selectedDay ? talleresOfDay(selectedDay) : []

  return (
    <div style={{ maxWidth: '1000px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {/* Calendario */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text }}>Calendario</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={prevMonth} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '6px 12px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer' }}>‹</button>
            <span style={{ fontSize: '13px', color: S.text, minWidth: '140px', textAlign: 'center' }}>{MESES[month]} {year}</span>
            <button onClick={nextMonth} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '6px 12px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer' }}>›</button>
          </div>
        </div>

        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', overflow: 'hidden' }}>
          {/* Header días */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `0.5px solid ${S.border}` }}>
            {DIAS.map((d) => (
              <div key={d} style={{ padding: '10px 6px', textAlign: 'center', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2 }}>{d}</div>
            ))}
          </div>
          {/* Celdas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((day, idx) => {
              const ts = day ? talleresOfDay(day) : []
              const todayCell = day ? isToday(day) : false
              const selected = day === selectedDay
              return (
                <div
                  key={idx}
                  onClick={() => day && selectDay(day)}
                  style={{
                    minHeight: '72px', padding: '8px 6px', borderRight: `0.5px solid ${S.border}`, borderBottom: `0.5px solid ${S.border}`,
                    cursor: day ? 'pointer' : 'default',
                    background: selected ? 'rgba(230,57,70,0.06)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  {day && (
                    <>
                      <div style={{
                        fontSize: '12px', fontWeight: todayCell ? 600 : 400,
                        color: todayCell ? S.red : S.muted,
                        background: todayCell ? 'rgba(230,57,70,0.12)' : 'transparent',
                        width: '22px', height: '22px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '4px',
                      }}>
                        {day}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {ts.map((t) => (
                          <div
                            key={t.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedDay(day); setPanelTaller(t) }}
                            style={{
                              fontSize: '9px', padding: '2px 4px', borderRadius: '2px',
                              background: t.nivel ? `${NIVEL_COLOR[t.nivel.toLowerCase()] ?? S.muted2}22` : 'rgba(230,57,70,0.12)',
                              color: t.nivel ? (NIVEL_COLOR[t.nivel.toLowerCase()] ?? S.muted2) : S.red,
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                              cursor: 'pointer',
                            }}
                          >
                            {t.titulo}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <div style={{ width: '300px', flexShrink: 0 }}>
        {selectedDay ? (
          <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
            <div style={{ padding: '14px 16px', borderBottom: `0.5px solid ${S.border}` }}>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '4px' }}>Seleccionado</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: S.text }}>{selectedDay} de {MESES[month]}</div>
            </div>

            {selectedTalleres.length === 0 ? (
              <div style={{ padding: '20px 16px', fontSize: '12px', color: S.muted2 }}>Sin talleres este día.</div>
            ) : panelTaller ? (
              <TallerPanel taller={panelTaller} onBack={selectedTalleres.length > 1 ? () => setPanelTaller(null) : undefined} />
            ) : (
              <div style={{ padding: '12px' }}>
                {selectedTalleres.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPanelTaller(t)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent',
                      border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '10px 12px',
                      marginBottom: '6px', cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '13px', color: S.text, marginBottom: '4px' }}>{t.titulo}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {t.nivel && (
                        <span style={{ fontSize: '9px', padding: '1px 6px', borderRadius: '2px', background: `${NIVEL_COLOR[t.nivel.toLowerCase()] ?? S.muted2}22`, color: NIVEL_COLOR[t.nivel.toLowerCase()] ?? S.muted2 }}>
                          {t.nivel}
                        </span>
                      )}
                      <span style={{ fontSize: '10px', color: S.muted2 }}>{t.inscripciones.length} insc.</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px', padding: '20px 16px' }}>
            <div style={{ fontSize: '12px', color: S.muted2 }}>Seleccioná un día para ver los talleres.</div>
          </div>
        )}
      </div>
    </div>
  )
}

function TallerPanel({ taller, onBack }: { taller: Taller; onBack?: () => void }) {
  const nivelColor = taller.nivel ? (NIVEL_COLOR[taller.nivel.toLowerCase()] ?? S.muted2) : S.muted2
  return (
    <div>
      {onBack && (
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: S.muted2, fontSize: '11px', padding: '10px 16px', cursor: 'pointer', display: 'block' }}>
          ← Volver
        </button>
      )}
      <div style={{ padding: '14px 16px', borderBottom: `0.5px solid ${S.border}` }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: S.text, marginBottom: '8px' }}>{taller.titulo}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {taller.nivel && (
            <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: `${nivelColor}22`, color: nivelColor }}>{taller.nivel}</span>
          )}
          {taller.modalidad && (
            <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(240,237,230,0.06)', color: S.muted2 }}>{taller.modalidad}</span>
          )}
          <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: taller.activo ? 'rgba(93,200,122,0.12)' : 'rgba(240,237,230,0.06)', color: taller.activo ? S.green : S.muted2 }}>
            {taller.activo ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2, marginBottom: '2px' }}>Precio</div>
            <div style={{ fontSize: '12px', color: S.text }}>{taller.precio != null ? `$${taller.precio}` : 'Gratis'}</div>
          </div>
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: S.muted2, marginBottom: '2px' }}>Cupo</div>
            <div style={{ fontSize: '12px', color: S.text }}>
              {taller.inscripciones.length}{taller.cupoMaximo ? `/${taller.cupoMaximo}` : ''}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, marginBottom: '10px' }}>
          Inscripciones ({taller.inscripciones.length})
        </div>
        {taller.inscripciones.length === 0 ? (
          <div style={{ fontSize: '12px', color: S.muted2 }}>Sin inscripciones.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {taller.inscripciones.map((i) => (
              <div key={i.id} style={{ padding: '8px 10px', background: 'rgba(240,237,230,0.03)', border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
                <div style={{ fontSize: '12px', color: S.text }}>{i.nombre}</div>
                <div style={{ fontSize: '10px', color: S.muted2 }}>{i.email}</div>
                <div style={{ marginTop: '4px' }}>
                  <span style={{
                    fontSize: '9px', padding: '1px 6px', borderRadius: '2px',
                    background: i.estado === 'confirmado' ? 'rgba(93,200,122,0.12)' : i.estado === 'cancelado' ? 'rgba(230,57,70,0.12)' : 'rgba(200,168,75,0.12)',
                    color: i.estado === 'confirmado' ? S.green : i.estado === 'cancelado' ? S.red : '#c8a84b',
                  }}>
                    {i.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
