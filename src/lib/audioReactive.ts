type Listener = (data: Uint8Array) => void

const listeners = new Set<Listener>()

export function emitAudioFrame(data: Uint8Array) {
  listeners.forEach((l) => l(data))
}

export function subscribeAudioFrame(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
