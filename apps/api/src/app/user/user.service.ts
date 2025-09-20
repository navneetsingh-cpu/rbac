// apps/api/src/app/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@rbac/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their username.
   * @param username The username to search for.
   * @returns A promise that resolves to the User object or undefined.
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Creates a new user in the database.
   * This method hashes the password before saving the user.
   * @param user The user object to create.
   * @returns A promise that resolves to the newly created user.
   */
  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    await newUser.hashPassword(); // Call the method from the shared entity
    return this.usersRepository.save(newUser);
  }
}