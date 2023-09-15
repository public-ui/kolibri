import { AbstractTask } from '../abstract-task';
import { GitIgnoreAddRuleTask } from './common/GitIgnoreAddRuleTask';
import { TsConfigReconfigureTask } from './common/TsConfigReconfigureTask';
import { VsCodeSettingsReconfigureTask } from './common/VsCodeSettingsReconfigureTask';

export const commonTasks: AbstractTask[] = [];
commonTasks.push(GitIgnoreAddRuleTask.getInstance('.kolibri.migrate.json', '*'));
commonTasks.push(VsCodeSettingsReconfigureTask.getInstance('html.customData', ['./node_modules/@public-ui/components/vscode-custom-data.json'], '*'));
commonTasks.push(
	TsConfigReconfigureTask.getInstance(
		'compilerOptions.types',
		{
			compilerOptions: {
				types: ['@public-ui/components'],
			},
		},
		'*',
	),
);
