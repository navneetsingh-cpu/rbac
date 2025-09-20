import { createAction, props } from '@ngrx/store';

// Action for when the login process is initiated
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

// Action for when the login is successful
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string }>()
);

// Action for when the login fails
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// Action for user logout
export const logout = createAction('[Auth] Logout');

// Action to check if a user is logged in (for app initialization)
export const checkLogin = createAction('[Auth] Check Login');

// Action for when the signup process is initiated
export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string }>()
);

// Action for when the signup is successful
export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ response: any }>()
);

// Action for when the signup fails
export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: any }>()
);
