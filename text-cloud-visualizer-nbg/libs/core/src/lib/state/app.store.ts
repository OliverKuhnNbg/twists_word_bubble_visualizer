import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface AppState {
  isInitialized: boolean;
  // Später: Globale Theme-Settings oder User-Präferenzen
}

const initialState: AppState = {
  isInitialized: false,
};

export const AppStore = signalStore(
  { providedIn: 'root' }, // Wichtig: Macht den Store zum Singleton für die ganze App
  withState(initialState),
  withMethods((store) => ({
    setInitialized(): void {
      patchState(store, { isInitialized: true });
    },
  })),
);
