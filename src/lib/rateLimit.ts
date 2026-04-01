type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

// Limpiar entradas vencidas cada 5 minutos para evitar memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key)
  }
}, 5 * 60 * 1000)

/**
 * Devuelve true si la request está permitida, false si excede el límite.
 * @param key    Identificador único (ej: `login:${ip}`)
 * @param limit  Máximo de requests permitidas en la ventana
 * @param windowMs Tamaño de la ventana en milisegundos
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
