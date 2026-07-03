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

  const logoConfig = await crmDb.configuracionSitio.findUnique({ where: { clave: 'facturacion.logo_url' } })
  const logoUrl = logoConfig?.valor || null

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
    logoUrl,
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
  logoUrl: string | null
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
<style>
  :root {
    --bg0: #050507; --bg1: #0d0d10; --bg2: #111115; --bg3: #1a1a1f;
    --red: #e63946; --border: rgba(192,57,43,0.18);
    --text: #f0ede6; --muted: rgba(240,237,230,0.45); --muted2: rgba(240,237,230,0.22);
    --green: #5dc87a; --amber: #c8a84b; --error: #e05252;
  }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0; background: var(--bg0); color: var(--text); padding-top: 64px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .toolbar {
    position: fixed; top: 0; left: 0; right: 0; height: 56px; z-index: 100;
    background: rgba(5,5,7,0.95); backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px;
  }
  .toolbar .brand { font-weight: 500; letter-spacing: 3px; color: var(--red); font-size: 13px; }
  .toolbar .meta { font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
  .toolbar .actions { display: flex; gap: 8px; }
  .toolbar button {
    font-size: 10px; text-transform: uppercase; letter-spacing: 1px;
    padding: 8px 14px; border-radius: 2px; border: 0.5px solid var(--border);
    background: transparent; color: var(--text); cursor: pointer;
  }
  .toolbar button.gold { background: var(--amber); border-color: var(--amber); color: var(--bg0); }
  .toolbar button.primary { background: var(--red); border-color: var(--red); color: #fff; }
  .invoice {
    width: 794px; min-height: 1123px; margin: 32px auto; background: var(--bg1);
    border: 0.5px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.5); position: relative;
    display: flex; flex-direction: column;
  }
  .header {
    background: var(--bg0); padding: 40px 56px 32px; display: flex; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .header .brand { font-weight: 600; font-size: 22px; letter-spacing: 4px; color: var(--red); }
  .header .logo-img { max-height: 84px; max-width: 300px; object-fit: contain; display: block; }
  .header .tagline { font-size: 11px; color: var(--muted2); margin-top: 8px; letter-spacing: 0.3px; }
  .header .titulo {
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted2);
    text-align: right;
  }
  .header .numero { font-family: monospace; font-size: 20px; color: var(--text); text-align: right; margin-top: 4px; }
  .header .meta { font-family: monospace; font-size: 11px; color: var(--muted); text-align: right; margin-top: 10px; line-height: 1.8; }
  .watermark {
    position: absolute; right: 24px; top: -10px; font-size: 88px; color: rgba(230,57,70,0.04);
    pointer-events: none; font-weight: 700;
  }
  .glow {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(192,57,43,0.45) 30%, rgba(230,57,70,0.6) 50%, rgba(192,57,43,0.45) 70%, transparent);
  }
  .partes { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 0.5px solid var(--border); }
  .partes .parte { padding: 24px 56px; }
  .partes .parte.emisor { border-right: 0.5px solid var(--border); }
  .partes .label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--red); margin-bottom: 8px; }
  .partes .nombre { font-size: 14px; font-weight: 500; margin-bottom: 4px; color: var(--text); }
  .partes .detalle { font-family: monospace; font-size: 11px; color: var(--muted); white-space: pre-line; }
  table.items { width: 100%; border-collapse: collapse; margin: 20px 0; }
  table.items th {
    padding: 8px 4px; text-align: left; font-size: 9px;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted2); border-bottom: 0.5px solid var(--border);
  }
  table.items td {
    padding: 10px 4px; font-size: 13px; border-bottom: 0.5px solid var(--border);
    color: var(--text);
  }
  table.items td[data-field="cantidad"], table.items td[data-field="precio"], table.items td[data-field="total"] {
    font-family: monospace; color: var(--muted);
  }
  table.items td[data-field="total"] { color: var(--text); }
  .items-wrap { padding: 0 56px; }
  .row-actions { width: 20px; text-align: center; }
  .row-actions .del-row { display: none; background: transparent; border: none; color: var(--red); cursor: pointer; font-size: 12px; }
  .add-row-btn {
    display: none; font-size: 10px; letter-spacing: 1px;
    background: transparent; border: 1px dashed var(--border); color: var(--muted);
    padding: 8px; width: 100%; cursor: pointer; margin-top: 8px; border-radius: 2px;
  }
  .totales { padding: 0 56px 24px; display: flex; justify-content: flex-end; }
  .totales-box { width: 300px; }
  .totales-box .linea { display: flex; justify-content: space-between; font-family: monospace; font-size: 12px; color: var(--muted); padding: 4px 0; }
  .totales-box .total-pagar {
    background: var(--bg2); border: 0.5px solid var(--border); color: var(--text);
    padding: 16px 20px; margin-top: 10px; border-radius: 2px; display: flex; justify-content: space-between; align-items: baseline;
  }
  .totales-box .total-pagar .lbl { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--red); }
  .totales-box .total-pagar .val { font-family: monospace; font-weight: 500; font-size: 22px; }
  .footer-section { display: grid; grid-template-columns: 1fr 1fr; border-top: 0.5px solid var(--border); }
  .footer-section .col { padding: 24px 56px; }
  .footer-section .col.notas { border-right: 0.5px solid var(--border); }
  .footer-section .label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--red); margin-bottom: 8px; }
  .footer-section .txt { font-size: 12px; white-space: pre-line; color: var(--muted); }
  .bottom { background: var(--bg0); border-top: 2px solid var(--red); padding: 20px 56px; display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
  .bottom .brand { font-weight: 500; color: var(--muted2); font-size: 12px; letter-spacing: 3px; }
  .bottom .contacto { font-family: monospace; font-size: 10px; color: var(--muted2); }
  [contenteditable="true"] { outline: 1px dashed rgba(230,57,70,0.4); background: rgba(230,57,70,0.05); }

  @page { size: A4; margin: 0; }
  @media print {
    body { padding-top: 0; background: var(--bg0); }
    .toolbar, .add-row-btn, .row-actions { display: none !important; }
    .invoice { box-shadow: none; margin: 0 auto; }
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
        ${f.logoUrl
          ? `<img src="${escAttr(f.logoUrl)}" alt="Logo" class="logo-img" />`
          : `<div class="brand">TENGU</div>`}
        <div class="tagline">Sistemas que trabajan por vos.</div>
      </div>
      <div>
        <div class="titulo">Factura</div>
        <div class="numero">${esc(f.numero)}</div>
        <div class="meta">
          Fecha: ${f.emitidaEn.toLocaleDateString('es-AR')}<br/>
          Vence: ${f.venceEn.toLocaleDateString('es-AR')}
        </div>
      </div>
      <div class="watermark">天狗</div>
    </div>

    <div class="glow"></div>

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
