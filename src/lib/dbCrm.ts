import { PrismaClient } from '../../prisma/generated/crm'

declare global {
  // eslint-disable-next-line no-var
  var crmPrisma: PrismaClient | undefined
}

export const crmDb =
  global.crmPrisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.crmPrisma = crmDb
}
