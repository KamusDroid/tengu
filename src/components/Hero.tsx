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
      <a
        href="#contacto"
        className="bg-red-800 text-white px-6 py-3 rounded-full hover:bg-red-900 transition"
      >
        Contáctanos
      </a>
      <RotatingImage />

      
 
    </section>
    
  )
}
