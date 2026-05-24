import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  return NextResponse.json({
    smtp_host: !!process.env.SMTP_HOST,
    smtp_port: !!process.env.SMTP_PORT,
    smtp_user: !!process.env.SMTP_USER,
    smtp_pass: !!process.env.SMTP_PASS,
    smtp_from: !!process.env.SMTP_FROM,
    admin_email: !!process.env.ADMIN_EMAIL,
  })
}
