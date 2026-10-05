/**
 * Turns freshly generated snapshots of one package into the baseline artifact layout:
 *
 *   <package>/visual-baseline/
 *     meta.json                      – identity of the baseline (commit, image, digest, …)
 *     snapshots/theme-<export>/*.png – the files Playwright compares against
 *
 * Runs after `test:update:e2e` in the "Visual Baseline" workflow. The digest and file count come
 * from the manifest the visual reporter writes in update mode, so the artifact carries the same
 * identity a comparison run derives.
 *
 *   node scripts/visual-review/pack-baseline.mjs theme-default
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { META_FILE } from './baseline-artifacts.mjs';
import { reportDir, resolvePackage, snapshotDir } from './snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
export const BASELINE_DIR = 'visual-baseline';

const packageName = process.argv[2];
if (!packageName) {
	console.error('Usage: node scripts/visual-review/pack-baseline.mjs <package>');
	process.exit(2);
}

const pkg = resolvePackage(packageName);
if (pkg.baselineFrom) {
	console.error(`${pkg.name} uses the baseline of ${pkg.baselineFrom} and does not publish one itself.`);
	process.exit(2);
}

const sourceDir = path.join(REPO_ROOT, snapshotDir(pkg));
const reportFile = path.join(REPO_ROOT, reportDir(pkg), 'report.json');
const targetRoot = path.join(REPO_ROOT, pkg.dir, BASELINE_DIR);
const targetDir = path.join(targetRoot, 'snapshots', pkg.themeDir);

const report = readReport(reportFile);
const files = fs.existsSync(sourceDir) ? fs.readdirSync(sourceDir).filter((entry) => entry.endsWith('.png')) : [];
if (files.length === 0) {
	console.error(`::error::No snapshots found in ${snapshotDir(pkg)} – refusing to publish an empty baseline.`);
	process.exit(1);
}
if (report.summary.baseline !== files.length) {
	console.error(`::error::The reporter manifest lists ${report.summary.baseline} files, the folder holds ${files.length}.`);
	process.exit(1);
}

fs.rmSync(targetRoot, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
for (const file of files) {
	fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
}

const playwright = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'packages/tools/visual-tests/package.json'), 'utf8')).peerDependencies['@playwright/test'];
const meta = {
	schema: 1,
	package: pkg.name,
	themeDir: pkg.themeDir,
	sha: process.env.GITHUB_SHA ?? null,
	ref: process.env.GITHUB_REF_NAME ?? null,
	runId: process.env.GITHUB_RUN_ID ? Number(process.env.GITHUB_RUN_ID) : null,
	runAttempt: process.env.GITHUB_RUN_ATTEMPT ? Number(process.env.GITHUB_RUN_ATTEMPT) : null,
	image: process.env.PLAYWRIGHT_IMAGE ?? `mcr.microsoft.com/playwright:v${playwright}-noble`,
	playwright,
	platform: report.platform,
	projects: report.projects,
	createdAt: new Date().toISOString(),
	files: files.length,
	digest: report.digest,
};
fs.writeFileSync(path.join(targetRoot, META_FILE), JSON.stringify(meta, null, '\t'));

const relativeTarget = path.relative(REPO_ROOT, targetRoot).split(path.sep).join('/');
console.log(`${pkg.name}: ${files.length} snapshots packed into ${relativeTarget} (digest ${meta.digest})`);
if (process.env.GITHUB_OUTPUT) {
	fs.appendFileSync(process.env.GITHUB_OUTPUT, `dir=${relativeTarget}\n`);
}

function readReport(file) {
	if (!fs.existsSync(file)) {
		console.error(`::error::No reporter manifest at ${path.relative(REPO_ROOT, file)} – did test:update:e2e run?`);
		process.exit(1);
	}
	const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
	if (parsed.mode !== 'update') {
		console.error(`::error::${path.relative(REPO_ROOT, file)} is a comparison report, not an update manifest.`);
		process.exit(1);
	}
	return parsed;
}
