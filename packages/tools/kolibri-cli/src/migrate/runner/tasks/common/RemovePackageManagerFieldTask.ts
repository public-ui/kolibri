import fs from 'fs';
import path from 'path';
import { MODIFIED_FILES, logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class RemovePackageManagerFieldTask extends AbstractTask {
	private constructor(identifier: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}) {
		super(identifier, 'Remove packageManager field from package.json', [], versionRange, dependentTasks, options);
	}

	public static getInstance(versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): RemovePackageManagerFieldTask {
		const identifier = 'package.json-remove-package-manager-field';
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RemovePackageManagerFieldTask(identifier, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RemovePackageManagerFieldTask;
	}

	public run(): void {
		const configPath = path.join(process.cwd(), 'package.json');
		if (fs.existsSync(configPath)) {
			try {
				const fileContent = JSON.parse(fs.readFileSync(configPath, 'utf8')) as Record<string, unknown>;

				// Remove packageManager field if it exists
				if ('packageManager' in fileContent) {
					delete fileContent.packageManager;
					fs.writeFileSync(configPath, JSON.stringify(fileContent, null, 2));
					MODIFIED_FILES.add(configPath);
				}
			} catch (error: unknown) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				throw logAndCreateError(`Could not remove packageManager field from package.json: ${errorMessage}`);
			}
		}
	}
}
