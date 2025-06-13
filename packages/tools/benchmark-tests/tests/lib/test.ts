import type { Measure, Params } from './types';

export async function testRun({ batchSize, iterations, tag, timeout }: Params): Promise<number[]> {
	return new Promise(async (resolve) => {
		const testResults: Map<Set<HTMLElement>, Measure> = new Map();
		const batches: Set<Set<HTMLElement>> = new Set();
		let currentBatch: Set<HTMLElement> = new Set();
		let batchCounter = 0;

		window.gc?.();
		await customElements.whenDefined(tag);

		// Fallback for when no elements are hydrated
		setTimeout(() => {
			console.warn('⚠️ Timeout: hydration did not finish in time – returning partial or empty results.');
			returnDurations();
		}, timeout);

		function startNextHydration() {
			if (batches.size > 0) {
				batchCounter++;
				currentBatch = batches.values()?.next()?.value!;
				performance.mark(`mark-append-${batchCounter}`);
				testResults.set(currentBatch, {
					hydrated: null,
					themed: null,
				});
				for (const el of currentBatch) {
					document.body.appendChild(el);
				}
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

		function removeBatch(batch: Set<HTMLElement>) {
			batches.delete(batch);
		}

		function removeElement(el: HTMLElement) {
			currentBatch.delete(el);
			try {
				el.remove();
			} catch {}
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				const el = mutation.target as HTMLElement;
				if (!currentBatch.has(el) && !el.isConnected) continue;

				if (el.classList.contains('hydrated')) {
					removeElement(el);
					if (currentBatch.size === 0) {
						performance.mark(`mark-hydrated-${batchCounter}`);
						performance.measure(`hydrated-${batchCounter}`, `mark-append-${batchCounter}`, `mark-hydrated-${batchCounter}`);

						const measure = testResults.get(currentBatch)!;
						measure.hydrated = performance.getEntriesByName(`hydrated-${batchCounter}`).pop()?.duration!;

						removeBatch(currentBatch);
						setTimeout(startNextHydration);
					}
				}
			}
		});

		for (let i = 0; i <= iterations; i++) {
			const batch = new Set<HTMLElement>();
			for (let j = 0; j < batchSize; j++) {
				const el = document.createElement(tag);
				batch.add(el);
				observer.observe(el, {
					attributes: true,
					attributeFilter: ['class', 'data-themed'],
				});
			}
			batches.add(batch);
		}

		startNextHydration();
	});
}
