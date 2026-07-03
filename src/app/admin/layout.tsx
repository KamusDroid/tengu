'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { group: 'Principal', items: [
    { href: '/admin', label: 'Dashboard', icon: '◈' },
    { href: '/admin/analitica', label: 'Analítica', icon: '◎' },
  ]},
  { group: 'Comercio', items: [
    { href: '/admin/productos', label: 'Productos', icon: '▣' },
    { href: '/admin/pedidos', label: 'Pedidos', icon: '⊕' },
    { href: '/admin/stock', label: 'Stock', icon: '⊟' },
    { href: '/admin/cupones', label: 'Cupones', icon: '◇' },
    { href: '/admin/facturacion', label: 'Facturación', icon: '◎' },
  ]},
  { group: 'Clientes', items: [
    { href: '/admin/usuarios', label: 'Usuarios', icon: '⊙' },
    { href: '/admin/roles', label: 'Roles', icon: '⬡' },
    { href: '/admin/leads', label: 'Leads', icon: '◌' },
  ]},
  { group: 'Contenido', items: [
    { href: '/admin/blog', label: 'Blog', icon: '◫' },
    { href: '/admin/academia', label: 'Academia', icon: '◑' },
    { href: '/admin/calendario', label: 'Calendario', icon: '▦' },
    { href: '/admin/nosotros', label: 'Nosotros', icon: '◐' },
    { href: '/admin/medios', label: 'Medios', icon: '▤' },
  ]},
  { group: 'Comunicación', items: [
    { href: '/admin/email', label: 'Email', icon: '◻' },
    { href: '/admin/redes', label: 'Redes Sociales', icon: '◉' },
    { href: '/admin/chat-ia', label: 'Chat IA', icon: '◈' },
  ]},
  { group: 'Sistema', items: [
    { href: '/admin/ajustes', label: 'Ajustes', icon: '⚙' },
  ]},
]

const bg0 = '#050507'
const bg1 = '#0d0d10'
const border = 'rgba(192,57,43,0.18)'
const red = '#e63946'
const text = '#f0ede6'
const muted2 = 'rgba(240,237,230,0.22)'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const sidebar = (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        background: bg1,
        borderRight: `0.5px solid ${border}`,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 16px 16px',
          borderBottom: `0.5px solid ${border}`,
        }}
      >
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: red, letterSpacing: '3px' }}>
            TENGU
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: muted2, marginTop: '2px' }}>
            Admin Panel
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV_ITEMS.map((group) => (
          <div key={group.group} style={{ marginBottom: '4px' }}>
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: muted2,
                padding: '10px 16px 4px',
              }}
            >
              {group.group}
            </div>
            {group.items.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 16px',
                    fontSize: '12px',
                    color: active ? text : 'rgba(240,237,230,0.45)',
                    textDecoration: 'none',
                    borderLeft: active ? `2px solid ${red}` : '2px solid transparent',
                    background: active ? 'rgba(192,57,43,0.07)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: '11px', color: active ? red : muted2 }}>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: `0.5px solid ${border}`,
          fontSize: '10px',
          color: muted2,
        }}
      >
        <Link href="/" style={{ color: muted2, textDecoration: 'none' }}>← Volver al sitio</Link>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg0, color: text }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">{sidebar}</div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
          }}
        >
          <div
            style={{ flex: 1, background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}>
            {sidebar}
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile topbar */}
        <div
          className="flex md:hidden"
          style={{
            padding: '12px 16px',
            borderBottom: `0.5px solid ${border}`,
            background: bg1,
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'transparent', border: 'none', color: text, cursor: 'pointer', fontSize: '18px' }}
          >
            ☰
          </button>
          <span style={{ fontSize: '13px', fontWeight: 500, color: red, letterSpacing: '3px' }}>TENGU Admin</span>
        </div>

        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
