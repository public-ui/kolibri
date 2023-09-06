import { TestDummy } from './test-dummy';

export class TestVersion13 extends TestDummy {
	public static getInstance(): TestDummy {
		return super.getInstance('test-version-1.3', 'Test version 1.3', [], '1.3');
	}
}
