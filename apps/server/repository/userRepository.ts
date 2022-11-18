import { prisma } from '../lib/prisma'
import { User } from 'schema'

export const getUsers = async () => {
    return await prisma.user.findMany();
}

export const getUserByMemorableId = async (id: string): Promise<User> => {
    const user = await prisma.user.findFirst({
        where: {
            memorableId: id
        },
        include: {
          location: true,
        },
    })

    if (!user) {
        return null;
    }

    // Map to User dto type...
    const userDto: User = {
        id: user.id.toString(),
        memorableId: user.memorableId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location.name, // Optional?
        profilePicture: user.profilePicture // Optional?
    }

    return userDto;
}