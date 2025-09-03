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

export class ScssAddSelectorTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		private readonly selector: string,
		private readonly rules: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Add selector "${selector}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!selector.startsWith('.')) {
			throw logAndCreateError(`Selector "${selector}" must start with a dot.`);
		}

		this.regExp = new RegExp(escapeRegExp(selector) + '\\s*{');
	}

	public static getInstance(
		selector: string,
		rules: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssAddSelectorTask {
		const identifier = `add-selector-${selector}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssAddSelectorTask(identifier, selector, rules, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssAddSelectorTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			let content = fs.readFileSync(file, 'utf8');
			if (!this.regExp.test(content)) {
				content += `\n${this.selector} {\n${this.rules}\n}\n`;
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, content);
			}
		});
	}
}
