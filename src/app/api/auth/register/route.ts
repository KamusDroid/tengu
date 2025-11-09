import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = schema.parse(body)

    const exists = await prisma.user.findUnique({
      where: { email },
    })

    if (exists) {
      return new NextResponse('Ya existe un usuario con ese email', {
        status: 400,
      })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    })

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name ?? undefined,
    })

    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
    setAuthCookie(response.cookies, token)
    return response
  } catch (err) {
    console.error(err)
    return new NextResponse('Error en registro', { status: 500 })
  }
}
