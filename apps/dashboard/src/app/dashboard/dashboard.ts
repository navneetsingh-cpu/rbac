import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskService } from '../task/task.service';

interface Task {
  dueDate?: string | number | Date;
  id: number;
  title: string;
  description: string;
  category: 'Work' | 'Personal';
  completed: boolean;
}

@Component({
  imports: [CommonModule, FormsModule, DragDropModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Finish report',
      description: 'Complete the Q3 sales report for the team meeting.',
      category: 'Work',
      completed: false,
    },
    {
      id: 2,
      title: 'Buy groceries',
      description: 'Milk, bread, and eggs.',
      category: 'Personal',
      completed: true,
    },
    {
      id: 3,
      title: 'Workout',
      description: '30-minute run at the park.',
      category: 'Personal',
      completed: true,
    },
    {
      id: 4,
      title: 'Code review',
      description: 'Review pull requests for the new feature branch.',
      category: 'Work',
      completed: false,
    },
  ];

  filteredTasks: Task[] = this.tasks;
  filter = 'all';
  showModal = false;
  newTask: any = {
    title: '',
    description: '',
    category: 'Work',
    completed: false,
  };

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      console.log('Fetched tasks from API:', data);
    });
  }

  get completedTasks(): Task[] {
    return this.tasks.filter((t) => t.completed);
  }

  get completionPercentage(): number {
    return this.tasks.length > 0
      ? (this.completedTasks.length / this.tasks.length) * 100
      : 0;
  }

  setFilter(category: string): void {
    this.filter = category;
    if (category === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category.toLowerCase() === category
      );
    }
  }

  createTask(): void {
    const newTaskWithId = { ...this.newTask, id: this.tasks.length + 1 };
    this.tasks.push(newTaskWithId);
    this.showModal = false;
    this.newTask = {
      title: '',
      description: '',
      category: 'Work',
      completed: false,
    };
    this.setFilter(this.filter); // Refresh the filtered list
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.setFilter(this.filter); // Refresh the filtered list
  }

  onDrop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.setFilter(this.filter); // Refresh the filtered list after drag-and-drop
  }

  openCreateTaskModal(): void {
    this.showModal = true;
  }
}
