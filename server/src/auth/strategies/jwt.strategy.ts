import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/common/interfaces/jwt-payload';
import { User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<Pick<User, 'id' | 'username'>> {
        return { id: payload.sub, username: payload.name };
    }

    private static cookieExtractor(req: Request): string | null {
        let token = null;
        if(req && req.cookies) {
            token = req.cookies.accessToken;
        }
        return token
    }
}
