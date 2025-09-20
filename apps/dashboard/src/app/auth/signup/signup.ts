import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-signup',
  templateUrl: './signup.html',
})
export class SignupComponent implements OnInit {
  // A boolean to track the current theme state
  isDarkTheme = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  // An object to hold the form data using ngModel
  signupForm = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  /**
   * Initializes the component.
   * On initialization, it checks for a saved theme preference in localStorage
   * and applies the 'dark' class to the document's root element if needed.
   */
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check for system preference if no theme is saved
      this.isDarkTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark');
      }
    }
  }

  /**
   * Toggles the dark/light theme.
   * This method adds or removes the 'dark' class from the document's root element
   * and saves the user's preference to localStorage for persistence.
   */
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  /**
   * Handles the form submission.
   * In a real application, you would replace this with a call to an authentication service
   * to validate the user's credentials and create a new account.
   */
  onSignup(): void {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      username: this.signupForm.email,
      password: this.signupForm.password,
    };

    console.log('Signup form submitted:', payload);

    // Call the signup method from the AuthService
    this.authService.signup(payload).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        alert('Account created successfully!');
        this.router.navigate(['/login']); // Redirect to the login page on success
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup failed: ' + error.error.message);
      },
    });
  }
}
