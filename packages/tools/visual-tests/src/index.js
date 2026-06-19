import * as crypto from 'crypto';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import child_process from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import portfinder from 'portfinder';
import * as process from 'process';
import { fileURLToPath } from 'url';

const tempDir = process.env.RUNNER_TEMP || process.env.TMPDIR || os.tmpdir(); // TODO: Check on Windows

if (!process.env.THEME_MODULE) {
	throw new Error('Environment variable THEME_MODULE not specified.');
}
if (!tempDir) {
	throw new Error('Neither environment variable RUNNER_TEMP or TMPDIR specified.');
}

/* The current working directory is the theme folder. We keep a reference to its assets (icon fonts,
   variant data, …) so we can overlay them onto the built app below. */
const themeAssetsPath = path.join(process.cwd(), 'assets');

process.env.THEME_MODULE = path.join(process.cwd(), process.env.THEME_MODULE); // Use current working directory (i.e. the theme folder) to complete module path

const visualsTestModulePath = fileURLToPath(new URL('..', import.meta.url));
const binaryPath = fileURLToPath(new URL('../node_modules/.bin', import.meta.url));

/* The visual-tests package now ships its own runnable Vite app (./app) that embeds <App> from
   @public-ui/sample-react and injects the theme via THEME_MODULE. We build this local app instead of
   the sample app itself – that is what breaks the former circular dependency. */
const workingDir = visualsTestModulePath;
const packageJsonContent = await readFile(path.join(workingDir, 'package.json'), 'utf8');
const packageJson = JSON.parse(packageJsonContent);

const buildPath = path.join(tempDir, `kolibri-visual-testing-build-${crypto.randomUUID()}`);

console.log(`
Building Visual-Tests App (v${packageJson?.version ?? '#.#.#'}) …`);

const buildResult = child_process.spawnSync('pnpm', ['run', 'build', `--outDir="${buildPath}"`], {
	cwd: workingDir,
	encoding: 'utf-8',
	shell: true,
});

if (buildResult.status !== 0) {
	console.error('React Sample App build FAILED — aborting visual tests.');
	console.error('Build status:', buildResult.status);
	console.error('Build stdout:', buildResult.stdout);
	console.error('Build stderr:', buildResult.stderr);
	console.error('Build error:', buildResult.error);
	console.error(
		'The build output directory was not created, so Playwright cannot serve it. ' +
			'Fix the build error above and re-run. (Previously surfaced as a misleading "spawn /bin/sh ENOENT".)',
	);
	process.exit(buildResult.status || 1); // status is null on signal termination → fall back to 1
}

/* Overlay the theme's own assets (icon fonts, inject-variants_*.json, …) onto the built app so the
   snapshots render exactly the theme under test. The app itself has no dependency on any theme
   package – the theme provides its assets from its own folder at test time. */
if (fs.existsSync(themeAssetsPath)) {
	fs.cpSync(themeAssetsPath, path.join(buildPath, 'assets'), { recursive: true });
	console.log(`Theme assets copied from ${themeAssetsPath}.`);
} else {
	console.log(`No theme assets found at ${themeAssetsPath}; continuing without overlay.`);
}

/* The app loads the theme's inject-assets.css (font-face/icon declarations) via a relative <link>,
   so copy it into the served build root. Its own @import url('./assets/…') statements then resolve
   against the overlaid assets above. */
if (process.env.THEME_CSS && fs.existsSync(process.env.THEME_CSS)) {
	fs.copyFileSync(process.env.THEME_CSS, path.join(buildPath, 'inject-assets.css'));
	console.log(`Theme CSS copied from ${process.env.THEME_CSS}.`);
}

console.log(`Visual-Tests App build finished. Directory:`, buildPath);

void (async () => {
	const playwright = child_process.spawn(`"${path.join(binaryPath, 'playwright')}"`, ['test', ...process.argv.slice(2)], {
		cwd: visualsTestModulePath,
		shell: true,
		env: {
			...process.env,
			KOLIBRI_CWD: process.cwd(),
			KOLIBRI_VISUAL_TESTS_BUILD_PATH: buildPath,
			KOLIBRI_VISUAL_TEST_PORT: String(await portfinder.getPortPromise()),
			NO_PROXY: 'localhost',
		},
	});

	playwright.stdout.on('data', (data) => {
		console.log('Playwright: ' + data.toString());
	});

	playwright.stderr.on('data', (data) => {
		console.log('Playwright stderr: ' + data.toString());
	});

	playwright.on('exit', (code) => {
		console.log(`Playwright test finished with exit code ${code}.`);

		if (process.env.KOLIBRI_CLEANUP === '0') {
			console.log('Skipping cleanup up build folder.');
			console.log(`You can serve this build with "npx http-server ${buildPath}".`);
		} else {
			console.log('Cleaning up build folder …');
			fs.rmSync(buildPath, { recursive: true, force: true });
			console.log('Cleaning up finished successfully.');
		}
		process.exit(code ?? 1);
	});
})();
