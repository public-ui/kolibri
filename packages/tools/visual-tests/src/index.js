import * as crypto from 'crypto';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import child_process from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import portfinder from 'portfinder';
import * as process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';

const tempDir = process.env.RUNNER_TEMP || process.env.TMPDIR || os.tmpdir(); // TODO: Check on Windows

if (!process.env.THEME_MODULE) {
	throw new Error('Environment variable THEME_MODULE not specified.');
}
if (!tempDir) {
	throw new Error('Neither environment variable RUNNER_TEMP or TMPDIR specified.');
}

process.env.THEME_MODULE = path.join(process.cwd(), process.env.THEME_MODULE); // Use current working directory (i.e. the theme folder) to complete module path
const visualsTestModulePath = fileURLToPath(new URL('..', import.meta.url));
const binaryPath = fileURLToPath(new URL('../node_modules/.bin', import.meta.url));
const sampleReactPackageJsonPath = import.meta.resolve('@public-ui/sample-react/package.json');
const workingDir = fileURLToPath(path.dirname(sampleReactPackageJsonPath));

if (!fs.existsSync(workingDir)) {
	throw new Error('Could not find React Sample App package. Please install it with "npm install @public-ui/sample-react".');
}

const buildPath = path.join(tempDir, `kolibri-visual-testing-build-${crypto.randomUUID()}`);
const rawPackageJsonPath = new URL(path.join(workingDir, 'package.json'), import.meta.url).href;
const packageJsonPath = process.platform === 'win32' ? pathToFileURL(rawPackageJsonPath) : rawPackageJsonPath;
const packageJsonContent = await readFile(new URL(packageJsonPath, import.meta.url), 'utf8');
const packageJson = JSON.parse(packageJsonContent);

console.log(`
Building React Sample App (v${packageJson?.version ?? '#.#.#'}) …`);

const buildResult = child_process.spawnSync('pnpm', ['run', 'build', `--outDir="${buildPath}"`], {
	cwd: workingDir,
	encoding: 'utf-8',
	shell: true,
});

if (buildResult.status !== 0) {
	console.log('Build status:', buildResult.status);
	console.log('Build stdout:', buildResult.stdout);
	console.log('Build stderr:', buildResult.stderr);
	console.log('Build error:', buildResult.error);
}

console.log(`React Sample App build finished. Directory:`, buildPath);

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
