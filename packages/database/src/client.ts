import { PrismaClient } from '@prisma/client';
export { Prisma as PrismaTypes } from '@prisma/client'
export type { User } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

