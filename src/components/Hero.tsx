"use client"

import { heroContent } from "@/lib/content"
import RotatingImage from "./RotatingImage"

export default function Hero() {
  const { id, title, description } = heroContent

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="min-h-[80vh] px-4"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        {/* Fallback por si el navegador no soporta video */}
        Tu navegador no soporta video HTML5.
      </video>

      {/* CAPA OSCURA PARA QUE SE LEA EL TEXTO */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <RotatingImage className="spin-hover-desktop" />

        <div className="pointer-events-none relative flex flex-col items-center gap-6">
          <h1 id={`${id}-title`} className="text-5xl font-bold md:text-7xl lg:text-9xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-black dark:text-zinc-400 md:text-xl">{description}</p>
          
        </div>
      </div>
    </section>
  )
}
