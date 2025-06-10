import { writeFileSync } from 'fs';
import { TEST_ITERATIONS, TEST_TIMEOUT } from './config';
import type { Measure, Params, TagType } from './types';

async function testRun({ iterations, tag, timeout }: Params): Promise<number[]> {
	return new Promise(async (resolve) => {
		const testResults = new Map<HTMLElement, Measure>();
		const webComponents = new Set<HTMLElement>();
		const batches = [];

		window.gc?.();
		await customElements.whenDefined(tag);

		function startNextHydration() {
			if (webComponents.size > 0) {
				const el: HTMLElement = webComponents.values()?.next()?.value!;
				performance.mark(`mark-append-${el.getAttribute('data-iteration')}`);
				testResults.set(el, {
					hydrated: null,
					themed: null,
				});
				document.body.appendChild(el);
			} else {
				returnDurations();
			}
		}

		function returnDurations() {
			const durations: number[] = [];
			testResults.forEach((measure) => {
				if (measure.hydrated !== null) {
					durations.push(measure.hydrated);
				}
			});
			observer.disconnect();
			resolve(durations);
		}

		function removeElement(el: HTMLElement) {
			webComponents.delete(el);
			try {
				el.remove();
			} catch {}
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				const el = mutation.target as HTMLElement;
				if (!webComponents.has(el) && !el.isConnected) continue;

				const measure = testResults.get(el);
				if (!measure) continue;

				const id = el.getAttribute('data-iteration');

				if (!measure.hydrated && el.classList.contains('hydrated')) {
					performance.mark(`mark-hydrated-${id}`);
					performance.measure(`hydrated-${id}`, `mark-append-${id}`, `mark-hydrated-${id}`);
					measure.hydrated = performance.getEntriesByName(`hydrated-${id}`).pop()?.duration!;
					// } else if (measure.hydrated && el.hasAttribute('data-themed')) {
					// 	performance.mark(`mark-themed-${id}`);
					// 	performance.measure(`themed-${id}`, `mark-append-${id}`, `mark-themed-${id}`);
					// 	measure.themed = performance.getEntriesByName(`themed-${id}`).pop()?.duration!;

					removeElement(el);
					startNextHydration();
				}
			}
		});

		for (let i = 0; i <= iterations; i++) {
			const el = document.createElement(tag);
			el.setAttribute('data-iteration', i.toString());
			webComponents.add(el);
			observer.observe(el, {
				attributes: true,
				attributeFilter: ['class', 'data-themed'],
			});
		}

		// Fallback for when no elements are hydrated
		setTimeout(returnDurations, timeout);

		startNextHydration();
	});
}

const results = new Map<TagType, number[]>();
export function writeResultFile() {
	function percentile(sorted: number[], p: number): number {
		const i = Math.floor(sorted.length * p);
		return sorted[i] ?? sorted[sorted.length - 1];
	}

	function stddev(arr: number[]) {
		const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
		const squared = arr.map((x) => (x - mean) ** 2);
		return Math.sqrt(squared.reduce((a, b) => a + b, 0) / arr.length);
	}

	const finalResults = Array.from(results.entries())
		.filter(([_, values]) => values.length > 0)
		.map(([tag, values]) => {
			values.sort((a, b) => a - b);
			const mid = Math.floor(values.length / 2);
			return {
				name: tag,
				unit: 'ms',
				value: values[mid],
				p95: percentile(values, 0.95),
				p99: percentile(values, 0.99),
				min: values[0],
				max: values[values.length - 1],
				stddev: stddev(values),
			};
		});

	writeFileSync('benchmark-result.json', JSON.stringify(finalResults, null, 2));
}

export async function runBenchmark(tag: TagType, execFn: any) {
	const durations: number[] = await execFn(testRun, {
		iterations: TEST_ITERATIONS,
		tag,
		timeout: TEST_TIMEOUT,
	});

	console.log(`Hydration durations for ${tag}:`, durations);
	/**
	 * The network request durations are removed from the test results
	 * to focus on the hydration performance of the web components itself.
	 */
	results.set(tag, durations.splice(1, durations.length - 1));
}
