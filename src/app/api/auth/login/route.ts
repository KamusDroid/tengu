import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = schema.parse(body)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return new NextResponse('Credenciales inválidas', { status: 401 })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return new NextResponse('Credenciales inválidas', { status: 401 })
  const token = signToken({ sub: user.id, email })
  setAuthCookie(token)
  return NextResponse.json({ id: user.id, email: user.email, name: user.name })
}