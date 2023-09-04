import { AbstractTask } from '../../abstract-task';

export class TestVersionNext2 extends AbstractTask {
	private constructor() {
		super('test-version-next-2', 'Test version next v2', [], '^2');
	}

	public static getInstance(): TestVersionNext2 {
		if (!(this.instance instanceof TestVersionNext2)) {
			this.instance = new TestVersionNext2();
		}
		return this.instance as TestVersionNext2;
	}

	public run(): void {
		this.setStatus('done');
	}
}
