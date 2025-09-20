import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full', // 'full' ensures the redirection only happens when the entire URL is empty
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup').then((m) => m.SignupComponent),
  },
];
