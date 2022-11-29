import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: number[], userRoles: number) {
    for (const role of roles) {
      if (role === userRoles) return true;
    }
    return false;
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles || roles.includes(0)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.groupId);
  }
}

// IF ROLE = 0 MEANS EVERYONE CAN ACCESS IT, IF ROLE = 1 MEANS ONLY ADMIN CAN ACCESS IT, IF ROLE = 2 MEANS USERS CAN ACCESS IT
