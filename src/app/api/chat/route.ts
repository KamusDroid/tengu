import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { z } from "zod"
import { chatWithGroq } from "@/lib/groq"
import { checkRateLimit } from "@/lib/rateLimit"

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(1000),
})

const BodySchema = z.object({
  messages: z.array(MessageSchema).max(20),
})

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(`chat:${ip}`, 10, 60 * 1000)) {
      return NextResponse.json({ error: "Demasiados mensajes. Esperá un minuto." }, { status: 429 })
    }

    const body = await req.json()
    const { messages } = BodySchema.parse(body)

    const limitedMessages = messages.slice(-10)
    const reply = await chatWithGroq(limitedMessages)

    return NextResponse.json({ reply })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: err.errors }, { status: 400 })
    }
    console.error("[chat]", err)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
