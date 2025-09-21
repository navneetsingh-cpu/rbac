// libs/shared-data-access-organization/src/lib/organization.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';


@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // Self-referencing relationship for a 2-level hierarchy (parent organization)
  @ManyToOne(() => Organization, organization => organization.children)
  parent?: Organization;

  @OneToMany(() => Organization, organization => organization.parent)
  children!: Organization[];

  // One-to-many relationship with the User entity
  @OneToMany(() => User, user => user.organization)
  users!: User[];

  // One-to-many relationship with the Task entity
  @OneToMany(() => Task, task => task.organization)
  tasks!: Task[];
}