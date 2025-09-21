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
    organization: '',
    role: '1', // Default to 'Owner'
  };

  onSignup(): void {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Destructure all form data, including the new fields
    const { email, password, organization, role } = this.signupForm;

    // Create the payload for the dispatched action
    const payload = { email, password, organization, role };

    console.log('Dispatching signup action with full payload:', payload);

    // Dispatch the 'signup' action with the updated payload
    this.store.dispatch(signup(payload));
  }
}
