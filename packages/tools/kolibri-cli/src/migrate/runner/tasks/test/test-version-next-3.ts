import { AbstractTask } from '../../abstract-task';

export class TestVersionNext3 extends AbstractTask {
	private constructor() {
		super('test-version-next-3', 'Test version next v3', [], '^3');
	}

	public static getInstance(): TestVersionNext3 {
		if (!(this.instance instanceof TestVersionNext3)) {
			this.instance = new TestVersionNext3();
		}
		return this.instance as TestVersionNext3;
	}

	public run(): void {}
}
