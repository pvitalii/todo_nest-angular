import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module'
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/providers/token.service';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [TaskController],
    providers: [TaskService, JwtService, TokenService],
    exports: [TaskService],
})
export class TaskModule {}
