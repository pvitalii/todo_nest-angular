import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { AuthorizedRequest } from 'src/interfaces/authorized-request';
import { Token } from 'src/interfaces/token';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserExistsGuard } from './guards/user-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserExistsGuard)
  @Post('registration')
  @UsePipes(ValidationPipe)
  async registration(@Body() dto: CreateUserDTO): Promise<Token> {
    return this.authService.registration(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthorizedRequest): Promise<Token> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthorizedRequest): Omit<User, 'password'> {
    return req.user;
  }
}
