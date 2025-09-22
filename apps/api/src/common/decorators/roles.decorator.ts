import { SetMetadata } from '@nestjs/common';

// NestJS decorator used for role-based access control. It tags a route handler with metadata, which can then be read by a guard to enforce permissions.
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
