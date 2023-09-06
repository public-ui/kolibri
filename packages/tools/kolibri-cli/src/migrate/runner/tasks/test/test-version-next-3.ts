import { TestDummy } from './test-dummy';

export class TestVersionNext3 extends TestDummy {
	public static getInstance(): TestDummy {
		return super.getInstance('test-version-next-3', 'Test version next v3', [], '^3');
	}
}
