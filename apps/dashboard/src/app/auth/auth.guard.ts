// src/app/auth/auth.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access to the route
    } else {
      // User is not logged in, redirect them to the signin page
      console.log('Access denied. Redirecting to signin page.');
      return this.router.createUrlTree(['/signin']);
    }
  }
}
