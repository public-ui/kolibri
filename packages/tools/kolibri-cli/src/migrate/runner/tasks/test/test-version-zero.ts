import { TestDummy } from './test-dummy';

export class TestVersionZero extends TestDummy {
	public static getInstance(): TestDummy {
		return super.getInstance('test-version-zero', 'Test version zero', [], '<1');
	}
}
