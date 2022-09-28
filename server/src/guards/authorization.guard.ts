import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { decodedToken } from 'src/common/interfaces/decoded-token.interface';
import { TokenService } from 'src/providers/token.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private jwtService: JwtService, private tokenService: TokenService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const accessToken = request.cookies['accessToken'];
        const refreshToken = request.cookies['refreshToken'];
        if (!accessToken) {
            if (!refreshToken) {
                throw new UnauthorizedException;
            }
            const decodedRefreshToken = this.jwtService.decode(refreshToken) as decodedToken;
            const newAccessToken = await this.tokenService.generateAccessToken(
                {
                    name: decodedRefreshToken.name,
                    sub: decodedRefreshToken.sub,
                    role: decodedRefreshToken.role
                })
            request.cookies['accessToken'] = newAccessToken;
            response.cookie('accessToken', newAccessToken, { expires: new Date(Date.now() + 60000) });
        }
        return true
    }
}