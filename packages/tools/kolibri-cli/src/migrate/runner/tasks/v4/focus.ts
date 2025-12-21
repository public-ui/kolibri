import fs from 'fs';

import { FileExtension } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const FOCUS_METHOD_FILE_EXTENSIONS: FileExtension[] = ['html', 'js', 'jsx', 'ts', 'tsx', 'vue', 'xhtml'];

export class RenameKolFocusMethodsTask extends AbstractTask {
	private constructor(identifier: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}) {
		super(identifier, 'Rename kolFocus methods to focus', FOCUS_METHOD_FILE_EXTENSIONS, versionRange, dependentTasks, options);
	}

	public static getInstance(versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): RenameKolFocusMethodsTask {
		const identifier = `rename-kolfocus-methods-${versionRange}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RenameKolFocusMethodsTask(identifier, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RenameKolFocusMethodsTask;
	}

	public run(baseDir: string): void {
		this.transpileFiles(baseDir);
	}

	private transpileFiles(baseDir: string): void {
		filterFilesByExt(baseDir, FOCUS_METHOD_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(/\bkolFocusLink\b/g, 'focus').replace(/\bkolFocus\b/g, 'focus');

			if (newContent !== content) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
