import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    // StoreModule.forFeature and EffectsModule.forFeature should be imported in a module, not here
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'rbac';
  public authService = inject(AuthService);
  private router = inject(Router);
  // A boolean to track the current theme state
  isDarkTheme = false;
  hidePassword = true;

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
   * Logs the user out by clearing the token and redirecting to the login page.
   */
  logout(): void {
    // Call the logout method from the AuthService
    this.authService.logout();

    // Navigate the user back to the login page
    this.router.navigate(['/signin']);
  }
}
