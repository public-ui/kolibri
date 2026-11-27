import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { extractTokens } from '../src/extract-tokens.js';

describe('extractTokens', () => {
	it('resolves a light-dark pair into light and dark values', () => {
		const tokens = extractTokens(':host { --color-primary: var(--kolibri-color-primary, light-dark(#003a5c, #86c5ea)); }');
		const primary = tokens.find((token) => token.name === '--color-primary');
		assert.deepEqual(primary, { name: '--color-primary', value: 'light-dark(#003a5c, #86c5ea)', light: '#003a5c', dark: '#86c5ea' });
	});

	it('keeps scheme-neutral tokens as single values', () => {
		const tokens = extractTokens(':host { --spacing: 0.5rem; --font-family: Verdana, sans-serif; }');
		assert.deepEqual(
			tokens.find((token) => token.name === '--spacing'),
			{ name: '--spacing', value: '0.5rem' },
		);
		assert.deepEqual(
			tokens.find((token) => token.name === '--font-family'),
			{ name: '--font-family', value: 'Verdana, sans-serif' },
		);
	});

	it('resolves internal var() references to the referenced value', () => {
		const tokens = extractTokens(':host { --color-light: #ffffff; --color-shadow-contrast: var(--color-light); }');
		const contrast = tokens.find((token) => token.name === '--color-shadow-contrast');
		assert.equal(contrast?.value, '#ffffff');
	});

	it('extracts from the real default theme GLOBAL css', async () => {
		const { loadThemeStyles } = await import('../src/extract-tokens.js');
		const styles = await loadThemeStyles(join(process.cwd(), 'node_modules', '@public-ui', 'theme-default', 'dist', 'index.mjs'));
		assert.equal(styles.name, 'default');
		const tokens = extractTokens(styles.globalCss);
		const primary = tokens.find((token) => token.name === '--color-primary');
		assert.ok(primary?.light?.startsWith('#'), `--color-primary hat keinen Light-Wert: ${JSON.stringify(primary)}`);
		assert.ok(primary?.dark?.startsWith('#'), `--color-primary hat keinen Dark-Wert: ${JSON.stringify(primary)}`);
		assert.ok(tokens.length > 10, `unerwartet wenige Tokens: ${tokens.length}`);
		const unresolved = tokens.filter((token) => token.value.startsWith('var(') || token.light?.startsWith('var(') || token.dark?.startsWith('var('));
		assert.deepEqual(unresolved, [], `unaufgelöste Referenzen: ${unresolved.map((token) => token.name).join(', ')}`);
	});
});
