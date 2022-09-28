import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDTO } from 'src/common/dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async createTask(data: CreateTaskDTO): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async deleteTask(taskId: number): Promise<Task> {
        return this.prisma.task.delete({ where: { id: taskId } });
    }

    async getTasks(authorId: number): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { authorId } });
    }
}
