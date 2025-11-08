'use client'
import { useState } from 'react'
type Props = { mode: 'login' | 'register' }
export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      if (!res.ok) throw new Error(await res.text())
      window.location.href = '/marketplace'
    } catch (err:any) { setError(err.message || 'Error') } finally { setLoading(false) }
  }
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4 p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold">{mode==='login'?'Iniciar sesión':'Crear cuenta'}</h1>
      {mode==='register' && (<div><label className="block text-sm mb-1">Nombre</label>
        <input className="w-full rounded border p-2" value={name} onChange={e=>setName(e.target.value)} required /></div>)}
      <div><label className="block text-sm mb-1">Email</label>
        <input className="w-full rounded border p-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
      <div><label className="block text-sm mb-1">Contraseña</label>
        <input className="w-full rounded border p-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="w-full rounded bg-black text-white py-2">
        {loading ? 'Procesando…' : (mode==='login' ? 'Entrar' : 'Registrarme')}
      </button>
    </form>
  )
}