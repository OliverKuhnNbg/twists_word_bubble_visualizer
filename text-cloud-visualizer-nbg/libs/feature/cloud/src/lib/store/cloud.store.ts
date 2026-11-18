import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { withDevtools } from '@text-cloud-visualizer-nbg/core';
// Importiere hier später deinen D3-Service aus der data-access oder feature library

export interface CloudState {
  rawText: string;
  processedWords: unknown[]; // Später: Die von D3 berechneten X/Y-Koordinaten
  isProcessing: boolean;
}

const initialState: CloudState = {
  rawText: '',
  processedWords: [],
  isProcessing: false,
};

export const CloudStore = signalStore(
  withDevtools('cloud'),
  withState(initialState),
  withMethods((store) => {
    const processViaD3 = async (text: string): Promise<void> => {
      patchState(store, { isProcessing: true });

      // Platzhalter für d3-cloud Logik
      patchState(store, {
        isProcessing: false,
        processedWords: [{ text, size: 20, x: 0, y: 0 }],
      });
    };

    return {
      processViaD3,
      setRawText(text: string): void {
        console.log('STORE STATE:\t' + text);
        patchState(store, { rawText: text });
        processViaD3(text);
      },
    };
  }),
);
