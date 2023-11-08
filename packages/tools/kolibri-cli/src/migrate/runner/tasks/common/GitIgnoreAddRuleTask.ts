import fs from 'fs';
import path from 'path';

import { logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class GitIgnoreAddRuleTask extends AbstractTask {
	private constructor(
		identifier: string,
		private readonly rule: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Add the rule "${rule}" to the .gitignore of your project.`, [], versionRange, dependentTasks, options);

		if (typeof rule !== 'string') {
			throw logAndCreateError(`Definition of task "${this.identifier}" is not a string.`);
		}
	}

	public static getInstance(rule: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): GitIgnoreAddRuleTask {
		const identifier = `.gitignore-add-rule-${rule}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new GitIgnoreAddRuleTask(identifier, rule, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as GitIgnoreAddRuleTask;
	}

	public run(): void {
		const gitignorePath = path.join(process.cwd(), '.gitignore');
		const lineToAdd = this.rule.trim();

		if (!fs.existsSync(gitignorePath)) {
			fs.writeFileSync(gitignorePath, lineToAdd + '\n');
		} else {
			const fileContent = fs.readFileSync(gitignorePath, 'utf8');

			if (!fileContent.split('\n').includes(lineToAdd)) {
				fs.appendFileSync(gitignorePath, '\n' + lineToAdd);
			}
		}
	}
}
