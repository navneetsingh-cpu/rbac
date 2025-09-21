import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  status!: string; // e.g., 'Todo', 'In Progress', 'Done'

  @ManyToOne(() => User, (user) => user.tasks)
  assignedTo!: User;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization!: Organization;
}
