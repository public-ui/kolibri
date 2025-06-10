import { test } from '@playwright/test';
import { TAGS, TEST_URL } from './lib/config';
import { runBenchmark, writeResultFile } from './lib/test';
import type { Params } from './lib/types';

test.describe('Hydration Benchmark', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(TEST_URL);
	});

	for (const tag of TAGS) {
		test(`${tag}`, async ({ page }) => await runBenchmark(tag, (fn: any, params: Params) => page.evaluate(fn, params)));
	}

	test.afterAll(writeResultFile);
});
