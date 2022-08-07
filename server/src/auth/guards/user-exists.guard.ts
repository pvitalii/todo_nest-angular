import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async validate(req: Request) {
    const user = await this.userService.getUser({ name: req.body.name });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    return this.validate(req);
  }
}
