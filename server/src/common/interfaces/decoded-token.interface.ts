import { Role } from "@prisma/client";

export interface decodedToken {
    name: string;
    sub: number;
    iat: number;
    exp: number;
    role: Role;
} 