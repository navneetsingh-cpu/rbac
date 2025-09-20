import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { PublicAuthGuard } from './auth/public-auth.guard';
import { SignupComponent } from './auth/signup/signup';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [PublicAuthGuard] // Use this guard to redirect if already logged in
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PublicAuthGuard] // Use this guard to redirect if already logged in
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // This guard protects the dashboard
  }
];
