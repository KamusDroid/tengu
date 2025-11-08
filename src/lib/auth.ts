import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const COOKIE_NAME = 'tengu_token'
export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET!
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}
export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET!
  return jwt.verify(token, secret) as any
}
export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60*60*24*7,
  })
}
export function getUserFromCookie() {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  try { return verifyToken(token) } catch { return null }
}
export function clearAuthCookie() { cookies().delete(COOKIE_NAME) }