import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.entity';
import { Task } from './task.entity';
import { Organization } from './organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  // Add the bi-directional relationship here
  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks!: Task[];

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization!: Organization;
}
