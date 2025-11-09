import { PrismaClient } from '../../prisma/generated/auth'

declare global {
  // Evitamos múltiples instancias en dev (hot reload)
  // eslint-disable-next-line no-var
  var authPrisma: PrismaClient | undefined
}

export const authDb =
  global.authPrisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.authPrisma = authDb
}
