import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { JwtPayload } from "src/common/interfaces/jwt-payload";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    private generateToken(payload: JwtPayload, options: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(payload, options);
    }

    private accessTokenOptions: JwtSignOptions = {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '60s',
    }

    private refreshTokenOptions: JwtSignOptions = {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '1d',
    }

    async generateAccessToken(payload: JwtPayload): Promise<string> {
        return this.generateToken(payload, this.accessTokenOptions)
    }

    async generateRefreshToken(payload: JwtPayload): Promise<string> {
        return this.generateToken(payload, this.refreshTokenOptions)
    }
}