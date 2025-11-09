import Link from "next/link"
import { Brain, Code2, MousePointerClick } from "lucide-react"

import { services } from "@/lib/content"

const iconLibrary = {
  Brain,
  Code2,
  MousePointerClick
}

export default function Servicios() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <h2 id="servicios-title" className="mb-12 text-3xl font-bold">
          Servicios
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map(({ icon, titulo, descripcion, url }) => {
          const Icon = iconLibrary[icon as keyof typeof iconLibrary]
          const isExternal = url.startsWith("http")

          return (
            <Link
              key={titulo}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              prefetch={isExternal ? false : undefined}
              className="vortex-hover block rounded-xl border border-[#796363] bg-[#615353] p-6 text-center transition-transform hover:scale-105 hover:shadow-lg"
            >
              {Icon && <Icon aria-hidden className="mx-auto mb-4 h-10 w-10 text-red-800" />}
              <h3 className="mb-2 text-xl font-semibold  text-red-800">{titulo}</h3>
              <p className="font-semibold text-gray-400">{descripcion}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
