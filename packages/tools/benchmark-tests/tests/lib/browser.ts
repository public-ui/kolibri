import { TEST_BATCH_SIZE, TEST_ITERATIONS, TEST_TIMEOUT } from './config';
import { testRun } from './test';
import type { TagType } from './types';

export async function runBenchmark(tag: TagType, execFn: any, results: Map<TagType, number[]>) {
	const durations: number[] = await execFn(testRun, {
		batchSize: TEST_BATCH_SIZE,
		iterations: TEST_ITERATIONS,
		tag,
		timeout: TEST_TIMEOUT,
	});

	console.log(`Hydration durations for ${tag}:`, durations);
	/**
	 * Cut warmup iterations from the results.
	 */
	results.set(tag, durations.splice(1, durations.length - 1));
}
