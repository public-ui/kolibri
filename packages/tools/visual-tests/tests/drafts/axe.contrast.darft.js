import test from '@playwright/test';
import { createAxeTests } from '../lib/tests.axe.js';

createAxeTests(
	test,
	{
		colorScheme: 'light',
		forcedColors: 'active', // only works with chromium
		media: 'screen',
		reducedMotion: 'reduce',
	},
	'contrast',
);
