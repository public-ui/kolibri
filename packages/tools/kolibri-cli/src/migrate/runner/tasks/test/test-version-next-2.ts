import { TestDummy } from './test-dummy';

export class TestVersionNext2 extends TestDummy {
	public static getInstance(): TestDummy {
		return super.getInstance('test-version-next-2', 'Test version next v2', [], '^2');
	}
}
