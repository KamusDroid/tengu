import { PrismaClient } from '../../prisma/generated/shop'

declare global {
  // eslint-disable-next-line no-var
  var shopPrisma: PrismaClient | undefined
}

export const shopDb =
  global.shopPrisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.shopPrisma = shopDb
}
