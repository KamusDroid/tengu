const proyectos = [
  {
    nombre: 'TENGU Web',
    descripcion: 'Landing institucional en Next.js 15 + Tailwind 4.',
    stack: 'Next.js, Tailwind CSS',
    url: "https://www.tengu.com.ar"
  },
  {
    nombre: 'API Tasks',
    descripcion: 'API REST para tareas usando FastAPI.',
    stack: 'FastAPI, SQLModel',
    url: "#"
  },
  {
    nombre: 'Demo IA Chat',
    descripcion: 'Mini app de chat con IA personalizada.',
    stack: 'Python, LangChain, React',
    url: "#"
  },
    {
    nombre: 'Cucinarte Web',
    descripcion: 'Landing Institucional.',
    stack: 'Next.js, Tailwind CSS',
    url: "https://www.cucinarte.com.ar"
  },
]

export default function Proyectos() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Proyectos</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {proyectos.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#615353] p-6 rounded-xl border border-[#796363] transition-transform hover:scale-105 hover:shadow-lg block vortex-hover"
          >
            <h3 className="text-xl font-semibold mb-1">{p.nombre}</h3>
            <p className="text-sm text-zinc-400 mb-2">{p.descripcion}</p>
            <p className="text-xs text-zinc-500">Stack: {p.stack}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
