// Parity page wiring: the Stencil runtime and the default theme come from the built dist
// packages (self-contained ESM), the Lit element comes from the spike sources that reuse the
// shared KoliBri orchestration layer.
import { bootstrap } from '@kolibri/dist';
import { defineCustomElements } from '@kolibri/loader';
import { DEFAULT } from '@kolibri/theme-default';

import '../src/kol-button-lit';

await bootstrap([DEFAULT], () => defineCustomElements(window), { translation: { name: 'en' } });

// Signal readiness for the verification script (theme styles are attached asynchronously).
await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
(window as unknown as Record<string, unknown>)['__parityReady'] = true;
