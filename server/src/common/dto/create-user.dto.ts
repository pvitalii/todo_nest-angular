import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { isUnique } from 'src/common/decorators/is-unique-validation';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @isUnique()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}
