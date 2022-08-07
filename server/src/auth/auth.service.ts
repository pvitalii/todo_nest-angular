import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Credentials } from 'src/interfaces/credentials';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { Token } from 'src/interfaces/token';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    name: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { name: name } });
    if (user && (await this.comparePasswords(user.password, password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  private async generateToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private async comparePasswords(
    hashPassword: string,
    password: string,
  ): Promise<boolean> {
    return argon2.verify(hashPassword, password);
  }

  async registration(credentials: Credentials): Promise<Token> {
    const user = await this.userService.createUser({
      name: credentials.name,
      password: await this.hashPassword(credentials.password),
    });
    const payload: JwtPayload = { name: user.name, sub: user.id };
    return {
      accessToken: await this.generateToken(payload),
    };
  }

  async login(user: Omit<User, 'password'>): Promise<Token> {
    const payload: JwtPayload = { name: user.name, sub: user.id };
    return {
      accessToken: await this.generateToken(payload),
    };
  }
}
