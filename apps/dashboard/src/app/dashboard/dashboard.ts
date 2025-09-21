// src/app/dashboard/dashboard.component.ts
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AuditLogEntry, TaskService } from '../task/task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { Task } from '../task/task.service';

@Component({
  imports: [CommonModule, FormsModule, DragDropModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filter = 'all';

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
    status: 'Todo',
  };

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any) => {
      // Populate the master list
      this.tasks = tasks;
      // Immediately apply the current filter
      this.setFilter(this.filter);
    });
  }

  get totalTasks(): number {
    return (
      this.todoTasks.length +
      this.inProgressTasks.length +
      this.doneTasks.length
    );
  }

  // Gets the percentage of completed tasks
  get completionPercentage(): number {
    return this.totalTasks > 0
      ? (this.doneTasks.length / this.totalTasks) * 100
      : 0;
  }

  /**
   * Filters the tasks by category and populates the Kanban board lists.
   * @param category The category to filter by ('all', 'work', 'personal').
   */
  setFilter(category: string): void {
    this.filter = category;

    // Filter the master `tasks` list based on the selected category
    const filteredMasterList =
      category === 'all'
        ? this.tasks
        : this.tasks.filter(
            (task) => task.category.toLowerCase() === category.toLowerCase()
          );

    // Distribute the filtered tasks into the Kanban board columns
    this.todoTasks = filteredMasterList.filter((t) => t.status === 'Todo');
    this.inProgressTasks = filteredMasterList.filter(
      (t) => t.status === 'InProgress'
    );
    this.doneTasks = filteredMasterList.filter((t) => t.status === 'Done');
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

  getAuditLog(): void {
    this.taskService.getAuditLog().subscribe({
      next: (logs: AuditLogEntry[]) => {
        // 1. Convert the log data to a formatted JSON string
        const logData = JSON.stringify(logs, null, 2);

        // 2. Create a Blob from the JSON string
        const blob = new Blob([logData], { type: 'application/json' });

        // 3. Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // 4. Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit-log.json'; // Set the filename

        // 5. Append the link to the body and click it to trigger the download
        document.body.appendChild(a);
        a.click();

        // 6. Clean up the temporary URL and element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert('Audit log downloaded successfully!');
      },
      error: (error) => {
        console.error('Failed to retrieve audit log', error);
        alert('Failed to retrieve audit log. Please try again.');
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
