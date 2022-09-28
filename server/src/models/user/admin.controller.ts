import { ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { RolesGuard } from "src/guards/role.guard";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller('admin')
@UseGuards(AuthorizationGuard, RolesGuard)
@Roles(Role.ADMIN)
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
    constructor(private userService: UserService) {}


    @Get('users')
    async getAllUsers(): Promise<UserEntity[]> {
        return (await this.userService.getAll()).map((user) => user = new UserEntity(user))
    }

    @Delete('del-user/:id')
    async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<UserEntity> {
        return new UserEntity(await this.userService.deleteUser(userId)) 
    }

}
