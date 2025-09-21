// src/app/auth/state/auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((response) =>
            AuthActions.loginSuccess({ accessToken: response.accessToken })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken }) => {
          localStorage.setItem('access_token', accessToken);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap((action) =>
        this.authService.signup(action).pipe(
          map((response) => AuthActions.signupSuccess({ response })),
          catchError((error) => of(AuthActions.signupFailure({ error })))
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => {
          alert('Account created successfully!');
          this.router.navigate(['/signin']); // Navigate to signin page on success
        })
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap((error) => {
          console.error('Signup failed', error);
          alert(
            'Signup failed: ' +
              (error.error.error.message || 'Please try again.')
          );
        })
      ),
    { dispatch: false }
  );
}
