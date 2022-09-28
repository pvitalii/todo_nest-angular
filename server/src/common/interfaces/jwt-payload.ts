import { Role } from "@prisma/client";

export interface JwtPayload {
    name: string;
    sub: number;
    role: Role;
}
