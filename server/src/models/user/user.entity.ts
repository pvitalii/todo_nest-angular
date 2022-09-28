import { Exclude } from "class-transformer";
import { Role } from "@prisma/client"

export class UserEntity {
    id: number;
    username: string;

    @Exclude()
    password: string;

    role: Role

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}