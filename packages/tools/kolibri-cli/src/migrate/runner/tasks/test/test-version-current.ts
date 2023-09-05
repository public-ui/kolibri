import { TestDummy } from './test-dummy';

export class TestVersionCurrent extends TestDummy {
	public static getInstance(version: string): TestDummy {
		return super.getInstance('test-version-current', 'Test version current', [], version);
	}
}
