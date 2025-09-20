import { aboutContent } from "@/lib/content"

export default function Sobre() {
  const { heading, paragraphs, highlight, supportNote } = aboutContent

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-2xl px-4 py-20 text-center"
    >
      <h2 id="sobre-title" className="mb-6 text-3xl font-bold">
        {heading}
      </h2>
      <div className="space-y-5 text-lg leading-relaxed text-zinc-200">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="text-lg font-semibold text-red-400">{highlight}</p>
        <p className="text-base font-medium text-rose-200">{supportNote}</p>
      </div>
    </section>
  )
}
