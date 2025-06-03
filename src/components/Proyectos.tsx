import RotatingImage from "./RotatingImage"
<RotatingImage />

const proyectos = [
  {
    nombre: 'TENGU Web',
    descripcion: 'Landing institucional en Next.js 15 + Tailwind 4.',
    stack: 'Next.js, Tailwind CSS',
    link: '/',
  },
  {
    nombre: 'API Tasks',
    descripcion: 'API REST para tareas usando FastAPI.',
    stack: 'FastAPI, SQLModel',
    link: '#',
  },
  {
    nombre: 'Demo IA Chat',
    descripcion: 'Mini app de chat con IA personalizada.',
    stack: 'Python, LangChain, React',
    link: '#',
  },
]

export default function Proyectos() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Proyectos</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {proyectos.map((p, i) => (
          <div
            key={i}
            className="bg-[#615353] p-6 rounded-xl border border-[#796363]"
          >
            
            <h3 className="text-xl font-semibold mb-1">{p.nombre}</h3>
            <p className="text-sm text-zinc-400 mb-2">{p.descripcion}</p>
            <p className="text-xs text-zinc-500 mb-4">Stack: {p.stack}</p>
            <a
              href={p.link}
              className="text-red-800 text-sm hover:underline"
            >
              Ver más →
            </a>
            
          </div>
        ))}
      </div>
      
    </section>
  )
}
