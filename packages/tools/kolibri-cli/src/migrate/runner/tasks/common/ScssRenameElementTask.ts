import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isKebabCaseRegExp, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class ScssRenameElementTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		private readonly block: string,
		element: string,
		private readonly newElement: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(
			identifier,
			`Rename element selector "${block}__${element}" to "${block}__${newElement}"`,
			SCSS_FILE_EXTENSIONS,
			versionRange,
			dependentTasks,
			options,
		);

		if (!isKebabCaseRegExp.test(block)) {
			throw logAndCreateError(`Block "${block}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(element)) {
			throw logAndCreateError(`Element "${element}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(newElement)) {
			throw logAndCreateError(`Element "${newElement}" is not in kebab case.`);
		}

		this.regExp = new RegExp(`\\.${block}__${element}(?=(?:--|\\b))`, 'g');
	}

	public static getInstance(
		block: string,
		element: string,
		newElement: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssRenameElementTask {
		const identifier = `${block}-rename-element-${element}-to-${newElement}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssRenameElementTask(identifier, block, element, newElement, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssRenameElementTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.regExp, `.${this.block}__${this.newElement}`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
