/**
 * Playwright reporter that turns the screenshot comparison of theme-snapshots.spec.js into a
 * machine-readable report (`visual-report/report.json`) plus the PNGs a reviewer needs.
 *
 * Playwright itself only reports pass/fail per test. Everything a review UI needs is derived here:
 *
 * - `changed`   – the block was captured and differs from the baseline (expected/actual/diff copied)
 * - `added`     – the block was captured, but the baseline has no file for it (actual copied)
 * - `removed`   – the baseline has a file, but no test captured that block any more (expected copied)
 * - `unchanged` – the block was captured and matched the baseline
 * - `error`     – the baseline has a file, but its route failed before the block could be captured
 *
 * Classification relies on structured data only: the `-expected`/`-actual`/`-diff` attachments a failed
 * comparison leaves behind and the baseline listing taken before the run. Playwright's free-text error
 * messages merely add numbers (`diffPixels`, `diffRatio`, `sizeMismatch`) – a reworded message after a
 * Playwright upgrade costs those numbers, not the classification.
 *
 * Every item carries a content hash. Approvals are bound to those hashes, not to commits, so a new push
 * that leaves an approved screenshot untouched keeps its approval.
 *
 * The spec announces every captured screenshot through a `visual-snapshot` annotation, because a passing
 * `toHaveScreenshot` leaves no trace (no attachment, no error) – without that signal "unchanged" and
 * "removed" would be indistinguishable. A test in test/visual-reporter.test.mjs guards that convention.
 *
 * With `--update-snapshots` (baseline generation) the reporter writes a manifest of the generated files
 * instead; its digest is what the baseline artifact carries as identity.
 */
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

const SCHEMA_VERSION = 1;
export const SNAPSHOT_ANNOTATION = 'visual-snapshot';
export const SPEC_FILE = 'theme-snapshots.spec.js';

const ATTACHMENT_SUFFIX = /-(expected|actual|diff|previous)\.png$/;
/* Wording of playwright-core's compareImages(); both sentences appear together when the size differs. */
const PIXEL_MISMATCH = /(\d+) pixels \(ratio ([\d.]+) of all image pixels\) are different/;
const SIZE_MISMATCH = /Expected an image (\d+)px by (\d+)px, received (\d+)px by (\d+)px/;
const TEST_TITLE = /^snapshot for (.+)$/;
// eslint-disable-next-line no-control-regex -- Playwright colours its messages; the escape character is the point here
const ANSI_SEQUENCE = /\u001b\[[0-9;]*m/g;

/**
 * File name of a route: `button/variants?x=1` → `button-variants-x-1`. Shared with the spec, which names
 * the snapshot files, so both sides can never drift apart. Consecutive delimiters collapse into one dash:
 * the route part of a name must never contain the `--` that separates route and block id.
 */
export function routeToSnapshotName(route) {
	return route.replace(/[/?&=]+/g, '-');
}

function sha256(buffer) {
	return `sha256:${crypto.createHash('sha256').update(buffer).digest('hex')}`;
}

function hashFile(file) {
	return sha256(fs.readFileSync(file));
}

/** Width × height from the PNG header – enough to turn Playwright's 2-decimal ratio into an exact one. */
function pngPixelCount(file) {
	try {
		const fd = fs.openSync(file, 'r');
		const header = Buffer.alloc(24);
		fs.readSync(fd, header, 0, 24, 0);
		fs.closeSync(fd);
		if (header.toString('latin1', 1, 4) !== 'PNG') return null;
		return header.readUInt32BE(16) * header.readUInt32BE(20);
	} catch {
		return null;
	}
}

function errorMessage(error) {
	return (error?.message ?? String(error ?? 'unknown error')).replace(ANSI_SEQUENCE, '');
}

export default class VisualReporter {
	/**
	 * @param {{ outputDir: string, snapshotDir: string, themeDir: string, packageName?: string, packageDir?: string }} options
	 */
	constructor(options) {
		this.outputDir = options.outputDir;
		this.baselineDir = path.join(options.snapshotDir, options.themeDir);
		this.themeDir = options.themeDir;
		this.packageDir = options.packageDir ?? process.cwd();
		this.packageName = options.packageName ?? readPackageName(this.packageDir);
		this.results = new Map(); // test id → { test, result } of the last attempt
	}

	printsToStdio() {
		return false;
	}

	onBegin(config, suite) {
		this.updateMode = config.updateSnapshots === 'all' || config.updateSnapshots === 'changed';
		this.platform = process.platform;
		const projects = runningProjects(config, suite);
		if (projects.length !== 1) {
			throw new Error(
				`Visual reporter: snapshot names carry no project name, so exactly one Playwright project can run at a time (got: ${projects.join(', ') || 'none'}). Extend the item keys of the reporter before enabling another project.`,
			);
		}
		this.projects = projects;
		this.fileSuffixSource = `-${escapeRegExp(projects[0])}-${escapeRegExp(this.platform)}\\.png`;
		this.fileSuffix = new RegExp(`${this.fileSuffixSource}$`);
		// The baseline must be listed before any test runs: Playwright writes missing snapshots into the
		// very same folder, and those must not masquerade as baseline files.
		this.baseline = this.scanBaseline();
		this.baselineMeta = readJson(path.join(this.outputDir, 'baseline.json'));
		fs.rmSync(this.outputDir, { recursive: true, force: true });
		fs.mkdirSync(this.outputDir, { recursive: true });
		if (this.baselineMeta) {
			fs.writeFileSync(path.join(this.outputDir, 'baseline.json'), JSON.stringify(this.baselineMeta, null, '\t'));
		}
	}

	onTestEnd(test, result) {
		if (!isSnapshotTest(test)) return;
		const previous = this.results.get(test.id);
		if (!previous || previous.result.retry <= result.retry) {
			this.results.set(test.id, { test, result });
		}
	}

	onEnd() {
		const report = this.updateMode ? this.buildManifest() : this.buildReport();
		fs.writeFileSync(path.join(this.outputDir, 'report.json'), JSON.stringify(report, null, '\t'));
	}

	scanBaseline() {
		const files = new Map();
		if (!fs.existsSync(this.baselineDir)) return files;
		for (const entry of fs.readdirSync(this.baselineDir)) {
			if (!this.fileSuffix.test(entry)) continue;
			files.set(entry.replace(this.fileSuffix, ''), path.join(this.baselineDir, entry));
		}
		return files;
	}

	baseReport(mode, baselineFiles) {
		return {
			schema: SCHEMA_VERSION,
			mode,
			package: this.packageName,
			themeDir: this.themeDir,
			generatedAt: new Date().toISOString(),
			platform: this.platform,
			projects: this.projects,
			baseline: {
				dir: path.relative(this.packageDir, this.baselineDir).split(path.sep).join('/'),
				files: baselineFiles,
				meta: this.baselineMeta,
			},
		};
	}

	/** Update mode: the folder after the run is the new baseline, so every count describes that state. */
	buildManifest() {
		const generated = this.scanBaseline();
		const items = [...generated.entries()].map(([name, file]) => ({ name, status: 'baseline', hash: hashFile(file) })).sort(byName);
		return { ...this.baseReport('update', generated.size), summary: { baseline: items.length }, digest: digestOf(items), items, errors: [] };
	}

	buildReport() {
		const items = new Map(); // name → item
		const errors = [];
		const seen = new Set();

		for (const { test, result } of this.results.values()) {
			if (result.status === 'skipped') continue;
			const route = test.title.match(TEST_TITLE)?.[1] ?? test.title;
			const snapshotName = routeToSnapshotName(route);

			for (const annotation of [...test.annotations, ...(result.annotations ?? [])]) {
				if (annotation.type === SNAPSHOT_ANNOTATION && annotation.description) {
					seen.add(annotation.description.replace(/\.png$/, ''));
				}
			}

			// A failed comparison always attaches the actual image; the baseline listing tells changed from added.
			const groups = groupAttachments(result.attachments);
			for (const [name, files] of groups) {
				if (!files.actual) continue;
				seen.add(name);
				items.set(name, this.baseline.has(name) ? this.changedItem(name, route, files) : this.addedItem(name, route, files));
			}

			const hardErrors = [];
			for (const error of result.errors) {
				const message = errorMessage(error);
				const name = this.snapshotNameIn(message, groups);
				if (name && items.has(name)) {
					Object.assign(items.get(name), comparisonDetails(message, groups.get(name)));
				} else {
					hardErrors.push(firstLine(message));
				}
			}
			if (hardErrors.length === 0 && (result.status === 'timedOut' || result.status === 'interrupted')) {
				hardErrors.push(`Test ${result.status}`);
			}
			for (const message of hardErrors) {
				errors.push({ test: test.title, route, message });
			}
			if (hardErrors.length > 0) {
				// Every baseline file of this route that was not captured is unknown territory, not "removed".
				for (const [name, file] of this.baseline) {
					if (!seen.has(name) && belongsToRoute(name, snapshotName)) {
						items.set(name, { name, route, status: 'error', hash: hashFile(file), message: hardErrors[0] });
						seen.add(name);
					}
				}
			}
		}

		for (const [name, file] of this.baseline) {
			if (items.has(name)) continue;
			if (seen.has(name)) {
				items.set(name, { name, route: routeOf(name), status: 'unchanged', hash: hashFile(file) });
			} else {
				items.set(name, { name, route: routeOf(name), status: 'removed', hash: hashFile(file), expected: this.copyImage(file, name, 'expected') });
			}
		}

		const sorted = [...items.values()].sort(byName);
		const summary = { unchanged: 0, changed: 0, added: 0, removed: 0, error: 0 };
		for (const item of sorted) summary[item.status] += 1;

		return { ...this.baseReport('compare', this.baseline.size), summary, digest: digestOf(sorted), items: sorted, errors };
	}

	changedItem(name, route, files) {
		return {
			name,
			route,
			status: 'changed',
			hash: hashFile(files.actual),
			expected: this.copyImage(files.expected ?? this.baseline.get(name), name, 'expected'),
			actual: this.copyImage(files.actual, name, 'actual'),
			diff: files.diff ? this.copyImage(files.diff, name, 'diff') : undefined,
		};
	}

	addedItem(name, route, files) {
		return { name, route, status: 'added', hash: hashFile(files.actual), actual: this.copyImage(files.actual, name, 'actual') };
	}

	/** The attachment group an error message talks about – by file name (`x.png`) or baseline path (`x-firefox-linux.png`). */
	snapshotNameIn(message, groups) {
		for (const name of groups.keys()) {
			if (new RegExp(`${escapeRegExp(name)}(\\.png|${this.fileSuffixSource})`).test(message)) return name;
		}
		return null;
	}

	copyImage(source, name, kind) {
		if (!source || !fs.existsSync(source)) return undefined;
		const relative = `${this.packageName}/${name}.${kind}.png`;
		const target = path.join(this.outputDir, relative);
		fs.mkdirSync(path.dirname(target), { recursive: true });
		fs.copyFileSync(source, target);
		return relative;
	}
}

/**
 * Numbers from Playwright's message. Both sentences appear when the size differs; the pixels are then
 * counted on a canvas padded to the larger of both sizes, which is what the ratio has to be based on.
 */
function comparisonDetails(message, files) {
	const details = {};
	const size = message.match(SIZE_MISMATCH);
	const pixel = message.match(PIXEL_MISMATCH);
	if (size) {
		details.sizeMismatch = { expected: [Number(size[1]), Number(size[2])], actual: [Number(size[3]), Number(size[4])] };
	}
	if (pixel) {
		details.diffPixels = Number(pixel[1]);
		const total = size
			? Math.max(details.sizeMismatch.expected[0], details.sizeMismatch.actual[0]) * Math.max(details.sizeMismatch.expected[1], details.sizeMismatch.actual[1])
			: pngPixelCount(files.actual);
		details.diffRatio = total ? Number((details.diffPixels / total).toFixed(6)) : Number(pixel[2]);
	}
	return details;
}

/** Projects that actually run (the root suite has one child per project); `--project` filters are respected. */
function runningProjects(config, suite) {
	const fromSuite = (suite?.suites ?? []).map((child) => child.project?.()?.name).filter(Boolean);
	const names = fromSuite.length > 0 ? fromSuite : config.projects.map((project) => project.name);
	return [...new Set(names)];
}

function isSnapshotTest(test) {
	return path.basename(test.location?.file ?? '') === SPEC_FILE;
}

function groupAttachments(attachments) {
	const groups = new Map();
	for (const attachment of attachments) {
		const match = attachment.name.match(ATTACHMENT_SUFFIX);
		if (!attachment.path || !match) continue;
		const name = attachment.name.replace(ATTACHMENT_SUFFIX, '');
		if (!groups.has(name)) groups.set(name, {});
		groups.get(name)[match[1]] = attachment.path;
	}
	return groups;
}

/** `button-basic--variants` and `button-basic--variants-320` belong to route name `button-basic`; so does the full-page `button-basic`. */
function belongsToRoute(name, snapshotName) {
	return name === snapshotName || name.startsWith(`${snapshotName}--`);
}

function routeOf(name) {
	return name.split('--')[0];
}

function digestOf(items) {
	const lines = items.map((item) => `${item.name}:${item.hash}`).sort();
	return sha256(Buffer.from(lines.join('\n')));
}

function byName(a, b) {
	return a.name.localeCompare(b.name);
}

function firstLine(message) {
	return message.split('\n')[0].trim();
}

function escapeRegExp(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readJson(file) {
	try {
		return JSON.parse(fs.readFileSync(file, 'utf8'));
	} catch {
		return null;
	}
}

function readPackageName(dir) {
	const pkg = readJson(path.join(dir, 'package.json'));
	return (pkg?.name ?? path.basename(dir)).replace(/^@public-ui\//, '');
}
