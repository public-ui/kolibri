import fs from 'fs';
import path from 'path';

import { MODIFIED_FILES, logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class VsCodeSettingsReconfigureTask extends AbstractTask {
	private constructor(
		identifier: string,
		private readonly key: string,
		private readonly value: unknown,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Reconfigure "${key}" in vscode settings of your project.`, [], versionRange, dependentTasks, options);

		if (typeof key !== 'string') {
			throw logAndCreateError(`Key of task "${this.identifier}" is not a string.`);
		}

		try {
			JSON.stringify(value);
		} catch {
			throw logAndCreateError(`Value of task "${this.identifier}" is not able to stringify (JSON).`);
		}
	}

	public static getInstance(
		key: string,
		value: unknown,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): VsCodeSettingsReconfigureTask {
		const identifier = `vscode-settings-reconfigure-${key}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new VsCodeSettingsReconfigureTask(identifier, key, value, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as VsCodeSettingsReconfigureTask;
	}

	public run(): void {
		const settingsPath = path.join(process.cwd(), '.vscode', 'settings.json');

		if (fs.existsSync(settingsPath)) {
			try {
				const fileContent = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) as Record<string, unknown>;
				fileContent[this.key] = this.value;
				fs.writeFileSync(settingsPath, JSON.stringify(fileContent, null, 2));
				MODIFIED_FILES.add(settingsPath);
			} catch (e) {
				console.log(`Advice: Your .vscode/settings.json file is not valid JSON.`);
			}
		} else {
			fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
			fs.writeFileSync(
				settingsPath,
				JSON.stringify(
					{
						[this.key]: this.value,
					},
					null,
					2,
				),
			);
		}
	}
}
