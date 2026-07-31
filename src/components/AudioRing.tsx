'use client'

import { useEffect, useRef } from 'react'
import { subscribeAudioFrame, pulseLevel, PULSE_GAIN, PULSE_AMOUNT } from '@/lib/audioReactive'

const CONTAINER = 476
const CX = CONTAINER / 2
const CY = CONTAINER / 2
const BASE_R = 200
const AMPLITUDE = 18
const GAIN = 18
const REST_BINS = 64

function boost(raw: number, gain: number): number {
  const g = Math.min(1, raw * gain)
  return g * g
}

function buildWavyRingPath(freq: ArrayLike<number>, gain: number): string {
  const n = freq.length
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2
    const boosted = boost(freq[i] / 255, gain)
    const r = BASE_R + boosted * AMPLITUDE
    pts.push([CX + Math.cos(angle) * r, CY + Math.sin(angle) * r])
  }

  let d = `M ${pts[0][0]},${pts[0][1]} `
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]} `
  }
  return d + 'Z'
}

export default function AudioRing() {
  const svgRef = useRef<SVGSVGElement>(null)
  const outerRef = useRef<SVGPathElement>(null)
  const innerRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Estado de reposo: se calcula solo en el cliente, después del montaje,
    // para no arrastrar diferencias de precisión de punto flotante (Math.cos/sin)
    // entre el render del servidor y el del navegador (evita hydration mismatch).
    const restD = buildWavyRingPath(new Uint8Array(REST_BINS), GAIN)
    outerRef.current?.setAttribute('d', restD)
    innerRef.current?.setAttribute('d', restD)

    return subscribeAudioFrame((data) => {
      const d = buildWavyRingPath(data, GAIN)
      outerRef.current?.setAttribute('d', d)
      innerRef.current?.setAttribute('d', d)

      if (svgRef.current) {
        const pulse = pulseLevel(data, PULSE_GAIN)
        svgRef.current.style.transform = `scale(${1 + pulse * PULSE_AMOUNT})`
      }

      let sum = 0
      for (let i = 0; i < data.length; i++) sum += data[i]
      const level = boost(sum / data.length / 255, GAIN)

      if (outerRef.current) {
        outerRef.current.style.filter = `blur(${18 + level * 26}px)`
        outerRef.current.style.opacity = String(0.24 + level * 0.4)
        outerRef.current.style.strokeWidth = String(8 + level * 15)
      }
      if (innerRef.current) {
        innerRef.current.style.filter = `blur(${6 + level * 9}px)`
        innerRef.current.style.opacity = String(0.34 + level * 0.42)
        innerRef.current.style.strokeWidth = String(3 + level * 5)
      }
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CONTAINER} ${CONTAINER}`}
      style={{
        position: 'absolute',
        inset: `-${(CONTAINER - 420) / 2}px`,
        pointerEvents: 'none',
        overflow: 'visible',
        transformOrigin: 'center center',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Halo exterior, muy difuso — la "luz irradiando" */}
      <path
        ref={outerRef}
        fill="none"
        stroke="#ff2d3d"
        strokeWidth="8"
        style={{ filter: 'blur(18px)', opacity: 0.24 }}
      />
      {/* Núcleo interior, más definido pero igual difuminado */}
      <path
        ref={innerRef}
        fill="none"
        stroke="#ff1f35"
        strokeWidth="3"
        style={{ filter: 'blur(6px)', opacity: 0.34 }}
      />
    </svg>
  )
}
