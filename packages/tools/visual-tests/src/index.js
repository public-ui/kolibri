import child_process from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'url';

process.env.KOLIBRI_CWD = process.cwd();
process.env.THEME_MODULE = path.join(process.cwd(), process.env.THEME_MODULE); // Use current working directory (i.e. the theme folder) to complete module path
const visualTestPath = fileURLToPath(new URL('..', import.meta.url));
const buildPath = path.join(process.env.TMPDIR, `kolibri-visual-testing-build-${crypto.randomUUID()}`);
const binaryPath = fileURLToPath(new URL('../node_modules/.bin', import.meta.url));

console.log(`Starting build...`);

const result = child_process.execFileSync(path.join(binaryPath, 'kolibri-sample-react-test-build'), [buildPath], {
	encoding: 'utf-8',
});

// console.log(result);
console.log(`build done!`);
console.log(`-> `, buildPath);

process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH = buildPath;

runTests();

function runTests() {
	const playwright = child_process.spawn(path.join(binaryPath, 'playwright'), ['test'], {
		cwd: visualTestPath,
	});
	playwright.stdout.on('data', function (data) {
		console.log('stdout: ' + data.toString());
	});

	playwright.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	playwright.on('exit', function (code) {
		console.log('child process exited with code ' + code.toString());
	});
}
