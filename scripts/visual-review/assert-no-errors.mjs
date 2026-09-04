/**
 * Summarises the visual report of one package and fails only on real errors.
 *
 * Screenshot differences are a review case, not a pipeline failure – they are approved (or rejected)
 * on the review page. What must fail the job is everything that prevented a comparison: a route that
 * threw, an invisible block, a timeout. Those show up as `errors` or items with status `error`.
 *
 *   node scripts/visual-review/assert-no-errors.mjs theme-default
 *
 * Exit codes: 0 no errors, 1 errors found, 2 report missing (the test run did not get that far).
 * On GitHub Actions the summary is also appended to the job summary and errors become annotations.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reportDir, resolvePackage } from './snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const MAX_LISTED_ITEMS = 50;

const packageName = process.argv[2];
if (!packageName) {
	console.error('Usage: node scripts/visual-review/assert-no-errors.mjs <package>');
	process.exit(2);
}

const pkg = resolvePackage(packageName);
const reportFile = path.join(REPO_ROOT, reportDir(pkg), 'report.json');

if (!fs.existsSync(reportFile)) {
	fail(`No visual report found at ${path.relative(REPO_ROOT, reportFile)} – the Playwright run did not produce one.`);
	process.exit(2);
}

const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
const lines = [];

if (report.mode === 'update') {
	lines.push(`### Visual baseline \`${report.package}\``, '', `${report.summary.baseline} snapshots generated, digest \`${report.digest}\`.`);
} else {
	const { summary } = report;
	lines.push(
		`### Visual review \`${report.package}\``,
		'',
		'| unchanged | changed | added | removed | error |',
		'| --: | --: | --: | --: | --: |',
		`| ${summary.unchanged} | ${summary.changed} | ${summary.added} | ${summary.removed} | ${summary.error} |`,
		'',
	);
	if (report.baseline.files === 0) {
		lines.push('_No baseline available – every screenshot counts as added._', '');
	}
	const listed = report.items.filter((item) => item.status !== 'unchanged');
	for (const item of listed.slice(0, MAX_LISTED_ITEMS)) {
		const detail = item.diffPixels !== undefined ? ` (${item.diffPixels} px)` : item.message ? ` – ${item.message}` : '';
		lines.push(`- \`${item.status}\` ${item.name}${detail}`);
	}
	if (listed.length > MAX_LISTED_ITEMS) {
		lines.push(`- … ${listed.length - MAX_LISTED_ITEMS} more`);
	}
}

const errors = report.errors ?? [];
if (errors.length > 0) {
	lines.push('', `**${errors.length} route(s) failed before their blocks could be compared:**`, '');
	for (const error of errors) {
		lines.push(`- \`${error.route}\`: ${error.message}`);
		fail(`${report.package} – route "${error.route}": ${error.message}`);
	}
}

const text = lines.join('\n');
console.log(text);
if (process.env.GITHUB_STEP_SUMMARY) {
	fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n\n`);
}

const errorItems = report.summary?.error ?? 0;
if (errors.length > 0 || errorItems > 0) {
	process.exit(1);
}

function fail(message) {
	console.error(process.env.GITHUB_ACTIONS ? `::error::${message}` : message);
}
