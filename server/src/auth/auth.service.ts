import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Credentials } from 'src/common/interfaces/credentials';
import { JwtPayload } from 'src/common/interfaces/jwt-payload';
import { Token } from 'src/common/interfaces/token';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { TokenService } from 'src/providers/token.service';
import { HashService } from 'src/providers/hash.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private userService: UserService, 
        private tokenService: TokenService,
        private hashService: HashService,
        ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (user && (await this.hashService.comparePasswords(user.password, password))) {
            return user;
        }
        return null;
    }

    async registration(credentials: Credentials): Promise<Token> {
        const user = await this.userService.createUser({
            username: credentials.username,
            password: await this.hashService.hashPassword(credentials.password),
        });
        return this.login(user)
        // const payload: JwtPayload = { name: user.username, sub: user.id };
        // return {
        //     accessToken: await this.tokenService.generateAccessToken(payload),
        //     refreshToken: await this.tokenService.generateRefreshToken(payload),
        // };
    }

    async login(user: Omit<User, 'password'>): Promise<Token> {
        const payload: JwtPayload = { name: user.username, sub: user.id, role: user.role };
        return {
            accessToken: await this.tokenService.generateAccessToken(payload),
            refreshToken: await this.tokenService.generateRefreshToken(payload),
        };
    }
}
