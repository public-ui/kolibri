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
		if (!(this.instance instanceof TestDummy)) {
			this.instance = new TestDummy(identifier, title, extensions, versionRange, dependentTasks, options);
		}
		return this.instance as TestDummy;
	}

	public run(): void {}
}
