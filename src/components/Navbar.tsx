"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

const links = [
  { href: "/", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contacto", label: "Contacto" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-black/50 text-red-700 px-6 py-4 sticky top-0 z-10 shadow-sm backdrop-blur">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <span className="font-bold text-xl text-red-600">TENGU</span>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-6 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-red-600 text-sm transition-all duration-300 text-neon-hover"
              >
                {l.label}
              </a>
            ))}
          </div>

          <ThemeToggle />

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <ul className="md:hidden mt-4 space-y-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block py-2 px-4 rounded hover:bg-red-600 dark:hover:bg-zinc-800 transition-colors opacity-20"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
