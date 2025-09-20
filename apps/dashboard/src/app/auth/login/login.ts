import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '@rbac/data';
import { login } from '../state/auth.actions';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.html',
  providers: [AuthService],
})
export class LoginComponent {
  private store = inject(Store<AuthState>);

  // An object to hold the form data using ngModel
  loginForm = {
    email: '',
    password: '',
  };

  onLogin(): void {
    console.log('Dispatching login action for:', this.loginForm.email);
    const { email, password } = this.loginForm;

    // Dispatch the 'login' action
    this.store.dispatch(login({ email, password }));
  }
}
