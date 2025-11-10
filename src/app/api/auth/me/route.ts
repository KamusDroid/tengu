import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'

export async function GET() {
  const user = await getUserFromCookie()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return NextResponse.json({
    userId: user.userId,
    email: user.email,
    name: user.name ?? null,
  })
}
