import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Role, User } from '@rbac/auth';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Organization])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
