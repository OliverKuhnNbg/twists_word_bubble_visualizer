import { DOCUMENT } from '@angular/common';
import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from './with-devtools';

export type AppTheme = 'light' | 'dark';

export interface AppState {
  isInitialized: boolean;
  theme: AppTheme;
}

const THEME_STORAGE_KEY = 'text-cloud-theme';

function getInitialTheme(): AppTheme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  // Fallback auf die OS-Einstellung
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

const initialState: AppState = {
  isInitialized: false,
  theme: getInitialTheme(),
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withDevtools('app'),
  withState(initialState),
  withMethods((store) => ({
    setInitialized(): void {
      patchState(store, { isInitialized: true });
    },
    setTheme(theme: AppTheme): void {
      patchState(store, { theme });
    },
    toggleTheme(): void {
      const next: AppTheme = store.theme() === 'dark' ? 'light' : 'dark';
      patchState(store, { theme: next });
    },
  })),
  withHooks({
    onInit(store) {
      const document = inject(DOCUMENT);

      // Synchronisiert das Signal automatisch mit Bootstrap & localStorage
      effect(() => {
        const currentTheme = store.theme();
        document.documentElement.setAttribute('data-bs-theme', currentTheme);
        localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
      });
    },
  }),
);
