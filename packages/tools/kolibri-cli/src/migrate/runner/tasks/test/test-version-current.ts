import { AbstractTask } from '../../abstract-task';

export class TestVersionCurrent extends AbstractTask {
	private constructor(version: string) {
		super('test-version-current', 'Test version current', [], version);
	}

	public static getInstance(version: string): TestVersionCurrent {
		if (!(this.instance instanceof TestVersionCurrent)) {
			this.instance = new TestVersionCurrent(version);
		}
		return this.instance as TestVersionCurrent;
	}

	public run(): void {}
}
