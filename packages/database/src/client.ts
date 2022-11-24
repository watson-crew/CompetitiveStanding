import { PrismaClient, Prisma as Prisma } from '@prisma/client';
export {Prisma as PrismaTypes} from '@prisma/client'
export type { Location } from '@prisma/client'

const userWithLocation = Prisma.validator<Prisma.UserArgs>()({
  include: {
    location: true,
  },
})

export type UserWithLocation = Prisma.UserGetPayload<typeof userWithLocation>

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prismaClient = global.prismaClient || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prismaClient = prismaClient

