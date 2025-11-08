import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name } = schema.parse(body)
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return new NextResponse('Ya existe un usuario con ese email', { status: 400 })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, password: hashed, name } })
  const token = signToken({ sub: user.id, email })
  setAuthCookie(token)
  return NextResponse.json({ id: user.id, email: user.email, name: user.name })
}