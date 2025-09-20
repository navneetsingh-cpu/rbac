// src/app/auth/public-auth.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicAuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // If the user is logged in, redirect them away from public pages
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false; // Prevent access to the public route
    }

    // If not logged in, allow them to view the public route
    return true;
  }
}
