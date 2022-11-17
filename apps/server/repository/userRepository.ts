import { prisma } from '../lib/prisma'

export const getUsers = async () => {
    return await prisma.user.findMany();
}

export const getUserByMemorableId = async (id: string) => {
    return await prisma.user.findFirst({
        where: {
            memorableId: id
        }
    })
}