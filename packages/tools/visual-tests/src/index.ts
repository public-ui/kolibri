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
const buildPath = path.join(tempDir, `kolibri-visual-testing-build-${crypto.randomUUID()}`);
process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH = buildPath;

console.log('Building React Sample App...');
child_process.execFileSync(path.join(binaryPath, 'kolibri-sample-react-test-build'), [buildPath], {
	encoding: 'utf-8',
});

console.log(`React Sample App build finished. Directory:`, buildPath);

void (async () => {
	process.env.KOLIBRI_VISUAL_TEST_PORT = String(await portfinder.getPortPromise());

	const playwright = child_process.spawn(path.join(binaryPath, 'playwright'), ['test', ...process.argv.slice(2)], {
		cwd: visualsTestModulePath,
	});
	playwright.stdout.on('data', (data) => {
		console.log('Plawright: ' + (data as string).toString());
	});

	playwright.stderr.on('data', (data) => {
		console.log('Plawright stderr: ' + (data as string).toString());
	});

	playwright.on('exit', (code) => {
		console.log(`Playwright test finished with exit code ${code}.`);
		console.log('Cleaning up build folder...');
		fs.rmSync(buildPath, { recursive: true, force: true });
		process.exit(code ?? 1);
	});
})();
