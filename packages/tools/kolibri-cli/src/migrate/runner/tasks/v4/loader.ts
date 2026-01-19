import fs from 'fs';

import { FileExtension } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const LOADER_FILE_EXTENSIONS: FileExtension[] = ['cjs', 'cts', 'js', 'jsx', 'mjs', 'mts', 'ts', 'tsx', 'vue'];
const LOADER_IMPORT_REGEX = /@public-ui\/components\/dist\/loader(?:\/[^\s'"]+)?/g;

export class UpdateLoaderImportPathTask extends AbstractTask {
	protected constructor(identifier: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, 'Update loader imports to @public-ui/components/loader', LOADER_FILE_EXTENSIONS, versionRange, dependentTasks, options);
	}

	public static getInstance(versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): UpdateLoaderImportPathTask {
		const identifier = `update-loader-import-path-${versionRange}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new UpdateLoaderImportPathTask(identifier, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as UpdateLoaderImportPathTask;
	}

	public run(baseDir: string): void {
		this.transpileFiles(baseDir);
	}

	private transpileFiles(baseDir: string): void {
		filterFilesByExt(baseDir, LOADER_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(LOADER_IMPORT_REGEX, '@public-ui/components/loader');

			if (newContent !== content) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
