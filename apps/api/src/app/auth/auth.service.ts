// apps/api/src/app/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@rbac/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: User) {
    console.log('Existing userDto:', userDto);

    const user = await this.userService.findOne(userDto.email);
    console.log('Existing user:', user);
    if (user) {
      throw new ConflictException('User with this email already exists.');
    }
    const newUser = await this.userService.create(userDto);
    return newUser;
  }
}
