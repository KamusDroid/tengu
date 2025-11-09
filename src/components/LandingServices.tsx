// src/components/LandingServices.tsx
import Link from "next/link"

const cards = [
  {
    title: "Marketplace",
    desc: "Explorá productos y servicios. Pagos con Stripe.",
    href: "/marketplace",
    cta: "Explorar",
  },
  {
    title: "Ingresar",
    desc: "Accedé a tu cuenta para ver tus compras y datos.",
    href: "/login",
    cta: "Ingresar",
  },
  {
    title: "Crear cuenta",
    desc: "Registrate para comprar y guardar tus pedidos.",
    href: "/register",
    cta: "Registrarme",
  },
]

export default function LandingServices() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-12 text-3xl font-bold">Accedé rápido a todo lo nuevo de Tengu</h2>
     

      <div className="grid gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="vortex-hover block rounded-xl border border-[#796363] bg-[#615353] p-6 transition-transform hover:scale-105 hover:shadow-lg">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-400">{c.desc}</p>
              <Link
                href={c.href}
                className="mt-4 inline-flex rounded-full bg-red-900 text-white px-4 py-2 hover:opacity-80"
              >
                {c.cta}
              </Link>
            </div>
          ))}
        </div>

      <p className="mt-6 text-xs opacity-90">
        * Para comprar, necesitás iniciar sesión. Los pagos se procesan de forma segura con Stripe.
      </p>
    </section>
  )
}
