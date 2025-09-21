import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from '@rbac/auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService], // Export TaskService if other modules need to use it
})
export class TaskModule {}