import { AbstractTask } from '../../abstract-task';

export class TestVersion13 extends AbstractTask {
	private constructor() {
		super('test-version-1.3', 'Test version 1.3', [], '1.3');
	}

	public static getInstance(): TestVersion13 {
		if (!(this.instance instanceof TestVersion13)) {
			this.instance = new TestVersion13();
		}
		return this.instance as TestVersion13;
	}

	public run(): void {}
}
