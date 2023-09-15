import { TestDummy } from './test-dummy';

export class TestVersionNext99 extends TestDummy {
	public static getInstance(): TestDummy {
		return super.getInstance('test-version-next-99', 'Test version next v99', [], '^99');
	}
}
