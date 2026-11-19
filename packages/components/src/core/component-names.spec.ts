import { describe, expect, it } from '@jest/globals';
import * as componentNames from './component-names';

const tagEntries = (): [string, string][] => Object.entries(componentNames).filter(([name]) => name.endsWith('Tag'));

const toKebabCase = (name: string): string =>
	name
		.slice(3, -3) // strip the `Kol` prefix and the `Tag` suffix
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase();

describe('component names', () => {
	it('every tag constant keeps its default kol-* value, because tag name transformation resolves through the stencil runtime', () => {
		expect(tagEntries()).toEqual(tagEntries().map(([name]) => [name, `kol-${toKebabCase(name)}`]));
	});
});
