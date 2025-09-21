import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Organization, Role, User } from '@rbac/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Fetch the user with their role and organization
    const fullUser = await this.userService.findOneByIdWithRoleAndOrg(user.id);

    if (!fullUser) {
      throw new UnauthorizedException('User data incomplete');
    }

    console.log('fullUser:', fullUser);

    // Create the payload with the user's ID, role, and organization ID
    const payload = {
      sub: fullUser.id,
      role: fullUser.role.name,
      orgId: fullUser.organization.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(userDto: User) {
    const userExists = await this.userService.findOne(userDto.email);
    if (userExists) {
      throw new ConflictException('User with this email already exists.');
    }

    // Server-side assignment of default role and organization
    // const defaultRole = await this.roleRepository.findOne({
    //   where: { name: 'Viewer' },
    // });
    const defaultOrganization = await this.organizationRepository.findOne({
      where: { name: 'Microsoft' },
    });

    if (!defaultOrganization) {
      throw new ConflictException('Default role or organization not found.');
    }

    userDto.organization = defaultOrganization;

    const newUser = await this.userService.create(userDto);
    return newUser;
  }
}
