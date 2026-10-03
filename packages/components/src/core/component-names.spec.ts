import { describe, expect, it } from '@jest/globals';
import * as componentNames from './component-names';

const tagEntries = (): [string, string][] => Object.entries(componentNames).filter((entry): entry is [string, string] => entry[0].endsWith('Tag'));

describe('setCustomTagNames', () => {
	it('transforms every tag name from its own default', () => {
		const defaults = tagEntries();
		componentNames.setCustomTagNames((tagName) => `custom-${tagName}`);

		expect(tagEntries()).toEqual(defaults.map(([name, tagName]) => [name, `custom-${tagName}`]));
	});
});
