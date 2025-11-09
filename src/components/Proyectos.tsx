import Link from "next/link"

import { projects } from "@/lib/content"

export default function Proyectos() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="mx-auto max-w-6xl px-4 py-20"
    >
      <div className="text-center">
        <h2 id="proyectos-title" className="mb-12 text-3xl font-bold">
          Proyectos
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project) => {
          const isExternal = project.url.startsWith("http")

          return (
            <Link
              key={project.nombre}
              href={project.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              prefetch={isExternal ? false : undefined}
              className="vortex-hover block rounded-xl border border-[#796363] bg-[#615353] p-6 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="mb-1 text-xl font-semibold  text-red-800">{project.nombre}</h3>
              <p className="mb-2 text-md font-semibold text-gray-400">{project.descripcion}</p>
              <p className="text-sm text-gray-400">Stack: {project.stack}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
