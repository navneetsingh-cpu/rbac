import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup').then((m) => m.SignupComponent),
  },
];
