import { AbstractTask } from '../../abstract-task';

export class TestVersionZero extends AbstractTask {
	private constructor() {
		super('test-version-zero', 'Test version zero', [], '^0');
	}

	public static getInstance(): TestVersionZero {
		if (!(this.instance instanceof TestVersionZero)) {
			this.instance = new TestVersionZero();
		}
		return this.instance as TestVersionZero;
	}

	public run(): void {}
}
