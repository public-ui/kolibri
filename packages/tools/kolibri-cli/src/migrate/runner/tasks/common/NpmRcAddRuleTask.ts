import fs from 'fs';
import path from 'path';

import { logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class NpmRcAddRuleTask extends AbstractTask {
	private constructor(
		identifier: string,
		private readonly rule: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Add the rule "${rule}" to the .npmrc of your project.`, [], versionRange, dependentTasks, options);

		if (typeof rule !== 'string') {
			throw logAndCreateError(`Definition of task "${this.identifier}" is not a string.`);
		}
	}

	public static getInstance(rule: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): NpmRcAddRuleTask {
		const identifier = `.npmrc-add-rule-${rule}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new NpmRcAddRuleTask(identifier, rule, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as NpmRcAddRuleTask;
	}

	public run(): void {
		const npmrcPath = path.join(process.cwd(), '.npmrc');
		const lineToAdd = this.rule.trim();

		if (!fs.existsSync(npmrcPath)) {
			fs.writeFileSync(npmrcPath, lineToAdd + '\n');
		} else {
			const fileContent = fs.readFileSync(npmrcPath, 'utf8');

			if (!fileContent.split('\n').includes(lineToAdd)) {
				fs.appendFileSync(npmrcPath, '\n' + lineToAdd);
			}
		}
	}
}
