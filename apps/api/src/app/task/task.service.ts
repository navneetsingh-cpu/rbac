// apps/api/src/app/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, User } from '@rbac/auth';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async create(task: Task, user: User): Promise<Task> {
    const newTask = this.taskRepository.create({
      title: task.title,
      description: task.description,
      assignedTo: user,
      status: 'Todo',
      organization: user.organization,
    });
    await this.taskRepository.insert(newTask); //

    return newTask; // Return the created object
  }

  async findAllForUser(user: User): Promise<Task[]> {
    if (user.role.name === 'Owner' || user.role.name === 'Admin') {
      // Owners and Admins can see all tasks within their organization
      return this.taskRepository.find({
        relations: ['assignedTo'],
      });
    }

    // Viewers can only see tasks assigned to them
    return this.taskRepository.find({
      where: { assignedTo: { id: user.id } },
      relations: ['assignedTo'],
    });
  }

  async update(id: number, updatedTask: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updatedTask,
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
  }
}
