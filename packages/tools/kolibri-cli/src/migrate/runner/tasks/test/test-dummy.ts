import { FileExtension } from '../../../../types';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class TestDummy extends AbstractTask {
	protected static getInstance(
		identifier: string,
		title: string,
		extensions: FileExtension[],
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): TestDummy {
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new TestDummy(identifier, title, extensions, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as TestDummy;
	}

	public run(): void {}
}
