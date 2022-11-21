import { Group, User, PrismaClient, Prisma } from '@prisma/client';

export async function addUsersToGroup(
    prisma: PrismaClient,
    group: Group,
    users: User[]
): Promise<Group> {
    const data: Prisma.GroupUpdateInput = {
        players: {
            connect: users
        }
    };

    const updatedGroup = await prisma.group.update({
        where: {id: group.id},
        data
    });
    return updatedGroup
}

