import { readFileSync } from 'fs';
import { join } from 'path';

describe('kol-tabs responsive styles', () => {
	const style = readFileSync(join(__dirname, '../style.scss'), 'utf8');

	it('declares container-type inline-size', () => {
		expect(style).toContain('container-type: inline-size');
	});

	it('contains a container query for narrow widths', () => {
		expect(style).toMatch(/@container\s*\(max-width:/);
		expect(style).toContain('--button-group-flex-direction');
	});
});
