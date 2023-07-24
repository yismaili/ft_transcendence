import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// add additional logic before executing route handlers
@Injectable()//decorator marks the RoleGuard class as an injectable service
export class RoleGuard implements CanActivate {
  // Reflector is used to read metadata from the decorated elements
  constructor(private reflector: Reflector) {}
// This is a helper method that checks whether the userRole matches any of the roles specified in the roles array
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
//  the main method of the RoleGuard class 
  canActivate(context: ExecutionContext): boolean {
    // ExecutionContext object as a parameter, which provides information about the current request and route context.
    const roles = this.reflector.get<string[]>('roles', context.getHandler());//retrieve the roles metadata 
    if (!roles) {
      // no roules
      // the @Roles decorator, the route is accessible by default.
      return true;
    }
    // switchToHttp() method to switch the context to the HTTP context
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}