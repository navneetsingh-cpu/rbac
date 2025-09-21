// src/common/guards/role.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // No roles specified, access granted
    }

    const { user } = context.switchToHttp().getRequest();
    const userRoleName = user.role.name;

    // Define the role hierarchy. A higher index means more permissions.
    const roleHierarchy = ['Viewer', 'Admin', 'Owner'];

    const userRoleIndex = roleHierarchy.indexOf(userRoleName);
    const requiredRolesIndexes = requiredRoles.map(role => roleHierarchy.indexOf(role));

    // Check if the user's role is sufficient to meet any of the required roles
    const hasPermission = requiredRolesIndexes.some(requiredIndex => userRoleIndex >= requiredIndex);

    if (!hasPermission) {
      throw new ForbiddenException(`Your role '${userRoleName}' does not have the required permissions.`);
    }

    return true;
  }
}