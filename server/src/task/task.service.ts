import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Task } from 'src/interfaces/task';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(taskContent: Task): Promise<Task> {
    const { authorId, ...rest } = taskContent;
    return this.prisma.task.create({
      data: {
        ...rest,
        author: {
          connect: { id: authorId },
        },
      },
    });
  }

  async deleteTask(taskId: number) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  async getTasks(authorId: number) {
    return this.prisma.task.findMany({ where: { authorId } });
  }
}
