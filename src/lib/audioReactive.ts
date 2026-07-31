type Listener = (data: Uint8Array) => void

const listeners = new Set<Listener>()

export function emitAudioFrame(data: Uint8Array) {
  listeners.forEach((l) => l(data))
}

export function subscribeAudioFrame(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Nivel de "pulso" compartido — usado por el tomoe y el aro para que respiren
// exactamente igual y en sincro.
export const PULSE_GAIN = 2.3
export const PULSE_AMOUNT = 0.22

export function pulseLevel(data: ArrayLike<number>, gain: number): number {
  let sum = 0
  for (let i = 0; i < data.length; i++) sum += data[i]
  const raw = sum / data.length / 255
  const g = Math.min(1, raw * gain)
  return g * g
}
