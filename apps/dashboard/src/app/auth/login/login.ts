import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
  // A boolean to track the current theme state
  isDarkTheme = false;
  hidePassword = true;
  // An object to hold the form data using ngModel
  loginForm = {
    email: '',
    password: '',
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
   * to validate the user's credentials against a backend.
   */
  onLogin(): void {
    console.log('Login form submitted:', this.loginForm);
    // Here you would typically call an authentication service
    // Example: this.authService.login(this.loginForm).subscribe(...)
  }
}
