'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const S = {
  bg0: '#050507', bg1: '#0d0d10', bg2: '#111115', bg3: '#1a1a1f',
  red: '#e63946', border: 'rgba(192,57,43,0.18)',
  text: '#f0ede6', muted: 'rgba(240,237,230,0.45)', muted2: 'rgba(240,237,230,0.22)',
  green: '#5dc87a', amber: '#c8a84b', error: '#e05252',
}

type EstadoFactura = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

type FacturaRow = {
  id: string
  numero: string
  clienteId: string
  clienteNombre: string
  clienteEmail: string | null
  subtotal: number
  tasaIva: number
  descuento: number
  total: number
  moneda: string
  estado: EstadoFactura
  emitidaEn: string
  venceEn: string
  descripcion: string | null
  items: string | null
  notas: string | null
  datosPago: string | null
}

type ContratoRow = {
  id: string
  nombre: string
  valorMensual: number
  moneda: string
  inicioContrato: string | null
  renovacionContrato: string | null
}

type ClienteRow = {
  id: string
  nombre: string
  email: string | null
  telefono: string | null
  industria: string | null
  cuit: string | null
  valorMensual: number
  moneda: string
  inicioContrato: string | null
  renovacionContrato: string | null
  estado: string
  datosPago: string | null
  notas: string | null
}

type ProductoRow = { id: string; nombre: string; precioCents: number; moneda: string }

type ItemRow = { descripcion: string; cantidad: string; precio: string }

const EMPTY_ITEM: ItemRow = { descripcion: '', cantidad: '1', precio: '' }

const EMPTY_FACTURA_FORM = {
  clienteId: '',
  descripcion: '',
  moneda: 'ARS',
  tasaIva: '21',
  descuento: '',
  venceEn: '',
  estado: 'draft' as EstadoFactura,
  datosPago: '',
  notas: '',
}

const EMPTY_CONTRATO_FORM = {
  clienteId: '',
  valorMensual: '',
  moneda: 'ARS',
  inicioContrato: '',
  renovacionContrato: '',
}

const EMPTY_CLIENTE_FORM = {
  nombre: '',
  email: '',
  telefono: '',
  industria: '',
  cuit: '',
  direccion: '',
  valorMensual: '',
  moneda: 'ARS',
  inicioContrato: '',
  renovacionContrato: '',
  datosPago: '',
  notas: '',
  estado: 'active',
}

function fmtMoney(cents: number, moneda: string) {
  const n = cents / 100
  if (moneda === 'USD') return 'U$S ' + n.toLocaleString('es-AR', { minimumFractionDigits: 2 })
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
}

function diasPara(fecha: string | null) {
  if (!fecha) return null
  const ms = new Date(fecha).getTime() - Date.now()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

const ESTADO_BADGE: Record<EstadoFactura, { bg: string; color: string; label: string }> = {
  draft: { bg: 'rgba(240,237,230,0.06)', color: S.muted, label: 'Borrador' },
  sent: { bg: 'rgba(200,168,75,0.12)', color: S.amber, label: 'Enviada' },
  paid: { bg: 'rgba(93,200,122,0.12)', color: S.green, label: 'Pagada' },
  overdue: { bg: 'rgba(224,82,82,0.12)', color: S.error, label: 'Vencida' },
  cancelled: { bg: 'rgba(240,237,230,0.06)', color: S.muted2, label: 'Cancelada' },
}

export function FinanzasClient({
  facturas: initialFacturas,
  contratos,
  clientes: initialClientes,
  productos,
}: {
  facturas: FacturaRow[]
  contratos: ContratoRow[]
  clientes: ClienteRow[]
  productos: ProductoRow[]
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'facturas' | 'contratos' | 'clientes'>('facturas')
  const [panelFactura, setPanelFactura] = useState(false)
  const [panelCliente, setPanelCliente] = useState(false)
  const [panelContrato, setPanelContrato] = useState(false)
  const [editando, setEditando] = useState<FacturaRow | null>(null)
  const [editandoCliente, setEditandoCliente] = useState<ClienteRow | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [facturaForm, setFacturaForm] = useState(EMPTY_FACTURA_FORM)
  const [items, setItems] = useState<ItemRow[]>([EMPTY_ITEM])
  const [clienteForm, setClienteForm] = useState(EMPTY_CLIENTE_FORM)
  const [contratoForm, setContratoForm] = useState(EMPTY_CONTRATO_FORM)

  const mrr = contratos.reduce((s, c) => s + c.valorMensual, 0)
  const arr = mrr * 12
  const pendiente = initialFacturas.filter((f) => ['sent', 'overdue'].includes(f.estado)).reduce((s, f) => s + f.total, 0)
  const ticketProm = contratos.length > 0 ? Math.round(mrr / contratos.length) : 0

  function openNuevaFactura() {
    setEditando(null)
    setFacturaForm(EMPTY_FACTURA_FORM)
    setItems([EMPTY_ITEM])
    setError('')
    setPanelFactura(true)
  }

  function openEditarFactura(f: FacturaRow) {
    setEditando(f)
    setFacturaForm({
      clienteId: f.clienteId,
      descripcion: f.descripcion ?? '',
      moneda: f.moneda,
      tasaIva: String(f.tasaIva),
      descuento: f.descuento ? String(f.descuento / 100) : '',
      venceEn: f.venceEn.slice(0, 10),
      estado: f.estado === 'sent' ? 'sent' : 'draft',
      datosPago: f.datosPago ?? '',
      notas: f.notas ?? '',
    })
    let parsedItems: ItemRow[] = []
    try {
      const raw = JSON.parse(f.items ?? '[]') as Array<{ descripcion: string; cantidad: number; precio: number }>
      parsedItems = raw.map((it) => ({ descripcion: it.descripcion, cantidad: String(it.cantidad), precio: String(it.precio) }))
    } catch {
      parsedItems = []
    }
    setItems(parsedItems.length > 0 ? parsedItems : [EMPTY_ITEM])
    setError('')
    setPanelFactura(true)
  }

  function openNuevoCliente() {
    setEditandoCliente(null)
    setClienteForm(EMPTY_CLIENTE_FORM)
    setError('')
    setPanelCliente(true)
  }

  function openEditarCliente(c: ClienteRow) {
    setEditandoCliente(c)
    setClienteForm({
      nombre: c.nombre,
      email: c.email ?? '',
      telefono: c.telefono ?? '',
      industria: c.industria ?? '',
      cuit: c.cuit ?? '',
      direccion: '',
      valorMensual: c.valorMensual ? String(c.valorMensual / 100) : '',
      moneda: c.moneda,
      inicioContrato: c.inicioContrato ? c.inicioContrato.slice(0, 10) : '',
      renovacionContrato: c.renovacionContrato ? c.renovacionContrato.slice(0, 10) : '',
      datosPago: c.datosPago ?? '',
      notas: c.notas ?? '',
      estado: c.estado,
    })
    setError('')
    setPanelCliente(true)
  }

  function openNuevoContrato() {
    setContratoForm(EMPTY_CONTRATO_FORM)
    setError('')
    setPanelContrato(true)
  }

  function itemField(i: number, k: keyof ItemRow, v: string) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)))
  }
  function addItem() { setItems((arr) => [...arr, { ...EMPTY_ITEM }]) }
  function removeItem(i: number) { setItems((arr) => (arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr)) }
  function selectProducto(i: number, productoId: string) {
    const p = productos.find((prod) => prod.id === productoId)
    if (!p) return
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, descripcion: p.nombre, precio: String(p.precioCents / 100) } : it)))
  }

  const subtotalCents = items.reduce((s, it) => {
    const cant = parseFloat(it.cantidad) || 0
    const precio = parseFloat(it.precio) || 0
    return s + Math.round(cant * precio * 100)
  }, 0)
  const tasaIvaNum = parseFloat(facturaForm.tasaIva) || 0
  const ivaCents = Math.round(subtotalCents * (tasaIvaNum / 100))
  const descuentoCents = Math.round((parseFloat(facturaForm.descuento) || 0) * 100)
  const totalCents = subtotalCents + ivaCents - descuentoCents

  async function guardarFactura() {
    if (!facturaForm.clienteId) { setError('Seleccioná un cliente'); return }
    if (!facturaForm.venceEn) { setError('Ingresá la fecha de vencimiento'); return }
    setLoading(true); setError('')
    try {
      const body = {
        ...(editando ? { id: editando.id } : {}),
        clienteId: facturaForm.clienteId,
        descripcion: facturaForm.descripcion || null,
        items: JSON.stringify(items.filter((it) => it.descripcion.trim() !== '').map((it) => ({
          descripcion: it.descripcion,
          cantidad: parseFloat(it.cantidad) || 0,
          precio: parseFloat(it.precio) || 0,
        }))),
        subtotalCents,
        tasaIva: tasaIvaNum,
        descuentoCents,
        moneda: facturaForm.moneda,
        venceEn: facturaForm.venceEn,
        estado: facturaForm.estado,
        notas: facturaForm.notas || null,
        datosPago: facturaForm.datosPago || null,
      }
      const res = await fetch('/api/admin/facturas', {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { setError(await res.text()); return }
      setPanelFactura(false)
      router.refresh()
    } catch {
      setError('Error al guardar la factura')
    } finally {
      setLoading(false)
    }
  }

  async function cambiarEstado(f: FacturaRow, estado: string) {
    await fetch('/api/admin/facturas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: f.id, estado }),
    })
    router.refresh()
  }

  async function eliminarFactura(f: FacturaRow) {
    if (!confirm(`¿Eliminar definitivamente la factura ${f.numero}? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/admin/facturas?id=${f.id}`, { method: 'DELETE' })
    router.refresh()
  }

  async function guardarCliente() {
    if (!clienteForm.nombre.trim()) { setError('El nombre es obligatorio'); return }
    setLoading(true); setError('')
    try {
      const body = {
        ...(editandoCliente ? { id: editandoCliente.id } : {}),
        nombre: clienteForm.nombre,
        email: clienteForm.email || null,
        telefono: clienteForm.telefono || null,
        industria: clienteForm.industria || null,
        cuit: clienteForm.cuit || null,
        direccion: clienteForm.direccion || null,
        valorMensualCents: clienteForm.valorMensual ? Math.round(parseFloat(clienteForm.valorMensual) * 100) : 0,
        moneda: clienteForm.moneda,
        inicioContrato: clienteForm.inicioContrato || null,
        renovacionContrato: clienteForm.renovacionContrato || null,
        datosPago: clienteForm.datosPago || null,
        notas: clienteForm.notas || null,
        estado: clienteForm.estado,
      }
      const res = await fetch('/api/admin/clientes-billing', {
        method: editandoCliente ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { setError(await res.text()); return }
      setPanelCliente(false)
      router.refresh()
    } catch {
      setError('Error al guardar el cliente')
    } finally {
      setLoading(false)
    }
  }

  async function guardarContrato() {
    if (!contratoForm.clienteId) { setError('Seleccioná un cliente'); return }
    if (!contratoForm.renovacionContrato) { setError('Ingresá la fecha de renovación'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/clientes-billing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contratoForm.clienteId,
          valorMensualCents: contratoForm.valorMensual ? Math.round(parseFloat(contratoForm.valorMensual) * 100) : 0,
          moneda: contratoForm.moneda,
          inicioContrato: contratoForm.inicioContrato || null,
          renovacionContrato: contratoForm.renovacionContrato,
          estado: 'active',
        }),
      })
      if (!res.ok) { setError(await res.text()); return }
      setPanelContrato(false)
      router.refresh()
    } catch {
      setError('Error al guardar el contrato')
    } finally {
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', background: S.bg0, border: `0.5px solid ${S.border}`,
    color: S.text, padding: '8px 10px', fontSize: '12px', borderRadius: '2px', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = {
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2, display: 'block', marginBottom: '4px',
  }
  const kpiCard: React.CSSProperties = { background: S.bg2, border: `0.5px solid ${S.border}`, padding: '16px', borderRadius: '1px' }
  const kpiValue: React.CSSProperties = { fontSize: '22px', fontWeight: 500, color: S.text }
  const kpiLabel: React.CSSProperties = { fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px', color: S.muted2, marginBottom: '6px' }
  const th: React.CSSProperties = { padding: '10px 14px', textAlign: 'left', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: S.muted2 }
  const td: React.CSSProperties = { padding: '11px 14px', fontSize: '12px', color: S.text }

  return (
    <div style={{ maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 500, color: S.text, marginBottom: '20px' }}>Facturación</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={kpiCard}><div style={kpiLabel}>MRR</div><div style={kpiValue}>{fmtMoney(mrr, 'ARS')}</div></div>
        <div style={kpiCard}><div style={kpiLabel}>ARR</div><div style={kpiValue}>{fmtMoney(arr, 'ARS')}</div></div>
        <div style={kpiCard}><div style={kpiLabel}>Cobros pendientes</div><div style={{ ...kpiValue, color: pendiente > 0 ? S.amber : S.text }}>{fmtMoney(pendiente, 'ARS')}</div></div>
        <div style={kpiCard}><div style={kpiLabel}>Ticket promedio</div><div style={kpiValue}>{fmtMoney(ticketProm, 'ARS')}</div></div>
      </div>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,57,43,0.45) 30%, rgba(230,57,70,0.6) 50%, rgba(192,57,43,0.45) 70%, transparent)' }} />

      <div style={{ display: 'flex', borderBottom: `0.5px solid ${S.border}`, marginBottom: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          {([
            ['facturas', 'Facturas'],
            ['contratos', 'Contratos'],
            ['clientes', 'Clientes'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '10px 16px', fontSize: '12px',
                color: tab === key ? S.text : S.muted2,
                borderBottom: tab === key ? `2px solid ${S.red}` : '2px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === 'facturas' && (
          <button onClick={openNuevaFactura} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginBottom: '8px' }}>
            + Nueva factura
          </button>
        )}
        {tab === 'contratos' && (
          <button onClick={openNuevoContrato} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginBottom: '8px' }}>
            + Nuevo contrato
          </button>
        )}
        {tab === 'clientes' && (
          <button onClick={openNuevoCliente} style={{ background: S.red, color: '#fff', padding: '8px 18px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginBottom: '8px' }}>
            + Nuevo cliente
          </button>
        )}
      </div>

      {tab === 'facturas' && (
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
                {['Nro.', 'Cliente', 'Monto', 'Estado', 'Vencimiento', 'Acciones'].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {initialFacturas.map((f) => {
                const badge = ESTADO_BADGE[f.estado]
                return (
                  <tr
                    key={f.id}
                    style={{ borderBottom: `0.5px solid ${S.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(192,57,43,0.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: '11px', color: S.muted2 }}>{f.numero}</td>
                    <td style={td}>
                      <div>{f.clienteNombre}</div>
                      {f.clienteEmail && <div style={{ fontSize: '10px', color: S.muted2 }}>{f.clienteEmail}</div>}
                    </td>
                    <td style={{ ...td, fontFamily: 'monospace' }}>{fmtMoney(f.total, f.moneda)}</td>
                    <td style={td}>
                      <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '1px', background: badge.bg, color: badge.color }}>
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ ...td, fontSize: '11px', color: S.muted2 }}>{new Date(f.venceEn).toLocaleDateString('es-AR')}</td>
                    <td style={td}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button onClick={() => window.open(`/admin/facturacion/${f.id}/print`, '_blank')} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Ver</button>
                        <button onClick={() => openEditarFactura(f)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Editar</button>
                        <select
                          value={f.estado}
                          onChange={(e) => cambiarEstado(f, e.target.value)}
                          style={{ background: S.bg0, border: `0.5px solid ${S.border}`, color: S.text, fontSize: '11px', padding: '4px 6px', borderRadius: '2px' }}
                        >
                          <option value="draft">Borrador</option>
                          <option value="sent">Enviada</option>
                          <option value="paid">Pagada</option>
                          <option value="overdue">Vencida</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                        <button onClick={() => eliminarFactura(f)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.error, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {initialFacturas.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '32px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin facturas todavía.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'contratos' && (
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
                {['Cliente', 'Fee mensual', 'Inicio', 'Renovación', 'Estado'].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {contratos.map((c) => {
                const dias = diasPara(c.renovacionContrato)
                let color = S.green
                let texto = ''
                if (dias !== null) {
                  color = dias <= 15 ? S.error : dias <= 30 ? S.amber : S.green
                  texto = dias <= 15 ? `en ${dias} días — urgente` : `en ${dias} días`
                }
                return (
                  <tr key={c.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                    <td style={td}>{c.nombre}</td>
                    <td style={{ ...td, fontFamily: 'monospace' }}>{fmtMoney(c.valorMensual, c.moneda)}</td>
                    <td style={{ ...td, fontSize: '11px', color: S.muted2 }}>{c.inicioContrato ? new Date(c.inicioContrato).toLocaleDateString('es-AR') : '—'}</td>
                    <td style={{ ...td, fontSize: '11px', color }}>
                      {c.renovacionContrato ? `${new Date(c.renovacionContrato).toLocaleDateString('es-AR')} · ${texto}` : '—'}
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '1px', background: 'rgba(93,200,122,0.12)', color: S.green }}>Activo</span>
                    </td>
                  </tr>
                )
              })}
              {contratos.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '32px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin contratos con renovación programada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'clientes' && (
        <div style={{ background: S.bg1, border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${S.border}` }}>
                {['Nombre', 'Email', 'Teléfono', 'Fee mensual', 'Estado', 'Acciones'].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {initialClientes.map((c) => {
                const estadoColor = c.estado === 'active' ? S.green : c.estado === 'prospect' ? S.amber : S.muted2
                const estadoBg = c.estado === 'active' ? 'rgba(93,200,122,0.12)' : c.estado === 'prospect' ? 'rgba(200,168,75,0.12)' : 'rgba(240,237,230,0.06)'
                const estadoLabel = c.estado === 'active' ? 'Activo' : c.estado === 'prospect' ? 'Prospecto' : 'Inactivo'
                return (
                  <tr key={c.id} style={{ borderBottom: `0.5px solid ${S.border}` }}>
                    <td style={td}>{c.nombre}</td>
                    <td style={{ ...td, fontSize: '11px', color: S.muted }}>{c.email ?? '—'}</td>
                    <td style={{ ...td, fontSize: '11px', color: S.muted }}>{c.telefono ?? '—'}</td>
                    <td style={{ ...td, fontFamily: 'monospace' }}>{fmtMoney(c.valorMensual, c.moneda)}</td>
                    <td style={td}>
                      <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '1px', background: estadoBg, color: estadoColor }}>{estadoLabel}</span>
                    </td>
                    <td style={td}>
                      <button onClick={() => openEditarCliente(c)} style={{ background: 'transparent', border: `0.5px solid ${S.border}`, color: S.muted, padding: '4px 10px', fontSize: '11px', borderRadius: '2px', cursor: 'pointer' }}>Editar</button>
                    </td>
                  </tr>
                )
              })}
              {initialClientes.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '32px', fontSize: '12px', color: S.muted2, textAlign: 'center' }}>Sin clientes todavía.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {panelFactura && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(0,0,0,0.4)' }} onClick={() => setPanelFactura(false)}>
          <div
            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '440px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, zIndex: 50, overflowY: 'auto', padding: '24px', boxSizing: 'border-box' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: S.text }}>{editando ? 'Editar factura' : 'Nueva factura'}</div>
                {editando && <div style={{ fontSize: '11px', fontFamily: 'monospace', color: S.muted2, marginTop: '2px' }}>{editando.numero}</div>}
              </div>
              <button onClick={() => setPanelFactura(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {error && <div style={{ fontSize: '12px', color: S.error, background: 'rgba(224,82,82,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={lbl}>Cliente *</label>
                <select style={inp} value={facturaForm.clienteId} onChange={(e) => setFacturaForm((f) => ({ ...f, clienteId: e.target.value }))}>
                  <option value="">Seleccionar...</option>
                  {initialClientes.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Descripción</label>
                <input style={inp} value={facturaForm.descripcion} onChange={(e) => setFacturaForm((f) => ({ ...f, descripcion: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={lbl}>Moneda</label>
                  <select style={inp} value={facturaForm.moneda} onChange={(e) => setFacturaForm((f) => ({ ...f, moneda: e.target.value }))}>
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>IVA</label>
                  <select style={inp} value={facturaForm.tasaIva} onChange={(e) => setFacturaForm((f) => ({ ...f, tasaIva: e.target.value }))}>
                    <option value="21">21%</option>
                    <option value="10.5">10.5%</option>
                    <option value="0">0%</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={lbl}>Vencimiento *</label>
                  <input type="date" style={inp} value={facturaForm.venceEn} onChange={(e) => setFacturaForm((f) => ({ ...f, venceEn: e.target.value }))} />
                </div>
                <div>
                  <label style={lbl}>Estado</label>
                  <select style={inp} value={facturaForm.estado} onChange={(e) => setFacturaForm((f) => ({ ...f, estado: e.target.value as EstadoFactura }))}>
                    <option value="draft">Borrador</option>
                    <option value="sent">Enviada</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={lbl}>Ítems</label>
                <div style={{ border: `0.5px solid ${S.border}`, borderRadius: '2px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 70px 70px 20px', gap: '4px', padding: '6px 8px', borderBottom: `0.5px solid ${S.border}` }}>
                    {['Descripción', 'Cant.', 'Precio', 'Total', ''].map((h) => (
                      <div key={h} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: S.muted2 }}>{h}</div>
                    ))}
                  </div>
                  {items.map((it, i) => {
                    const cant = parseFloat(it.cantidad) || 0
                    const precio = parseFloat(it.precio) || 0
                    return (
                      <div key={i} style={{ padding: '6px 8px', borderBottom: i < items.length - 1 ? `0.5px solid ${S.border}` : 'none' }}>
                        {productos.length > 0 && (
                          <select
                            style={{ ...inp, padding: '5px 6px', fontSize: '11px', marginBottom: '4px' }}
                            value=""
                            onChange={(e) => { if (e.target.value) selectProducto(i, e.target.value) }}
                          >
                            <option value="">Producto existente (opcional)...</option>
                            {productos.map((p) => (
                              <option key={p.id} value={p.id}>{p.nombre} — {fmtMoney(p.precioCents, p.moneda)}</option>
                            ))}
                          </select>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 70px 70px 20px', gap: '4px', alignItems: 'center' }}>
                          <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} value={it.descripcion} onChange={(e) => itemField(i, 'descripcion', e.target.value)} placeholder="Servicio" />
                          <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} type="number" value={it.cantidad} onChange={(e) => itemField(i, 'cantidad', e.target.value)} />
                          <input style={{ ...inp, padding: '5px 6px', fontSize: '11px' }} type="number" value={it.precio} onChange={(e) => itemField(i, 'precio', e.target.value)} />
                          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: S.muted }}>{(cant * precio).toLocaleString('es-AR')}</div>
                          <button onClick={() => removeItem(i)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer' }}>✕</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={addItem} style={{ marginTop: '8px', background: 'transparent', border: `1px dashed ${S.border}`, color: S.muted, fontSize: '11px', padding: '6px 10px', borderRadius: '2px', cursor: 'pointer', width: '100%' }}>
                  + Agregar ítem
                </button>

                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: S.muted }}>
                    <span>Subtotal</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(subtotalCents, facturaForm.moneda)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: S.muted }}>
                    <span>IVA ({tasaIvaNum}%)</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(ivaCents, facturaForm.moneda)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: S.muted }}>
                    <span>Descuento</span>
                    <input
                      style={{ ...inp, width: '90px', padding: '4px 6px', fontSize: '11px', fontFamily: 'monospace', textAlign: 'right' }}
                      type="number"
                      value={facturaForm.descuento}
                      onChange={(e) => setFacturaForm((f) => ({ ...f, descuento: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: S.text, fontWeight: 500, fontSize: '13px', marginTop: '4px' }}>
                    <span>Total</span><span style={{ fontFamily: 'monospace' }}>{fmtMoney(totalCents, facturaForm.moneda)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label style={lbl}>Datos de pago</label>
                <textarea style={{ ...inp, resize: 'vertical', minHeight: '60px' }} value={facturaForm.datosPago} onChange={(e) => setFacturaForm((f) => ({ ...f, datosPago: e.target.value }))} placeholder={'CBU: 0000...\nAlias: TENGU.VENTAS\nTitular: Walter M. Amengual'} />
              </div>
              <div>
                <label style={lbl}>Notas</label>
                <textarea style={{ ...inp, resize: 'vertical', minHeight: '50px' }} value={facturaForm.notas} onChange={(e) => setFacturaForm((f) => ({ ...f, notas: e.target.value }))} />
              </div>

              <button onClick={guardarFactura} disabled={loading} style={{ background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: '4px' }}>
                {loading ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear factura'}
              </button>
            </div>
          </div>
        </div>
      )}

      {panelCliente && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(0,0,0,0.4)' }} onClick={() => setPanelCliente(false)}>
          <div
            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '440px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, zIndex: 50, overflowY: 'auto', padding: '24px', boxSizing: 'border-box' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: S.text }}>{editandoCliente ? 'Editar cliente' : 'Nuevo cliente'}</div>
              <button onClick={() => setPanelCliente(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {error && <div style={{ fontSize: '12px', color: S.error, background: 'rgba(224,82,82,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={lbl}>Nombre *</label><input style={inp} value={clienteForm.nombre} onChange={(e) => setClienteForm((f) => ({ ...f, nombre: e.target.value }))} /></div>
              <div><label style={lbl}>Email</label><input style={inp} value={clienteForm.email} onChange={(e) => setClienteForm((f) => ({ ...f, email: e.target.value }))} /></div>
              <div><label style={lbl}>Teléfono</label><input style={inp} value={clienteForm.telefono} onChange={(e) => setClienteForm((f) => ({ ...f, telefono: e.target.value }))} /></div>
              <div><label style={lbl}>Industria</label><input style={inp} value={clienteForm.industria} onChange={(e) => setClienteForm((f) => ({ ...f, industria: e.target.value }))} /></div>
              <div><label style={lbl}>CUIT</label><input style={inp} value={clienteForm.cuit} onChange={(e) => setClienteForm((f) => ({ ...f, cuit: e.target.value }))} /></div>
              <div><label style={lbl}>Dirección</label><input style={inp} value={clienteForm.direccion} onChange={(e) => setClienteForm((f) => ({ ...f, direccion: e.target.value }))} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><label style={lbl}>Fee mensual (ARS)</label><input style={inp} type="number" step="0.01" value={clienteForm.valorMensual} onChange={(e) => setClienteForm((f) => ({ ...f, valorMensual: e.target.value }))} /></div>
                <div>
                  <label style={lbl}>Moneda</label>
                  <select style={inp} value={clienteForm.moneda} onChange={(e) => setClienteForm((f) => ({ ...f, moneda: e.target.value }))}>
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><label style={lbl}>Inicio contrato</label><input type="date" style={inp} value={clienteForm.inicioContrato} onChange={(e) => setClienteForm((f) => ({ ...f, inicioContrato: e.target.value }))} /></div>
                <div><label style={lbl}>Renovación</label><input type="date" style={inp} value={clienteForm.renovacionContrato} onChange={(e) => setClienteForm((f) => ({ ...f, renovacionContrato: e.target.value }))} /></div>
              </div>
              <div><label style={lbl}>Datos de pago</label><textarea style={{ ...inp, resize: 'vertical', minHeight: '60px' }} value={clienteForm.datosPago} onChange={(e) => setClienteForm((f) => ({ ...f, datosPago: e.target.value }))} /></div>
              <div><label style={lbl}>Notas</label><textarea style={{ ...inp, resize: 'vertical', minHeight: '50px' }} value={clienteForm.notas} onChange={(e) => setClienteForm((f) => ({ ...f, notas: e.target.value }))} /></div>
              <div>
                <label style={lbl}>Estado</label>
                <select style={inp} value={clienteForm.estado} onChange={(e) => setClienteForm((f) => ({ ...f, estado: e.target.value }))}>
                  <option value="active">Activo</option>
                  <option value="prospect">Prospecto</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>

              <button onClick={guardarCliente} disabled={loading} style={{ background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: '4px' }}>
                {loading ? 'Guardando...' : editandoCliente ? 'Guardar cambios' : 'Crear cliente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {panelContrato && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(0,0,0,0.4)' }} onClick={() => setPanelContrato(false)}>
          <div
            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '440px', background: S.bg1, borderLeft: `0.5px solid ${S.border}`, zIndex: 50, overflowY: 'auto', padding: '24px', boxSizing: 'border-box' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: S.text }}>Nuevo contrato</div>
              <button onClick={() => setPanelContrato(false)} style={{ background: 'transparent', border: 'none', color: S.muted2, cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {error && <div style={{ fontSize: '12px', color: S.error, background: 'rgba(224,82,82,0.08)', padding: '8px 12px', borderRadius: '2px', marginBottom: '14px' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={lbl}>Cliente *</label>
                <select style={inp} value={contratoForm.clienteId} onChange={(e) => setContratoForm((f) => ({ ...f, clienteId: e.target.value }))}>
                  <option value="">Seleccionar...</option>
                  {initialClientes.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={lbl}>Fee mensual</label>
                  <input style={inp} type="number" step="0.01" value={contratoForm.valorMensual} onChange={(e) => setContratoForm((f) => ({ ...f, valorMensual: e.target.value }))} />
                </div>
                <div>
                  <label style={lbl}>Moneda</label>
                  <select style={inp} value={contratoForm.moneda} onChange={(e) => setContratoForm((f) => ({ ...f, moneda: e.target.value }))}>
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={lbl}>Inicio contrato</label>
                  <input type="date" style={inp} value={contratoForm.inicioContrato} onChange={(e) => setContratoForm((f) => ({ ...f, inicioContrato: e.target.value }))} />
                </div>
                <div>
                  <label style={lbl}>Renovación *</label>
                  <input type="date" style={inp} value={contratoForm.renovacionContrato} onChange={(e) => setContratoForm((f) => ({ ...f, renovacionContrato: e.target.value }))} />
                </div>
              </div>

              <button onClick={guardarContrato} disabled={loading} style={{ background: S.red, color: '#fff', padding: '10px', fontSize: '12px', borderRadius: '2px', border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: '4px' }}>
                {loading ? 'Guardando...' : 'Crear contrato'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
