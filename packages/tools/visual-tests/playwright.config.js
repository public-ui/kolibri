import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as process from 'process';

// Validate and set ENVs
const PORT = parseInt(process.env.KOLIBRI_VISUAL_TEST_PORT || '', 10);
const BASE_URL = `http://localhost:${PORT}`;

const CWD = process.env.KOLIBRI_CWD ?? '';
const HTML_REPORT_DIR = 'playwright-report';
const TIMEOUT = parseInt(process.env.KOLIBRI_VISUAL_TESTS_TIMEOUT || '15000', 10);
const EXPECT_TIMEOUT = parseInt(process.env.KOLIBRI_VISUAL_TESTS_EXPECT_TIMEOUT || '5000', 10);
const BUILD_PATH = process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH ?? '';
const THEME = (process.env.THEME_EXPORT || 'default').toLocaleLowerCase();

const VALID_COLOR_SCHEMES = ['light', 'dark'];
const colorSchemeInput = process.env.KOLIBRI_VISUAL_TESTS_COLOR_SCHEME;
const colorSchema = (colorSchemeInput || 'light').toLocaleLowerCase();

if (!VALID_COLOR_SCHEMES.includes(colorSchema)) {
	throw new Error(
		`Environment variable KOLIBRI_VISUAL_TESTS_COLOR_SCHEME must be one of "${VALID_COLOR_SCHEMES.join('", "')}" (received "${colorSchemeInput}").`,
	);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
/**
 * Resolves the worker count from `KOLIBRI_VISUAL_TESTS_WORKERS`, falling back to the per-environment
 * default. `Number('')` is `0` and `Number('abc')` is `NaN`, either of which would silently break
 * the run, so both fall back explicitly.
 */
function workerCount() {
	const fallback = process.env.CI ? 1 : 4;
	const configured = Number.parseInt(process.env.KOLIBRI_VISUAL_TESTS_WORKERS ?? '', 10);
	return Number.isInteger(configured) && configured > 0 ? configured : fallback;
}

export default defineConfig({
	testDir: './tests',
	snapshotDir: path.join(CWD, 'snapshots'),
	// snapshotPathTemplate: '',
	outputDir: path.join(CWD, 'test-results'),
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Parallel workers. Local runs default to 4 (fast iteration); CI defaults to 1 for maximum
	   snapshot stability (parallel Firefox instances can produce sub-pixel-flaky renders).
	   `KOLIBRI_VISUAL_TESTS_WORKERS` overrides both — `scripts/snapshots-docker.mjs` sets it to 1
	   for every `--check` run, so an acceptance run is deterministic regardless of the flags used.
	   An unset, empty or unparseable value falls back to the default rather than to `NaN`. */
	workers: workerCount(),
	/* Allow to override the expectation timeout for slow environments */
	timeout: TIMEOUT,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['line'], ['html', { open: 'never', outputFolder: path.join(CWD, HTML_REPORT_DIR) }]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: BASE_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	expect: {
		timeout: EXPECT_TIMEOUT,
	},

	/* Configure projects for major browsers */
	projects: [
		// {
		// 	name: 'chrome',
		// 	use: { ...devices['Desktop Chrome'] },
		// },
		// {
		// 	name: 'edge',
		// 	use: { ...devices['Desktop Edge'] },
		// },
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: `npx http-server -p ${PORT}`,
		cwd: path.resolve(BUILD_PATH),
		url: BASE_URL,
		reuseExistingServer: false,
	},
	snapshotPathTemplate: `{snapshotDir}/theme-${THEME}${colorSchema === 'light' ? '' : `-${colorSchema}`}/{arg}-{projectName}-{platform}{ext}`,
});
