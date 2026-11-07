import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { cssModifiers, deriveAxes, readVariantTypes } from '../src/derive-axes.js';
import { extractApi } from '../src/extract-api.js';
import { extractBem } from '../src/extract-bem.js';
import { loadThemeStyles } from '../src/extract-tokens.js';

const api = (tag: string, attributes: string[]) => ({ tag, attributes, events: [], slots: [] });

describe('deriveAxes', () => {
	it('takes the values of a closed _variant type from the implementation', () => {
		const axes = deriveAxes(api('kol-alert', ['_type', '_variant']), undefined, '.kol-alert--variant-msg{}', { kind: 'closed', values: ['card', 'msg'] });
		assert.deepEqual(axes, { disabled: false, variants: ['card', 'msg'], variantSource: 'prop-type' });
	});

	it('takes the values of an open class-name _variant from the styled modifiers, minus registry states and other props', () => {
		const css = '.kol-button--primary{}.kol-button--ghost:hover{}.kol-button--disabled{}.kol-button--type-x{}.kol-button--primary__interactive-element{}';
		const bem = { block: 'kol-button', elements: [], modifiers: ['disabled'] };
		const axes = deriveAxes(api('kol-button', ['_disabled', '_type', '_variant']), bem, css, { kind: 'open' });
		assert.deepEqual(axes, { disabled: true, variants: ['none', 'ghost', 'primary'], variantSource: 'theme-modifier' });
	});

	it('finds no variant axis without a _variant prop', () => {
		assert.deepEqual(deriveAxes(api('kol-badge', ['_label']), undefined, '.kol-badge--x{}', undefined), { disabled: false });
	});

	it('reads only block modifiers from the CSS, not element modifiers', () => {
		assert.deepEqual(cssModifiers('kol-button', '.kol-button--primary .kol-button--secondary.x .kol-button--primary__text'), ['primary', 'secondary']);
	});

	it('derives the variants of kol-button from the theme exactly as the schema lists them', async () => {
		const require = createRequire(import.meta.url);
		const componentsRoot = join(process.cwd(), 'node_modules', '@public-ui', 'components');
		const themeEntry = join(dirname(dirname(require.resolve('@public-ui/theme-default'))), 'dist', 'index.mjs');
		const [apis, bems, theme] = await Promise.all([
			extractApi(join(componentsRoot, 'custom-elements.json')),
			extractBem(join(componentsRoot, 'src', 'schema', 'bem-registry.ts')),
			loadThemeStyles(themeEntry),
		]);
		const types = readVariantTypes(join(componentsRoot, 'src', 'components.d.ts'));
		const button = apis.find((candidate) => candidate.tag === 'kol-button');
		assert.ok(button);
		const axes = deriveAxes(
			button,
			bems.find((bem) => bem.block === 'kol-button'),
			theme.componentCss['kol-button'],
			types['kol-button'],
		);

		const schema = await readFile(join(process.cwd(), '..', '..', 'components', 'src', 'schema', 'props', 'button-variant.ts'), 'utf-8');
		const options = /buttonVariantPropTypeOptions = \[([^\]]+)\]/.exec(schema)?.[1] ?? '';
		const styled = [...options.matchAll(/'([^']+)'/g)].map((match) => match[1]).filter((value) => value !== 'custom');
		assert.deepEqual(axes.variants, ['none', ...styled.sort()]);
		assert.equal(axes.disabled, true);
		assert.deepEqual(types['kol-alert'], { kind: 'closed', values: ['card', 'msg'] });
	});
});
