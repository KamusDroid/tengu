"use client"

import Link from "next/link"

import { heroContent } from "@/lib/content"
import RotatingImage from "./RotatingImage"

export default function Hero() {
  const { id, title, description, cta } = heroContent

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="min-h-[80vh] px-4"
    >
      <div className="relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="pointer-events-none relative z-10 flex flex-col items-center gap-6">
          <h1 id={`${id}-title`} className="text-5xl font-bold md:text-7xl lg:text-9xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-zinc-400 md:text-xl">{description}</p>
          <div className="z-20 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="pointer-events-auto rounded-full bg-red-800 px-6 py-3 text-white transition hover:bg-red-900"
            >
              {cta.label}
            </Link>
          </div>
        </div>
        <RotatingImage className="spin-hover-desktop" />
      </div>
    </section>
  )
}
