"use client"

export default function RotatingImage() {
  return (
    <div className="absolute w-full h-full z-0 animate-spin-slow">
      <img
        src="/tomoe.png"
        alt="Tomoe central"
        className="w-full h-full object-contain rounded-full opacity-11"
      />
    </div>
  )
}
