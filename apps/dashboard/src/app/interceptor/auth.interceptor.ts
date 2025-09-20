// src/app/auth/auth.interceptor.ts
import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const token = authService.getToken();
    const isLoginOrSignup = request.url.includes('/login') || request.url.includes('/signup');

    // Only add the token if it exists and the request is not for login or signup
    if (token && !isLoginOrSignup) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}