import { Prisma } from "@prisma/client"

const userWithLocation = Prisma.validator<Prisma.UserArgs>()({
  include: {
    location: true,
  },
})

export type UserWithLocation = Prisma.UserGetPayload<typeof userWithLocation>


const teamWithPlayers = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    players: true
  },
})

export type TeamWithPlayers = Prisma.TeamGetPayload<typeof teamWithPlayers>
