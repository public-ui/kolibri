/**
 * Puts the downloaded baseline artifact where Playwright compares against it and records what it
 * is, so the visual report can say which baseline it ran against.
 *
 *   node scripts/visual-review/install-baseline.mjs <package> [downloadDir]
 *
 * Reads <package>/visual-report/baseline-selection.json (select-baseline.mjs), copies
 * <downloadDir>/snapshots/<themeDir>/ into the baseline package's snapshot folder and writes
 * <package>/visual-report/baseline.json – the visual reporter keeps that file and embeds it.
 * With fallback "none" the snapshot folder is left empty except for a placeholder, so packages that
 * copy another theme's folder (test-tag-name-transformer) still find something to copy.
 *
 * Outputs: pkg_dir (repo-relative folder of the package, for the artifact upload).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { META_FILE } from './baseline-artifacts.mjs';
import { setOutputs } from './github-api.mjs';
import { SELECTION_FILE } from './select-baseline.mjs';
import { reportDir, resolvePackage, snapshotDir } from './snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));

/** download-artifact extracts a single artifact directly into `path`; be tolerant of one extra level. */
function locateArtifact(downloadDir) {
	if (fs.existsSync(path.join(downloadDir, META_FILE))) return downloadDir;
	for (const entry of fs.readdirSync(downloadDir, { withFileTypes: true })) {
		if (entry.isDirectory() && fs.existsSync(path.join(downloadDir, entry.name, META_FILE))) return path.join(downloadDir, entry.name);
	}
	throw new Error(`${META_FILE} not found under ${downloadDir}`);
}

export function installBaseline({ pkg, downloadDir, selection, root = REPO_ROOT }) {
	const owner = pkg.baselineFrom ? resolvePackage(pkg.baselineFrom) : pkg;
	const target = path.join(root, snapshotDir(owner));
	fs.rmSync(target, { recursive: true, force: true });
	fs.mkdirSync(target, { recursive: true });

	let meta = null;
	let files = 0;
	if (selection.fallback !== 'none') {
		const artifactDir = locateArtifact(downloadDir);
		meta = JSON.parse(fs.readFileSync(path.join(artifactDir, META_FILE), 'utf8'));
		const source = path.join(artifactDir, 'snapshots', owner.themeDir);
		if (!fs.existsSync(source)) throw new Error(`artifact holds no snapshots/${owner.themeDir}`);
		for (const file of fs.readdirSync(source)) {
			if (!file.endsWith('.png')) continue;
			fs.copyFileSync(path.join(source, file), path.join(target, file));
			files += 1;
		}
		if (files !== meta.files) throw new Error(`artifact meta lists ${meta.files} files, ${files} were extracted`);
	} else {
		fs.writeFileSync(path.join(target, '.baseline-none'), 'no baseline artifact was available for this run\n');
	}

	const baseline = {
		...(meta ?? {}),
		base: selection.base,
		branch: selection.branch,
		fallback: selection.fallback,
		distance: selection.distance,
		artifactId: selection.artifactId,
		imageMismatch: Boolean(meta && selection.image && meta.image !== selection.image),
	};
	const reportFolder = path.join(root, reportDir(pkg));
	fs.mkdirSync(reportFolder, { recursive: true });
	fs.writeFileSync(path.join(reportFolder, 'baseline.json'), JSON.stringify(baseline, null, '\t'));
	return { files, baseline, target };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const pkg = resolvePackage(process.argv[2] ?? '');
		const downloadDir = path.resolve(process.argv[3] ?? 'baseline-download');
		const selection = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, reportDir(pkg), SELECTION_FILE), 'utf8'));
		const { files, baseline, target } = installBaseline({ pkg, downloadDir, selection });
		const relativeTarget = path.relative(REPO_ROOT, target).split(path.sep).join('/');
		console.log(
			selection.fallback === 'none'
				? `${pkg.name}: no baseline installed (${relativeTarget} empty)`
				: `${pkg.name}: ${files} snapshots from ${baseline.ref}@${String(baseline.sha).slice(0, 10)} installed into ${relativeTarget}${baseline.imageMismatch ? ' – WARNING: Playwright image differs' : ''}`,
		);
		setOutputs({ pkg_dir: pkg.dir });
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
