import { formatBytes } from './sizes.mjs';

const DEFAULT_TOLERANCE = Object.freeze({ bytes: 1024, percent: 2 });

/**
 * Upper limit for a metric. `percent-or-bytes` allows the larger of both tolerances, so that small
 * entries do not fail on a few bytes; `percent` scales with the metric alone.
 */
export function allowedValue(baselineValue, rule, tolerance) {
	const byPercent = Math.round((baselineValue * tolerance.percent) / 100);
	return baselineValue + (rule === 'percent' ? byPercent : Math.max(byPercent, tolerance.bytes));
}

/**
 * Compares a report with its baseline.
 *
 * - A metric above its allowed value fails, a new metric warns.
 * - A metric below its baseline by more than the tolerance is reported, so the baseline can be lowered.
 * - A key that is new in a set (`hotspots`, `duplicates`) fails: it names a structural regression the
 *   size tolerance would hide.
 */
export function evaluate(report, baseline) {
	const tolerance = { ...DEFAULT_TOLERANCE, ...baseline?.tolerance };
	const rows = [];
	const failures = [];
	const warnings = [];
	const improvements = [];

	for (const [id, metric] of Object.entries(report.metrics)) {
		const field = metric.field ?? 'gzip';
		const current = metric.sizes[field];
		const base = baseline?.metrics?.[id]?.[field];
		if (base === undefined) {
			rows.push({ base: null, current, field, id, label: metric.label, status: 'new' });
			warnings.push(`\`${id}\` is new: ${formatBytes(current)} ${field}.`);
			continue;
		}
		const allowed = allowedValue(base, metric.rule, tolerance);
		const status = current > allowed ? 'fail' : current < base - (allowed - base) ? 'improved' : 'ok';
		rows.push({ allowed, base, current, field, id, label: metric.label, status });
		if (status === 'fail') {
			failures.push(`\`${id}\` grew from ${formatBytes(base)} to ${formatBytes(current)} ${field} (allowed ${formatBytes(allowed)}).`);
		} else if (status === 'improved') {
			improvements.push(`\`${id}\` shrank from ${formatBytes(base)} to ${formatBytes(current)} ${field}.`);
		}
	}
	for (const id of Object.keys(baseline?.metrics ?? {})) {
		if (!(id in report.metrics)) {
			improvements.push(`\`${id}\` no longer exists.`);
		}
	}

	for (const [name, keys] of Object.entries(report.sets ?? {})) {
		const known = new Set(baseline?.sets?.[name] ?? []);
		for (const key of keys.filter((candidate) => !known.has(candidate))) {
			failures.push(`New ${name.replace(/s$/, '')}: \`${key}\`.`);
		}
		for (const key of [...known].filter((candidate) => !keys.includes(candidate))) {
			improvements.push(`Resolved ${name.replace(/s$/, '')}: \`${key}\`.`);
		}
	}

	return { failures, improvements, passed: failures.length === 0, rows, tolerance, warnings };
}

/**
 * Creates the baseline from a report. Keys are sorted, so a baseline update shows as a small diff.
 */
export function toBaseline(report, previous) {
	const metrics = {};
	for (const id of Object.keys(report.metrics).sort()) {
		const { brotli, gzip, raw } = report.metrics[id].sizes;
		metrics[id] = { brotli, gzip, raw };
	}
	const sets = {};
	for (const name of Object.keys(report.sets ?? {}).sort()) {
		sets[name] = [...report.sets[name]].sort();
	}
	return { metrics, sets, tolerance: { ...DEFAULT_TOLERANCE, ...previous?.tolerance } };
}
