/**
 * Files that cannot affect build, lint, tests or screenshots: markdown, docs and repository
 * metadata. Mirrors the `paths-ignore` of the push trigger in .github/workflows/ci.yml – keep in
 * sync. The CI-Pipeline applies the same list to pull requests through its changed-files job,
 * because the pull_request trigger cannot use paths-ignore: the required check contexts would
 * never report and block the merge.
 */
export const CI_IGNORED_PATHS = [
	'*.md',
	'**/*.md',
	'docs/**',
	'LICENSE',
	'.github/ISSUE_TEMPLATE/**',
	'.github/PULL_REQUEST_TEMPLATE/**',
	'renovate.json',
	'publiccode.yml',
	'.vscode/**',
	'license-reports/**',
	'*.jpg',
	'*.png',
	'*.svg',
];

function globToRegExp(glob) {
	const source = glob
		.split('**')
		.map((part) => part.split('*').map(escapeRegExp).join('[^/]*'))
		.join('.*');
	return new RegExp(`^${source}$`);
}

const IGNORED = CI_IGNORED_PATHS.map(globToRegExp);

export function isIgnoredByCi(file) {
	return IGNORED.some((pattern) => pattern.test(file));
}

function escapeRegExp(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
