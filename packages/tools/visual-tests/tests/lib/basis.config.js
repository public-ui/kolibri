const dirName = `theme-${process.env.THEME_EXPORT.toLocaleLowerCase()}`;

/**
 * Caution: The renaming does only works, if the `test` reference
 *          comes from the `spec.js` file.
 */
export const renameSnapshotName = (snapshotName) => {
	return (
		snapshotName
			// Make different snapshot folder for different themes
			.replace('-snapshots', '')
			.replace('axe.contrast-dark.spec.js', dirName)
			.replace('axe.contrast.spec.js', dirName)
			.replace('axe.dark.spec.js', dirName)
			.replace('axe.spec.js', dirName)
			.replace('snapshot.contrast-dark.spec.js', dirName)
			.replace('snapshot.contrast.spec.js', dirName)
			.replace('snapshot.dark.spec.js', dirName)
			.replace('snapshot.spec.js', dirName)

			// Remove test counter from snapshot name
			.replace('-1-', '-')
	);

	// Remove browser name from snapshot name
	// .replace('-chrome', '')
	// .replace('-edge', '')
	// .replace('-firefox', '')

	// Remove os name from snapshot name
	// .replace('-darwin', '')
	// .replace('-linux', '')
	// .replace('-windows', '')
};

// https://github.com/microsoft/playwright/issues/7575#issuecomment-1288164474
const configureSnapshotPath =
	() =>
	// eslint-disable-next-line no-empty-pattern
	({}, testInfo) => {
		const originalSnapshotPath = testInfo.snapshotPath;
		testInfo.snapshotPath = (snapshotName) => {
			return renameSnapshotName(originalSnapshotPath.apply(testInfo, [snapshotName]));
		};
	};

export const configureTest = (test) => {
	test.beforeEach(configureSnapshotPath());

	// https://playwright.dev/docs/emulation
	test.use({
		colorScheme: 'light',
		locale: 'de-DE',
		isMobile: false,
		timezoneId: 'Europe/Berlin',
		viewport: {
			width: 800,
			height: 0,
		},
	});
};

/**
 * @todo stabilize and re-enable test
 */
export const blocklist = [];
