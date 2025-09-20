import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, HttpClientModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'rbac';

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
}
