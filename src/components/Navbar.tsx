'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useI18n, type Locale } from '@/lib/i18n'

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const { locale, setLocale, t } = useI18n()

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setUserEmail(data.email as string)
        } else {
          setUserEmail(null)
        }
      } catch {
        setUserEmail(null)
      } finally {
        setCheckingAuth(false)
      }
    }
    loadUser()
  }, [])

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUserEmail(null)
      router.push('/login')
      router.refresh()
    } finally {
      setOpen(false)
    }
  }

  return (
    <nav
      style={{
        background: 'rgba(5,5,7,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '0.5px solid rgba(192,57,43,0.18)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <Image
            src="/tomoe.png"
            width={28}
            height={28}
            alt="TENGU"
            className="animate-spin-nav"
            style={{ opacity: 0.9, width: '28px', height: '28px' }}
          />
          <span
            style={{
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '4px',
              color: '#f0ede6',
              opacity: 0.9,
            }}
          >
            TENGU
          </span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '16px' }}>
            {t.navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-link"
                style={{ fontSize: '13px', color: 'rgba(240,237,230,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', borderLeft: '0.5px solid rgba(192,57,43,0.2)', paddingLeft: '14px' }}>
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  style={{
                    background: locale === l.code ? 'rgba(192,57,43,0.15)' : 'none',
                    border: locale === l.code ? '0.5px solid rgba(192,57,43,0.35)' : '0.5px solid transparent',
                    color: locale === l.code ? '#e63946' : 'rgba(240,237,230,0.3)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    padding: '3px 7px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {!checkingAuth && (
              userEmail ? (
                <>
                  <span style={{ fontSize: '11px', color: 'rgba(240,237,230,0.3)' }}>{userEmail}</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{ border: '0.5px solid rgba(192,57,43,0.25)', color: 'rgba(240,237,230,0.4)', background: 'transparent', padding: '6px 14px', fontSize: '12px', borderRadius: '1px', cursor: 'pointer' }}
                  >
                    {locale === 'es' ? 'Cerrar sesión' : locale === 'en' ? 'Log out' : 'Esci'}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} style={{ fontSize: '13px', color: 'rgba(240,237,230,0.5)', textDecoration: 'none' }}>
                    {locale === 'es' ? 'Ingresar' : locale === 'en' ? 'Log in' : 'Accedi'}
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)} style={{ background: '#e63946', color: '#fff', padding: '7px 16px', fontSize: '12px', borderRadius: '1px', textDecoration: 'none' }}>
                    {locale === 'es' ? 'Crear cuenta' : locale === 'en' ? 'Sign up' : 'Registrati'}
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            style={{ background: 'transparent', border: 'none', color: 'rgba(240,237,230,0.6)', cursor: 'pointer', padding: '4px' }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '0.5px solid rgba(192,57,43,0.18)', padding: '12px 24px 16px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {t.navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ display: 'block', padding: '10px 0', fontSize: '13px', color: 'rgba(240,237,230,0.5)', textDecoration: 'none', borderBottom: '0.5px solid rgba(192,57,43,0.08)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Language switcher mobile */}
            <li style={{ paddingTop: '12px', display: 'flex', gap: '6px' }}>
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLocale(l.code); setOpen(false) }}
                  style={{
                    background: locale === l.code ? 'rgba(192,57,43,0.15)' : 'none',
                    border: locale === l.code ? '0.5px solid rgba(192,57,43,0.35)' : '0.5px solid rgba(240,237,230,0.1)',
                    color: locale === l.code ? '#e63946' : 'rgba(240,237,230,0.3)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    padding: '5px 12px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </li>

            {!checkingAuth && (
              userEmail ? (
                <>
                  <li style={{ fontSize: '11px', color: 'rgba(240,237,230,0.3)', padding: '8px 0' }}>{userEmail}</li>
                  <li>
                    <button type="button" onClick={handleLogout} style={{ border: '0.5px solid rgba(192,57,43,0.25)', color: 'rgba(240,237,230,0.4)', background: 'transparent', padding: '8px 16px', fontSize: '12px', borderRadius: '1px', cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '8px' }}>
                      {locale === 'es' ? 'Cerrar sesión' : locale === 'en' ? 'Log out' : 'Esci'}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: '13px', color: 'rgba(240,237,230,0.5)', textDecoration: 'none' }}>
                      {locale === 'es' ? 'Ingresar' : locale === 'en' ? 'Log in' : 'Accedi'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" onClick={() => setOpen(false)} style={{ display: 'inline-block', marginTop: '8px', background: '#e63946', color: '#fff', padding: '8px 20px', fontSize: '12px', borderRadius: '1px', textDecoration: 'none' }}>
                      {locale === 'es' ? 'Crear cuenta' : locale === 'en' ? 'Sign up' : 'Registrati'}
                    </Link>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
      )}

      <style>{`.nav-link:hover { color: #e63946 !important; }`}</style>
    </nav>
  )
}
