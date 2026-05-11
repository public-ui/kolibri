import fs from 'fs';

import { MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

class RenameClearButtonPropTask extends AbstractTask {
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
			const newContent = content
				.replace(/_hide-clear-button\s*=\s*"(true|false)"/g, (_match, value: string) => {
					return `_has-clear-button="${value === 'true' ? 'false' : 'true'}"`;
				})
				.replace(/_hide-clear-button\s*=\s*'(true|false)'/g, (_match, value: string) => {
					return `_has-clear-button='${value === 'true' ? 'false' : 'true'}'`;
				})
				.replace(/_hide-clear-button\s*=\s*\{\s*(true|false)\s*\}/g, (_match, value: string) => {
					return `_has-clear-button={${value === 'true' ? 'false' : 'true'}}`;
				})
				.replace(/_hideClearButton\s*=\s*"(true|false)"/g, (_match, value: string) => {
					return `_hasClearButton="${value === 'true' ? 'false' : 'true'}"`;
				})
				.replace(/_hideClearButton\s*=\s*'(true|false)'/g, (_match, value: string) => {
					return `_hasClearButton='${value === 'true' ? 'false' : 'true'}'`;
				})
				.replace(/_hideClearButton\s*=\s*\{\s*(true|false)\s*\}/g, (_match, value: string) => {
					return `_hasClearButton={${value === 'true' ? 'false' : 'true'}}`;
				})
				.replace(/_hide-clear-button(?=[\s/>])/g, '_has-clear-button="false"')
				.replace(/_hideClearButton(?=[\s/>])/g, '_hasClearButton={false}');

			if (content !== newContent) {
				fs.writeFileSync(file, newContent);
				MODIFIED_FILES.add(file);
			}
		});
	}
}

export const RenameClearButtonPropTasks: AbstractTask[] = [RenameClearButtonPropTask.getInstance('^4')];
