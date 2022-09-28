import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/database/prisma.module';
import { RolesGuard } from 'src/guards/role.guard';
import { isUniqueConstraint } from 'src/providers/is-unique-user';
import { TokenService } from 'src/providers/token.service';
import { AdminController } from './admin.controller';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule],
    controllers: [AdminController],
    providers: [UserService, isUniqueConstraint, TokenService, JwtService],
    exports: [UserService],
})
export class UserModule {}
