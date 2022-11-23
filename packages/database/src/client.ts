import { PrismaClient, Prisma as Prisma } from '@prisma/client';
export {Prisma as PrismaTypes} from '@prisma/client'

const userWithRelations = Prisma.validator<Prisma.UserArgs>()({
  include: {
    location: true,
    groups: true,
    teams: true
  },
})

export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>

// Has to have these fields. Not all queries to the DB have this information...
// Could add a mapping in the userRepository which maps all results from prisma to this UserWithRelations
//       Will add nulls if they don't exist
//       Then we can map to the UserDto in userMapper
//       Why not map straight from the Prisma User result? - because we don't have type safety as to which fields exist
// const u: UserWithRelations = {
//   id: 1,
//   firstName: "",
//   lastName: "",
//   memorableId: "",
//   profilePicture: null,
//   locationId: null,
//   location: null,
//   groups: [],
//   teams: []
// }

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prismaClient = global.prismaClient || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prismaClient = prismaClient

