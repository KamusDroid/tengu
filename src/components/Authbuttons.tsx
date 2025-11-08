// src/components/AuthButtons.tsx
"use client"

import Link from "next/link"

export default function AuthButtons() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/login" className="opacity-80 hover:opacity-100">
          Ingresar
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-black text-white px-4 py-2 hover:opacity-90"
        >
          Crear cuenta
        </Link>
      </div>

      {/* Mobile (si tu navbar tiene menú colapsable, estos quedan visibles) */}
      <div className="md:hidden flex flex-col gap-2">
        <Link href="/login" className="w-full text-left underline">
          Ingresar
        </Link>
        <Link
          href="/register"
          className="w-full text-center rounded-full bg-black text-white px-4 py-2"
        >
          Crear cuenta
        </Link>
      </div>
    </>
  )
}
