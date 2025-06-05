import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const user = request.user;

    return data ? user[data] : user;
  },
);
