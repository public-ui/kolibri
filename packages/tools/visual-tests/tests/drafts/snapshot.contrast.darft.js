import test from '@playwright/test';
import { createSnapshotTests } from '../lib/tests.snapshots.js';

createSnapshotTests(
	test,
	{
		colorScheme: 'light',
		forcedColors: 'active', // only works with chromium
		media: 'screen',
		reducedMotion: 'reduce',
	},
	'contrast',
);
