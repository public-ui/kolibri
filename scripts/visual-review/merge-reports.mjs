/**
 * Merges the per-package reports of one CI run (artifacts `visual-review-<package>`) into the folder
 * that is published to gh-pages as `visual/pr-<n>/`:
 *
 *   report.json                       – one document for all packages (schema below)
 *   <package>/<name>.<kind>.png       – expected/actual/diff of changed, added and removed items
 *
 * The artifacts come from the pull request's own CI run, i.e. from untrusted code. Everything is
 * validated against a strict shape before a byte is copied: package and item names must match the
 * kebab-case patterns of the spec, image paths must be exactly `<package>/<name>.<kind>.png`, and
 * nothing outside the artifact folder is read.
 *
 *   node scripts/visual-review/merge-reports.mjs <downloadDir> <outDir> --pr <n> --head <sha> --repository owner/repo --run <id>
 */
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

export const NAME = /^[a-z0-9]+(-[a-z0-9]+)*(--[a-z0-9]+(-[a-z0-9]+)*)?$/;
export const PACKAGE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const STATUSES = new Set(['unchanged', 'changed', 'added', 'removed', 'error']);
const KINDS = ['expected', 'actual', 'diff'];
const HASH = /^sha256:[0-9a-f]{64}$/;

export function mergeReports(downloadDir, outDir, context) {
	const reports = [];
	for (const entry of fs.readdirSync(downloadDir, { withFileTypes: true })) {
		if (!entry.isDirectory() || !entry.name.startsWith('visual-review-')) continue;
		const file = path.join(downloadDir, entry.name, 'report.json');
		if (!fs.existsSync(file)) continue;
		reports.push({ dir: path.join(downloadDir, entry.name), report: JSON.parse(fs.readFileSync(file, 'utf8')) });
	}
	if (reports.length === 0) throw new Error(`No visual-review-* artifacts with a report.json under ${downloadDir}`);

	fs.rmSync(outDir, { recursive: true, force: true });
	fs.mkdirSync(outDir, { recursive: true });

	const packages = reports.map(({ dir, report }) => validateAndCopy(dir, report, outDir)).sort((a, b) => a.package.localeCompare(b.package));

	const summary = { unchanged: 0, changed: 0, added: 0, removed: 0, error: 0 };
	for (const pkg of packages) {
		for (const status of Object.keys(summary)) summary[status] += pkg.summary[status];
	}
	const digest = `sha256:${crypto
		.createHash('sha256')
		.update(packages.map((pkg) => `${pkg.package}:${pkg.digest}`).join('\n'))
		.digest('hex')}`;

	const merged = {
		schema: 1,
		pr: context.pr,
		head: context.head,
		repository: context.repository,
		runId: context.runId,
		generatedAt: new Date().toISOString(),
		digest,
		baseline: baselineOf(packages),
		summary,
		packages,
	};
	fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(merged, null, '\t'));
	return merged;
}

function validateAndCopy(dir, report, outDir) {
	const name = report.package;
	if (report.schema !== 1) throw new Error(`${dir}: unsupported report schema ${report.schema}`);
	if (report.mode !== 'compare') throw new Error(`${name}: report is a "${report.mode}" manifest, not a comparison`);
	if (typeof name !== 'string' || !PACKAGE.test(name)) throw new Error(`${dir}: invalid package name ${JSON.stringify(name)}`);
	if (!Array.isArray(report.items)) throw new Error(`${name}: items missing`);

	const summary = { unchanged: 0, changed: 0, added: 0, removed: 0, error: 0 };
	const items = report.items.map((item) => {
		if (typeof item.name !== 'string' || !NAME.test(item.name)) throw new Error(`${name}: invalid item name ${JSON.stringify(item.name)}`);
		if (!STATUSES.has(item.status)) throw new Error(`${name}/${item.name}: invalid status ${JSON.stringify(item.status)}`);
		if (!HASH.test(item.hash ?? '')) throw new Error(`${name}/${item.name}: invalid hash`);
		summary[item.status] += 1;
		const clean = { name: item.name, route: String(item.route ?? '').slice(0, 200), status: item.status, hash: item.hash };
		if (Number.isFinite(item.diffPixels)) clean.diffPixels = item.diffPixels;
		if (Number.isFinite(item.diffRatio)) clean.diffRatio = item.diffRatio;
		if (item.sizeMismatch && Array.isArray(item.sizeMismatch.expected) && Array.isArray(item.sizeMismatch.actual)) {
			clean.sizeMismatch = { expected: item.sizeMismatch.expected.slice(0, 2).map(Number), actual: item.sizeMismatch.actual.slice(0, 2).map(Number) };
		}
		if (typeof item.message === 'string') clean.message = item.message.slice(0, 500);
		for (const kind of KINDS) {
			if (item[kind] === undefined) continue;
			const expectedPath = `${name}/${item.name}.${kind}.png`;
			if (item[kind] !== expectedPath) throw new Error(`${name}/${item.name}: unexpected ${kind} path ${JSON.stringify(item[kind])}`);
			const source = path.join(dir, name, `${item.name}.${kind}.png`);
			if (!fs.existsSync(source)) throw new Error(`${name}/${item.name}: ${kind} image missing in artifact`);
			const target = path.join(outDir, name, `${item.name}.${kind}.png`);
			fs.mkdirSync(path.dirname(target), { recursive: true });
			fs.copyFileSync(source, target);
			clean[kind] = expectedPath;
		}
		return clean;
	});
	if (typeof report.summary === 'object') {
		for (const status of Object.keys(summary)) {
			if ((report.summary[status] ?? 0) !== summary[status]) throw new Error(`${name}: summary.${status} disagrees with the items`);
		}
	}
	const errors = (Array.isArray(report.errors) ? report.errors : []).map((error) => ({
		test: String(error.test ?? '').slice(0, 200),
		route: String(error.route ?? '').slice(0, 200),
		message: String(error.message ?? '').slice(0, 500),
	}));
	return {
		package: name,
		themeDir: String(report.themeDir ?? '').slice(0, 100),
		baseline: {
			files: Number(report.baseline?.files ?? 0),
			meta: sanitizeMeta(report.baseline?.meta),
		},
		summary,
		digest: HASH.test(report.digest ?? '') ? report.digest : null,
		items,
		errors,
	};
}

function sanitizeMeta(meta) {
	if (!meta || typeof meta !== 'object') return null;
	const text = (value, max = 200) => (typeof value === 'string' ? value.slice(0, max) : null);
	return {
		sha: text(meta.sha, 40),
		ref: text(meta.ref),
		runId: Number.isFinite(meta.runId) ? meta.runId : null,
		image: text(meta.image),
		playwright: text(meta.playwright, 20),
		createdAt: text(meta.createdAt, 40),
		digest: HASH.test(meta.digest ?? '') ? meta.digest : null,
		fallback: text(meta.fallback, 40),
		distance: Number.isFinite(meta.distance) ? meta.distance : null,
		imageMismatch: meta.imageMismatch === true,
	};
}

/** The baseline the packages compared against – identical for all of them by construction. */
function baselineOf(packages) {
	const metas = packages.map((pkg) => pkg.baseline.meta).filter(Boolean);
	if (metas.length === 0) return null;
	const first = metas[0];
	return {
		sha: first.sha,
		ref: first.ref,
		image: first.image,
		playwright: first.playwright,
		fallback: first.fallback,
		distance: first.distance,
		imageMismatch: metas.some((meta) => meta.imageMismatch),
		consistent: metas.every((meta) => meta.sha === first.sha),
	};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const [downloadDir, outDir, ...rest] = process.argv.slice(2);
	const options = {};
	for (let i = 0; i < rest.length; i += 2) options[rest[i].replace(/^--/, '')] = rest[i + 1];
	if (!downloadDir || !outDir || !options.pr || !options.head) {
		console.error('Usage: node merge-reports.mjs <downloadDir> <outDir> --pr <n> --head <sha> --repository owner/repo --run <id>');
		process.exit(2);
	}
	try {
		const merged = mergeReports(downloadDir, outDir, {
			pr: Number(options.pr),
			head: options.head,
			repository: options.repository ?? process.env.GITHUB_REPOSITORY ?? null,
			runId: options.run ? Number(options.run) : null,
		});
		const { summary } = merged;
		console.log(
			`PR #${merged.pr}: ${merged.packages.length} packages – ${summary.unchanged} unchanged, ${summary.changed} changed, ${summary.added} added, ${summary.removed} removed, ${summary.error} error`,
		);
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
