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

export class ScssUpdateTokenTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		token: string,
		private readonly newToken: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Update token "${token}" to "${newToken}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!token.startsWith('$')) {
			throw logAndCreateError(`Token "${token}" must start with "$".`);
		}
		if (!newToken.startsWith('$')) {
			throw logAndCreateError(`Token "${newToken}" must start with "$".`);
		}

		this.regExp = new RegExp(escapeRegExp(token) + '(?=\\s|:|;|,|\\)|\\}|$)', 'g');
	}

	public static getInstance(
		token: string,
		newToken: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssUpdateTokenTask {
		const identifier = `update-token-${token}-to-${newToken}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssUpdateTokenTask(identifier, token, newToken, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssUpdateTokenTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.regExp, this.newToken);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
