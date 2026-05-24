import { NextResponse } from 'next/server'
import { getUserFromCookie, isAdmin } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const CARPETAS = ['productos', 'blog', 'academia', 'marca', 'equipo'] as const
const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4', 'application/pdf']

function uploadsDir(folder: string) {
  return path.join(process.cwd(), 'public', 'uploads', folder)
}

export async function GET(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const folder = new URL(req.url).searchParams.get('folder') ?? 'productos'
  if (!CARPETAS.includes(folder as typeof CARPETAS[number])) {
    return NextResponse.json({ error: 'Carpeta inválida' }, { status: 400 })
  }

  const dir = uploadsDir(folder)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const files = fs.readdirSync(dir).map((name) => {
    const filePath = path.join(dir, name)
    const stat = fs.statSync(filePath)
    return { name, path: filePath, size: stat.size, url: `/uploads/${folder}/${name}` }
  })

  return NextResponse.json(files)
}

export async function POST(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const folder = formData.get('folder') as string | null

  if (!file || !folder) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  if (!CARPETAS.includes(folder as typeof CARPETAS[number])) {
    return NextResponse.json({ error: 'Carpeta inválida' }, { status: 400 })
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Archivo demasiado grande (máx 5MB)' }, { status: 400 })
  }

  const dir = uploadsDir(folder)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filename = `${Date.now()}-${safeName}`
  const dest = path.join(dir, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(dest, buffer)

  return NextResponse.json({ url: `/uploads/${folder}/${filename}`, name: filename, size: file.size })
}

export async function DELETE(req: Request) {
  const user = await getUserFromCookie()
  if (!isAdmin(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { filePath } = await req.json()
  if (!filePath || !filePath.startsWith('public/uploads/')) {
    return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 })
  }

  const abs = path.join(process.cwd(), filePath)
  if (fs.existsSync(abs)) fs.unlinkSync(abs)

  return NextResponse.json({ ok: true })
}
