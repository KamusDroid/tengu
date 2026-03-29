import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { chatWithGroq } from "@/lib/groq"

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(1000),
})

const BodySchema = z.object({
  messages: z.array(MessageSchema).max(20),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = BodySchema.parse(body)

    const reply = await chatWithGroq(messages)

    return NextResponse.json({ reply })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: err.errors }, { status: 400 })
    }
    console.error("Chat API error:", err)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
