/**
 * Docs-only decision of the CI-Pipeline's changed-files job: reports whether the pull request only
 * touches files that cannot affect build, lint, tests or screenshots (see ci-ignored-paths.mjs).
 * The heavy stages of the pipeline are gated per step instead of per job, so the jobs keep running
 * with their full names and their required check contexts keep reporting. On events without a pull
 * request (push, workflow_dispatch) it always reports false: push runs of docs-only branches never
 * start the pipeline anyway, and manual runs ask for the full pipeline.
 */
import * as fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { isIgnoredByCi } from './ci-ignored-paths.mjs';
import { createApi, repositoryFromEnv, setOutputs } from './visual-review/github-api.mjs';

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
		let docsOnly = false;
		if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
			const api = createApi();
			const files = await api.paginate(`repos/${repositoryFromEnv()}/pulls/${event.pull_request.number}/files`);
			docsOnly = files.length > 0 && files.every((file) => isIgnoredByCi(file.filename));
		}
		setOutputs({ 'docs-only': String(docsOnly) });
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
