import { Body, Controller, Delete, Get, Post, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDTO } from 'src/common/dto/create-user.dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AuthorizedRequest } from 'src/common/interfaces/authorized-request';
import { Token } from 'src/common/interfaces/token';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('registration')
    @UsePipes(ValidationPipe)
    async registration(@Body() dto: CreateUserDTO, @Res({ passthrough: true }) res: Response): Promise<Token> {
        const token = await this.authService.registration(dto);
        res.cookie("accessToken", token.accessToken, { expires: new Date(Date.now() + 60000) });
        res.cookie("refreshToken", token.refreshToken, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        return token
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: AuthorizedRequest, @Res({ passthrough: true }) res: Response): Promise<Token> {
        const token = await this.authService.login(req.user);
        res.cookie("accessToken", token.accessToken, { expires: new Date(Date.now() + 60000) });
        res.cookie("refreshToken", token.refreshToken, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        return token
    }

    @UseGuards(AuthorizationGuard, JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: AuthorizedRequest): Pick<User, 'id' | 'username'> {
        return req.user;
    }

    @Delete('logout')
    logout(@Res() res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.json("Successfull logout")
    }
}
