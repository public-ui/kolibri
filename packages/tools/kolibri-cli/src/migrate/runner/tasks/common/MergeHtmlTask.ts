import fs from 'fs';

import { MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class MergeHtmlTask extends AbstractTask {
	protected constructor(
		identifier: string,
		title: string,
		private readonly path: string,
		private readonly filename: string,
		private readonly html: string,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, title, [], versionRange, dependentTasks, options);
	}

	public static getInstance(
		key: string,
		path: string,
		filename: string,
		html: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): MergeHtmlTask {
		const identifier = `merge-html-${key}-in-${filename}`;
		const title = `Merge html (${key}) in ${filename}.`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MergeHtmlTask(identifier, title, path, filename, html, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as MergeHtmlTask;
	}

	public run(): void {
		if (fs.existsSync(this.path)) {
			const content = fs.readFileSync(this.path, 'utf8');
			if (!content.includes(this.html)) {
				fs.writeFileSync(
					this.path,
					content.replace(
						/(>)([^<]+<\/head>)/,
						`$1
${this.html}$2`,
					),
				);
				MODIFIED_FILES.add(this.path);
			}
		}
	}
}
