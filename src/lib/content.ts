export type NavLink = {
  href: string
  label: string
}

export type ServiceIcon = "Code2" | "Brain" | "MousePointerClick"

export type ServiceItem = {
  icon: ServiceIcon
  titulo: string
  descripcion: string
  url: string
}

export type ProjectItem = {
  nombre: string
  descripcion: string
  stack: string
  url: string
}

export type AboutContent = {
  heading: string
  paragraphs: string[]
  highlight: string
  supportNote: string
}

export const navigationLinks: NavLink[] = [
  { href: "/#hero", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contacto", label: "Contacto" }
]

export const heroContent = {
  id: "hero",
  title: "TENGU",
  description: "Donde las ideas digitales cobran vida.",
  cta: {
    label: "Contáctanos",
    href: "https://chat.whatsapp.com/FK8uIDZ1m0Z2pLq81I5ODd"
  }
}

export const services: ServiceItem[] = [
  {
    icon: "Code2",
    titulo: "Desarrollo Web",
    descripcion: "Creamos sitios rápidos, modernos y optimizados.",
    url: "#"
  },
  {
    icon: "Brain",
    titulo: "IA Aplicada",
    descripcion: "Integramos inteligencia artificial en soluciones prácticas.",
    url: "#"
  },
  {
    icon: "MousePointerClick",
    titulo: "UX Gamificada",
    descripcion: "Diseños interactivos y experiencias memorables.",
    url: "#"
  }
]

export const projects: ProjectItem[] = [
  {
    nombre: "TENGU Web",
    descripcion: "Landing institucional en Next.js 15 + Tailwind 4.",
    stack: "Next.js, Tailwind CSS",
    url: "https://www.tengu.com.ar"
  },
  {
    nombre: "API Tasks",
    descripcion: "API REST para tareas usando FastAPI.",
    stack: "FastAPI, SQLModel",
    url: "#"
  },
  {
    nombre: "Demo IA Chat",
    descripcion: "Mini app de chat con IA personalizada.",
    stack: "Python, LangChain, React",
    url: "#"
  },
    {
    nombre: "FungicaLAB",
    descripcion: "Pagina Web + Tienda + Panel de Administración y Analítica para FungicaLAB, laboratorio de análisis de hongos y suelos. Incluye Agente AI para asistencia de compras y consultas, integración con Mercado Pago.",
    stack: "Next.JS, Tailwind CSS, Agente AI Chat, Mercado Pago, Supabase, Emailing",
    url: "https://www.fungicalab.com.ar"
  },
  {
    nombre: "Eco Nails So Cute",
    descripcion: "Landing web + Marketplace para la marca Eco Nails So Cute",
    stack: "WordPress, WooCommerce",
    url: "https://www.econailssocute.com.ar"
  }
]

export const aboutContent: AboutContent = {
  heading: "¿Quién está detrás de TENGU?",
  paragraphs: [
    "Soy Walter Matías Amengual, fundador de Tengu.com.ar. Ingeniero de soluciones con foco en desarrollo de software, inteligencia artificial y automatización de procesos — construyendo sistemas que trabajan por vos.",
    "Tengu existe para cerrar la brecha entre la idea y la ejecución. Empresas, PyMEs y startups que necesitan escalar sin sumar complejidad encuentran en Tengu un socio técnico y estratégico real, no solo un proveedor.",
    "Desarrollamos software multiplataforma a medida, integramos IA generativa en flujos de trabajo existentes, automatizamos procesos operativos y construimos herramientas de gestión que dan visibilidad y control total sobre el negocio.",
    "También acompañamos organizaciones en su transformación digital: desde la auditoría y diagnóstico de procesos hasta la consultoría estratégica en tecnología y Data & Analytics — con foco en decisiones que mueven la aguja.",
    "Nuestro stack combina React / Next.js, FastAPI / Django, Python, SQL y Docker en el frontend y backend; Kubernetes, Spark y cloud AWS / GCP / Azure para infraestructura escalable; y LangChain, OpenAI y Anthropic para soluciones de IA generativa y agentes inteligentes.",
    "¿Por qué 'Tengu'? En la mitología japonesa, el Tengu domina el cielo con precisión y maestría. Cada proyecto que tomamos tiene ese mismo estándar: ejecución impecable, visión de largo plazo."
  ],
  highlight: "No vendemos horas. Construimos sistemas y acompañamos decisiones. Tecnología robusta, criterio estratégico y resultados medibles para empresas que quieren operar en otro nivel.",
  supportNote: "Respaldado por un equipo de especialistas en marketing, ventas y diseño gráfico."
};

