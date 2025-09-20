import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { signup } from '../state/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '@rbac/data';

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-signup',
  templateUrl: './signup.html',
})
export class SignupComponent {
  private store = inject(Store<AuthState>);

  // An object to hold the form data using ngModel
  signupForm = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSignup(): void {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { email, password } = this.signupForm;
    const payload = { email, password };

    console.log('Dispatching signup action:', payload);

    // Dispatch the 'signup' action with the payload
    this.store.dispatch(signup(payload));
  }
}
