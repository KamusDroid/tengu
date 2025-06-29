import Hero from "@/components/Hero"
import Servicios from "@/components/Servicios"
import Proyectos from "@/components/Proyectos"
import Sobre from "@/components/Sobre"

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-16">
       
        <div id="hero"><Hero /></div>
        <div id="servicios"><Servicios /></div>
        <div id="proyectos"><Proyectos /></div>
        <div id="sobre"><Sobre /></div>
        
      </main>
    </>
  )
}
