import { writeResultFile } from './lib/after';
import { runBenchmark } from './lib/browser';
import { createResultsMap, TAGS, TEST_URL } from './lib/config';
import type { Params } from './lib/types';

const RESULTS = createResultsMap();

describe('Hydration Benchmark', () => {
	before(async () => {
		await browser.url(TEST_URL);
	});

	for (const tag of TAGS) {
		it(`${tag}`, async () => await runBenchmark(tag, (fn: any, params: Params) => browser.execute(fn, params), RESULTS));
	}

	after(() => {
		writeResultFile(RESULTS);
	});
});
