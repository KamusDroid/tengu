'use client'

import { useState, type FormEvent } from 'react'

type Props = {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Error en la autenticación')
      }

      window.location.href = '/marketplace'
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error')
      } else {
        setError('Error desconocido')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-sm space-y-4 p-6 rounded-2xl shadow"
    >
      <h1 className="text-2xl font-semibold">
        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </h1>

      {mode === 'register' && (
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            className="w-full rounded border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full rounded border p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Contraseña</label>
        <input
          className="w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded bg-black text-white py-2 disabled:opacity-60"
      >
        {loading
          ? 'Procesando…'
          : mode === 'login'
          ? 'Entrar'
          : 'Registrarme'}
      </button>
    </form>
  )
}
