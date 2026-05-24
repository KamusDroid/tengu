import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import { crmDb } from '@/lib/dbCrm'
import { DEFAULT_SYSTEM_PROMPT } from '@/lib/groq'

const CHAT_KEYS = ['chat.activo', 'chat.modo_mantenimiento', 'chat.system_prompt'] as const

export async function GET() {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const registros = await crmDb.configuracionSitio.findMany({
    where: { clave: { in: [...CHAT_KEYS] } },
  })
  const map = Object.fromEntries(registros.map((r) => [r.clave, r.valor]))

  return NextResponse.json({
    activo: map['chat.activo'] !== 'false',
    modoMantenimiento: map['chat.modo_mantenimiento'] === 'true',
    systemPrompt: map['chat.system_prompt'] ?? null,
    defaultSystemPrompt: DEFAULT_SYSTEM_PROMPT,
    modeloActual: 'meta-llama/llama-4-scout-17b-16e-instruct',
    groqConfigured: !!process.env.GROQ_API_KEY,
  })
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await req.json()
  const campos: Record<string, string> = {}

  if (body.activo !== undefined) campos['chat.activo'] = String(body.activo)
  if (body.modoMantenimiento !== undefined) campos['chat.modo_mantenimiento'] = String(body.modoMantenimiento)
  if (body.systemPrompt !== undefined) campos['chat.system_prompt'] = body.systemPrompt

  await Promise.all(
    Object.entries(campos).map(([clave, valor]) =>
      crmDb.configuracionSitio.upsert({
        where: { clave },
        update: { valor },
        create: { clave, valor },
      })
    )
  )

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'Falta key' }, { status: 400 })

  try {
    await crmDb.configuracionSitio.delete({ where: { clave: key } })
  } catch {
    // No existe, OK
  }

  return NextResponse.json({ ok: true })
}
