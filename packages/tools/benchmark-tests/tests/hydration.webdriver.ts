import { TAGS, TEST_URL } from './lib/config';
import { runBenchmark, writeResultFile } from './lib/test';
import type { Params } from './lib/types';

describe('Hydration Benchmark', () => {
	before(async () => {
		await browser.url(TEST_URL);
	});

	for (const tag of TAGS) {
		it(`${tag}`, async () => await runBenchmark(tag, (fn: any, params: Params) => browser.execute(fn, params)));
	}

	after(writeResultFile);
});
