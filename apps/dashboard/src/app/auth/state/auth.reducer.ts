// src/app/auth/state/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';
import { AuthState } from '@rbac/data';

export const initialAuthState: AuthState = {
  accessToken: null,
  isLoggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loginSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken,
    isLoggedIn: true,
    error: null,
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    accessToken: null,
    isLoggedIn: false,
    error,
  })),

  on(logout, (state) => ({
    ...state,
    accessToken: null,
    isLoggedIn: false,
    error: null,
  }))
);
