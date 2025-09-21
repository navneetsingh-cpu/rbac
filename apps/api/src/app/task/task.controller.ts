// apps/api/src/app/task/task.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Task } from '@rbac/auth';
import { TaskService } from './task.service';
import { RolesGuard } from '../../common/guards/role.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles('Owner')
  async create(@Body() task: Task, @Request() req) {
    // Only 'Owner' can create tasks.
    // The RolesGuard decorator handles this check automatically.
    console.log('Creating task with data:', task);
    console.log('Request user:', req.user);
    return this.taskService.create(task, req.user);
  }

  @Get()
  @Roles('Owner', 'Admin', 'Viewer')
  async findAll(@Request() req) {
    // All roles can list tasks, but the service scopes the results
    // based on the user's role and organization.
    return this.taskService.findAllForUser(req.user);
  }

  @Put(':id')
  @Roles('Owner', 'Admin')
  async update(@Param('id') id: number, @Body() task: Partial<Task>) {
    // Only 'Owner' and 'Admin' can edit tasks.
    // The RolesGuard decorator handles this check.
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  @Roles('Owner', 'Admin')
  async delete(@Param('id') id: number) {
    // Only 'Owner' and 'Admin' can delete tasks.
    // The RolesGuard decorator handles this check.
    return this.taskService.delete(id);
  }
}
