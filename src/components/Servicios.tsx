import { Code2, Brain, MousePointerClick } from 'lucide-react'

const servicios = [
  {
    icon: Code2,
    titulo: 'Desarrollo Web',
    descripcion: 'Creamos sitios rápidos, modernos y optimizados.',
    url: '#',
  },
  {
    icon: Brain,
    titulo: 'IA Aplicada',
    descripcion: 'Integramos inteligencia artificial en soluciones prácticas.',
    url: '#',
  },
  {
    icon: MousePointerClick,
    titulo: 'UX Gamificada',
    descripcion: 'Diseños interactivos y experiencias memorables.',
    url: '#',
  },
]

export default function Servicios() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Servicios</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {servicios.map(({ icon: Icon, titulo, descripcion, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#615353] p-6 rounded-xl border border-[#796363] transition-transform hover:scale-105 hover:shadow-lg block text-center vortex-hover"
          >
            <Icon className="h-10 w-10 mx-auto text-red-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
            <p className="text-zinc-400">{descripcion}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
