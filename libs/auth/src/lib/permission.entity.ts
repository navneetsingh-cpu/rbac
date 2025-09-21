// libs/shared-data-access-permission/src/lib/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string; // e.g., 'read:tasks', 'write:tasks'

  @ManyToMany(() => Role, role => role.permissions)
  roles!: Role[];
}