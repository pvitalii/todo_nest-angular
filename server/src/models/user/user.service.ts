import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ data });
    }

    async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({ where: userWhereUniqueInput });
    }

    async getAll(): Promise<User[] | null> {
        return this.prisma.user.findMany({
            where: {
                role: 'USER',
            },
        });
    }

    async deleteUser(userId: number): Promise<User> {
        const deleteTasks = this.prisma.task.deleteMany({
            where: {
                authorId: userId,
            },
        });

        const deleteUser = this.prisma.user.delete({
            where: {
                id: userId,
            },
        });

        this.prisma.$transaction([deleteTasks, deleteUser]);
        return deleteUser
    }
}
