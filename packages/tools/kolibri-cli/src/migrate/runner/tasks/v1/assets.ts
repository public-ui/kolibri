import { POST_MESSAGES, findIndexHtml, resolveIndexHtmlPath } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';
import { JsonTask } from '../common/JsonTask';
import { MergeHtmlTask } from '../common/MergeHtmlTask';
import { RemoveTask } from '../common/RemoveTask';

export const getAssetTasks = (baseDir: string) => {
	const assetTasks: AbstractTask[] = [];
	const indexHtml = findIndexHtml(baseDir);

	// Copy the component assets via the `kolibri-copy-assets` bin (shipped by
	// @public-ui/components), which resolves the package through Node module
	// resolution. A hardcoded `node_modules/@public-ui/components/...` path only
	// works in a flat workspace and breaks in pnpm's isolated layout, where the
	// dependency is a sibling in the .pnpm store rather than nested. The script is
	// wired into `prepare`, so it runs on install once the dependency is present.
	const addScript = JsonTask.getInstance(
		'scripts.prepare',
		{
			scripts: {
				prepare: `kolibri-copy-assets --dest "${indexHtml}/assets" @public-ui/components`,
			},
		},
		'^1',
	);

	const removeTask = RemoveTask.getInstance('public/assets/codicons', '^1', [addScript]);

	if (indexHtml) {
		const htmlTask = MergeHtmlTask.getInstance(
			'codicon',
			resolveIndexHtmlPath([indexHtml]),
			'index.html',
			'<link rel="stylesheet" href="assets/codicons/codicon.css" />',
			'^1',
			[removeTask],
		);
		assetTasks.push(htmlTask);
	} else {
		POST_MESSAGES.add({
			message: `We could not find your index.html file. Please integrate the assets manually to your project.`,
			type: 'warn',
		});
		assetTasks.push(removeTask);
	}

	return assetTasks;
};
