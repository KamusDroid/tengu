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
  { href: "#hero", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contacto", label: "Contacto" }
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
    nombre: "Cucinarte Web",
    descripcion: "Landing institucional para la marca Cucinarte.",
    stack: "Next.js, Tailwind CSS",
    url: "https://www.cucinarte.com.ar"
  }
]

export const aboutContent: AboutContent = {
  heading: "¿Quién está detrás de TENGU?",
  paragraphs: [
    "¡Hola! Soy Walter Matías Amengual, el creador de Tengu.com.ar. Soy un profesional apasionado por la tecnología, la ciencia de datos y el desarrollo de soluciones innovadoras.",
    "Mi enfoque combina experiencia técnica, pensamiento estratégico y una fuerte vocación por resolver problemas reales mediante datos, automatización y diseño inteligente.",
    "En Tengu desarrollo e implemento proyectos de data science, ingeniería de datos, analítica de negocios, desarrollo web, automatización y marketing digital.",
    "Trabajo con tecnologías modernas como Python, JavaScript, SQL, Docker, Kubernetes, Spark, Pandas y más, mientras continúo formándome en cloud computing, ciberseguridad y robótica en el marco del proyecto Gaia OMNIA.",
    "¿Por qué 'Tengu'? El nombre representa la mezcla entre lo místico y lo técnico. Así como en la mitología japonesa domina los cielos y el arte de la espada, aquí combinamos conocimiento, precisión y visión para llevar los proyectos al siguiente nivel."
  ],
  highlight: "Mi misión es crear soluciones de impacto que transformen ideas en realidades funcionales, con tecnología sólida, visión estratégica y un trato cercano.",
  supportNote: "Me respalda un equipo de especialistas en marketing, ventas y diseño gráfico."
}
