import test from '@playwright/test';
import { createSnapshotTests } from '../lib/tests.snapshots.js';

createSnapshotTests(
	test,
	{
		colorScheme: 'dark',
		forcedColors: 'active', // only works with chromium
		media: 'screen',
		reducedMotion: 'reduce',
	},
	'contrast-dark',
);
