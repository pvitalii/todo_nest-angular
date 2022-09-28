import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class isUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }
    
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.findOne({ username: value });
        return user ? false : true
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'username must be unique';
    }

}