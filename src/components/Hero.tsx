"use client";

import RotatingImage from "./RotatingImage"

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
           
      
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4">
        TENGU
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 mb-6 max-w-xl">
        Donde las ideas digitales cobran vida.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 z-20">

        <a
          href="https://chat.whatsapp.com/FK8uIDZ1m0Z2pLq81I5ODd"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-800 text-white px-6 py-3 rounded-full hover:bg-red-900 transition"
        >
          Contáctanos
        </a>

      </div>
      <RotatingImage />

      
 
    </section>
    
  )
}
