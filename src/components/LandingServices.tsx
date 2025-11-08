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
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold">Servicios</h2>
      <p className="mt-2 opacity-80">Accedé rápido a todo lo nuevo de Tengu.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl border p-5">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm opacity-80">{c.desc}</p>
            <Link
              href={c.href}
              className="mt-4 inline-flex rounded-full bg-black text-white px-4 py-2 hover:opacity-90"
            >
              {c.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs opacity-70">
        * Para comprar, necesitás iniciar sesión. Los pagos se procesan de forma segura con Stripe.
      </p>
    </section>
  )
}
