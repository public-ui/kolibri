import child_process from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'url';
import * as crypto from 'crypto';
import * as fs from 'fs';
import portfinder from 'portfinder';
import * as process from 'process';

process.env.KOLIBRI_CWD = process.cwd();
const tempDir = process.env.RUNNER_TEMP || process.env.TMPDIR; // TODO: Check on Windows

if (!process.env.THEME_MODULE) {
	throw new Error('Environment variable THEME_MODULE not specified.');
}
if (!tempDir) {
	throw new Error('Neither environment variable RUNNER_TEMP or TMPDIR specified.');
}

process.env.THEME_MODULE = path.join(process.cwd(), process.env.THEME_MODULE); // Use current working directory (i.e. the theme folder) to complete module path
const visualsTestModulePath = fileURLToPath(new URL('..', import.meta.url));
const binaryPath = fileURLToPath(new URL('../node_modules/.bin', import.meta.url));
const workingDir = fileURLToPath(new URL('../node_modules/@public-ui/sample-react', import.meta.url));
const buildPath = path.join(tempDir, `kolibri-visual-testing-build-${crypto.randomUUID()}`);
const packageJsonPath = await import(new URL('../node_modules/@public-ui/sample-react/package.json', import.meta.url), {
	assert: { type: 'json' },
});

process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH = buildPath;

console.log(`
Building React Sample App (v${packageJsonPath?.default?.version ?? '#.#.#'}) …`);
child_process.execFileSync('npm', ['run', 'build', '--', `--output-path=${buildPath}`], {
	cwd: workingDir,
	encoding: 'utf-8',
});

console.log(`React Sample App build finished. Directory:`, buildPath);

void (async () => {
	process.env.KOLIBRI_VISUAL_TEST_PORT = String(await portfinder.getPortPromise());

	const playwright = child_process.spawn(path.join(binaryPath, 'playwright'), ['test', ...process.argv.slice(2)], {
		cwd: visualsTestModulePath,
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
			console.log(`You can serve this build with "npx serve ${buildPath}".`);
		} else {
			console.log('Cleaning up build folder …');
			fs.rmSync(buildPath, { recursive: true, force: true });
			console.log('Cleaning up finished successfully.');
		}
		process.exit(code ?? 1);
	});
})();
