import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/state/auth.reducer';
import { AuthEffects } from './auth/state/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    // NgRx Store and Effects Configuration for Standalone Apps
    provideStore(), // Provides the global store
    provideState('auth', authReducer), // Registers a feature state
    provideEffects(AuthEffects), // Registers feature effects
  ],
};
