import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@text-cloud-visualizer-nbg/core';
import { CloudWord } from '../models/cloud-word.model';
import { CloudLayoutService } from '../services/cloud-layout.service';

export interface CloudState {
  rawText: string;
  processedWords: CloudWord[];
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
  withMethods((store, layoutService = inject(CloudLayoutService)) => {
    const processViaD3 = async (text: string): Promise<void> => {
      patchState(store, { isProcessing: true });

      const words = await layoutService.calculateLayout(text);

      patchState(store, {
        isProcessing: false,
        processedWords: words,
      });
    };

    return {
      processViaD3,
      setRawText(text: string): void {
        patchState(store, { rawText: text });
        processViaD3(text);
      },
    };
  }),
);
