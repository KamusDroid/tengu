"use client"

import clsx from "clsx"
import Image from "next/image"

type RotatingImageProps = {
  className?: string
}

export default function RotatingImage({ className }: RotatingImageProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
    >
      <div
        className={clsx(
          "clip-circle relative aspect-square w-full max-w-[44rem] pointer-events-auto",
          className
        )}
      >
        <Image
          src="/tomoe.png"
          alt="Emblema Tomoe girando"
          fill
          priority
          sizes="(max-width: 767px) 80vw, 44rem"
          className="pointer-events-none rounded-full object-contain opacity-30"
        />
      </div>
    </div>
  )
}
