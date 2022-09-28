import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Role, Task } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateTaskDTO } from 'src/common/dto/create-task.dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthorizationGuard, RolesGuard)
@Roles(Role.USER)
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
    async getTasks(@Param('authorId', ParseIntPipe) authorId: number): Promise<Task[]> {
        return this.taskService.getTasks(authorId);
    }
}
