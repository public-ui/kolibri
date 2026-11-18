#!/usr/bin/env node
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { analyzeComponents } from '../src/analyze-components.mjs';
import { analyzeTheme } from '../src/analyze-theme.mjs';
import { evaluate, toBaseline } from '../src/gate.mjs';
import { renderHtml } from '../src/report-html.mjs';
import { renderMarkdown } from '../src/report-md.mjs';
import { formatBytes } from '../src/sizes.mjs';
import { componentsTree, themeTree } from '../src/tree.mjs';

const TARGETS = {
	components: {
		analyze: analyzeComponents,
		dir: 'dist/esm',
		summary: (report) =>
			`Core ${formatBytes(report.core.sizes.gzip)} gzip (${report.core.files.length} files) · ${report.entries.length} entries, median ${formatBytes(report.entryMedian)} gzip on top of the core · total ${formatBytes(report.total.gzip)} gzip.`,
		tree: componentsTree,
	},
	theme: {
		analyze: analyzeTheme,
		dir: 'dist',
		summary: (report) =>
			`${report.sheets.length} CSS strings, ${formatBytes(report.sheetSizes.raw)} raw / ${formatBytes(report.sheetSizes.gzip)} gzip · ${formatBytes(report.redundantBytes)} duplicated across sheets · ${formatBytes(report.commentSizes.raw)} comments · bundle ${formatBytes(report.file.gzip)} gzip.`,
		tree: themeTree,
	},
};

const USAGE = `Usage: kolibri-size-gate <components|theme> [--update] [--dir <dist>] [--baseline <file>] [--out <dir>]

  components  analyses dist/esm of @public-ui/components (build with KOLIBRI_SOURCE_MAP=true for module attribution)
  theme       analyses dist/index.mjs of a theme package
  --update    writes the current sizes as the new baseline`;

async function writeBaseline(path, baseline) {
	const json = `${JSON.stringify(baseline, null, '\t')}\n`;
	const prettier = await import('prettier');
	const options = (await prettier.resolveConfig(path)) ?? {};
	writeFileSync(path, await prettier.format(json, { ...options, filepath: path }));
}

async function main() {
	const { positionals, values } = parseArgs({
		allowPositionals: true,
		options: {
			baseline: { default: 'size-baseline.json', type: 'string' },
			dir: { type: 'string' },
			help: { short: 'h', type: 'boolean' },
			out: { default: 'size-report', type: 'string' },
			update: { type: 'boolean' },
		},
	});
	const target = TARGETS[positionals[0]];
	if (values.help || !target) {
		console.log(USAGE);
		return values.help ? 0 : 2;
	}

	const name = JSON.parse(readFileSync('package.json', 'utf8')).name;
	const dir = resolve(values.dir ?? target.dir);
	if (!existsSync(dir)) {
		console.error(`${dir} does not exist. Build ${name} first.`);
		return 2;
	}

	const report = await target.analyze(dir);
	const baselinePath = resolve(values.baseline);
	let baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : null;
	if (values.update) {
		baseline = toBaseline(report, baseline);
		await writeBaseline(baselinePath, baseline);
		console.log(`Baseline written to ${baselinePath}.`);
	}

	const result = evaluate(report, baseline);
	if (baseline === null) {
		result.passed = false;
		result.failures.unshift(`No baseline at \`${values.baseline}\`. Run \`pnpm size:update\` and commit it.`);
	}

	const markdown = renderMarkdown({ name, report, result });
	const out = resolve(values.out);
	mkdirSync(out, { recursive: true });
	writeFileSync(join(out, 'report.json'), JSON.stringify({ name, report, result }, null, '\t'));
	writeFileSync(join(out, 'report.md'), markdown);
	writeFileSync(join(out, 'treemap.html'), renderHtml({ markdownSummary: target.summary(report), name, report, tree: target.tree(report) }));
	if (process.env.GITHUB_STEP_SUMMARY) {
		appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
	}

	console.log(markdown);
	console.log(`Report: ${join(out, 'treemap.html')}`);
	return result.passed ? 0 : 1;
}

process.exitCode = await main();
