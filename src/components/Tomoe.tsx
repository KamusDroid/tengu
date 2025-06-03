"use client"

import { useEffect, useState } from "react"

export default function Tomoe() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-0 pointer-events-none opacity-30">
      <div className="relative w-full h-full animate-spin-slow">
        {[0, 120, 240].map((angle, idx) => (
          <div
            key={idx}
            className="absolute w-6 h-6 bg-red-600 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(300px)`,
              transformOrigin: "center",
              boxShadow: "0px 0px 80px 80px rgba(239, 68, 68, 1)",
              filter: "blur(1px)",
              opacity: 80,
            }}
          />
        ))}
      </div>
    </div>
  )
}
