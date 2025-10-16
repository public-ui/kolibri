import { test } from '@playwright/test';
import { writeResultFile } from './lib/after';
import { runBenchmark } from './lib/browser';
import { createResultsMap, TAGS, TEST_URL } from './lib/config';
import type { Params } from './lib/types';

const RESULTS = createResultsMap();

test.describe('Hydration Benchmark', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(TEST_URL);
	});

	for (const tag of TAGS) {
		test(`${tag}`, async ({ page }) => await runBenchmark(tag, (fn: any, params: Params) => page.evaluate(fn, params), RESULTS));
	}

	test.afterAll(() => {
		writeResultFile(RESULTS);
	});
});
