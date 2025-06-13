import { writeFileSync } from 'fs';
import type { TagType } from './types';

export function writeResultFile(results: Map<TagType, number[]>) {
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
