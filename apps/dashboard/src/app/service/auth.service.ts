// src/app/auth/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  /**
   * Sends a sign-up request to the backend API.
   * @param userData The user's registration data (email, password).
   * @returns An Observable of the HTTP response from the backend.
   */
  signup(userData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post(url, userData);
  }

  // You can add other authentication methods here, like login, logout, etc.
  // login(credentials: any): Observable<any> {
  //   const url = `${this.apiUrl}/login`;
  //   return this.http.post(url, credentials);
  // }
}
