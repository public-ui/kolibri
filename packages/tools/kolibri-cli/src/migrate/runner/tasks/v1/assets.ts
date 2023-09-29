import { findIndexHtml, resolveIndexHtmlPath } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';
import { ExecTask } from '../common/ExecTask';
import { HandleDependencyTask } from '../common/HandleDependencyTask';
import { JsonTask } from '../common/JsonTask';
import { MergeHtmlTask } from '../common/MergeHtmlTask';
import { RemoveTask } from '../common/RemoveTask';

export const getAssetTasks = (baseDir: string) => {
	const assetTasks: AbstractTask[] = [];
	const indexHtml = findIndexHtml(baseDir);

	if (indexHtml) {
		const removeDeps = HandleDependencyTask.getInstance(
			'remove',
			{},
			{
				'cpy-cli': '5.0.0',
				rimraf: '3.0.2',
			},
			'^1',
		);

		const installDeps = HandleDependencyTask.getInstance(
			'add',
			{},
			{
				'cpy-cli': '5.0.0',
				rimraf: '3.0.2',
			},
			'^1',
			[removeDeps],
		);

		const addScript = JsonTask.getInstance(
			'scripts.postinstall',
			{
				scripts: {
					postinstall: `cpy "node_modules/@public-ui/components/assets/**/*" "${indexHtml}/assets" --dot`,
				},
			},
			'^1',
			[installDeps],
		);

		const htmlTask = MergeHtmlTask.getInstance(
			'codicon',
			resolveIndexHtmlPath([indexHtml]),
			'index.html',
			'<link rel="stylesheet" href="assets/codicons/codicon.css" />',
			'^1',
			[addScript],
		);

		const removeTask = RemoveTask.getInstance('public/assets/codicons', '^1', [htmlTask]);
		const execTask = ExecTask.getInstance(`npx cpy "node_modules/@public-ui/components/assets/**/*" "${indexHtml}/assets" --dot`, '^1', [removeTask]);

		assetTasks.push(execTask);
	}

	return assetTasks;
};
