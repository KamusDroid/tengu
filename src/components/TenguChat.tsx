"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import Image from "next/image"

type Message = {
  role: "user" | "assistant"
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Soy TENGU. El guardián digital. ¿Qué desafío tecnológico enfrenta tu organización?",
}

export default function TenguChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: "user", content: text }
    const updated = [...messages, userMessage]
    setMessages(updated)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Error desconocido")

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "El plano digital está perturbado. Intentá de nuevo en un momento." },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button — above CartDrawer (bottom-4) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat TENGU"
        className="fixed bottom-20 right-4 z-[60] w-14 h-14 rounded-full bg-zinc-900 border-2 border-red-600 shadow-lg shadow-red-900/40 flex items-center justify-center hover:border-red-400 hover:shadow-red-600/60 transition-all duration-200"
      >
        <Image
          src="/tomoe.png"
          alt="TENGU"
          width={32}
          height={32}
          className="object-contain"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            img.style.display = "none"
            const span = img.nextElementSibling as HTMLElement | null
            if (span) span.style.display = "block"
          }}
        />
        <span className="hidden text-2xl leading-none">👺</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-36 right-4 z-[60] w-80 max-w-[calc(100vw-1rem)] h-[480px] max-h-[70vh] bg-zinc-900 border border-red-800 rounded-xl shadow-2xl shadow-red-900/40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-red-900 bg-zinc-950">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold tracking-widest text-sm">TENGU AI</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="text-zinc-400 hover:text-red-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-900/60 text-white rounded-br-none"
                      : "bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg rounded-bl-none px-4 py-2">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-red-900 bg-zinc-950 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Consultá al guardián..."
              maxLength={1000}
              disabled={loading}
              className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 text-sm rounded-lg px-3 py-2 border border-zinc-700 focus:border-red-600 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje"
              className="bg-red-700 hover:bg-red-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
