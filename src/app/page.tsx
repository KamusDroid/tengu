import Hero from '@/components/Hero'
import MetricasBar from '@/components/MetricasBar'
import Servicios from '@/components/Servicios'
import Proyectos from '@/components/Proyectos'
import Sobre from '@/components/Sobre'
import MusicPlayer from '@/components/MusicPlayer'
import { crmDb } from '@/lib/dbCrm'

export const dynamic = 'force-dynamic'

const GlowDivider = () => (
  <div
    style={{
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(192,57,43,0.55) 30%, rgba(230,57,70,0.7) 50%, rgba(192,57,43,0.55) 70%, transparent)',
      boxShadow: '0 0 12px rgba(192,57,43,0.25), 0 0 24px rgba(192,57,43,0.08)',
    }}
  />
)

export default async function Home() {
  const musicaConfig = await crmDb.configuracionSitio.findUnique({ where: { clave: 'hero.musica_url' } })
  const musicaUrl = musicaConfig?.valor || null

  return (
    <main className="flex flex-col" style={{ background: '#050507' }}>
      <Hero />
      <GlowDivider />
      <MetricasBar />
      <GlowDivider />
      <Servicios />
      <GlowDivider />
      <Proyectos />
      <GlowDivider />
      <Sobre />
      {musicaUrl && <MusicPlayer src={musicaUrl} />}
    </main>
  )
}
