import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.html',
  providers: [AuthService],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // An object to hold the form data using ngModel
  loginForm = {
    email: '',
    password: '',
  };

  /**
   * Handles the login form submission.
   * It calls the AuthService to authenticate the user.
   */
  onLogin(): void {
    console.log('Attempting to log in with:', this.loginForm);

    // Call the login method from the AuthService
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        // Handle a successful login
        console.log('Login successful', response);
        alert('Logged in successfully!');

        // You would typically save the auth token or user data here
        // e.g., localStorage.setItem('token', response.token);

        // Redirect the user to a dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Handle a failed login attempt
        console.error('Login failed', error);
        alert(
          'Login failed: ' + (error.error.message || 'Invalid credentials.')
        );
      },
    });
  }
}
