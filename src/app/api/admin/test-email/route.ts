import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/mail'

const Schema = z.object({ to: z.string().email() })

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const { to } = Schema.parse(body)

  try {
    await sendWelcomeEmail({ to, name: 'Test TENGU' })
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
