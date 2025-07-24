import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

/**
 * Escapes special characters for use in a regular expression.
 * @param {string} str String to escape
 * @returns {string} Escaped string
 */
function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class ScssRemoveSelectorTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		private readonly selector: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Remove selector "${selector}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!selector.startsWith('.')) {
			throw logAndCreateError(`Selector "${selector}" must start with a dot.`);
		}

		this.regExp = new RegExp(`${escapeRegExp(selector)}\\s*{[\\s\\S]*?}`, 'g');
	}

	public static getInstance(selector: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): ScssRemoveSelectorTask {
		const identifier = `remove-selector-${selector}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssRemoveSelectorTask(identifier, selector, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssRemoveSelectorTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.regExp, `/* removed ${this.selector} */`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
