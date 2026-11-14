/**
 * Vitest setup for KoliBri component tests with happy-dom.
 *
 * It uses only the public package entry points, so it works unchanged in an application project.
 * See docs/HOWTO_COMPONENT_TESTS_VITEST.md for the recommended test patterns.
 */

import '../legacy-element-constructor';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/theme-default';
import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';
import { applyHappyDomWorkarounds } from './happy-dom-workarounds';

applyHappyDomWorkarounds();

await register(DEFAULT, []);

// Stencil loads each component chunk lazily on its first use. The first `findBy*` query in a test
// file includes that load, which can exceed the default timeout of 1000 ms.
configure({ asyncUtilTimeout: 5000 });

// Testing Library only unmounts automatically when Vitest runs with `globals: true`.
afterEach(cleanup);
