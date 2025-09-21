// src/app/auth/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const payload = {
      username: credentials.email,
      password: credentials.password,
    };
    return this.http.post(url, payload).pipe(
      // The tap operator allows you to perform side effects, like saving the token
      tap((response: any) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
      })
    );
  }

  // Method to retrieve the token for the interceptor
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Method to check if the user is authenticated
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
