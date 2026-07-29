'use client'

import { useEffect, useRef, useState } from 'react'
import { emitAudioFrame } from '@/lib/audioReactive'

export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array | null>(null)
  const rafRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)

  function ensureAnalyser() {
    if (!audioRef.current || audioCtxRef.current) return
    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audioRef.current)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.15
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioCtxRef.current = ctx
    analyserRef.current = analyser
    dataRef.current = new Uint8Array(analyser.frequencyBinCount)
  }

  function tick() {
    const analyser = analyserRef.current
    const data = dataRef.current
    if (!analyser || !data) return
    analyser.getByteFrequencyData(data)
    emitAudioFrame(data)
    rafRef.current = requestAnimationFrame(tick)
  }

  function stopTick() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (dataRef.current) {
      dataRef.current.fill(0)
      emitAudioFrame(dataRef.current)
    }
  }

  function start() {
    const audio = audioRef.current
    if (!audio || !audio.paused) return
    ensureAnalyser()
    audioCtxRef.current?.resume()
    audio
      .play()
      .then(() => {
        setPlaying(true)
        rafRef.current = requestAnimationFrame(tick)
      })
      .catch(() => {})
  }

  function toggle() {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      stopTick()
    } else {
      start()
    }
  }

  useEffect(() => {
    // Intento de autoplay al entrar a la página. La mayoría de los navegadores
    // lo bloquean sin interacción previa del usuario, así que además arrancamos
    // apenas detectamos el primer click/touch/tecla en cualquier parte de la página.
    start()

    const onFirstInteraction = () => start()
    const opts: AddEventListenerOptions = { once: true, passive: true }
    document.addEventListener('click', onFirstInteraction, opts)
    document.addEventListener('keydown', onFirstInteraction, opts)
    document.addEventListener('touchstart', onFirstInteraction, opts)

    return () => {
      document.removeEventListener('click', onFirstInteraction)
      document.removeEventListener('keydown', onFirstInteraction)
      document.removeEventListener('touchstart', onFirstInteraction)
      stopTick()
      audioCtxRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" onEnded={() => { setPlaying(false); stopTick() }} />
      <button
        onClick={toggle}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        title={playing ? 'Pausar música' : 'Reproducir música'}
        style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px',
          zIndex: 40,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#0d0d10',
          border: `0.5px solid ${playing ? 'rgba(230,57,70,0.55)' : 'rgba(192,57,43,0.25)'}`,
          color: playing ? '#e63946' : 'rgba(240,237,230,0.5)',
          boxShadow: playing ? '0 0 18px rgba(230,57,70,0.35)' : '0 4px 12px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          transition: 'all 0.25s',
        }}
      >
        {playing ? '❚❚' : '▶'}
      </button>
    </>
  )
}
