import { Module } from '@nestjs/common';
import { TaskModule } from './models/task/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './providers/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule.forRoot(), TaskModule, AuthModule],
    providers: []
})
export class AppModule {}
