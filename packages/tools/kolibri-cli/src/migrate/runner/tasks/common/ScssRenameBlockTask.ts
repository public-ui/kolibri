import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isKebabCaseRegExp, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class ScssRenameBlockTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		block: string,
		private readonly newBlock: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Rename block selector "${block}" to "${newBlock}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isKebabCaseRegExp.test(block)) {
			throw logAndCreateError(`Block "${block}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(newBlock)) {
			throw logAndCreateError(`Block "${newBlock}" is not in kebab case.`);
		}

		this.regExp = new RegExp(`\\.${block}(?=(?:__|--|\\b))`, 'g');
	}

	public static getInstance(
		block: string,
		newBlock: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssRenameBlockTask {
		const identifier = `${block}-rename-block-${newBlock}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssRenameBlockTask(identifier, block, newBlock, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssRenameBlockTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.regExp, `.${this.newBlock}`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
