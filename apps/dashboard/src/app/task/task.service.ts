// src/app/task/task.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define a Task interface for type safety
export interface Task {
  id?: string;
  title: string;
  description: string;
  // Add other task properties as needed (e.g., status, due date)
}

// Define an AuditLogEntry interface
export interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string;
  // Add other audit log properties
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  private taskApiUrl = `${this.apiUrl}/tasks`;
  private auditUrl = `${this.apiUrl}/audit-log`;

  /**
   * Creates a new task.
   * @param taskData The data for the new task.
   * @returns An Observable of the created task.
   */
  createTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.taskApiUrl, taskData);
  }

  /**
   * Retrieves a list of all accessible tasks.
   * @returns An Observable of an array of tasks.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskApiUrl);
  }

  /**
   * Edits an existing task.
   * @param id The ID of the task to edit.
   * @param taskData The updated task data.
   * @returns An Observable of the updated task.
   */
  editTask(id: string, taskData: Task): Observable<Task> {
    const url = `${this.taskApiUrl}/${id}`;
    return this.http.put<Task>(url, taskData);
  }

  /**
   * Deletes a task.
   * @param id The ID of the task to delete.
   * @returns An Observable of the deletion response.
   */
  deleteTask(id: string): Observable<any> {
    const url = `${this.taskApiUrl}/${id}`;
    return this.http.delete(url);
  }

  /**
   * Retrieves a list of all audit log entries.
   * @returns An Observable of an array of audit log entries.
   */
  getAuditLog(): Observable<AuditLogEntry[]> {
    return this.http.get<AuditLogEntry[]>(this.auditUrl);
  }
}
