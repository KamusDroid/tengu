import { cookies } from 'next/headers'
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import * as jwt from 'jsonwebtoken'
import type { JwtPayload, SignOptions, Secret } from 'jsonwebtoken'

const COOKIE_NAME = 'tengu_token'

function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET as Secret | undefined
  if (!secret) {
    throw new Error('JWT_SECRET env var is not set')
  }
  return secret
}

export interface AuthTokenPayload {
  userId: string
  email: string
  name?: string
}

// Crear un token JWT
export function signToken(
  payload: AuthTokenPayload,
  options?: SignOptions
): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d',
    ...options,
  })
}

// Verificar un token y devolver el payload tipado
export function verifyToken(token: string): AuthTokenPayload & JwtPayload {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload & JwtPayload
}

// Guardar el token en cookie httpOnly
export function setAuthCookie(
  cookieStore: ResponseCookies,
  token: string
): void {
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })
}

// Leer el usuario desde la cookie (o null si no hay / token inválido)
export async function getUserFromCookie():
  Promise<(AuthTokenPayload & JwtPayload) | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    return verifyToken(token)
  } catch {
    return null
  }
}

// Borrar cookie
export function clearAuthCookie(cookieStore: ResponseCookies): void {
  cookieStore.delete(COOKIE_NAME)
}
