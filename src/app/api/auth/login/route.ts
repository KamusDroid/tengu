import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { authDb } from '@/lib/dbAuth'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rateLimit'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(`login:${ip}`, 5, 60 * 1000)) {
      return new NextResponse('Demasiados intentos. Esperá un minuto.', { status: 429 })
    }

    const body = await req.json()
    const { email, password } = schema.parse(body)

    const user = await authDb.user.findUnique({ where: { email } })
    if (!user) {
      return new NextResponse('Credenciales inválidas', { status: 401 })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return new NextResponse('Credenciales inválidas', { status: 401 })
    }

    const token = signToken({ userId: user.id, email })

    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    setAuthCookie(res.cookies, token)
    return res
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse('Datos inválidos', { status: 400 })
    }
    console.error('[login]', err)
    return new NextResponse('Error interno', { status: 500 })
  }
}
