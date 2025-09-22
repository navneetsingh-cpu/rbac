// apps/api/src/app/initialization.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@rbac/auth';
import { Organization } from '@rbac/auth';

// Seeds the SQL lite database with initial roles and an organization if they do not already exist.
@Injectable()
export class InitializationService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>
  ) {}

  async onModuleInit() {
    console.log('Checking for initial seed data...');

    // Seed Roles
    const rolesToSeed = ['Owner', 'Admin', 'Viewer'];
    for (const roleName of rolesToSeed) {
      const roleExists = await this.roleRepository.findOne({
        where: { name: roleName },
      });
      if (!roleExists) {
        await this.roleRepository.save({ name: roleName });
        console.log(`- Seeded role: ${roleName}`);
      }
    }

    // Seed Organization
    const orgName = 'Microsoft';
    const orgExists = await this.organizationRepository.findOne({
      where: { name: orgName },
    });
    if (!orgExists) {
      await this.organizationRepository.save({ name: orgName });
      console.log(`- Seeded organization: ${orgName}`);
    }
  }
}
