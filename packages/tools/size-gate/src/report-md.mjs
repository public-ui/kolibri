import { formatBytes } from './sizes.mjs';

/**
 * Escapes text for a Markdown table cell: backslashes first, so the escape of `|` cannot be undone.
 */
const cell = (text) => String(text).replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const STATUS = { exceeded: '❌', improved: '✅', new: '🆕', ok: '➖' };
const ALWAYS = new Set(['core', 'redundant', 'sheets', 'total']);
const MAX_ROWS = 25;
const MAX_CANDIDATES = 10;

function delta(row) {
	if (row.base === null) {
		return '–';
	}
	const diff = row.current - row.base;
	const percent = row.base === 0 ? 0 : (diff / row.base) * 100;
	return `${diff > 0 ? '+' : ''}${formatBytes(diff)} (${percent > 0 ? '+' : ''}${percent.toFixed(1)} %)`;
}

function list(title, items) {
	return items.length === 0 ? '' : `<details><summary>${title} (${items.length})</summary>\n\n${items.map((item) => `- ${item}`).join('\n')}\n\n</details>\n\n`;
}

/**
 * Renders the result of one package as Markdown for the console and the GitHub step summary.
 * `gate` mode shows the informational comparison with the baseline; `analysis` mode adds the
 * restructuring candidates.
 */
export function renderMarkdown({ mode = 'gate', name, report, result }) {
	const analysis = mode === 'analysis';
	const head = analysis
		? `## 🔎 Size analysis \`${name}\`\n\n`
		: `## 📦 Size report \`${name}\`: ${result.withinTolerance ? '✅ within tolerance' : '❌ beyond tolerance'}\n\n`;
	const tolerance = `Tolerance: +${result.tolerance.percent} % or +${formatBytes(result.tolerance.bytes)} per component, +${result.tolerance.percent} % for totals. Sizes are gzip unless the row says otherwise. The comparison is informational and never blocks a merge.\n\n`;
	const exceeded = result.exceeded.length === 0 ? '' : `### Beyond tolerance\n\n${result.exceeded.map((message) => `- ${message}`).join('\n')}\n\n`;

	const rows = result.rows
		.filter((row) => ALWAYS.has(row.id) || row.status !== 'ok' || row.base !== row.current)
		.sort(
			(a, b) =>
				Number(ALWAYS.has(b.id)) - Number(ALWAYS.has(a.id)) || Math.abs(b.current - (b.base ?? b.current)) - Math.abs(a.current - (a.base ?? a.current)),
		)
		.slice(0, MAX_ROWS);
	const table =
		`| Metric | Baseline | Current | Δ | |\n| --- | ---: | ---: | ---: | :-: |\n` +
		rows
			.map(
				(row) =>
					`| \`${row.id}\`${row.field === 'gzip' ? '' : ` (${row.field})`} | ${row.base === null ? '–' : formatBytes(row.base)} | ${formatBytes(row.current)} | ${delta(row)} | ${STATUS[row.status]} |`,
			)
			.join('\n') +
		'\n\n';
	const hidden = result.rows.length - rows.length;
	const unchanged = hidden > 0 ? `${hidden} further metrics are unchanged.\n\n` : '';

	const candidates = analysis ? report.candidates.slice(0, MAX_CANDIDATES) : [];
	const candidateTable =
		candidates.length === 0
			? ''
			: `### Restructuring candidates\n\nRanked by impact; they do not fail the gate.\n\n| # | Kind | Subject | Impact | Action |\n| ---: | --- | --- | ---: | --- |\n` +
				candidates
					.map(
						(candidate, index) =>
							`| ${index + 1} | ${candidate.kind} | ${cell(candidate.subject)} | ${candidate.impactGzip === undefined ? `${formatBytes(candidate.impactRaw)} raw` : `${formatBytes(candidate.impactGzip)} gzip`} | ${cell(candidate.action)} |`,
					)
					.join('\n') +
				'\n\n';

	const maps = !analysis || report.sourceMaps ? '' : '> ⚠️ No source maps found: sizes are exact per chunk, but the attribution to modules is unavailable.\n\n';
	const footer = analysis
		? 'The interactive treemap is `size-report/treemap.html` (artifact `size-analysis`).\n'
		: 'Treemap and restructuring candidates: run the workflow *Size Analysis* or `pnpm size:analyze` locally (see docs/SIZE_GATE.md).\n';

	return (
		head +
		maps +
		tolerance +
		exceeded +
		table +
		unchanged +
		candidateTable +
		list('Warnings', result.warnings) +
		list('Improvements', result.improvements) +
		footer
	);
}
