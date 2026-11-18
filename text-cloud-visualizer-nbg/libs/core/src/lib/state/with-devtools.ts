import { effect } from '@angular/core';
import { getState, signalStoreFeature, withHooks } from '@ngrx/signals';

interface ReduxDevToolsExtension {
  connect(options: { name: string }): {
    init(state: unknown): void;
    send(action: string, state: unknown): void;
  };
}

export function withDevtools(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        const ext = (
          window as unknown as {
            __REDUX_DEVTOOLS_EXTENSION__?: ReduxDevToolsExtension;
          }
        ).__REDUX_DEVTOOLS_EXTENSION__;

        if (!ext) return;

        const devTools = ext.connect({ name });
        devTools.init(getState(store));

        effect(() => {
          const state = getState(store);
          devTools.send(`[${name}] State Update`, state);
        });
      },
    }),
  );
}
