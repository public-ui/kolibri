import fs from 'fs';

import { MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

export class RenameClearButtonPropTask extends AbstractTask {
	private constructor(identifier: string, versionRange: string) {
		super(identifier, 'Rename _hide-clear-button to _has-clear-button', MARKUP_EXTENSIONS, versionRange);
	}

	public static getInstance(versionRange: string): RenameClearButtonPropTask {
		const identifier = 'rename-clear-button-prop';
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RenameClearButtonPropTask(identifier, versionRange));
		}
		return this.instances.get(identifier) as RenameClearButtonPropTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, MARKUP_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(/_hide-clear-button/g, '_has-clear-button').replace(/_hideClearButton/g, '_hasClearButton');

			if (content !== newContent) {
				fs.writeFileSync(file, newContent);
				MODIFIED_FILES.add(file);
			}
		});
	}
}

export const RenameClearButtonPropTasks: AbstractTask[] = [RenameClearButtonPropTask.getInstance('^4')];
