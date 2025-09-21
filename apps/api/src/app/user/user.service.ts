// apps/api/src/app/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, Role, User } from '@rbac/auth';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>
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
   * Finds a user by their ID, including their role and organization relations.
   * @param id The user ID to search for.
   * @returns A promise that resolves to the User object or undefined.
   */
  async findOneByIdWithRoleAndOrg(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['role', 'organization'],
    });
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
