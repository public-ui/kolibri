import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, FileExtension } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class LabelExpertSlot extends AbstractTask {
	public static getInstance(
		identifier: string,
		title: string,
		extensions: FileExtension[],
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): LabelExpertSlot {
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new LabelExpertSlot(identifier, title, extensions, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as LabelExpertSlot;
	}

	public run(baseDir: string): void {
		this.transpileComponentFileDelete(baseDir);
		this.transpileCustomElementFileDelete(baseDir);
	}

	private transpileComponentFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content;
			console.log(content.match(/<\/KolSelect/));
			// Replacements
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content;
			// Replacements
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
