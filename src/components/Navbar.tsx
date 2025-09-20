"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import ThemeToggle from "@/components/ThemeToggle"
import { navigationLinks } from "@/lib/content"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 bg-black/50 px-6 py-4 text-red-700 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-600">
          TENGU
        </Link>

        <div className="flex items-center space-x-4">
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
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

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
        </ul>
      )}
    </nav>
  )
}
