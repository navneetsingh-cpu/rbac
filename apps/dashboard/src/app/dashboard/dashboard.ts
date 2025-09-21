// src/app/dashboard/dashboard.component.ts
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../task/task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// Import Task interface from the shared location to ensure consistency
import { Task } from '../task/task.service';

@Component({
  imports: [CommonModule, FormsModule, DragDropModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  showModal = false;
  newTask: any = {
    title: '',
    description: '',
    category: 'Work',
    status: 'Todo', // Default status for new tasks
  };

  showEditModal = false; // New property to control the edit modal
  editingTask: Task | null = {
    title: ' ',
    description: ' ',
    category: 'Work',
    completed: false,
    status: 'Todo',
  };

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any) => {
      this.todoTasks = tasks.filter((t: Task) => t.status === 'Todo');
      this.inProgressTasks = tasks.filter(
        (t: Task) => t.status === 'InProgress'
      );
      this.doneTasks = tasks.filter((t: Task) => t.status === 'Done');
    });
  }

  // Refactored onDrop method
  onDrop(event: CdkDragDrop<Task[]>) {
    // If the item is dropped in the same container, just reorder
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Transfer the item to the new container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Determine the new status based on the destination list ID
      const newStatus =
        event.container.id === 'doneList'
          ? 'Done'
          : event.container.id === 'inProgressList'
          ? 'InProgress'
          : 'Todo';
      const movedTask = event.container.data[event.currentIndex];

      // Update the task's status locally and then call the API
      movedTask.status = newStatus;
      this.taskService.editTask(movedTask.id, movedTask).subscribe({
        next: (response) => console.log('Task status updated:', response),
        error: (error) => console.error('Failed to update task status:', error),
      });
    }
  }

  editTask(): void {
    if (this.editingTask && this.editingTask.id) {
      this.taskService
        .editTask(this.editingTask.id, this.editingTask)
        .subscribe({
          next: (response) => {
            console.log('Task updated successfully:', response);
            // Refresh the list to reflect the changes
            this.loadTasks();
            // Hide the modal after a successful update
            this.showEditModal = false;
          },
          error: (error) => {
            console.error('Failed to update task:', error);
            alert('Failed to save changes. Please try again.');
          },
        });
    }
  }

  // Refactored deleteTask to remove from the correct list
  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Remove the task from the local lists
        this.todoTasks = this.todoTasks.filter((task) => task.id !== id);
        this.inProgressTasks = this.inProgressTasks.filter(
          (task) => task.id !== id
        );
        this.doneTasks = this.doneTasks.filter((task) => task.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete task', error);
        alert('Failed to delete task.');
      },
    });
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe({
      next: (response) => {
        // Add the new task to the 'Todo' list by default
        this.todoTasks.push(response);
        this.showModal = false;
        this.newTask = {
          title: '',
          description: '',
          category: 'Work',
          status: 'Todo',
        };
      },
      error: (error) => {
        console.error('Failed to create task', error);
      },
    });
  }
  openEditTaskModal(task: Task): void {
    this.editingTask = { ...task }; // Clone the task to avoid direct mutation
    this.showEditModal = true;
  }

  openCreateTaskModal(): void {
    this.showModal = true;
  }
}
