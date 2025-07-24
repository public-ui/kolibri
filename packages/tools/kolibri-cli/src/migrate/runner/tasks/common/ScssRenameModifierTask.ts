import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isKebabCaseRegExp, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class ScssRenameModifierTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		private readonly base: string,
		modifier: string,
		private readonly newModifier: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Rename modifier "${modifier}" of "${base}" selector`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isKebabCaseRegExp.test(base)) {
			throw logAndCreateError(`Base selector "${base}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(modifier)) {
			throw logAndCreateError(`Modifier "${modifier}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(newModifier)) {
			throw logAndCreateError(`Modifier "${newModifier}" is not in kebab case.`);
		}

		this.regExp = new RegExp(`\\.${base}--${modifier}(?=\\b)`, 'g');
	}

	public static getInstance(
		base: string,
		modifier: string,
		newModifier: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssRenameModifierTask {
		const identifier = `${base}-rename-modifier-${modifier}-to-${newModifier}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssRenameModifierTask(identifier, base, modifier, newModifier, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssRenameModifierTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.regExp, `.${this.base}--${this.newModifier}`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
