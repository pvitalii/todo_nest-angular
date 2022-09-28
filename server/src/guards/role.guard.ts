import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { decodedToken } from 'src/common/interfaces/decoded-token.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies['accessToken'];
        const decodedAccessToken = this.jwtService.decode(accessToken) as decodedToken;
        if (!requiredRole) {
            return true;
        }
        return requiredRole === decodedAccessToken.role
    }
}