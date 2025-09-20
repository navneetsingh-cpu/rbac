import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@rbac/data';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  getAuthState,
  (state) => state.isLoggedIn
);