import { AbstractTask } from '../../abstract-task';

export class TestVersion12 extends AbstractTask {
	private constructor() {
		super('test-version-1.2', 'Test version 1.2', [], '1.2');
	}

	public static getInstance(): TestVersion12 {
		if (!(this.instance instanceof TestVersion12)) {
			this.instance = new TestVersion12();
		}
		return this.instance as TestVersion12;
	}

	public run(): void {
		this.setStatus('done');
	}
}
