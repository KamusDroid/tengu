import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'

type Item = { descripcion: string; cantidad: number; precio: number }

function esc(s: string | null | undefined): string {
  if (!s) return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escAttr(s: string | null | undefined): string {
  return esc(s).replace(/\n/g, '&#10;')
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get('tengu_token')?.value
  if (!token) return new NextResponse('No autorizado', { status: 401 })

  try {
    const user = verifyToken(token)
    if (!isAdmin(user)) return new NextResponse('Forbidden', { status: 403 })
  } catch {
    return new NextResponse('No autorizado', { status: 401 })
  }

  const factura = await crmDb.invoice.findUnique({
    where: { id },
    include: { cliente: true },
  })
  if (!factura) return new NextResponse('No encontrada', { status: 404 })

  let items: Item[] = []
  try {
    items = JSON.parse(factura.items ?? '[]')
  } catch {
    items = []
  }

  const subtotal = factura.subtotal / 100
  const iva = factura.montoIva / 100
  const descuento = factura.descuento / 100
  const total = factura.total / 100

  const fmt = (n: number) =>
    factura.moneda === 'USD' ? 'U$S ' + n.toFixed(2) : '$ ' + Math.round(n).toLocaleString('es-AR')

  const html = buildHTML({
    id: factura.id,
    numero: factura.numero,
    moneda: factura.moneda,
    tasaIva: factura.tasaIva,
    emitidaEn: factura.emitidaEn,
    venceEn: factura.venceEn,
    clienteNombre: factura.cliente.nombre,
    clienteEmail: factura.cliente.email,
    clienteTelefono: factura.cliente.telefono,
    items,
    subtotal,
    iva,
    descuento,
    total,
    notas: factura.notas,
    datosPago: factura.datosPago,
    fmt,
  })

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

function buildHTML(f: {
  id: string
  numero: string
  moneda: string
  tasaIva: number
  emitidaEn: Date
  venceEn: Date
  clienteNombre: string
  clienteEmail: string | null
  clienteTelefono: string | null
  items: Item[]
  subtotal: number
  iva: number
  descuento: number
  total: number
  notas: string | null
  datosPago: string | null
  fmt: (n: number) => string
}): string {
  const clienteDetalle = [f.clienteEmail, f.clienteTelefono].filter(Boolean).join(' · ')
  const notas = f.notas ?? 'Gracias por confiar en TENGU.'
  const datosPago = f.datosPago ?? 'Transferencia bancaria\nCBU: 0000003100012345678901\nAlias: TENGU.VENTAS\nTitular: Walter M. Amengual'

  const filas = (f.items.length > 0 ? f.items : [{ descripcion: '', cantidad: 1, precio: 0 }])
    .map((it) => {
      const totalItem = it.cantidad * it.precio
      return `
        <tr data-row>
          <td data-field="descripcion" contenteditable="false">${esc(it.descripcion)}</td>
          <td data-field="cantidad" contenteditable="false" style="text-align:center">${it.cantidad}</td>
          <td data-field="precio" contenteditable="false" style="text-align:right">${f.fmt(it.precio)}</td>
          <td data-field="total" style="text-align:right">${f.fmt(totalItem)}</td>
          <td class="row-actions"><button type="button" class="del-row" onclick="deleteRow(this)">✕</button></td>
        </tr>`
    })
    .join('')

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Factura ${esc(f.numero)} — TENGU</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Syne:wght@700;800&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
  :root {
    --ink: #0a0a0a; --bone: #f0ece4; --crimson: #c0392b; --mist: #8a8480; --paper: #faf8f4;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #1a1a1a; font-family: 'Cormorant Garamond', serif; color: var(--ink);
    padding-top: 64px;
  }
  .toolbar {
    position: fixed; top: 0; left: 0; right: 0; height: 56px; z-index: 100;
    background: rgba(10,10,10,0.95); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(192,57,43,0.2);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px;
  }
  .toolbar .brand { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: 0.2em; color: var(--bone); font-size: 14px; }
  .toolbar .meta { font-family: 'DM Mono', monospace; font-size: 10px; text-transform: uppercase; color: var(--mist); }
  .toolbar .actions { display: flex; gap: 8px; }
  .toolbar button {
    font-family: 'DM Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em;
    padding: 8px 14px; border-radius: 2px; border: 1px solid rgba(240,236,228,0.2);
    background: transparent; color: var(--bone); cursor: pointer;
  }
  .toolbar button.gold { background: #b8933a; border-color: #b8933a; color: var(--ink); }
  .toolbar button.primary { background: var(--crimson); border-color: var(--crimson); color: #fff; }
  .invoice {
    width: 794px; min-height: 1123px; margin: 32px auto; background: var(--paper);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5); position: relative;
  }
  .header {
    background: var(--ink); padding: 48px 56px; display: flex; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .header .brand { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; letter-spacing: 0.2em; color: var(--bone); }
  .header .tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; font-size: 13px; color: rgba(240,236,228,0.35); margin-top: 6px; }
  .header .titulo { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; font-size: 38px; color: var(--bone); text-align: right; }
  .header .meta { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(240,236,228,0.55); text-align: right; margin-top: 8px; line-height: 1.8; }
  .watermark {
    position: absolute; right: 24px; top: -10px; font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 88px; color: rgba(240,236,228,0.05); pointer-events: none;
  }
  .stripe { height: 4px; background: var(--crimson); }
  .partes { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid rgba(10,10,10,0.1); }
  .partes .parte { padding: 28px 56px; }
  .partes .parte.emisor { border-right: 1px solid rgba(10,10,10,0.1); }
  .partes .label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--crimson); margin-bottom: 8px; }
  .partes .nombre { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
  .partes .detalle { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--mist); white-space: pre-line; }
  table.items { width: 100%; border-collapse: collapse; margin: 24px 0; }
  table.items th {
    padding: 8px 4px; text-align: left; font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--mist); border-bottom: 1px solid rgba(10,10,10,0.15);
  }
  table.items td {
    padding: 10px 4px; font-size: 14px; border-bottom: 1px solid rgba(10,10,10,0.06);
    font-family: 'DM Mono', monospace;
  }
  .items-wrap { padding: 0 56px; }
  .row-actions { width: 20px; text-align: center; }
  .row-actions .del-row { display: none; background: transparent; border: none; color: var(--crimson); cursor: pointer; font-size: 12px; }
  .add-row-btn {
    display: none; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.05em;
    background: transparent; border: 1px dashed var(--crimson); color: var(--crimson);
    padding: 8px; width: 100%; cursor: pointer; margin-top: 8px; border-radius: 2px;
  }
  .totales { padding: 0 56px 24px; display: flex; justify-content: flex-end; }
  .totales-box { width: 300px; }
  .totales-box .linea { display: flex; justify-content: space-between; font-family: 'DM Mono', monospace; font-size: 12px; color: var(--mist); padding: 4px 0; }
  .totales-box .total-pagar { background: var(--ink); color: var(--bone); padding: 16px 20px; margin-top: 10px; border-radius: 2px; display: flex; justify-content: space-between; align-items: baseline; }
  .totales-box .total-pagar .lbl { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--crimson); font-size: 13px; }
  .totales-box .total-pagar .val { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 28px; }
  .footer-section { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(10,10,10,0.1); }
  .footer-section .col { padding: 24px 56px; }
  .footer-section .col.notas { border-right: 1px solid rgba(10,10,10,0.1); }
  .footer-section .label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--crimson); margin-bottom: 8px; }
  .footer-section .txt { font-size: 13px; white-space: pre-line; color: #333; }
  .bottom { background: var(--ink); border-top: 3px solid var(--crimson); padding: 20px 56px; display: flex; justify-content: space-between; align-items: center; }
  .bottom .brand { font-family: 'Syne', sans-serif; font-weight: 700; color: rgba(240,236,228,0.4); font-size: 13px; letter-spacing: 0.1em; }
  .bottom .contacto { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(240,236,228,0.4); }
  [contenteditable="true"] { outline: 1px dashed rgba(192,57,43,0.4); background: rgba(192,57,43,0.04); }

  @media print {
    body { padding-top: 0; background: none; }
    .toolbar, .add-row-btn, .row-actions { display: none !important; }
    .invoice { box-shadow: none; width: 100%; margin: 0; }
    [contenteditable] { outline: none; background: none; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <div class="brand">TENGU</div>
    <div class="meta">Factura ${esc(f.numero)} · Emitida ${f.emitidaEn.toLocaleDateString('es-AR')} · Vence ${f.venceEn.toLocaleDateString('es-AR')}</div>
    <div class="actions">
      <button type="button" onclick="toggleEdit()">Editar</button>
      <button type="button" onclick="resetInvoice()">Resetear</button>
      <button type="button" class="gold" onclick="recalculate()">Recalcular</button>
      <button type="button" class="primary" onclick="window.print()">Imprimir / PDF</button>
    </div>
  </div>

  <div class="invoice" id="invoice" data-iva-pct="${f.tasaIva}" data-moneda="${f.moneda}">
    <div class="header">
      <div>
        <div class="brand">TENGU</div>
        <div class="tagline">Sistemas que trabajan por vos.</div>
      </div>
      <div>
        <div class="titulo">Factura</div>
        <div class="meta">
          N° ${esc(f.numero)}<br/>
          Fecha: ${f.emitidaEn.toLocaleDateString('es-AR')}<br/>
          Vence: ${f.venceEn.toLocaleDateString('es-AR')}
        </div>
      </div>
      <div class="watermark">天狗</div>
    </div>

    <div class="stripe"></div>

    <div class="partes">
      <div class="parte emisor">
        <div class="label">— Emisor</div>
        <div class="nombre" data-field="emisor-nombre" contenteditable="false">Walter M. Amengual</div>
        <div class="detalle" data-field="emisor-detalle" contenteditable="false">ventas@tengu.com.ar · Castelar, Buenos Aires</div>
      </div>
      <div class="parte">
        <div class="label">— Cliente</div>
        <div class="nombre" data-field="cliente-nombre" contenteditable="false">${esc(f.clienteNombre)}</div>
        <div class="detalle" data-field="cliente-detalle" contenteditable="false">${esc(clienteDetalle)}</div>
      </div>
    </div>

    <div class="items-wrap">
      <table class="items">
        <thead>
          <tr>
            <th>Descripción</th>
            <th style="text-align:center">Cantidad</th>
            <th style="text-align:right">Precio unit.</th>
            <th style="text-align:right">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="items-body">
          ${filas}
        </tbody>
      </table>
      <button type="button" class="add-row-btn" onclick="addRow()">+ agregar ítem</button>

      <div class="totales">
        <div class="totales-box">
          <div class="linea"><span>Subtotal</span><span id="subtotal-val">${f.fmt(f.subtotal)}</span></div>
          <div class="linea"><span>IVA (${f.tasaIva}%)</span><span id="iva-val">${f.fmt(f.iva)}</span></div>
          <div class="linea"><span>Descuento</span><span id="descuento-val">${f.fmt(f.descuento)}</span></div>
          <div class="total-pagar">
            <span class="lbl">${f.moneda}</span>
            <span class="val" id="total-val">${f.fmt(f.total)}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div class="col notas">
        <div class="label">— Notas</div>
        <div class="txt" data-field="notas" contenteditable="false">${esc(notas)}</div>
      </div>
      <div class="col">
        <div class="label">— Datos de pago</div>
        <div class="txt" data-field="pago" contenteditable="false">${esc(datosPago)}</div>
      </div>
    </div>

    <div class="bottom">
      <div class="brand">TENGU</div>
      <div class="contacto" contenteditable="false">ventas@tengu.com.ar · Castelar, Buenos Aires</div>
    </div>
  </div>

  <script>
    var editing = false;
    var invoiceEl = document.getElementById('invoice');
    var ivaPct = parseFloat(invoiceEl.getAttribute('data-iva-pct')) || 0;
    var moneda = invoiceEl.getAttribute('data-moneda') || 'ARS';

    function parseNum(str) {
      if (!str) return 0;
      var s = String(str).replace(/[^0-9,.-]/g, '');
      s = s.replace(/\\./g, '').replace(',', '.');
      var n = parseFloat(s);
      return isNaN(n) ? 0 : n;
    }

    function formatMoney(n) {
      if (moneda === 'USD') return 'U\$S ' + n.toFixed(2);
      return '\$ ' + Math.round(n).toLocaleString('es-AR');
    }

    function toggleEdit() {
      editing = !editing;
      document.querySelectorAll('[data-field]').forEach(function (el) {
        el.setAttribute('contenteditable', editing ? 'true' : 'false');
      });
      document.querySelectorAll('#items-body td[data-field]').forEach(function (el) {
        if (el.getAttribute('data-field') !== 'total') el.setAttribute('contenteditable', editing ? 'true' : 'false');
      });
      document.querySelectorAll('.add-row-btn, .row-actions .del-row').forEach(function (el) {
        el.style.display = editing ? 'block' : 'none';
      });
    }

    function recalculate() {
      var rows = document.querySelectorAll('#items-body tr[data-row]');
      var subtotal = 0;
      rows.forEach(function (row) {
        var cant = parseNum(row.querySelector('[data-field="cantidad"]').textContent);
        var precio = parseNum(row.querySelector('[data-field="precio"]').textContent);
        var totalItem = cant * precio;
        row.querySelector('[data-field="total"]').textContent = formatMoney(totalItem);
        subtotal += totalItem;
      });
      var iva = subtotal * (ivaPct / 100);
      var descuento = parseNum(document.getElementById('descuento-val').textContent);
      var grand = subtotal + iva - descuento;
      document.getElementById('subtotal-val').textContent = formatMoney(subtotal);
      document.getElementById('iva-val').textContent = formatMoney(iva);
      document.getElementById('total-val').textContent = formatMoney(grand);
    }

    function addRow() {
      var tbody = document.getElementById('items-body');
      var tr = document.createElement('tr');
      tr.setAttribute('data-row', '');
      tr.innerHTML =
        '<td data-field="descripcion" contenteditable="true"></td>' +
        '<td data-field="cantidad" contenteditable="true" style="text-align:center">1</td>' +
        '<td data-field="precio" contenteditable="true" style="text-align:right">' + formatMoney(0) + '</td>' +
        '<td data-field="total" style="text-align:right">' + formatMoney(0) + '</td>' +
        '<td class="row-actions"><button type="button" class="del-row" onclick="deleteRow(this)" style="display:block">✕</button></td>';
      tbody.appendChild(tr);
    }

    function deleteRow(btn) {
      var rows = document.querySelectorAll('#items-body tr[data-row]');
      if (rows.length <= 1) return;
      btn.closest('tr').remove();
      recalculate();
    }

    function resetInvoice() {
      if (!confirm('¿Descartar los cambios y recargar la factura original?')) return;
      location.reload();
    }

    document.getElementById('items-body').addEventListener('blur', function (e) {
      var field = e.target.getAttribute && e.target.getAttribute('data-field');
      if (field === 'cantidad' || field === 'precio') recalculate();
    }, true);

    recalculate();
  </script>
</body>
</html>`
}
