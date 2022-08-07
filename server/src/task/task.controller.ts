import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() dto: CreateTaskDTO) {
    return this.taskService.createTask(dto);
  }

  @Delete('delete/:id')
  async deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.taskService.deleteTask(taskId);
  }

  @Get('/:authorId')
  async getTasks(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<Task[]> {
    return this.taskService.getTasks(authorId);
  }
}
