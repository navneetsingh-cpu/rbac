
export interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,
  isLoggedIn: false,
  error: null,
};
