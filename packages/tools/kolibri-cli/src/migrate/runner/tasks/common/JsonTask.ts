import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';
import { MODIFIED_FILES, logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class JsonTask extends AbstractTask {
	private constructor(
		identifier: string,
		key: string,
		private readonly json: Record<string, unknown>,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Reconfigure "${key}" in package.json of your project.`, [], versionRange, dependentTasks, options);

		if (typeof key !== 'string') {
			throw logAndCreateError(`Key of task "${this.identifier}" is not a string.`);
		}

		try {
			JSON.stringify(json);
		} catch {
			throw logAndCreateError(`Value of task "${this.identifier}" is not able to stringify (JSON).`);
		}
	}

	public static getInstance(
		key: string,
		json: Record<string, unknown>,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): JsonTask {
		const identifier = `package.json-reconfigure-${key}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new JsonTask(identifier, key, json, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as JsonTask;
	}

	public run(): void {
		const configPath = path.join(process.cwd(), 'package.json');
		if (fs.existsSync(configPath)) {
			try {
				const fileContent = merge(JSON.parse(fs.readFileSync(configPath, 'utf8')) as Record<string, unknown>, this.json);
				fs.writeFileSync(configPath, JSON.stringify(fileContent, null, 2));
				MODIFIED_FILES.add(configPath);
			} catch (e) {
				// empty
			}
		}
	}
}
