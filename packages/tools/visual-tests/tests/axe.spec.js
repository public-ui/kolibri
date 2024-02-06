import test from '@playwright/test';
import { createAxeTests } from './lib/tests.axe.js';

createAxeTests(test, {
	colorScheme: 'light',
	forcedColors: 'none', // only works with chromium
	media: 'screen',
	reducedMotion: 'reduce',
});
