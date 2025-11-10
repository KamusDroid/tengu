"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import ThemeToggle from "@/components/ThemeToggle"
import { navigationLinks } from "@/lib/content"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me")
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
      await fetch("/api/auth/logout", { method: "POST" })
      setUserEmail(null)
      router.push("/login")
      router.refresh()
    } finally {
      setOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-10 bg-black/50 px-6 py-4 text-red-700 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-600">
          TENGU
        </Link>

        <div className="flex items-center space-x-4">
          {/* Desktop navigation */}
          <div className="hidden space-x-6 text-sm md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-red-600 transition-all duration-300 text-neon-hover"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!checkingAuth && (
              userEmail ? (
                <>
                  <span className="text-xs text-red-200">{userEmail}</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded px-3 py-1 text-xs border border-red-400 text-red-100 hover:bg-red-700/40"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-red-600 transition-all duration-300 text-neon-hover"
                    onClick={() => setOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-black px-4 py-1.5 text-sm text-white hover:opacity-90"
                    onClick={() => setOpen(false)}
                  >
                    Crear cuenta
                  </Link>
                </>
              )
            )}
          </div>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="ml-2 rounded p-2 text-red-600 hover:bg-red-600/10 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <ul className="mt-4 space-y-2 text-sm md:hidden">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded px-4 py-2 transition-colors hover:bg-red-600 dark:hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {!checkingAuth && (
            userEmail ? (
              <>
                <li className="px-4 text-xs text-red-100">{userEmail}</li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded px-4 py-2 text-left text-sm text-red-50 hover:bg-red-600/70"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="block rounded px-4 py-2 transition-colors hover:bg-red-600 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="block rounded px-4 py-2 transition-colors hover:bg-red-600 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    Crear cuenta
                  </Link>
                </li>
              </>
            )
          )}
        </ul>
      )}
    </nav>
  )
}
