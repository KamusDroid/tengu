import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const uploadsRoot = path.join(process.cwd(), 'public', 'uploads')
  const filePath = path.resolve(uploadsRoot, ...segments)

  if (filePath !== uploadsRoot && !filePath.startsWith(uploadsRoot + path.sep)) {
    return new NextResponse('Ruta inválida', { status: 400 })
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse('No encontrado', { status: 404 })
  }

  const ext = path.extname(filePath).toLowerCase()
  const buffer = fs.readFileSync(filePath)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
